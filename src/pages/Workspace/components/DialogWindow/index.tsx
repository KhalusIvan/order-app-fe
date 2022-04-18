import { getWorkspaceByIdSelector } from "../../../../redux/selector/workspaceSelector";
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
import {
  createWorkspace,
  updateWorkspace,
} from "../../../../redux/operation/workspaceOperation";
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
  const item = useSelector(getWorkspaceByIdSelector(dialog.id));
  console.log(item);
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
        {dialog.id ? "Редагування простору" : "Створення простору"}
      </DialogTitle>
      <Formik
        initialValues={{
          name: item?.workspace?.name || "",
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required(""),
        })}
        onSubmit={(values, { setSubmitting }) => {
          if (item) {
            dispatch(
              updateWorkspace(
                item.workspace.id,
                {
                  name: values.name,
                },
                params,
                setSubmitting,
                handleCloseDialog
              )
            );
          } else {
            dispatch(
              createWorkspace(
                {
                  name: values.name,
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
