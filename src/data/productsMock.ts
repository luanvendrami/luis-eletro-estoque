export interface Product {
  id: number;
  nome: string;
  dataCadastro: string;
  quantidade: number;
  preco: number;
  produtoNoSite: boolean;
}

export const productsMock: Product[] = [
  {
    id: 1,
    nome: "Smartphone Galaxy S23",
    dataCadastro: "2023-05-15",
    quantidade: 25,
    preco: 4999.99,
    produtoNoSite: true,
  },
  {
    id: 2,
    nome: "Notebook Lenovo Ideapad",
    dataCadastro: "2023-06-20",
    quantidade: 12,
    preco: 3459.90,
    produtoNoSite: false,
  },
  {
    id: 3,
    nome: "Monitor LG 27 polegadas",
    dataCadastro: "2023-07-05",
    quantidade: 18,
    preco: 1299.90,
    produtoNoSite: true,
  },
  {
    id: 4,
    nome: "Teclado Mecânico Redragon",
    dataCadastro: "2023-08-10",
    quantidade: 30,
    preco: 349.90,
    produtoNoSite: true,
  },
  {
    id: 5,
    nome: "Mouse Gamer Logitech",
    dataCadastro: "2023-09-15",
    quantidade: 40,
    preco: 199.90,
    produtoNoSite: false,
  },
  {
    id: 6,
    nome: "Smart TV Samsung 55 polegadas",
    dataCadastro: "2023-10-05",
    quantidade: 8,
    preco: 3799.90,
    produtoNoSite: true,
  },
  {
    id: 7,
    nome: "Câmera DSLR Canon",
    dataCadastro: "2023-10-10",
    quantidade: 5,
    preco: 4599.90,
    produtoNoSite: true,
  },
  {
    id: 8,
    nome: "Fone de Ouvido Bluetooth Sony",
    dataCadastro: "2023-11-15",
    quantidade: 22,
    preco: 899.90,
    produtoNoSite: true,
  },
  {
    id: 9,
    nome: "Tablet iPad Mini",
    dataCadastro: "2023-11-25",
    quantidade: 10,
    preco: 3999.90,
    produtoNoSite: false,
  },
  {
    id: 10,
    nome: "Impressora HP LaserJet",
    dataCadastro: "2023-12-05",
    quantidade: 7,
    preco: 1499.90,
    produtoNoSite: true,
  },
  {
    id: 11,
    nome: "Ar Condicionado Split 12000 BTUs",
    dataCadastro: "2024-01-10",
    quantidade: 4,
    preco: 2299.90,
    produtoNoSite: true,
  },
  {
    id: 12,
    nome: "Microondas Electrolux 20L",
    dataCadastro: "2024-01-15",
    quantidade: 15,
    preco: 599.90,
    produtoNoSite: false,
  },
  {
    id: 13,
    nome: "Console PlayStation 5",
    dataCadastro: "2024-02-05",
    quantidade: 3,
    preco: 4499.90,
    produtoNoSite: true,
  },
  {
    id: 14,
    nome: "Caixa de Som JBL Bluetooth",
    dataCadastro: "2024-02-15",
    quantidade: 28,
    preco: 399.90,
    produtoNoSite: true,
  },
  {
    id: 15,
    nome: "Aspirador de Pó Robô Inteligente",
    dataCadastro: "2024-03-01",
    quantidade: 6,
    preco: 1899.90,
    produtoNoSite: true,
  },
  {
    id: 16,
    nome: "Refrigerador Brastemp Frost Free",
    dataCadastro: "2024-03-05",
    quantidade: 8,
    preco: 3299.90,
    produtoNoSite: true,
  },
  {
    id: 17,
    nome: "Máquina de Lavar Electrolux 12kg",
    dataCadastro: "2024-03-08",
    quantidade: 6,
    preco: 2499.90,
    produtoNoSite: false,
  },
  {
    id: 18,
    nome: "Ventilador de Teto Mondial",
    dataCadastro: "2024-03-12",
    quantidade: 14,
    preco: 299.90,
    produtoNoSite: true,
  },
  {
    id: 19,
    nome: "Fritadeira Elétrica Philco Air Fryer",
    dataCadastro: "2024-03-15",
    quantidade: 23,
    preco: 459.90,
    produtoNoSite: true,
  },
  {
    id: 20,
    nome: "Purificador de Água Consul",
    dataCadastro: "2024-03-18",
    quantidade: 11,
    preco: 699.90,
    produtoNoSite: false,
  },
  {
    id: 21,
    nome: "Liquidificador Philips Walita",
    dataCadastro: "2024-03-22",
    quantidade: 19,
    preco: 249.90,
    produtoNoSite: true,
  },
  {
    id: 22,
    nome: "Cafeteira Expresso Nespresso",
    dataCadastro: "2024-03-25",
    quantidade: 9,
    preco: 799.90,
    produtoNoSite: true,
  },
  {
    id: 23,
    nome: "Forno Elétrico Britânia",
    dataCadastro: "2024-03-28",
    quantidade: 7,
    preco: 399.90,
    produtoNoSite: false,
  },
  {
    id: 24,
    nome: "Headset Gamer HyperX",
    dataCadastro: "2024-04-01",
    quantidade: 16,
    preco: 549.90,
    produtoNoSite: true,
  },
  {
    id: 25,
    nome: "SSD Kingston 480GB",
    dataCadastro: "2024-04-05",
    quantidade: 32,
    preco: 349.90,
    produtoNoSite: true,
  }
]; 