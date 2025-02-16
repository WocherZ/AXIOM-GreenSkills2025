/**
 * Интерфейс описывает Статус платежа
 * @interface IPaymentStatus
 */
export interface IPaymentStatus {
  /**
   * ID
   * @type {number}
   */
  id: number;

  /**
   * Наименование
   * @type {string}
   */
  title: string;

  /**
   * Slug
   * @type {string}
   */
  slug: string;

}
