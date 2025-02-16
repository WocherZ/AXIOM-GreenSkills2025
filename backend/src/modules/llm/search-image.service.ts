// translation.service.ts
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import trs from '@vitalets/google-translate-api';
import { HttpService } from '@nestjs/axios';

interface ISearchImages {
  results: {
    url: {
      raw: string;
      full: string;
      regular: string;
    };
  }[];
}
@Injectable()
export class TranslationService {
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
}
