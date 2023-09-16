import { FieldValues } from "react-hook-form";
import * as z from "zod";

export const signUpSchema = z.object({
  firstName: z.string().min(1, { message: "Please enter your first name." }),
  lastName: z.string().min(1, { message: "Please enter your last name." }),
  email: z
    .string()
    .min(1, { message: "Please enter an email address." })
    .email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Please enter a password." }),
});

export type SignUpSchema = z.infer<typeof signUpSchema> | FieldValues;
