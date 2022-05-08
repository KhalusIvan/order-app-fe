import {
  getOrderByIdSelector,
  getOrderPaymentListSelector,
  getOrderStatusListSelector,
  getOrderCustomerListSelector,
  getOrderCurrencyListSelector,
  getOrderItemListSelector,
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
  FormControlLabel,
  Checkbox,
  TextField,
  IconButton,
  Tooltip,
} from "@mui/material";
import { CustomTextField } from "../../../../components/Inputs/CustomTextField";
import { CustomAutocomplete } from "../../../../components/Inputs/CustomAutocomplete";
import { CustomerAutocomplete } from "./CustomerAutocomplete";
import { ItemAutocomplete } from "./ItemAutocomplete";
import {
  createOrder,
  updateOrder,
} from "../../../../redux/operation/orderOperation";
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
  item: Item;
  sellPrice: number;
  amount: number;
}

export const DialogWindow = ({ dialog, handleCloseDialog }: DialogProps) => {
  const item = useSelector(getOrderByIdSelector(dialog.id));
  const payments = useSelector(getOrderPaymentListSelector);
  const statuses = useSelector(getOrderStatusListSelector);
  const customers = useSelector(getOrderCustomerListSelector);
  const currenciesList = useSelector(getOrderCurrencyListSelector);
  const items = useSelector(getOrderItemListSelector);
  const dispatch = useDispatch();
  const params = new URLSearchParams(useLocation().search);

  return (
    <Dialog
      open={dialog.open}
      onClose={handleCloseDialog}
      maxWidth={"xl"}
      fullWidth
    >
      <Formik
        initialValues={{
          status: item?.status || null,
          payment: item?.payment || null,
          customer: item?.customer || null,
          telephone: item?.customer?.telephone || "",
          firstName: item?.customer?.firstName || "",
          lastName: item?.customer?.lastName || "",
          middleName: item?.customer?.middleName || "",
          city: item?.customer?.city || "",
          postOffice: item?.customer?.postOffice || "",
          updateCustomer: true,
          currencies: currenciesList,
          items: [],
          currentItem: null,
          order: [],
        }}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().required("Обов'язкове поле!"),
          lastName: Yup.string().required("Обов'язкове поле!"),
          city: Yup.string().required("Обов'язкове поле!"),
          postOffice: Yup.string().required("Обов'язкове поле!"),
          telephone: Yup.string()
            .min(13, "Некоректний телефон!")
            .max(13, "Некоректний телефон!")
            .required("Обов'язкове поле!"),
          status: Yup.object().required("Обов'язкове поле!"),
          payment: Yup.object().required("Обов'язкове поле!"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          const obj = {
            firstName: values.firstName,
            lastName: values.lastName,
            middleName: values.middleName,
            city: values.city,
            postOffice: values.postOffice,
            telephone: values.telephone,
            customerId: values.customer?.id,
            statusId: values.status.id,
            paymentId: values.payment.id,
            updateCustomer: values.updateCustomer,
          };
          if (item) {
            dispatch(
              updateOrder(
                item.id,
                obj,
                params,
                setSubmitting,
                handleCloseDialog
              )
            );
          } else {
            dispatch(
              createOrder(obj, params, setSubmitting, handleCloseDialog)
            );
          }
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
        }) => (
          <>
            <DialogTitle id="alert-dialog-title">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>
                  {dialog.id
                    ? "Редагування замовлення"
                    : "Створення замовлення"}
                </span>
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
                                if (
                                  ord.item.manufacturer.currencyId === el.id
                                ) {
                                  return {
                                    ...ord,
                                    sellPrice: Math.ceil(
                                      ord.item.recomendedSellPrice *
                                        +e.target.value
                                    ),
                                  };
                                }
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
                  <Grid item xs={6}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <CustomerAutocomplete
                          inputValue={values.telephone}
                          label="Телефон"
                          placeholder="Введіть телефон"
                          name="customer"
                          fieldTouchName="telephone"
                          value={values.customer}
                          error={Boolean(touched.telephone && errors.telephone)}
                          loading={false}
                          options={customers}
                          setFieldValue={setFieldValue}
                          setFieldTouched={setFieldTouched}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <CustomTextField
                          label="Ім'я"
                          placeholder="Введіть iм'я"
                          value={values.firstName}
                          name="firstName"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={Boolean(touched.firstName && errors.firstName)}
                          helperText={
                            (
                              touched.firstName && errors.firstName
                            )?.toString() || ""
                          }
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <CustomTextField
                          label="Фамілія"
                          placeholder="Введіть фамілію"
                          value={values.lastName}
                          name="lastName"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={Boolean(touched.lastName && errors.lastName)}
                          helperText={
                            (touched.lastName && errors.lastName)?.toString() ||
                            ""
                          }
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <CustomTextField
                          label="По-батькові"
                          placeholder="Введіть по-батькові"
                          value={values.middleName}
                          name="middleName"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={Boolean(
                            touched.middleName && errors.middleName
                          )}
                          helperText={
                            (
                              touched.middleName && errors.middleName
                            )?.toString() || ""
                          }
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <CustomTextField
                          label="Місто"
                          placeholder="Введіть місто"
                          value={values.city}
                          name="city"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={Boolean(touched.city && errors.city)}
                          helperText={
                            (touched.city && errors.city)?.toString() || ""
                          }
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <CustomTextField
                          label="Поштове відділення"
                          placeholder="Введіть відділення"
                          value={values.postOffice}
                          name="postOffice"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={Boolean(
                            touched.postOffice && errors.postOffice
                          )}
                          helperText={
                            (
                              touched.postOffice && errors.postOffice
                            )?.toString() || ""
                          }
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <CustomAutocomplete
                          label="Статус"
                          placeholder="Виберіть статус"
                          name="status"
                          value={values.status}
                          error={Boolean(touched.status && errors.status)}
                          loading={false}
                          options={statuses}
                          setFieldValue={setFieldValue}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <CustomAutocomplete
                          label="Спосіб оплати"
                          placeholder="Виберіть спосіб оплати"
                          name="payment"
                          value={values.payment}
                          error={Boolean(touched.payment && errors.payment)}
                          loading={false}
                          options={payments}
                          setFieldValue={setFieldValue}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={values.updateCustomer}
                              onChange={(e) =>
                                setFieldValue(
                                  "updateCustomer",
                                  e.target.checked
                                )
                              }
                            />
                          }
                          label="Оновити покупця"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <ItemAutocomplete
                          loading={false}
                          label="Товар"
                          placeholder="Виберіть товар"
                          name="currentItem"
                          value={values.currentItem}
                          options={items}
                          setFieldValue={setFieldValue}
                          onBlur={handleBlur}
                          error={false}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          style={{ width: "100%", marginTop: 48 }}
                          disabled={!values.currentItem}
                          onClick={() => {
                            const newValue = values.currentItem || {
                              manufacturer: { currencyId: 0 },
                              recomendedSellPrice: 0,
                            };

                            setFieldValue("order", [
                              ...values.order,
                              {
                                item: values.currentItem,
                                amount: 1,
                                sellPrice: Math.ceil(
                                  values.currencies.find(
                                    (el) =>
                                      el.id ===
                                      newValue?.manufacturer?.currencyId
                                  ).cost * newValue?.recomendedSellPrice
                                ),
                              },
                            ]);
                            setFieldValue("currentItem", null);
                          }}
                          color="primary"
                          variant="contained"
                        >
                          Додати товар
                        </Button>
                      </Grid>
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
                      {values.order.map((el: Order, index) => {
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
                                  value={el.sellPrice}
                                  type="number"
                                  onBlur={(e) => {
                                    setFieldTouched(`order.${index}.sellPrice`);
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
                          <Grid item xs={6} style={{ textAlign: "center" }}>
                            Заробіток:{" "}
                            {
                              values.order.reduce(
                                (a, b: Order) => ({
                                  sum:
                                    a.sum +
                                    Math.floor(
                                      b.amount * b.sellPrice -
                                        b.amount *
                                          b.item.buyPrice *
                                          values.currencies.find(
                                            (el) =>
                                              el.id ===
                                              b.item.manufacturer.currencyId
                                          ).cost
                                    ),
                                }),
                                { sum: 0 }
                              ).sum
                            }{" "}
                            UAH{" "}
                          </Grid>
                          <Grid item xs={6} style={{ textAlign: "center" }}>
                            Загальна сума:{" "}
                            {
                              values.order.reduce(
                                (a, b: Order) => ({
                                  sum: a.sum + b.amount * b.sellPrice,
                                }),
                                { sum: 0 }
                              ).sum
                            }{" "}
                            UAH
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
                  {isSubmitting ? (
                    <CircularProgress size={20} />
                  ) : dialog.id ? (
                    "Оновити"
                  ) : (
                    "Додати"
                  )}
                </Button>
              </DialogActions>
            </form>
          </>
        )}
      </Formik>
    </Dialog>
  );
};
