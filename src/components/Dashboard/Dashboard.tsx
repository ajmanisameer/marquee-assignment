import React, { useContext, useEffect, useState } from 'react';
import NavBar from "../UI/NavBar";
import { useNavigate } from 'react-router-dom';
import Todos from '../Todos/Todos';
import { TodoContext } from '../../_store/TodoContext';
import tw from 'tailwind-styled-components';
import { useAuth } from '../../_auth/useAuth';
const Section = tw.section`
  px-6
  py-16
  max-w-7xl
  m-auto
`;

const Input = tw.input`
block w-full p-4 pl-10 text-sm text-stone-950 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500
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
    console.log(user)

    if (user || storedUser) {
      setLoading(false);
    } else {
      navigate('/login');
    }
  }, [user]);

  if (loading) {
    // Show a loading message while waiting for the user context
    return <div>Loading...</div>;
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

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
          <Input type="text" value={title} onChange={handleInputChange} placeholder="What do you want to accomplish today?" required />
          <Button type="submit" >Add Todo</Button>
        </div>
      </form>
    </Section>
    <Todos />
  </ >);
}

export default Dashboard;