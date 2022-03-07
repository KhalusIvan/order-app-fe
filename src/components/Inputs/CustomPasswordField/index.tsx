import { useState } from "react";
import {
  Typography,
  Box,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const CustomPasswordField = ({
  label,
  placeholder,
  value,
  name,
  onBlur,
  onChange,
  error,
  helperText,
}: {
  label: string;
  placeholder: string;
  value: string;
  name: string;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error: boolean;
  helperText: string;
}) => {
  const [viewPassword, setViewPassword] = useState<boolean>(false);

  return (
    <>
      <Box sx={{ py: 1 }}>
        <Typography variant="h6">{label}</Typography>
        <TextFieldWrapper
          variant="outlined"
          placeholder={placeholder}
          value={value}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          error={error}
          type={viewPassword ? "text" : "password"}
          helperText={error && helperText}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setViewPassword((prev) => !prev);
                  }}
                >
                  {viewPassword && <Visibility />}
                  {!viewPassword && <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ width: 1 }}
        />
      </Box>
    </>
  );
};

export const TextFieldWrapper = styled(TextField)`
  fieldset {
    border-radius: 20px;
  }
`;
