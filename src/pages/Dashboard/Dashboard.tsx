/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Divider, Grid, Paper, Typography } from "@mui/material";
import { PageTitle } from "../../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { getStatistics } from "../../redux/operation/statisticOperation";
import { getStatisticsSelector } from "../../redux/selector/statisticSelector";
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

export const Dashboard = () => {
  const dispatch = useDispatch();
  const statistic = useSelector(getStatisticsSelector);

  const generalSell = statistic.general.reduce(
    (prev, curr) => ({ sell: +prev.sell + +curr.sell }),
    { sell: 0 }
  ).sell;
  const generalBuy = statistic.general.reduce(
    (prev, curr) => ({ buy: +prev.buy + +curr.buy }),
    { buy: 0 }
  ).buy;

  const validGeneral = statistic.general.map((el) => ({
    ...el,
    date: `${el.date.split("-")[2]}.${el.date.split("-")[1]}`,
  }));

  const data = {
    labels,
    datasets: [
      {
        type: "line" as const,
        label: "Графік",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 2,
        fill: false,
        data: labels.map(
          (el) => validGeneral.find((gen) => gen.date === el)?.sell || 0
        ),
      },
      {
        type: "bar" as const,
        label: "Бари",
        backgroundColor: "rgb(75, 192, 192)",
        data: labels.map(
          (el) => validGeneral.find((gen) => gen.date === el)?.sell || 0
        ),
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };

  const dataProfit = {
    labels,
    datasets: [
      {
        type: "line" as const,
        label: "Графік",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 2,
        fill: false,
        data: labels.map((el) => {
          const finded = validGeneral.find((gen) => gen.date === el);
          if (finded) {
            return +finded.sell - +finded.buy;
          }
          return 0;
        }),
      },
      {
        type: "bar" as const,
        label: "Бари",
        backgroundColor: "rgb(75, 192, 192)",
        data: labels.map((el) => {
          const finded = validGeneral.find((gen) => gen.date === el);
          if (finded) {
            return +finded.sell - +finded.buy;
          }
          return 0;
        }),
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };

  useEffect(() => {
    dispatch(getStatistics());
  }, []);

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
                      <Typography variant="h3">{generalSell} UAH</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper
                      elevation={4}
                      sx={{ py: 2, px: 4, minWidth: 1, borderRadius: 5 }}
                    >
                      <Typography variant="h6">Витрачено коштів</Typography>
                      <Typography variant="h3">{generalBuy} UAH</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper
                      elevation={4}
                      sx={{ py: 2, px: 4, minWidth: 1, borderRadius: 5 }}
                    >
                      <Typography variant="h6">Загальний дохід</Typography>
                      <Typography variant="h3">
                        {generalSell - generalBuy} UAH
                      </Typography>
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
                          data: [generalBuy, generalSell - generalBuy],
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
                      labels: statistic.items.map((el) => el.item.code),
                      datasets: [
                        {
                          data: statistic.items.map((el) => +el.number),
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
                      labels: statistic.saler.map(
                        (el) => `${el.user.firstName} ${el.user.lastName}`
                      ),
                      datasets: [
                        {
                          data: statistic.saler.map((el) => +el.sell),
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
              <Chart type="bar" data={dataProfit} />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
