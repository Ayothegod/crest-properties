
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
    <div className=" mt-20 p-4 w-full md:w-96 mx-auto bg-listing-header-color shadow">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center">Sign In</h2>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
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
              href="/auth/forgot-password"
              className="text-xs text-footer-bg hover:underline block mt-2"
            >
              Can't access your account?
            </a>
          </div>
        </div>
        <Button type="submit" className="w-full">
        {isLoading ? <Loader2 className="animate-spin"/> : "Sign In"}
        </Button>
        <p className="text-center text-xs">
          Are you a new user?{" "}
          <a href="/register">
            <button type="button" className="text-footer-bg hover:underline">
              Sign Up
            </button>
          </a>
        </p>
      </form>
    </div>
  )
}