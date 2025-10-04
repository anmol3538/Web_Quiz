import { useState, useEffect, useRef } from 'react';
import { fetchQuizQuestions } from '../services/api';

export const useQuizApi = (email) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const hasFetched = useRef(false);

  
  const manualRetry = async () => {
    hasFetched.current = false;
    setRetryCount(0);
    setError(null);
    setLoading(true);
    
    try {
      const data = await fetchQuizQuestions();
      console.log('Manual retry - Questions stored:', data);
      setQuestions(data);
      setRetryCount(0);
      hasFetched.current = true;
    } catch (err) {
      console.error('Error loading questions:', err);
      setError(err.message || 'Failed to load questions. Please refresh the page and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Single useEffect that runs only once when email is available
  useEffect(() => {
    // Early return if already fetched or no email
    if (!email || hasFetched.current) return;

    hasFetched.current = true;

    // Single fetch function with retry logic
    const fetchQuestionsOnce = async (attemptNum = 0) => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await fetchQuizQuestions();
        console.log('Questions stored in state:', data);
        setQuestions(data);
        setRetryCount(0);
      } catch (err) {
        console.error('Error loading questions:', err);
        
        if (err.message.includes('Too many requests')) {
          if (attemptNum < 3) {
            setRetryCount(attemptNum + 1);
            const delay = Math.pow(2, attemptNum) * 2000; // 2s, 4s, 8s
            setTimeout(() => {
              fetchQuestionsOnce(attemptNum + 1);
            }, delay);
            return;
          }
        }
        
        setError(err.message || 'Failed to load questions. Please refresh the page and try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionsOnce();
  }, [email]);

  return {
    questions,
    loading,
    error,
    retryCount,
    manualRetry
  };
};
