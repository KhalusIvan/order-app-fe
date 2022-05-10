import {
  Typography,
  Box,
  TextField,
  CircularProgress,
  Autocomplete,
} from "@mui/material";
import { styled } from "@mui/material";
import { Customer } from "../../../../../types";

export const CustomerAutocomplete = ({
  inputValue,
  label,
  placeholder,
  fieldTouchName,
  value,
  error,
  loading,
  options,
  setFieldValue,
  onBlur,
  disabled = false,
  setFieldTouched,
}: {
  inputValue: string;
  label: string;
  placeholder: string;
  fieldTouchName: string;
  value: Customer | null;
  error: boolean;
  disabled?: boolean;
  loading: boolean;
  options: readonly Customer[];
  setFieldValue: (field: string, value: any) => void;
  setFieldTouched: (field: string) => void;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
}) => {
  return (
    <>
      <Box sx={{ py: 1 }}>
        <Typography variant="h6">{label}</Typography>
        <Autocomplete
          sx={{ width: 1 }}
          freeSolo
          isOptionEqualToValue={(option: Customer, value: Customer) =>
            option.id === value.id
          }
          getOptionLabel={(option: Customer) => option.telephone}
          renderOption={(props, option: Customer) => (
            <li {...props}>
              {option.middleName
                ? `${option.lastName} ${option.firstName} ${option.middleName}`
                : `${option.lastName} ${option.firstName}`}
            </li>
          )}
          inputValue={inputValue}
          options={options}
          loading={loading}
          onChange={(event, newValue) => {
            if (typeof newValue === "object") {
              setFieldValue("firstName", newValue!.firstName || "");
              setFieldValue("lastName", newValue!.lastName || "");
              setFieldValue("middleName", newValue!.middleName || "");
              setFieldValue("telephone", newValue!.telephone || "");
              setFieldValue("city", newValue!.city || "");
              setFieldValue("postOffice", newValue!.postOffice || "");
            }
          }}
          onInputChange={(e, value) => {
            if (value === "+38") {
              setFieldValue("telephone", "");
            } else if (value.length === 1) {
              setFieldValue("telephone", `+38${value}`);
            } else {
              setFieldValue("telephone", value);
            }
          }}
          disabled={disabled}
          value={value}
          renderInput={(params) => (
            <TextFieldWrapper
              {...params}
              variant="outlined"
              placeholder={placeholder}
              error={error}
              name={fieldTouchName}
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
