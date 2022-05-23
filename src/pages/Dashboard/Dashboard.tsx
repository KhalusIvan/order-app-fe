/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Divider, Grid, Paper, Typography } from "@mui/material";
import { PageTitle } from "../../components/PageTitle";
import { useDispatch } from "react-redux";
import { getCustomers } from "../../redux/operation/customerOperation";
import { Pie, Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";
import { useLocation } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

let today = new Date();
let array = [];
for (let i = 0; i < 14; i++) {
  const day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
  const month =
    today.getMonth() + 1 < 10
      ? `0${today.getMonth() + 1}`
      : today.getMonth() + 1;
  array.push(`${day}.${month}`);
  today.setDate(today.getDate() - 1);
}

const labels = array.reverse();
const prices = [
  1200, 1350, 800, 1200, 5000, 12000, 8500, 4560, 4560, 12000, 12300, 1200,
  15000, 12800,
];

export const data = {
  labels,
  datasets: [
    {
      type: "line" as const,
      label: "Графік",
      borderColor: "rgb(255, 99, 132)",
      borderWidth: 2,
      fill: false,
      data: prices,
    },
    {
      type: "bar" as const,
      label: "Бари",
      backgroundColor: "rgb(75, 192, 192)",
      data: prices,
      borderColor: "white",
      borderWidth: 2,
    },
  ],
};

export const Dashboard = () => {
  const dispatch = useDispatch();
  const params = new URLSearchParams(useLocation().search);
  const [isFirst, setIsFirst] = useState<boolean>(true);

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
      <Helmet title="Dashboard" />
      <Grid container justifyContent="space-between" alignItems="center">
        <PageTitle title={"Статистика"} />
      </Grid>
      <Divider sx={{ my: 1 }} />
      <Grid container sx={{ my: 3 }}>
        <Grid item xs={6}>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Paper
                      elevation={4}
                      sx={{ py: 2, px: 4, minWidth: 1, borderRadius: 5 }}
                    >
                      <Typography variant="h6">Загальний оборот</Typography>
                      <Typography variant="h3">25000 UAH</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper
                      elevation={4}
                      sx={{ py: 2, px: 4, minWidth: 1, borderRadius: 5 }}
                    >
                      <Typography variant="h6">Витрачено коштів</Typography>
                      <Typography variant="h3">16700 UAH</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper
                      elevation={4}
                      sx={{ py: 2, px: 4, minWidth: 1, borderRadius: 5 }}
                    >
                      <Typography variant="h6">Загальний дохід</Typography>
                      <Typography variant="h3">8300 UAH</Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Paper
                  elevation={4}
                  sx={{
                    py: 2,
                    px: 4,
                    minWidth: 1,
                    minHeight: 1,
                    borderRadius: 5,
                  }}
                >
                  <Typography variant="h6">Витрати/Доходи</Typography>
                  <Pie
                    data={{
                      labels: ["Витрати", "Дохід"],
                      datasets: [
                        {
                          data: [16700, 8300],
                          backgroundColor: ["#fa908e", "#ffce73"],
                          borderColor: ["#fa4e4b", "#ffb01c"],
                          borderWidth: 1,
                        },
                      ],
                    }}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ marginTop: 20 }}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Paper
                  elevation={4}
                  sx={{
                    py: 2,
                    px: 4,
                    minWidth: 1,
                    minHeight: 1,
                    borderRadius: 5,
                  }}
                >
                  <Typography variant="h6">Найпопулярніша продукція</Typography>
                  <Pie
                    data={{
                      labels: ["1886-0051", "1586-0051"],
                      datasets: [
                        {
                          data: [16700, 8300],
                          backgroundColor: ["#fa908e", "#ffce73"],
                          borderColor: ["#fa4e4b", "#ffb01c"],
                          borderWidth: 1,
                        },
                      ],
                    }}
                  />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper
                  elevation={4}
                  sx={{
                    py: 2,
                    px: 4,
                    minWidth: 1,
                    minHeight: 1,
                    borderRadius: 5,
                  }}
                >
                  <Typography variant="h6">Працівники</Typography>
                  <Pie
                    data={{
                      labels: ["Василь Попов", "Юрій Іванов"],
                      datasets: [
                        {
                          data: [16700, 8300],
                          backgroundColor: ["#fa908e", "#ffce73"],
                          borderColor: ["#fa4e4b", "#ffb01c"],
                          borderWidth: 1,
                        },
                      ],
                    }}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid item xs={12}>
            <Paper elevation={4} sx={{ mx: 2, py: 2, px: 4, borderRadius: 5 }}>
              <Typography variant="h6">Оборот</Typography>
              <Chart type="bar" data={data} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper
              elevation={4}
              sx={{ mt: 2, mx: 2, py: 2, px: 4, borderRadius: 5 }}
            >
              <Typography variant="h6">Заробіток</Typography>
              <Chart type="bar" data={data} />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
