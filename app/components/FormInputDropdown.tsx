import MenuItem from "@mui/material/MenuItem";
import React from "react";
import { useField } from "remix-validated-form";
import TextField from "@mui/material/TextField";

type FormInputProps = {
  name: string;
  label: string;
  options: OptionProps[];
  styles?: {};
};

type OptionProps = {
  label: string;
  value: any;
};

export const FormInputDropdown = ({
  name,
  options,
  styles,
  label,
}: FormInputProps) => {
  const { getInputProps, error, defaultValue } = useField(name);

  /*React.useEffect(() => {
       setValue(defaultValue)
     }, [defaultValue]) */

  return (
    <TextField
      helperText={error ? <span style={{ color: "red" }}>{error}</span> : null}
      size="small"
      key={defaultValue}
      select
      {...getInputProps({ id: name })}
      sx={styles}
      label={label}
      variant="outlined"
    >
      {options.map((option: any) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};
