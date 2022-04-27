import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useLoaderData } from "@remix-run/react";
import { policeWithCaseType } from "~/controllers/policeController";
import { Criminal, Police } from "@prisma/client";
import Chip from "@mui/material/Chip";
import TablePagination from "@mui/material/TablePagination";
import TableFooter from "@mui/material/TableFooter";

type rowType = {
  row: Police & {
    case: Criminal | null;
  };
};

const statusArray: string[] = ["CLOSED", "ACTIVE"];
let status = statusArray[Math.floor(Math.random() * statusArray.length)];
function Row({ row }: rowType) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" colSpan={1} sx={{ fontSize: 16 }}>
          {`GH${row.id.substring(9, 13)}`}
        </TableCell>
        <TableCell
          align="right"
          sx={{ fontSize: 16 }}
        >{`Inspector ${row.name}`}</TableCell>
        <TableCell align="right" sx={{ fontSize: 16 }}>
          {row.badge_number}
        </TableCell>
        <TableCell align="right" sx={{ fontSize: 16 }}>
          {row.case ? row.case.id : "NOT ASSIGNED"}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold" }}
                gutterBottom
                component="div"
              >
                CASE DETAILS
              </Typography>
              {row.case && (
                <Box display="flex" flexGrow={1}>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell>CASE ID</TableCell>
                        <TableCell>CRIMINAL NAME</TableCell>
                        <TableCell align="right">CRIMINAL EMAIL</TableCell>
                        <TableCell align="right">CASE STATUS</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          {row.case.id}
                        </TableCell>
                        <TableCell sx={{ textTransform: "capitalize" }}>
                          {row.case.name}
                        </TableCell>
                        <TableCell align="right">{row.case.email}</TableCell>
                        <TableCell align="right">
                          <Chip
                            label={status}
                            size="small"
                            color={status === "CLOSED" ? "success" : "warning"}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function PoliceTable() {
  const rows = useLoaderData<policeWithCaseType>();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>ID</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              POLICE NAME
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              BADGE ID
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              CASE ID
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>

      <Box display="flex">
        <Box sx={{ flexGrow: 1 }} />
        <TablePagination
          component="div"
          count={rows.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={10}
        />
      </Box>
    </TableContainer>
  );
}
