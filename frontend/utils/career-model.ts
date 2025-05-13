
const CAREER_PROFILES = {
  "Software Engineer": [9, 8, 7, 6],
  "Data Scientist": [10, 9, 8, 5],
  "Cybersecurity Specialist": [8, 9, 6, 7],
  "AI Engineer": [10, 10, 9, 6],
  "Product Manager": [7, 8, 9, 10],
  "Entrepreneur": [6, 7, 10, 9],
  "Medical Doctor": [4, 5, 8, 10],
  "Professor": [6, 7, 10, 8],
  "Freelancer / Consultant": [7, 6, 10, 7],
  "Nonprofit Leader": [5, 6, 9, 8],
  "Marketing Specialist": [6, 5, 9, 7],
  "UX Designer": [7, 6, 8, 5],
  "Financial Analyst": [8, 7, 7, 6],
  "Operations Manager": [6, 7, 9, 8],
  "Research Scientist": [9, 9, 8, 7],
}

const CAREER_EXPLANATIONS = {
  "Software Engineer": "You have strong analytical skills and enjoy problem-solving.",
  "Data Scientist": "Your ability to analyze data aligns well with data science.",
  "Cybersecurity Specialist": "Your security awareness suggests a cybersecurity role.",
  "AI Engineer": "Your problem-solving and AI interest match AI engineering.",
  "Product Manager": "You have leadership and organizational skills.",
  Entrepreneur: "Your risk-taking and leadership fit entrepreneurship.",
  "Medical Doctor": "Your compassion and medical interest align with medicine.",
  Professor: "Your love for knowledge suggests academia.",
  "Freelancer / Consultant": "Your independent mindset fits freelancing.",
  "Nonprofit Leader": "Your social values fit nonprofit leadership.",
  "Marketing Specialist": "Your creative and strategic skills match marketing.",
  "UX Designer": "Your creativity and design skills fit UX design.",
  "Financial Analyst": "Your financial and analytical skills fit finance.",
  "Operations Manager": "Your organizational and leadership skills fit operations.",
  "Research Scientist": "Your curiosity fits research science.",
}

const CAREER_DETAILS = {
  "Software Engineer": {
    skills: ["Programming", "Problem-solving", "Debugging", "System design"],
    education: ["Computer Science degree", "Coding bootcamp", "Self-taught with portfolio"],
    outlook: "excellent",
    salary: "Rs 70,000 - Rs 150,000",
  },
  "Data Scientist": {
    skills: ["Statistics", "Machine Learning", "Data visualization", "Programming"],
    education: ["Statistics/Math degree", "Computer Science", "Data Science bootcamp"],
    outlook: "excellent",
    salary: "Rs 80,000 - Rs 160,000",
  },
  "Cybersecurity Specialist": {
    skills: ["Network security", "Penetration testing", "Security protocols", "Risk assessment"],
    education: ["Computer Science", "Cybersecurity certifications", "Information Security degree"],
    outlook: "excellent",
    salary: "Rs 75,000 - Rs 150,000",
  },
  "AI Engineer": {
    skills: ["Machine Learning", "Deep Learning", "Programming", "Mathematics"],
    education: ["Computer Science", "AI/ML specialization", "Research experience"],
    outlook: "excellent",
    salary: "Rs 90,000 - Rs 180,000",
  },
  "Product Manager": {
    skills: ["Leadership", "Communication", "Strategic thinking", "User empathy"],
    education: ["Business degree", "Technical background", "Product management certification"],
    outlook: "good",
    salary: "Rs 80,000 - Rs 170,000",
  },
  Entrepreneur: {
    skills: ["Risk-taking", "Leadership", "Adaptability", "Business acumen"],
    education: ["Business degree", "Industry experience", "Self-taught"],
    outlook: "variable",
    salary: "Variable (unlimited potential)",
  },
  "Medical Doctor": {
    skills: ["Medical knowledge", "Empathy", "Communication", "Decision-making"],
    education: ["Medical degree (MD)", "Residency", "Specialization"],
    outlook: "excellent",
    salary: "Rs 200,000 - Rs 500,000+",
  },
  Professor: {
    skills: ["Research", "Teaching", "Writing", "Critical thinking"],
    education: ["PhD", "Post-doctoral experience", "Research publications"],
    outlook: "good",
    salary: "Rs 60,000 - Rs 180,000",
  },
  "Freelancer / Consultant": {
    skills: ["Self-management", "Expertise in field", "Client communication", "Marketing"],
    education: ["Field-specific education", "Industry experience", "Portfolio"],
    outlook: "good",
    salary: "Variable (Rs 50,000 - Rs 200,000+)",
  },
  "Nonprofit Leader": {
    skills: ["Leadership", "Fundraising", "Communication", "Mission-driven focus"],
    education: ["Nonprofit management", "Field-specific experience", "Leadership training"],
    outlook: "fair",
    salary: "Rs 50,000 - Rs 120,000",
  },
  "Marketing Specialist": {
    skills: ["Market analysis", "Communication", "Creativity", "Strategic thinking"],
    education: ["Marketing degree", "Business", "Communications"],
    outlook: "good",
    salary: "Rs 50,000 - Rs 130,000",
  },
  "UX Designer": {
    skills: ["User research", "Design thinking", "Prototyping", "Visual design"],
    education: ["Design degree", "UX certification", "Portfolio"],
    outlook: "good",
    salary: "Rs 70,000 - Rs 140,000",
  },
  "Financial Analyst": {
    skills: ["Financial modeling", "Data analysis", "Market knowledge", "Attention to detail"],
    education: ["Finance degree", "Economics", "Accounting", "MBA"],
    outlook: "good",
    salary: "Rs 65,000 - Rs 150,000",
  },
  "Operations Manager": {
    skills: ["Process optimization", "Leadership", "Problem-solving", "Organization"],
    education: ["Business degree", "Industry experience", "Management training"],
    outlook: "good",
    salary: "Rs 60,000 - Rs 140,000",
  },
  "Research Scientist": {
    skills: ["Research methods", "Data analysis", "Critical thinking", "Technical writing"],
    education: ["PhD", "Research experience", "Field-specific knowledge"],
    outlook: "good",
    salary: "Rs 70,000 - Rs 150,000",
  },
}

class MinMaxScaler {
  private min: number[] = []
  private max: number[] = []
  private fitted = false

  fit(data: number[][]) {
    const cols = data[0].length
    this.min = Array(cols).fill(Number.POSITIVE_INFINITY)
    this.max = Array(cols).fill(Number.NEGATIVE_INFINITY)

    for (const row of data) {
      for (let i = 0; i < cols; i++) {
        this.min[i] = Math.min(this.min[i], row[i])
        this.max[i] = Math.max(this.max[i], row[i])
      }
    }

    this.fitted = true
    return this
  }

  transform(data: number[][]) {
    if (!this.fitted) {
      throw new Error("Scaler must be fitted before transform")
    }

    return data.map((row) => {
      return row.map((val, i) => {
        if (this.min[i] === this.max[i]) return 0.5
        return (val - this.min[i]) / (this.max[i] - this.min[i])
      })
    })
  }

  fitTransform(data: number[][]) {
    return this.fit(data).transform(data)
  }
}

class NearestNeighbors {
  private data: number[][] = []
  private k: number

  constructor(k = 1) {
    this.k = k
  }

  fit(data: number[][]) {
    this.data = data
    return this
  }

  private manhattanDistance(a: number[], b: number[]): number {
    return a.reduce((sum, val, i) => sum + Math.abs(val - b[i]), 0)
  }

  kneighbors(point: number[][]) {
    const distances: number[] = []
    const indices: number[] = []

    for (let i = 0; i < this.data.length; i++) {
      const dist = this.manhattanDistance(point[0], this.data[i])
      distances.push(dist)
      indices.push(i)
    }

    indices.sort((a, b) => distances[a] - distances[b])

    return {
      distances: [indices.slice(0, this.k).map((i) => distances[i])],
      indices: [indices.slice(0, this.k)],
    }
  }
}

function getCareerMatrix() {
  const careerNames = Object.keys(CAREER_PROFILES)
  const careerMatrix = careerNames.map((name) => CAREER_PROFILES[name as keyof typeof CAREER_PROFILES])
  return { careerNames, careerMatrix }
}

const { careerNames, careerMatrix } = getCareerMatrix()
const scaler = new MinMaxScaler()
const scaledMatrix = scaler.fitTransform(careerMatrix)
const nnModel = new NearestNeighbors(1)
nnModel.fit(scaledMatrix)

export function recommendCareer(userResponses: number[]) {
  // Scale user responses
  const userResponsesScaled = scaler.transform([userResponses])

  const { distances, indices } = nnModel.kneighbors(userResponsesScaled)
  const bestMatchIndex = indices[0][0]
  const bestMatch = careerNames[bestMatchIndex]

  const explanation =
    CAREER_EXPLANATIONS[bestMatch as keyof typeof CAREER_EXPLANATIONS] ||
    "This career aligns well with your skills and interests."

  const details = CAREER_DETAILS[bestMatch as keyof typeof CAREER_DETAILS]

  const topIndices = [...Array(careerNames.length).keys()]
    .sort((a, b) => {
      const distA = nnModel.kneighbors([userResponsesScaled[0]]).distances[0][0]
      const distB = nnModel.kneighbors([userResponsesScaled[0]]).distances[0][0]
      return distA - distB
    })
    .slice(0, 3)

  const topMatches = topIndices.map((idx) => {
    const career = careerNames[idx]
    return {
      title: career,
      matchPercentage: Math.round((1 - distances[0][0] / 4) * 100), // Normalize distance to percentage
      description: CAREER_EXPLANATIONS[career as keyof typeof CAREER_EXPLANATIONS],
      ...CAREER_DETAILS[career as keyof typeof CAREER_DETAILS],
    }
  })

  return {
    bestMatch,
    explanation,
    details,
    topMatches,
  }
}

export function processQuizAnswers(answers: Record<string, string>) {
  // Map to store category scores
  const categoryScores: Record<string, number> = {
    abilities: 0,
    aptitude: 0,
    aspirations: 0,
    experience: 0,
  }

  const categoryCounts: Record<string, number> = {
    abilities: 0,
    aptitude: 0,
    aspirations: 0,
    experience: 0,
  }

  for (const [questionId, optionId] of Object.entries(answers)) {
    const category = questionId.split("-")[0]

    const optionValue = 10 - (Number.parseInt(optionId.replace("a", "")) - 1) * 2

    if (category in categoryScores) {
      categoryScores[category] += optionValue
      categoryCounts[category]++
    }
  }

  const finalScores = Object.keys(categoryScores).map((category) => {
    if (categoryCounts[category] === 0) return 5 // Default if no questions answered
    return Math.round(categoryScores[category] / categoryCounts[category])
  })

  return finalScores
}

