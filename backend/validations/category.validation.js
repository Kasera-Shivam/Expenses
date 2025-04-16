import { z } from "zod";

const AddCategorySchema = z.object({
  name: z
    .string({
      required_error: "Name is required.",
      invalid_type_error: "Name must be a type string.",
    })
    .min(1, "Name is required.")
    .default("Uncategorized"),

  type: z.enum(["income", "expense"]),
});

const UpdateCategorySchema = z.object({
  name: z
    .string({
      required_error: "Name is required.",
      invalid_type_error: "Name must be a type string.",
    })
    .min(1, "Name is required.")
    .default("Uncategorized")
    .optional(),

  type: z.enum(["income", "expense"]).optional(),
});

export default { AddCategorySchema, UpdateCategorySchema };
