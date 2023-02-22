import { Sidebar as SB, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";

import { Dashboard, Users } from "./sidebarData";

import { tokens } from "../../../theme";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import ProfileImage from "../../../assets/user.png";
import Item from "./SidebarItem";
import { Clients } from "./sidebarData";
import { Quotes } from "./sidebarData";
import { useState } from "react";

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selected, setSelected] = useState("Dashboard");

  const { collapsed, collapseSidebar } = useProSidebar();

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
            {Dashboard.map((el) => (
              <Item title={el.title} to={el.to} icon={<el.icon />} selected={selected} setSelected={setSelected} />
            ))}

            <Typography m="20px">Usuarios</Typography>
            {Users.map((el) => (
              <Item title={el.title} to={el.to} icon={<el.icon />} selected={selected} setSelected={setSelected} />
            ))}

            <Typography m="20px">Clientes</Typography>
            {Clients.map((el) => (
              <Item title={el.title} to={el.to} icon={<el.icon />} selected={selected} setSelected={setSelected} />
            ))}

            <Typography m="20px">Presupuestos</Typography>
            {Quotes.map((el) => (
              <Item title={el.title} to={el.to} icon={<el.icon />} selected={selected} setSelected={setSelected} />
            ))}
          </Box>
        </Menu>
      </SB>
    </Box>
  );
};
export default Sidebar;
