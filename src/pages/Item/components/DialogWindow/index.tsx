import {
  getItemByIdSelector,
  getItemManufacturerListSelector,
} from "../../../../redux/selector/itemSelector";
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
import { CustomAutocomplete } from "../../../../components/Inputs/CustomAutocomplete";
import {
  createItem,
  updateItem,
} from "../../../../redux/operation/itemOperation";
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
  const item = useSelector(getItemByIdSelector(dialog.id));
  const manufacturers = useSelector(getItemManufacturerListSelector);
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
        {dialog.id ? "Редагування продукції" : "Створення продукції"}
      </DialogTitle>
      <Formik
        initialValues={{
          name: item?.name || "",
          code: item?.code || "",
          buyPrice: item?.buyPrice || "",
          recomendedSellPrice: item?.recomendedSellPrice || "",
          manufacturer: item?.manufacturer || null,
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("Обов'язкове поле!"),
          code: Yup.string().required("Обов'язкове поле!"),
          manufacturer: Yup.object().required("Обов'язкове поле!"),
          buyPrice: Yup.number().positive().required("Обов'язкове поле!"),
          recomendedSellPrice: Yup.number()
            .positive()
            .required("Обов'язкове поле!"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          if (item) {
            dispatch(
              updateItem(
                item.id,
                {
                  name: values.name,
                  code: values.code,
                  buyPrice: +values.buyPrice,
                  recomendedSellPrice: +values.recomendedSellPrice,
                  manufacturerId: values.manufacturer?.id,
                },
                params,
                setSubmitting,
                handleCloseDialog
              )
            );
          } else {
            dispatch(
              createItem(
                {
                  name: values.name,
                  code: values.code,
                  buyPrice: +values.buyPrice,
                  recomendedSellPrice: +values.recomendedSellPrice,
                  manufacturerId: values.manufacturer?.id,
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
              <Grid container spacing={3}>
                <Grid item xs={6}>
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
                </Grid>
                <Grid item xs={6}>
                  <CustomTextField
                    label="Код"
                    placeholder="Введіть код"
                    value={values.code}
                    name="code"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.code && errors.code)}
                    helperText={(touched.code && errors.code)?.toString() || ""}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomAutocomplete
                    label="Виробник"
                    placeholder="Виберіть виробника"
                    name="manufacturer"
                    value={values.manufacturer}
                    error={Boolean(touched.manufacturer && errors.manufacturer)}
                    loading={false}
                    options={manufacturers}
                    setFieldValue={setFieldValue}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomTextField
                    label="Ціна закупки"
                    placeholder="Введіть ціну"
                    value={values.buyPrice}
                    name="buyPrice"
                    type="number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.buyPrice && errors.buyPrice)}
                    helperText={
                      (touched.buyPrice && errors.buyPrice)?.toString() || ""
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomTextField
                    label="Рекомендована ціна продажу"
                    placeholder="Введіть ціну"
                    type="number"
                    value={values.recomendedSellPrice}
                    name="recomendedSellPrice"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(
                      touched.recomendedSellPrice && errors.recomendedSellPrice
                    )}
                    helperText={
                      (
                        touched.recomendedSellPrice &&
                        errors.recomendedSellPrice
                      )?.toString() || ""
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
