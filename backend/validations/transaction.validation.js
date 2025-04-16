import { z } from "zod";

const AddTransactionSchema = z.object({
  type: z
    .string({ required_error: "Type is required." })
    .refine((val) => val === "income" || val === "expense", {
      message: "Please select a valid type.",
    }),

  amount: z
    .number({ required_error: "Amount is required." })
    .min(1, "Amount must be atleast 100 rupees."),

  category: z.string({ required_error: "Category is required." }).optional(),

  date: z.preprocess(
    (val) =>
      typeof val === "string" || val instanceof Date ? new Date(val) : val,
    z.date().max(new Date(), "Date cannot be in the future.")
  ),

  description: z
    .string({ required_error: "Description is required." })
    .optional(),
});

const UpdateTransactionSchema = z.object({
  type: z
    .string({ required_error: "Type is required." })
    .refine((val) => val === "income" || val === "expense", {
      message: "Please select a valid type.",
    })
    .optional(),

  amount: z
    .number({ required_error: "Amount is required." })
    .min(1, "Amount must be atleast 100 rupees.")
    .optional(),

  category: z.string({ required_error: "Category is required." }).optional(),

  date: z
    .preprocess(
      (val) =>
        typeof val === "string" || val instanceof Date ? new Date(val) : val,
      z.date().max(new Date(), "Date cannot be in the future.")
    )
    .optional(),

  description: z
    .string({ required_error: "Description is required." })
    .optional(),
});

export default { AddTransactionSchema, UpdateTransactionSchema };
