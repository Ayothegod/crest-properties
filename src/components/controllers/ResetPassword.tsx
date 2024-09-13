import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Lock } from "lucide-react";
import { actions } from "astro:actions";
import { useToast } from "@/hooks/use-toast";
import { navigate } from "astro:transitions/client";

export default function ResetPasswordController({}) {
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setIsLoading(true);
    // const { data, error } = await actions.auth.requestOTP({
    //   email,
    // });

    // if (error?.code === "FORBIDDEN") {
    //   console.log(error?.message);
    //   toast({
    //     title: "⚠️ Login Failed.",
    //     description: `${error?.message}`,
    //   });
    //   setIsLoading(false);
    //   return;
    // }

    // if (error) {
    //   console.log(error);
    //   toast({
    //     title: "Uh oh! Something went wrong.",
    //     description: `Try again later!`,
    //   });
    //   setIsLoading(false);
    //   return;
    // }

    // console.log(data);
    // toast({
    //   title: "✅ Login Successful",
    //   description: `Welcome back! You have successfully logged in.`,
    // });

    // setIsLoading(false);
    navigate("/login");
  };

  return (
    <div className=" mt-20 p-4 w-full sm:w-96 sm:mx-auto  bg-listing-header-color shadow">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <h2 className="text-xl font-bold text-center">Create a New Password
        </h2>
        <p className="font-medium text-xs text-center">
        You’re almost done! Enter your new password below to complete the reset process.
        </p>
        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <Input
            id="new-password"
            type="password"
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Confirm New Password</Label>
          <Input
            id="confirm-new-password"
            type="password"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full">
          {isLoading ? <Loader2 className="animate-spin" /> : "Set New Password"}
        </Button>

        <div className="text-center mt-8">
          <h5 className="font-bold text-xs">Remembered your password?</h5>
          <a href="/login" className="text-footer-bg text-xs">Log in here</a>
        </div>
      </form>
    </div>
  );
}
