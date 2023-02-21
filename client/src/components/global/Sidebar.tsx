import { ReactNode, useState } from "react";
import { Sidebar as SB, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlined from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import ProfileImage from "../../assets/user.png";

interface ItemProps {
  title: string;
  to: string;
  icon: ReactNode;
  selected?: string;
  setSelected?: React.Dispatch<React.SetStateAction<string>>;
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

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { collapsed, collapseSidebar } = useProSidebar();
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        background: colors.primary[400],
        "& .ps-menu-button:hover": {
          color: "#6870fa !important",
        },
      }}
    >
      <SB backgroundColor={colors.primary[400]}>
        <Menu
          menuItemStyles={{
            button: ({ level, active }) => {
              if (level === 0)
                return {
                  backgroundColor: active ? "#6870fa" : undefined,
                };
            },
          }}
        >
          <MenuItem onClick={() => collapseSidebar()} icon={collapsed && <MenuOutlinedIcon />}>
            {!collapsed && (
              <Box display="flex" alignItems="center" justifyContent="space-between" ml="15px">
                <Typography variant="h3" color={colors.grey[100]}>
                  SERVICE PRIETO
                </Typography>
                <IconButton>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* User */}
          {!collapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="Profile User"
                  width="100px"
                  height="100px"
                  src={ProfileImage}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{ marginTop: "10px" }}>
                  Raúl Prieto
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Administrador
                </Typography>
              </Box>
            </Box>
          )}

          {/* Menu Items */}
          <Box>
            <Item title="Dashboard" to="/" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item
              title="Manage Team"
              to="/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Contacts Information"
              to="/contacts"
              icon={<ContactsOutlined />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Invoices Balances"
              to="/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Profile Form"
              to="/form"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item title="Sign out" to="/signout" icon={<LogoutIcon />} />
          </Box>
        </Menu>
      </SB>
    </Box>
  );
};
export default Sidebar;
