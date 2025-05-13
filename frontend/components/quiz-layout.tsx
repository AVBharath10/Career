"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { processQuizAnswers } from "@/utils/career-model"

export type Question = {
  id: string
  question: string
  options: {
    id: string
    text: string
  }[]
}

type QuizLayoutProps = {
  title: string
  questions: Question[]
  category: string
}

// Global storage for quiz answers
const globalQuizAnswers: Record<string, Record<string, string>> = {
  abilities: {},
  aptitude: {},
  aspirations: {},
  experience: {},
}

export default function QuizLayout({ title, questions, category }: QuizLayoutProps) {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100
  const selectedOption = answers[currentQuestion.id]

  const handleOptionSelect = (optionId: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: optionId,
    })
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError("")

    try {
      // Store answers in global object
      globalQuizAnswers[category] = answers

      // Check if all quiz sections have been completed
      const allCategories = ["abilities", "aptitude", "aspirations", "experience"]
      const completedCategories = allCategories.filter((cat) => Object.keys(globalQuizAnswers[cat]).length > 0)

      // If all categories are completed, process answers and go to results
      if (completedCategories.length === allCategories.length) {
        // Combine all answers
        const allAnswers = {
          ...globalQuizAnswers.abilities,
          ...globalQuizAnswers.aptitude,
          ...globalQuizAnswers.aspirations,
          ...globalQuizAnswers.experience,
        }

        // Process answers to get numerical scores
        const scores = processQuizAnswers(allAnswers)

        // Store scores in sessionStorage for results page
        sessionStorage.setItem("quizScores", JSON.stringify(scores))

        // Redirect to results page
        router.push("/results")
      } else {
        // Otherwise, redirect to dashboard
        router.push("/dashboard")
      }
    } catch (error: any) {
      console.error("Error submitting quiz:", error)
      setError("Failed to submit quiz. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container max-w-3xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <div className="flex justify-between text-sm mb-2">
          <span>
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentQuestion.options.map((option) => (
            <Button
              key={option.id}
              variant={selectedOption === option.id ? "default" : "outline"}
              className={`w-full justify-start h-auto py-4 px-6 text-left ${
                selectedOption === option.id ? "gradient-bg" : ""
              }`}
              onClick={() => handleOptionSelect(option.id)}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex-shrink-0 w-5 h-5 rounded-full border ${
                    selectedOption === option.id ? "bg-primary-foreground border-primary-foreground" : "border-primary"
                  } flex items-center justify-center`}
                >
                  {selectedOption === option.id && <Check className="h-3 w-3 text-primary" />}
                </div>
                <span>{option.text}</span>
              </div>
            </Button>
          ))}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          {error && <div className="text-destructive text-sm w-full text-center">{error}</div>}
          <div className="flex justify-between w-full">
            <Button variant="outline" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={!selectedOption || isSubmitting}
              className={currentQuestionIndex === questions.length - 1 ? "gradient-bg" : ""}
            >
              {currentQuestionIndex === questions.length - 1 ? (isSubmitting ? "Submitting..." : "Submit") : "Next"}
              {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

