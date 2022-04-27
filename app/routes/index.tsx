import React from "react";
import CssBaseline from "@mui/material/CssBaseline";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import Layout from "~/src/Layout";
import { ValidatedForm } from "remix-validated-form";
import { FormInputText } from "~/components/FormInputText";
import { loginValidator } from "~/lib/validatorSchema";
import SubmitButton from "~/components/SubmitButton";
import { Link, useLoaderData } from "@remix-run/react";
import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { authenticator } from "~/lib/auth.server";
import { commitSession, getSession } from "~/lib/session.server";

export default function Login() {
  const { error } = useLoaderData();
  return (
    <Layout>
      <Container component="main" maxWidth="xs" sx={{ pt: 5 }}>
        <CssBaseline />
        <Paper
          sx={{ display: "flex", flexDirection: "column" }}
          elevation={0}
          square
        >
          <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
            Log In
          </Typography>
          <Typography variant="caption" color="gray" gutterBottom={true}>
            Welome back! Please login to continue
          </Typography>
          {error && <Alert severity="error">{error.message}</Alert>}
          <ValidatedForm
            validator={loginValidator}
            id="signIn"
            style={{ marginTop: 15 }}
            method="post"
          >
            <FormInputText name="email" label="Email" sx={{ mb: 3 }} />
            <FormInputText name="password" label="Password" />
            <SubmitButton formId="signIn" title="SignIn" />
          </ValidatedForm>
          <Grid container>
            <Grid item sx={{ px: 5 }}>
              <Link style={{ color: "blue", fontSize: 13 }} to="/register">
                {"Don't have an account ? Register"}
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Layout>
  );
}

export const action: ActionFunction = async ({ request, context }) => {
  return await authenticator.authenticate("admin", request, {
    successRedirect: "/dashboard/",
    failureRedirect: "/",
  });

  //return student
};

// in the loader of the login route
export let loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/dashboard",
  });

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
