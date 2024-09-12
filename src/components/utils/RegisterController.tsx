import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionError, actions } from "astro:actions";
import { Lock } from "lucide-react";
import { useState } from "react";

export default function RegisterController({}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email, password);
    const { data, error } = await actions.auth.createUser({
      email,
      password,
      fullname,
    });

    if (error?.code === 'UNAUTHORIZED') {
      console.log("ERROR");
      console.log(error?.message);
      return
    }
    
    if (error) {
      console.log(error);
      return;
    }
    
    console.log({data});
    // navigate("/");
  };

  return (
    <div className="px-4">
      <div className=" mt-20 p-4  w-full sm:w-96 sm:mx-auto bg-listing-header-color shadow">
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-center">Sign Up</h2>
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
            <Label htmlFor="fullname">Fullname</Label>
            <Input
              id="fullname"
              type="text"
              placeholder="Enter your fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
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
                className="h-4 w-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
          <p className="text-center text-xs">
            Already have an account?{" "}
            <a href="/login">
              <button type="button" className="text-footer-bg hover:underline">
                Sign In
              </button>
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
