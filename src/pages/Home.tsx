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
import HomeSection from './Sections/Home'

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
    <>
      <HomeSection />
    </>
  )
}
