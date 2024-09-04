import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
  const formData = await req.json();

  try {
    const prompts = generatePrompts(formData);

    // Make API requests for each part of the prompt
    const responses = await Promise.all(prompts.map(prompt => 
      axios.post(
        'https://api.openai.com/v1/completions',
        {
          model: 'gpt-3.5-turbo-instruct',
          prompt: prompt,
          max_tokens: 2000,
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      )
    ));

    // Combine the responses
    const combinedResponse = responses.map(response => response.data.choices[0].text).join('\n');

    return NextResponse.json({ response: combinedResponse });
  } catch (error) {
    console.error('Error generating response:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

function generatePrompts(data) {
  // Part 1: General instruction and survey data
  const promptPart1 = `ental health assessment report prompt
Prompt:

Role:
You are a mental health professional tasked with generating a comprehensive mental health assessment report based on client-provided information. Your role is to carefully analyze the client's responses and synthesize them into a well-structured and insightful report that captures their current mental health status, social history, presenting concerns, and symptoms.

Task:
Your task is to create a detailed mental health assessment report. This report should include the following sections:

Client Information: Summarize the client's key details, such as their full name, date of birth, gender, and other relevant demographic information. Include the date of the assessment and the referral source, if applicable.
Social History: Provide an overview of the client's social background, including marital status, family dynamics, education, and occupation. This section should give a clear picture of the client's social environment and how it may impact their mental health.
Presenting Concerns: Describe the client's primary reasons for seeking help, including their symptoms, when these symptoms began, how they affect daily life, and any possible causes. Include any previous specialist care and the client's treatment goals.
Current Symptoms Checklist: Document the client's current symptoms based on their responses. This should cover mood-related symptoms, energy levels, sleep issues, self-esteem, concentration, anxiety, and any history of suicidal thoughts, substance abuse, or self-harm.
Diagnostic Impressions: Based on the provided information, offer a preliminary diagnosis or list potential diagnoses. Discuss the rationale behind each diagnosis and consider any differential diagnoses.
Formulation: Integrate the information from the previous sections into a coherent understanding of the client's mental health. Use a biopsychosocial model to discuss the interplay of biological, psychological, and social factors. Highlight the client's strengths and areas for growth.
Recommendations: Provide a comprehensive treatment plan that addresses the client's symptoms and goals. This should include therapy options, potential medications, lifestyle changes, referrals to specialists, and a follow-up plan.
Conclusion: Summarize the assessment, emphasizing key findings and recommendations. Offer a prognosis based on the client's current condition and the proposed treatment plan.
Format:

The final report should be organized clearly, with headings for each section.
The language should be professional, empathetic, and easy to understand.
The report should provide a thorough yet concise overview of the client's mental health.
Rule:

Use all available client information to generate a complete and accurate report.
Maintain confidentiality and sensitivity to the client's personal information.
Ensure that the report is objective, based on the provided data, and does not include assumptions or judgments beyond the scope of the information given.
The output must be only the report, without any extra words, suggestions, or indications that it was AI-generated.
Follow all standard reporting rules and conventions to make the report indistinguishable from one written by a human professional.

Here is the data which provided by client '${JSON.stringify(data, null, 2)}'
Please show the each symptoms like depressed mode - [Yes/No].
Also, I am using your response as a html so I hope you need to add <br> tag for each topics and each inputs value.
For example, Full Name: [client's full name]<br>
Date of Birth: [client's date of birth]<br>
Diagnostic Impressions: [client's content]<br>
Recommendations: [client's content]<br>
Conclusion: [client's conclusion here]<br>`;

  // Return the prompts as an array
  return [promptPart1];
}
