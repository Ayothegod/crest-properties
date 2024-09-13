import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Lock } from "lucide-react";
import { actions } from "astro:actions";
import { useToast } from "@/hooks/use-toast";
import { navigate } from "astro:transitions/client";

export default function VerifyOtpController({}) {
  const { toast } = useToast();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { data, error } = await actions.auth.verifyOtp({
      otp,
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
    navigate("/auth/reset-password");
  };

  return (
    <div className=" mt-20 p-4 w-full sm:w-96 sm:mx-auto  bg-listing-header-color shadow">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
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
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
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
