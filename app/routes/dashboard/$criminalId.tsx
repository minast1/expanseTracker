import React from "react";
//import { useParams } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/node";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";
import {
  criminalById,
  getCriminalById,
} from "~/controllers/criminalController";
import Divider from "@mui/material/Divider";
import BasicInfoTable from "~/components/BasicInfoTable";
import CaseInfoTable from "~/components/CaseTable";
import { useLoaderData } from "@remix-run/react";
import { format } from "date-fns";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";

export const loader: LoaderFunction = async ({ params }) => {
  const id = params.criminalId;

  return await getCriminalById(id as string);
};

const ProfilePage = () => {
  const data = useLoaderData<criminalById>();

  //console.log(data);
  return (
    <Card sx={{ mb: 10, mt: 3, backgroundColor: "white" }} elevation={12}>
      <Box display="flex" alignItems="center" ml={2} mt={2}>
        <Avatar src="/logo.png" alt="" sx={{ width: 100, height: 100 }} />
        <Box display="flex" flexDirection="column" flexGrow={1}>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", fontFamily: "monospace" }}
          >
            CRIMINAL RECORD REPORT
          </Typography>
          <Typography sx={{ ml: 1 }}> 04394934333</Typography>
        </Box>
      </Box>

      <CardContent sx={{ borderTop: "1px solid lightgray" }}>
        <Grid container spacing={5}>
          <Grid item container direction="column" md={5}>
            <Typography
              sx={{ fontFamily: "monospace", fontWeight: "bold" }}
              color="error"
              gutterBottom
            >
              {" "}
              CLASSIFIED
            </Typography>
            <Typography sx={{ fontWeight: "bold" }}>TARGET PROFILE</Typography>
            <Divider sx={{ backgroundColor: "black", borderWidth: 2 }} />
            <img
              style={{
                width: 400,
                height: 403,
                objectFit: "cover",
                marginTop: 15,
              }}
              alt=""
              src={data?.image ? data.image : "/criminal.jpg"}
            />
          </Grid>
          <Grid item md={7} container direction="column">
            <Typography
              sx={{ fontWeight: "bold", fontFamily: "monospace", mb: 3.5 }}
              gutterBottom
            >
              PROCESSING DATE : {data && format(new Date(data.createdAt), "T")}
            </Typography>
            <Divider sx={{ backgroundColor: "black", borderWidth: 2, mb: 2 }} />
            <BasicInfoTable info={data} />
          </Grid>
        </Grid>
        <Grid container sx={{ mt: 2 }} spacing={5}>
          <Grid item md={6}>
            <Typography sx={{ fontWeight: "bold" }}>
              ARREST & SENTENCING INFO
            </Typography>
            <Divider sx={{ backgroundColor: "black", borderWidth: 2, mb: 2 }} />
            <CaseInfoTable info={data} />
          </Grid>
          <Grid item md={6}>
            <Typography sx={{ fontWeight: "bold" }}>OTHER INFO</Typography>
            <Divider sx={{ backgroundColor: "black", borderWidth: 2, mb: 2 }} />
            <Typography>
              {data && data?.statement ? data.statement : "Not Applicable "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing></CardActions>
    </Card>
  );
};

export default ProfilePage;
