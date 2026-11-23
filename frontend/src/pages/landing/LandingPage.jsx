import React from 'react'
import { Button } from '../../components/ui/button'
import { useNavigate } from 'react-router'


const LandingPage = () => {

    const navigate = useNavigate()

  return (
    <div className='min-h-screen bg-gray-50'>
        <div className=''>
            <header className='flex justify-around items-center py-6 bg-white shadow-sm'>
                <h1 className='text-xl font-bold'>Task <span className='text-primary'>Manager</span></h1>
                <Button size='lg' onClick={()=> navigate("/login")}>Get Started</Button>
            </header>
            <main className='max-w-4xl mx-auto flex flex-col justify-center items-center pt-8 gap-6'>
                <h1 className='text-4xl font-bold text-center'>Take Control of Your Tasks.<br/> Get More Done</h1>
                <p className='text-center text-gray-600'>Stay organized, manage your daily tasks, and achieve your goals effortlessly. Our task management app helps you plan your work, track your progress, and stay productive—all in one simple and powerful workspace.</p>
                <div>
                    <Button size='lg'>Get Started</Button>
                    <Button size='lg' variant='outline'>Learn More</Button>
                </div>
            </main>
        </div>
    </div>
  )
}

export default LandingPage