"use client"

import QuizLayout, { type Question } from "@/components/quiz-layout"

// Sample questions for the Aspirations section
const questions: Question[] = [
  {
    id: "aspirations-1",
    question: "What type of work environment do you prefer?",
    options: [
      { id: "a1", text: "Fast-paced and dynamic with changing responsibilities" },
      { id: "a2", text: "Collaborative with a strong team focus" },
      { id: "a3", text: "Structured and organized with clear expectations" },
      { id: "a4", text: "Independent with autonomy over my work" },
      { id: "a5", text: "Creative and flexible with room for innovation" },
    ],
  },
  {
    id: "aspirations-2",
    question: "What is most important to you in your career?",
    options: [
      { id: "a1", text: "Financial security and compensation" },
      { id: "a2", text: "Work-life balance and personal well-being" },
      { id: "a3", text: "Making a positive impact on society" },
      { id: "a4", text: "Professional growth and advancement opportunities" },
      { id: "a5", text: "Intellectual challenge and continuous learning" },
    ],
  },
  {
    id: "aspirations-3",
    question: "How important is it for your work to align with your personal values?",
    options: [
      { id: "a1", text: "Extremely important - I must believe in what I'm doing" },
      { id: "a2", text: "Very important - I prefer work that aligns with my values" },
      { id: "a3", text: "Moderately important - It's nice but not essential" },
      { id: "a4", text: "Slightly important - I can separate my work from my values" },
      { id: "a5", text: "Not important - I view work primarily as a means to an end" },
    ],
  },
  {
    id: "aspirations-4",
    question: "What level of responsibility do you aspire to in your career?",
    options: [
      { id: "a1", text: "Leadership role with significant decision-making authority" },
      { id: "a2", text: "Management position overseeing teams or projects" },
      { id: "a3", text: "Senior individual contributor with specialized expertise" },
      { id: "a4", text: "Collaborative team member with shared responsibilities" },
      { id: "a5", text: "Independent role with focused, well-defined tasks" },
    ],
  },
  {
    id: "aspirations-5",
    question: "How do you feel about travel or relocation for career opportunities?",
    options: [
      { id: "a1", text: "Very open - I'd relocate or travel extensively for the right opportunity" },
      { id: "a2", text: "Open - I'm willing to travel or relocate within reason" },
      { id: "a3", text: "Neutral - I'd consider limited travel or relocation" },
      { id: "a4", text: "Reluctant - I prefer to stay in my current location with minimal travel" },
      { id: "a5", text: "Very reluctant - Location stability is a top priority for me" },
    ],
  },
]

export default function AspirationsQuiz() {
  return <QuizLayout title="Aspirations Assessment" questions={questions} category="aspirations" />
}

