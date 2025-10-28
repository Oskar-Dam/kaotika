import { useRouter } from 'next/router';
import Layout from '@/components/Layout'
import React from 'react'

const execution = () => {
  const router = useRouter();

  const handleBonificationsRouter = () => {
    router.push('/bonifications');
  };

  const handleFeedbackRouter = () => {
    router.push('/feedback');
  };

  return (
    <Layout>
      <div className='flex justify-around p-5'>
        <div className="w-1/3 border border-sepia bg-black/30 rounded-md p-2 bg-cover bg-center cursor-pointer hover:border-white" onClick={handleBonificationsRouter}>
          <p className="text-3xl text-medievalSepia text-center  mb-6">Bonifications</p>
          </div>
        <div className="w-1/3 border border-sepia bg-black/30 rounded-md p-2 bg-cover bg-center cursor-pointer hover:border-white" onClick={handleFeedbackRouter}>
          <p className="text-3xl text-medievalSepia text-center  mb-6">Feedback</p>
        </div>
      </div>
    </Layout>
  )
}

export default execution