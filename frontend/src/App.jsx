import './App.css'
import AlunoForm from './components/AlunoForm'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <div className="app-layout">
      <div className="header-banner">
        <h1>Gestão Escolar DTI</h1>
      </div>
      
      <div className="main-content">
        <AlunoForm />
        <Dashboard />
      </div>
    </div>
  )
}

export default App