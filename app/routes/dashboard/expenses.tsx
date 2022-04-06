import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SubmitButton from "~/components/SubmitButton";
import { FormInputText } from "~/components/FormInputText";
//import  FormHelperText  from "@mui/material/FormHelperText";
import theme from "~/src/theme";
import { ValidatedForm } from "remix-validated-form";
import { FormInputDropdown } from "~/components/FormInputDropdown";
import FormControl from "@mui/material/FormControl";
import { expenseValidator } from "~/lib/validatorSchema";
import { FormInputDate } from "~/components/FormInputDate";
import { FormInputNumber } from "~/components/FormInputNumber";

const categories = [
  { label: "Medical & HealthCare", value: "HEALTHCARE" },
  { label: "Miscellaneous", value: "MISCELLANEOUS" },
  { label: "Recreation & Entertainment", value: "ENTERTAINMENT" },
  { label: "Personal", value: "PERSONAL" },
  { label: "Insurance", value: "INSURANCE" },
  { label: "Utilities", value: "UTILITIES" },
  { label: "Food", value: "FOOD" },
  { label: "Transportation", value: "TRANSPORTATION" },
  { label: "Housing", value: "HOUSING" },
  { label: "Savings & Debt", value: "DEBT" },
];
const Expenses = () => {
  return (
    <Card sx={{ mb: 10, mt: 3 }} elevation={10}>
      <CardHeader
        title={
          <Box display="flex" alignItems="center">
            <Typography variant="h5" sx={{ mt: 2, mr: 1 }}>
              Add New Expense
            </Typography>
          </Box>
        }
      />

      <CardContent sx={{ borderTop: "1px solid lightgray" }}>
        <Box
          sx={{ width: "90%", mt: theme.spacing(1) }}
          method="post"
          defaultValues={{ amount: 0, category: "MISCELLANEOUS" }}
          id="expense"
          validator={expenseValidator}
          component={ValidatedForm}
        >
          <FormInputDropdown
            name="category"
            label="Category"
            options={categories}
            styles={{ mb: 3 }}
          />
          <FormInputText name="spent_on" label="Spent On" sx={{ mb: 2 }} />
          <FormInputDate name="date" label="Date" sx={{ mb: 2 }} />
          <FormInputNumber name="amount" label="Amount" />
          <FormInputText
            name="remarks"
            label="Remarks"
            sx={{ mt: 2 }}
            multiline
          />
          {/*error && (
            <FormHelperText sx={{ color: "red" }}>
              {error.message}
            </FormHelperText>
          )*/}
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        <Box sx={{ width: "30%" }} />
        <SubmitButton title="Save" formId="expense" styles={{ width: "30%" }} />
      </CardActions>
    </Card>
  );
};

export default Expenses;
