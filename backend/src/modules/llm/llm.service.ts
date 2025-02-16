import { BadRequestException, Injectable } from '@nestjs/common';
import OpenAI from 'openai';

import {
  CREATE_SLIDES_SYSTEM_PROMPT,
  CREATE_SLIDES_USER_PROMPT_TEMPLATE,
  CREATE_SLIDES_CONTENT_SYSTEM_PROMPT,
  CREATE_SLIDES_CONTENT_USER_PROMPT_TEMPLATE,
  EDIT_SLIDES_CONTENT_SYSTEM_PROMPT,
  EDIT_SLIDES_CONTENT_USER_PROMPT_TEMPLATE,
  SUMMARY_PRESENTATION_USER_PROMPT_TEMPLATE,
  SUMMARY_PRESENTATION_SYSTEM_PROMPT,
} from './llm.const';
import { DraftSlideContentProps } from '@dto/docs/res-draft.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import trs from '@vitalets/google-translate-api';
import { AxiosResponse } from 'axios';

const LLM_URL = 'http://176.114.91.72:9000/v1';
const MODEL_NAME = 'Qwen2.5-14B-Instruct-GPTQ-Int4';
export interface ISlideContentRes {
  title: string;
  text: string;
  list: string[];
}

interface ISearchImages {
  results: {
    urls: {
      raw: string;
      full: string;
      regular: string;
      small: string;
    };
  }[];
}

@Injectable()
export class LlmService {
  private openai = new OpenAI({ apiKey: 'EMPTY', baseURL: LLM_URL });

  constructor(private readonly httpService: HttpService) {}

  async translateText(text: string, targetLanguage: string): Promise<string> {
    try {
      const result = await trs.translate(text, { to: targetLanguage });
      return result.text;
    } catch (err) {
      console.log('Error during translation:', err);
      throw new Error('Перевод не удался');
    }
  }

  async searchPhotos(query: string): Promise<ISearchImages> {
    console.log('[QUERY]', query);
    const config = {
      method: 'get',
      url: `https://api.unsplash.com/search/photos`,
      params: { query },
      headers: {
        Authorization: 'Client-ID p0TAhK4ZHwQ4v0ug5KfvaI83FUk7tWzjeA2YGmWR3Nk',
      },
    };

    try {
      const response: AxiosResponse = await firstValueFrom(
        this.httpService.request(config),
      );
      return response.data;
    } catch (error) {
      console.log('Error during Unsplash API request:', error);
      throw new Error('Ошибка при запросе к Unsplash API');
    }
  }

  async getSlidesSummary(
    data: ISlideContentRes[],
  ): Promise<{ preview: string; images: string[] }> {
    try {
      const userPrompt = SUMMARY_PRESENTATION_USER_PROMPT_TEMPLATE.replace(
        '{slides}',
        JSON.stringify(data),
      );

      const response = await this.openai.chat.completions.create({
        model: MODEL_NAME,
        messages: [
          {
            role: 'system',
            content: SUMMARY_PRESENTATION_SYSTEM_PROMPT,
          },
          {
            role: 'user',
            content: userPrompt,
          },
        ],
        stream: false,
      });

      const content = response.choices[0]?.message?.content || '';
      if (content) {
        const images = await this.searchPhotos(content);
        console.log('[IMAGES]', images);

        const preview = images?.results[0]?.urls?.small;

        const strImages = images.results.map((el) => {
          console.log('[IMAGES_URL]', el.urls);
          return el?.urls?.regular || el?.urls?.raw;
        });

        return {
          preview,
          images: strImages,
        };
      }
    } catch (error) {
      console.log('getSlidesSummary', error);
      throw new BadRequestException('Ошибка при получении summary slides');
    }
  }

  async generateSlides(
    prompt: string,
    attempt = 1,
    slidesNumber: number = 8,
    presentationLanguage: string = 'Русский',
  ): Promise<DraftSlideContentProps[]> {
    try {
      const userPrompt = CREATE_SLIDES_USER_PROMPT_TEMPLATE.replace(
        '{presentation_language}',
        presentationLanguage,
      )
        .replace('{slides_number}', slidesNumber.toString())
        .replace('{topic}', prompt);

      const response = await this.openai.chat.completions.create({
        model: MODEL_NAME,
        messages: [
          { role: 'system', content: CREATE_SLIDES_SYSTEM_PROMPT },
          { role: 'user', content: userPrompt },
        ],
        stream: false,
      });

      const textContent = response.choices[0]?.message?.content;

      return JSON.parse(textContent.replace(/^```json\s*|\s*```$/g, ''));
    } catch (error) {
      if (attempt <= 3) {
        console.error(
          `Attempt generateSlides ${attempt} failed. Retrying...`,
          error,
        );
        return this.generateSlides(prompt, attempt + 1);
      } else {
        console.error('All attempts failed', error);
        throw new BadRequestException('Error generateSlides');
      }
    }
  }

  async generateSlidesContent(
    topic: string,
    slidesTitleJson: string = '[{...}]',
    attempt = 1,
    presentationLanguage: string = 'Русский',
  ): Promise<Array<ISlideContentRes>> {
    try {
      const userPrompt = CREATE_SLIDES_CONTENT_USER_PROMPT_TEMPLATE.replace(
        '{topic}',
        topic,
      )
        .replace('{presentation_language}', presentationLanguage)
        .replace('{slides_title_json}', slidesTitleJson);

      const response = await this.openai.chat.completions.create({
        model: MODEL_NAME,
        messages: [
          { role: 'system', content: CREATE_SLIDES_CONTENT_SYSTEM_PROMPT },
          { role: 'user', content: userPrompt },
        ],
        stream: false,
      });

      const textContent = response.choices[0]?.message?.content;

      return JSON.parse(textContent.replace(/^```json\s*|\s*```$/g, ''));
    } catch (error) {
      if (attempt <= 3) {
        console.error(
          `Attempt generateSlidesContent ${attempt} failed. Retrying...`,
          error,
        );
        return this.generateSlidesContent(topic, slidesTitleJson, attempt + 1);
      } else {
        console.error('All attempts failed', error);
        throw new BadRequestException('Error generateSlidesContent');
      }
    }
  }

  async generateSlidesFromFile(prompt: string, fileText: string) {
    try {
      const res = await lastValueFrom(
        this.httpService.post(
          'http://176.114.91.72:5000/generate_presentation',
          {
            user_query: prompt,
            file_context: fileText,
          },
        ),
      );

      return res.data;
    } catch (e) {
      console.error('generateSlidesFromFile failed', e);
      throw new BadRequestException('generateSlidesFromFile Error');
    }
  }

  async editSlideContent(
    slideContentJson: object,
    editTask: string,
  ): Promise<string> {
    const userPrompt = EDIT_SLIDES_CONTENT_USER_PROMPT_TEMPLATE.replace(
      '{slide_content_json}',
      JSON.stringify(slideContentJson),
    ).replace('{edit_task}', editTask);

    const response = await this.openai.chat.completions.create({
      model: MODEL_NAME,
      messages: [
        { role: 'system', content: EDIT_SLIDES_CONTENT_SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      stream: false,
    });

    return response.choices[0]?.message?.content || '';
  }
}
