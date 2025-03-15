'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Sidebar from './Sidebar';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  
  // Dynamic drawer width based on screen size
  const drawerWidth = isSmallScreen ? 220 : isMediumScreen ? 240 : 260;
  
  useEffect(() => {
    // Update width on resize
    const handleResize = () => {
      // Handle resize if needed in the future
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh',
      maxWidth: '100%',
      overflow: 'hidden',
      bgcolor: '#f8f9fa',
      backgroundImage: 'linear-gradient(120deg, #f8f9fa 0%, #f1f3f8 100%)',
    }}>
      {/* Sidebar */}
      <Sidebar drawerWidth={drawerWidth} />
      
      {/* Main content */}
      <Box sx={{ 
        flexGrow: 1,
        width: `calc(100% - ${drawerWidth}px)`,
        paddingLeft: '24px',
        paddingTop: '24px',
        paddingRight: '24px',
        paddingBottom: '24px',
        transition: 'all 0.3s ease',
        display: 'flex',
        minHeight: '100vh',
        overflow: 'hidden',
      }}>
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout; 