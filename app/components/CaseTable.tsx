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

export default function CaseInfoTable({ info }: { info: criminalById }) {
  return (
    <TableContainer component={Paper} sx={{ border: "1px solid lightgray" }}>
      <Table
        sx={{ border: "1px solid black" }}
        aria-label="simple table"
        size="small"
      >
        <TableBody>
          <TableRow>
            <TableCell sx={{ border: "1px solid gray" }}>
              <Typography
                variant="body2"
                sx={{ fontFamily: "monospace", fontWeight: 900 }}
              >
                {" "}
                Criminal Processing Date
              </Typography>
            </TableCell>
            <TableCell sx={{ border: "1px solid gray" }}>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                {info && format(new Date(info?.dob), "PP")}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              sx={{ border: "1px solid gray" }}
              component="th"
              scope="row"
            >
              <Typography
                variant="body2"
                sx={{ fontFamily: "monospace", fontWeight: 900 }}
              >
                {" "}
                Criminal Case Handler
              </Typography>
            </TableCell>
            <TableCell sx={{ border: "1px solid gray" }}>
              <Typography
                variant="body2"
                sx={{ fontFamily: "monospace", fontWeight: 900 }}
              >
                {`Inspector ${info?.handler?.name}`}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ border: "1px solid gray" }}>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }}
              >
                {" "}
                Designated Court
              </Typography>
            </TableCell>
            <TableCell sx={{ border: "1px solid gray" }}>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }}
              >
                {info && info.court}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            {" "}
            {/** Loop over the crimes here */}
            <TableCell colSpan={2} sx={{ border: "1px solid gray" }}>
              <Typography
                variant="body2"
                color="error"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: "bold",

                  //textTransform: "capitalize",
                }}
              >
                {" "}
                CRIMINAL CONVICTED CRIME/CRIMES
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ border: "1px solid gray" }}>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: "bold",

                  //textTransform: "capitalize",
                }}
              >
                {" "}
                OFFENCE CODE
              </Typography>
            </TableCell>
            <TableCell sx={{ border: "1px solid gray" }}>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: "bold",

                  //textTransform: "capitalize",
                }}
              >
                {" "}
                CHARGE AND DESCRIPTION
              </Typography>
            </TableCell>
          </TableRow>
          {
            /**Loop over the crimes here */

            info &&
              info.crimes.map((el) => (
                <TableRow sx={{ border: "1px solid gray" }} key={el.id}>
                  <TableCell sx={{ border: "1px solid gray" }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "monospace",
                        fontWeight: "bold",
                        textTransform: "capitalize",
                      }}
                    >
                      {`${Math.floor(Math.random() * 10 + 1)}-${Math.floor(
                        Math.random() * 900 + 400
                      )}`}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ border: "1px solid gray" }}>
                    {" "}
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "monospace",
                        fontWeight: "bold",
                        textTransform: "capitalize",
                      }}
                    >
                      {el.description}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
