import React, { useState } from 'react';
import ToastNotification from '../components/ToastNotification';

// Simulação de dados de usuários que futuramente serão do banco de dados
const initialUsers = [
  { id: 1, name: 'Cleiton Souza', email: 'cleiton.souza@gemeiu.com', role: 'admin' },
  { id: 2, name: 'Ana Beatriz', email: 'ana.beatriz@gemeiu.com', role: 'user' },
  { id: 3, name: 'Rafael Torres', email: 'rafael.t@gemeiu.com', role: 'user' },
  { id: 4, name: 'Juliana Rocha', email: 'juliana.r@gemeiu.com', role: 'user' },
  { id: 5, name: 'Lucas Martins', email: 'lucas.m@gemeiu.com', role: 'user' },
  { id: 6, name: 'Fernanda Lima', email: 'fernanda.l@gemeiu.com', role: 'user' },
  { id: 7, name: 'Gabriel Oliveira', email: 'gabriel.o@gemeiu.com', role: 'user' },
  { id: 8, name: 'Patrícia Gomes', email: 'patricia.g@gemeiu.com', role: 'user' }
];

function ManageUsersP() {
  const [users, setUsers] = useState(initialUsers);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  const handleResetPassword = (userName) => {
    if (window.confirm(`Tem certeza que deseja resetar a senha para o usuário ${userName}? Uma nova senha temporária será gerada.`)) {
      showNotification(`Senha para ${userName} resetada com sucesso!`);
    }
  };

  const handleDeleteUser = (userId, userName) => {
    if (window.confirm(`Tem certeza que deseja EXCLUIR o usuário ${userName}? Esta ação é permanente.`)) {
        setUsers(users.filter(user => user.id !== userId));
        showNotification(`Usuário ${userName} excluído com sucesso!`, 'error');
    }
  };

  const handleRoleChange = (userId, newRole) => {
    setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
    ));
    showNotification('Cargo do usuário alterado com sucesso!');
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

      <h4 className="mb-4">Gerenciar Usuários</h4>
      <div className="card">
        <div className="card-body">
            <p>Lista de todos os usuários cadastrados na plataforma.</p>
            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Cargo</th>
                            <th className="text-end">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <select 
                                        className={`form-select form-select-sm ${user.role === 'admin' ? 'fw-bold' : ''}`} 
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                        style={{ width: '120px' }}
                                    >
                                        <option value="user">Usuário</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td className="text-end">
                                    <button 
                                        className="btn btn-sm btn-outline-secondary me-2"
                                        onClick={() => handleResetPassword(user.name)}
                                    >
                                        Resetar Senha
                                    </button>
                                    <button 
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => handleDeleteUser(user.id, user.name)}
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ManageUsersP;
