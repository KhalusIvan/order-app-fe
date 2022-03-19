/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Divider, Grid } from "@mui/material";
import { PageTitle } from "../../components/PageTitle";
import { TableComponent } from "../../components/DefaultTable/TableComponent";

import { useDispatch, useSelector } from "react-redux";
import { getManufacturers } from "../../redux/operation/manufacturerOperation";
import { getManufacturersSelector } from "../../redux/selector/manufacturerSelector";

export const Manufacturer = () => {
  const dispatch = useDispatch();
  const data = useSelector(getManufacturersSelector);

  useEffect(() => {
    dispatch(getManufacturers());
  }, []);

  console.log(data);
  return (
    <>
      <Helmet title="Manufacturer" />
      <PageTitle title={"Виробники"} />
      <Divider sx={{ my: 1 }} />
      <Grid item xs={12}>
        <TableComponent />
      </Grid>
    </>
  );
};
