"use client"

import QuizLayout, { type Question } from "@/components/quiz-layout"

// Sample questions for the Abilities section
const questions: Question[] = [
  {
    id: "abilities-1",
    question: "How comfortable are you with analyzing complex data and identifying patterns?",
    options: [
      { id: "a1", text: "Very comfortable - I enjoy working with data and finding insights" },
      { id: "a2", text: "Somewhat comfortable - I can do it but it's not my favorite task" },
      { id: "a3", text: "Neutral - I have limited experience with data analysis" },
      { id: "a4", text: "Somewhat uncomfortable - I find data analysis challenging" },
      { id: "a5", text: "Very uncomfortable - I avoid data analysis whenever possible" },
    ],
  },
  {
    id: "abilities-2",
    question: "How would you rate your ability to communicate complex ideas clearly?",
    options: [
      { id: "a1", text: "Excellent - I can explain complex concepts to anyone" },
      { id: "a2", text: "Good - I'm usually able to get my point across effectively" },
      { id: "a3", text: "Average - Sometimes I struggle with complex explanations" },
      { id: "a4", text: "Below average - I often have trouble expressing complex ideas" },
      { id: "a5", text: "Poor - Communication is a significant challenge for me" },
    ],
  },
  {
    id: "abilities-3",
    question: "How skilled are you at creative problem-solving?",
    options: [
      { id: "a1", text: "Highly skilled - I often come up with innovative solutions" },
      { id: "a2", text: "Skilled - I can usually find creative approaches to problems" },
      { id: "a3", text: "Moderately skilled - I sometimes find creative solutions" },
      { id: "a4", text: "Somewhat skilled - I tend to rely on established solutions" },
      { id: "a5", text: "Not skilled - I struggle with creative problem-solving" },
    ],
  },
  {
    id: "abilities-4",
    question: "How comfortable are you with public speaking or presenting to groups?",
    options: [
      { id: "a1", text: "Very comfortable - I enjoy presenting and do it well" },
      { id: "a2", text: "Comfortable - I can present effectively with preparation" },
      { id: "a3", text: "Neutral - I can do it but don't particularly enjoy it" },
      { id: "a4", text: "Uncomfortable - I get nervous and avoid it when possible" },
      { id: "a5", text: "Very uncomfortable - Public speaking causes me significant anxiety" },
    ],
  },
  {
    id: "abilities-5",
    question: "How would you rate your ability to work effectively in team settings?",
    options: [
      { id: "a1", text: "Excellent - I thrive in collaborative environments" },
      { id: "a2", text: "Good - I work well with others most of the time" },
      { id: "a3", text: "Average - I can work in teams but also like working alone" },
      { id: "a4", text: "Below average - I sometimes struggle with team dynamics" },
      { id: "a5", text: "Poor - I strongly prefer to work independently" },
    ],
  },
]

export default function AbilitiesQuiz() {
  return <QuizLayout title="Abilities Assessment" questions={questions} category="abilities" />
}

