import {
  Paper,
  Typography,
  Grid,
  Button,
  styled,
  CircularProgress,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";

import { Formik } from "formik";
import * as Yup from "yup";

import Lock from "../../static/icons/lock.png";

import { CustomTextField } from "../../components/Inputs/CustomTextField";

import { resetPassword } from "../../redux/operation/userOperation";
import { useDispatch } from "react-redux";

export const ResetPassword = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Helmet title="Sign up" />
      <Grid container justifyContent="center">
        <Grid item xs={11} md={7} lg={5} xl={4}>
          <Paper
            elevation={4}
            sx={{ pt: 7, pb: 1, px: 4, minWidth: 1, borderRadius: 5 }}
          >
            <Grid container justifyContent="center" sx={{ pb: 2 }}>
              <Grid item xs={3}>
                <img src={Lock} alt="lock" style={{ width: "100%" }} />
              </Grid>
            </Grid>
            <Typography align="center" variant="h4">
              Відновлення паролю
            </Typography>
            <Formik
              initialValues={{
                email: "",
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string().email().required("Обов'язкове поле!"),
              })}
              onSubmit={(values, { setSubmitting }) => {
                dispatch(resetPassword(values, setSubmitting));
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
                  <StyledButton
                    type="submit"
                    sx={{ my: 2, py: 1 }}
                    variant="contained"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <CircularProgress size={25} />
                    ) : (
                      <>Відновити пароль</>
                    )}
                  </StyledButton>
                </form>
              )}
            </Formik>
            <Typography align="center" variant="body2" sx={{ mt: 4 }}>
              Повернутися до <NavLink to={`/auth/sign-in`}>Авторизації</NavLink>
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
