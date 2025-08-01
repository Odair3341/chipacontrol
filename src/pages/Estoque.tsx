import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Plus, 
  Package, 
  AlertTriangle,
  TrendingUp,
  Edit,
  Trash2,
  Filter
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Product {
  id: number;
  name: string;
  category: string;
  stock: number;
  minStock: number;
  price: number;
  cost: number;
  supplier: string;
  lastUpdate: string;
}

const stockData: Product[] = [
  {
    id: 1,
    name: 'Batata Frita Grande',
    category: 'Porções',
    stock: 50,
    minStock: 20,
    price: 15.00,
    cost: 8.00,
    supplier: 'Distribuidora ABC',
    lastUpdate: '2024-01-05'
  },
  {
    id: 2,
    name: 'Batata Frita Média',
    category: 'Porções',
    stock: 45,
    minStock: 15,
    price: 12.00,
    cost: 6.50,
    supplier: 'Distribuidora ABC',
    lastUpdate: '2024-01-05'
  },
  {
    id: 3,
    name: 'Refrigerante Lata',
    category: 'Bebidas',
    stock: 8,
    minStock: 20,
    price: 5.00,
    cost: 2.50,
    supplier: 'Bebidas XYZ',
    lastUpdate: '2024-01-04'
  },
  {
    id: 4,
    name: 'Pastel de Carne',
    category: 'Pastéis',
    stock: 40,
    minStock: 15,
    price: 7.50,
    cost: 4.00,
    supplier: 'Frigorífico Local',
    lastUpdate: '2024-01-05'
  },
  {
    id: 5,
    name: 'Molho Especial',
    category: 'Acompanhamentos',
    stock: 5,
    minStock: 10,
    price: 2.00,
    cost: 0.80,
    supplier: 'Temperos & Cia',
    lastUpdate: '2024-01-03'
  }
];

export default function Estoque() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = ['Todos', ...Array.from(new Set(stockData.map(p => p.category)))];
  
  const filteredData = stockData.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const lowStockItems = stockData.filter(p => p.stock <= p.minStock);
  const totalValue = stockData.reduce((sum, p) => sum + (p.stock * p.cost), 0);

  const getStockStatus = (stock: number, minStock: number) => {
    if (stock === 0) return { label: 'Sem Estoque', variant: 'destructive' as const };
    if (stock <= minStock) return { label: 'Estoque Baixo', variant: 'destructive' as const };
    if (stock <= minStock * 1.5) return { label: 'Atenção', variant: 'secondary' as const };
    return { label: 'Disponível', variant: 'secondary' as const };
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Controle de Estoque</h1>
            <p className="text-foreground-muted">Gerencie seus produtos e inventário</p>
          </div>
          <Button className="btn-hero">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Produto
          </Button>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="card-gradient">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground-muted">Total de Produtos</p>
                  <p className="text-3xl font-bold text-foreground">{stockData.length}</p>
                </div>
                <Package className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-gradient">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground-muted">Valor do Estoque</p>
                  <p className="text-3xl font-bold text-foreground">R$ {totalValue.toFixed(2)}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-destructive/10 border-destructive/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-destructive">Alertas de Estoque</p>
                  <p className="text-3xl font-bold text-destructive">{lowStockItems.length}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>Produtos em Estoque</CardTitle>
            <CardDescription>Lista completa do inventário</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground-muted" />
                <Input
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                </Button>
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Products Table */}
            <div className="rounded-lg border border-card-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-background-secondary">
                    <TableHead>Produto</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Estoque</TableHead>
                    <TableHead>Est. Mínimo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Preço Venda</TableHead>
                    <TableHead>Custo</TableHead>
                    <TableHead>Fornecedor</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((product) => {
                    const status = getStockStatus(product.stock, product.minStock);
                    return (
                      <TableRow key={product.id} className="hover:bg-background-secondary/50">
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell className="font-mono">{product.stock}</TableCell>
                        <TableCell className="font-mono">{product.minStock}</TableCell>
                        <TableCell>
                          <Badge variant={status.variant} className={
                            status.variant === 'destructive' 
                              ? 'bg-destructive/10 text-destructive border-destructive/20' 
                              : 'bg-success/10 text-success border-success/20'
                          }>
                            {status.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono">R$ {product.price.toFixed(2)}</TableCell>
                        <TableCell className="font-mono">R$ {product.cost.toFixed(2)}</TableCell>
                        <TableCell className="text-sm">{product.supplier}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}