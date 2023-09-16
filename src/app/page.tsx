"use client";

import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpSchema } from "@/schemas/user-schema";
import { signUp } from "@/server-actions/user-actions";

export default function Home() {
  const { register, handleSubmit } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    mode: "all",
  });

  type ServerActionResponse =
    | {
        status: 200;
        data?: unknown; // you can create a type here for whatever data shape you return...
      }
    | {
        status: 400;
        errors: FieldValues;
      };

  const onSubmit = async (data: SignUpSchema) => {
    const formRequest = (await signUp(data)) as ServerActionResponse;

    if (formRequest.status === 400) {
      console.log("back-end error messaging", formRequest.errors);
      return;
    }

    if (formRequest.status === 200) {
      console.log("success after back-end stuff..", formRequest.data);
    }
  };

  return (
    <>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(
          // successful submit stuff..
          (data) => {
            onSubmit(data);
          },
          // front-end error-y stuff
          (errors) => {
            console.log("front-end errors ", errors);
          },
        )}
        noValidate={true}
      >
        <div className="block">
          <input
            {...register("firstName")}
            className="w-full"
            type="text"
            autoComplete="given-name"
            placeholder="First Name"
          />
        </div>
        <div className="block">
          <input
            {...register("lastName")}
            className="w-full"
            type="text"
            autoComplete="family-name"
            placeholder="Last Name"
          />
        </div>
        <div className="block">
          <input
            {...register("email")}
            className="w-full"
            type="email"
            autoComplete="email"
            placeholder="email"
          />
        </div>
        <div className="block">
          <input
            {...register("password")}
            className="w-full"
            type="password"
            autoComplete="none"
            placeholder="Password"
          />
        </div>
        <div className="block">
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </>
  );
}
