import { ReactNode, useState } from "react";

import { Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import { MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";

interface ItemProps {
  title: string;
  to: string;
  icon: ReactNode;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const Item = ({ title, to, icon, selected, setSelected }: ItemProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      component={<Link to={to} />}
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={setSelected ? () => setSelected(title) : undefined}
      icon={icon}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

export default Item;
