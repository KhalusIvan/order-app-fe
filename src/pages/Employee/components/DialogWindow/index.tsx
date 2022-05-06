import {
  getEmployeeByIdSelector,
  getEmployeeRoleListSelector,
  getEmployeeUserListSelector,
} from "../../../../redux/selector/employeeSelector";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import { CustomAutocomplete } from "../../../../components/Inputs/CustomAutocomplete";
import {
  createEmployee,
  updateEmployee,
} from "../../../../redux/operation/employeeOperation";
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
  const item = useSelector(getEmployeeByIdSelector(dialog.id));
  const roles = useSelector(getEmployeeRoleListSelector);
  const users = useSelector(getEmployeeUserListSelector);
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
        {dialog.id ? "Редагування прицівника" : "Додавання працівника"}
      </DialogTitle>
      <Formik
        initialValues={{
          user: item?.user || null,
          role: item?.role || null,
        }}
        validationSchema={Yup.object().shape({
          user: Yup.object().required("Обов'язкове поле!"),
          role: Yup.object().required("Обов'язкове поле!"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          if (item) {
            dispatch(
              updateEmployee(
                item.id,
                {
                  userId: values.user.id,
                  roleId: values.role.id,
                },
                params,
                setSubmitting,
                handleCloseDialog
              )
            );
          } else {
            dispatch(
              createEmployee(
                {
                  userId: values.user.id,
                  roleId: values.role.id,
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
              <CustomAutocomplete
                label="Працівник"
                placeholder="Виберіть працівника"
                name="user"
                value={values.user}
                error={Boolean(touched.user && errors.user)}
                loading={false}
                options={users}
                disabled={!!item}
                setFieldValue={setFieldValue}
                onBlur={handleBlur}
              />
              <CustomAutocomplete
                label="Роль"
                placeholder="Виберіть роль"
                name="role"
                value={values.role}
                error={Boolean(touched.role && errors.role)}
                loading={false}
                options={roles}
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
