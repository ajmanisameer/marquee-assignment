import React, { useContext } from 'react';
import { TodoContext } from '../_store/TodoContext';
import { FaCheckCircle } from "react-icons/fa";
interface TodoProps {
  todo: {
    id: number;
    title: string;
    completed: boolean;
    subtasks: {
      id: number;
      title: string;
      completed: boolean;
    }[];
  };
}

const Todo: React.FC<TodoProps> = ({ todo }) => {
  const { addSubtask } = useContext(TodoContext);
  const { toggleTodo, toggleSubtask } = useContext(TodoContext);

  const handleTodoToggle = (todoId: number) => {
    toggleTodo(todoId);
  };

  const handleSubtaskToggle = (todoId: number, subtaskId: number) => {
    toggleSubtask(todoId, subtaskId);
  };


  const handleSubtaskSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    todoId: number
  ) => {
    event.preventDefault();

    const input = event.target as HTMLFormElement;
    const title = input.subtaskTitle.value.trim();

    const sanitizedTitle = sanitizeInput(title);

    if (sanitizedTitle !== '') {
      addSubtask(todoId, sanitizedTitle);
      input.subtaskTitle.value = '';
    }
  };

  const sanitizeInput = (input: string) => {
    // Remove or escape any potentially malicious characters or sequences
    return input.replace(/[^\w\s]/gi, '');
  };

  return (
    <div>
      <li>
        <details >
          <summary
            className="flex items-center justify-between gap-2 p-2 font-medium marker:content-none hover:cursor-pointer">
            <span className="flex gap-2">
              {/* <FaCheckCircle className='mt-1' /> */}
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleTodoToggle(todo.id)}
              />
              <span className={todo.completed ? 'line-through' : ''} style={{ marginLeft: '0.5rem' }}>
                {todo.title}
              </span>
            </span>
            <svg className="w-5 h-5 text-gray-500 transition group-open:rotate-90" xmlns="http://www.w3.org/2000/svg"
              width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z">
              </path>
            </svg>


          </summary>
          {todo.subtasks.map((subtask) => (
            <article className="px-4 pb-4">
              <ul className="flex flex-col gap-1 pl-2">
                <li
                  key={subtask.id}
                  className={subtask.completed ? 'line-through' : ''}
                >
                  <input
                    type="checkbox"
                    checked={subtask.completed}
                    onChange={() => handleSubtaskToggle(todo.id, subtask.id)}
                  />
                  <span style={{ marginLeft: '0.5rem' }}>{subtask.title}</span>
                </li>
                {/* <li key={subtask.id}><a href="">{subtask.title}</a></li> */}
              </ul>

            </article>
          ))}
          <form onSubmit={(e) => handleSubtaskSubmit(e, todo.id)}>
            <input type="text" name="subtaskTitle" placeholder="Enter Subtask" />
            <button type="submit">Add Subtask</button>
          </form>
        </details>
      </li>

    </div>
  );
};

const Todos: React.FC = () => {
  const { todos } = useContext(TodoContext);

  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Tasks</h2>

      <ul className="flex flex-col gap-2 max-w-[300px] mx-auto mt-12">
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </ul>

    </div>
  );
};

export default Todos;
