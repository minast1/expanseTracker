import React from "react";
import TextField from "@mui/material/TextField";
import { useField } from "remix-validated-form";

type FormInputProps = {
  name: string;
  label: string;
  type?: string;
  styles?: {};
};
export const FormInputText = ({
  name,
  label,
  styles,
  type,
}: FormInputProps) => {
  const { error, getInputProps, defaultValue } = useField(name);

  /*React.useEffect(() => {
       setValue(defaultValue)
     }, [defaultValue])*/

  return (
    <TextField
      helperText={error ? <span style={{ color: "red" }}>{error}</span> : null}
      error={error ? true : false}
      type={type}
      key={defaultValue}
      size="small"
      {...getInputProps({ id: name })}
      fullWidth
      sx={styles}
      label={label}
      variant="outlined"
    />
  );
};
