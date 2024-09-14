import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { verifyOtpSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { actions } from "astro:actions";
import { navigate } from "astro:transitions/client";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type VerifyOtpSchemaType = z.infer<typeof verifyOtpSchema>;

export default function VerifyOtpController({}) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyOtpSchemaType>({ resolver: zodResolver(verifyOtpSchema) });

  const onSubmit = async (input: VerifyOtpSchemaType) => {
    setIsLoading(true);
    const { data, error } = await actions.auth.verifyOtp({
      otp: input.otp,
    });

    if (error?.code === "FORBIDDEN") {
      console.log(error?.message);
      toast({
        title: "⚠️ OTP Error.",
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
      title: "✅ OTP Success",
      description: `OTP verified successfully! You can now proceed.`,
    });

    setIsLoading(false);
    localStorage.setItem("token", data)
    navigate(`/auth/reset-password?token=${data}`);
  };

  return (
    <div className=" mt-20 p-4 w-full sm:w-96 sm:mx-auto  bg-listing-header-color shadow">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold text-center">Verify Your Account</h2>
        <p className="font-medium text-xs text-center">
          We’ve sent a One-Time Password (OTP) to your email. Enter the code
          below to verify your account.
        </p>
        <div className="space-y-2">
          <Label htmlFor="email">Enter OTP</Label>
          <Input
            id="text"
            type="text"
            placeholder="Enter the 6 digits OTP"
            {...register("otp")}
          />
          {errors.otp && (
            <Label className="text-xs text-red-500">
              {errors.otp?.message}
            </Label>
          )}
        </div>
        <Button type="submit" className="w-full">
          {isLoading ? <Loader2 className="animate-spin" /> : "Verify"}
        </Button>

        <div className="text-center mt-8">
          <h5 className="font-bold text-xs">Didn’t receive the code?</h5>
          <Button variant="link" size="sm" className="text-footer-bg ">
            Resend OTP
          </Button>
        </div>
      </form>
    </div>
  );
}
