import React, { createContext, useState } from 'react';

interface Subtask {
  id: number;
  title: string;
  completed: boolean;
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  subtasks: Subtask[];
}

interface TodoContextProps {
  todos: Todo[];
  addTodo: (title: string) => void;
  addSubtask: (todoId: number, title: string) => void;
  toggleTodo: (todoId: number) => void;
  toggleSubtask: (todoId: number, subtaskId: number) => void;
}

export const TodoContext = createContext<TodoContextProps>({
  todos: [],
  addTodo: () => {},
  addSubtask: () => {},
  toggleTodo: () => {},
  toggleSubtask: () => {},

});

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title: title,
      completed: false,
      subtasks: [],
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const addSubtask = (todoId: number, title: string) => {
    const newSubtask: Subtask = {
      id: Date.now(),
      title: title,
      completed: false,
    };

    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            subtasks: [...todo.subtasks, newSubtask],
          };
        }
        return todo;
      });
    });
  };

  const toggleTodo = (todoId: number) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });
    });
  };

  const toggleSubtask = (todoId: number, subtaskId: number) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            subtasks: todo.subtasks.map((subtask) => {
              if (subtask.id === subtaskId) {
                return {
                  ...subtask,
                  completed: !subtask.completed,
                };
              }
              return subtask;
            }),
          };
        }
        return todo;
      });
    });
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, addSubtask, toggleTodo, toggleSubtask }}>
      {children}
    </TodoContext.Provider>
  );
};
