import React, { useState } from 'react';
import ToastNotification from '../components/ToastNotification';

// Dados iniciais reais
const initialJobs = [
  { id: 1, title: 'Desenvolvedor Front-End React', company: 'iFood', location: 'Osasco, SP' },
  { id: 2, title: 'Engenheiro de Software Back-End', company: 'Nubank', location: 'São Paulo, SP' },
  { id: 3, title: 'Analista de Suporte Técnico', company: 'Claro Brasil', location: 'Rio de Janeiro, RJ' },
  { id: 4, title: 'UX/UI Designer', company: 'Grupo Boticário', location: 'Curitiba, PR' },
  { id: 5, title: 'Cientista de Dados', company: 'Magazine Luiza', location: 'Franca, SP' },
  { id: 6, title: 'Desenvolvedor Mobile Flutter', company: 'PicPay', location: 'Vitória, ES' },
  { id: 7, title: 'Product Manager (PM)', company: 'Mercado Livre', location: 'São Paulo, SP' },
  { id: 8, title: 'Engenheiro de DevOps', company: 'Stone Pagamentos', location: 'Belo Horizonte, MG' },
  { id: 9, title: 'Analista de BI (Business Intelligence)', company: 'Vivo Telefônica', location: 'São Paulo, SP' },
  { id: 10, title: 'Tech Recruiter', company: 'XP Inc.', location: 'São Paulo, SP' },
  { id: 11, title: 'Desenvolvedor Java Pleno', company: 'Globo', location: 'Rio de Janeiro, RJ' },
  { id: 12, title: 'Analista de Segurança da Informação', company: 'Porto Seguro', location: 'São Paulo, SP' },
  { id: 13, title: 'Desenvolvedor Full Stack', company: 'CI&T', location: 'Campinas, SP' },
  { id: 14, title: 'Arquiteto de Software', company: 'BRQ Digital Solutions', location: 'São Paulo, SP' },
  { id: 15, title: 'Estagiário de TI', company: 'TOTVS', location: 'São Paulo, SP' }
];


function ManageJobsP() {
  const [jobs, setJobs] = useState(initialJobs);
  
  const [editingJob, setEditingJob] = useState(null);
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');

  const [notification, setNotification] = useState({ message: '', type: '' });
  const [formErrors, setFormErrors] = useState({});

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  // Função para validar o formulário antes de enviar
  const validateForm = () => {
    const errors = {};
    if (!title.trim()) errors.title = 'O título da vaga é obrigatório.';
    if (!company.trim()) errors.company = 'O nome da empresa é obrigatório.';
    if (!location.trim()) errors.location = 'A localização é obrigatória.';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Limpa o formulário e reseta o estado de edição
  const resetForm = () => {
    setEditingJob(null);
    setTitle('');
    setCompany('');
    setLocation('');
    setFormErrors({});
  };

  // Lida com o envio do formulário (Adicionar ou Editar)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingJob) {
      // Lógica de ATUALIZAÇÃO
      const updatedJobs = jobs.map(job => 
        job.id === editingJob.id ? { ...job, title, company, location } : job
      );
      setJobs(updatedJobs);
      showNotification('Vaga atualizada com sucesso!');
    } else {
      const newJob = { id: Date.now(), title, company, location };
      setJobs([...jobs, newJob]);
      showNotification('Nova vaga adicionada com sucesso!');
    }
    
    resetForm();
  };

  // Prepara o formulário para edição
  const handleEdit = (job) => {
    setEditingJob(job);
    setTitle(job.title);
    setCompany(job.company);
    setLocation(job.location);
    setFormErrors({});
  };

  // Exclui uma vaga
  const handleDelete = (jobId) => {
    if (window.confirm('Tem certeza que deseja excluir esta vaga?')) {
        const updatedJobs = jobs.filter(job => job.id !== jobId);
        setJobs(updatedJobs);
        showNotification('Vaga excluída com sucesso!', 'error');
    }
  };


  return (
    <div>
      {notification.message && (
        <ToastNotification 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification({ message: '', type: '' })}
        />
      )}

      <h4 className="mb-4">{editingJob ? 'Editando Vaga' : 'Adicionar Nova Vaga'}</h4>
      <form onSubmit={handleSubmit} className="card p-3 mb-4">
        <div className="mb-3">
            <label className="form-label">Título da Vaga</label>
            <input 
                type="text" 
                className={`form-control ${formErrors.title ? 'is-invalid' : ''}`}
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
            />
            {formErrors.title && <div className="invalid-feedback">{formErrors.title}</div>}
        </div>
        <div className="mb-3">
            <label className="form-label">Empresa</label>
            <input 
                type="text" 
                className={`form-control ${formErrors.company ? 'is-invalid' : ''}`}
                value={company}
                onChange={(e) => setCompany(e.target.value)}
            />
             {formErrors.company && <div className="invalid-feedback">{formErrors.company}</div>}
        </div>
        <div className="mb-3">
            <label className="form-label">Localização</label>
            <input 
                type="text" 
                className={`form-control ${formErrors.location ? 'is-invalid' : ''}`}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
            {formErrors.location && <div className="invalid-feedback">{formErrors.location}</div>}
        </div>
        <div className="d-flex align-items-center mt-2">
            <button type="submit" className="btn btn-primary align-self-start">
                {editingJob ? 'Salvar Alterações' : 'Salvar Nova Vaga'}
            </button>
            {editingJob && (
                <button type="button" className="btn btn-secondary ms-2" onClick={resetForm}>
                    Cancelar Edição
                </button>
            )}
        </div>
      </form>

      <hr className="my-4"/>

      <h5>Vagas Existentes</h5>
      <ul className="list-group">
        {jobs.map(job => (
          <li key={job.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{job.title} - <strong>{job.company}</strong> ({job.location})</span>
            <div>
              <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => handleEdit(job)}>Editar</button>
              <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(job.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageJobsP;
