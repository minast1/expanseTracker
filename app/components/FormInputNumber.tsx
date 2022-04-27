import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useField } from "remix-validated-form";

export const FormInputNumber = ({ name, ...props }: TextFieldProps) => {
  const { error, getInputProps } = useField(name as string);

  return (
    <TextField
      {...props}
      helperText={error ? <span style={{ color: "red" }}>{error}</span> : null}
      error={error ? true : false}
      size="small"
      placeholder="should be between 100 - 999"
      type="number"
      {...getInputProps({
        id: name,
      })}
      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
      fullWidth
      variant="outlined"
    />
  );
};
