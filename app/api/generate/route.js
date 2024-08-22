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
  const promptPart1 = `All of data is provided by client so no worry about establish rapport with the client and obtatin their inform.
Please evaluate the clinical based on the client survey I provided and when presenting the data pls just make it same as sample data I provided below and  . Here is the survey data:
'${JSON.stringify(data, null, 2)}',
Here is the sample output format Yuu must follow to present the data:

'Client Information:<br>

Full Name: Jane Doe<br>
Date of Birth: April 12, 1985<br>
Gender: Female<br>
Date of Assessment: August 19, 2024<br>
Referral Source: Self-referred<br>

Social History:<br>

Marital Status: Married<br>
Do you have a spouse? Yes<br>
Do you have any children? Yes<br>
Who lives with you in your home? Spouse and two children (ages 8 and 5)<br>
Highest Grade, Diploma, or Degree Completed: Bachelor’s Degree in Business Administration<br>
Current Occupation: Marketing Manager<br>
Presenting Concerns: Describe the symptoms for which you’re seeking help: I’ve been feeling increasingly anxious and overwhelmed at work and home. I’m having trouble sleeping, and I often feel irritable with my family.<br>
Please ensure that the output includes a Current Symptoms Checklist and uses <br> tags to separate each topic.<br>
'When did you first experience the above symptoms? About six months ago, but they’ve improved in the last three months.<br>
How are these symptoms affecting your daily life? I’m finding it difficult to concentrate at work, which is affecting my performance. At home, I feel disconnected from my family and have little patience with my children.<br>
What do you think may have caused the symptoms? I believe it’s a combination of work stress, the pressure of managing a household, and not having enough time for self-care.<br>
Have you ever seen a specialist to help with the above problem(s)? Yes<br>
For how long did you see the specialist(s)? About three months, ending last year.<br>
What were your specialist(s) conclusions and recommendations? The therapist suggested stress management techniques and mindfulness, but I wasn’t able to follow through consistently.<br>
What are your treatment goals? I want to learn how to manage my anxiety better, improve my sleep, and feel more connected with my family.<br>
Additional Information: My mother also had anxiety issues, and I’m concerned this might be hereditary.<br>

Current Symptoms Checklist:<br>

Do you feel depressed or blue? Yes<br>
Do you have little interest or pleasure in doing things? Yes<br>
Do you have any problems with sleeping? Yes<br>
Do you feel tired or have little energy? Yes<br>
Do you have poor appetite? No<br>
Do you overeat? No<br>
Do you feel bad about yourself? Yes<br>
Do you have trouble concentrating? Yes<br>
Are you forgetful? Yes<br>
Are you impulsive? No<br>
Are you easily irritable? Yes<br>
Do you have crying spells? Occasionally<br>
Do you worry all the time? Yes<br>
Do you have any anxiety attacks? Occasionally<br>
Do you have any hallucinations? No<br>
Are you moving or speaking slowly that others can notice? No<br>
Are you moving or speaking too quickly that others can notice? No<br>
Is it hard for you to stay still? No<br>
Have you ever had feelings or thoughts that you didn’t want to live? No<br>
Do you have a history of substance abuse or alcohol problems? No<br>
Have you ever been arrested? No<br>
Do you hear or see things that others can’t? No<br>
Have you attempted suicide in the past or do you ever have thoughts about not wanting to be here? No<br>
Have you engaged in self-harming behaviors? No<br>
Have you ever experienced problems with eating too much or too little? No<br>'



Please ensure that the output includes a Current Symptoms Checklist and uses <br> tags to separate each topic and confirm once again you just followed the sample output format. If you got the empty survey data pls say sorry and can't display that data`;

  // Return the prompts as an array
  return [promptPart1];
}
