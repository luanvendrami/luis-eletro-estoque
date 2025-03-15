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
  Chip,
  Stack,
  Divider,
  Card,
  CardContent,
  Grid,
  useTheme,
  useMediaQuery,
  alpha,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterAlt as FilterIcon,
  CalendarMonth as CalendarIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Payments as PaymentsIcon,
} from '@mui/icons-material';

// Mock data for financial transactions
interface Transaction {
  id: number;
  descricao: string;
  data: string;
  valor: number;
  tipo: 'Receita' | 'Despesa';
  categoria: string;
  status: 'Confirmado' | 'Pendente' | 'Cancelado';
}

const transactionsMock: Transaction[] = [
  { id: 1, descricao: 'Venda #1234', data: '2023-05-15', valor: 2599.90, tipo: 'Receita', categoria: 'Vendas', status: 'Confirmado' },
  { id: 2, descricao: 'Fornecedor ABC', data: '2023-05-16', valor: 1499.50, tipo: 'Despesa', categoria: 'Fornecedores', status: 'Confirmado' },
  { id: 3, descricao: 'Venda #1235', data: '2023-05-18', valor: 3299.90, tipo: 'Receita', categoria: 'Vendas', status: 'Confirmado' },
  { id: 4, descricao: 'Aluguel', data: '2023-05-19', valor: 2800.00, tipo: 'Despesa', categoria: 'Estabelecimento', status: 'Confirmado' },
  { id: 5, descricao: 'Venda #1236', data: '2023-05-20', valor: 4599.90, tipo: 'Receita', categoria: 'Vendas', status: 'Confirmado' },
  { id: 6, descricao: 'Impostos', data: '2023-05-21', valor: 1850.75, tipo: 'Despesa', categoria: 'Impostos', status: 'Pendente' },
  { id: 7, descricao: 'Venda #1237', data: '2023-05-22', valor: 2199.90, tipo: 'Receita', categoria: 'Vendas', status: 'Confirmado' },
  { id: 8, descricao: 'Materiais de escritório', data: '2023-05-23', valor: 350.90, tipo: 'Despesa', categoria: 'Escritório', status: 'Confirmado' },
  { id: 9, descricao: 'Venda #1238', data: '2023-05-24', valor: 1899.90, tipo: 'Receita', categoria: 'Vendas', status: 'Pendente' },
  { id: 10, descricao: 'Manutenção equipamentos', data: '2023-05-25', valor: 780.00, tipo: 'Despesa', categoria: 'Manutenção', status: 'Confirmado' },
  { id: 11, descricao: 'Venda #1239', data: '2023-06-01', valor: 3299.90, tipo: 'Receita', categoria: 'Vendas', status: 'Confirmado' },
  { id: 12, descricao: 'Energia Elétrica', data: '2023-06-02', valor: 950.75, tipo: 'Despesa', categoria: 'Utilidades', status: 'Confirmado' },
  { id: 13, descricao: 'Venda #1240', data: '2023-06-03', valor: 1799.90, tipo: 'Receita', categoria: 'Vendas', status: 'Confirmado' },
  { id: 14, descricao: 'Água', data: '2023-06-05', valor: 320.50, tipo: 'Despesa', categoria: 'Utilidades', status: 'Confirmado' },
  { id: 15, descricao: 'Venda #1241', data: '2023-06-07', valor: 2599.90, tipo: 'Receita', categoria: 'Vendas', status: 'Pendente' },
  { id: 16, descricao: 'Fornecedor XYZ', data: '2023-06-10', valor: 4200.00, tipo: 'Despesa', categoria: 'Fornecedores', status: 'Confirmado' },
  { id: 17, descricao: 'Venda #1242', data: '2023-06-12', valor: 1899.90, tipo: 'Receita', categoria: 'Vendas', status: 'Confirmado' },
  { id: 18, descricao: 'Seguro', data: '2023-06-15', valor: 1200.00, tipo: 'Despesa', categoria: 'Seguros', status: 'Confirmado' },
  { id: 19, descricao: 'Venda #1243', data: '2023-06-18', valor: 3999.90, tipo: 'Receita', categoria: 'Vendas', status: 'Confirmado' },
  { id: 20, descricao: 'Internet', data: '2023-06-20', valor: 399.90, tipo: 'Despesa', categoria: 'Utilidades', status: 'Confirmado' },
  { id: 21, descricao: 'Venda #1244', data: '2023-06-22', valor: 2499.90, tipo: 'Receita', categoria: 'Vendas', status: 'Pendente' },
  { id: 22, descricao: 'Software de Gestão', data: '2023-06-25', valor: 750.00, tipo: 'Despesa', categoria: 'Software', status: 'Confirmado' },
  { id: 23, descricao: 'Venda #1245', data: '2023-06-27', valor: 1699.90, tipo: 'Receita', categoria: 'Vendas', status: 'Confirmado' },
  { id: 24, descricao: 'Treinamento Funcionários', data: '2023-06-29', valor: 1800.00, tipo: 'Despesa', categoria: 'RH', status: 'Pendente' },
  { id: 25, descricao: 'Venda #1246', data: '2023-07-01', valor: 4799.90, tipo: 'Receita', categoria: 'Vendas', status: 'Confirmado' }
];

const Finance: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [searchTerm, setSearchTerm] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>(transactionsMock);
  
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

  // Filter transactions based on search term
  const filteredTransactions = transactions.filter(transaction => 
    transaction.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate financial summaries
  const totalReceitas = transactions
    .filter(transaction => transaction.tipo === 'Receita' && transaction.status === 'Confirmado')
    .reduce((acc, transaction) => acc + transaction.valor, 0);
    
  const totalDespesas = transactions
    .filter(transaction => transaction.tipo === 'Despesa' && transaction.status === 'Confirmado')
    .reduce((acc, transaction) => acc + transaction.valor, 0);
    
  const saldo = totalReceitas - totalDespesas;

  // Handle new transaction
  const handleNewTransaction = () => {
    alert('Funcionalidade para registrar nova transação será implementada em breve!');
  };

  // Get status and type styles
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Confirmado': return { bg: '#4CAF50', color: 'white' };
      case 'Pendente': return { bg: '#FFC107', color: 'black' };
      case 'Cancelado': return { bg: '#F44336', color: 'white' };
      default: return { bg: 'grey', color: 'white' };
    }
  };

  const getTypeStyle = (tipo: string) => {
    return tipo === 'Receita' 
      ? { color: theme.palette.success.main, icon: <TrendingUpIcon fontSize="small" /> }
      : { color: theme.palette.error.main, icon: <TrendingDownIcon fontSize="small" /> };
  };

  return (
    <Box 
      sx={{ 
        display: 'flex',
        width: '100%',
        height: '100vh',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
      <Box 
        sx={{ 
          position: 'absolute',
          left: 0,
          right: '16px',
          top: '16px',
          bottom: '16px',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
        }}
      >
        <Paper 
          elevation={0} 
          sx={{ 
            width: '100%',
            height: '100%',
            borderRadius: '0 12px 12px 0',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'white',
          }}
        >
          {/* Header */}
          <Box sx={{ 
            bgcolor: '#4F46E5',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
          }}>
            <Typography 
              variant="h6" 
              sx={{ fontWeight: 600 }}
            >
              Financeiro
            </Typography>
            <Button
              variant="contained"
              color="info"
              startIcon={<AddIcon />}
              onClick={handleNewTransaction}
              sx={{
                bgcolor: 'rgba(59, 130, 246, 0.9)',
                color: 'white',
                borderRadius: 2,
                textTransform: 'none',
                px: 2,
                py: 0.75,
                '&:hover': {
                  bgcolor: 'rgba(59, 130, 246, 1)',
                },
                boxShadow: 'none',
              }}
            >
              Nova Transação
            </Button>
          </Box>

          {/* Financial Summary */}
          <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Card 
                  elevation={1} 
                  sx={{ 
                    height: '100%',
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.success.main, 0.1),
                    borderLeft: `4px solid ${theme.palette.success.main}`,
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <TrendingUpIcon color="success" />
                      <Typography variant="subtitle2" color="text.secondary">Receitas</Typography>
                    </Box>
                    <Typography variant="h5" sx={{ mt: 1, fontWeight: 600 }}>{formatPrice(totalReceitas)}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Card 
                  elevation={1} 
                  sx={{ 
                    height: '100%',
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.error.main, 0.1),
                    borderLeft: `4px solid ${theme.palette.error.main}`,
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <TrendingDownIcon color="error" />
                      <Typography variant="subtitle2" color="text.secondary">Despesas</Typography>
                    </Box>
                    <Typography variant="h5" sx={{ mt: 1, fontWeight: 600 }}>{formatPrice(totalDespesas)}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Card 
                  elevation={1} 
                  sx={{ 
                    height: '100%',
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    borderLeft: `4px solid ${theme.palette.primary.main}`,
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PaymentsIcon color="primary" />
                      <Typography variant="subtitle2" color="text.secondary">Saldo</Typography>
                    </Box>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        mt: 1, 
                        fontWeight: 600,
                        color: saldo >= 0 ? theme.palette.success.main : theme.palette.error.main
                      }}
                    >
                      {formatPrice(saldo)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>

          {/* Search and filters */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            borderBottom: '1px solid #e0e0e0',
            borderTop: '1px solid #e0e0e0',
            flexWrap: 'wrap',
            gap: 1,
          }}>
            <TextField
              placeholder="Buscar transação..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ 
                width: { xs: '100%', sm: '300px' },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<FilterIcon />}
                sx={{ 
                  textTransform: 'none',
                  borderRadius: 1,
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
                  borderRadius: 1,
                }}
              >
                Período
              </Button>
              <Typography 
                color="text.secondary"
                sx={{ 
                  fontSize: '0.875rem',
                  ml: 1,
                }}
              >
                {filteredTransactions.length} transações encontradas
              </Typography>
            </Box>
          </Box>

          {/* Transactions Table */}
          <TableContainer sx={{ 
            flexGrow: 1,
            overflowX: 'auto',
            overflowY: 'auto',
            maxHeight: 'calc(100vh - 400px)',
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
                  <TableCell>Descrição</TableCell>
                  <TableCell>Data</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Categoria</TableCell>
                  <TableCell align="right">Valor</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTransactions.map((transaction) => {
                  const statusColor = getStatusColor(transaction.status);
                  const typeStyle = getTypeStyle(transaction.tipo);
                  return (
                    <TableRow 
                      key={transaction.id}
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
                      <TableCell>{transaction.id}</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>{transaction.descricao}</TableCell>
                      <TableCell>{formatDate(transaction.data)}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: typeStyle.color }}>
                          {typeStyle.icon}
                          <Typography variant="body2" sx={{ fontWeight: 600, color: 'inherit' }}>
                            {transaction.tipo}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{transaction.categoria}</TableCell>
                      <TableCell align="right" sx={{ 
                        fontWeight: 600,
                        color: transaction.tipo === 'Receita' ? theme.palette.success.main : theme.palette.error.main
                      }}>
                        {formatPrice(transaction.valor)}
                      </TableCell>
                      <TableCell align="center">
                        <Chip 
                          label={transaction.status}
                          size="small"
                          sx={{ 
                            bgcolor: statusColor.bg,
                            color: statusColor.color,
                            fontWeight: 500,
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
    </Box>
  );
};

export default Finance; 