import React from 'react'
import { RegisterForm } from '../../components/auth/RegisterForm'

export const RegisterPage = () => {
  return (
     <div className='min-h-screen flex flex-col justify-center items-center bg-background'>
            <div className='absolute inset-0 bg-gradient-to-br from-secondary to-secondary/20 opacity-50'/>
                <div className='z-10 w-full max-w-md px-4'>
                    <div className='mb-8 text-center'>
                        <h1 className='text-3xl font-bold text-foreground'>Join us today</h1>
                        <p>Create account in just few steps</p>
                    </div>
                    {/* Registration form */}
                    <RegisterForm/>
                </div>
            
        </div>
  )
}
