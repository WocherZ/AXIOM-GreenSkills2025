import { Theme } from '@entities/documents/theme.entity';
import { fontsFixture } from '../fixtures/fonts';
import { themeFixtures } from '../fixtures/themes';
import { Font } from '@entities/documents/font.entity';

interface IThemes {
  id: string;
  workspaceId: any;
  name: string;
  headingFont: string;
  headingFontWeight: number;
  bodyFont: string;
  bodyFontWeight: number;
  accentColor: string;
  logoUrl: any;
  config: any;
}

export default class ThemesFactory {
  public static create(props) {
    return new Theme({
      ...props,
      fonts: props.fonts.map((el) => new Font(el)),
    });
  }

  public static createMany(): Theme[] {
    return themeFixtures.map((item) => {
      return ThemesFactory.create(item);
    });
  }
}
