/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Divider, Grid, Button, IconButton } from "@mui/material";
import { PageTitle } from "../../components/PageTitle";
import { TableComponent } from "../../components/DefaultTable/TableComponent";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  getManufacturers,
  getManufacturerCurrencies,
  deleteManufacturer,
} from "../../redux/operation/manufacturerOperation";
import { getManufacturersSelector } from "../../redux/selector/manufacturerSelector";
import { getLoaderSelector } from "../../redux/selector/loaderSelector";
import { Search } from "../../components/DefaultTable/Search";
import { Multiselect } from "../../components/DefaultTable/Multiselect";
import { Loader } from "../../components/Loader";
import { DialogWindow } from "./components/DialogWindow";

import columns from "./components/columns";
import { useLocation } from "react-router-dom";

export const Manufacturer = () => {
  const dispatch = useDispatch();
  const data = useSelector(getManufacturersSelector);
  const isLoading = useSelector(getLoaderSelector("manufacturer"));
  const params = new URLSearchParams(useLocation().search);
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [dialog, setDialog] = useState<{ open: boolean; id: number | null }>({
    open: false,
    id: null,
  });
  const handleOpenDialog = (id: number | null) => {
    setDialog({ open: true, id });
  };
  const handleCloseDialog = () => {
    setDialog({ open: false, id: dialog.id });
  };

  useEffect(() => {
    dispatch(getManufacturerCurrencies());
  }, []);

  useEffect(() => {
    if (!params.has("page")) params.append("page", "1");
    if (isFirst) {
      params.append("filter", "true");
      setIsFirst(false);
    }
    dispatch(getManufacturers(params.toString().replaceAll("%2C", ",")));
  }, [params.toString()]);

  return (
    <>
      <Helmet title="Manufacturer" />
      <Grid container justifyContent="space-between" alignItems="center">
        <PageTitle title={"Виробники"} />
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleOpenDialog(null)}
        >
          Додати виробника
        </Button>
      </Grid>
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
            columns={columns.map((el) => {
              if (el.id === 1) {
                return { ...el, callback: handleOpenDialog };
              }
              return el;
            })}
            rows={data.rows.map((el) => ({
              ...el,
              currency: `${el.currency.name} (${el.currency.code})`,
              percent: `${el.percent}%`,
              delete: (
                <IconButton
                  size="small"
                  onClick={() => dispatch(deleteManufacturer(el.id, params))}
                >
                  <DeleteIcon />
                </IconButton>
              ),
            }))}
            width={600}
            pages={data.pages || 1}
          />
        )}
      </Grid>
      <DialogWindow dialog={dialog} handleCloseDialog={handleCloseDialog} />
    </>
  );
};
