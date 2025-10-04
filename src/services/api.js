import axios from 'axios';
 

export const fetchQuizQuestions = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const response = await axios.get('https://opentdb.com/api.php?amount=15&type=multiple');
    console.log('API Response:', response.data);
    
    if (response.data.response_code !== 0) {
      throw new Error('Failed to fetch questions from API');
    }
    
    if (!response.data.results || response.data.results.length === 0) {
      throw new Error('No questions received from API');
    }
    
    const transformedQuestions = response.data.results.map(question => ({
      ...question,
      correctAnswer: question.correct_answer,
      incorrectAnswers: question.incorrect_answers || question.incorrect_answer || []
    }));
    
    console.log('Original Questions (from API):', response.data.results);
    console.log('Transformed Questions (for display):', transformedQuestions);
    
    return transformedQuestions;
  } catch (error) {
    console.error('Error fetching questions:', error);

    if (error.response?.status === 429) {
      throw new Error('Too many requests. Please wait a moment and try again.');
    }
    
    if (error.response?.status >= 500) {
      throw new Error('Server error. Please try again later.');
    }

    throw new Error('Failed to load quiz questions. Please try again.');
  }
};