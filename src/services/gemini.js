import { GoogleGenAI } from '@google/genai';

// A fallback direct fetch implementation in case the SDK has browser issues
export const analyzeResume = async (apiKey, resumeText) => {
  if (!apiKey) {
    throw new Error("Gemini API Key is required.");
  }
  if (!resumeText) {
    throw new Error("Resume text is empty.");
  }

  const prompt = `
You are an expert HR recruiter and ATS (Applicant Tracking System) reviewer.
I am providing you with the extracted text from a resume. 
Please analyze it and provide a detailed review. 
Format the response in clean Markdown.

Please include the following sections:
- **Professional Summary**: A brief summary of the candidate's profile.
- **Technical Skills**: A list of technical skills found.
- **Soft Skills**: A list of soft skills found or inferred.
- **Strengths**: What the resume does well.
- **Weaknesses**: Areas where the resume falls short.
- **Missing Skills**: Common skills for this profile that are missing.
- **ATS Score**: An estimated ATS score out of 100.
- **Resume Improvement Suggestions**: Actionable advice to improve the resume.
- **Suitable Job Roles**: Top 3 job roles this candidate is suited for.
- **Final Overall Score**: A final score (0-100) based on overall quality.

Here is the resume text:
"""
${resumeText}
"""
`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to analyze resume with Gemini API.");
    }

    const data = await response.json();
    if (data.candidates && data.candidates.length > 0) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error("No analysis returned from Gemini.");
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const improveResume = async (apiKey, resumeText) => {
  if (!apiKey) {
    throw new Error("Gemini API Key is required.");
  }
  if (!resumeText) {
    throw new Error("Resume text is empty.");
  }

  const prompt = `
You are an expert HR recruiter and professional resume writer.
I am providing you with the extracted text from a resume. 
Your task is to professionally improve and rewrite the resume for ATS optimization and readability.
Format the response as a professional resume using valid HTML only (no markdown).

IMPORTANT RULES:
- Never invent any experience, companies, skills, degrees, certifications, achievements, numbers, or projects.
- Only rewrite the existing information professionally.
- If information is missing (e.g., no education listed), leave that section out instead of inventing anything.
- Use semantic HTML tags (e.g., <h1> for candidate name, <h2> for sections, <ul>, <li>, <p>).
- Apply minimal inline CSS styles for ATS readability and a beautiful professional layout. Use proper margins, spacing, and better typography.
- DO NOT wrap the output in any markdown block (like \`\`\`html). Return ONLY raw HTML.

Here is the resume text:
"""
${resumeText}
"""
`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to improve resume with Gemini API.");
    }

    const data = await response.json();
    if (data.candidates && data.candidates.length > 0) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error("No improved resume returned from Gemini.");
    }
  } catch (error) {
    console.error("Gemini API Error during resume improvement:", error);
    throw error;
  }
};
