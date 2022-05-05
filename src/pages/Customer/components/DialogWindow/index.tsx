import { getCustomerByIdSelector } from "../../../../redux/selector/customerSelector";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Grid,
} from "@mui/material";
import { CustomTextField } from "../../../../components/Inputs/CustomTextField";
import {
  createCustomer,
  updateCustomer,
} from "../../../../redux/operation/customerOperation";
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
  const customer = useSelector(getCustomerByIdSelector(dialog.id));
  const dispatch = useDispatch();
  const params = new URLSearchParams(useLocation().search);

  return (
    <Dialog
      open={dialog.open}
      onClose={handleCloseDialog}
      maxWidth={"md"}
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">
        {dialog.id ? "Редагування покупця" : "Створення покупця"}
      </DialogTitle>
      <Formik
        initialValues={{
          firstName: customer?.firstName || "",
          lastName: customer?.lastName || "",
          middleName: customer?.middleName || "",
          postOffice: customer?.postOffice || "",
          city: customer?.city || "",
          telephone: customer?.telephone || "",
        }}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().required("Обов'язкове поле!"),
          lastName: Yup.string().required("Обов'язкове поле!"),
          city: Yup.string().required("Обов'язкове поле!"),
          telephone: Yup.string().required("Обов'язкове поле!"),
          postOffice: Yup.number().required("Обов'язкове поле!"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          if (customer) {
            dispatch(
              updateCustomer(
                customer.id,
                {
                  firstName: values?.firstName,
                  lastName: values?.lastName,
                  middleName: values?.middleName || null,
                  postOffice: values?.postOffice,
                  city: values?.city,
                  telephone: values?.telephone,
                },
                params,
                setSubmitting,
                handleCloseDialog
              )
            );
          } else {
            dispatch(
              createCustomer(
                {
                  firstName: values?.firstName,
                  lastName: values?.lastName,
                  middleName: values?.middleName || null,
                  postOffice: values?.postOffice,
                  city: values?.city,
                  telephone: values?.telephone,
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
        }) => (
          <form style={{ height: "100%" }} onSubmit={handleSubmit}>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <CustomTextField
                    label="Ім'я"
                    placeholder="Введіть iм'я"
                    value={values.firstName}
                    name="firstName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.firstName && errors.firstName)}
                    helperText={
                      (touched.firstName && errors.firstName)?.toString() || ""
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <CustomTextField
                    label="Фамілія"
                    placeholder="Введіть фамілію"
                    value={values.lastName}
                    name="lastName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.lastName && errors.lastName)}
                    helperText={
                      (touched.lastName && errors.lastName)?.toString() || ""
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <CustomTextField
                    label="По-батькові"
                    placeholder="Введіть по-батькові"
                    value={values.middleName}
                    name="middleName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.middleName && errors.middleName)}
                    helperText={
                      (touched.middleName && errors.middleName)?.toString() ||
                      ""
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <CustomTextField
                    label="Телефон"
                    placeholder="Введіть телефон"
                    value={values.telephone}
                    name="telephone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.telephone && errors.telephone)}
                    helperText={
                      (touched.telephone && errors.telephone)?.toString() || ""
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <CustomTextField
                    label="Місто"
                    placeholder="Введіть місто"
                    value={values.city}
                    name="city"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.city && errors.city)}
                    helperText={(touched.city && errors.city)?.toString() || ""}
                  />
                </Grid>
                <Grid item xs={4}>
                  <CustomTextField
                    label="Відділення пошти"
                    placeholder="Введіть відділення пошти"
                    value={values.postOffice}
                    name="postOffice"
                    type="number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.postOffice && errors.postOffice)}
                    helperText={
                      (touched.postOffice && errors.postOffice)?.toString() ||
                      ""
                    }
                  />
                </Grid>
              </Grid>
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
