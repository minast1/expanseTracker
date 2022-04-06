import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PaidIcon from "@mui/icons-material/Paid";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "@remix-run/react";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/dashboard/">
      <ListItemIcon>
        <HomeIcon sx={{ color: "lightgray" }} />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton component={Link} to="/dashboard/transactions">
      <ListItemIcon>
        <ReceiptIcon sx={{ color: "lightgray" }} />
      </ListItemIcon>
      <ListItemText primary="Transactions" />
    </ListItemButton>
    <ListItemButton component={Link} to="/dashboard/expenses">
      <ListItemIcon>
        <PaidIcon sx={{ color: "lightgray" }} />
      </ListItemIcon>
      <ListItemText primary="Expenses" />
    </ListItemButton>
    <ListItemButton component={Link} to="/dashboard/profile">
      <ListItemIcon>
        <PersonIcon sx={{ color: "lightgray" }} />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItemButton>
    <ListItemButton component={Link} to="/dashboard/wallet">
      <ListItemIcon>
        <AccountBalanceWalletIcon sx={{ color: "lightgray" }} />
      </ListItemIcon>
      <ListItemText primary="Link Account" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
