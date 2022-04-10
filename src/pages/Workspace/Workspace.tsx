/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Divider, Grid, Button, IconButton } from "@mui/material";
import { PageTitle } from "../../components/PageTitle";
import { TableComponent } from "../../components/DefaultTable/TableComponent";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  getWorkspaces,
  deleteWorkspace,
} from "../../redux/operation/workspaceOperation";
import { getWorkspacesSelector } from "../../redux/selector/workspaceSelector";
import { getLoaderSelector } from "../../redux/selector/loaderSelector";
import { Search } from "../../components/DefaultTable/Search";
import { Loader } from "../../components/Loader";
import { DialogWindow } from "./components/DialogWindow";

import columns from "./components/columns";
import { useLocation } from "react-router-dom";

export const Workspace = () => {
  const dispatch = useDispatch();
  const data = useSelector(getWorkspacesSelector);
  const isLoading = useSelector(getLoaderSelector("workspace"));
  const params = new URLSearchParams(useLocation().search);
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
    if (!params.has("page")) params.append("page", "1");
    dispatch(getWorkspaces(params.toString().replaceAll("%2C", ",")));
  }, [params.toString()]);

  return (
    <>
      <Helmet title="Workspace" />
      <Grid container justifyContent="space-between" alignItems="center">
        <PageTitle title={"Простір"} />
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleOpenDialog(null)}
        >
          Додати простір
        </Button>
      </Grid>
      <Divider sx={{ my: 1 }} />
      <Grid container sx={{ my: 3 }}>
        <Search />
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
              roleName: el.role.name,
              name: el.workspace.name,
              delete: (
                <IconButton
                  size="small"
                  onClick={() => dispatch(deleteWorkspace(el.id, params))}
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
