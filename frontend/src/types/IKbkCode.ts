/**
 * Интерфейс описывает КБК код
 * @interface IKbkCode
 */
export interface IKbkCode {
  /**
   * ID
   * @type {number}
   */
  id: number;

  /**
   * Наименование Кода
   * @type {string}
   */
  title: string;

  /**
   * Slug
   * @type {string}
   */
  slug: string;

  /**
   * Сам КБК код
   * @type {string} ### ## ## ## # X# ##### ###
   */
  code: string;

  /**
   * Краткое название
   * @type {string}
   */
  description: string;
}
