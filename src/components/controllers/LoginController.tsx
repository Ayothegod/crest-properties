
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Lock } from 'lucide-react'
import { actions } from 'astro:actions'
import { useToast } from '@/hooks/use-toast'
import { navigate } from 'astro:transitions/client'

export default function LoginController({}) {
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const { data, error } = await actions.auth.loginUser({
      email,
      password,
    });

    if (error?.code === 'FORBIDDEN') {
      console.log(error?.message);
      toast({
        title: "⚠️ Login Failed.",
        description: `${error?.message}`,
      })
      setIsLoading(false)
      return
    }
    
    if (error) {
      console.log(error);
      toast({
        title: "Uh oh! Something went wrong.",
        description: `Try again later!`,
      })
      setIsLoading(false)
      return;
    }
    
    console.log(data);
    toast({
      title: "✅ Login Successful",
      description: `Welcome back! You have successfully logged in.`,
    })

    setIsLoading(false)
    navigate("/");
  }

  return (
    <div className=" mt-20 p-4 w-full sm:w-96 sm:mx-auto bg-listing-header-color shadow">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <h2 className="text-xl font-bold text-center">Welcome Back!</h2>
        <p className="font-medium text-xs text-center">
        We're excited to see you again. Log in to your account to manage your properties and explore new opportunities.
        </p>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className=""
            />
            <Lock
              className="h-4 w-4 absolute right-2 top-1/3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
            <a
              href="/forgot-password"
              className="text-xs text-footer-bg hover:underline block mt-2"
            >
              Can't access your account?
            </a>
          </div>
        </div>
        <Button type="submit" className="w-full">
        {isLoading ? <Loader2 className="animate-spin"/> : "Sign In"}
        </Button>

        <div className="text-center mt-8 text-xs">
          <h5 className="font-bold ">Don't have an account?</h5>
          <p className="text-xs">
          <a href="/register" className="text-footer-bg hover:underline">Sign up now</a> and start your journey with us!
          </p>
        </div>

      </form>
    </div>
  )
}