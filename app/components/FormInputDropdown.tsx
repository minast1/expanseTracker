import * as React from "react";
import { useField } from "remix-validated-form";

type optionsType = {
  label: string | number;
  value: string | number;
};
type AppProps = {
  options: optionsType[];
  name: string;
};

export default function FormInputDropdown({ name, options }: AppProps) {
  const { error, getInputProps } = useField(name as string);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <select
        style={{
          fontSize: "0.9rem",
          padding: "2px 5px",
          marginBottom: 10,
          borderColor: "lightgray",
          borderWidth: "1px",
        }}
        {...getInputProps({ id: name })}
        multiple
      >
        <option value="">--Please choose an option--</option>
        {options.map((el, index) => (
          <option key={index} value={el.value}>
            {el.label}
          </option>
        ))}
      </select>
      {error ? (
        <span style={{ color: "red", fontSize: 13, paddingBottom: 5 }}>
          {error}
        </span>
      ) : null}
    </div>
  );
}
