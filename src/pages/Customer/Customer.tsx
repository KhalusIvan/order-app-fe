/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Divider, Grid, Button, IconButton } from "@mui/material";
import { PageTitle } from "../../components/PageTitle";
import { TableComponent } from "../../components/DefaultTable/TableComponent";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomers,
  deleteCustomer,
} from "../../redux/operation/customerOperation";
import { getCustomersSelector } from "../../redux/selector/customerSelector";
import { getLoaderSelector } from "../../redux/selector/loaderSelector";
import { Search } from "../../components/DefaultTable/Search";
import { Loader } from "../../components/Loader";
import { DialogWindow } from "./components/DialogWindow";
import columns from "./components/columns";
import { useLocation } from "react-router-dom";

export const Customer = () => {
  const dispatch = useDispatch();
  const data = useSelector(getCustomersSelector);
  const isLoading = useSelector(getLoaderSelector("customer"));
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
    //dispatch(getCustomerManufacturers());
  }, []);

  useEffect(() => {
    if (!params.has("page")) params.append("page", "1");
    if (isFirst) {
      params.append("filter", "true");
      setIsFirst(false);
    }
    dispatch(getCustomers(params.toString().replaceAll("%2C", ",")));
  }, [params.toString()]);

  return (
    <>
      <Helmet title="Customer" />
      <Grid container justifyContent="space-between" alignItems="center">
        <PageTitle title={"Покупці"} />
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleOpenDialog(null)}
        >
          Додати покупця
        </Button>
      </Grid>
      <Divider sx={{ my: 1 }} />
      <Grid container sx={{ my: 3 }}>
        <Search />
        {/*<Multiselect
          label="Виробники"
          data={data?.manufacturer || []}
          loading={isLoading}
          urlName="manufacturerId"
        />*/}
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
              name: `${el.lastName} ${el.firstName}${
                el.middleName ? " " + el.middleName : ""
              }`,
              delete: (
                <IconButton
                  size="small"
                  onClick={() => dispatch(deleteCustomer(el.id, params))}
                >
                  <DeleteIcon />
                </IconButton>
              ),
            }))}
            width={800}
            pages={data.pages || 1}
          />
        )}
      </Grid>
      <DialogWindow dialog={dialog} handleCloseDialog={handleCloseDialog} />
    </>
  );
};
