import { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import Header from "../../components/Header";

import { AdminPanelSettingsOutlined, LockClockOutlined, SecurityOutlined } from "@mui/icons-material";
import axios from "axios";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/users").then((res) => setUsers(res.data));
  }, []);

  console.log(users);

  const columns: GridColDef[] = [
    { field: "dni", headerName: "DNI", flex: 0.5 },
    { field: "name", headerName: "Nombre", flex: 1 },
    { field: "lastName", headerName: "Apellido", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "phoneNumber",
      headerName: "Número de teléfono",
      type: "number",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    { field: "address", headerName: "Dirección", flex: 1 },
    { field: "location", headerName: "Localidad", flex: 1 },
    { field: "department", headerName: "Departamento", flex: 1 },
    { field: "province", headerName: "Provincia", flex: 1 },
    {
      field: "admin",
      headerName: "Permisos",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row: { admin } }) => {
        return (
          <Box
            width="60%"
            margin="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            bgcolor={admin ? colors.greenAccent[600] : colors.greenAccent[700]}
            borderRadius="4px"
          >
            {admin ? <AdminPanelSettingsOutlined /> : <LockClockOutlined />}
            <Typography color={colors.grey[100]} ml="5px">
              {admin ? "Admin" : "Usuario"}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the team members" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            background: colors.blueAccent[700],
            border: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            background: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            background: colors.blueAccent[700],
            border: "none",
          },
        }}
      >
        <DataGrid getRowId={(row) => row.dni} rows={users} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;
