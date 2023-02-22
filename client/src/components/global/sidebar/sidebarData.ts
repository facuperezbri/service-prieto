import ContactsOutlined from "@mui/icons-material/ContactsOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

export const Dashboard = [{ title: "Dashboard", to: "/", icon: HomeOutlinedIcon }];

export const Users = [
  { title: "Ver usuarios", to: "/team", icon: PeopleOutlinedIcon },
  { title: "Crear usuario", to: "/userForm", icon: PersonAddAlt1Icon },
];

export const Quotes = [{ title: "Ver presupuestos", to: "/invoices", icon: ReceiptOutlinedIcon }];

export const Clients = [
  { title: "Ver clientes", to: "/clients", icon: ContactsOutlined },
  { title: "Crear cliente", to: "/clientForm", icon: PersonAddAlt1Icon },
];
