import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmail } from '../context/EmailContext';

const EmailForm = () => {
  const navigate = useNavigate();
  const { setEmail } = useEmail();
  const [inputEmail, setInputEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!inputEmail.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(inputEmail)) {
      setError('Please enter a valid email address');
      return;
    }

    setEmail(inputEmail);
    navigate('/email-verified');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-700">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome!</h1>
          <p className="text-gray-400">Please enter your email address to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-white placeholder-gray-400"
              placeholder="Enter your email address"
              disabled={!!error}
            />
          </div>

          {error && (
            <div className="bg-red-900/50 border border-red-500 rounded-lg p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Continue to Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailForm;
