import React from 'react';

const QuestionCard = ({ 
  question, 
  questionNumber, 
  totalQuestions, 
  selectedAnswer, 
  onAnswerSelect 
}) => {
  
  
  // Helper function to decode HTML entities
  const decodeHtml = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  // Combine and shuffle answers - handle both property names
  const allAnswers = React.useMemo(() => {
    const correctAnswer = question.correctAnswer || question.correct_answer;
    const incorrectAnswers = question.incorrectAnswers || question.incorrect_answers || [];
    
    const answers = [
      correctAnswer,
      ...incorrectAnswers
    ];
    
    // Decode HTML entities and shuffle
    return answers.map(decodeHtml)
      .sort(() => Math.random() - 0.5);
  }, [question]);

  const decodedQuestion = decodeHtml(question.question);
  const category = decodeHtml(question.category);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      {/* Question Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-600 font-medium">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round((questionNumber / totalQuestions) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Category and Difficulty */}
      <div className="flex gap-3 mb-4">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
          {category}
        </span>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          question.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
          question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {question.difficulty?.charAt(0).toUpperCase() + question.difficulty?.slice(1)}
        </span>
      </div>
      
      {/* Question Text */}
      <div className="text-xl font-semibold text-gray-800 mb-6 leading-relaxed">
        {decodedQuestion}
      </div>
      
      {/* Answers */}
      <div className="space-y-3">
        {allAnswers.map((answer, index) => (
          <div
            key={index}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedAnswer === answer
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
            }`}
            onClick={() => onAnswerSelect(answer)}
          >
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                selectedAnswer === answer
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-400'
              }`}>
                {selectedAnswer === answer && (
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                )}
              </div>
              <span className="text-gray-700">{answer}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;