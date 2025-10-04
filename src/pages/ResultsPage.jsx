import React from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'

const ResultsPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const results = location.state

  // Redirect if no results data
  if (!results) {
    navigate('/quiz')
    return null
  }

  const { score, totalQuestions, selectedAnswers, questions, timeSpent, email } = results
  const percentage = Math.round((score / totalQuestions) * 100)

  // Helper function to decode HTML entities
  const decodeHtml = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  const getPerformanceMessage = () => {
    if (percentage >= 90) return "Outstanding!"
    if (percentage >= 75) return "Excellent Work!"
    if (percentage >= 60) return "Good Job!"
    if (percentage >= 40) return "Not Bad!"
    return "Keep Practicing! 💪"
  }

  const getPerformanceColor = () => {
    if (percentage >= 90) return "from-green-500 to-emerald-600"
    if (percentage >= 75) return "from-blue-500 to-cyan-600"
    if (percentage >= 60) return "from-yellow-500 to-orange-500"
    if (percentage >= 40) return "from-orange-500 to-red-500"
    return "from-red-500 to-pink-600"
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Quiz Results</h1>
            <p className="text-gray-400">User: {email}</p>
          </div>
          <Link
            to="/email-verified"
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Back to Home
          </Link>
        </div>

        {/* Score Card */}
        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 border border-gray-700">
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r ${getPerformanceColor()} mb-6`}>
              <span className="text-white text-3xl font-bold">{percentage}%</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{getPerformanceMessage()}</h2>
            <p className="text-gray-400 text-lg mb-4">
              You scored <span className="font-bold text-blue-400">{score}</span> out of <span className="font-bold text-white">{totalQuestions}</span> questions correctly
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto mb-6">
              <div className="bg-green-600/20 rounded-lg p-3 border border-green-500/30">
                <div className="text-green-400 font-bold text-xl">{score}</div>
                <div className="text-green-300 text-sm">Correct</div>
              </div>
              <div className="bg-red-600/20 rounded-lg p-3 border border-red-500/30">
                <div className="text-red-400 font-bold text-xl">{totalQuestions - score}</div>
                <div className="text-red-300 text-sm">Incorrect</div>
              </div>
            </div>
            <p className="text-gray-400">
              Time taken: <span className="font-medium text-white">{formatTime(timeSpent)}</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mb-8">
          <button
            onClick={() => navigate('/quiz')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Take Quiz Again 🔄
          </button>
          <Link
            to="/email-verified"
            className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-4 rounded-lg font-semibold text-center transition-colors"
          >
            Back to Home
          </Link>
        </div>

        {/* Detailed Results */}
        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
          <h3 className="text-2xl font-bold text-white mb-6">Detailed Review</h3>
          <div className="space-y-6">
            {questions.map((question, index) => {
              const userAnswer = selectedAnswers[index]
              // Handle both property names for correct answer
              const correctAnswer = decodeHtml(question.correctAnswer || question.correct_answer)
              const isCorrect = userAnswer === correctAnswer
              const wasAnswered = userAnswer !== undefined
              const category = decodeHtml(question.category)
              
              return (
                <div key={index} className={`border-l-4 ${
                  isCorrect ? 'border-green-500' : 'border-red-500'
                } pl-4 py-2 bg-gray-700/50 rounded-r-lg`}>
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-white flex-1">
                      Q{index + 1}: {decodeHtml(question.question)}
                    </h4>
                    <div className="flex gap-2 ml-4 flex-shrink-0">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        isCorrect
                          ? 'bg-green-600/20 text-green-400 border border-green-500/30'
                          : 'bg-red-600/20 text-red-400 border border-red-500/30'
                      }`}>
                        {isCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        question.difficulty === 'easy' ? 'bg-green-600/20 text-green-400 border border-green-500/30' :
                        question.difficulty === 'medium' ? 'bg-yellow-600/20 text-yellow-400 border border-yellow-500/30' :
                        'bg-red-600/20 text-red-400 border border-red-500/30'
                      }`}>
                        {question.difficulty?.charAt(0).toUpperCase() + question.difficulty?.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-400 mb-2">
                    Category: {category}
                  </div>

                  <div className="space-y-2">
                    <div className={`p-3 rounded-lg ${
                      isCorrect
                        ? 'bg-green-600/10 border border-green-500/30'
                        : 'bg-red-600/10 border border-red-500/30'
                    }`}>
                      <span className="font-medium text-gray-300">Your answer: </span>
                      <span className={isCorrect ? 'text-green-400' : 'text-red-400'}>
                        {wasAnswered ? userAnswer : 'Not answered'}
                      </span>
                    </div>

                    {!isCorrect && (
                      <div className="p-3 rounded-lg bg-blue-600/10 border border-blue-500/30">
                        <span className="font-medium text-gray-300">Correct answer: </span>
                        <span className="text-blue-400">{correctAnswer}</span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultsPage