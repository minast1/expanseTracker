import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import theme from "~/src/theme";
import { FormInputText } from "~/components/FormInputText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import SubmitButton from "~/components/SubmitButton";
import { ValidatedForm } from "remix-validated-form";
import { FormInputDate } from "~/components/FormInputDate";
import { criminalValidator } from "~/lib/validatorSchema";
import TextField from "@mui/material/TextField";
import {
  CrimesAndHandlers,
  getAllCrimesAndHandlers,
} from "~/controllers/crimeController";
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Link, useActionData, useLoaderData } from "@remix-run/react";
import MenuItem from "@mui/material/MenuItem";
import { Court } from "@prisma/client";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CriminalMultiSelect from "~/components/CriminalMultiSelect";
import { criminalImage } from "~/lib/imageUpload.server";
import toast, { Toaster } from "react-hot-toast";
import { ToastAlert } from "~/components/ToastAlert";
import Avatar from "@mui/material/Avatar";

const courts: Court[] = ["SUPREME_COURT", "HIGH_COURT", "NOTASSIGNED"];

const CreatePage = () => {
  const data = useLoaderData<CrimesAndHandlers>();
  const hasSubmitted = useActionData();

  React.useEffect(() => {
    hasSubmitted &&
      !hasSubmitted?.fieldErrors &&
      toast.custom(
        <ToastAlert severity="success">
          New Criminal Added Successfully
        </ToastAlert>,
        {
          position: "bottom-right",
        }
      );
  }, [hasSubmitted]);
  return (
    <Card sx={{ mb: 10, mt: 3 }} elevation={12}>
      <Box display="flex" alignItems="center" ml={2} mt={2}>
        <Avatar src="/logo.png" alt="" sx={{ width: 100, height: 100 }} />
        <Box flexGrow={1} />
        <Link
          to="/dashboard/"
          prefetch="intent"
          style={{ alignSelf: "flex-end", marginBottom: 10 }}
        >
          <Button
            //href="/dashboard/create"
            variant="contained"
            size="small"
            sx={{ textTransform: "capitalize", mr: 2 }}
          >
            Back to Main Area
          </Button>
        </Link>
      </Box>

      <CardContent sx={{ borderTop: "1px solid lightgray" }}>
        <Box
          sx={{
            width: "100%",
            mt: theme.spacing(1),

            flexDirection: "column",
          }}
          method="post"
          resetAfterSubmit
          id="criminal"
          encType="multipart/form-data"
          validator={criminalValidator}
          component={ValidatedForm}
        >
          <FormInputText
            name="name"
            label="User Name"
            sx={{ width: "50%", mb: 2 }}
          />
          <FormInputText
            name="weight"
            label="Weight(Kg)"
            sx={{ width: "20%", ml: 2 }}
          />
          <FormInputText
            name="height"
            label="Height(Metres)"
            sx={{ width: "20%", ml: 2 }}
          />
          <FormInputText
            name="email"
            label="Email"
            sx={{ my: 2, mr: 2, width: "50%" }}
          />

          <FormInputText
            name="phone"
            label="Phone Number"
            sx={{ my: 2, width: "40%" }}
          />
          <FormInputDate
            name="dob"
            label="Date of Birth"
            sx={{ my: 2, mr: 2, width: "50%" }}
          />
          <TextField
            name="image"
            label="Add Criminal Image"
            size="small"
            InputLabelProps={{ shrink: true }}
            type="file"
            sx={{ width: "40%", mb: 3, mt: 2 }}
          />
          <Typography
            variant="body1"
            sx={{ color: "black", fontWeight: "bold" }}
          >
            Assign a Case Handler
          </Typography>
          <Divider />
          <FormControl sx={{ mt: 2, flexGrow: 1, width: "60%" }}>
            <FormInputText
              select
              name="policeId"
              defaultValue=""
              sx={{ mb: 2 }}
              label="Select from the Police list"
            >
              {data.handlers.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </FormInputText>
            <FormInputText
              name="statement"
              multiline
              label="Add Criminal Statement"
              sx={{ my: 2, width: "100%" }}
            />
          </FormControl>
          <Typography
            variant="body1"
            sx={{ color: "black", fontWeight: "bold" }}
          >
            Add Crime/Crimes to the Case
          </Typography>
          <Divider />
          <Alert severity="info" sx={{ mt: 2 }}>
            <AlertTitle>
              Select a crime or multiple crimes affiliated to the case
            </AlertTitle>
          </Alert>
          <CriminalMultiSelect
            name="crimes"
            options={data.crimes}
            label="Select from the list"
          />
          <Typography
            variant="body1"
            sx={{ color: "black", fontWeight: "bold" }}
          >
            Allocate Court to the Case
          </Typography>
          <Divider />
          <FormInputText
            select
            name="court"
            defaultValue={"NOTASSIGNED" as Court}
            sx={{ mb: 2, mt: 3, width: "50%" }}
            label="Select from the list of courts"
          >
            {Array.from(courts, (el, index) => (
              <MenuItem key={index} value={el}>
                {el}
              </MenuItem>
            ))}
          </FormInputText>
          <SubmitButton title="Add Criminal" formId="criminal" />
        </Box>
      </CardContent>
      <Toaster containerStyle={{ marginTop: 5 }} />
    </Card>
  );
};

export default CreatePage;

export let loader: LoaderFunction = async ({ request }) => {
  // const auth_session = await getSession(request.headers.get("cookie"));

  const data = await getAllCrimesAndHandlers();

  return data;
};

export const action: ActionFunction = async ({ request }) => {
  const data = await criminalImage(request);
  return data;
};
