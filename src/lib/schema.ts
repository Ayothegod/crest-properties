import { z } from "zod";

export const filterSchema = z.object({
  search: z
  .string({ required_error: "Please select an email to display." }),
  format: z.string({ required_error: "Please select a format." }).optional(),
  propertyType: z.string(),
  minPrice: z.coerce.number(),
  maxPrice: z.coerce.number(),
  propertyFilters: z.string(),
  popoverItems: z.array(z.string()),
});

export const registerSchema = z.object({
  fullname: z.string().min(1, { message: "Full Name is required" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be up to 6 characters" }),
});

export const loginUserSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Name is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be up to 6 characters" }),
});