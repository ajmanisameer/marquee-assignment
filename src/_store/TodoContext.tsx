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
  deleteTodo: (todoId: number) => void;
  deleteSubtask: (todoId: number, subtaskId: number) => void;
}

export const TodoContext = createContext<TodoContextProps>({
  todos: [],
  addTodo: () => {},
  addSubtask: () => {},
  toggleTodo: () => {},
  toggleSubtask: () => {},
  deleteTodo: () => {},
  deleteSubtask: () => {},
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

  // strike through a task
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

  // strike through a subtask
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

  // delete a complete todo
  const deleteTodo = (todoId: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
  };

  // delete a subtask
  const deleteSubtask = (todoId: number, subtaskId: number) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            subtasks: todo.subtasks.filter(
              (subtask) => subtask.id !== subtaskId
            ),
          };
        }
        return todo;
      });
    });
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, addSubtask, toggleTodo, toggleSubtask, deleteTodo, deleteSubtask }}>
      {children}
    </TodoContext.Provider>
  );
};
