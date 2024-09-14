import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Lock } from "lucide-react";
import { actions } from "astro:actions";
import { useToast } from "@/hooks/use-toast";
import { navigate } from "astro:transitions/client";
import { forgotPasswordSchema } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordController({}) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (input: ForgotPasswordSchemaType) => {
    setIsLoading(true);
    const { data, error } = await actions.auth.requestOTP({
      email: input.email,
    });

    toast({
      description: `If an account with this email exists, you will receive an OTP shortly.`,
    });

    if (error?.code === "TOO_MANY_REQUESTS") {
      console.log(error?.message);
      toast({
        title: "OTP Request Cooldown",
        description: `It looks like you've recently requested an OTP. Please wait a few more minutes before requesting another one.`,
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
      description: `OTP code sent successfully.`,
    });

    setIsLoading(false);
    navigate("/auth/verify-otp");
  };

  return (
    <div className=" mt-20 p-4 w-full sm:w-96 sm:mx-auto  bg-listing-header-color shadow">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold text-center">Forgot Password</h2>
        <p className="font-medium text-xs text-center">
          Enter the email address associated with your account, and we’ll send
          you a One-Time Password (OTP) to reset your password.
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
        <Button type="submit" className="w-full">
          {isLoading ? <Loader2 className="animate-spin" /> : "Request OTP"}
        </Button>

        <div className="text-center mt-8">
          <h5 className="font-bold text-xs">Didn’t receive the email?</h5>
          <p className="text-xs">
            Check your spam folder or try again after a few minutes. Still
            having trouble?{" "}
            <a
              href="mailto:crestproperties@coldmetal.com"
              className="text-footer-bg hover:underline"
            >
              Contact support.
            </a>
          </p>
        </div>

        <div className="text-center">
          <h5 className="font-bold text-xs">Remembered your password?</h5>
          <p className="text-xs">
            <a href="/login" className="text-footer-bg hover:underline">
              Log in here.
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
