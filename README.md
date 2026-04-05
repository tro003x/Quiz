A modern, interactive quiz application built with Next.js, featuring timed questions, progress tracking, and session history management.

🎯 Features
User Authentication: Login screen with session management
Timed Questions: Each question has a countdown timer to encourage quick thinking
Multiple Choice: 4-option multiple choice questions with instant feedback
Progress Tracking: Visual progress indicator showing current question position
Explanations: Detailed explanations for each answer after submission
Session History: Track and review all previous quiz attempts
Result Analytics: See your score and performance metrics after completing a quiz
Upcoming Questions Panel: Preview upcoming questions in the session
Responsive Design: Works seamlessly on desktop and mobile devices

🛠️ Tech Stack
Framework: Next.js 16.1.6 - React framework with SSR support
Language: TypeScript 5 - Type-safe JavaScript
Styling: Tailwind CSS 4 - Utility-first CSS framework
Components: shadcn/ui - High-quality React components
Icons: Lucide React - Beautiful icon library
UI Libraries: Radix UI - Accessible component primitives
Data: JSON - Question storage


📂 Project Structure
quiz/
├── app/                     
│   ├── layout.tsx           
│   ├── page.tsx            
│   └── globals.css          
├── components/              
│   ├── layout/              
│   ├── quiz/                
│   │   ├── AnswerButton.tsx
│   │   ├── ProgressIndicator.tsx
│   │   ├── QuestionCard.tsx
│   │   ├── TimerBar.tsx
│   │   └── UpcomingPanel.tsx
│   ├── screens/           
│   │   ├── LoginScreen.tsx
│   │   ├── StartScreen.tsx
│   │   ├── QuestionScreen.tsx
│   │   ├── ExplanationScreen.tsx
│   │   ├── ResultCardModal.tsx
│   │   └── SessionHistoryModal.tsx
│   └── ui/                  
├── lib/                    
│   ├── quiz.ts           
│   ├── storage.ts          
│   ├── constants.ts      
│   └── utils.ts          
├── types/                
│   └── quiz.ts           
├── data/                  
│   └── questions.json     
└── public/    


🚀 Getting Started

Prerequisites
Node.js 18+ or higher
npm, yarn, or pnpm package manager

# Installation

Clone the repository:
git clone <repository-url>
cd quiz

Install dependencies:
npm install

Generate questions (optional - for custom questions):
python generate_questions.py

Running the Application
Development Server:
npm run dev

Open http://localhost:3000 to view the app in your browser.

Production Build:
npm run build
npm run start

Linting:
npm run lint

📋 Application States
The quiz application operates through several states:

Login - User enters their name
Start - Welcome screen before quiz begins
Question - Active question with timer
Result - Score and performance summary
Explanation - Detailed answer explanation

📊 Data Structure
Question Format
{
  id: number;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
}

Session History
The application stores user sessions with:

Session number
Date
Score and total questions
Individual results with timing and correctness

🎨 Customization
Adding Questions
Edit questions.json or use the generate_questions.py script to create questions programmatically.

Styling
Global styles in globals.css
Component-specific styles using Tailwind CSS utility classes
Configure Tailwind in tailwind.config.ts
Configuration
App constants in constants.ts
Quiz logic in quiz.ts

📱 Features in Detail
Timer: Countdown timer for each question (configurable duration)
Progress Bar: Visual indicator of quiz progress
Answer Feedback: Immediate feedback after selecting an answer
Session Persistence: User progress saved to browser localStorage
Answer History: Review all previous answers and explanations
Category Organization: Questions organized by subject category


This project is private. See the repository for more information.

Claude Haiku 4.5 • 0.33x
