import fs from 'fs'
import path from 'path'

interface GeneratorOptions {
  entityName: string;
  interfacePath: string;
  outputPath: string;
}

function generateApiService (options: GeneratorOptions) {
  // Читаем содержимое интерфейса
  const interfaceContent = fs.readFileSync(options.interfacePath, 'utf-8')

  // Извлекаем имя интерфейса
  const interfaceNameMatch = interfaceContent.match(/interface\s+(\w+)/)
  if (!interfaceNameMatch) {
    throw new Error('Интерфейс не найден')
  }
  const interfaceName = interfaceNameMatch[1]

  // Генерируем код сервиса
  const serviceTemplate = `
import axios from 'axios';
import { ${interfaceName} } from './types';

export class ${interfaceName}Service {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Получить список записей
   * @returns {Promise<${interfaceName}[]>}
   */
  async getAll(): Promise<${interfaceName}[]> {
    try {
      const response = await axios.get<${interfaceName}[]>(\`\${this.baseUrl}\`);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * Получить запись по ID
   * @param {number | string} id - Идентификатор записи
   * @returns {Promise<${interfaceName}>}
   */
  async getById(id: number | string): Promise<${interfaceName}> {
    try {
      const response = await axios.get<${interfaceName}>(\`\${this.baseUrl}/\${id}\`);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * Создать новую запись
   * @param {${interfaceName}} data - Данные для создания
   * @returns {Promise<${interfaceName}>}
   */
  async create(data: Omit<${interfaceName}, 'id'>): Promise<${interfaceName}> {
    try {
      const response = await axios.post<${interfaceName}>(\`\${this.baseUrl}\`, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * Обновить существующую запись
   * @param {number | string} id - Идентификатор записи
   * @param {Partial<${interfaceName}>} data - Данные для обновления
   * @returns {Promise<${interfaceName}>}
   */
  async update(id: number | string, data: Partial<${interfaceName}>): Promise<${interfaceName}> {
    try {
      const response = await axios.patch<${interfaceName}>(\`\${this.baseUrl}/\${id}\`, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * Удалить запись
   * @param {number | string} id - Идентификатор записи
   * @returns {Promise<void>}
   */
  async delete(id: number | string): Promise<void> {
    try {
      await axios.delete(\`\${this.baseUrl}/\${id}\`);
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * Обработчик ошибок
   * @param {unknown} error - Объект ошибки
   * @private
   */
  private handleError(error: unknown): void {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', error.response?.data);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

export default ${interfaceName}Service;
`

  // Создаем директорию, если она не существует
  const outputDir = path.dirname(options.outputPath)
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // Записываем сгенерированный файл
  fs.writeFileSync(options.outputPath, serviceTemplate)

  console.log(`Сервис ${interfaceName}Service сгенерирован в ${options.outputPath}`)
}

// Пример использования
generateApiService({
  entityName: 'User',
  interfacePath: './src/types/user.interface.ts',
  outputPath: './src/services/user.service.ts'
})
