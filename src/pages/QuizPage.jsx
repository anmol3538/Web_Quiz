import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEmail } from '../context/EmailContext'
import { useQuizApi } from '../hooks/useQuizApi'

const QuizPage = () => {
  const { email } = useEmail()
  const navigate = useNavigate()
  const { questions, loading, error, retryCount, manualRetry } = useQuizApi(email)
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(30 * 60)

  useEffect(() => {
    if (!email) {
      navigate('/email')
    }
  }, [email, navigate])

  // Timer countdown effect
  useEffect(() => {
    if (timeLeft <= 0) {
      const score = calculateScore()
      const results = {
        score,
        totalQuestions: questions.length,
        selectedAnswers,
        questions,
        timeSpent: 30 * 60 - timeLeft,
        email
      }
      navigate('/results', { state: results })
      return
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          const score = calculateScore()
          const results = {
            score,
            totalQuestions: questions.length,
            selectedAnswers,
            questions,
            timeSpent: 30 * 60 - timeLeft,
            email
          }
          navigate('/results', { state: results })
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, questions.length, selectedAnswers, email, navigate])


  const handleAnswerSelect = (answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answer
    }))
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      handleQuizComplete()
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const handleQuizComplete = () => {
    const score = calculateScore()
    const results = {
      score,
      totalQuestions: questions.length,
      selectedAnswers,
      questions,
      timeSpent: 30 * 60 - timeLeft,
      email
    }
    
    navigate('/results', { state: results })
  }

  const calculateScore = () => {
    const decodeHtml = (html) => {
      const txt = document.createElement('textarea');
      txt.innerHTML = html;
      return txt.value;
    };

    return questions.reduce((score, question, index) => {
      const userAnswer = selectedAnswers[index];
      const correctAnswer = decodeHtml(question.correctAnswer || question.correct_answer);
      
      if (userAnswer === correctAnswer) {
        return score + 1;
      }
      return score;
    }, 0);
  }

  const handleQuestionNavigation = (index) => {
    setCurrentQuestionIndex(index)
  }

  // Helper function to decode HTML entities
  const decodeHtml = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full border border-gray-700">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-200 text-lg font-medium">Loading Questions</p>
            <p className="text-gray-400 text-sm mt-2">Please wait while we prepare your quiz</p>
            {retryCount > 0 && (
              <p className="text-yellow-400 text-sm mt-2">
                Retry attempt {retryCount} - Avoiding rate limits...
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full text-center border border-gray-700">
          <div className="text-red-400 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-200 mb-2">Unable to Load Quiz</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={manualRetry}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate('/email-verified')}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1
  const isFirstQuestion = currentQuestionIndex === 0

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">MCQ Quiz</h1>
            <p className="text-gray-400">Welcome, {email}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-400 font-mono">
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </div>
              <div className="text-sm text-gray-400">Time Remaining</div>
              <div className="w-32 bg-gray-700 rounded-full h-2 mt-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    timeLeft < 300 ? 'bg-red-500' : timeLeft < 600 ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${(timeLeft / (30 * 60)) * 100}%` }}
                ></div>
              </div>
            </div>
            <button
              onClick={() => navigate('/email-verified')}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Exit Quiz
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Question Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Question Navigation</h3>
              <div className="grid grid-cols-5 lg:grid-cols-3 gap-2">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuestionNavigation(index)}
                    className={`w-10 h-10 rounded-lg font-medium transition-all ${
                      index === currentQuestionIndex
                        ? 'bg-blue-600 text-white shadow-lg transform scale-110'
                        : selectedAnswers[index]
                        ? 'bg-green-600 text-white shadow'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              
              <div className="mt-6 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span className="text-gray-300">Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span className="text-gray-300">Current</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-600 rounded"></div>
                  <span className="text-gray-300">Not Visited</span>
                </div>
              </div>

              {/* Progress Stats */}
              <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                <div className="bg-gray-700 rounded-lg p-3">
                  <div className="text-2xl font-bold text-green-400">{Object.keys(selectedAnswers).length}</div>
                  <div className="text-gray-400 text-sm">Answered</div>
                </div>
                <div className="bg-gray-700 rounded-lg p-3">
                  <div className="text-2xl font-bold text-gray-400">{questions.length - Object.keys(selectedAnswers).length}</div>
                  <div className="text-gray-400 text-sm">Remaining</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {currentQuestion && (
              <div className="bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700">
                {/* Question Header */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-white">Question {currentQuestionIndex + 1}</h2>
                    <span className="text-sm text-gray-400 bg-gray-700 px-3 py-1 rounded-full">
                      {currentQuestionIndex + 1} of {questions.length}
                    </span>
                  </div>
                  
                  <div className="flex gap-3 mb-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {decodeHtml(currentQuestion.category)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      currentQuestion.difficulty === 'easy' ? 'bg-green-600 text-white' :
                      currentQuestion.difficulty === 'medium' ? 'bg-yellow-600 text-white' :
                      'bg-red-600 text-white'
                    }`}>
                      {currentQuestion.difficulty?.charAt(0).toUpperCase() + currentQuestion.difficulty?.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Question Text */}
                <div className="text-xl font-semibold text-gray-100 mb-8 leading-relaxed">
                  {decodeHtml(currentQuestion.question)}
                </div>

                {/* Answer Options */}
                <div className="space-y-3 mb-8">
                  {(() => {
                    const correctAnswer = currentQuestion.correctAnswer || currentQuestion.correct_answer;
                    const incorrectAnswers = currentQuestion.incorrectAnswers || currentQuestion.incorrect_answers || [];
                    const allAnswers = [correctAnswer, ...incorrectAnswers]
                      .map(decodeHtml);

                    return allAnswers.map((answer, index) => (
                      <div
                        key={`${currentQuestionIndex}-${index}`}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                          selectedAnswers[currentQuestionIndex] === answer
                            ? 'border-blue-500 bg-blue-900/30 shadow-md'
                            : 'border-gray-600 hover:border-blue-400 hover:bg-gray-700/50'
                        }`}
                        onClick={() => handleAnswerSelect(answer)}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                            selectedAnswers[currentQuestionIndex] === answer
                              ? 'border-blue-500 bg-blue-500'
                              : 'border-gray-500'
                          }`}>
                            {selectedAnswers[currentQuestionIndex] === answer && (
                              <div className="w-2 h-2 rounded-full bg-white"></div>
                            )}
                          </div>
                          <span className="text-gray-200">{answer}</span>
                        </div>
                      </div>
                    ));
                  })()}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={handlePrevious}
                    disabled={isFirstQuestion}
                    className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                      isFirstQuestion
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-600 hover:bg-gray-500 text-white shadow hover:shadow-md'
                    }`}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </button>
                  
                  <button
                    onClick={handleNext}
                    className="flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                  >
                    {isLastQuestion ? 'Finish Quiz' : 'Next'}
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizPage