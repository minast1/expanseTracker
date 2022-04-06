import React from "react";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useField } from "remix-validated-form";

export const FormInputDate = ({ name, label, ...props }: TextFieldProps) => {
  const [value, setValue] = React.useState<Date | null>(new Date());
  const { error, getInputProps } = useField(name as string);
  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <DatePicker
        label={label}
        inputFormat="MM/dd/yyyy"
        value={value}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            {...props}
            helperText={
              error ? <span style={{ color: "red" }}>{error}</span> : null
            }
            error={error ? true : false}
            size="small"
            {...getInputProps({ id: name })}
          />
        )}
      />
    </LocalizationProvider>
  );
};
