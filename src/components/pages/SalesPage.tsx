'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  Badge,
  Chip,
  Card,
  useTheme,
  useMediaQuery,
  alpha,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterAlt as FilterIcon,
  CalendarMonth as CalendarIcon,
} from '@mui/icons-material';

// Mock data for sales
interface Sale {
  id: number;
  cliente: string;
  data: string;
  valor: number;
  status: 'Concluída' | 'Pendente' | 'Cancelada';
  formaPagamento: string;
}

const salesMock: Sale[] = [
  { id: 1, cliente: 'João Silva', data: '2023-05-15', valor: 2599.90, status: 'Concluída', formaPagamento: 'Cartão de Crédito' },
  { id: 2, cliente: 'Maria Santos', data: '2023-05-16', valor: 1499.50, status: 'Pendente', formaPagamento: 'Pix' },
  { id: 3, cliente: 'Carlos Ferreira', data: '2023-05-18', valor: 3299.90, status: 'Concluída', formaPagamento: 'Boleto' },
  { id: 4, cliente: 'Ana Paula', data: '2023-05-19', valor: 899.90, status: 'Cancelada', formaPagamento: 'Pix' },
  { id: 5, cliente: 'Roberto Alves', data: '2023-05-20', valor: 4599.90, status: 'Concluída', formaPagamento: 'Cartão de Crédito' },
  { id: 6, cliente: 'Fernanda Lima', data: '2023-05-21', valor: 1299.90, status: 'Pendente', formaPagamento: 'Boleto' },
  { id: 7, cliente: 'Paulo Oliveira', data: '2023-05-22', valor: 2199.90, status: 'Concluída', formaPagamento: 'Pix' },
  { id: 8, cliente: 'Mariana Costa', data: '2023-05-23', valor: 1799.90, status: 'Concluída', formaPagamento: 'Cartão de Crédito' },
  { id: 9, cliente: 'Lucas Mendes', data: '2023-05-24', valor: 599.90, status: 'Pendente', formaPagamento: 'Boleto' },
  { id: 10, cliente: 'Juliana Souza', data: '2023-05-25', valor: 3499.90, status: 'Concluída', formaPagamento: 'Pix' },
  { id: 11, cliente: 'Marcos Andrade', data: '2023-06-01', valor: 1699.90, status: 'Concluída', formaPagamento: 'Cartão de Crédito' },
  { id: 12, cliente: 'Camila Ribeiro', data: '2023-06-03', valor: 899.90, status: 'Pendente', formaPagamento: 'Pix' },
  { id: 13, cliente: 'Ricardo Santos', data: '2023-06-05', valor: 2599.90, status: 'Concluída', formaPagamento: 'Boleto' },
  { id: 14, cliente: 'Patricia Lima', data: '2023-06-08', valor: 3199.90, status: 'Cancelada', formaPagamento: 'Cartão de Crédito' },
  { id: 15, cliente: 'Eduardo Martins', data: '2023-06-10', valor: 1499.90, status: 'Concluída', formaPagamento: 'Pix' },
  { id: 16, cliente: 'Bianca Oliveira', data: '2023-06-12', valor: 799.90, status: 'Pendente', formaPagamento: 'Boleto' },
  { id: 17, cliente: 'Felipe Costa', data: '2023-06-15', valor: 4299.90, status: 'Concluída', formaPagamento: 'Cartão de Crédito' },
  { id: 18, cliente: 'Amanda Soares', data: '2023-06-18', valor: 1099.90, status: 'Concluída', formaPagamento: 'Pix' },
  { id: 19, cliente: 'Leonardo Almeida', data: '2023-06-20', valor: 599.90, status: 'Cancelada', formaPagamento: 'Boleto' },
  { id: 20, cliente: 'Carolina Torres', data: '2023-06-22', valor: 2899.90, status: 'Concluída', formaPagamento: 'Cartão de Crédito' },
  { id: 21, cliente: 'Gustavo Pereira', data: '2023-06-25', valor: 1799.90, status: 'Pendente', formaPagamento: 'Pix' },
  { id: 22, cliente: 'Beatriz Carvalho', data: '2023-06-27', valor: 3499.90, status: 'Concluída', formaPagamento: 'Boleto' },
  { id: 23, cliente: 'Daniel Ferreira', data: '2023-06-29', valor: 899.90, status: 'Concluída', formaPagamento: 'Cartão de Crédito' },
  { id: 24, cliente: 'Isabela Nunes', data: '2023-07-01', valor: 2299.90, status: 'Pendente', formaPagamento: 'Pix' },
  { id: 25, cliente: 'Rafael Moreira', data: '2023-07-03', valor: 4999.90, status: 'Concluída', formaPagamento: 'Boleto' }
];

const Sales: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sales, setSales] = useState<Sale[]>(salesMock);
  
  // Format date to Brazilian format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  // Format price to Brazilian currency
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).replace('R$', 'R$ ');
  };

  // Filter sales based on search term
  const filteredSales = sales.filter(sale => 
    sale.cliente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate totals
  const totalVendas = sales.reduce((acc, sale) => acc + sale.valor, 0);
  const vendasConcluidas = sales.filter(sale => sale.status === 'Concluída').length;
  const vendasPendentes = sales.filter(sale => sale.status === 'Pendente').length;

  // Handle new sale
  const handleNewSale = () => {
    alert('Funcionalidade para registrar nova venda será implementada em breve!');
  };

  // Get status chip color
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Concluída': return { bg: '#22c55e', color: 'white' };
      case 'Pendente': return { bg: '#f59e0b', color: 'white' };
      case 'Cancelada': return { bg: '#ef4444', color: 'white' };
      default: return { bg: '#94a3b8', color: 'white' };
    }
  };

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
            Vendas
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleNewSale}
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              borderRadius: '8px',
              textTransform: 'none',
              px: 2,
              py: 0.75,
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.3)',
              },
              boxShadow: 'none',
              fontWeight: 500,
            }}
          >
            Nova Venda
          </Button>
        </Box>

        {/* Summary Cards */}
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          p: 3,
          gap: 3,
          flexWrap: { xs: 'wrap', md: 'nowrap' },
        }}>
          <Card elevation={0} sx={{ 
            p: 3, 
            flex: 1,
            minWidth: { xs: '100%', sm: '200px', md: 0 },
            bgcolor: alpha(theme.palette.primary.main, 0.08),
            borderRadius: '12px',
            border: '1px solid',
            borderColor: alpha(theme.palette.primary.main, 0.12),
          }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mb: 1, fontSize: '0.875rem' }}>
              Total de Vendas
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 600, color: theme.palette.primary.dark }}>
              {formatPrice(totalVendas)}
            </Typography>
          </Card>

          <Card elevation={0} sx={{ 
            p: 3, 
            flex: 1,
            minWidth: { xs: '47%', sm: '200px', md: 0 },
            bgcolor: alpha(theme.palette.success.main, 0.08),
            borderRadius: '12px',
            border: '1px solid',
            borderColor: alpha(theme.palette.success.main, 0.12),
          }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mb: 1, fontSize: '0.875rem' }}>
              Vendas Concluídas
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 600, color: theme.palette.success.dark }}>
              {vendasConcluidas}
            </Typography>
          </Card>

          <Card elevation={0} sx={{ 
            p: 3, 
            flex: 1,
            minWidth: { xs: '47%', sm: '200px', md: 0 },
            bgcolor: alpha(theme.palette.warning.main, 0.08),
            borderRadius: '12px',
            border: '1px solid',
            borderColor: alpha(theme.palette.warning.main, 0.12),
          }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mb: 1, fontSize: '0.875rem' }}>
              Vendas Pendentes
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 600, color: theme.palette.warning.dark }}>
              {vendasPendentes}
            </Typography>
          </Card>
        </Box>

        {/* Search and filters */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 3,
          borderTop: '1px solid rgba(0, 0, 0, 0.06)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
          flexWrap: { xs: 'wrap', sm: 'nowrap' },
          gap: 2,
        }}>
          <TextField
            placeholder="Buscar por cliente..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ 
              width: { xs: '100%', sm: '320px' },
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                backgroundColor: '#f9fafb',
                '&:hover': {
                  backgroundColor: '#f5f6f7',
                },
                '& fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.08)',
                },
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'rgba(0, 0, 0, 0.4)' }} />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<FilterIcon />}
              sx={{ 
                textTransform: 'none',
                borderRadius: '8px',
                fontSize: '0.8125rem',
                color: 'text.secondary',
                borderColor: 'rgba(0, 0, 0, 0.12)',
                py: 0.8,
              }}
            >
              Filtros
            </Button>
            <Button
              variant="outlined"
              size="small"
              startIcon={<CalendarIcon />}
              sx={{ 
                textTransform: 'none',
                borderRadius: '8px',
                fontSize: '0.8125rem',
                color: 'text.secondary',
                borderColor: 'rgba(0, 0, 0, 0.12)',
                py: 0.8,
              }}
            >
              Período
            </Button>
            <Chip 
              label={`${filteredSales.length} vendas`} 
              size="small" 
              sx={{ 
                bgcolor: '#f9fafb', 
                fontSize: '0.75rem',
                fontWeight: 500,
                height: '28px'
              }} 
            />
          </Box>
        </Box>

        {/* Table */}
        <TableContainer sx={{ 
          flexGrow: 1,
          overflowX: 'auto',
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 380px)',
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(67, 56, 202, 0.3)',
            borderRadius: '10px',
            '&:hover': {
              backgroundColor: 'rgba(67, 56, 202, 0.5)',
            }
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
            borderRadius: '10px',
          },
          px: 1,
        }}>
          <Table sx={{ 
            minWidth: 700,
            borderCollapse: 'separate',
            borderSpacing: '0 8px',
          }}>
            <TableHead>
              <TableRow sx={{ 
                position: 'sticky',
                top: 0,
                zIndex: 10,
                backgroundColor: '#fff',
                '& th': { 
                  border: 'none',
                  fontWeight: 600,
                  color: 'rgba(0, 0, 0, 0.7)',
                  fontSize: '0.875rem',
                  py: 1.5,
                  px: 2,
                  letterSpacing: '0.02em',
                  transition: 'all 0.2s',
                  '&:first-of-type': {
                    borderTopLeftRadius: '10px',
                    borderBottomLeftRadius: '10px',
                    pl: 3,
                  },
                  '&:last-of-type': {
                    borderTopRightRadius: '10px',
                    borderBottomRightRadius: '10px',
                    pr: 3,
                  }
                },
              }}>
                <TableCell>ID</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Data</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>Forma de Pagamento</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSales.map((sale) => {
                const statusColor = getStatusColor(sale.status);
                return (
                  <TableRow 
                    key={sale.id}
                    hover
                    sx={{ 
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)',
                      borderRadius: '12px',
                      transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                      backgroundColor: '#fff',
                      '&:hover': {
                        backgroundColor: '#fcfcff',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 5px 15px rgba(67, 56, 202, 0.07)',
                      },
                      '& td': { 
                        border: 'none',
                        py: 2,
                        px: 2,
                        color: 'rgba(0, 0, 0, 0.8)',
                        '&:first-of-type': {
                          borderTopLeftRadius: '12px',
                          borderBottomLeftRadius: '12px',
                          pl: 3,
                        },
                        '&:last-of-type': {
                          borderTopRightRadius: '12px',
                          borderBottomRightRadius: '12px',
                          pr: 3,
                        }
                      },
                    }}
                  >
                    <TableCell>#{sale.id}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{sale.cliente}</TableCell>
                    <TableCell>{formatDate(sale.data)}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{formatPrice(sale.valor)}</TableCell>
                    <TableCell>{sale.formaPagamento}</TableCell>
                    <TableCell align="center">
                      <Chip 
                        label={sale.status}
                        size="small"
                        sx={{ 
                          bgcolor: statusColor.bg,
                          color: statusColor.color,
                          fontWeight: 500,
                          fontSize: '0.75rem',
                          minWidth: '90px',
                          backdropFilter: 'blur(4px)',
                          borderRadius: '12px',
                          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
                        }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Sales; 