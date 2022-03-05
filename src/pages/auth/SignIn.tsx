import {
  Paper,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Helmet } from "react-helmet-async";

import { Formik } from "formik";
import * as Yup from "yup";

import { CustomTextField } from "../../components/Inputs/CustomTextField";

export const SignIn = () => {
  return (
    <>
      <Helmet title="Sign in" />
      <Grid container justifyContent="center">
        <Grid item xs={10} md={8} lg={6} xl={5}>
          <Paper
            elevation={4}
            sx={{ pt: 3, pb: 1, px: 3, minWidth: 1, borderRadius: 5 }}
          >
            <Typography align="center" variant="h3">
              Login
            </Typography>
            <Formik
              initialValues={{
                email: "",
                password: "",
                rememberMe: false,
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string().email().required("Email is required!"),
                password: Yup.string().required("Paswword is required!"),
              })}
              onSubmit={(values, { setSubmitting }) => {}}
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
                  <CustomTextField
                    label="Емейл"
                    placeholder="Введіть емейл адрес"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.email && errors.email)}
                  />
                  <CustomTextField
                    label="Пароль"
                    placeholder="Введіть пароль"
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.password && errors.password)}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.rememberMe}
                        onChange={(e) =>
                          setFieldValue("rememberMe", e.target.checked)
                        }
                      />
                    }
                    label="Запам'ятати мене"
                  />
                </form>
              )}
            </Formik>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
