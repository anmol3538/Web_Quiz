import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { EmailProvider } from './context/EmailContext'
import EmailForm from './components/EmailForm'
import EmailDisplay from './pages/EmailDisplay'
import QuizPage from './pages/QuizPage'
import ResultsPage from './pages/ResultsPage'

function App() {
  return (
    <EmailProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Navigate to="/email" replace />} />
            <Route path="/email" element={<EmailForm />} />
            <Route path="/email-verified" element={<EmailDisplay />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="*" element={<Navigate to="/email" replace />} />
          </Routes>
        </div>
      </Router>
    </EmailProvider>
  )
}

export default App