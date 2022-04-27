import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { criminalById } from "~/controllers/criminalController";
import { format } from "date-fns";

export default function BasicInfoTable({ info }: { info: criminalById }) {
  return (
    <TableContainer component={Paper} sx={{ border: "1px solid lightgray" }}>
      <Table sx={{ minWidth: 400 }} aria-label="simple table">
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography
                variant="body1"
                sx={{ fontFamily: "monospace", fontWeight: 900 }}
              >
                {" "}
                CRIMINAL ID
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "monospace",
                  color: "black",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                {" "}
                {info?.id}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                {" "}
                NAME
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  color: "black",
                }}
              >
                {" "}
                {info?.name}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                {" "}
                Date of Birth
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  color: "black",
                }}
              >
                {info && format(new Date(info?.dob), "PP")}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                {" "}
                phone number
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  color: "black",
                }}
              >
                {info?.phone}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                {" "}
                Weight
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  color: "black",
                }}
              >
                {`${info?.weight} Kg`}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                {" "}
                Height
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  color: "black",
                }}
              >
                {`${info?.height} CM`}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                {" "}
                Email
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  color: "black",
                }}
              >
                {info?.email}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
