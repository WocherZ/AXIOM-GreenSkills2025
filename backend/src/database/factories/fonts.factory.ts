import { Font } from '@entities/documents/font.entity';
import { fontsFixture } from '../fixtures/fonts';

interface IFonstFixture {
  id: string;
  name: string;
  cssUrl: string;
  fontFiles: {
    id: string;
    name: string;
    weight: number;
    isItalic: boolean;
    fileType: string;
    sourceUrl: string;
    __typename: string;
  }[];
  workspaceId: any;
  archived: boolean;
  fontFileCount: number;
  __typename: string;
}

export default class FontsFactory {
  public static create(props: IFonstFixture) {
    return new Font({
      id: props.id,
      name: props.name,
      url: props.cssUrl,
    });
  }

  public static createMany(): Font[] {
    return fontsFixture.map((item) => {
      return FontsFactory.create(item);
    });
  }
}
