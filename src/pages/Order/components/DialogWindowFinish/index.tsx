import {
  getOrderByIdSelector,
  getOrderCurrencyListSelector,
} from "../../../../redux/selector/orderSelector";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Grid,
  TextField,
  IconButton,
  Tooltip,
} from "@mui/material";
import { finishOrder } from "../../../../redux/operation/orderOperation";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Item } from "../../../../types";

interface DialogProps {
  dialog: {
    open: boolean;
    id: number | null;
  };
  handleCloseDialog: () => void;
}

interface Order {
  id?: number;
  item: Item;
  sellPrice: number;
  amount: number;
  buyPrice?: number;
}

export const DialogWindowFinish = ({
  dialog,
  handleCloseDialog,
}: DialogProps) => {
  const item = useSelector(getOrderByIdSelector(dialog.id));
  const currencies =
    item?.items.map((el: Order) => ({
      code: el.item.manufacturer.currency.code,
      cost: el.buyPrice,
    })) || [];
  const currenciesList = useSelector(getOrderCurrencyListSelector).map((el) => {
    const finded = currencies.find(
      (currency: { code: string }) => currency.code === el.code
    );
    if (finded) {
      return { ...el, cost: finded.cost };
    }
    return el;
  });
  const dispatch = useDispatch();
  const params = new URLSearchParams(useLocation().search);

  return (
    <Dialog
      open={dialog.open}
      onClose={handleCloseDialog}
      maxWidth={"md"}
      fullWidth
    >
      <Formik
        initialValues={{
          currencies: currenciesList,
          order: item?.items || [],
        }}
        validationSchema={Yup.object().shape({})}
        onSubmit={(values, { setSubmitting }) => {
          const obj = {
            order: values.order.map((item: Order) => ({
              id: item.id,
              buyPrice: Math.ceil(
                values.currencies.find(
                  (el) => el.id === item.item.manufacturer.currencyId
                ).cost * item.item.buyPrice
              ),
            })),
          };
          dispatch(
            finishOrder(item.id, obj, params, setSubmitting, handleCloseDialog)
          );
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
          setFieldTouched,
        }) => {
          const buyPrice = values.order.reduce(
            (a: { sum: number }, b: Order) => ({
              sum:
                a.sum +
                Math.floor(
                  b.amount *
                    b.item.buyPrice *
                    values.currencies.find(
                      (el) => el.id === b.item.manufacturer.currencyId
                    ).cost
                ),
            }),
            { sum: 0 }
          ).sum;
          const sellPrice = values.order.reduce(
            (a: { sum: number }, b: Order) => ({
              sum: a.sum + b.amount * b.sellPrice,
            }),
            { sum: 0 }
          ).sum;
          return (
            <>
              <DialogTitle id="alert-dialog-title">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Проведження замовлення</span>
                  <div style={{ display: "flex" }}>
                    {values.currencies
                      .filter((el) => {
                        const ids = values.order.map(
                          (el: {
                            item: { manufacturer: { currencyId: number } };
                          }) => el.item.manufacturer.currencyId
                        );
                        return ids.includes(el.id) && el.code !== "UAH";
                      })
                      .map((el) => (
                        <TextField
                          style={{ width: 100, margin: "0 10px" }}
                          key={el.id}
                          label={el.code}
                          value={values.currencies[el.index].cost}
                          type="number"
                          onBlur={(e) => {
                            setFieldTouched(`currencies.${el.index}.cost`);
                          }}
                          onChange={(e) => {
                            setFieldValue(
                              `currencies.${el.index}.cost`,
                              e.target.value
                            );
                            if (e.target.value) {
                              setFieldValue(
                                "order",
                                values.order.map((ord: Order) => {
                                  return ord;
                                })
                              );
                            }
                          }}
                        />
                      ))}
                  </div>
                </div>
              </DialogTitle>
              <form style={{ height: "100%" }} onSubmit={handleSubmit}>
                <DialogContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        {values.order.length > 0 && (
                          <Grid container>
                            <Grid
                              item
                              xs={2}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                textAlign: "center",
                              }}
                            >
                              <span>Код</span>
                            </Grid>
                            <Grid
                              item
                              xs={2}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                textAlign: "center",
                              }}
                            >
                              <span>Назва</span>
                            </Grid>
                            <Grid
                              item
                              xs={2}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                textAlign: "center",
                              }}
                            >
                              <span>Кількість</span>
                            </Grid>
                            <Grid
                              item
                              xs={2}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                textAlign: "center",
                              }}
                            >
                              <span>Рекомендована ціна</span>
                            </Grid>
                            <Grid
                              item
                              xs={2}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                textAlign: "center",
                              }}
                            >
                              <span>Ціна</span>
                            </Grid>
                            <Grid
                              item
                              xs={1}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                textAlign: "center",
                              }}
                            >
                              <span>Сума</span>
                            </Grid>
                          </Grid>
                        )}
                        {values.order.map((el: Order, index: number) => {
                          const totalPrice = el.amount * el.sellPrice;
                          return (
                            <Grid item xs={12} key={index} alignItems="center">
                              <Grid container>
                                <Grid
                                  item
                                  xs={2}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  {el.item.code}
                                </Grid>
                                <Grid
                                  item
                                  xs={2}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Tooltip title={el.item.name}>
                                    <span
                                      style={{
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                      }}
                                    >
                                      {el.item.name}
                                    </span>
                                  </Tooltip>
                                </Grid>
                                <Grid
                                  item
                                  xs={2}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <TextField
                                    style={{ width: 70, margin: "0 10px" }}
                                    value={el.amount}
                                    disabled={true}
                                    type="number"
                                    onBlur={(e) => {
                                      setFieldTouched(`order.${index}.amount`);
                                    }}
                                    onChange={(e) => {
                                      setFieldValue(
                                        `order.${index}.amount`,
                                        e.target.value
                                      );
                                    }}
                                  />
                                </Grid>
                                <Grid
                                  item
                                  xs={2}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  {el.item.recomendedSellPrice}{" "}
                                  {el.item.manufacturer.currency.code}
                                </Grid>
                                <Grid
                                  item
                                  xs={2}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <TextField
                                    style={{ width: 100, margin: "0 10px" }}
                                    disabled={true}
                                    value={el.sellPrice}
                                    type="number"
                                    onBlur={(e) => {
                                      setFieldTouched(
                                        `order.${index}.sellPrice`
                                      );
                                    }}
                                    onChange={(e) => {
                                      setFieldValue(
                                        `order.${index}.sellPrice`,
                                        e.target.value
                                      );
                                    }}
                                  />
                                </Grid>
                                <Grid
                                  item
                                  xs={1}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  {totalPrice}
                                </Grid>
                                <Grid
                                  item
                                  xs={1}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <IconButton
                                    size="small"
                                    disabled={true}
                                    onClick={() => {
                                      const prev = [...values.order];
                                      prev.splice(index, 1);
                                      setFieldValue("order", prev);
                                    }}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </Grid>
                              </Grid>
                            </Grid>
                          );
                        })}
                      </Grid>
                      {values.order.length > 0 && (
                        <Grid item xs={12} style={{ marginTop: 10 }}>
                          <Grid container>
                            <Grid item xs={4} style={{ textAlign: "center" }}>
                              Закупка: {buyPrice} UAH
                            </Grid>
                            <Grid item xs={4} style={{ textAlign: "center" }}>
                              Заробіток: {sellPrice - buyPrice} UAH
                            </Grid>
                            <Grid item xs={4} style={{ textAlign: "center" }}>
                              Загальна сума: {sellPrice} UAH
                            </Grid>
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    color="primary"
                    variant="contained"
                  >
                    {isSubmitting ? <CircularProgress size={20} /> : "Провести"}
                  </Button>
                </DialogActions>
              </form>
            </>
          );
        }}
      </Formik>
    </Dialog>
  );
};
