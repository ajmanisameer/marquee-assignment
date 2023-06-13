import React, { useContext, useEffect, useState } from 'react';
import NavBar from "../components/NavBar";
import { useNavigate } from 'react-router-dom';
import Todos from '../components/Todos';
import { TodoContext } from '../_store/TodoContext';
import Container from '../components/Container';
import tw from 'tailwind-styled-components';
import { useAuth } from '../_auth/useAuth';
const Section = tw.section`
  px-6
  py-16
  max-w-7xl
  m-auto
`;

const Input = tw.input`
  w-64
  rounded-l-md
  focus:outline-none
  focus:ring-2
  focus:ring-purple-500
`;

const Button = tw.button`
  flex
  items-center
  justify-center
  w-12
  h-full
  rounded-r-md
  bg-purple-800
  text-white
  focus:outline-none
`;

const Dashboard: React.FC = () => {
  const user = useAuth();
  console.log(user)
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const { addTodo } = useContext(TodoContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
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
        <Input
          type="text"
          placeholder="Enter Todo"
          value={title}
          onChange={handleInputChange}
        />
        <button type="submit">Add Todo</button>
      </form>
    </Section>
    <Todos />
  </ >);
}

export default Dashboard;