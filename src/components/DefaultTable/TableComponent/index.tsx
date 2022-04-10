import {
  styled,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

interface TableComponentProps {
  columns: {
    id: number;
    title: string;
    object: string;
    callback?: (id: number | null) => void;
  }[];
  rows: { id: number; [key: string]: any }[];
  width?: number;
  pages?: number;
}

export const TableComponent = ({
  columns,
  rows,
  width,
  pages,
}: TableComponentProps) => {
  const params = new URLSearchParams(useLocation().search);
  const history = useHistory();
  const page = params.has("page") ? Number(params.get("page")) : 1;

  return (
    <TableContainer sx={{ width: width || "100%" }} component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns.map((el) => (
              <TableCell align="center" key={el.id}>
                {el.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              {columns.map((el) => {
                if (el.callback) {
                  return (
                    <TableCell align="center" key={el.id}>
                      <span
                        onClick={() => el.callback && el.callback(row.id)}
                        style={{
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        {row[el.object]}
                      </span>
                    </TableCell>
                  );
                }
                return (
                  <TableCell align="center" key={el.id}>
                    <>{row[el.object]}</>
                  </TableCell>
                );
              })}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        sx={{
          width: width || "100%",
          display: "flex",
          justifyContent: "center",
          my: 1,
        }}
        count={pages}
        page={+page}
        onChange={(e, newPage) => {
          params.delete("page");
          if (newPage > 1) params.append("page", `${newPage}`);
          history.push({ search: params.toString() });
        }}
        variant="outlined"
        color="primary"
        showFirstButton
        showLastButton
      />
    </TableContainer>
  );
};
