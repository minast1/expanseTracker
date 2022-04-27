import React from "react";
import CssBaseline from "@mui/material/CssBaseline";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Layout from "~/src/Layout";
import { ValidatedForm } from "remix-validated-form";
import Alert from "@mui/material/Alert";
import { Link, useLoaderData } from "@remix-run/react";
import { registerValidatior } from "~/lib/validatorSchema";
import { FormInputText } from "~/components/FormInputText";
import FormHelperText from "@mui/material/FormHelperText";
import SubmitButton from "~/components/SubmitButton";
import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { authenticator } from "~/lib/auth.server";
import { commitSession, getSession } from "~/lib/session.server";

export default function Register() {
  const { error } = useLoaderData();

  //const isSubmitting = useIsSubmitting("signUp");
  return (
    <Layout>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
          elevation={0}
          square
        >
          {error && <Alert severity="error">{error.message}</Alert>}
          <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
            REGISTER
          </Typography>
          <Typography variant="caption" color="darkgray">
            Welome! Please fill in the required details to register
          </Typography>
          <ValidatedForm
            style={{ width: "100%", marginTop: 15 }}
            validator={registerValidatior}
            //resetAfterSubmit={true}
            defaultValues={{}}
            method="post"
            id="register"
          >
            <FormInputText name="name" label="User Name" sx={{ mb: 3 }} />
            <FormInputText name="email" label="Email" sx={{ mt: 2 }} />
            {error && (
              <FormHelperText sx={{ color: "red" }}>
                {error.message}
              </FormHelperText>
            )}
            <FormInputText
              name="password"
              label="Password"
              type="password"
              sx={{ mt: 2 }}
            />
            <FormInputText
              name="confirm"
              label="Password Confirmation"
              type="password"
              sx={{ mt: 2, mb: 2 }}
            />
            <FormInputText
              name="mobile"
              label="Contact Number"
              sx={{ mt: 2 }}
            />

            <SubmitButton title="Register" formId="register" />
            <Grid container>
              <Grid item sx={{ px: 4 }}>
                <Link to="/" style={{ color: "blue", fontSize: 13 }}>
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </ValidatedForm>
        </Paper>
      </Container>
    </Layout>
  );
}

export const action: ActionFunction = async ({ request, context }) => {
  await authenticator.authenticate("admin", request, {
    successRedirect: "/dashboard/",
    failureRedirect: "/register",
  });
};

export let loader: LoaderFunction = async ({ request }) => {
  let session = await getSession(request.headers.get("cookie"));
  let error = session.get(authenticator.sessionErrorKey);
  return json(
    { error },
    {
      headers: {
        // only necessary with cookieSessionStorage
        "Set-Cookie": await commitSession(session),
      },
    }
  );
};
