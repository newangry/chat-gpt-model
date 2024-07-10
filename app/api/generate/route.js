import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
  const formData = await req.json();

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'gpt-3.5-turbo-instruct',
        prompt: generatePrompt(formData),
        max_tokens: 1000,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return NextResponse.json({ response: response.data.choices[0].text});
  } catch (error) {
    console.error('Error generating response:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

function generatePrompt(data) {
  // Convert form data into a prompt
  return `Before people go into therapy or any other case, usually clinical, an evaluation must be done as to understand the person’s mental functioning. Throughout human history, there has always been some sort of psychological assessment sample, thought they might not had called it that. Psychological assessments aim to recognize, characterize, and measure a person’s versatile and maladaptive practices and treatment objectives. Essentially, it is the systematical evaluation of someone’s conduct. These are usually done by psychologists and psychiatrists.
  So I want you make the Presenting Concerns:, Assessment Methods:, Background Information:, Behavioral Observations:,  Clinical Impressions: Recommendations:(Psychotherapy, Psychiatric Consultation, Lifestyle Modifications, Follow-up Assessment), conclusion:, and create the treatment plan base on the data I provide in the below.   ' ${JSON.stringify(data, null, 2)} and you must contain <br> tag before and end of the each topics. And don't mention the client's name directly, you can say just 'client'`;
}
