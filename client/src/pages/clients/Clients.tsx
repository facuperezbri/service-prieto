import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import axios from "axios";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Clients = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/clients").then((res) => setClients(res.data));
  }, []);

  const columns: GridColDef[] = [
    {
      field: "dni",
      headerName: "DNI",
      flex: 0.5,
      renderCell: (row) => (
        <Box>
          <Link to={`http://localhost:5173/clients/${row.value}`}>{row.value}</Link>
        </Box>
      ),
    },
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
  ];

  return (
    <Box m="20px">
      <Header title="CLIENTES" subtitle="Acá vas a poder ver a todos tus clientes." />
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid getRowId={(row) => row.dni} rows={clients} columns={columns} components={{ Toolbar: GridToolbar }} />
      </Box>
    </Box>
  );
};

export default Clients;
