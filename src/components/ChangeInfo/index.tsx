import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import { changeUserInfo } from "../../redux/operation/userOperation";
import { getUserSelector } from "../../redux/selector/userSelector";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { CustomTextField } from "../../components/Inputs/CustomTextField";

interface DialogProps {
  dialog: {
    open: boolean;
  };
  handleCloseDialog: () => void;
}

export const ChangeInfo = ({ dialog, handleCloseDialog }: DialogProps) => {
  const dispatch = useDispatch();
  const user = useSelector(getUserSelector) || {
    email: "",
    firstName: "",
    lastName: "",
  };

  return (
    <Dialog
      open={dialog.open}
      onClose={handleCloseDialog}
      maxWidth={"sm"}
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">Зміна інформації</DialogTitle>
      <Formik
        initialValues={{
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        }}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().required("Обов'язкове поле!"),
          lastName: Yup.string().required("Обов'язкове поле!"),
          email: Yup.string().email().required("Обов'язкове поле!"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          const obj = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
          };
          dispatch(
            changeUserInfo(obj, setSubmitting, () => {
              handleCloseDialog();
            })
          );
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
                label="Прізвище"
                placeholder="Введіть прізвище"
                value={values.lastName}
                name="lastName"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.lastName && errors.lastName)}
                helperText={(touched.lastName && errors.lastName) || ""}
              />
              <CustomTextField
                label="Ім'я"
                placeholder="Введіть ім'я"
                value={values.firstName}
                name="firstName"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.firstName && errors.firstName)}
                helperText={(touched.firstName && errors.firstName) || ""}
              />
              <CustomTextField
                label="Емейл"
                placeholder="Введіть емейл адрес"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.email && errors.email)}
                helperText={(touched.email && errors.email) || ""}
              />
            </DialogContent>
            <DialogActions>
              <Button
                disabled={isSubmitting}
                type="submit"
                color="primary"
                variant="contained"
              >
                {isSubmitting ? <CircularProgress size={20} /> : "Оновити"}
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};
