import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { criminalInfoType } from "~/controllers/criminalController";
import { format } from "date-fns";
import CircularProgress from "@mui/material/CircularProgress";

function escapeRegExp(value: string): string {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

interface QuickSearchToolbarProps {
  clearSearch: () => void;
  onChange: () => void;
  value: string;
}

function QuickSearchToolbar(props: QuickSearchToolbarProps) {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search Criminal…"
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? "visible" : "hidden" }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
        sx={{
          width: {
            xs: 1,
            sm: "auto",
          },
          m: (theme) => theme.spacing(1, 0.5, 1.5),
          "& .MuiSvgIcon-root": {
            mr: 0.5,
          },
          "& .MuiInput-underline:before": {
            borderBottom: 1,
            borderColor: "divider",
          },
        }}
      />
    </Box>
  );
}

const CriminalsTable = () => {
  const parentData = useLoaderData<criminalInfoType[]>(); ///THIS IS WHAT WE NEED !!!!!!
  const fetcher = useFetcher();
  const [searchText, setSearchText] = React.useState("");
  const [rows, setRows] = React.useState<criminalInfoType[] | []>([]);

  const requestSearch = (searchValue: string) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = parentData
      ? parentData.filter((row: any) => {
          return Object.keys(row).some((field: any) => {
            return searchRegex.test(row[field].toString());
          });
        })
      : [];
    setRows(filteredRows);
  };

  React.useEffect(() => {
    setRows(parentData);
  }, [parentData]);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "phone",
      headerName: "Contact No",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "height",
      headerName: "Height(m))",
      type: "number",
      width: 130,
    },
    {
      field: "weight",
      headerName: "Weight(Kg)",
      type: "number",
      width: 130,
    },
    {
      field: "dob",
      align: "right",
      headerAlign: "right",
      headerName: "Date-Of-Birth",
      valueFormatter: (params) => {
        //console.log(params.value);
        return format(new Date(params.value), "PP");
      },
      type: "string",
      width: 150,
    },

    {
      field: "actions",
      headerName: "Actions Area",
      minWidth: 100,
      flex: 1,

      align: "right",
      headerAlign: "center",
      renderCell: (params: GridValueGetterParams) => {
        return (
          <Box display="flex">
            <Link to={`/dashboard/${params.id}`} prefetch="intent">
              <Button
                variant="contained"
                size="small"
                sx={{ mr: 3, textTransform: "capitalize" }}
              >
                View Profile
              </Button>
            </Link>

            <Button
              variant="contained"
              size="small"
              id={params.id as string}
              color="error"
              sx={{ textTransform: "capitalize" }}
              onClick={() => {
                fetcher.submit(
                  {
                    button: params.id as string,
                  },
                  { method: "post" }
                );
              }}
            >
              {fetcher.state === "loading" && params.hasFocus ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                "Delete"
              )}
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <div style={{ height: 700, width: "100%" }}>
      <DataGrid
        components={{ Toolbar: QuickSearchToolbar }}
        rows={rows}
        disableColumnFilter
        pageSize={10}
        disableColumnMenu
        disableColumnSelector
        disableSelectionOnClick
        loading={rows.length === 0}
        columns={columns}
        componentsProps={{
          toolbar: {
            value: searchText,
            onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
              requestSearch(event.target.value),
            clearSearch: () => requestSearch(""),
          },
        }}
      />
    </div>
  );
};
export default CriminalsTable;
