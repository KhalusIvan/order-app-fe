/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Paper, Typography, Grid, CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useHistory, useParams } from "react-router-dom";

import { confirmPassword } from "../../redux/operation/userOperation";
import { useDispatch } from "react-redux";

export const ConfirmPassword = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const params: { token: string } = useParams();

  useEffect(() => {
    dispatch(confirmPassword(params?.token || "", history));
  }, []);

  return (
    <>
      <Helmet title="Confirm password" />
      <Grid container justifyContent="center">
        <Grid item xs={11} md={7} lg={5} xl={4}>
          <Paper
            elevation={4}
            sx={{ pt: 7, pb: 1, px: 4, minWidth: 1, borderRadius: 5 }}
          >
            <Typography align="center" variant="h4">
              Підтверджуємо пароль
            </Typography>
            <Grid container>
              <Grid xs={1}>
                <CircularProgress />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
