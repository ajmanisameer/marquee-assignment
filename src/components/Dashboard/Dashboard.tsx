import React, { useContext, useEffect, useState } from 'react';
import NavBar from "../UI/NavBar";
import { useNavigate } from 'react-router-dom';
import Todos from '../Todos/Todos';
import { TodoContext } from '../../_store/TodoContext';
import tw from 'tailwind-styled-components';
import { useAuth } from '../../_auth/useAuth';
import TodoInput from '../UI/TodoInput';
const Section = tw.section`
  px-6
  py-16
  max-w-7xl
  m-auto
`;


const Button = tw.button`
text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
`;

const Dashboard: React.FC = () => {
  const user = useAuth();
  const storedUser = localStorage.getItem('user')
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const { addTodo } = useContext(TodoContext);
  const navigate = useNavigate();

  useEffect(() => {
    // route guard to check if user is authenticated
    if (user || storedUser) {
      setLoading(false);
    } else {
      // redirect to login
      navigate('/login');
    }
  }, [user]);

  if (loading) {
    // Show a loading message while waiting for the user context
    return <div>Loading...</div>;
  }

  // updae title onto the state
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  // create a task
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const sanitizedTitle = sanitizeInput(title);

    if (sanitizedTitle.trim() !== '') {
      addTodo(sanitizedTitle);
      setTitle('');
    }
  };

  const sanitizeInput = (input: string) => {
    // Remove or escape any potentially malicious characters or sequences
    return input.replace(/[^\w\s]/gi, '');
  };

  return (<>
    <NavBar />
    <Section>
      <form onSubmit={handleSubmit}>
        <div className="relative lg:mx-80 md:mx-30">
          <TodoInput type="text" value={title} onChange={handleInputChange} placeholder="What do you want to accomplish today?" required />
          <Button type="submit" >Add Todo</Button>
        </div>
      </form>
    </Section>
    <Todos />
  </ >);
}

export default Dashboard;