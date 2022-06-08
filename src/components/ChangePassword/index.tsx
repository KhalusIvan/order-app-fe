import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import { changePassword } from "../../redux/operation/userOperation";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { CustomPasswordField } from "../../components/Inputs/CustomPasswordField";

interface DialogProps {
  dialog: {
    open: boolean;
  };
  handleCloseDialog: () => void;
}

export const ChangePassword = ({ dialog, handleCloseDialog }: DialogProps) => {
  const dispatch = useDispatch();

  return (
    <Dialog
      open={dialog.open}
      onClose={handleCloseDialog}
      maxWidth={"sm"}
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">Зміна паролю</DialogTitle>
      <Formik
        initialValues={{
          prevPassword: "",
          newPassword: "",
          newPasswordRepeat: "",
        }}
        validationSchema={Yup.object().shape({
          prevPassword: Yup.string().required("Обов'язкове поле!"),
          newPassword: Yup.string().required("Обов'язкове поле!"),
          newPasswordRepeat: Yup.string()
            .oneOf([Yup.ref("newPassword"), null], "Паролі не співпадають!")
            .required("Обов'язкове поле!"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          const obj = {
            prevPassword: values.prevPassword,
            newPassword: values.newPassword,
          };
          dispatch(
            changePassword(obj, setSubmitting, () => {
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
        }) => (
          <form style={{ height: "100%" }} onSubmit={handleSubmit}>
            <DialogContent>
              <CustomPasswordField
                label="Попередній пароль"
                placeholder="Введіть пароль"
                value={values.prevPassword}
                name="prevPassword"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.prevPassword && errors.prevPassword)}
                helperText={(touched.prevPassword && errors.prevPassword) || ""}
              />
              <CustomPasswordField
                label="Новий пароль"
                placeholder="Введіть пароль"
                value={values.newPassword}
                name="newPassword"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.newPassword && errors.newPassword)}
                helperText={(touched.newPassword && errors.newPassword) || ""}
              />
              <CustomPasswordField
                label="Повторення нового паролю"
                placeholder="Введіть пароль"
                value={values.newPasswordRepeat}
                name="newPasswordRepeat"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(
                  touched.newPasswordRepeat && errors.newPasswordRepeat
                )}
                helperText={
                  (touched.newPasswordRepeat && errors.newPasswordRepeat) || ""
                }
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
