import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { popoverItems } from "@/lib/data";
import { filterSchema } from "@/lib/schema";
import { useToast } from "@/hooks/use-toast";
import React from "react";

type filterSchemaInfered = z.infer<typeof filterSchema>;

export default function FilterController({ pathname }: { pathname: string }) {
  const { toast } = useToast();
  const form = useForm<filterSchemaInfered>({
    resolver: zodResolver(filterSchema),
  });

  const onSubmit = (data: filterSchemaInfered) => {
    console.log("Hello onsubmit");
  };

  const escapeUrls =
    pathname !== "/" &&
    pathname !== "/register" &&
    pathname !== "/login" &&
    pathname !== "/forgot-password" &&
    pathname !== "/auth/verify-otp" &&
    pathname !== "/auth/reset-password";

  return (
    <>
      {escapeUrls && (
        <div className={`py-2 bg-listing-header-color`}>
          <div className="bodySize px-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="hidden md:flex flex-wrap items-center justify-evenly gap-4"
              >
                <FormField
                  control={form.control}
                  name="search"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Search location or area"
                          {...field}
                          className="rounded-full w-max"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="rounded-full">
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
      )}
    </>
  );
}
