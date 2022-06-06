/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Divider, Grid, Button, IconButton } from "@mui/material";
import { PageTitle } from "../../components/PageTitle";
import { TableComponent } from "../../components/DefaultTable/TableComponent";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  getEmployees,
  getEmployeeRoles,
  getEmployeeUsers,
  deleteEmployee,
} from "../../redux/operation/employeeOperation";
import { getEmployeesSelector } from "../../redux/selector/employeeSelector";
import { getLoaderSelector } from "../../redux/selector/loaderSelector";
import { Search } from "../../components/DefaultTable/Search";
import { Multiselect } from "../../components/DefaultTable/Multiselect";
import { Loader } from "../../components/Loader";
import { DialogWindow } from "./components/DialogWindow";
import columns from "./components/columns";
import { useLocation } from "react-router-dom";
import { getUserRoleSelector } from "../../redux/selector/userSelector";

export const Employee = () => {
  const role = useSelector(getUserRoleSelector);
  const dispatch = useDispatch();
  const data = useSelector(getEmployeesSelector);
  const isLoading = useSelector(getLoaderSelector("employee"));
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
    dispatch(getEmployeeRoles());
    dispatch(getEmployeeUsers());
  }, []);

  useEffect(() => {
    if (!params.has("page")) params.append("page", "1");
    if (isFirst) {
      params.append("filter", "true");
      setIsFirst(false);
    }
    dispatch(getEmployees(params.toString()));
  }, [params.toString()]);

  return (
    <>
      <Helmet title="Employees" />
      <Grid container justifyContent="space-between" alignItems="center">
        <PageTitle title={"Штат"} />
        {role < 2 && (
          <Button
            color="primary"
            variant="contained"
            onClick={() => handleOpenDialog(null)}
          >
            Додати працівника
          </Button>
        )}
      </Grid>
      <Divider sx={{ my: 1 }} />
      <Grid container sx={{ my: 3 }}>
        <Search />
        <Multiselect
          label="Роль"
          data={data?.role || []}
          loading={isLoading}
          urlName="roleId"
        />
      </Grid>
      <Grid item xs={12}>
        {isLoading ? (
          <Grid item xs={12} sx={{ height: 400 }}>
            <Loader />
          </Grid>
        ) : (
          <TableComponent
            columns={columns
              .filter((el) => !(role > 1 && el.id === 4))
              .map((el) => {
                if (el.id === 1 && role < 2) {
                  return { ...el, callback: handleOpenDialog };
                }
                return el;
              })}
            rows={data.rows.map((el) => ({
              ...el,
              user: `${el.user.firstName} ${el.user.lastName}`,
              email: el.user.email,
              role: el.role.name,
              delete: (
                <IconButton
                  size="small"
                  onClick={() => dispatch(deleteEmployee(el.id, params))}
                >
                  <DeleteIcon />
                </IconButton>
              ),
            }))}
            width={700}
            pages={data.pages || 1}
          />
        )}
      </Grid>
      <DialogWindow dialog={dialog} handleCloseDialog={handleCloseDialog} />
    </>
  );
};
