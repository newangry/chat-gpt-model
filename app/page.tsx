"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    dateOfAssessment: "",
    referralSource: "",
    maritalStatus: "",
    spouse: "",
    children: "",
    homeResidents: "",
    highestEducation: "",
    currentOccupation: "",
    presentingConcerns: "",
    symptomDescription: "",
    symptomOnset: "",
    dailyImpact: "",
    symptomCause: "",
    specialistSeen: "",
    specialistDuration: "",
    specialistConclusions: "",
    treatmentGoals: "",
    additionalInfo: "",
    currentSymptoms: {
      depressed: "",
      lowInterest: "",
      sleepProblems: "",
      lowEnergy: "",
      poorAppetite: "",
      overeating: "",
      lowSelfEsteem: "",
      concentrationProblems: "",
      forgetfulness: "",
      impulsiveness: "",
      irritability: "",
      cryingSpells: "",
      worry: "",
      anxietyAttacks: "",
      hallucinations: "",
      slowMovement: "",
      fastMovement: "",
      restlessness: "",
      suicidalThoughts: "",
      substanceAbuse: "",
      arrestHistory: "",
      hallucinationsExperience: "",
      suicideAttemptHistory: "",
      selfHarm: "",
      eatingDisorders: "",
    },
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
      }, 10);
      return () => clearInterval(intervalId);
    }
  }, [response]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name.includes("currentSymptoms")) {
      const symptomName = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        currentSymptoms: {
          ...prevData.currentSymptoms,
          [symptomName]: value,
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: any) => {
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
    <div className="m-auto w-full max-w-3xl">
      <form onSubmit={handleSubmit}>
        <div className="bg-[#1E293B] space-y-8 divide-y divide-gray-200 px-4 py-5 dark:divide-slate-200/5 sm:p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Client Information</h2>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-400">
              Full Name
            </label>
            <input
              name="fullName"
              className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg bg-[#293548]"
              type="text"
              onChange={handleChange}
            />

            <label className="block text-sm font-medium text-gray-700 dark:text-slate-400">
              Date of Birth
            </label>
            <input
              name="dateOfBirth"
              className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg bg-[#293548]"
              type="date"
              onChange={handleChange}
            />

            <label className="block text-sm font-medium text-gray-700 dark:text-slate-400">
              Gender
            </label>
            <input
              name="gender"
              className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg bg-[#293548]"
              type="text"
              onChange={handleChange}
            />

            <label className="block text-sm font-medium text-gray-700 dark:text-slate-400">
              Date of Assessment
            </label>
            <input
              name="dateOfAssessment"
              className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg bg-[#293548]"
              type="date"
              onChange={handleChange}
            />

            <label className="block text-sm font-medium text-gray-700 dark:text-slate-400">
              Referral Source
            </label>
            <input
              name="referralSource"
              className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg bg-[#293548]"
              type="text"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Social History</h2>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-400">
              Marital Status
            </label>
            <input
              name="maritalStatus"
              className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg bg-[#293548]"
              type="text"
              placeholder="[Single/Widowed/Divorced/Married/In a relationship]"
              onChange={handleChange}
            />

            <label className="block text-sm font-medium text-gray-700 dark:text-slate-400">
              Do you have a spouse?
            </label>
            <input
              name="spouse"
              className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg bg-[#293548]"
              type="text"
              placeholder="[Yes/No]"
              onChange={handleChange}
            />

            <label className="block text-sm font-medium text-gray-700 dark:text-slate-400">
              Do you have any children?
            </label>
            <input
              name="children"
              className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg bg-[#293548]"
              type="text"
              placeholder="[Yes/No]"
              onChange={handleChange}
            />

            <label className="block text-sm font-medium text-gray-700 dark:text-slate-400">
              Who lives with you in your home?
            </label>
            <input
              name="homeResidents"
              className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg bg-[#293548]"
              type="text"
              placeholder="[Enter details]"
              onChange={handleChange}
            />

            <label className="block text-sm font-medium text-gray-700 dark:text-slate-400">
              Highest Grade, Diploma, or Degree Completed
            </label>
            <input
              name="highestEducation"
              className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg bg-[#293548]"
              type="text"
              onChange={handleChange}
            />

            <label className="block text-sm font-medium text-gray-700 dark:text-slate-400">
              Current Occupation
            </label>
            <input
              name="currentOccupation"
              className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg bg-[#293548]"
              type="text"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Presenting Concerns</h2>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-400">
              Describe the symptoms for which you’re seeking help
            </label>
            <textarea
              name="symptomDescription"
              className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg bg-[#293548]"
              rows={3}
              onChange={handleChange}
            ></textarea>

            <label className="block text-sm font-medium text-gray-700 dark:text-slate-400">
              When did you first experience the above symptoms?
            </label>
            <input
              name="symptomOnset"
              className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg bg-[#293548]"
              type="text"
              onChange={handleChange}
            />

            <label className="block text-sm font-medium text-gray-700 dark:text-slate-400">
              How are these symptoms affecting your daily life?
            </label>
            <input
              name="dailyImpact"
              className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg bg-[#293548]"
              type="text"
              onChange={handleChange}
            />

            <label className="block text-sm font-medium text-gray-700 dark:text-slate-400">
              What do you think may have caused the symptoms?
            </label>
            <input
              name="symptomCause"
              className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg bg-[#293548]"
              type="text"
              onChange={handleChange}
            />

            <label className="block text-sm font-medium text-gray-700 dark:text-slate-400">
              Have you ever seen a specialist to help with the above problem(s)?
            </label>
            <input
              name="specialistSeen"
              className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg bg-[#293548]"
              type="text"
              placeholder="[Yes/No]"
              onChange={handleChange}
            />

            <label className="block text-sm font-medium text-gray-700 dark:text-slate-400">
              For how long did you see the specialist(s)?
            </label>
            <input
              name="specialistDuration"
              className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg bg-[#293548]"
              type="text"
              onChange={handleChange}
            />

            <label className="block text-sm font-medium text-gray-700 dark:text-slate-400">
              What were your specialist(s) conclusions and recommendations?
            </label>
            <textarea
              name="specialistConclusions"
              className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg bg-[#293548]"
              rows={3}
              onChange={handleChange}
            ></textarea>

            <label className="block text-sm font-medium text-gray-700 dark:text-slate-400">
              What are your treatment goals?
            </label>
            <input
              name="treatmentGoals"
              className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg bg-[#293548]"
              type="text"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Additional Information</h2>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-400">
              Current Symptoms Checklist
            </label>
            {[
              { label: "Do you feel depressed or blue?", name: "depressed" },
              {
                label: "Do you have little interest or pleasure in doing things?",
                name: "lowInterest",
              },
              { label: "Do you have any problems with sleeping?", name: "sleepProblems" },
              { label: "Do you feel tired or have little energy?", name: "lowEnergy" },
              { label: "Do you have poor appetite?", name: "poorAppetite" },
              { label: "Do you overeat?", name: "overeating" },
              { label: "Do you feel bad about yourself?", name: "lowSelfEsteem" },
              { label: "Do you have trouble concentrating?", name: "concentrationProblems" },
              { label: "Are you forgetful?", name: "forgetfulness" },
              { label: "Are you impulsive?", name: "impulsiveness" },
              { label: "Are you easily irritable?", name: "irritability" },
              { label: "Do you have crying spells?", name: "cryingSpells" },
              { label: "Do you worry all the time?", name: "worry" },
              { label: "Do you have any anxiety attacks?", name: "anxietyAttacks" },
              { label: "Do you have any hallucinations?", name: "hallucinations" },
              { label: "Are you moving or speaking slowly that others can notice?", name: "slowMovement" },
              { label: "Are you moving or speaking too quickly that others can notice?", name: "fastMovement" },
              { label: "Is it hard for you to stay still?", name: "restlessness" },
              { label: "Have you ever had feelings or thoughts that you didn’t want to live?", name: "suicidalThoughts" },
              {
                label: "Do you have a history of substance abuse or alcohol problems?",
                name: "substanceAbuse",
              },
              { label: "Have you ever been arrested?", name: "arrestHistory" },
              { label: "Do you hear or see things that others can’t?", name: "hallucinationsExperience" },
              {
                label: "Have you attempted suicide in the past or do you ever have thoughts about not wanting to be here?",
                name: "suicideAttemptHistory",
              },
              { label: "Have you engaged in self-harming behaviors?", name: "selfHarm" },
              {
                label: "Have you ever experienced problems with eating too much or too little?",
                name: "eatingDisorders",
              },
            ].map((item) => (
              <div key={item.name}>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-400">
                  {item.label}
                </label>
                <input
                  name={`currentSymptoms.${item.name}`}
                  className="w-full px-3 py-2 text-white border-1 border-gray-500 rounded-lg bg-[#293548]"
                  type="text"
                  placeholder="[Yes/No]"
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-wrap sm:flex-nowrap sm:justify-center pt-8">
            <button
              type="submit"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Generate
            </button>
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
