import * as React from "react";
import PropTypes from "prop-types";
import { useTheme, styled } from "@mui/material/styles";
import Popper, { PopperProps } from "@mui/material/Popper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
import ButtonBase from "@mui/material/ButtonBase";
import Grid from "@mui/material/Grid";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import { useHistory, useLocation } from "react-router-dom";

const StyledAutocompletePopper = styled("div")(({ theme }) => ({
  [`& .${autocompleteClasses.paper}`]: {
    boxShadow: "none",
    margin: 0,
    color: "inherit",
    fontSize: 13,
  },
  [`& .${autocompleteClasses.listbox}`]: {
    backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1c2128",
    padding: 0,
    [`& .${autocompleteClasses.option}`]: {
      minHeight: "auto",
      alignItems: "flex-start",
      padding: 8,
      borderBottom: `1px solid  ${
        theme.palette.mode === "light" ? " #eaecef" : "#30363d"
      }`,
      '&[aria-selected="true"]': {
        backgroundColor: "transparent",
      },
      '&[data-focus="true"], &[data-focus="true"][aria-selected="true"]': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  },
  [`&.${autocompleteClasses.popperDisablePortal}`]: {
    position: "relative",
  },
}));

function PopperComponent(props: PopperProps) {
  const { disablePortal, anchorEl, open, ...other } = props;
  return <StyledAutocompletePopper {...other} />;
}

PopperComponent.propTypes = {
  anchorEl: PropTypes.any,
  disablePortal: PropTypes.bool,
  open: PropTypes.bool.isRequired,
};

const StyledPopper = styled(Popper)(({ theme }) => ({
  border: `1px solid ${theme.palette.mode === "light" ? "#e1e4e8" : "#30363d"}`,
  boxShadow: `0 8px 24px ${
    theme.palette.mode === "light" ? "rgba(149, 157, 165, 0.2)" : "rgb(1, 4, 9)"
  }`,
  borderRadius: 6,
  width: 300,
  zIndex: theme.zIndex.modal,
  fontSize: 13,
  color: theme.palette.mode === "light" ? "#24292e" : "#c9d1d9",
  backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1c2128",
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  padding: 10,
  width: "100%",
  borderBottom: `1px solid ${
    theme.palette.mode === "light" ? "#eaecef" : "#30363d"
  }`,
  "& input": {
    borderRadius: 4,
    backgroundColor: theme.palette.mode === "light" ? "#fff" : "#0d1117",
    padding: 8,
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    border: `1px solid ${
      theme.palette.mode === "light" ? "#eaecef" : "#30363d"
    }`,
    fontSize: 14,
    "&:focus": {
      boxShadow: `0px 0px 0px 3px ${
        theme.palette.mode === "light"
          ? "rgba(3, 102, 214, 0.3)"
          : "rgb(12, 45, 107)"
      }`,
      borderColor: theme.palette.mode === "light" ? "#0366d6" : "#388bfd",
    },
  },
}));

const Button = styled(ButtonBase)(({ theme }) => ({
  fontSize: 13,
  width: "100%",
  textAlign: "left",
  paddingBottom: 8,
  color: theme.palette.mode === "light" ? "#586069" : "#8b949e",
  fontWeight: 600,
  "&:hover,&:focus": {
    color: theme.palette.mode === "light" ? "#0366d6" : "#58a6ff",
  },
  "& span": {
    width: "100%",
  },
  "& svg": {
    width: 16,
    height: 16,
  },
}));

type DataType = { id: number; name: string; number: number };

interface MultiselectProps {
  label: string;
  data: DataType[];
  loading: boolean;
  urlName: string;
}

export const Multiselect = ({
  label,
  data,
  loading,
  urlName,
}: MultiselectProps) => {
  const params = new URLSearchParams(useLocation().search);
  const fromUrl =
    params
      .get(urlName)
      ?.split(",")
      .map((el) => +el) || [];
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [pendingValue, setPendingValue] = React.useState<number[]>(fromUrl);
  const theme = useTheme();
  const history = useHistory();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPendingValue(fromUrl);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
    params.delete(urlName);
    params.delete("page");
    if (pendingValue.length > 0) params.append(urlName, pendingValue.join(","));
    history.push({ search: params.toString() });
  };

  const open = Boolean(anchorEl);
  const id = open ? "github-label" : undefined;

  return (
    <React.Fragment>
      <Box
        sx={{ width: 180, fontSize: 15, mx: 2, height: 32 }}
        style={{ borderBottom: "1px solid black" }}
      >
        <Button
          disableRipple
          aria-describedby={id}
          onClick={handleClick}
          sx={{ my: 1 }}
        >
          <span
            style={{
              opacity: fromUrl.length > 0 ? 1 : 0.5,
              fontWeight: 300,
              fontSize: 15,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {fromUrl.length > 0
              ? data
                  .filter((el) => fromUrl.includes(el.id))
                  .map((el) => el.name)
                  ?.join(", ")
              : label}
          </span>
          {!!anchorEl ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </Button>
      </Box>
      <StyledPopper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
      >
        <ClickAwayListener onClickAway={handleClose}>
          <div>
            <Autocomplete
              open
              multiple
              onClose={(event, reason) => {
                if (reason === "escape") {
                  handleClose();
                }
              }}
              value={data.filter((el) => pendingValue.includes(el.id))}
              onChange={(event, newValue, reason) => {
                if (event.type === "keydown" && reason === "removeOption") {
                  return;
                }
                setPendingValue(newValue.map((el) => el.id));
              }}
              disableCloseOnSelect
              PopperComponent={PopperComponent}
              renderTags={() => null}
              noOptionsText="Нічого не знайдено"
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Box
                    component={DoneIcon}
                    sx={{ width: 17, height: 17, mr: "5px", ml: "-2px" }}
                    style={{
                      visibility: selected ? "visible" : "hidden",
                    }}
                  />
                  <Box
                    component="span"
                    sx={{
                      width: 14,
                      height: 14,
                      flexShrink: 0,
                      borderRadius: "3px",
                      mr: 1,
                      mt: "2px",
                    }}
                  />
                  <Grid
                    container
                    justifyContent="space-between"
                    sx={{
                      flexGrow: 1,
                      "& span": {
                        color:
                          theme.palette.mode === "light"
                            ? "#586069"
                            : "#8b949e",
                      },
                      mr: 3,
                    }}
                  >
                    {option.name}
                    <span>{option.number}</span>
                  </Grid>
                  <Box
                    component={CloseIcon}
                    sx={{ opacity: 0.6, width: 18, height: 18 }}
                    style={{
                      visibility: selected ? "visible" : "hidden",
                    }}
                  />
                </li>
              )}
              options={[...data].sort((a, b) => {
                // Display the selected labels first.
                let ai = fromUrl.findIndex((el: number) => el === a.id);
                ai = ai === -1 ? fromUrl.length + data.indexOf(a) : ai;
                let bi = fromUrl.findIndex((el: number) => el === b.id);
                bi = bi === -1 ? fromUrl.length + data.indexOf(b) : bi;
                return ai - bi;
              })}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <StyledInput
                  ref={params.InputProps.ref}
                  inputProps={params.inputProps}
                  autoFocus
                  placeholder="Пошук"
                />
              )}
            />
          </div>
        </ClickAwayListener>
      </StyledPopper>
    </React.Fragment>
  );
};
