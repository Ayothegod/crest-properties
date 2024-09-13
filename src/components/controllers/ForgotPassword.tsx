
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Lock } from 'lucide-react'
import { actions } from 'astro:actions'
import { useToast } from '@/hooks/use-toast'
import { navigate } from 'astro:transitions/client'

export default function ForgotPassword({}) {
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const { data, error } = await actions.auth.requestOTP({
      email
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
        <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
        <p className="font-medium"></p>
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
        <Button type="submit" className="w-full">
        {isLoading ? <Loader2 className="animate-spin"/> : "Request OTP"}
        </Button>
        <p className="text-center text-xs">
          Want to sign-in instead?{" "}
          <a href="/login">
            <button type="button" className="text-footer-bg hover:underline">
              Sign In
            </button>
          </a>
        </p>
      </form>
    </div>
  )
}