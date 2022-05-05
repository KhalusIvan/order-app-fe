import { Typography, Box, TextField } from "@mui/material";
import { styled } from "@mui/material";

export const CustomTextField = ({
  label,
  placeholder,
  value,
  name,
  onBlur,
  onChange,
  error,
  helperText,
  type = "text",
}: {
  label: string;
  placeholder: string;
  value: string;
  name: string;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error: boolean;
  helperText: string;
  type?: string;
}) => {
  return (
    <>
      <Box sx={{ py: 1 }}>
        <Typography variant="h6">{label}</Typography>
        <TextFieldWrapper
          variant="outlined"
          placeholder={placeholder}
          value={value}
          name={name}
          type={type}
          onBlur={onBlur}
          onChange={onChange}
          error={error}
          helperText={helperText}
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
