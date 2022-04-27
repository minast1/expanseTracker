import { z } from 'zod';
import { withZod } from "@remix-validated-form/with-zod";


export const loginValidator = withZod(
  z.object({
    email: z.string().nonempty("* This field is required").email({ message: "Please enter a valid email address" }),
    password: z.string().nonempty(" * This field is required")
  })
)

export const registerValidatior = withZod(
  z.object({
    name: z.string().nonempty("* This field is required"),
    email: z.string().nonempty("* This field is required").email({ message: "Please enter a valid email address" }),
    password: z.string().nonempty(" * This field is required"),
    confirm: z.string().nonempty("Please confirm the password"),
     mobile: z.string().nonempty("* This field is required")
  }).refine((data) => data.password === data.confirm, {
    message: "Passwords don't match", 
    path: ["confirm"]
  })
)
 const courts = ["HIGH_COURT", "SUPREME_COURT", "NOTASSIGNED"] as const
export const criminalValidator = withZod(
  z.object({
    name: z.string().nonempty("* Criminal Name is required"),
    email: z.string().nonempty("* Criminal Email is required").email({ message: "Please enter a valid email address" }),
    phone: z.string().nonempty("* Criminal PhoneNumber is required"),
    weight: z.string().nonempty("* Criminal Weight is required"),
    height: z.string().nonempty("* Criminal Height is required"),
    policeId: z.string().min(1, "* Please assign a person to the case"),
    crimes: z.union([z.array(z.string()).nonempty(), z.string().nonempty(' * Please select at least one crime')]), //z.string().min(1, ),
    dob: z.string().optional(),
    statement: z.string().optional(),
    court: z.enum(courts)
     
  }));

  export const policeValidator = withZod(
    z.object({
      name: z.string().nonempty("* This field is required"),
      email: z.string().nonempty("* This field is required").email({ message: "Please enter a valid email address" }),
      phone: z.string().nonempty("* This field is required"),
      badge_number: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
        message: "This field is required "
      })
    }))
