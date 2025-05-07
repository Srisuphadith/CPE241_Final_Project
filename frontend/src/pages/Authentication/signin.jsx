import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('/api/login', { username, password }, { withCredentials: true });
      if (response.data.success) {
        setMessage('Sign In successful!');
        navigate('/market');
      } else {
        setMessage('Username or password incorrect');
      }
    } catch (error) {
      console.error('Sign In error:', error);
      setMessage('An error occurred during Sign In');
    }
  };  

  return (
    <div className="pt-12 m-12 flex flex-col items-center">
      {message && (
        <div className="fixed top-2 left-1/2 transform -translate-x-1/2 z-50 flex items-center p-4 border-t-4 rounded-lg shadow-lg max-w-md w-full bg-white">
          <p className="text-sm font-medium">{message}</p>
        </div>
      )}

      <h2 className="text-5xl text-center pb-8 font-bold">Sign In</h2>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
        <div>
          <label className="text-lg">Username</label><br />
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-stone-200 px-4 py-2 rounded-lg"
            required
          />
        </div><br />
        <div>
          <label className="text-lg">Password</label><br />
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-stone-200 px-4 py-2 rounded-lg"
            required
          />
        </div><br />
        <input
          type="submit"
          value="Sign In"
          className="font-bold text-2xl bg-orange-600 px-14 py-1 rounded-2xl text-white"
        /><br />
        <p className="text-xs my-2">
          Don't have an account yet? <a href="/" className="text-orange-600">Sign Up!</a>
        </p>
      </form>
    </div>
  );
}