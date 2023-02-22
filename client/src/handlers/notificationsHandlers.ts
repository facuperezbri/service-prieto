import { toast } from "react-toastify";

export const clientNotifications = (status: number, resetForm: any) => {
  if (status === 201) {
    toast.success("Usuario creado correctamente", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    resetForm({ values: "" });
  }

  if (status === 260) {
    toast.error("El cliente ingresado ya existe", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
};
