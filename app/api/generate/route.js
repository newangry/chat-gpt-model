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
Have you ever experienced problems with eating too much or too little? No<br>
Based on Jane’s symptoms and history, the preliminary diagnostic impressions include:<br>
Generalized Anxiety Disorder (GAD): Jane’s persistent anxiety, worry, and physical symptoms suggest GAD. The chronic nature of her anxiety, combined with her difficulty concentrating and irritability, supports this diagnosis.
Major Depressive Disorder (MDD): Symptoms such as depressed mood, loss of interest in activities, and feelings of low energy and negative self-perception align with MDD. Further evaluation is necessary to confirm the extent and duration of these depressive symptoms.
Adjustment Disorder with Anxiety: Given the recent onset of her symptoms in relation to stressors at work and home, this could also be a consideration.
Formulation:<br>
Jane’s mental health issues appear to be influenced by a combination of biological, psychological, and social factors. Her high-stress job, responsibilities at home, and insufficient self-care contribute to her anxiety and depressive symptoms. Her familial history of anxiety suggests a possible genetic predisposition, which may exacerbate her current condition. Jane’s strengths include her awareness of her symptoms and her previous attempt to seek help. However, her struggle with consistent follow-through on therapeutic strategies indicates a need for a more structured and supportive treatment approach.
Recommendations:<br>
Therapy: Cognitive Behavioral Therapy (CBT) to address anxiety and depressive symptoms, focusing on stress management, cognitive restructuring, and improving coping strategies.
Medication: Consideration of an SS RI or SNRI to manage anxiety and depressive symptoms, with careful monitoring for effectiveness and side effects.<br>
Lifestyle Changes: Implementation of regular exercise, a balanced diet, and improved sleep hygiene practices.<br>
Self-Care: Encourage self-care routines and time management strategies to balance work and family responsibilities.<br>
Family Involvement: Family therapy or counseling to address relational issues and improve communication and support within the family.<br>
Follow-Up: Regular follow-up appointments to monitor progress, adjust treatment plans as needed, and provide ongoing support.<br>
Conclusion:<br>
Jane’s assessment reveals a significant impact of anxiety and depressive symptoms on her daily life and relationships. A comprehensive treatment plan addressing both therapeutic and lifestyle interventions is recommended. With appropriate support and intervention, Jane has the potential to manage her symptoms effectively and improve her overall well-being.'



Please ensure that the output includes a Current Symptoms Checklist and uses <br> tags to separate each topic and confirm once again you just followed the sample output format.`;

  // Return the prompts as an array
  return [promptPart1];
}
