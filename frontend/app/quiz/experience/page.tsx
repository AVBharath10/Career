"use client"

import QuizLayout, { type Question } from "@/components/quiz-layout"

// Sample questions for the Experience section
const questions: Question[] = [
  {
    id: "experience-1",
    question: "How many years of professional work experience do you have?",
    options: [
      { id: "a1", text: "No professional experience yet" },
      { id: "a2", text: "Less than 2 years" },
      { id: "a3", text: "2-5 years" },
      { id: "a4", text: "6-10 years" },
      { id: "a5", text: "More than 10 years" },
    ],
  },
  {
    id: "experience-2",
    question: "What is your highest level of education completed?",
    options: [
      { id: "a1", text: "High school diploma or equivalent" },
      { id: "a2", text: "Some college or associate's degree" },
      { id: "a3", text: "Bachelor's degree" },
      { id: "a4", text: "Master's degree" },
      { id: "a5", text: "Doctoral or professional degree (PhD, MD, JD, etc.)" },
    ],
  },
  {
    id: "experience-3",
    question: "How would you describe your leadership experience?",
    options: [
      { id: "a1", text: "Extensive - I've led large teams or organizations" },
      { id: "a2", text: "Significant - I've managed teams or major projects" },
      { id: "a3", text: "Moderate - I've led small teams or projects" },
      { id: "a4", text: "Limited - I've had occasional leadership responsibilities" },
      { id: "a5", text: "None - I haven't had formal leadership roles" },
    ],
  },
  {
    id: "experience-4",
    question: "How diverse is your industry experience?",
    options: [
      { id: "a1", text: "Very diverse - I've worked across multiple industries" },
      { id: "a2", text: "Somewhat diverse - I've worked in a few different industries" },
      { id: "a3", text: "Moderate - I've worked in related fields within one industry" },
      { id: "a4", text: "Limited - I've mostly worked in one specific industry" },
      { id: "a5", text: "Very limited - All my experience is in one specialized area" },
    ],
  },
  {
    id: "experience-5",
    question: "How would you rate your experience with digital tools and technology?",
    options: [
      { id: "a1", text: "Expert - I'm proficient with advanced technologies in my field" },
      { id: "a2", text: "Advanced - I'm comfortable with most digital tools and learn quickly" },
      { id: "a3", text: "Intermediate - I can use common software and basic industry tools" },
      { id: "a4", text: "Basic - I can use essential programs but struggle with new technology" },
      { id: "a5", text: "Limited - I have minimal experience with digital tools" },
    ],
  },
]

export default function ExperienceQuiz() {
  return <QuizLayout title="Experience Assessment" questions={questions} category="experience" />
}

