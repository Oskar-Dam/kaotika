import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import { useKaotikaRules } from '@/hooks/useKaotikaRules';
import { useSession } from 'next-auth/react';
import React from 'react'

const fakeRules = [
  {
    _id: "1",
    epicName: "Code of Unity",
    description: [
      "Collaborate respectfully with all members of your team.",
      "Offer help to peers when they face challenges.",
      "Share knowledge to strengthen the group as a whole.",
    ],
  },
  {
    _id: "2",
    epicName: "Path of Evaluation",
    description: [
      "Complete all assigned tasks before evaluation deadlines.",
      "Demonstrate understanding, not only task completion.",
      "Participate actively during feedback sessions.",
    ],
  },
  {
    _id: "3",
    epicName: "Discipline of Focus",
    description: [
      "Stay on task during individual and group work sessions.",
      "Avoid distractions to maintain group progress.",
      "Seek clarification whenever objectives are unclear.",
    ],
  },
  {
    _id: "4",
    epicName: "Honor of Communication",
    description: [
      "Express your ideas clearly and concisely.",
      "Listen attentively to others' contributions.",
      "Use positive and constructive language in all interactions.",
    ],
  },
  {
    _id: "5",
    epicName: "Respectful Conduct",
    description: [
      "Treat classmates, teachers, and materials with respect.",
      "Value diverse opinions within your team.",
      "Maintain a safe and inclusive environment for all.",
    ],
  },
  {
    _id: "6",
    epicName: "Chronicles of Reflection",
    description: [
      "Reflect on your learning progress at the end of each module.",
      "Identify areas of improvement and set personal goals.",
      "Document reflections honestly and constructively.",
    ],
  },
  {
    _id: "7",
    epicName: "Guild Law of Punctuality",
    description: [
      "Arrive on time to all classes and team meetings.",
      "Submit tasks within the established deadlines.",
      "Inform the team in advance if delays are unavoidable.",
    ],
  },
  {
    _id: "8",
    epicName: "Virtue of Responsibility",
    description: [
      "Take ownership of your assigned tasks and roles.",
      "Ensure quality and accuracy in your work submissions.",
      "Support the team's goals through reliable contributions.",
    ],
  },
];

const Rules = () => {
  const { data: session } = useSession();
  const { rules, loading, error, refetchSkills: fetchRules} = useKaotikaRules(session)

  if (loading) {
    return <Loading />;
  }
  return (
    <Layout>
      <div className="relative min-h-screen text-white p-8 flex flex-col items-center overflow-hidden">
        <video
          className="fixed inset-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/rules-bg.mp4" type="video/mp4" />
        </video>

        <div className="fixed inset-0 bg-black/50 z-10"></div>

        <div className="relative z-20 w-2/3 flex flex-col items-center p-8">
          <h1 className="text-4xl mb-8 text-medievalSepia border-b-2 border-medievalSepia pb-2">
            📜 The Epic Rules of Our Guild
          </h1>

          <div className="w-full grid gap-8">
            {fakeRules.map((rule) => (
              <div
                key={rule._id}
                className="border-2 border-yellow-700 bg-black/50 rounded-xl p-6 shadow-lg hover:bg-black/50 transition"
              >
                <h2 className="text-3xl text-center text-medievalSepia mb-4">
                  ⚔️ {rule.epicName}
                </h2>
                <ul className="list-disc list-inside space-y-2">
                  {rule.description.map((desc, index) => (
                    <li key={index} className="text-medievalSepia text-2xl">
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}



export default Rules;