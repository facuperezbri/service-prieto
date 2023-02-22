import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useMediaQuery } from "@mui/material";

import Header from "../../components/Header";

import { clientSchema } from "../../validations/schemas";

import { clientNotifications } from "../../handlers/notificationsHandlers";

const initialValues = {
  dni: "",
  name: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  address: "",
  location: "",
  province: "",
};

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:860px");

  const handleFormSubmit = async (values: any, resetForm: any) => {
    const postClient = await axios.post("http://localhost:3000/clients", values);
    console.log(postClient);

    clientNotifications(postClient.status, resetForm);
  };

  return (
    <Box m="20px">
      <Header title="CREAR CLIENTE" subtitle="Crear Nuevo Cliente" />
      <Formik
        onSubmit={(values, { resetForm }) => handleFormSubmit(values, resetForm)}
        initialValues={initialValues}
        validationSchema={clientSchema}
      >
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="DNI"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dni}
                name="dni"
                error={!!touched.dni && !!errors.dni}
                helperText={touched.dni && errors.dni}
                sx={{
                  gridColumn: "span 1",
                }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nombre"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{
                  gridColumn: "span 1",
                }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Apellido"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{
                  gridColumn: "span 2",
                }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{
                  gridColumn: "span 2",
                }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Número de teléfono"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phoneNumber}
                name="phoneNumber"
                error={!!touched.phoneNumber && !!errors.phoneNumber}
                helperText={touched.phoneNumber && errors.phoneNumber}
                sx={{
                  gridColumn: "span 2",
                }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Dirección"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{
                  gridColumn: "span 4",
                }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Localidad"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.location}
                name="location"
                error={!!touched.location && !!errors.location}
                helperText={touched.location && errors.location}
                sx={{
                  gridColumn: "span 2",
                }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Provincia"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.province}
                name="province"
                error={!!touched.province && !!errors.province}
                helperText={touched.province && errors.province}
                sx={{
                  gridColumn: "span 2",
                }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Box>
  );
};
export default Form;
