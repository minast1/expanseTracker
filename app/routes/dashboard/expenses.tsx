import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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

      <CardContent sx={{ borderTop: "1px solid lightgray" }}></CardContent>
      <CardActions disableSpacing></CardActions>
    </Card>
  );
};

export default Expenses;
