import { useState } from 'react';
import ToastNotification from '../components/toast-notification/ToastNotification';

// Simulação dos dados iniciais de cursos
const initialCourses = [
  { id: 1, title: 'Análise de Dados com Python', category: 'Tecnologia', description: 'Aprenda a coletar, limpar, analisar e visualizar dados com Python, Pandas e Matplotlib.' },
  { id: 2, title: 'Finanças Pessoais e Investimentos', category: 'Finanças', description: 'Entenda como organizar suas finanças e investir com segurança em renda fixa e variável.' },
  { id: 3, title: 'Introdução à Psicologia', category: 'Saúde e Bem-estar', description: 'Explore os fundamentos da mente humana, comportamento e teorias psicológicas.' },
  { id: 4, title: 'Libras: Língua Brasileira de Sinais', category: 'Acessibilidade', description: 'Curso introdutório para comunicação básica com a comunidade surda.' },
  { id: 5, title: 'Design Gráfico com Canva e Figma', category: 'Design', description: 'Aprenda a criar layouts, posts e protótipos com ferramentas gratuitas e intuitivas.' },
  { id: 6, title: 'Criação de Podcasts e Conteúdo de Áudio', category: 'Comunicação', description: 'Como planejar, gravar, editar e publicar seu próprio podcast.' },
  { id: 7, title: 'Programação Mobile com React Native', category: 'Tecnologia', description: 'Desenvolva aplicativos para Android e iOS com JavaScript e React Native.' },
  { id: 8, title: 'Direitos das Pessoas com Deficiência (PCD)', category: 'Cidadania', description: 'Conheça os direitos legais e sociais das pessoas com deficiência no Brasil.' }
];

function ManageCoursesP() {
  const [courses, setCourses] = useState(initialCourses);

  // Estados para os campos do formulário
  const [editingCourse, setEditingCourse] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  // 2. Novos estados para as notificações e erros de formulário
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [formErrors, setFormErrors] = useState({});

  // Função para mostrar a notificação
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  // Função para validar o formulário
  const validateForm = () => {
    const errors = {};
    if (!title.trim()) errors.title = 'O título do curso é obrigatório.';
    if (!category.trim()) errors.category = 'A categoria é obrigatória.';
    if (!description.trim()) errors.description = 'A descrição é obrigatória.';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const resetForm = () => {
    setEditingCourse(null);
    setTitle('');
    setCategory('');
    setDescription('');
    setFormErrors({});
  };

  // Lida com o envio do formulário (Adicionar ou Editar)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingCourse) {
      const updatedCourses = courses.map(course =>
        course.id === editingCourse.id ? { ...course, title, category, description } : course
      );
      setCourses(updatedCourses);
      showNotification('Curso atualizado com sucesso!');
    } else {
      const newCourse = {
        id: Date.now(),
        title,
        category,
        description
      };
      setCourses([...courses, newCourse]);
      showNotification('Novo curso adicionado com sucesso!');
    }

    resetForm();
  };

  // Prepara o formulário para edição
  const handleEdit = (course) => {
    setEditingCourse(course);
    setTitle(course.title);
    setCategory(course.category);
    setDescription(course.description);
    setFormErrors({});
  };

  // Exclui um curso
  const handleDelete = (courseId) => {
    if (window.confirm('Tem certeza que deseja excluir este curso?')) {
        const updatedCourses = courses.filter(course => course.id !== courseId);
        setCourses(updatedCourses);
        showNotification('Curso excluído com sucesso!', 'error');
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

      <h4 className="mb-4">{editingCourse ? 'Editando Curso' : 'Adicionar Novo Curso'}</h4>
      <form onSubmit={handleSubmit} className="card p-3 mb-4" noValidate>
        <div className="mb-3">
            <label htmlFor="course-title" className="form-label">Título do Curso</label>
            <input
                id="course-title"
                type="text"
                className={`form-control ${formErrors.title ? 'is-invalid' : ''}`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            {formErrors.title && <div className="invalid-feedback">{formErrors.title}</div>}
        </div>
        <div className="mb-3">
            <label htmlFor="course-category" className="form-label">Categoria</label>
            <input
                id="course-category"
                type="text"
                className={`form-control ${formErrors.category ? 'is-invalid' : ''}`}
                placeholder="Ex: Tecnologia, Negócios..."
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            {formErrors.category && <div className="invalid-feedback">{formErrors.category}</div>}
        </div>
        <div className="mb-3">
            <label htmlFor="course-description" className="form-label">Descrição Curta</label>
            <textarea
                id="course-description"
                className={`form-control ${formErrors.description ? 'is-invalid' : ''}`}
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {formErrors.description && <div className="invalid-feedback">{formErrors.description}</div>}
        </div>
        <div className="d-flex align-items-center mt-2">
            <button type="submit" className="btn btn-primary align-self-start">
                {editingCourse ? 'Salvar Alterações' : 'Salvar Novo Curso'}
            </button>
            {editingCourse && (
                <button type="button" className="btn btn-secondary ms-2" onClick={resetForm}>
                    Cancelar Edição
                </button>
            )}
        </div>
      </form>

      <hr className="my-4"/>

      <h5>Cursos Existentes</h5>
      <ul className="list-group">
        {courses.map(course => (
          <li key={course.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{course.title} - <strong>{course.category}</strong></span>
            <div>
              <button type="button" className="btn btn-sm btn-outline-secondary me-2" onClick={() => handleEdit(course)}>Editar</button>
              <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(course.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageCoursesP;
