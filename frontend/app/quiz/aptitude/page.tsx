"use client"

import QuizLayout, { type Question } from "@/components/quiz-layout"

// Sample questions for the Aptitude section
const questions: Question[] = [
  {
    id: "aptitude-1",
    question: "How quickly do you typically learn new technical skills or software?",
    options: [
      { id: "a1", text: "Very quickly - I pick up new technologies with minimal effort" },
      { id: "a2", text: "Quickly - I can learn new skills with some practice" },
      { id: "a3", text: "Average - It takes me a reasonable amount of time" },
      { id: "a4", text: "Slowly - I need extra time and support to learn new technologies" },
      { id: "a5", text: "Very slowly - Learning new technical skills is a significant challenge" },
    ],
  },
  {
    id: "aptitude-2",
    question: "How comfortable are you with mathematical or quantitative tasks?",
    options: [
      { id: "a1", text: "Very comfortable - I enjoy working with numbers and calculations" },
      { id: "a2", text: "Comfortable - I can handle most mathematical tasks well" },
      { id: "a3", text: "Neutral - I can do basic math but prefer other types of tasks" },
      { id: "a4", text: "Uncomfortable - I try to avoid mathematical tasks when possible" },
      { id: "a5", text: "Very uncomfortable - I struggle significantly with math" },
    ],
  },
  {
    id: "aptitude-3",
    question: "How well do you adapt to changing priorities or requirements?",
    options: [
      { id: "a1", text: "Extremely well - I thrive in dynamic environments" },
      { id: "a2", text: "Very well - I can adjust to changes with minimal disruption" },
      { id: "a3", text: "Moderately well - I can adapt but prefer stability" },
      { id: "a4", text: "Not very well - Changes tend to stress me out" },
      { id: "a5", text: "Poorly - I strongly prefer consistent, predictable environments" },
    ],
  },
  {
    id: "aptitude-4",
    question: "How would you rate your ability to think critically and analyze arguments?",
    options: [
      { id: "a1", text: "Excellent - I can easily identify logical flaws and evaluate evidence" },
      { id: "a2", text: "Good - I'm usually able to think critically about most topics" },
      { id: "a3", text: "Average - I can analyze straightforward arguments" },
      { id: "a4", text: "Below average - I sometimes struggle with critical analysis" },
      { id: "a5", text: "Poor - Critical thinking is a significant challenge for me" },
    ],
  },
  {
    id: "aptitude-5",
    question: "How comfortable are you with learning through self-study?",
    options: [
      { id: "a1", text: "Very comfortable - I prefer learning independently" },
      { id: "a2", text: "Comfortable - I can learn well on my own with resources" },
      { id: "a3", text: "Neutral - I can self-study but also value structured learning" },
      { id: "a4", text: "Somewhat uncomfortable - I prefer guided instruction" },
      { id: "a5", text: "Very uncomfortable - I strongly prefer structured learning environments" },
    ],
  },
]

export default function AptitudeQuiz() {
  return <QuizLayout title="Aptitude Assessment" questions={questions} category="aptitude" />
}

