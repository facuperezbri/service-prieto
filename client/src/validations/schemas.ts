import * as yup from "yup";

export const clientSchema = yup.object().shape({
  dni: yup.string().required("Ingrese el DNI, por favor."),
  name: yup.string().required("Ingrese el nombre, por favor."),
  lastName: yup.string().required("Ingrese el apellido, por favor."),
  email: yup.string().email("Email invalido").required("Ingrese el email, por favor."),
  phoneNumber: yup.string().required("Ingrese el teléfono, por favor."),
  address: yup.string().required("Ingrese la dirección, por favor."),
  location: yup.string().required("Ingrese la localidad, por favor."),
  department: yup.string().required("Ingrese el departamento, por favor."),
  province: yup.string().required("Ingrese la provincia, por favor."),
});
