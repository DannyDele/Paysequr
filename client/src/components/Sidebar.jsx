import React from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  TrendingUpOutlined,
} from "@mui/icons-material";
import PaymentIcon from '@mui/icons-material/Payment';
import EmailIcon from '@mui/icons-material/Email';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import DarkLogo from "../assets/Logo.svg";
import LightLogo from '../assets/LightLogo.png'

const navItems = [
  {
    text: "Overview",
    icon: <HomeOutlined />,
  },
  {
    text: "Bill Management",
    icon: null,
  },
  {
    text: "Bills",
    icon: <PaymentIcon />,
  },
  
  {
    text: "Bill Transactions",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Escrow Pay",
    icon: null,
  },
  {
    text: "Escrow Pay Transactions",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "User Management",
    icon: null,
  },
  {
    text: "Users",
    icon: <Groups2Outlined />,
  },
  {
    text: "Performance",
    icon: <TrendingUpOutlined />,
  },
  {
    text: "Message Section",
    icon: null,
  },
  {
    text: "Message",
    icon: <EmailIcon />,
  },
];

const Sidebar = ({
  drawerWidth,
  isSideBarOpen,
  setIsSideBarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSideBarOpen && (
        <Drawer
          open={isSideBarOpen}
          onClose={() => setIsSideBarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
              {theme.palette.mode === "dark" ? 
              <Box
              component="img"
              alt="Light Logo"
              src={LightLogo}
              height="50px"
              width="150px"
              sx={{ objectFit: "contain" }}
            /> :
            <Box
                component="img"
                alt="Light Logo"
                src={DarkLogo}
                // height="50px"
                width="150px"
                sx={{ objectFit: "contain" }}
              />}
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List disablePadding={true}>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                let lcText = text.toLowerCase();
                const lcTextArr = lcText.split(" ");
                //console.log(lcTextArr);
                if(lcTextArr.length > 1){
                  lcText = lcTextArr.join("-")
                }

                return (
                  <ListItem key={text} disablePadding ={true}>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? "#eb7c24"
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;