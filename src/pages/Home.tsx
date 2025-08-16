import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'
import { Tag } from '@/shared/ui/Tag'
import { P } from '@/shared/ui/Text'
import { Title } from '@/shared/ui/Title'
import {
  AlertCircle,
  AlertTriangle,
  Bell,
  CheckCircle,
  Download,
  Edit3,
  Filter,
  Menu,
  Package,
  Plus,
  Save,
  Search,
  Settings,
  Share2,
  Trash2,
  Upload,
  User,
  X
} from 'lucide-react'
import { useState } from 'react'

export function HomePage() {
  // Estados para testes
  const [activeTab, setActiveTab] = useState('dashboard')
  const [notifications, setNotifications] = useState(3)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedItems, setSelectedItems] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Revisar componentes',
      status: 'pending',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Atualizar documentação',
      status: 'completed',
      priority: 'medium'
    },
    { id: 3, title: 'Testes de integração', status: 'pending', priority: 'low' }
  ])

  // Funções de teste
  const handleAddTask = () => {
    const newTask = {
      id: tasks.length + 1,
      title: `Nova tarefa ${tasks.length + 1}`,
      status: 'pending',
      priority: 'medium'
    }
    setTasks([...tasks, newTask])
  }

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const handleToggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === 'completed' ? 'pending' : 'completed'
            }
          : task
      )
    )
  }

  const handleFormSubmit = () => {
    if (formData.name && formData.email) {
      alert(
        `Formulário enviado!\nNome: ${formData.name}\nEmail: ${formData.email}`
      )
      setFormData({ name: '', email: '', message: '' })
      setShowModal(false)
    } else {
      alert('Por favor, preencha nome e email')
    }
  }

  return (
    <div className="min-h-screen theme-background">
      {/* Header/Navigation */}
      <header className="theme-background shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="pequeno">
                <Menu size={20} />
              </Button>
              <Title level="h4" className="text-blue-600">
                TestApp
              </Title>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Pesquisar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="pequeno"
                onClick={() => setNotifications(0)}
              >
                <Bell size={20} />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </Button>
              <Button variant="outline" size="pequeno">
                <User size={16} />
                Perfil
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="theme-background border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {['dashboard', 'tarefas', 'usuarios', 'configuracoes'].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors duration-200 ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              )
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Page Header */}
            <div className="flex justify-between items-center">
              <div>
                <Title level="h1">Dashboard</Title>
                <P color="text-secondary" className="mt-1">
                  Visão geral do sistema e componentes
                </P>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowModal(true)}>
                  <Plus size={16} />
                  Novo Item
                </Button>
                <Button>
                  <Download size={16} />
                  Exportar
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card
                layout="with-icon"
                title="1,234"
                subtitle="Total de Usuários"
                icon={<User size={24} />}
              />
              <Card
                layout="with-icon"
                title="567"
                subtitle="Tarefas Concluídas"
                icon={<CheckCircle size={24} />}
              />
              <Card
                layout="with-icon"
                title="89"
                subtitle="Projetos Ativos"
                icon={<Package size={24} />}
              />
              <Card
                layout="with-icon"
                title="23"
                subtitle="Notificações"
                icon={<Bell size={24} />}
              />
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card
                layout="varied"
                title="Sistema de Componentes"
                subtitle="Design System Harmonizado"
                description="Todos os componentes seguem os mesmos padrões de design, garantindo consistência visual e funcional em toda a aplicação."
                date="Ativo"
                tags={['React', 'TypeScript', 'Tailwind', 'Design System']}
              />

              <Card
                layout="varied"
                title="Testes de Integração"
                subtitle="Validação Completa"
                description="Página dedicada para testar todos os componentes em cenários reais de uso, garantindo qualidade e funcionamento adequado."
                date="Em Progresso"
                tags={['Testing', 'QA', 'Integration', 'Components']}
              />
            </div>

            {/* Action Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Button
                variant="outline"
                className="flex flex-col h-20 justify-center"
              >
                <Settings size={20} />
                <span className="text-xs mt-1">Config</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col h-20 justify-center"
              >
                <Upload size={20} />
                <span className="text-xs mt-1">Upload</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col h-20 justify-center"
              >
                <Download size={20} />
                <span className="text-xs mt-1">Download</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col h-20 justify-center"
              >
                <Filter size={20} />
                <span className="text-xs mt-1">Filtrar</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col h-20 justify-center"
              >
                <Save size={20} />
                <span className="text-xs mt-1">Salvar</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col h-20 justify-center"
              >
                <Share2 size={20} />
                <span className="text-xs mt-1">Compartilhar</span>
              </Button>
            </div>
          </div>
        )}

        {/* Tarefas Tab */}
        {activeTab === 'tarefas' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <Title level="h1">Gerenciamento de Tarefas</Title>
              <Button onClick={handleAddTask}>
                <Plus size={16} />
                Adicionar Tarefa
              </Button>
            </div>

            <div className="space-y-4">
              {tasks.map((task) => (
                <Card
                  key={task.id}
                  className="p-4"
                  layout="horizontal"
                  title={task.title}
                  subtitle={`Prioridade: ${task.priority}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={task.status === 'completed'}
                        onChange={() => handleToggleTask(task.id)}
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                      <div>
                        <Title
                          level="h5"
                          className={
                            task.status === 'completed'
                              ? 'line-through text-gray-500'
                              : ''
                          }
                        >
                          {task.title}
                        </Title>
                        <div className="flex gap-2 mt-1">
                          <Tag
                            color={
                              task.status === 'completed'
                                ? 'success'
                                : 'warning'
                            }
                          >
                            {task.status === 'completed'
                              ? 'Concluída'
                              : 'Pendente'}
                          </Tag>
                          <Tag
                            color={
                              task.priority === 'high'
                                ? 'error'
                                : task.priority === 'medium'
                                  ? 'warning'
                                  : 'secondary'
                            }
                          >
                            {task.priority === 'high'
                              ? 'Alta'
                              : task.priority === 'medium'
                                ? 'Média'
                                : 'Baixa'}
                          </Tag>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="pequeno">
                        <Edit3 size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="pequeno"
                        color="error"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Usuários Tab */}
        {activeTab === 'usuarios' && (
          <div className="space-y-6">
            <Title level="h1">Usuários do Sistema</Title>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: 'Ana Silva',
                  email: 'ana@email.com',
                  role: 'Admin',
                  status: 'active'
                },
                {
                  name: 'Bruno Santos',
                  email: 'bruno@email.com',
                  role: 'User',
                  status: 'active'
                },
                {
                  name: 'Carla Oliveira',
                  email: 'carla@email.com',
                  role: 'Moderator',
                  status: 'inactive'
                },
                {
                  name: 'Diego Costa',
                  email: 'diego@email.com',
                  role: 'User',
                  status: 'active'
                },
                {
                  name: 'Elena Rodriguez',
                  email: 'elena@email.com',
                  role: 'Admin',
                  status: 'active'
                },
                {
                  name: 'Felipe Mendes',
                  email: 'felipe@email.com',
                  role: 'User',
                  status: 'pending'
                }
              ].map((user, index) => (
                <Card
                  key={index}
                  layout="with-icon"
                  icon={<User size={20} />}
                  title={user.name}
                  subtitle={user.email}
                >
                  <div className="mt-3 flex justify-between items-center">
                    <Tag
                      color={
                        user.status === 'active'
                          ? 'success'
                          : user.status === 'inactive'
                            ? 'error'
                            : 'warning'
                      }
                    >
                      {user.status}
                    </Tag>
                    <P size="pequeno" color="text-secondary">
                      {user.role}
                    </P>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Configurações Tab */}
        {activeTab === 'configuracoes' && (
          <div className="space-y-6">
            <Title level="h1">Configurações</Title>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card
                title="Preferências Gerais"
                layout="varied"
                description="Ajustes de tema e notificações."
              >
                <div className="space-y-4 mt-4">
                  <div>
                    <P className="mb-2">Tema da aplicação:</P>
                    <div className="flex gap-2">
                      <Button variant="outline" size="pequeno">
                        Claro
                      </Button>
                      <Button size="pequeno">Escuro</Button>
                      <Button variant="outline" size="pequeno">
                        Auto
                      </Button>
                    </div>
                  </div>

                  <div>
                    <P className="mb-2">Notificações:</P>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="rounded"
                        />
                        <P size="pequeno">Email notifications</P>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="rounded"
                        />
                        <P size="pequeno">Push notifications</P>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <P size="pequeno">SMS notifications</P>
                      </label>
                    </div>
                  </div>
                </div>
              </Card>

              <Card
                title="Informações da Conta"
                layout="varied"
                description="Gerencie seus dados pessoais."
              >
                <div className="space-y-4 mt-4">
                  <div>
                    <P size="pequeno" color="text-secondary" className="mb-1">
                      Nome completo
                    </P>
                    <input
                      type="text"
                      defaultValue="Usuário Teste"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <P size="pequeno" color="text-secondary" className="mb-1">
                      Email
                    </P>
                    <input
                      type="email"
                      defaultValue="usuario@teste.com"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button color="success">
                      <Save size={16} />
                      Salvar
                    </Button>
                    <Button variant="outline">Cancelar</Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Alert Examples */}
            <div className="space-y-4">
              <Card
                title="Sucesso"
                subtitle="Configurações salvas com sucesso!"
                layout="with-icon"
                icon={<CheckCircle className="text-green-600" size={20} />}
                className="border-green-200 bg-green-50"
              />
              <Card
                title="Aviso"
                subtitle="Algumas configurações requerem reinicialização do sistema."
                layout="with-icon"
                icon={<AlertTriangle className="text-yellow-600" size={20} />}
                className="border-yellow-200 bg-yellow-50"
              />
              <Card
                title="Erro"
                subtitle="Erro ao conectar com o servidor. Tente novamente."
                layout="with-icon"
                icon={<AlertCircle className="text-red-600" size={20} />}
                className="border-red-200 bg-red-50"
              />
            </div>
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <Title level="h3">Novo Item</Title>
              <Button
                variant="ghost"
                size="pequeno"
                onClick={() => setShowModal(false)}
              >
                <X size={20} />
              </Button>
            </div>

            {/* Formulário do Modal */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <P size="pequeno" color="text-secondary" className="mb-1">
                  Nome
                </P>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <P size="pequeno" color="text-secondary" className="mb-1">
                  Email
                </P>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <P size="pequeno" color="text-secondary" className="mb-1">
                  Mensagem (Opcional)
                </P>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                />
              </div>

              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">Salvar</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="theme-background border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <P color="text-secondary">
              © 2024 TestApp. Todos os direitos reservados.
            </P>
            <div className="flex gap-4">
              <Button variant="ghost" size="pequeno">
                Termos
              </Button>
              <Button variant="ghost" size="pequeno">
                Privacidade
              </Button>
              <Button variant="ghost" size="pequeno">
                Suporte
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
