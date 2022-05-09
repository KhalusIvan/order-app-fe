/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Divider, Grid, Button, IconButton } from "@mui/material";
import { PageTitle } from "../../components/PageTitle";
import { TableComponent } from "../../components/DefaultTable/TableComponent";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrders,
  deleteOrder,
  getOrderPayments,
  getOrderCustomers,
  getOrderStatuses,
  getOrderCurrencies,
  getOrderItems,
} from "../../redux/operation/orderOperation";
import { getOrdersSelector } from "../../redux/selector/orderSelector";
import { getLoaderSelector } from "../../redux/selector/loaderSelector";
import { Search } from "../../components/DefaultTable/Search";
import { Multiselect } from "../../components/DefaultTable/Multiselect";
import { Loader } from "../../components/Loader";
import { DialogWindow } from "./components/DialogWindow";
import { DialogWindowFinish } from "./components/DialogWindowFinish";
import DoneIcon from "@mui/icons-material/Done";
import columns from "./components/columns";
import { useLocation } from "react-router-dom";

const getDate = (inputDate: string) => {
  const date = new Date(inputDate);

  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1; // Months start at 0!
  let dd = date.getDate();

  return `${dd < 10 ? "0" + dd : dd}.${mm < 10 ? "0" + mm : mm}.${yyyy}`;
};

export const Order = () => {
  const dispatch = useDispatch();
  const data = useSelector(getOrdersSelector);
  const isLoading = useSelector(getLoaderSelector("order"));
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

  const [doneDialog, setDoneDialog] = useState<{
    open: boolean;
    id: number | null;
  }>({
    open: false,
    id: null,
  });
  const handleOpenDoneDialog = (id: number | null) => {
    setDoneDialog({ open: true, id });
  };
  const handleCloseDoneDialog = () => {
    setDoneDialog({ open: false, id: dialog.id });
  };

  useEffect(() => {
    dispatch(getOrderPayments());
    dispatch(getOrderItems());
    dispatch(getOrderCustomers());
    dispatch(getOrderCurrencies());
    dispatch(getOrderStatuses());
  }, []);

  useEffect(() => {
    if (!params.has("page")) params.append("page", "1");
    if (isFirst) {
      params.append("filter", "true");
      setIsFirst(false);
    }
    dispatch(getOrders(params.toString().replaceAll("%2C", ",")));
  }, [params.toString()]);

  return (
    <>
      <Helmet title="Order" />
      <Grid container justifyContent="space-between" alignItems="center">
        <PageTitle title={"Замовлення"} />
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleOpenDialog(null)}
        >
          Додати замовлення
        </Button>
      </Grid>
      <Divider sx={{ my: 1 }} />
      <Grid container sx={{ my: 3 }}>
        <Search />
        <Multiselect
          label="Статус"
          data={data?.status || []}
          loading={isLoading}
          urlName="statusId"
        />
        <Multiselect
          label="Спосіб оплати"
          data={data?.payment || []}
          loading={isLoading}
          urlName="paymentId"
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
              number: el.id,
              date: getDate(el.createdAt),
              customer: `${el.firstName} ${el.lastName}`,
              user: `${el.user.firstName} ${el.user.lastName}`,
              city: el.city,
              postOffice: el.postOffice,
              payment: el.payment.name,
              status: el.status.name,
              delete: (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {!el.status.finish && (
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDoneDialog(el.id)}
                    >
                      <DoneIcon />
                    </IconButton>
                  )}
                  <IconButton
                    size="small"
                    onClick={() => dispatch(deleteOrder(el.id, params))}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              ),
            }))}
            width={950}
            pages={data.pages || 1}
          />
        )}
      </Grid>
      <DialogWindow dialog={dialog} handleCloseDialog={handleCloseDialog} />
      <DialogWindowFinish
        dialog={doneDialog}
        handleCloseDialog={handleCloseDoneDialog}
      />
    </>
  );
};
