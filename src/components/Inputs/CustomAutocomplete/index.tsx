import {
  Typography,
  Box,
  TextField,
  CircularProgress,
  Autocomplete,
} from "@mui/material";
import { styled } from "@mui/material";

export const CustomAutocomplete = ({
  label,
  placeholder,
  name,
  value,
  error,
  loading,
  options,
  setFieldValue,
  onBlur,
  disabled = false,
}: {
  label: string;
  placeholder: string;
  name: string;
  value: { id: number; name: string } | null;
  error: boolean;
  disabled?: boolean;
  loading: boolean;
  options: readonly { id: number; name: string; email?: string }[];
  setFieldValue: (field: string, value: any) => void;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
}) => {
  return (
    <>
      <Box sx={{ py: 1 }}>
        <Typography variant="h6">{label}</Typography>
        <Autocomplete
          sx={{ width: 1 }}
          isOptionEqualToValue={(
            option: { id: number; name: string },
            value: { id: number; name: string }
          ) => option.id === value.id}
          getOptionLabel={(option: {
            id: number;
            name: string;
            email?: string;
          }) =>
            option.email ? `${option.name} (${option.email})` : option.name
          }
          options={options}
          loading={loading}
          onChange={(event, newValue) => {
            setFieldValue(name, newValue);
          }}
          disabled={disabled}
          value={value}
          renderInput={(params) => (
            <TextFieldWrapper
              {...params}
              variant="outlined"
              placeholder={placeholder}
              error={error}
              name={name}
              onBlur={onBlur}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
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
