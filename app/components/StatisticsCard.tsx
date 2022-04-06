import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

type AppType = {
  title: string;
  subtitle: string;
  amount: number;
};
export function StatisticsCard({ title, subtitle, amount }: AppType) {
  return (
    <Card
      elevation={8}
      sx={{
        minWidth: 240,
        backgroundImage: "linear-gradient(to right, #ec77ab 0%, #7873f5 100%)",
      }}
    >
      <CardContent>
        <Typography
          sx={{
            fontSize: 17,
            color: "white",
          }}
          gutterBottom
        >
          {title}
        </Typography>
        <Divider sx={{ backgroundColor: "white", mb: 2 }} />
        <Typography
          gutterBottom
          variant="h6"
          sx={{
            fontSize: 17,
            color: "white",
          }}
        >
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mb: 1.5,
            fontWeight: "bold",
            color: "white",
          }}
          color="text.secondary"
        >
          {`${amount} GH`}
        </Typography>
      </CardContent>
    </Card>
  );
}
