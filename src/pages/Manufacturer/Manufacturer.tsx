/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Divider, Grid } from "@mui/material";
import { PageTitle } from "../../components/PageTitle";
import { TableComponent } from "../../components/DefaultTable/TableComponent";

import { useDispatch, useSelector } from "react-redux";
import { getManufacturers } from "../../redux/operation/manufacturerOperation";
import { getManufacturersSelector } from "../../redux/selector/manufacturerSelector";
import { getLoaderSelector } from "../../redux/selector/loaderSelector";

import { Search } from "../../components/DefaultTable/Search";
import { Multiselect } from "../../components/DefaultTable/Multiselect";
import { Loader } from "../../components/Loader";

import columns from "./components/columns";

export const Manufacturer = () => {
  const dispatch = useDispatch();
  const data = useSelector(getManufacturersSelector);
  const isLoading = useSelector(getLoaderSelector("manufacturer"));

  useEffect(() => {
    dispatch(getManufacturers());
  }, []);

  console.log(data);
  return (
    <>
      <Helmet title="Manufacturer" />
      <PageTitle title={"Виробники"} />
      <Divider sx={{ my: 1 }} />
      <Grid container sx={{ my: 3 }}>
        <Search />
        <Multiselect
          label="Валюта"
          data={data?.currency || []}
          loading={isLoading}
          urlName="currencyId"
        />
      </Grid>
      <Grid item xs={12}>
        {isLoading ? (
          <Grid item xs={12} sx={{ height: 400 }}>
            <Loader />
          </Grid>
        ) : (
          <TableComponent
            columns={columns}
            rows={data.rows.map((el) => ({
              ...el,
              currency: `${el.currency.name} (${el.currency.code})`,
            }))}
            width={600}
            pages={data.pages || 1}
          />
        )}
      </Grid>
    </>
  );
};
