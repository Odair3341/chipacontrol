import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { 
  Settings, 
  User, 
  Store,
  Bell,
  Shield,
  Palette,
  Database,
  Wifi,
  Printer,
  CreditCard,
  Save,
  RotateCcw
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useTheme } from "@/hooks/use-theme";

type ActiveTab = 'perfil' | 'estabelecimento' | 'notificacoes' | 'seguranca' | 'aparencia' | 'dados' | 'integracoes' | 'impressao' | 'pagamento';

export default function Configuracoes() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('perfil');

  const renderContent = () => {
    switch (activeTab) {
      case 'perfil':
        return <UserProfileCard />;
      case 'estabelecimento':
        return <StoreSettingsCard />;
      case 'notificacoes':
        return <NotificationsCard />;
      case 'aparencia':
        return <AppearanceCard />;
      case 'pagamento':
        return <PaymentMethodsCard />;
      default:
        return (
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle>Em breve</CardTitle>
              <CardDescription>Esta seção estará disponível em breve.</CardDescription>
            </CardHeader>
          </Card>
        );
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
            <p className="text-foreground-muted">Gerencie as configurações do sistema</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Restaurar Padrões
            </Button>
            <Button className="btn-hero">
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Settings Navigation */}
          <div className="space-y-4">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-lg">Categorias</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant={activeTab === 'perfil' ? 'default' : 'ghost'} className="w-full justify-start" onClick={() => setActiveTab('perfil')}>
                  <User className="w-4 h-4 mr-2" />
                  Perfil
                </Button>
                <Button variant={activeTab === 'estabelecimento' ? 'default' : 'ghost'} className="w-full justify-start" onClick={() => setActiveTab('estabelecimento')}>
                  <Store className="w-4 h-4 mr-2" />
                  Estabelecimento
                </Button>
                <Button variant={activeTab === 'notificacoes' ? 'default' : 'ghost'} className="w-full justify-start" onClick={() => setActiveTab('notificacoes')}>
                  <Bell className="w-4 h-4 mr-2" />
                  Notificações
                </Button>
                <Button variant={activeTab === 'seguranca' ? 'default' : 'ghost'} className="w-full justify-start" onClick={() => setActiveTab('seguranca')}>
                  <Shield className="w-4 h-4 mr-2" />
                  Segurança
                </Button>
                <Button variant={activeTab === 'aparencia' ? 'default' : 'ghost'} className="w-full justify-start" onClick={() => setActiveTab('aparencia')}>
                  <Palette className="w-4 h-4 mr-2" />
                  Aparência
                </Button>
                <Button variant={activeTab === 'dados' ? 'default' : 'ghost'} className="w-full justify-start" onClick={() => setActiveTab('dados')}>
                  <Database className="w-4 h-4 mr-2" />
                  Dados
                </Button>
                <Button variant={activeTab === 'integracoes' ? 'default' : 'ghost'} className="w-full justify-start" onClick={() => setActiveTab('integracoes')}>
                  <Wifi className="w-4 h-4 mr-2" />
                  Integrações
                </Button>
                <Button variant={activeTab === 'impressao' ? 'default' : 'ghost'} className="w-full justify-start" onClick={() => setActiveTab('impressao')}>
                  <Printer className="w-4 h-4 mr-2" />
                  Impressão
                </Button>
                <Button variant={activeTab === 'pagamento' ? 'default' : 'ghost'} className="w-full justify-start" onClick={() => setActiveTab('pagamento')}>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pagamento
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-2 space-y-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </Layout>
  );
}

const UserProfileCard = () => (
  <Card className="card-gradient">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <User className="w-5 h-5" />
        Perfil do Usuário
      </CardTitle>
      <CardDescription>
        Informações pessoais e credenciais
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Nome Completo</label>
          <Input defaultValue="João Silva" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <Input defaultValue="joao@chiparia.com" type="email" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Telefone</label>
          <Input defaultValue="(11) 99999-9999" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Cargo</label>
          <Input defaultValue="Administrador" />
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h4 className="font-medium">Permissões</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Acesso ao PDV</p>
              <p className="text-xs text-foreground-muted">Permite realizar vendas</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Gerenciar Estoque</p>
              <p className="text-xs text-foreground-muted">Adicionar e editar produtos</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Relatórios Financeiros</p>
              <p className="text-xs text-foreground-muted">Visualizar dados financeiros</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const StoreSettingsCard = () => (
  <Card className="card-gradient">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Store className="w-5 h-5" />
        Configurações do Estabelecimento
      </CardTitle>
      <CardDescription>
        Informações da chiparia
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Nome da Chiparia</label>
          <Input defaultValue="Chiparia do João" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">CNPJ</label>
          <Input defaultValue="12.345.678/0001-90" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Telefone</label>
          <Input defaultValue="(11) 3333-3333" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <Input defaultValue="contato@chiparia.com" />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Endereço Completo</label>
        <Input defaultValue="Rua das Chipas, 123 - Centro - São Paulo/SP" />
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="font-medium">Horário de Funcionamento</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Abertura</label>
            <Input defaultValue="08:00" type="time" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Fechamento</label>
            <Input defaultValue="22:00" type="time" />
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const NotificationsCard = () => (
  <Card className="card-gradient">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Bell className="w-5 h-5" />
        Notificações
      </CardTitle>
      <CardDescription>
        Configure alertas e notificações
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Estoque Baixo</p>
            <p className="text-xs text-foreground-muted">Alertas quando produtos estão em falta</p>
          </div>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Vendas Diárias</p>
            <p className="text-xs text-foreground-muted">Resumo diário por email</p>
          </div>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Metas Atingidas</p>
            <p className="text-xs text-foreground-muted">Notificação quando atingir metas</p>
          </div>
          <Switch />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Backup Automático</p>
            <p className="text-xs text-foreground-muted">Confirmação de backup dos dados</p>
          </div>
          <Switch defaultChecked />
        </div>
      </div>
    </CardContent>
  </Card>
);

const AppearanceCard = () => {
  const { setTheme } = useTheme();

  return (
    <Card className="card-gradient">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Aparência
        </CardTitle>
        <CardDescription>
          Personalize a aparência do sistema
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">Tema</h3>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => setTheme("light")}>
              Claro
            </Button>
            <Button variant="outline" onClick={() => setTheme("dark")}>
              Escuro
            </Button>
            <Button variant="outline" onClick={() => setTheme("system")}>
              Sistema
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const PaymentMethodsCard = () => (
  <Card className="card-gradient">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <CreditCard className="w-5 h-5" />
        Formas de Pagamento
      </CardTitle>
      <CardDescription>
        Configure métodos de pagamento aceitos
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-success/10 rounded flex items-center justify-center">
              <span className="text-xs font-bold text-success">$</span>
            </div>
            <div>
              <p className="text-sm font-medium">Dinheiro</p>
              <p className="text-xs text-foreground-muted">Pagamento em espécie</p>
            </div>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Cartão de Crédito/Débito</p>
              <p className="text-xs text-foreground-muted">Máquina de cartão</p>
            </div>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-warning/10 rounded flex items-center justify-center">
              <span className="text-xs font-bold text-warning">PIX</span>
            </div>
            <div>
              <p className="text-sm font-medium">PIX</p>
              <p className="text-xs text-foreground-muted">Pagamento instantâneo</p>
            </div>
          </div>
          <Switch defaultChecked />
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <label className="text-sm font-medium">Chave PIX</label>
        <Input defaultValue="chiparia@pix.com" />
      </div>
    </CardContent>
  </Card>
);
