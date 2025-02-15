import { Injectable, InternalServerErrorException } from '@nestjs/common';
import OpenAI from 'openai';

import {
  CREATE_SLIDES_SYSTEM_PROMPT,
  CREATE_SLIDES_USER_PROMPT_TEMPLATE,
  CREATE_SLIDES_CONTENT_SYSTEM_PROMPT,
  CREATE_SLIDES_CONTENT_USER_PROMPT_TEMPLATE,
  EDIT_SLIDES_CONTENT_SYSTEM_PROMPT,
  EDIT_SLIDES_CONTENT_USER_PROMPT_TEMPLATE,
} from './llm.const';
import { DraftSlideContentProps } from '@dto/docs/res-draft.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
// import { isValidJSON } from 'src/app/helpers/check-valid-json.helper';

const LLM_URL = 'http://176.114.91.72:9000/v1';
const MODEL_NAME = 'Qwen2.5-14B-Instruct-GPTQ-Int4';
export interface ISlideContentRes {
  title: string;
  text: string;
  list: string[];
}
@Injectable()
export class LlmService {
  private openai = new OpenAI({ apiKey: 'EMPTY', baseURL: LLM_URL });

  constructor(private readonly httpService: HttpService) {}

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
      // const textContent = response.choices[0]?.message?.content;

      return JSON.parse(textContent.replace(/^```json\s*|\s*```$/g, ''));
    } catch (error) {
      if (attempt <= 3) {
        console.error(`Attempt ${attempt} failed. Retrying...`, error);
        return this.generateSlides(prompt, attempt + 1);
      } else {
        console.error('All attempts failed', error);
        throw error;
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
        console.error(`Attempt ${attempt} failed. Retrying...`, error);
        return this.generateSlidesContent(topic, slidesTitleJson, attempt + 1);
      } else {
        console.error('All attempts failed', error);
        throw error;
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
      throw new InternalServerErrorException('!!!!Internal server error');
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
