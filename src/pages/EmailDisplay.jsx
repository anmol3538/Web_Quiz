import { useNavigate } from 'react-router-dom';
import { useEmail } from '../context/EmailContext';

const EmailDisplay = () => {
  const navigate = useNavigate();
  const { email } = useEmail();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-lg border border-gray-700">
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <svg className="w-7 h-7 sm:w-8 sm:h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">Email Registered!</h1>
          <p className="text-gray-400 text-sm sm:text-base">Your email address has been successfully captured</p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-600">
          <div className="flex items-start sm:items-center gap-3">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-400">Email Address</p>
              <p className="text-base sm:text-lg font-semibold text-white break-words">{email}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <button
            onClick={() => navigate('/quiz')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Start Quiz Now
          </button>
          <button
            onClick={() => navigate('/email')}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Back to Email Form
          </button>
          <div className="text-center">
            <p className="text-xs sm:text-sm text-gray-400">
              This email will be used for further communication and updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailDisplay;
