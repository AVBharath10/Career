import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Lightbulb, Target, Briefcase } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="py-20 md:py-28 container">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Discover Your Perfect Career Path with <span className="gradient-text">AI-Powered Guidance</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our intelligent career assessment analyzes your abilities, aptitude, aspirations, and experience to
              recommend the ideal career path for you.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/login">
              <Button size="lg" className="gradient-bg">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-secondary/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Career Assessment</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our assessment evaluates four key dimensions to provide personalized career recommendations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="quiz-card">
              <div className="mb-4 p-3 rounded-full w-fit bg-primary/10">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Abilities</h3>
              <p className="text-muted-foreground">
                Assess your natural talents and skills that make you uniquely qualified for specific roles.
              </p>
            </div>

            <div className="quiz-card">
              <div className="mb-4 p-3 rounded-full w-fit bg-primary/10">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Aptitude</h3>
              <p className="text-muted-foreground">
                Evaluate your capacity to learn new skills and adapt to different professional environments.
              </p>
            </div>

            <div className="quiz-card">
              <div className="mb-4 p-3 rounded-full w-fit bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Aspirations</h3>
              <p className="text-muted-foreground">
                Understand your goals, values, and what truly motivates you in your professional life.
              </p>
            </div>

            <div className="quiz-card">
              <div className="mb-4 p-3 rounded-full w-fit bg-primary/10">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Experience</h3>
              <p className="text-muted-foreground">
                Analyze your work history and educational background to identify transferable skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 container">
        <div className="rounded-2xl p-8 md:p-12 bg-card border shadow-lg">
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-3xl font-bold">Ready to find your ideal career?</h2>
              <p className="text-muted-foreground">
                Create an account to take our comprehensive assessment and receive personalized career recommendations.
              </p>
            </div>
            <Link href="/signup">
              <Button size="lg" className="gradient-bg whitespace-nowrap">
                Sign Up Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

