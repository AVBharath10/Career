"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, GraduationCap, BookOpen, Award, Star, ArrowRight, Download, Share2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { LoadingSpinner } from "@/components/loading-spinner"
import { recommendCareer } from "@/utils/career-model"

// Types for career recommendations
type CareerMatch = {
  title: string
  matchPercentage: number
  description: string
  skills: string[]
  education: string[]
  outlook: string
  salary: string
}

type StrengthsWeaknesses = {
  strengths: string[]
  areasForImprovement: string[]
}

type CareerRecommendations = {
  topMatches: CareerMatch[]
  strengthsAndWeaknesses: StrengthsWeaknesses
  additionalResources: {
    title: string
    url: string
    description: string
  }[]
}

export default function ResultsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [recommendations, setRecommendations] = useState<CareerRecommendations | null>(null)
  const [analysisProgress, setAnalysisProgress] = useState(0)

  useEffect(() => {
    // Simulate progress for better UX
    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval)
          return prev
        }
        return prev + Math.random() * 10
      })
    }, 600)

    const processResults = async () => {
      try {
        // Get quiz scores from sessionStorage
        const scoresJson = sessionStorage.getItem("quizScores")

        if (!scoresJson) {
          // If no scores found, redirect to dashboard
          router.push("/dashboard")
          return
        }

        const scores = JSON.parse(scoresJson)

        // Use our model to get recommendations
        const result = recommendCareer(scores)

        // Generate strengths and weaknesses based on scores
        const strengths = []
        const areasForImprovement = []

        const categories = ["Analytical thinking", "Learning capacity", "Goal orientation", "Practical experience"]

        // Identify strengths (scores >= 7) and areas for improvement (scores <= 5)
        scores.forEach((score: number, index: number) => {
          if (score >= 7) {
            strengths.push(`Strong ${categories[index].toLowerCase()}`)
          } else if (score <= 5) {
            areasForImprovement.push(`Developing ${categories[index].toLowerCase()}`)
          }
        })

        // Add some default strengths and areas if needed
        if (strengths.length === 0) {
          strengths.push("Balanced skill profile", "Adaptability across different domains")
        }

        if (areasForImprovement.length === 0) {
          areasForImprovement.push(
            "Specializing in a particular domain",
            "Building deeper expertise in your strongest areas",
          )
        }

        // Create additional resources
        const additionalResources = [
          {
            title: "LinkedIn Learning Courses",
            url: "https://www.linkedin.com/learning/",
            description: `Access courses related to ${result.topMatches[0].title} and build relevant skills.`,
          },
          {
            title: "Professional Certifications",
            url: "https://www.coursera.org/professional-certificates",
            description: "Earn industry-recognized certifications to boost your resume and credibility.",
          },
          {
            title: "Networking Events",
            url: "https://www.meetup.com/",
            description: `Find local and virtual events to connect with professionals in ${result.topMatches[0].title} roles.`,
          },
        ]

        const finalRecommendations: CareerRecommendations = {
          topMatches: result.topMatches,
          strengthsAndWeaknesses: {
            strengths,
            areasForImprovement,
          },
          additionalResources,
        }

        setRecommendations(finalRecommendations)
        setAnalysisProgress(100)

        setTimeout(() => {
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Failed to process results:", error)
        setError("Failed to generate your career recommendations. Please try again.")
        setIsLoading(false)
      }

      clearInterval(progressInterval)
    }

    processResults()

    return () => clearInterval(progressInterval)
  }, [router])

  if (isLoading) {
    return (
      <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-12 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-6 gradient-text">Analyzing Your Results</h1>
          <p className="text-muted-foreground mb-8">
            Our AI is processing your responses to generate personalized career recommendations.
          </p>

          <div className="space-y-2 mb-8">
            <div className="flex justify-between text-sm">
              <span>Analysis Progress</span>
              <span>{Math.round(analysisProgress)}%</span>
            </div>
            <Progress value={analysisProgress} className="h-2" />
          </div>

          <LoadingSpinner text="This may take a moment..." size="lg" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Error</CardTitle>
            <CardDescription>We encountered a problem loading your results</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">{error}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push("/dashboard")} className="w-full">
              Return to Dashboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  if (!recommendations) {
    return null
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 gradient-text">Your Career Recommendations</h1>
          <p className="text-xl text-muted-foreground">
            Based on your assessment responses, we've identified career paths that align with your abilities, aptitude,
            aspirations, and experience.
          </p>
        </div>

        {/* Top Career Matches */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Top Career Matches</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendations.topMatches.map((career, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{career.title}</CardTitle>
                    <div className="bg-primary/10 text-primary font-bold rounded-full px-2 py-1 text-sm">
                      {career.matchPercentage}% Match
                    </div>
                  </div>
                  <CardDescription>{career.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium flex items-center gap-2 mb-2">
                      <GraduationCap className="h-4 w-4 text-primary" /> Education Pathways
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {career.education.map((edu, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary">•</span> {edu}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium flex items-center gap-2 mb-2">
                      <Award className="h-4 w-4 text-primary" /> Key Skills
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {career.skills.map((skill, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary">•</span> {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-primary" /> Job Outlook
                    </h4>
                    <div className="flex items-center gap-1 mt-1">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              (career.outlook === "excellent" && i < 5) ||
                              (career.outlook === "good" && i < 4) ||
                              (career.outlook === "fair" && i < 3) ||
                              (career.outlook === "variable" && i < 3) ||
                              (career.outlook === "limited" && i < 2)
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      <span className="text-sm ml-2 capitalize">{career.outlook}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium flex items-center gap-2 mb-2">
                      <Briefcase className="h-4 w-4 text-primary" /> Salary Range
                    </h4>
                    <p className="text-sm text-muted-foreground">{career.salary}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Strengths and Areas for Improvement */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" /> Your Strengths
              </CardTitle>
              <CardDescription>These are the areas where you demonstrated strong capabilities</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {recommendations.strengthsAndWeaknesses.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">+</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" /> Areas for Improvement
              </CardTitle>
              <CardDescription>Focus on developing these areas to enhance your career prospects</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {recommendations.strengthsAndWeaknesses.areasForImprovement.map((area, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">→</span>
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Additional Resources */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendations.additionalResources.map((resource, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                </CardContent>
                <CardFooter>
                  <a href={resource.url} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button variant="outline" className="w-full">
                      Visit Resource <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
          <Button className="gradient-bg">
            <Download className="mr-2 h-4 w-4" /> Download Full Report
          </Button>
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" /> Share Results
          </Button>
        </div>
      </div>
    </div>
  )
}

