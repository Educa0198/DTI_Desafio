import { useState } from 'react';
import './AlunoForm.css';

export default function AlunoForm() {
 
  const [formData, setFormData] = useState({
    nome: '',
    nota1: '',
    nota2: '',
    nota3: '',
    nota4: '',
    nota5: '',
    presenca: ''
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    
    const payload = {
      nome: formData.nome,
      nota1: parseFloat(formData.nota1),
      nota2: parseFloat(formData.nota2),
      nota3: parseFloat(formData.nota3),
      nota4: parseFloat(formData.nota4),
      nota5: parseFloat(formData.nota5),
      presenca: parseInt(formData.presenca, 10)
    };

    try {

      const response = await fetch('http://localhost:8080/api/alunos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(payload), 
      });

     
      if (response.ok) {
        alert("Aluno cadastrado com sucesso!");
        
        
        setFormData({
          nome: '', nota1: '', nota2: '', nota3: '', nota4: '', nota5: '', presenca: ''
        });
      } else {
        alert("Erro ao cadastrar aluno. Verifique o console.");
      }
      
    } catch (error) {
      console.error("Erro de conexão:", error);
      alert("Falha ao conectar. O servidor Spring Boot está rodando?");
    }
  };

  return (
    <div className="form-container">
      <h2>Cadastrar Novo Aluno</h2>
      <p className="subtitle">Insira as notas e a frequência do aluno.</p>

      <form onSubmit={handleSubmit} className="aluno-form">
        
        <div className="input-group full-width">
          <label>Nome do Aluno</label>
          <input type="text" name="nome" value={formData.nome} onChange={handleChange} required placeholder="Ex: João Silva" />
        </div>

        <div className="grades-grid">
          <div className="input-group">
            <label>Nota 1</label>
            <input type="number" name="nota1" min="0" max="10" step="0.1" value={formData.nota1} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Nota 2</label>
            <input type="number" name="nota2" min="0" max="10" step="0.1" value={formData.nota2} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Nota 3</label>
            <input type="number" name="nota3" min="0" max="10" step="0.1" value={formData.nota3} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Nota 4</label>
            <input type="number" name="nota4" min="0" max="10" step="0.1" value={formData.nota4} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Nota 5</label>
            <input type="number" name="nota5" min="0" max="10" step="0.1" value={formData.nota5} onChange={handleChange} required />
          </div>
        </div>

        <div className="input-group full-width">
          <label>Frequência (%)</label>
          <input type="number" name="presenca" min="0" max="100" value={formData.presenca} onChange={handleChange} required placeholder="Ex: 85" />
        </div>

        <button type="submit" className="submit-btn">Cadastrar Aluno</button>
      </form>
    </div>
  );
}