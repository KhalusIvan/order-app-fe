import {
  Paper,
  Typography,
  Grid,
  Button,
  styled,
  CircularProgress,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import { NavLink, useHistory } from "react-router-dom";

import { Formik } from "formik";
import * as Yup from "yup";

import { CustomTextField } from "../../components/Inputs/CustomTextField";
import { CustomPasswordField } from "../../components/Inputs/CustomPasswordField";

import { register } from "../../redux/operation/userOperation";
import { useDispatch } from "react-redux";

export const SignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <>
      <Helmet title="Sign up" />
      <Grid container justifyContent="center">
        <Grid item xs={11} md={7} lg={5} xl={4}>
          <Paper
            elevation={4}
            sx={{ pt: 7, pb: 1, px: 4, minWidth: 1, borderRadius: 5 }}
          >
            <Typography align="center" variant="h3">
              Реєстрація
            </Typography>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                passwordRepeat: "",
              }}
              validationSchema={Yup.object().shape({
                firstName: Yup.string().required("Обов'язкове поле!"),
                lastName: Yup.string().required("Обов'язкове поле!"),
                email: Yup.string().email().required("Обов'язкове поле!"),
                password: Yup.string().required("Обов'язкове поле!"),
                passwordRepeat: Yup.string()
                  .oneOf([Yup.ref("password"), null], "Паролі не співпадають!")
                  .required("Обов'язкове поле!"),
              })}
              onSubmit={(values, { setSubmitting }) => {
                dispatch(register(values, setSubmitting, history));
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
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <CustomTextField
                        label="Фамілія"
                        placeholder="Введіть фамілію"
                        value={values.lastName}
                        name="lastName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(touched.lastName && errors.lastName)}
                        helperText={(touched.lastName && errors.lastName) || ""}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CustomTextField
                        label="Ім'я"
                        placeholder="Введіть ім'я"
                        value={values.firstName}
                        name="firstName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(touched.firstName && errors.firstName)}
                        helperText={
                          (touched.firstName && errors.firstName) || ""
                        }
                      />
                    </Grid>
                  </Grid>
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
                  <CustomPasswordField
                    label="Пароль"
                    placeholder="Введіть пароль"
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.password && errors.password)}
                    helperText={(touched.password && errors.password) || ""}
                  />
                  <CustomPasswordField
                    label="Підтвердження паролю"
                    placeholder="Підтвердіть пароль"
                    value={values.passwordRepeat}
                    name="passwordRepeat"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(
                      touched.passwordRepeat && errors.passwordRepeat
                    )}
                    helperText={
                      (touched.passwordRepeat && errors.passwordRepeat) || ""
                    }
                  />
                  <StyledButton
                    type="submit"
                    sx={{ my: 2, py: 1 }}
                    variant="contained"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <CircularProgress size={25} />
                    ) : (
                      <>Зареєструватися</>
                    )}
                  </StyledButton>
                </form>
              )}
            </Formik>
            <Typography align="center" variant="body2" sx={{ mt: 4 }}>
              Вже маєте акаунт?{" "}
              <NavLink to={`/auth/sign-in`}>Авторизуватися</NavLink>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

const StyledButton = styled(Button)`
  width: 100%;
  border-radius: 20px;
`;
