import React from "react";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import { Theme } from "@mui/material/styles";
import theme from "~/src/theme";
import MenuItem from "@mui/material/MenuItem";
import { useControlField, useField } from "remix-validated-form";
import { Crime } from "@prisma/client";
import FormHelperText from "@mui/material/FormHelperText";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(id: string, crimes: string[], theme: Theme) {
  return {
    fontWeight:
      crimes?.indexOf(id) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

type appProps = {
  name: string;
  label: string;
  options: Crime[];
};
const CriminalMultiSelect = ({ name, label, options }: appProps) => {
  const [crime, setCrime] = React.useState<string[]>([]);
  const [controlledvalue, setValue] = useControlField<string[]>(name);
  const { error, validate } = useField(name);

  const handleChange = (event: SelectChangeEvent<typeof crime>) => {
    const {
      target: { value },
    } = event;
    setCrime(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    setValue(value as string[]);
    validate();
  };
  //console.log(controlledvalue);
  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      {typeof controlledvalue !== "undefined" &&
        controlledvalue.map((val) => (
          <input type="hidden" name={name} key={val} value={val} />
        ))}
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        error={error ? true : false}
        sx={{ width: "100%" }}
        value={crime}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        MenuProps={MenuProps}
      >
        {options.map((el) => (
          <MenuItem
            key={el.id}
            value={el.id}
            style={getStyles(el.id, crime, theme)}
          >
            {el.description}
          </MenuItem>
        ))}
      </Select>
      {error ? (
        <FormHelperText sx={{ color: "red" }}>{error}</FormHelperText>
      ) : null}
    </FormControl>
  );
};

export default CriminalMultiSelect;
