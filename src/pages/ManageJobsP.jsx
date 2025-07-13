import React, { useState } from 'react';
import ToastNotification from '../components/ToastNotification';

// Dados mockados no formato da classe Vaga do backend
const initialJobs = [
  {
    id: '1a2b3c4d-0000-0000-0000-000000000001',
    empresa: { nome: 'iFood' },
    nomeCargo: 'Desenvolvedor Front-End React',
    descricao: 'Desenvolvimento de interfaces web com React.',
    logoEmpresa: '',
    statusVaga: true,
    dataFimCandidatura: '2025-07-31',
    dataFimUltimaEtapa: '2025-08-15',
    tags: ['React', 'Front-End', 'Web']
  },
  {
    id: '1a2b3c4d-0000-0000-0000-000000000002',
    empresa: { nome: 'Nubank' },
    nomeCargo: 'Engenheiro de Software Back-End',
    descricao: 'Desenvolvimento de APIs e microsserviços.',
    logoEmpresa: '',
    statusVaga: true,
    dataFimCandidatura: '2025-07-25',
    dataFimUltimaEtapa: '2025-08-10',
    tags: ['Java', 'Spring', 'Back-End']
  }
  // ...adicione mais mock se quiser
];


function ManageJobsP() {
  const [jobs, setJobs] = useState(initialJobs);
  const [editingJob, setEditingJob] = useState(null);
  const [nomeCargo, setNomeCargo] = useState('');
  const [empresaNome, setEmpresaNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [logoEmpresa, setLogoEmpresa] = useState('');
  const [statusVaga, setStatusVaga] = useState(true);
  const [dataFimCandidatura, setDataFimCandidatura] = useState('');
  const [dataFimUltimaEtapa, setDataFimUltimaEtapa] = useState('');
  const [tags, setTags] = useState(''); // string separada por vírgula

  const [notification, setNotification] = useState({ message: '', type: '' });
  const [formErrors, setFormErrors] = useState({});

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  // Função para validar o formulário antes de enviar
  const validateForm = () => {
    const errors = {};
    if (!nomeCargo.trim()) errors.nomeCargo = 'O nome do cargo é obrigatório.';
    if (!empresaNome.trim()) errors.empresaNome = 'O nome da empresa é obrigatório.';
    if (!dataFimCandidatura.trim()) errors.dataFimCandidatura = 'Data fim da candidatura é obrigatória.';
    if (!dataFimUltimaEtapa.trim()) errors.dataFimUltimaEtapa = 'Data fim da última etapa é obrigatória.';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Limpa o formulário e reseta o estado de edição
  const resetForm = () => {
    setEditingJob(null);
    setNomeCargo('');
    setEmpresaNome('');
    setDescricao('');
    setLogoEmpresa('');
    setStatusVaga(true);
    setDataFimCandidatura('');
    setDataFimUltimaEtapa('');
    setTags('');
    setFormErrors({});
  };

  // Lida com o envio do formulário (Adicionar ou Editar)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const vagaObj = {
      id: editingJob ? editingJob.id : Date.now().toString(),
      empresa: { nome: empresaNome },
      nomeCargo,
      descricao,
      logoEmpresa,
      statusVaga,
      dataFimCandidatura,
      dataFimUltimaEtapa,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    if (editingJob) {
      const updatedJobs = jobs.map(job => job.id === editingJob.id ? vagaObj : job);
      setJobs(updatedJobs);
      showNotification('Vaga atualizada com sucesso!');
    } else {
      setJobs([...jobs, vagaObj]);
      showNotification('Nova vaga adicionada com sucesso!');
    }
    resetForm();
  };

  // Prepara o formulário para edição
  const handleEdit = (job) => {
    setEditingJob(job);
    setNomeCargo(job.nomeCargo);
    setEmpresaNome(job.empresa?.nome || '');
    setDescricao(job.descricao || '');
    setLogoEmpresa(job.logoEmpresa || '');
    setStatusVaga(job.statusVaga);
    setDataFimCandidatura(job.dataFimCandidatura);
    setDataFimUltimaEtapa(job.dataFimUltimaEtapa);
    setTags(job.tags ? job.tags.join(', ') : '');
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
    <div className={document.body.classList.contains('high-contrast') ? 'high-contrast' : ''}>
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
          <label className="form-label">Nome do Cargo</label>
          <input
            type="text"
            className={`form-control ${formErrors.nomeCargo ? 'is-invalid' : ''}`}
            value={nomeCargo}
            onChange={e => setNomeCargo(e.target.value)}
          />
          {formErrors.nomeCargo && <div className="invalid-feedback">{formErrors.nomeCargo}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Empresa</label>
          <input
            type="text"
            className={`form-control ${formErrors.empresaNome ? 'is-invalid' : ''}`}
            value={empresaNome}
            onChange={e => setEmpresaNome(e.target.value)}
          />
          {formErrors.empresaNome && <div className="invalid-feedback">{formErrors.empresaNome}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Descrição</label>
          <input
            type="text"
            className="form-control"
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Logo da Empresa (URL)</label>
          <input
            type="text"
            className="form-control"
            value={logoEmpresa}
            onChange={e => setLogoEmpresa(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Status da Vaga</label>
          <select className="form-select" value={statusVaga} onChange={e => setStatusVaga(e.target.value === 'true')}>
            <option value="true">Ativa</option>
            <option value="false">Inativa</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Data Fim da Candidatura</label>
          <input
            type="date"
            className={`form-control ${formErrors.dataFimCandidatura ? 'is-invalid' : ''}`}
            value={dataFimCandidatura}
            onChange={e => setDataFimCandidatura(e.target.value)}
          />
          {formErrors.dataFimCandidatura && <div className="invalid-feedback">{formErrors.dataFimCandidatura}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Data Fim da Última Etapa</label>
          <input
            type="date"
            className={`form-control ${formErrors.dataFimUltimaEtapa ? 'is-invalid' : ''}`}
            value={dataFimUltimaEtapa}
            onChange={e => setDataFimUltimaEtapa(e.target.value)}
          />
          {formErrors.dataFimUltimaEtapa && <div className="invalid-feedback">{formErrors.dataFimUltimaEtapa}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Tags (separadas por vírgula)</label>
          <input
            type="text"
            className="form-control"
            value={tags}
            onChange={e => setTags(e.target.value)}
          />
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
            <span>
              <strong>{job.nomeCargo}</strong> - {job.empresa?.nome}
              {job.descricao && <> | <em>{job.descricao}</em></>}
              <br />
              <small>
                Status: {job.statusVaga ? 'Ativa' : 'Inativa'} | Fim Candidatura: {job.dataFimCandidatura} | Fim Última Etapa: {job.dataFimUltimaEtapa}
                {job.tags && job.tags.length > 0 && <> | Tags: {job.tags.join(', ')}</>}
              </small>
            </span>
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
