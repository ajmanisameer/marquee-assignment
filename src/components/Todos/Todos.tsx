import React, { useContext } from 'react';
import { TodoContext } from '../../_store/TodoContext';
import { FaTimes } from 'react-icons/fa'; // Import the desired icon component
import tw from 'tailwind-styled-components';
import TodoWrapper from '../UI/TodoWrapper';
import SubtaskWrapper from '../UI/SubtaskWrapper';
import TodoInput from '../UI/TodoInput';

const Input = tw.input`
block w-full p-4 pl-10 text-sm text-stone-950 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500
`;

const Button = tw.button`
text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
`;

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
  const {
    toggleTodo,
    toggleSubtask,
    deleteTodo,
    deleteSubtask,
  } = useContext(TodoContext);


  // strike through a task
  const handleTodoToggle = (todoId: number) => {
    toggleTodo(todoId);
  };

  // strike through a subtask
  const handleSubtaskToggle = (todoId: number, subtaskId: number) => {
    toggleSubtask(todoId, subtaskId);
  };

  // delete a complete todo
  const handleTodoDelete = (todoId: number) => {
    deleteTodo(todoId);
  };

  // delete a subtask
  const handleSubtaskDelete = (todoId: number, subtaskId: number) => {
    deleteSubtask(todoId, subtaskId);
  };



  // create a subtask
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
        <details>
          <TodoWrapper>
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
              <span className="flex-grow"></span>
              <FaTimes
                className="delete-icon mt-1 fill-red-500"
                onClick={() => handleTodoDelete(todo.id)}
              />
            </span>
            {/* Collapse todo ICON */}
            <svg className="w-5 h-5 text-gray-500 transition group-open:rotate-90" xmlns="http://www.w3.org/2000/svg"
              width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z">
              </path>
            </svg>
          </TodoWrapper>
          {/* Subtasks */}
          {todo.subtasks.map((subtask) => (
            <SubtaskWrapper  key={subtask.id} >
              <ul  className="flex ml-10 gap-1 pl-2">
                <li
                  key={subtask.id}
                  className={subtask.completed ? 'line-through' : ''}
                >
                  <input
                    type="checkbox"
                    checked={subtask.completed}
                    onChange={() => handleSubtaskToggle(todo.id, subtask.id)}
                  />
                  <span key={subtask.id} style={{ marginLeft: '0.5rem' }}>{subtask.title}</span>
                </li>
                <FaTimes
                  className="delete-icon mt-1 ml-3 fill-red-500"
                  onClick={() => handleSubtaskDelete(todo.id, subtask.id)}
                />
                {/* <li key={subtask.id}><a href="">{subtask.title}</a></li> */}
              </ul>
            </SubtaskWrapper>
          ))}
          {/* Add Subtask */}
          <form onSubmit={(e) => handleSubtaskSubmit(e, todo.id)}>
            <div className="relative md:mx-30">
            <Input type="text" name="subtaskTitle" placeholder="Add subtask" required />
            <Button type="submit" >Add Subtask</Button>
            </div>
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
