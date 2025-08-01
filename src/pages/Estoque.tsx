import { useState, useMemo } from 'react';
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
  Filter,
  X
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Toaster, toast } from 'sonner';

// --- Tipos e Dados Iniciais ---
interface Product {
  id: number;
  name: string;
  category: string;
  stock: number;
  minStock: number;
  price: number;
  cost: number;
  supplier: string;
}

const initialStockData: Product[] = [
  { id: 1, name: 'Batata Frita Grande', category: 'Porções', stock: 50, minStock: 20, price: 15.00, cost: 8.00, supplier: 'Distribuidora ABC' },
  { id: 2, name: 'Batata Frita Média', category: 'Porções', stock: 45, minStock: 15, price: 12.00, cost: 6.50, supplier: 'Distribuidora ABC' },
  { id: 3, name: 'Refrigerante Lata', category: 'Bebidas', stock: 8, minStock: 20, price: 5.00, cost: 2.50, supplier: 'Bebidas XYZ' },
  { id: 4, name: 'Pastel de Carne', category: 'Pastéis', stock: 40, minStock: 15, price: 7.50, cost: 4.00, supplier: 'Frigorífico Local' },
  { id: 5, name: 'Molho Especial', category: 'Acompanhamentos', stock: 5, minStock: 10, price: 2.00, cost: 0.80, supplier: 'Temperos & Cia' },
];

const emptyProduct: Omit<Product, 'id'> = {
  name: '',
  category: '',
  stock: 0,
  minStock: 0,
  price: 0,
  cost: 0,
  supplier: ''
};

// --- Componente Principal ---
export default function Estoque() {
  const [stockData, setStockData] = useState<Product[]>(initialStockData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = useMemo(() => ['Todos', ...Array.from(new Set(stockData.map(p => p.category)))], [stockData]);
  
  const filteredData = useMemo(() => stockData.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }), [stockData, searchTerm, selectedCategory]);

  const lowStockItems = useMemo(() => stockData.filter(p => p.stock <= p.minStock), [stockData]);
  const totalValue = useMemo(() => stockData.reduce((sum, p) => sum + (p.stock * p.cost), 0), [stockData]);

  const handleAddProduct = (newProductData: Omit<Product, 'id'>) => {
    setStockData(prevData => [
      ...prevData,
      { ...newProductData, id: Date.now() } // Usa timestamp como ID simples
    ]);
    toast.success(`Produto "${newProductData.name}" adicionado com sucesso!`);
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <Toaster richColors position="top-right" />
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Controle de Estoque</h1>
            <p className="text-foreground-muted">Gerencie seus produtos e inventário</p>
          </div>
          <AddProductModal 
            onAddProduct={handleAddProduct} 
            isOpen={isModalOpen} 
            setIsOpen={setIsModalOpen}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard title="Total de Produtos" value={stockData.length} icon={Package} color="primary" />
          <MetricCard title="Valor do Estoque" value={`R$ ${totalValue.toFixed(2)}`} icon={TrendingUp} color="success" />
          <MetricCard title="Alertas de Estoque" value={lowStockItems.length} icon={AlertTriangle} color="destructive" />
        </div>

        <ProductsTable 
          products={filteredData} 
          categories={categories}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
    </Layout>
  );
}

// --- Componentes Reutilizáveis ---

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: 'primary' | 'success' | 'destructive';
}

const MetricCard = ({ title, value, icon: Icon, color }: MetricCardProps) => {
  const colorClasses = {
    primary: 'text-primary',
    success: 'text-success',
    destructive: 'text-destructive'
  };

  return (
    <Card className={`card-gradient ${color === 'destructive' ? 'bg-destructive/10 border-destructive/20' : ''}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm font-medium ${color === 'destructive' ? colorClasses[color] : 'text-foreground-muted'}`}>{title}</p>
            <p className={`text-3xl font-bold ${color === 'destructive' ? colorClasses[color] : 'text-foreground'}`}>{value}</p>
          </div>
          <Icon className={`w-8 h-8 ${colorClasses[color]}`} />
        </div>
      </CardContent>
    </Card>
  );
};

interface ProductsTableProps {
  products: Product[];
  categories: string[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const ProductsTable = ({ products, categories, searchTerm, setSearchTerm, selectedCategory, setSelectedCategory }: ProductsTableProps) => {
  const getStockStatus = (stock: number, minStock: number) => {
    if (stock === 0) return { label: 'Sem Estoque', variant: 'destructive' as const };
    if (stock <= minStock) return { label: 'Estoque Baixo', variant: 'destructive' as const };
    return { label: 'Disponível', variant: 'secondary' as const };
  };

  return (
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
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-card-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-background-secondary">
                <TableHead>Produto</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-right">Estoque</TableHead>
                <TableHead className="text-right">Preço Venda</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => {
                const status = getStockStatus(product.stock, product.minStock);
                return (
                  <TableRow key={product.id} className="hover:bg-background-secondary/50">
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="font-mono text-right">{product.stock}</TableCell>
                    <TableCell className="font-mono text-right">R$ {product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant={status.variant} className={
                        status.variant === 'destructive' 
                          ? 'bg-destructive/10 text-destructive border-destructive/20' 
                          : 'bg-green-500/10 text-green-700 border-green-500/20'
                      }>
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-end">
                        <Button size="sm" variant="ghost"><Edit className="w-4 h-4" /></Button>
                        <Button size="sm" variant="ghost" className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
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
  );
};

interface AddProductModalProps {
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AddProductModal = ({ onAddProduct, isOpen, setIsOpen }: AddProductModalProps) => {
  const [newProduct, setNewProduct] = useState(emptyProduct);

  const handleChange = (field: keyof typeof emptyProduct, value: string | number) => {
    setNewProduct(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.category) {
      toast.error("Por favor, preencha pelo menos o nome e a categoria.");
      return;
    }
    onAddProduct(newProduct);
    setNewProduct(emptyProduct); // Limpa o formulário
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="btn-hero">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Produto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Produto</DialogTitle>
          <DialogDescription>
            Preencha as informações do novo produto para adicioná-lo ao estoque.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <label>Nome do Produto</label>
              <Input value={newProduct.name} onChange={e => handleChange('name', e.target.value)} placeholder="Ex: Pastel de Frango" />
            </div>
            <div className="space-y-2">
              <label>Categoria</label>
              <Input value={newProduct.category} onChange={e => handleChange('category', e.target.value)} placeholder="Ex: Pastéis" />
            </div>
            <div className="space-y-2">
              <label>Estoque Inicial</label>
              <Input value={newProduct.stock} type="number" onChange={e => handleChange('stock', Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <label>Estoque Mínimo</label>
              <Input value={newProduct.minStock} type="number" onChange={e => handleChange('minStock', Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <label>Preço de Venda (R$)</label>
              <Input value={newProduct.price} type="number" step="0.01" onChange={e => handleChange('price', Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <label>Custo (R$)</label>
              <Input value={newProduct.cost} type="number" step="0.01" onChange={e => handleChange('cost', Number(e.target.value))} />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label>Fornecedor</label>
              <Input value={newProduct.supplier} onChange={e => handleChange('supplier', e.target.value)} placeholder="Ex: Fornecedor XYZ" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Salvar Produto</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
