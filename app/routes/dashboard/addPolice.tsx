import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
//import theme from "~/src/theme";
import { FormInputText } from "~/components/FormInputText";
import SubmitButton from "~/components/SubmitButton";
import { ValidatedForm } from "remix-validated-form";
import { policeValidator } from "~/lib/validatorSchema";
import { ActionFunction } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import toast, { Toaster } from "react-hot-toast";
import { ToastAlert } from "~/components/ToastAlert";
import Avatar from "@mui/material/Avatar";
import { FormInputNumber } from "~/components/FormInputNumber";
import Container from "@mui/material/Container";
import { createPolice } from "~/controllers/policeController";

const CreatePolicePage = () => {
  const hasSubmitted = useActionData();

  React.useEffect(() => {
    hasSubmitted &&
      !hasSubmitted?.fieldErrors &&
      toast.custom(
        <ToastAlert severity="success">
          New Police Added Successfully
        </ToastAlert>,
        {
          position: "top-right",
        }
      );
  }, [hasSubmitted]);
  return (
    <Card sx={{ mb: 10, mt: 3 }} elevation={12}>
      <Box display="flex" alignItems="center" ml={2} mt={2}>
        <Avatar src="/logo.png" alt="" sx={{ width: 100, height: 100 }} />
      </Box>

      <CardContent sx={{ borderTop: "1px solid lightgray" }}>
        <Container maxWidth="sm" sx={{ p: 3 }}>
          <ValidatedForm
            method="post"
            style={{ display: "flex", flexDirection: "column" }}
            resetAfterSubmit
            id="police"
            validator={policeValidator}
          >
            {" "}
            <FormInputText name="name" label="Police Name" sx={{ mb: 2 }} />
            <FormInputText name="email" label="Email" sx={{ my: 2, mr: 2 }} />
            <FormInputText name="phone" label="Phone Number" sx={{ my: 2 }} />
            <FormInputNumber
              name="badge_number"
              label="Badge Number"
              sx={{ my: 2 }}
            />
            <SubmitButton title="Add Police" formId="police" />
          </ValidatedForm>
        </Container>
      </CardContent>
      <Toaster containerStyle={{ marginTop: 5 }} />
    </Card>
  );
};

export default CreatePolicePage;

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const badge_number = parseInt(formData.get("badge_number") as string);
  const data = { name, email, phone, badge_number };

  return await createPolice(data);
};
