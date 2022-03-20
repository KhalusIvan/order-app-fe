/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useDebounce from "../../../hooks/useDebounce";
import { useHistory, useLocation } from "react-router-dom";

export const Search = () => {
  const history = useHistory();
  const params = new URLSearchParams(useLocation().search);
  const fromUrl = params.get("search") || "";
  const [value, setValue] = useState<string>(fromUrl);
  const paramValue = useDebounce(value, 300);

  useEffect(() => {
    params.delete("search");
    params.delete("page");
    if (value.length > 0) params.append("search", value);
    history.push({ search: params.toString() });
  }, [paramValue]);

  return (
    <TextField
      id="standard-basic"
      style={{
        minWidth: 150,
        marginRight: 10,
      }}
      variant="standard"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      placeholder="Пошук"
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};
