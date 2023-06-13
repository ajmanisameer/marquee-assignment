import Input from "../UI/Input";
import { useCallback, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Button from "../UI/Button";
import UserData from '../../_mock/users.json'
import { UserContext } from '../../_store/UserContext'
import jwt from 'jsonwebtoken';
import LoginContainer from "../UI/LoginContainer";
// import dotenv from 'dotenv';
// dotenv.config();
// const secretKey = process.env.SECRET_KEY;
const secretKey = "CxXlLETMPpQ1FDLnSjZlcQJwYvG998NsAavQOvHInoeg3XPXNu2/t+5lGj5BdNqxMuPVAmpGjhSmDEJdqKQgIQ==";


const Login: React.FC = () => {
  console.log(secretKey)
  const { login } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const sanitizedUsername = sanitizeInput(username);
    const sanitizedPassword = sanitizeInput(password);

    // Perform authentication with username and password
    const isAuthenticated = authenticateUser(sanitizedUsername, sanitizedPassword);
    if (isAuthenticated) {
      const token = generateToken(username);
      login({ username: sanitizedUsername, token: token })
      navigate('/');
    } else {
      alert('Invalid username or password');
    }
  }

  const sanitizeInput = (input: string) => {
    // Remove or escape any potentially malicious characters or sequences
    return input.replace(/[^\w\s]/gi, '');
  };

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

  // token generation
  const generateToken = (username: string) => {
    // Generate a JWT token
    const payload = {
      username,
      // Include any additional data you want in the token payload
    };
    const token = jwt.sign(payload, 'secretKey')
    return token;
  };


  return (
    <LoginContainer>
      <div className="flex justify-center items-center p-10 rounded-t">
        <h3 className="text-3xl text-center font-semibold text-white">
          Marquee Tasks Board
          <br />
          (your accountability partner)
        </h3>
      </div>
      {/*body*/}
      <form onSubmit={handleLogin} className="flex flex-col">
        <div className="relative p-10 flex-auto">
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Username"
              required
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
    </LoginContainer>
  );
}

export default Login;