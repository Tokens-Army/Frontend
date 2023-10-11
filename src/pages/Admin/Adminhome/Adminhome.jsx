import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../../service/redux/loginSlice";
import "./Adminhome.css";
import { Outlet, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
const drawerWidth = 240;

const Adminhome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/");
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const rightBar = [
    { name: "Main", nav: "main" },
    { name: "Services", nav: "addservices" },
    { name: "Accessories", nav: "addaccessories" },
    { name: "Orders", nav: "ordersAdmin" },
    { name: "Add Employee", nav: "employeesadmin" },
    { name: "Add Admins", nav: "addadmins" },
    { name: "Delete Admins", nav: "deleteadmins" },
  ];
  const HelpRightBar = [
    { name: "About", nav: "about" },
    { name: "customer service", nav: "customer_service" },
  ];
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {rightBar.map((text, index) => (
          <ListItem
            key={text.name}
            disablePadding
            onClick={() => {
              navigate(text.nav);
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {HelpRightBar.map((text, index) => (
          <ListItem
            key={text.name}
            disablePadding
            onClick={() => {
              navigate(text.nav);
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {isLoggedIn && (
              <Button
                color="inherit"
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </Button>
            )}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Adminhome;
