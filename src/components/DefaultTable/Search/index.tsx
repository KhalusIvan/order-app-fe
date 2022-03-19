import { useState, useEffect } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useDebounce from "../../../hooks/useDebounce";

export const Search = () => {
  const [value, setValue] = useState<string>("");
  const paramValue = useDebounce(value, 300);

  useEffect(() => {
    console.log(paramValue);
  }, [paramValue]);

  return (
    <TextField
      id="standard-basic"
      style={{
        top: 8,
        minWidth: 150,
        marginRight: 10,
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      placeholder="Search"
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};
