import React from 'react'
import { LoginForm } from '../../components/auth/LoginForm'

export const LoginPage = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-background'>
        <div className='absolute inset-0 bg-gradient-to-br from-secondary to-secondary/20 opacity-50'/>
            <div className='z-10 w-full max-w-md px-4'>
                <div className='mb-8 text-center'>
                    <h1 className='text-3xl font-bold text-foreground'>Welcome back</h1>
                    <p>We're glad to see you again</p>
                </div>
                {/* Registration form */}
                <LoginForm/>
            </div>
        
    </div>
  )
}
