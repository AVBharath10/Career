import numpy as np
from sklearn.preprocessing import MinMaxScaler
from sklearn.neighbors import NearestNeighbors

CAREER_PROFILES = {
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
    "Research Scientist": [9, 9, 8, 7]
}

career_names = list(CAREER_PROFILES.keys())
career_matrix = np.array(list(CAREER_PROFILES.values()))

scaler = MinMaxScaler()
career_matrix_scaled = scaler.fit_transform(career_matrix)

nn_model = NearestNeighbors(n_neighbors=1, metric='manhattan')  
nn_model.fit(career_matrix_scaled)

def recommend_career(user_responses):
    """
    Recommend a single career based on user responses.
    :param user_responses: List of 4 scores (Abilities, Aptitude, Aspirations, Experience)
    :return: Recommended career with an explanation
    """
    user_responses_scaled = scaler.transform([user_responses])
    distance, index = nn_model.kneighbors(user_responses_scaled)
    
    best_match = career_names[index[0][0]]
    
    # Explanation system
    explanations = {
        "Software Engineer": "You have strong analytical skills and enjoy problem-solving.",
        "Data Scientist": "Your ability to analyze data aligns well with data science.",
        "Cybersecurity Specialist": "Your security awareness suggests a cybersecurity role.",
        "AI Engineer": "Your problem-solving and AI interest match AI engineering.",
        "Product Manager": "You have leadership and organizational skills.",
        "Entrepreneur": "Your risk-taking and leadership fit entrepreneurship.",
        "Medical Doctor": "Your compassion and medical interest align with medicine.",
        "Professor": "Your love for knowledge suggests academia.",
        "Freelancer / Consultant": "Your independent mindset fits freelancing.",
        "Nonprofit Leader": "Your social values fit nonprofit leadership.",
        "Marketing Specialist": "Your creative and strategic skills match marketing.",
        "UX Designer": "Your creativity and design skills fit UX design.",
        "Financial Analyst": "Your financial and analytical skills fit finance.",
        "Operations Manager": "Your organizational and leadership skills fit operations.",
        "Research Scientist": "Your curiosity fits research science."
    }
    
    return best_match, explanations.get(best_match, "This career aligns well with your skills and interests.")

user_responses = [3, 9, 2, 8]  # Hypothetical user scores
career, reason = recommend_career(user_responses)
print(f"Recommended Career: {career}")
print(f"Reason: {reason}")
