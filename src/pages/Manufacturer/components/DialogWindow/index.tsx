import {
  getManufacturerByIdSelector,
  getManufacturerCurrencyListSelector,
} from "../../../../redux/selector/manufacturerSelector";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { CustomTextField } from "../../../../components/Inputs/CustomTextField";
import { CustomAutocomplete } from "../../../../components/Inputs/CustomAutocomplete";

import { Formik } from "formik";
import * as Yup from "yup";

interface DialogProps {
  dialog: {
    open: boolean;
    id: number | null;
  };
  handleCloseDialog: () => void;
}

export const DialogWindow = ({ dialog, handleCloseDialog }: DialogProps) => {
  const item = useSelector(getManufacturerByIdSelector(dialog.id));
  const currencies = useSelector(getManufacturerCurrencyListSelector);
  console.log(currencies);
  return (
    <Dialog
      open={dialog.open}
      onClose={handleCloseDialog}
      maxWidth={"sm"}
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">
        {dialog.id ? "Редагування виробника" : "Створення виробника"}
      </DialogTitle>
      <Formik
        initialValues={{
          name: "",
          currency: null,
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required(""),
          currency: Yup.object().required(""),
        })}
        onSubmit={(values, { setSubmitting }) => {
          //dispatch(register(values, setSubmitting, history));
        }}
      >
        {({
          errors,
          handleSubmit,
          isSubmitting,
          handleBlur,
          handleChange,
          values,
          touched,
          setFieldValue,
        }) => (
          <form style={{ height: "100%" }} onSubmit={handleSubmit}>
            <DialogContent>
              <CustomTextField
                label="Назва"
                placeholder="Введіть назву"
                value={values.name}
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.name && errors.name)}
                helperText={(touched.name && errors.name) || ""}
              />
              <CustomAutocomplete
                label="Валюта"
                placeholder="Виберіть валюту"
                name="currency"
                value={values.currency}
                error={Boolean(touched.currency && errors.currency)}
                loading={false}
                options={currencies}
                setFieldValue={setFieldValue}
                onBlur={handleBlur}
              />
            </DialogContent>
            <DialogActions></DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};
