import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { registerSchema } from "@/lib/schema";
import { ActionError, actions } from "astro:actions";
import { navigate } from "astro:transitions/client";
import { Loader2, Lock } from "lucide-react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {  useForm } from "react-hook-form";
import { z } from "zod";

type RegisterSchemaType = z.infer<typeof registerSchema>;

export default function RegisterController({}) {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({ resolver: zodResolver(registerSchema) });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (input: RegisterSchemaType) => {
    setIsLoading(true);
    const { data, error } = await actions.auth.createUser({
      email: input.email,
      password: input.password,
      fullname: input.fullname,
    });

    if (error?.code === "UNAUTHORIZED") {
      console.log(error?.message);
      toast({
        title: "Uh oh! Something went wrong.",
        description: `${error?.message}`,
      });
      setIsLoading(false);
      return;
    }

    if (error) {
      console.log(error);
      toast({
        title: "Uh oh! Something went wrong.",
        description: `Try again later!`,
      });
      setIsLoading(false);
      return;
    }

    console.log(data);
    toast({
      title: "🎉 Welcome to Crest Properties.",
      description: `Your account has been successfully created. We're excited to have you onboard!`,
    });

    setIsLoading(false);
    navigate("/");
  };

  return (
    <div className="px-4">
      <div className=" mt-20 p-4  w-full sm:w-96 sm:mx-auto bg-listing-header-color shadow">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4"
        >
          <h2 className="text-xl font-bold text-center">Join Us Today!</h2>
          <p className="font-medium text-xs text-center">
            Create an account to get started with exploring, listing, and
            managing properties. It only takes a few minutes!
          </p>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email && (
              <Label className="text-xs text-red-500">
                {errors.email?.message}
              </Label>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="fullname">Fullname</Label>
            <Input
              id="fullname"
              type="text"
              placeholder="Enter your fullname"
              {...register("fullname")}
            />
            {errors.fullname && (
              <Label className="text-xs text-red-500">
                {errors.fullname?.message}
              </Label>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password")}
                className=""
              />
              <Lock
                className="h-4 w-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
              {errors.password && (
                <Label className="text-xs text-red-500">
                  {errors.password?.message}
                </Label>
              )}
            </div>
          </div>
          <Button
            type="submit"
            className="w-full flex items-center justify-center"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Sign Up"}
          </Button>

          <div className="text-center mt-2">
            <h5 className="font-bold text-xs">Already have an account?</h5>
            <p className="text-xs">
              <a href="/login" className="text-footer-bg hover:underline">
                Log in here{" "}
              </a>
              to access your dashboard.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
