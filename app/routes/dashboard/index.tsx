import Grid from "@mui/material/Grid";
import React from "react";
import { StatisticsCard } from "~/components/StatisticsCard";
import Paper from "@mui/material/Paper";
import Chart from "~/components/Chart";

const IndexPage = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3} lg={3}>
          <StatisticsCard
            title="MY REVENUE"
            subtitle="Current Balance"
            amount={5000.0}
          />
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
          <StatisticsCard
            title="THIS WEEK"
            subtitle="Total Amount"
            amount={2000}
          />
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
          <StatisticsCard
            title="THIS MONTH"
            subtitle="Total Amount"
            amount={3000}
          />
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
          <StatisticsCard
            title="LAST MONTH"
            subtitle="Toal Amount"
            amount={0}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ mt: 5 }}>
        {/* Chart */}
        <Grid item xs={12} md={12} lg={12}>
          <Paper
            elevation={8}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <Chart />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default IndexPage;
