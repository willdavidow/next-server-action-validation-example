'use server'; 

import { signUpSchema, type SignUpSchema } from "@/schemas/user-schema";

export const signUp = async (formData: SignUpSchema) => {
  // uncomment the Object.assign below to simulate a server-side error
  // after your front-end submission contained input that passed validation...

  /* Object.assign(formData, {
    firstName: "", // set firstName to ""
  }); */

  const validateSignUp = signUpSchema.safeParse(formData);

  // one way to nice-ify errors to send to front-end as json...
  if (!validateSignUp.success) {
    let errors = {};
    validateSignUp.error.issues.forEach((issue) => {
      errors = { ...errors, [issue.path[0]]: issue.message };
    });

    return { status: 400, errors };
  }

  try {
    // do some server-side stuff, and then...
    return {
      status: 200,
      data: {
        message: "success",
      },
    };
  } catch (e) {
    return {
      status: 400,
      data: {
        message:
          e?.toString() ||
          "Unable to complete signup. Please try again or contact support.",
        error: e,
      },
    };
  }

  // for google oAuth signups...
  /*
          authReq = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
              queryParams: {
                access_type: 'offline',
                prompt: 'consent',
              },
            },
          })
  */
};
