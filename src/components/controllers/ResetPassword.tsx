import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { resetPasswordSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { actions } from "astro:actions";
import { navigate } from "astro:transitions/client";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordController({}) {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (input: ResetPasswordSchemaType) => {
    setIsLoading(true);
    const token = localStorage.getItem('token') as string 
    const { data, error } = await actions.auth.updatePassword({
     password: input.password,
     confirmPassword: input.confirmPassword,
     token
    });

    console.log(data, error);

    if (error?.code === "NOT_FOUND") {
      console.log(error?.message);
      toast({
        title: "⚠️ Password Reset Failed.",
        description: `${error?.message}`,
      });
      setIsLoading(false);
      return;
    }

    if (error) {
      console.log(error);
      toast({
        title: "Invalid or Expired Token",
        description: `The reset token is invalid or has expired. Please request a new password reset.`,
      });
      setIsLoading(false);
      return;
    }

    localStorage.removeItem('token');
    toast({
      title: "✅ Password Reset Successfully",
      description: `Your password has been successfully reset. You can now log in with your new credentials.`,
    });

    setIsLoading(false);
    navigate("/login");
  };

  return (
    <div className=" mt-20 p-4 w-full sm:w-96 sm:mx-auto  bg-listing-header-color shadow">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold text-center">Create a New Password</h2>
        <p className="font-medium text-xs text-center">
          You’re almost done! Enter your new password below to complete the
          reset process.
        </p>
        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <Input
            id="new-password"
            type="password"
            placeholder="Enter your new password"
            {...register("password")}
          />
          {errors.password && (
            <div className="text-xs text-red-500">
              {errors.password?.message}
            </div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-new-password">Confirm New Password</Label>
          <Input
            id="confirm-new-password"
            type="password"
            placeholder="Confirm your new password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <div className="text-xs text-red-500">
              {errors.confirmPassword?.message}
            </div>
          )}
        </div>

        <Button type="submit" className="w-full">
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Set New Password"
          )}
        </Button>

        <div className="text-center mt-8">
          <h5 className="font-bold text-xs">Remembered your password?</h5>
          <a href="/login" className="text-footer-bg text-xs">
            Log in here
          </a>
        </div>
      </form>
    </div>
  );
}
