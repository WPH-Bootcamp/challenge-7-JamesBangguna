import fs from 'fs';
import path from 'path';
import { Todo } from './types';
import { isTodoArray } from './utils';

const dataDir = path.join(__dirname, '../data');
const filePath = path.join(dataDir, 'todos.json');

function ensureDataFile(): void {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf-8');
  }
}

export function readTodos(): Todo[] {
  try {
    ensureDataFile();

    const data = fs.readFileSync(filePath, 'utf-8');

    const parsedData: unknown = JSON.parse(data);

    if (!isTodoArray(parsedData)) {
      throw new Error('Format data todos tidak valid.');
    }

    return parsedData;
  } catch (error) {
    console.error('Gagal membaca file todos:', error);
    return [];
  }
}

export function writeTodos(todos: Todo[]): void {
  try {
    ensureDataFile();

    fs.writeFileSync(filePath, JSON.stringify(todos, null, 2), 'utf-8');
  } catch (error) {
    console.error('Gagal menyimpan todos:', error);
  }
}
