import { z } from 'zod';
import { withZod } from "@remix-validated-form/with-zod";


const categories = ["HEALTHCARE",
    "MISCELLANEOUS", "ENTERTAINMENT", "PERSONAL",
    "INSURANCE","UTILITIES","FOOD","TRANSPORTATION","HOUSING","DEBT"] as const
export const expenseValidator = withZod(
    z.object({
        spent_on: z.string({required_error : 'This field is required'}),
        remarks: z.string().optional(),
        date: z.date(),
        category: z.enum(categories),
        amount: z.string({required_error : "Amount is required"}).refine((val) => !Number.isNaN(parseInt(val, 10)))
    })
)