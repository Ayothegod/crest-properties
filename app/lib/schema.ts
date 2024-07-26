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
  popoverItems: z.array(z.string()).optional()
});

// .refine((value) => value?.some((item) => item), {
    // message: "You have to select at least one item.",
//   }),

// import { Toast } from '@shadcn/ui';
// import { useState } from 'react';

// export default function MyPage() {
//   const [showToast, setShowToast] = useState(false);

//   return (
//     <div>
//       <button onClick={() => setShowToast(true)}>Show Toast</button>
//       {showToast && (
//         <Toast onClose={() => setShowToast(false)}>
//           This is a toast message!
//         </Toast>
//       )}
//     </div>
//   );
// }

// is this correct
// const filterSchemaInfered = z.infer<typeof filterSchema>
