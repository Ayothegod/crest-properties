import { z } from "zod";

export const filterSchema = z.object({
  format: z.string({ required_error: "Please select a format." }).optional(),
  search: z
    .string({ required_error: "Please select an email to display." })
    .optional(),
  propertyType: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  propertyFilters: z.string().optional(),
  popoverItems: z.array(z.string()).optional(),
});
