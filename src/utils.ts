import { Todo } from './types';

export function isTodo(value: unknown): value is Todo {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const todo = value as Todo;

  return (
    typeof todo.id === 'number' &&
    typeof todo.title === 'string' &&
    typeof todo.completed === 'boolean' &&
    typeof todo.createdAt === 'string'
  );
}

export function isTodoArray(value: unknown): value is Todo[] {
  return Array.isArray(value) && value.every(isTodo);
}

export function generateId(): number {
  return Date.now();
}
