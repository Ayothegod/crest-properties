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

