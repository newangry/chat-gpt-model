"use client"
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [formData, setFormData] = useState({
    birthday: "",
    gender: "",
    occupation: "",
    contact: "",
    description_of_symptoms: "",
    duration_of_symptoms: "",
    impact_on_daily_life: "",
    current_physical_health: "",
    past_diagnoses_and_treatments: "",
    current_medications: "",
    allergies: "",
    previous_mental_health: "",
    family_history: "",
    any_history: "",
    diet_and_exercise_habits: "",
    sleep_patterns: "",
    use_of_alcohol_or_substances: "",
    stress_levels_sources: "",
    relationship_with_family_friends: "",
    living_situation: "",
    work_or_school_environment: "",
    appearance: "",
    behavior: "",
    speech: "",
    mood_and_affect: "",
    thought_processes: "",
    insight_and_judgment: "",
    thoughts_of_self_harm_or_suicide: "",
    thoughts_of_harming_others: "",
    potential_diagnose_based_on_the_DSM5: "",
    recommended_treatments: "",
    therapeutic_approach_being_used: "",
  });
  const [response, setResponse] = useState("");
  const [animatedResponse, setAnimatedResponse] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (response) {
      let currentIndex = 0;
      const intervalId = setInterval(() => {
        setAnimatedResponse((prev) => prev + response[currentIndex]);
        currentIndex++;
        if (currentIndex === response.length) {
          clearInterval(intervalId);
        }
      }, 10); // Adjust the speed of the animation here
      return () => clearInterval(intervalId);
    }
  }, [response]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await axios.post("/api/generate", formData);
      if (result.data.response) {
        setResponse(result.data.response);
      } else if (result.data.error) {
        setError(result.data.error);
      }
    } catch (error) {
      console.error("Error generating response", error);
      setError("An error occurred while generating the response.");
    }
  };

  return (


    <div className="m-auto  w-full max-w-3xl" >

      <form onSubmit={handleSubmit}>

        <div className="bg-[#1E293B]  space-y-8 divide-y divide-gray-200 px-4 py-5 dark:divide-slate-200/5 sm:p-6">

          <div className="mb-4">

            <h2 className="text-xl font-bold mb-2">I. Basic</h2>

            <label htmlFor="birthday" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Birthday</label>
            <input name="birthday" className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 bg-[#293548] " type="text" onChange={handleChange}/>

            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Gender</label>
            <input name="gender" className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 bg-[#293548] " type="text"onChange={handleChange} />
            <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Occupation</label>
            <input name="occupation" className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 bg-[#293548] " type="text" onChange={handleChange}/>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Contact Information</label>
            <input name="contact" className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 bg-[#293548] " type="text" onChange={handleChange}/>

          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">II. Reason htmlFor Assessment</h2>
            <label htmlFor="description_of_symptoms" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Description of symptoms</label>
            <textarea name="description_of_symptoms" className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg focus:outline-none focus:ring-1  focus:ring-primary-500  bg-[#293548]" rows="3"
             onChange={handleChange}></textarea>
            <label htmlFor="duration_of_symptoms" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Duration of symptoms</label>
            <input name="duration_of_symptoms" className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 bg-[#293548] " type="text" onChange={handleChange} />
            <label htmlFor="impact_on_daily_life" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Impact on daily life</label>
            <input name="impact_on_daily_life" className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 bg-[#293548] " type="text" onChange={handleChange}/>

          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">III. Medical History</h2>
            <label htmlFor="current_physical_health" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Current physical health</label>
            <input name="current_physical_health" className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 bg-[#293548] " type="text" onChange={handleChange} />

            <label htmlFor="past_diagnoses_and_treatments" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Past diagnoses and treatments</label>
            <textarea name="past_diagnoses_and_treatments" className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg focus:outline-none focus:ring-1  focus:ring-primary-500  bg-[#293548]" rows="3"
            onChange={handleChange} ></textarea>
            <label htmlFor="current_medications" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Current medications</label>
            <input name="current_medications" className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 bg-[#293548] " type="text" onChange={handleChange}/>
            <label htmlFor="allergies" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Allergies</label>
            <input name="allergies" className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 bg-[#293548] " type="text" onChange={handleChange}/>

          </div>

          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">IV. Mental Health History</h2>
            <label htmlFor="previous_mental_health" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Previous mental health diagnoses and treatments</label>
            <input name="previous_mental_health" className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 bg-[#293548] " type="text" onChange={handleChange}/>
            <label htmlFor="family_history" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Family history of mental health issues</label>
            <input name="family_history" className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 bg-[#293548] " type="text" onChange={handleChange} />
            <label htmlFor="any_history" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Any history of substance use</label>
            <input name="any_history" className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 bg-[#293548] " type="text" onChange={handleChange} />
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">V. Lifestyle</h2>
            <label htmlFor="diet_and_exercise_habits" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Diet and exercise habits</label>
            <input name="diet_and_exercise_habits" className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 bg-[#293548] " type="text" onChange={handleChange}/>
            <label htmlFor="sleep_patterns" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Sleep patterns</label>
            <input name="sleep_patterns" className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 bg-[#293548] " type="text" onChange={handleChange} />
            <label htmlFor="use_of_alcohol_or_substances" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Use of alcohol, tobacco, or other substances</label>
            <input name="use_of_alcohol_or_substances" className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 bg-[#293548] " type="text" onChange={handleChange} />
            <label htmlFor="stress_levels_sources" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Stress levels and sources of stress</label>
            <input name="stress_levels_sources" className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 bg-[#293548] " type="text" onChange={handleChange} />

          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">VI. Social History</h2>
            <label htmlFor="relationship_with_family_friends" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Relationships with family and friends</label>
            <input name="relationship_with_family_friends" className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 bg-[#293548] " type="text" onChange={handleChange}/>
            <label htmlFor="living_situation" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Living situation</label>
            <input name="living_situation" className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 bg-[#293548] " type="text" onChange={handleChange}/>
            <label htmlFor="work_environment" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Work or school environment</label>
            <input name="work_or_school_environment" className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 bg-[#293548] " type="text" onChange={handleChange}/>

          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">VII. Mental Status Examination</h2>
            <label htmlFor="appearance" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Appearance</label>
            <input name="appearance" className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 bg-[#293548] " type="text" onChange={handleChange}/>
            <label htmlFor="behavior" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Behavior</label>
            <input name="behavior" className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 bg-[#293548] " type="text" onChange={handleChange}/>
            <label htmlFor="speech" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Speech</label>
            <input name="speech" className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 bg-[#293548] " type="text" onChange={handleChange} />
            <label htmlFor="mood_and_affect" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Mood and affect</label>
            <input name="mood_and_affect" className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 bg-[#293548] " type="text" onChange={handleChange}/>
            <label htmlFor="thought_processes" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Thought prcesses</label>
            <input name="thought_processes" className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 bg-[#293548] " type="text" onChange={handleChange}/>
            <label htmlFor="insight_and_judgment" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Insight and judgment</label>
            <input name="insight_and_judgment" className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 bg-[#293548] " type="text" onChange={handleChange}/>

          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">VIII. Risk Assessment</h2>
            <label htmlFor="thoughts_of_self_harm" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Thoughts of self-harm or suicide</label>
            <input name="thoughts_of_self_harm_or_suicide" className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 bg-[#293548] " type="text" onChange={handleChange}/>
            <label htmlFor="thoughts_of_harming_others" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Thoughts of harming others</label>
            <input name="thoughts_of_harming_others" className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 bg-[#293548] " type="text" onChange={handleChange} />
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">IX. Diagnosis and Treatment Recommendations</h2>
            <label htmlFor="potential_diagnose" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Potential diagnoses based on the DSM-5</label>
            <input name="potential_diagnose_based_on_the_DSM5" className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 bg-[#293548] " type="text" onChange={handleChange}/>
            <label htmlFor="recommended_treatments" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Recommended treatments (therapy, medication, lifestyle changes, etc.)</label>
            <input name="recommended_treatments" className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 bg-[#293548] " type="text" onChange={handleChange}/>
            <label htmlFor="recommended_treatments" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Therapeutic approach being used.</label>
            <input name="therapeutic_approach_being_used" className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 bg-[#293548] " type="text" onChange={handleChange}/>
          </div>
          <div className="flex flex-wrap sm:flex-nowrap sm:justify-center pt-8">
            <button type="submit" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Generate</button>

          </div>
          <div className="mb-4">
            {response && (
              <div className="mt-4 p-4 bg-gray-800 text-white rounded-lg">
                <h3 className="text-lg font-bold">AI Response:</h3>
                <p dangerouslySetInnerHTML={{ __html: animatedResponse }}></p>
                </div>
            )}
         
          </div>
        </div>
      </form>
    </div>

  );
}
