'use client';

import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, useTheme } from '@mui/material';
import { Dashboard as DashboardIcon, Inventory as InventoryIcon, ShoppingCart as ShoppingCartIcon, AttachMoney as MoneyIcon } from '@mui/icons-material';

export default function DashboardPage() {
  const theme = useTheme();
  
  return (
    <Box 
      sx={{ 
        flex: 1,
        height: '100vh',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Paper 
        elevation={0} 
        sx={{ 
          height: '100%',
          borderRadius: '16px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'white',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        }}
      >
        {/* Header */}
        <Box sx={{ 
          bgcolor: '#4338ca',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 3,
          py: 2.5,
        }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              fontSize: '1.125rem',
              letterSpacing: '0.01em',
            }}
          >
            Dashboard
          </Typography>
        </Box>

        {/* Dashboard content */}
        <Box sx={{ p: 3, flexGrow: 1 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 4, 
              fontWeight: 600,
              color: '#1f2937',
              fontSize: '1.5rem',
            }}
          >
            Bem-vindo ao sistema de gestão Luis Eletro Estoque
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <Card sx={{ 
                height: '100%', 
                borderRadius: '12px',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                }
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <DashboardIcon sx={{ color: theme.palette.primary.main, mr: 1.5 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.125rem' }}>
                      Dashboard
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                    Veja um resumo de todas as atividades do seu negócio em um só lugar.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6} lg={3}>
              <Card sx={{ 
                height: '100%', 
                borderRadius: '12px',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                }
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <InventoryIcon sx={{ color: theme.palette.primary.main, mr: 1.5 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.125rem' }}>
                      Produtos
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                    Gerencie seu inventário completo com facilidade e eficiência.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6} lg={3}>
              <Card sx={{ 
                height: '100%', 
                borderRadius: '12px',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                }
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <ShoppingCartIcon sx={{ color: theme.palette.primary.main, mr: 1.5 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.125rem' }}>
                      Vendas
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                    Acompanhe todas as suas vendas e status dos pedidos em tempo real.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6} lg={3}>
              <Card sx={{ 
                height: '100%', 
                borderRadius: '12px',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                }
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <MoneyIcon sx={{ color: theme.palette.primary.main, mr: 1.5 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.125rem' }}>
                      Financeiro
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                    Monitore receitas, despesas e o fluxo de caixa do seu negócio.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 4, p: 3, bgcolor: 'rgba(67, 56, 202, 0.04)', borderRadius: '12px' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: theme.palette.primary.main }}>
              Dica do dia
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
              Confira regularmente seus níveis de estoque para evitar produtos esgotados. 
              Produtos com pouco estoque aparecem destacados na página de produtos.
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
} 