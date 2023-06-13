import Input from "../components/Input";
import { useCallback, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Button from "../components/Button";
import UserData from '../_mock/users.json'
import { UserContext } from '../_store/user-context'
import jwt from 'jsonwebtoken';
const secretKey = 'your-secret-key'; 

const Login: React.FC = () => {
  const {login} = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Perform authentication with username and password
    const isAuthenticated = authenticateUser(username, password);
    if (isAuthenticated) {
      const token = generateToken(username);
      login({username: username, token: token})
      navigate('/');
    } else {
      alert('Invalid username or password');
    }

  }

  const authenticateUser = (username: string, password: string) => {
    // Retrieve the users from the JSON file
    const users = UserData.users;

    // Find the user with matching credentials
    const authenticatedUser = users.find(
      (user: { username: string; password: string }) =>
        user.username === username && user.password === password
    );

    return !!authenticatedUser;
  };

  const generateToken = (username: string) => {
    // Generate a JWT token
    const payload = {
      username,
      // Include any additional data you want in the token payload
    };
    console.log('asdad', payload, secretKey)
    const token = jwt.sign(payload, 'secretKey')
    return token;
  };


  return (

    <div
      className="
          justify-center 
          items-center 
          flex 
          overflow-x-hidden 
          overflow-y-auto 
          fixed 
          inset-0 
          z-50 
          outline-none 
          focus:outline-none
          bg-neutral-800
          bg-opacity-70
        "
    >
      <div className="relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto">
        {/*content*/}
        <div className="
            h-full
            lg:h-auto
            border-0 
            rounded-lg 
            shadow-lg 
            relative 
            flex 
            flex-col 
            w-full 
            bg-black 
            outline-none 
            focus:outline-none
            "
        >
          {/*header*/}
          <div className="
              flex 
              items-center 
              justify-between 
              p-10 
              rounded-t
              "
          >
            <h3 className="text-3xl font-semibold text-white">
              Marquee Todos Board
            </h3>

          </div>
          {/*body*/}
          <form onSubmit={handleLogin} className="flex flex-col">
            <div className="relative p-10 flex-auto">
              <div className="flex flex-col gap-4">
                <Input
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  disabled={isLoading}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 p-10">
              <Button label="Login" secondary fullWidth large />
            </div>

          </form>

        </div>
      </div>
    </div>
  );
}

export default Login;