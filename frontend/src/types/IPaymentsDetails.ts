// export interface IPayments {
//   "Дата платежа": "03/22/2023",
//   "Наименование платежа": "аванс 1-2 этапов",
//   "Сумма в рублях": 0,
//   "Тип валюты": "нет",
//   "Заактировано": 0,
//   "Статус платежа": "Отложен",
//   "КБК": "725 04 11 47 2 U1 00100 241",
//   "Наименование расхода в разрезе КБК": "Закупка товаров, работ и услуг для обеспечения государственных нужд",
//   "№ госконтракта": "Н.4о.241.19.23.1075",
//   "Проект": "ФП 1. Новая атомная энергетика, в том числе малые атомные реакторы для удаленных территорий",
//   "Результат": "ФП-1.10. Завершено строительство опытнодемонстрационного энергоблока с реактором на быстрых нейтронах со свинцовым теплоносителем на площадке закрытого административнотерриториального образования «Северск»",
//   "Краткое название": "ГИДРО",
//   "Исполнитель": "АО \"ВНИИНМ\"",
//   "Куратор": "Кондрашов Евгений Николаевич",
//   "Дата начала контракта": "04/18/2023",
//   "Дата завершения контракта": "12/13/2024",
//   "Предмет госконтракта": "НИОКР «Разработка и обоснование технологических и проектно-конструкторских решений, касающихся гидрометаллургических переделов для пристанционного блока по переработке отработавшего ядерного топлива реакторов на быстрых нейтронах. Этап 2023 – 2024 годов»",
//   "Тип элемента": "Элемент",
//   "Путь": "sites/rkm-CashPlan/Lists/PayDetail"
// }

import { ILookupField } from 'src/types/IBase'

/**
 * Интерфейс описывает детали платежа по государственному контракту
 * @interface IPaymentDetails
 */
export interface IPaymentDetails {
  /**
   * ID
   * @type {number}
   */
  id: number;

  /**
   * Наименование платежа
   * @type {string}
   */
  title: string;

  /**
   * Дата платежа
   * @type {Date}
   */
  paymentDate: Date;

  /**
   * OLD Наименование платежа
   * @type {string}
   */
  paymentName: string;

  /**
   * Сумма в рублях
   * @type {number}
   */
  amountInRubles: number;

  /**
   * Сумма в валюте
   * @type {number}
   */
  amount: number;

  /**
   * Тип валюты
   * @type {ILookupField}
   */
  currencyLookup: ILookupField;

  /**
   * OLD Тип валюты
   * @type {string}
   */
  currencyType: string;

  /**
   * Сумма заактированная
   * @type {number}
   */
  invoiced: number;

  /**
   * Статус платежа
   * @type {ILookupField}
   */
  paymentStatusLookup: ILookupField;

  /**
   * OLD Статус платежа
   * @type {string}
   */
  paymentStatus: string;

  /**
   * Код бюджетной классификации
   * @type {ILookupField}
   */
  kbkCodeLookup: ILookupField;

  /**
   * OLD Код бюджетной классификации
   * @type {string}
   */
  kbkCode: string;

  /**
   * Наименование расхода в разрезе КБК
   * @type {string}
   */
  expenditureDetails: string;

  /**
   * Государственный контракт
   * @type {ILookupField}
   */
  governmentContractLookup: ILookupField;

  /**
   * Номер государственного контракта
   * @type {string}
   */
  governmentContractNumber: string;

  /**
   * Проект
   * @type {string}
   */
  project: string;

  /**
   * Результат
   * @type {string}
   */
  result: string;

  /**
   * Исполнитель
   * @type {string}
   */
  contractor: string;

  /**
   * Куратор проекта
   * @type {string}
   */
  curator: string;

  /**
   * Дата начала контракта
   * @type {Date}
   */
  contractStartDate: Date;

  /**
   * Дата завершения контракта
   * @type {Date}
   */
  contractEndDate: Date;

  /**
   * Предмет государственного контракта
   * @type {string}
   */
  contractSubject: string;

  /**
   * Тип элемента
   * @type {string}
   */
  elementType: string;

  /**
   * Путь
   * @type {string}
   */
  path: string;

  /**
   * Комментарий
   * @type {string}
   */
  comment: string;

  /**
   * Краткое название
   * @type {string}
   */
  description: string;
}
