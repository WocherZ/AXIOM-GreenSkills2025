import { ILookupField } from 'src/types/IBase'

/**
 * Интерфейс описывает лимит по КБК для года
 * @interface IKbkLimit
 */
export interface IKbkLimit {
  /**
   * ID
   * @type {number}
   */
  id: number;

  /**
   * Наименование лимита
   * @type {string}
   */
  title: string;

  /**
   * SLUG
   * @type {string}
   */
  slug: string;

  /**
   * КБК код
   * @type {string}
   */
  code: string;

  /**
   * ID КБК кодa
   * @type {number}
   */
  kbk: number;

  /**
   * ID КБК кодa
   * @type {ILookupField}
   */
  kbkLookup: ILookupField;

  /**
   * Год
   * @type {number}
   */
  year: number;

  /**
   * Лимит
   * @type {number}
   */
  limit: number;

  /**
   * Краткое название
   * @type {string}
   */
  description: string;
}
