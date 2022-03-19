import {
  Paper,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
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

import { signIn } from "../../redux/operation/userOperation";
import { useDispatch } from "react-redux";

export const SignIn = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <>
      <Helmet title="Sign in" />
      <Grid container justifyContent="center">
        <Grid item xs={11} md={7} lg={5} xl={4}>
          <Paper
            elevation={4}
            sx={{ pt: 7, pb: 1, px: 4, minWidth: 1, borderRadius: 5 }}
          >
            <Typography align="center" variant="h3">
              Авторизація
            </Typography>
            <Formik
              initialValues={{
                email: "",
                password: "",
                rememberMe: false,
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email("Невалідний емейл!")
                  .required("Обов'язкове поле!"),
                password: Yup.string().required("Обов'язкове поле!"),
              })}
              onSubmit={(values, { setSubmitting }) => {
                dispatch(signIn(values, setSubmitting, history));
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
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
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
                    <NavLink to={`/auth/reset-password`}>
                      Забули пароль?
                    </NavLink>
                  </Grid>
                  <StyledButton
                    type="submit"
                    sx={{ my: 2, py: 1 }}
                    variant="contained"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <CircularProgress size={25} />
                    ) : (
                      <>Ввійти</>
                    )}
                  </StyledButton>
                </form>
              )}
            </Formik>
            <Typography align="center" variant="body2" sx={{ mt: 4 }}>
              Не маєте акаунту?{" "}
              <NavLink to={`/auth/sign-up`}>Зареєструватися</NavLink>
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
