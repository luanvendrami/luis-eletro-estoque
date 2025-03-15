'use client';

import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Avatar,
  useTheme
} from '@mui/material';
import {
  Inventory as InventoryIcon,
  ShoppingCart as ShoppingCartIcon,
  AttachMoney as MoneyIcon,
  Dashboard as DashboardIcon
} from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  drawerWidth: number;
}

const Sidebar: React.FC<SidebarProps> = ({ drawerWidth }) => {
  const pathname = usePathname();
  const theme = useTheme();

  const menuItems = [
    { 
      name: 'Dashboard', 
      path: '/dashboard', 
      icon: <DashboardIcon /> 
    },
    { 
      name: 'Produtos', 
      path: '/produtos', 
      icon: <InventoryIcon /> 
    },
    { 
      name: 'Vendas', 
      path: '/vendas', 
      icon: <ShoppingCartIcon /> 
    },
    { 
      name: 'Financeiro', 
      path: '/financeiro', 
      icon: <MoneyIcon /> 
    },
  ];

  // Scale font sizes based on drawer width
  const getAdjustedSize = (baseSize: number): number => {
    const scaleFactor = drawerWidth / 260; // Base scale on the largest width
    return baseSize * Math.max(0.85, scaleFactor);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        position: 'relative',
        zIndex: 2,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: 'linear-gradient(180deg, #4338ca 0%, #3730a3 100%)',
          color: 'white',
          borderRight: 0,
          boxShadow: '2px 0 20px rgba(0, 0, 0, 0.08)',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
    >
      {/* Logo area */}
      <Box
        sx={{
          p: drawerWidth < 240 ? 2 : 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Avatar
          sx={{
            width: getAdjustedSize(56),
            height: getAdjustedSize(56),
            bgcolor: 'rgba(255, 255, 255, 0.15)',
            mb: 2,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            fontSize: getAdjustedSize(22),
            fontWeight: 600,
          }}
        >
          LE
        </Avatar>
        <Typography
          variant="h5"
          component="div"
          fontWeight="bold"
          sx={{
            textShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
            letterSpacing: '0.02em',
            fontSize: getAdjustedSize(18),
          }}
        >
          Luis Eletro
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            opacity: 0.9,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            fontSize: getAdjustedSize(11),
            mt: 0.5,
          }}
        >
          Sistema de Estoque
        </Typography>
      </Box>

      <Divider sx={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        mx: 3,
      }} />

      {/* Menu items */}
      <Box sx={{ px: 2, py: drawerWidth < 240 ? 2 : 3 }}>
        <List>
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            
            return (
              <ListItem key={item.name} disablePadding sx={{ mb: 1 }}>
                <ListItemButton 
                  component={Link} 
                  href={item.path}
                  selected={isActive}
                  sx={{ 
                    py: drawerWidth < 240 ? 1.2 : 1.5,
                    borderRadius: 2,
                    transition: 'all 0.2s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    pr: 3,
                    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                    '&::before': isActive ? {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: '25%',
                      bottom: '25%',
                      width: '4px',
                      background: 'white',
                      borderRadius: '0 4px 4px 0',
                    } : {},
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    },
                  }}
                >
                  <ListItemIcon 
                    sx={{ 
                      color: 'white',
                      minWidth: drawerWidth < 240 ? 36 : 40,
                      opacity: isActive ? 1 : 0.8,
                      transition: 'all 0.2s',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.name} 
                    primaryTypographyProps={{ 
                      fontWeight: isActive ? 600 : 400,
                      fontSize: getAdjustedSize(14),
                      letterSpacing: '0.02em',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          mt: 'auto',
          mb: 2,
          px: 3,
          py: 2,
          textAlign: 'center',
          opacity: 0.6,
        }}
      >
        <Typography variant="caption" display="block" sx={{ fontSize: getAdjustedSize(11) }}>
          Versão 1.0.0
        </Typography>
        <Typography variant="caption" display="block" sx={{ fontSize: getAdjustedSize(11) }}>
          © 2024 Luis Eletro
        </Typography>
      </Box>
    </Drawer>
  );
};

export default Sidebar; 