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
  useTheme,
  useMediaQuery,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  IconButton,
  Tabs,
  Tab,
  Divider,
  FormGroup,
  Autocomplete,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  LocalOffer as PromotionIcon,
  Public as WebIcon,
  Close as CloseIcon,
  Save as SaveIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Delete as DeleteIcon,
  CloudUpload as CloudUploadIcon,
  Image as ImageIcon,
} from '@mui/icons-material';
import { productsMock, Product } from '@/data/productsMock';

// Interface for product form
interface ProductFormData {
  nome: string;
  preco: number;
  quantidade: number;
  produtoNoSite: boolean;
  categoria: string;
  tipo: string;
  descricao: string;
  marca: string;
  modelo: string;
  imagens: string[];
  especificacoesTecnicas: {
    // Computer specific fields
    processador?: string;
    memoriaRAM?: string;
    armazenamento?: string;
    placaDeVideo?: string;
    placaMae?: string;
    fonte?: string;
    gabinete?: string;
    sistemaOperacional?: string;
    // Other hardware fields
    tamanhoTela?: string;
    resolucao?: string;
    tipoConexao?: string;
    bateria?: string;
    peso?: string;
    dimensoes?: string;
  };
}

const Products: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>(productsMock);
  
  // Product form modal state
  const [openModal, setOpenModal] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [productForm, setProductForm] = useState<ProductFormData>({
    nome: '',
    preco: 0,
    quantidade: 0,
    produtoNoSite: true,
    categoria: '',
    tipo: '',
    descricao: '',
    marca: '',
    modelo: '',
    imagens: [],
    especificacoesTecnicas: {}
  });

  // Add this new state for editing mode
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  // Product categories
  const categorias = [
    'Computador', 'Notebook', 'Monitor', 'Periféricos', 
    'Componentes', 'Armazenamento', 'Rede', 'Acessórios'
  ];

  // Product types based on category
  const tiposPorCategoria: Record<string, string[]> = {
    'Computador': ['Desktop', 'All-in-One', 'Mini PC', 'Gamer'],
    'Notebook': ['Convencional', 'Gamer', 'Ultrabook', '2 em 1', 'Chromebook'],
    'Monitor': ['LED', 'LCD', 'IPS', 'Curvo', 'Ultrawide', 'Gamer'],
    'Periféricos': ['Teclado', 'Mouse', 'Headset', 'Webcam', 'Impressora', 'Scanner'],
    'Componentes': ['Processador', 'Placa-mãe', 'Memória RAM', 'Placa de vídeo', 'Fonte', 'Gabinete', 'Cooler'],
    'Armazenamento': ['SSD', 'HD', 'Pendrive', 'Cartão de memória', 'HD Externo'],
    'Rede': ['Roteador', 'Switch', 'Access Point', 'Adaptador Wi-Fi', 'Cabo de rede'],
    'Acessórios': ['Carregador', 'Case', 'Suporte', 'Adaptador', 'Hub USB']
  };

  // Processadores comuns
  const processadores = [
    'Intel Core i3', 'Intel Core i5', 'Intel Core i7', 'Intel Core i9',
    'AMD Ryzen 3', 'AMD Ryzen 5', 'AMD Ryzen 7', 'AMD Ryzen 9',
    'Intel Celeron', 'Intel Pentium', 'AMD Athlon'
  ];

  // RAM options
  const memoriasRAM = ['4GB', '8GB', '16GB', '32GB', '64GB'];

  // Storage options
  const armazenamentos = [
    'SSD 128GB', 'SSD 256GB', 'SSD 512GB', 'SSD 1TB', 'SSD 2TB',
    'HD 500GB', 'HD 1TB', 'HD 2TB', 'HD 4TB',
    'HD + SSD'
  ];

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

  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle add product button click
  const handleAddProduct = () => {
    setIsEditMode(false);
    setProductForm({
      nome: '',
      preco: 0,
      quantidade: 0,
      produtoNoSite: true,
      categoria: '',
      tipo: '',
      descricao: '',
      marca: '',
      modelo: '',
      imagens: [],
      especificacoesTecnicas: {}
    });
    setOpenModal(true);
  };

  // Add this new handler for edit button
  const handleEditProduct = (product: Product) => {
    setIsEditMode(true);
    setEditingProductId(product.id);
    
    // Populate form with product data
    setProductForm({
      nome: product.nome,
      preco: product.preco,
      quantidade: product.quantidade,
      produtoNoSite: product.produtoNoSite,
      categoria: '', // We don't have these fields in the mock data
      tipo: '',      // but in a real app you would populate these
      descricao: '',
      marca: '',
      modelo: '',
      imagens: [],  // In a real app, you would populate with existing images
      especificacoesTecnicas: {}
    });
    
    setOpenModal(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setOpenModal(false);
    setIsEditMode(false);
    setEditingProductId(null);
  };

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Handle form fields change
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductForm({
      ...productForm,
      [name]: value
    });
  };

  // Handle select fields change
  const handleSelectChange = (e: any, field: string) => {
    setProductForm({
      ...productForm,
      [field]: e.target.value
    });
  };

  // Handle specs fields change
  const handleSpecsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | null, field: string, value?: string) => {
    setProductForm({
      ...productForm,
      especificacoesTecnicas: {
        ...productForm.especificacoesTecnicas,
        [field]: e ? e.target.value : value
      }
    });
  };

  // Handle switch toggle
  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductForm({
      ...productForm,
      produtoNoSite: e.target.checked
    });
  };

  // Handle form submission
  const handleFormSubmit = () => {
    if (isEditMode && editingProductId) {
      // Update existing product
      const updatedProducts = products.map(product => 
        product.id === editingProductId
          ? {
              ...product,
              nome: productForm.nome,
              quantidade: productForm.quantidade,
              preco: productForm.preco,
              produtoNoSite: productForm.produtoNoSite
            }
          : product
      );
      
      setProducts(updatedProducts);
    } else {
      // Create new product with form data
      const newProduct: Product = {
        id: products.length + 1,
        nome: productForm.nome,
        dataCadastro: new Date().toISOString().split('T')[0],
        quantidade: productForm.quantidade,
        preco: productForm.preco,
        produtoNoSite: productForm.produtoNoSite
      };

      // Add to products array
      setProducts([...products, newProduct]);
    }
    
    // Close modal and reset form
    setOpenModal(false);
    setIsEditMode(false);
    setEditingProductId(null);
    setProductForm({
      nome: '',
      preco: 0,
      quantidade: 0,
      produtoNoSite: true,
      categoria: '',
      tipo: '',
      descricao: '',
      marca: '',
      modelo: '',
      imagens: [],
      especificacoesTecnicas: {}
    });
    setTabValue(0);
  };

  // Handle product deletion
  const handleDeleteProduct = () => {
    if (editingProductId) {
      // Filter out the product with the matching ID
      const updatedProducts = products.filter(product => product.id !== editingProductId);
      setProducts(updatedProducts);
      
      // Close the modal
      setOpenModal(false);
      setIsEditMode(false);
      setEditingProductId(null);
      setProductForm({
        nome: '',
        preco: 0,
        quantidade: 0,
        produtoNoSite: true,
        categoria: '',
        tipo: '',
        descricao: '',
        marca: '',
        modelo: '',
        imagens: [],
        especificacoesTecnicas: {}
      });
      setTabValue(0);
    }
  };

  // Handle promotion button
  const handlePromotion = (id: number) => {
    alert(`Adicionar promoção ao produto ID: ${id}`);
  };

  // Handle site button
  const handleSite = (id: number) => {
    alert(`Gerenciar produto no site ID: ${id}`);
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImage = URL.createObjectURL(e.target.files[0]);
      
      // Only allow up to 5 images
      if (productForm.imagens.length < 5) {
        setProductForm({
          ...productForm,
          imagens: [...productForm.imagens, newImage]
        });
      }
    }
  };

  // Handle image removal
  const handleRemoveImage = (index: number) => {
    const updatedImages = [...productForm.imagens];
    updatedImages.splice(index, 1);
    setProductForm({
      ...productForm,
      imagens: updatedImages
    });
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
            Produtos
          </Typography>
          <Button
            variant="contained"
            color="info"
            startIcon={<AddIcon />}
            onClick={handleAddProduct}
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
            Adicionar Produto
          </Button>
        </Box>

        {/* Search bar */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 3,
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)', 
        }}>
          <TextField
            placeholder="Buscar produto..."
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
          <Box>
            <Chip 
              label={`${filteredProducts.length} produtos encontrados`} 
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
          maxHeight: 'calc(100vh - 250px)',
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
                <TableCell>Nome produto</TableCell>
                <TableCell>Data cadastro</TableCell>
                <TableCell>Quantid</TableCell>
                <TableCell>Preço</TableCell>
                <TableCell align="center">Ativo no site</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow 
                  key={product.id}
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
                  <TableCell sx={{ fontWeight: 600 }}>{product.nome}</TableCell>
                  <TableCell>{formatDate(product.dataCadastro)}</TableCell>
                  <TableCell>
                    <Chip 
                      label={`${product.quantidade} ${product.quantidade === 1 ? 'unid.' : 'unid.'}`} 
                      size="small" 
                      sx={{ 
                        bgcolor: product.quantidade > 10 ? 'rgba(34, 197, 94, 0.1)' : 'rgba(234, 179, 8, 0.1)',
                        color: product.quantidade > 10 ? 'rgb(22, 163, 74)' : 'rgb(202, 138, 4)',
                        fontWeight: 500,
                        fontSize: '0.75rem',
                        height: '24px',
                        backdropFilter: 'blur(4px)',
                      }} 
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{formatPrice(product.preco)}</TableCell>
                  <TableCell align="center">
                    {product.produtoNoSite ? (
                      <CheckCircleIcon 
                        sx={{ 
                          color: 'rgb(22, 163, 74)', // Dark green
                          fontSize: '1.5rem' 
                        }} 
                      />
                    ) : (
                      <CancelIcon 
                        sx={{ 
                          color: 'rgb(220, 38, 38)', // Dark red
                          fontSize: '1.5rem' 
                        }} 
                      />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'center',
                    }}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<EditIcon fontSize="small" />}
                        onClick={() => handleEditProduct(product)}
                        sx={{ 
                          textTransform: 'none',
                          borderRadius: '8px',
                          borderColor: 'rgba(67, 56, 202, 0.3)',
                          color: '#4338ca',
                          fontSize: '0.75rem',
                          py: 0.75,
                          minWidth: '90px',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            borderColor: '#4338ca',
                            bgcolor: 'rgba(67, 56, 202, 0.04)',
                            transform: 'translateY(-1px)',
                            boxShadow: '0 3px 8px rgba(67, 56, 202, 0.1)',
                          }
                        }}
                      >
                        Editar
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Product Form Dialog */}
      <Dialog 
        open={openModal} 
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            bgcolor: '#4338ca', 
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 3,
            py: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {isEditMode ? 'Editar Produto' : 'Adicionar Novo Produto'}
          </Typography>
          <IconButton 
            edge="end" 
            color="inherit" 
            onClick={handleCloseModal}
            sx={{ 
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' } 
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
            sx={{ 
              '& .MuiTab-root': { 
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '0.9rem',
              },
            }}
          >
            <Tab label="Informações Básicas" />
            <Tab label="Imagens" />
            <Tab label="Especificações Técnicas" />
            <Tab label="Detalhes Adicionais" />
          </Tabs>
        </Box>

        <DialogContent sx={{ p: 3 }}>
          {/* Tab 1: Basic Information */}
          {tabValue === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  name="nome"
                  label="Nome do Produto"
                  fullWidth
                  variant="outlined"
                  value={productForm.nome}
                  onChange={handleFormChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="preco"
                  label="Preço (R$)"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={productForm.preco}
                  onChange={handleFormChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="quantidade"
                  label="Quantidade em Estoque"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={productForm.quantidade}
                  onChange={handleFormChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Categoria</InputLabel>
                  <Select
                    value={productForm.categoria}
                    label="Categoria"
                    onChange={(e) => handleSelectChange(e, 'categoria')}
                  >
                    {categorias.map((cat) => (
                      <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required disabled={!productForm.categoria}>
                  <InputLabel>Tipo</InputLabel>
                  <Select
                    value={productForm.tipo}
                    label="Tipo"
                    onChange={(e) => handleSelectChange(e, 'tipo')}
                  >
                    {productForm.categoria && tiposPorCategoria[productForm.categoria]?.map((tipo) => (
                      <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="marca"
                  label="Marca"
                  fullWidth
                  variant="outlined"
                  value={productForm.marca}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="modelo"
                  label="Modelo"
                  fullWidth
                  variant="outlined"
                  value={productForm.modelo}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="descricao"
                  label="Descrição"
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                  value={productForm.descricao}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={productForm.produtoNoSite}
                      onChange={handleSwitchChange}
                      color="primary"
                    />
                  }
                  label="Produto Ativo no Site"
                />
              </Grid>
            </Grid>
          )}

          {/* Tab 2: Images */}
          {tabValue === 1 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 2 }}>
                  Adicione até 5 imagens do produto
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <input
                    accept="image/*"
                    id="image-upload"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleImageUpload}
                    disabled={productForm.imagens.length >= 5}
                  />
                  <label htmlFor="image-upload">
                    <Button
                      variant="outlined"
                      component="span"
                      startIcon={<CloudUploadIcon />}
                      disabled={productForm.imagens.length >= 5}
                      sx={{ 
                        textTransform: 'none',
                        borderRadius: '8px',
                        borderColor: 'rgba(67, 56, 202, 0.3)',
                        color: '#4338ca',
                        '&:hover': {
                          borderColor: '#4338ca',
                          bgcolor: 'rgba(67, 56, 202, 0.04)',
                        },
                        '&.Mui-disabled': {
                          borderColor: 'rgba(0, 0, 0, 0.12)',
                          color: 'rgba(0, 0, 0, 0.38)',
                        }
                      }}
                    >
                      {productForm.imagens.length >= 5 ? 'Limite de 5 imagens atingido' : 'Adicionar imagem'}
                    </Button>
                  </label>
                </Box>

                {productForm.imagens.length > 0 ? (
                  <Grid container spacing={2}>
                    {productForm.imagens.map((image, index) => (
                      <Grid item xs={6} sm={4} md={3} key={index}>
                        <Box
                          sx={{
                            position: 'relative',
                            height: 150,
                            border: '1px solid rgba(0, 0, 0, 0.12)',
                            borderRadius: '8px',
                            overflow: 'hidden',
                          }}
                        >
                          <img
                            src={image}
                            alt={`Produto ${index + 1}`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                          <IconButton
                            size="small"
                            onClick={() => handleRemoveImage(index)}
                            sx={{
                              position: 'absolute',
                              top: 4,
                              right: 4,
                              backgroundColor: 'rgba(255, 255, 255, 0.8)',
                              color: 'rgb(220, 38, 38)',
                              '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                              },
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      py: 8,
                      bgcolor: 'rgba(0, 0, 0, 0.02)',
                      borderRadius: '8px',
                      border: '1px dashed rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <ImageIcon sx={{ fontSize: '3rem', color: 'rgba(0, 0, 0, 0.2)', mb: 2 }} />
                    <Typography variant="body1" color="textSecondary">
                      Nenhuma imagem adicionada
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                      Adicione imagens para mostrar o produto no site
                    </Typography>
                  </Box>
                )}
                
                <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 2 }}>
                  * A primeira imagem será usada como capa do produto no site
                </Typography>
              </Grid>
            </Grid>
          )}

          {/* Tab 3: Technical Specifications */}
          {tabValue === 2 && (
            <Grid container spacing={3}>
              {(productForm.categoria === 'Computador' || productForm.categoria === 'Notebook' || productForm.categoria === 'Componentes') && (
                <>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 600, mb: 1 }}>
                      Especificações de Hardware
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      options={processadores}
                      freeSolo
                      value={productForm.especificacoesTecnicas.processador || ''}
                      onChange={(event, newValue) => {
                        handleSpecsChange(null, 'processador', newValue || '');
                      }}
                      renderInput={(params) => (
                        <TextField 
                          {...params} 
                          label="Processador" 
                          variant="outlined"
                          onChange={(e) => handleSpecsChange(e, 'processador')}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      options={memoriasRAM}
                      freeSolo
                      value={productForm.especificacoesTecnicas.memoriaRAM || ''}
                      onChange={(event, newValue) => {
                        handleSpecsChange(null, 'memoriaRAM', newValue || '');
                      }}
                      renderInput={(params) => (
                        <TextField 
                          {...params} 
                          label="Memória RAM" 
                          variant="outlined"
                          onChange={(e) => handleSpecsChange(e, 'memoriaRAM')}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      options={armazenamentos}
                      freeSolo
                      value={productForm.especificacoesTecnicas.armazenamento || ''}
                      onChange={(event, newValue) => {
                        handleSpecsChange(null, 'armazenamento', newValue || '');
                      }}
                      renderInput={(params) => (
                        <TextField 
                          {...params} 
                          label="Armazenamento" 
                          variant="outlined"
                          onChange={(e) => handleSpecsChange(e, 'armazenamento')}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Placa de Vídeo"
                      fullWidth
                      variant="outlined"
                      value={productForm.especificacoesTecnicas.placaDeVideo || ''}
                      onChange={(e) => handleSpecsChange(e, 'placaDeVideo')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Placa-mãe"
                      fullWidth
                      variant="outlined"
                      value={productForm.especificacoesTecnicas.placaMae || ''}
                      onChange={(e) => handleSpecsChange(e, 'placaMae')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Fonte de Alimentação"
                      fullWidth
                      variant="outlined"
                      value={productForm.especificacoesTecnicas.fonte || ''}
                      onChange={(e) => handleSpecsChange(e, 'fonte')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Gabinete"
                      fullWidth
                      variant="outlined"
                      value={productForm.especificacoesTecnicas.gabinete || ''}
                      onChange={(e) => handleSpecsChange(e, 'gabinete')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Sistema Operacional"
                      fullWidth
                      variant="outlined"
                      value={productForm.especificacoesTecnicas.sistemaOperacional || ''}
                      onChange={(e) => handleSpecsChange(e, 'sistemaOperacional')}
                    />
                  </Grid>
                </>
              )}

              {(productForm.categoria === 'Monitor' || productForm.categoria === 'Notebook') && (
                <>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 600, mb: 1, mt: 2 }}>
                      Especificações de Tela
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Tamanho da Tela"
                      fullWidth
                      variant="outlined"
                      value={productForm.especificacoesTecnicas.tamanhoTela || ''}
                      onChange={(e) => handleSpecsChange(e, 'tamanhoTela')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Resolução"
                      fullWidth
                      variant="outlined"
                      value={productForm.especificacoesTecnicas.resolucao || ''}
                      onChange={(e) => handleSpecsChange(e, 'resolucao')}
                    />
                  </Grid>
                </>
              )}

              <Grid item xs={12}>
                <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 600, mb: 1, mt: 2 }}>
                  Características Físicas
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Dimensões"
                  fullWidth
                  variant="outlined"
                  value={productForm.especificacoesTecnicas.dimensoes || ''}
                  onChange={(e) => handleSpecsChange(e, 'dimensoes')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Peso"
                  fullWidth
                  variant="outlined"
                  value={productForm.especificacoesTecnicas.peso || ''}
                  onChange={(e) => handleSpecsChange(e, 'peso')}
                />
              </Grid>
              
              {(productForm.categoria === 'Periféricos' || productForm.categoria === 'Rede' || productForm.categoria === 'Acessórios') && (
                <>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 600, mb: 1, mt: 2 }}>
                      Conectividade
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Tipo de Conexão"
                      fullWidth
                      variant="outlined"
                      value={productForm.especificacoesTecnicas.tipoConexao || ''}
                      onChange={(e) => handleSpecsChange(e, 'tipoConexao')}
                    />
                  </Grid>
                </>
              )}
              
              {productForm.categoria === 'Notebook' && (
                <>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 600, mb: 1, mt: 2 }}>
                      Bateria
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Informações de Bateria"
                      fullWidth
                      variant="outlined"
                      value={productForm.especificacoesTecnicas.bateria || ''}
                      onChange={(e) => handleSpecsChange(e, 'bateria')}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          )}

          {/* Tab 4: Additional Details */}
          {tabValue === 3 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 2 }}>
                  Informações extras e detalhes adicionais do produto, como garantia, assistência técnica, etc.
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={10}
                  variant="outlined"
                  placeholder="Detalhe aqui informações adicionais sobre o produto..."
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>

        <DialogActions sx={{ 
          px: 3, 
          py: 2, 
          bgcolor: '#f8f9fa',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <Box>
            {isEditMode && (
              <Button 
                onClick={handleDeleteProduct}
                variant="outlined"
                startIcon={<DeleteIcon />}
                sx={{ 
                  borderRadius: '8px',
                  textTransform: 'none',
                  borderColor: 'rgba(239, 68, 68, 0.5)',
                  color: 'rgb(220, 38, 38)',
                  '&:hover': {
                    borderColor: 'rgb(220, 38, 38)',
                    bgcolor: 'rgba(239, 68, 68, 0.04)',
                  }
                }}
              >
                Excluir
              </Button>
            )}
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              onClick={handleCloseModal}
              variant="outlined"
              sx={{ 
                borderRadius: '8px',
                textTransform: 'none',
                borderColor: 'rgba(0, 0, 0, 0.12)',
                color: 'text.secondary',
              }}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleFormSubmit}
              variant="contained"
              startIcon={<SaveIcon />}
              sx={{ 
                bgcolor: '#4338ca',
                borderRadius: '8px',
                textTransform: 'none',
                boxShadow: '0 4px 10px rgba(67, 56, 202, 0.2)',
                px: 3,
                '&:hover': {
                  bgcolor: '#3730a3',
                  boxShadow: '0 6px 15px rgba(67, 56, 202, 0.3)',
                }
              }}
            >
              {isEditMode ? 'Atualizar Produto' : 'Salvar Produto'}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Products;
