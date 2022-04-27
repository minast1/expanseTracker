import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import {
  deleteCriminalRecord,
  getAllCriminals,
} from "~/controllers/criminalController";
import CriminalsTable from "~/components/CriminalsTable";
import { Link } from "@remix-run/react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
//import Typography from "@mui/material/Typography";

const IndexPage = () => {
  return (
    <Card sx={{ mb: 10, mt: 3 }} elevation={12}>
      <Box display="flex" alignItems="center" ml={2} mt={2}>
        <Avatar src="/logo.png" alt="" sx={{ width: 100, height: 100 }} />
        <Box flexGrow={1} />
        <Link
          to="/dashboard/create"
          prefetch="intent"
          style={{ alignSelf: "flex-end", marginBottom: 10 }}
        >
          <Button
            //href="/dashboard/create"
            variant="contained"
            size="small"
            sx={{ textTransform: "capitalize", mr: 2 }}
          >
            Add New Criminal
          </Button>
        </Link>
      </Box>

      <CardContent sx={{ borderTop: "1px solid lightgray" }}>
        <CriminalsTable />
      </CardContent>
      <CardActions disableSpacing></CardActions>
    </Card>
  );
};

export default IndexPage;

export let loader: LoaderFunction = async ({ request }) => {
  // const auth_session = await getSession(request.headers.get("cookie"));
  return await getAllCriminals();
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get("button") as string;

  return await deleteCriminalRecord(id);
};
