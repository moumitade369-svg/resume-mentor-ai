import { GoogleGenAI } from '@google/genai';

// A fallback direct fetch implementation in case the SDK has browser issues
export const analyzeResume = async (apiKey, resumeText, jobTarget) => {
  if (!apiKey) {
    throw new Error("Gemini API Key is required.");
  }
  if (!resumeText) {
    throw new Error("Resume text is empty.");
  }

  let jobTargetContext = "";
  if (jobTarget && jobTarget.trim()) {
    jobTargetContext = `\nThe user has provided the following Target Job Role or Job Description:\n"${jobTarget.trim()}"\n\nPlease compare the uploaded resume with this target job. Identify missing skills, missing keywords, ATS keyword gap, and missing responsibilities.`;
  }

  const prompt = `
You are an expert HR recruiter and ATS (Applicant Tracking System) reviewer.
I am providing you with the extracted text from a resume. 
Please analyze it and provide a detailed review. 
Format the response in clean Markdown.
${jobTargetContext}

Please include the following sections:
- **Professional Summary**: A brief summary of the candidate's profile.
- **Technical Skills**: A list of technical skills found.
- **Soft Skills**: A list of soft skills found or inferred.
- **Strengths**: Keep only 5-7 concise bullet points. Do NOT generate long explanations.
- **Weaknesses**: Keep only 4-5 concise bullet points.
- **Missing Skills**: Common skills for this profile (or the target job) that are missing.
- **Keyword Gap**: Missing keywords based on the target job (if provided).
- **ATS Score**: An estimated ATS score out of 100 based on general best practices and the target job (if provided). This should be the ONLY score you provide. Do NOT provide a 'Final Overall Score'.
- **Resume Improvement Suggestions**: Generate short actionable bullet points. Keep each suggestion within 1-2 lines. Do NOT write huge paragraphs.
- **Suitable Job Roles**: Top 3 job roles this candidate is suited for.

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

export const improveResume = async (apiKey, resumeText, jobTarget) => {
  if (!apiKey) {
    throw new Error("Gemini API Key is required.");
  }
  if (!resumeText) {
    throw new Error("Resume text is empty.");
  }

  let jobTargetContext = "";
  if (jobTarget && jobTarget.trim()) {
    jobTargetContext = `\nThe user has provided the following Target Job Role or Job Description:\n"${jobTarget.trim()}"\n\nPlease rewrite the resume specifically for this target job. Optimize it for ATS keywords related to this job.`;
  }

  const prompt = `
You are an expert HR recruiter and professional resume writer.
I am providing you with the extracted text from a resume. 
Your task is to professionally improve and rewrite the resume for ATS optimization and readability.
Format the response as a professional resume using valid HTML only (no markdown).
${jobTargetContext}

IMPORTANT RULES:
1. Preserve ALL important information from the original resume. Never shorten the resume.
2. NEVER remove the following sections if they exist: Professional Summary, Skills, Experience, Education, Certifications, Projects, Achievements, Languages, Contact Information.
3. Improve and expand existing content. Expand bullet points where appropriate using strong action verbs.
4. Improve grammar, readability, and ATS keyword optimization.
5. Never invent any experience, companies, skills, degrees, certifications, achievements, numbers, or projects. Only improve wording and formatting.
6. Use EXACTLY the following HTML structure with these class names to guarantee a professional A4, print-ready, single column layout:
   <div class="cv-template">
     <header class="cv-header">
       <h1 class="cv-name">Candidate Name</h1>
       <div class="cv-contact">Email • Phone • LinkedIn • Location</div>
     </header>
     <section class="cv-section">
       <h2 class="cv-section-title">Professional Summary</h2>
       <p class="cv-paragraph">...</p>
     </section>
     <section class="cv-section">
       <h2 class="cv-section-title">Skills</h2>
       <div class="cv-skills">...</div>
     </section>
     <section class="cv-section">
       <h2 class="cv-section-title">Experience</h2>
       <div class="cv-experience-item">
         <div class="cv-experience-header">
           <span class="cv-role">Role Title</span>
           <span class="cv-date">Date Range</span>
         </div>
         <div class="cv-company">Company Name</div>
         <ul class="cv-list"><li>...</li></ul>
       </div>
     </section>
     <!-- Follow this pattern for Education, Projects, etc. -->
   </div>
7. Ensure all headings use the class "cv-section-title", all lists use "cv-list", and experience items use "cv-experience-item".
8. DO NOT wrap the output in any markdown block (like \`\`\`html). Return ONLY raw HTML.

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
      let htmlContent = data.candidates[0].content.parts[0].text;
      htmlContent = htmlContent.replace(/```html/gi, '').replace(/```/g, '').trim();
      // Remove any stray dots or characters at the start/end
      htmlContent = htmlContent.replace(/^\.+|\.+$/g, '').trim();
      return htmlContent;
    } else {
      throw new Error("No improved resume returned from Gemini.");
    }
  } catch (error) {
    console.error("Gemini API Error during resume improvement:", error);
    throw error;
  }
};

export const analyzeMatchReport = async (apiKey, originalResumeText, improvedResumeHtml, jobDescription) => {
  if (!apiKey) throw new Error("Gemini API Key is required.");
  if (!originalResumeText || !jobDescription) throw new Error("Resume text and Job Description are required.");

  const prompt = `
You are an expert HR recruiter and ATS (Applicant Tracking System) specialist.
I am providing you with a candidate's original resume text, their improved resume, and a target Job Description.
Please compare the resume with the Job Description and generate a detailed Resume Match Report.
Format the response in clean Markdown.

Please include exactly the following sections in order:
- **Resume Match Score**: Display a percentage score (e.g., 82%) indicating how well the resume matches the job description.
- **Missing Skills**: List missing technical and soft skills.
- **Missing Keywords**: Extract important ATS keywords from the Job Description that are missing in the resume.
- **Resume Strengths**: Highlight the strongest parts of the resume in relation to the job.
- **Suggested Resume Improvements**: Generate short, actionable bullet points only (e.g., 'Add Docker experience if applicable').
- **ATS Optimization Tips**: Provide 5-8 ATS-specific recommendations.
- **Hiring Probability**: Display a visual rating (High / Medium / Low).
- **Final Recommendation**: Generate a concise summary explaining how well the resume matches the job and what should be improved.

Here is the Original Resume Text:
"""
${originalResumeText}
"""

Here is the Improved Resume:
"""
${improvedResumeHtml}
"""

Here is the Job Description:
"""
${jobDescription}
"""
`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to generate match report.");
    }

    const data = await response.json();
    if (data.candidates && data.candidates.length > 0) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error("No report returned from Gemini.");
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const generateJobSpecificResume = async (apiKey, originalResumeText, improvedResumeHtml, jobDescription) => {
  if (!apiKey) throw new Error("Gemini API Key is required.");
  if (!originalResumeText || !jobDescription) throw new Error("Resume text and Job Description are required.");

  const prompt = `
You are an expert HR recruiter and professional resume writer.
I am providing you with a candidate's original resume, an improved version, and a target Job Description.
Your task is to generate a new ATS-friendly resume specifically tailored for this Job Description.
Format the response as a professional resume using valid HTML only (no markdown).

IMPORTANT RULES:
1. Optimize the resume for the provided Job Description using relevant ATS keywords.
2. Never fabricate experience, projects, certifications, or skills. Only optimize and reorganize the user's existing information.
3. Use EXACTLY the following HTML structure with these class names to guarantee a professional A4, print-ready, single column layout:
   <div class="cv-template">
     <header class="cv-header">
       <h1 class="cv-name">Candidate Name</h1>
       <div class="cv-contact">Email • Phone • LinkedIn • Location</div>
     </header>
     <section class="cv-section">
       <h2 class="cv-section-title">Professional Summary</h2>
       <p class="cv-paragraph">...</p>
     </section>
     <section class="cv-section">
       <h2 class="cv-section-title">Skills</h2>
       <div class="cv-skills">...</div>
     </section>
     <section class="cv-section">
       <h2 class="cv-section-title">Experience</h2>
       <div class="cv-experience-item">
         <div class="cv-experience-header">
           <span class="cv-role">Role Title</span>
           <span class="cv-date">Date Range</span>
         </div>
         <div class="cv-company">Company Name</div>
         <ul class="cv-list"><li>...</li></ul>
       </div>
     </section>
     <!-- Follow this pattern for Education, Projects, etc. -->
   </div>
4. DO NOT wrap the output in any markdown block (like \`\`\`html). Return ONLY raw HTML.

Here is the Original Resume Text:
"""
${originalResumeText}
"""

Here is the Improved Resume:
"""
${improvedResumeHtml}
"""

Here is the Job Description:
"""
${jobDescription}
"""
`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to generate job-specific resume.");
    }

    const data = await response.json();
    if (data.candidates && data.candidates.length > 0) {
      let htmlContent = data.candidates[0].content.parts[0].text;
      htmlContent = htmlContent.replace(/```html/gi, '').replace(/```/g, '').trim();
      htmlContent = htmlContent.replace(/^\.+|\.+$/g, '').trim();
      return htmlContent;
    } else {
      throw new Error("No resume returned from Gemini.");
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const generateCoverLetter = async (apiKey, originalResumeText, improvedResumeHtml, jobDescription) => {
  if (!apiKey) throw new Error("Gemini API Key is required.");
  if (!originalResumeText || !jobDescription) throw new Error("Resume text and Job Description are required.");

  const prompt = `
You are an expert HR recruiter and professional career coach.
I am providing you with a candidate's original resume, an improved version, and a target Job Description.
Your task is to write a professional, ATS-friendly Cover Letter tailored for this specific job.
Format the response in clean Markdown.

Include:
- A Professional Greeting
- A Personalized Introduction
- Relevant Skills matching the job description
- Relevant Experience highlighting matching achievements
- A Strong Closing
- A Professional Tone

Here is the Original Resume Text:
"""
${originalResumeText}
"""

Here is the Improved Resume:
"""
${improvedResumeHtml}
"""

Here is the Job Description:
"""
${jobDescription}
"""
`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to generate cover letter.");
    }

    const data = await response.json();
    if (data.candidates && data.candidates.length > 0) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error("No cover letter returned from Gemini.");
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
