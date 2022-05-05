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
  Button,
  CircularProgress,
} from "@mui/material";
import { CustomTextField } from "../../../../components/Inputs/CustomTextField";
import { CustomAutocomplete } from "../../../../components/Inputs/CustomAutocomplete";
import {
  createManufacturer,
  updateManufacturer,
} from "../../../../redux/operation/manufacturerOperation";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

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
  const dispatch = useDispatch();
  const params = new URLSearchParams(useLocation().search);

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
          name: item?.name || "",
          currency: item?.currency || null,
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("Обов'язкове поле!"),
          currency: Yup.object().required("Обов'язкове поле!"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          if (item) {
            dispatch(
              updateManufacturer(
                item.id,
                {
                  name: values.name,
                  currencyId: values.currency?.id,
                },
                params,
                setSubmitting,
                handleCloseDialog
              )
            );
          } else {
            dispatch(
              createManufacturer(
                {
                  name: values.name,
                  currencyId: values.currency?.id,
                },
                params,
                setSubmitting,
                handleCloseDialog
              )
            );
          }
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
                helperText={(touched.name && errors.name)?.toString() || ""}
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
            <DialogActions>
              <Button
                disabled={isSubmitting}
                type="submit"
                color="primary"
                variant="contained"
              >
                {isSubmitting ? (
                  <CircularProgress size={20} />
                ) : dialog.id ? (
                  "Оновити"
                ) : (
                  "Додати"
                )}
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};
