import { useState, useEffect } from 'react';
import './Dashboard.css';

export default function Dashboard() {
  
  const [alunos, setAlunos] = useState([]);
  const [medias, setMedias] = useState([0, 0, 0, 0, 0]);
  const [destaques, setDestaques] = useState([]);
  const [riscos, setRiscos] = useState([]);

  const carregarDados = async () => {
    try {
      const [resAlunos, resMedias, resDestaques, resRiscos] = await Promise.all([
        fetch('http://localhost:8080/api/alunos'),
        fetch('http://localhost:8080/api/alunos/medias-turma'),
        fetch('http://localhost:8080/api/alunos/acima-media'),
        fetch('http://localhost:8080/api/alunos/risco-frequencia')
      ]);

      setAlunos(await resAlunos.json());
      setMedias(await resMedias.json());
      setDestaques(await resDestaques.json());
      setRiscos(await resRiscos.json());

    } catch (error) {
      console.error("Erro ao buscar dados do Dashboard:", error);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  return (
    <div className="dashboard-container">
      
      {/* HEADER WITH REFRESH BUTTON */}
      <div className="dash-header">
        <h2>Painel da Turma</h2>
        <button className="refresh-btn" onClick={carregarDados}>🔄 Atualizar Dados</button>
      </div>

      {/* SECTION 1: CLASS AVERAGES */}
      <div className="card">
        <h3>Média da Turma por Disciplina</h3>
        <div className="medias-grid">
          {medias.map((media, index) => (
            <div key={index} className="media-box">
              <span>D{index + 1}</span>
              <strong>{media.toFixed(1)}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="alerts-container">
        {/* SECTION 2: ABOVE AVERAGE STUDENTS */}
        <div className="card highlight-card">
          <h3>🌟 Destaques (Acima da Média)</h3>
          {destaques.length === 0 ? <p className="empty-msg">Nenhum aluno acima da média geral ainda.</p> : (
            <ul>
              {destaques.map(a => <li key={a.id}>{a.nome}</li>)}
            </ul>
          )}
        </div>

        {/* SECTION 3: AT RISK STUDENTS */}
        <div className="card risk-card">
            <h3>⚠️ Atenção (75% Presença)</h3>
          {riscos.length === 0 ? <p className="empty-msg">Nenhum aluno em risco de falta.</p> : (
            <ul>
              {riscos.map(a => <li key={a.id}>{a.nome} ({a.presenca}%)</li>)}
            </ul>
          )}
        </div>
      </div>

      {/* SECTION 4: ALL STUDENTS TABLE */}
      <div className="card">
        <h3>Lista Geral de Alunos</h3>
        <table className="alunos-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>N1</th><th>N2</th><th>N3</th><th>N4</th><th>N5</th>
              <th>Presença</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map(a => (
              <tr key={a.id}>
                <td>{a.nome}</td>
                <td>{a.nota1}</td><td>{a.nota2}</td><td>{a.nota3}</td><td>{a.nota4}</td><td>{a.nota5}</td>
                <td>{a.presenca}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}