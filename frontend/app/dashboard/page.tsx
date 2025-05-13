"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth-provider"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Brain, Lightbulb, Target, Briefcase, ArrowRight, BarChart } from "lucide-react"
import { quizAPI } from "@/services/api"

type QuizProgress = {
  abilities: number
  aptitude: number
  aspirations: number
  experience: number
}

export default function Dashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [quizProgress, setQuizProgress] = useState<QuizProgress>({
    abilities: 0,
    aptitude: 0,
    aspirations: 0,
    experience: 0,
  })

  useEffect(() => {
    const fetchQuizProgress = async () => {
      try {
        const data = await quizAPI.getQuizProgress()
        setQuizProgress(data.progress)
      } catch (error) {
        console.error("Failed to fetch quiz progress:", error)
        // Keep default values if fetch fails
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuizProgress()
  }, [])

  const totalProgress = Object.values(quizProgress).reduce((a, b) => a + b, 0) / 4
  const allCompleted = totalProgress === 1

  const quizCategories = [
    {
      id: "abilities",
      title: "Abilities",
      description: "Assess your natural talents and skills",
      icon: Brain,
      progress: quizProgress.abilities,
    },
    {
      id: "aptitude",
      title: "Aptitude",
      description: "Evaluate your capacity to learn new skills",
      icon: Lightbulb,
      progress: quizProgress.aptitude,
    },
    {
      id: "aspirations",
      title: "Aspirations",
      description: "Understand your goals and values",
      icon: Target,
      progress: quizProgress.aspirations,
    },
    {
      id: "experience",
      title: "Experience",
      description: "Analyze your work history and education",
      icon: Briefcase,
      progress: quizProgress.experience,
    },
  ]

  const handleViewResults = () => {
    router.push("/results")
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome, User</h1>
          <p className="text-muted-foreground">Track your progress and continue your career assessment</p>
        </div>

        {/* Overall Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-primary" />
              Overall Assessment Progress
            </CardTitle>
            <CardDescription>
              Complete all four sections to receive your personalized career recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{Math.round(totalProgress * 100)}% Complete</span>
              </div>
              <Progress value={totalProgress * 100} className="h-2" />
            </div>
          </CardContent>
          <CardFooter>
            {allCompleted ? (
              <Button className="w-full gradient-bg" onClick={handleViewResults}>
                View Career Recommendations
              </Button>
            ) : (
              <Button className="w-full" variant="outline">
                Continue Assessment
              </Button>
            )}
          </CardFooter>
        </Card>

        {/* Quiz Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quizCategories.map((category) => (
            <Card key={category.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <category.icon className="h-5 w-5 text-primary" />
                  {category.title}
                </CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{Math.round(category.progress * 100)}%</span>
                  </div>
                  <Progress value={category.progress * 100} className="h-2" />
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/quiz/${category.id}`} className="w-full">
                  <Button className="w-full" variant={category.progress > 0 ? "outline" : "default"}>
                    {category.progress === 1 ? "Review" : category.progress > 0 ? "Continue" : "Start"} Assessment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

