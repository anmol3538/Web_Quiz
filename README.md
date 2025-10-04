# 🧠 MCQ Quiz Application

A modern, responsive quiz application built with React, featuring a dark UI theme, real-time timer, and comprehensive question navigation.

## ✨ Features

### 🎯 Core Functionality
- **Email Registration**: Users must enter a valid email to access the quiz
- **Dynamic Quiz**: 15 multiple-choice questions fetched from OpenTDB API
- **Real-time Timer**: 30-minute countdown with visual progress bar
- **Question Navigation**: Left sidebar with question numbers and status indicators
- **Answer Selection**: Click to select answers with visual feedback
- **Results Display**: Detailed score breakdown and question-by-question review

### 🎨 UI/UX Features
- **Dark Theme**: Modern dark UI throughout the application
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Visual Indicators**: 
  - Green dots for answered questions
  - Blue highlight for current question
  - Gray dots for unanswered questions
- **Progress Tracking**: Real-time statistics showing answered/remaining questions
- **Timer Visualization**: Color-coded progress bar (blue → yellow → red)

### 🔧 Technical Features
- **React Router**: Seamless navigation between pages
- **Context API**: Email state management across components
- **Custom Hooks**: Reusable quiz API logic with retry mechanism
- **Error Handling**: Graceful handling of API failures and rate limits
- **HTML Entity Decoding**: Proper display of special characters in questions
- **Exponential Backoff**: Smart retry logic for API rate limiting

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd quiz
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the URL shown in your terminal)

## 📱 Application Flow

### 1. Email Entry (`/email`)
- Users enter their email address
- Email validation ensures proper format
- Required step before accessing the quiz

### 2. Email Verification (`/email-verified`)
- Displays the entered email
- Confirmation that email was captured
- Options to start quiz or go back

### 3. Quiz Page (`/quiz`)
- **Header**: Shows user email, timer, and exit option
- **Left Sidebar**: Question navigation with status indicators
- **Main Area**: Current question with answer options
- **Navigation**: Previous/Next buttons with arrow icons

### 4. Results Page (`/results`)
- **Score Display**: Percentage and performance message
- **Statistics**: Correct/incorrect answers and time taken
- **Detailed Review**: Question-by-question breakdown
- **Actions**: Retake quiz or return home

## 🎮 How to Use

### Taking the Quiz
1. **Enter Email**: Provide a valid email address
2. **Start Quiz**: Click "Start Quiz Now" on the verification page
3. **Answer Questions**: 
   - Click on any answer option to select it
   - Use Previous/Next buttons or click question numbers to navigate
   - Timer counts down automatically (30 minutes total)
4. **Submit**: Click "Finish Quiz" on the last question or wait for timer to expire
5. **Review Results**: See your score and detailed breakdown

### Navigation Options
- **Question Numbers**: Click any number in the left sidebar to jump to that question
- **Previous/Next**: Use arrow buttons to move sequentially
- **Timer**: Automatic submission when time runs out
- **Exit**: Leave quiz at any time (progress is saved)

## 🛠️ Technical Architecture

### Project Structure
```
quiz/
├── src/
│   ├── components/
│   │   └── EmailForm.jsx          # Email input component
│   ├── pages/
│   │   ├── EmailDisplay.jsx       # Email verification page
│   │   ├── QuizPage.jsx           # Main quiz interface
│   │   └── ResultsPage.jsx        # Results and review page
│   ├── context/
│   │   └── EmailContext.jsx       # Email state management
│   ├── hooks/
│   │   └── useQuizApi.js          # Quiz API logic with retry
│   ├── services/
│   │   └── api.js                 # OpenTDB API integration
│   ├── App.jsx                    # Main app with routing
│   └── App.css                    # Tailwind CSS imports
```

### Key Components

#### EmailForm
- Email validation and submission
- Dark theme styling
- Error handling for invalid emails

#### QuizPage
- Real-time timer with countdown
- Question navigation sidebar
- Answer selection with visual feedback
- Progress tracking and statistics

#### ResultsPage
- Score calculation and display
- Detailed question review
- Performance analysis
- Action buttons for retake/home

#### useQuizApi Hook
- API call management
- Retry logic with exponential backoff
- Loading and error states
- One-time fetch optimization

## 🔧 Configuration

### API Settings
The application uses the OpenTDB API with the following configuration:
- **Endpoint**: `https://opentdb.com/api.php`
- **Questions**: 15 multiple-choice questions
- **Retry Logic**: 3 attempts with exponential backoff
- **Rate Limiting**: 500ms delay between requests

### Timer Settings
- **Duration**: 30 minutes (1800 seconds)
- **Warning Colors**: 
  - Blue: > 10 minutes remaining
  - Yellow: 5-10 minutes remaining
  - Red: < 5 minutes remaining

## 🐛 Troubleshooting

### Common Issues

1. **"Too Many Requests" Error**
   - The app automatically retries with exponential backoff
   - Wait a few seconds and try again
   - The retry count is displayed during loading

2. **Timer Not Running**
   - Ensure you're on the quiz page
   - Refresh the page if timer appears stuck
   - Check browser console for any JavaScript errors

3. **Answer Selection Issues**
   - Click directly on the answer text or radio button
   - Ensure you're not clicking on the question number sidebar
   - Try refreshing the page if answers aren't saving

4. **Navigation Problems**
   - Use the Previous/Next buttons for sequential navigation
   - Click question numbers in the sidebar for direct navigation
   - Ensure you have JavaScript enabled

### Development Issues

1. **Port Already in Use**
   ```bash
   # Kill process on port 5173
   npx kill-port 5173
   # Or use a different port
   npm run dev -- --port 3000
   ```

2. **Dependencies Issues**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Vercel/Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your preferred platform
3. Ensure all routes redirect to `index.html` for SPA routing

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

If you encounter any issues or have questions:
1. Check the troubleshooting section above
2. Review the browser console for error messages
3. Ensure all dependencies are properly installed
4. Verify your internet connection for API calls

---

**Happy Quizzing! 🎉**
