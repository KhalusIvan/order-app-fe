/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Divider, Grid, Button, IconButton } from "@mui/material";
import { PageTitle } from "../../components/PageTitle";
import { TableComponent } from "../../components/DefaultTable/TableComponent";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  getItems,
  getItemManufacturers,
  deleteItem,
} from "../../redux/operation/itemOperation";
import { getItemsSelector } from "../../redux/selector/itemSelector";
import { getLoaderSelector } from "../../redux/selector/loaderSelector";
import { Search } from "../../components/DefaultTable/Search";
import { Multiselect } from "../../components/DefaultTable/Multiselect";
import { Loader } from "../../components/Loader";
import { DialogWindow } from "./components/DialogWindow";

import columns from "./components/columns";
import { useLocation } from "react-router-dom";

export const Item = () => {
  const dispatch = useDispatch();
  const data = useSelector(getItemsSelector);
  const isLoading = useSelector(getLoaderSelector("item"));
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
    dispatch(getItemManufacturers());
  }, []);

  useEffect(() => {
    if (!params.has("page")) params.append("page", "1");
    if (isFirst) {
      params.append("filter", "true");
      setIsFirst(false);
    }
    dispatch(getItems(params.toString().replaceAll("%2C", ",")));
  }, [params.toString()]);

  return (
    <>
      <Helmet title="Item" />
      <Grid container justifyContent="space-between" alignItems="center">
        <PageTitle title={"Продукція"} />
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleOpenDialog(null)}
        >
          Додати продукцію
        </Button>
      </Grid>
      <Divider sx={{ my: 1 }} />
      <Grid container sx={{ my: 3 }}>
        <Search />
        <Multiselect
          label="Виробники"
          data={data?.manufacturer || []}
          loading={isLoading}
          urlName="manufacturerId"
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
              manufacturer: el.manufacturer.name,
              recomendedSellPrice: `${el.recomendedSellPrice} ГРН`,
              buyPrice: `${el.buyPrice} ${el.manufacturer.currency.code}`,
              delete: (
                <IconButton
                  size="small"
                  onClick={() => dispatch(deleteItem(el.id, params))}
                >
                  <DeleteIcon />
                </IconButton>
              ),
            }))}
            width={900}
            pages={data.pages || 1}
          />
        )}
      </Grid>
      <DialogWindow dialog={dialog} handleCloseDialog={handleCloseDialog} />
    </>
  );
};
