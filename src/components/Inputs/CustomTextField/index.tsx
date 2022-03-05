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
}: {
  label: string;
  placeholder: string;
  value: string;
  name: string;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error: boolean;
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
          onBlur={onBlur}
          onChange={onChange}
          error={error}
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
