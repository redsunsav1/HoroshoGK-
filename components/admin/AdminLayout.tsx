import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Project } from '../../types';
import { Link, useNavigate, Routes, Route, useParams } from 'react-router-dom';
import { ProjectEditor } from './ProjectEditor';
import { Plus, Edit2, Trash2, LogOut, LayoutGrid, RotateCcw } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { projects, deleteProject, resetData } = useData();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white flex flex-col fixed h-full">
        <div className="p-6 border-b border-white/10">
          <div className="font-bold text-xl tracking-tight">ХОРОШО! <span className="text-gray-400">Admin</span></div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin" className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-lg text-white">
            <LayoutGrid className="w-5 h-5" /> Проекты
          </Link>
          <button onClick={() => {
             if(confirm('Выйти из админки?')) navigate('/');
          }} className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white w-full text-left">
            <LogOut className="w-5 h-5" /> На сайт
          </button>
        </nav>
        <div className="p-4 border-t border-white/10">
           <button onClick={resetData} className="flex items-center gap-2 text-xs text-red-300 hover:text-red-100">
             <RotateCcw className="w-3 h-3" /> Сбросить все данные
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
           <h1 className="text-3xl font-bold text-gray-800">Проекты</h1>
           <Link to="/admin/new" className="bg-accent text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-lg">
             <Plus className="w-4 h-4" /> Добавить ЖК
           </Link>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {projects.map(project => (
            <div key={project.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center group hover:shadow-md transition-shadow">
              <div className="flex items-center gap-6">
                <div className="w-24 h-16 rounded-lg overflow-hidden bg-gray-100">
                  <img src={project.heroImage} alt={project.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-primary">{project.name}</h3>
                  <div className="text-sm text-gray-500">{project.promos.length} активных акций • {project.plans.length} планировок</div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Link to={`/admin/edit/${project.id}`} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Edit2 className="w-5 h-5" />
                </Link>
                <button 
                  onClick={() => { if(confirm('Удалить проект?')) deleteProject(project.id) }} 
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export const AdminLayout: React.FC = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [password, setPassword] = useState('');
  const { projects } = useData();

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-sand flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-96 text-center">
          <h2 className="text-2xl font-bold mb-6 text-primary">Вход в систему</h2>
          <input 
            type="password" 
            placeholder="Пароль (admin)" 
            className="w-full p-3 border rounded-xl mb-4 text-center"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button 
            onClick={() => password === 'admin' ? setIsAuth(true) : alert('Неверный пароль')}
            className="w-full bg-primary text-white py-3 rounded-xl font-bold"
          >
            Войти
          </button>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/new" element={<ProjectEditor />} />
      <Route path="/edit/:id" element={<EditorWrapper projects={projects} />} />
    </Routes>
  );
};

// Wrapper to extract ID correctly using React Router's useParams
const EditorWrapper: React.FC<{projects: Project[]}> = ({ projects }) => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);
  
  if (!project) return <div>Проект не найден. Возможно, он был удален. <Link to="/admin" className="text-blue-500 underline">Вернуться назад</Link></div>;
  return <ProjectEditor initialProject={project} />;
};