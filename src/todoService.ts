import { Todo } from './types';
import { generateId } from './utils';
import { readTodos, writeTodos } from './storage';

export function getTodos(): Todo[] {
  return readTodos();
}

export function addTodo(title: string): void {
  const todos = readTodos();

  const newTodo: Todo = {
    id: generateId(),
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  todos.push(newTodo);

  writeTodos(todos);

  console.log('Todo berhasil ditambahkan.');
}

export function listTodos(): void {
  const todos = readTodos();

  if (todos.length === 0) {
    console.log('Belum ada todo.');
    return;
  }

  console.log('\n===== TODO LIST =====');

  todos.forEach((todo, index) => {
    const status = todo.completed ? '[DONE]' : '[ACTIVE]';

    console.log(`${status} ${index + 1}. ${todo.title}`);
  });
}

export function completeTodo(id: number): void {
  const todos = readTodos();

  const todo = todos.find((item) => item.id === id);

  if (!todo) {
    console.log('Todo tidak ditemukan.');
    return;
  }

  todo.completed = true;

  writeTodos(todos);

  console.log('Todo berhasil diselesaikan.');
}

export function deleteTodo(id: number): void {
  const todos = readTodos();

  const filteredTodos = todos.filter((todo) => todo.id !== id);

  if (filteredTodos.length === todos.length) {
    console.log('Todo tidak ditemukan.');
    return;
  }
  writeTodos(filteredTodos);

  console.log('Todo berhasil dihapus.');
}
