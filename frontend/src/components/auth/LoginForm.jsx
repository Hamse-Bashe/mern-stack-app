import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import { extractErrorMessages } from '../../util/errorUtil'
import api from '../../lib/api/apiClient'
import { LoaderCircle } from 'lucide-react'
import useAuthStore from '../../lib/store/authStore'

export const LoginForm = () => {

    const navigate = useNavigate()

    const { setAuth } = useAuthStore()
    
    const [formValues,setFormValues] = useState({
        email: "",
        password: ""
    })

    const [error,setError] = useState(null)

    const loginMutation = useMutation({
        mutationFn: async(credentials)=>{
            const response = await api.post('/auth/login', credentials)
            // console.log("response: ",response)
            return response.data
        },
        onSuccess: (data)=>{
            // handle tokens
            if(data.token){
                const user = data.user;
                const token = data.token;

                setAuth(user,token);
                navigate("/dashboard")
            }
        },
        onError: (error)=>{
            console.dir(error)
            setError(extractErrorMessages(error))
        }
    })

    const handleInputChange = (e)=>{
        const {name,value} = e.target;

        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        setError(null);

        if(!formValues.email || !formValues.password){
            return setError("All fields are required")
        }

        // mutation
        loginMutation.mutate({
            email: formValues.email,
            password: formValues.password
        })


    }

  return (
    <Card className={"w-full border-border"}>
        <CardHeader className={"space-y-1 pb-4"}>
            <CardTitle className="text-xl text-center">Sign in</CardTitle>
            <CardDescription className={"text-center"}>
                Enter your credentials to access your account
            </CardDescription>
            <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4 pt-0">
                        {
                            error && (
                                <div className='p-3 bg-destructive/10 text-destructive text-sm font-medium rounded-md'>
                                    {error}
                                </div>
                            )
                        }
                        <div className='space-y-2'>
                            <div className='text-sm font-medium text-left'>
                                Email
                            </div>
                            <Input name="email"
                                placeholder="email@email.com"
                                required
                                value={formValues.email}
                                onChange={handleInputChange}
                             />
                        </div>
                        <div className='space-y-2'>
                            <div className='text-sm font-medium text-left'>
                                Password
                            </div>
                            <Input
                                name="password"
                                type={"password"}
                                placeholder="*****"
                                required
                                value={formValues.password}
                                onChange={handleInputChange}
                             />
                        </div>
                        <div className='py-4'>
                            <Button type="submit" className={"w-full cursor-pointer"}>
                                {loginMutation.isPending ? (<span className='flex items-center gap-2'><LoaderCircle />Login account...</span>): "Login account"}
                            </Button>
                        </div>
                    </CardContent>

                    <CardFooter className={"flex justify-center pt-0"}>
                        <div className='text-center text-sm'>
                            Don't have an account ? <a onClick={()=> navigate("/register")} className='text-primary hover:underline cursor-pointer'> Sign up</a>
                        </div>
                    </CardFooter>
                </form>
        </CardHeader>
    </Card>
  )
}
