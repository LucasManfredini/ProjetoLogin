'use client';

/* Importa o serviço de comunicação com a API */
import { api } from '@/services/api';

/* Importa o roteador para navegação programada */
import { useRouter } from 'next/navigation';

/* Importa hooks do React */
import { useState } from 'react';

/* Estrutura do novo usuário */
interface Funcionario {
  nome: string;
  cpf: string;
  email: string;
  dtNascimento: string;
  dataAdmissao: string;
  status: string;
}

/* Tela de cadastro */
export default function CadastrarFuncionario() {
  const [novoFuncionario, setNovoFuncionario] = useState<Funcionario>({
    nome: '',
    cpf: '',
    email: '',
    dtNascimento: '',
    dataAdmissao: '',
    status: 'Admitido'  
  });

  const router = useRouter();

  function salvarUsuario() {
    api.post("/funcionarios", novoFuncionario)
      .then(function () {
        alert("Usuário cadastrado com sucesso!");
        router.push("/funcionarios");
      })
      .catch(function () {
        alert("Erro ao cadastrar funcionairo.");
      });
  }

  /* Estrutura visual da tela */
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f0f2f5",
      padding: "20px"
    }}>
      <div style={{
        backgroundColor: "#ffffff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "400px"
      }}>
        <h1 style={{
          fontSize: "22px",
          fontWeight: "bold",
          marginBottom: "20px",
          textAlign: "center"
        }}>
          Cadastrar Novo Funcionario
        </h1>

        {/* Formulário */}
        <form style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

          {/* Campo: Nome */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="campoNome">Nome completo:</label>
            <input
              id="campoNome"
              type="text"
              placeholder="Digite o nome"
              value={novoFuncionario.nome}
              onChange={function (evento) {
                setNovoFuncionario({
                  nome: evento.target.value,
                  cpf: novoFuncionario.cpf,
                  email: novoFuncionario.email,
                  dtNascimento: novoFuncionario.dtNascimento,
                  dataAdmissao: novoFuncionario.dataAdmissao,
                  status: novoFuncionario.status
                });
              }}
              style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
          </div>

          {/* Campo: CPF */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="campoCpf">CPF:</label>
            <input
              id="campoCpf"
              type="text"
              placeholder="Digite o CPF"
              value={novoFuncionario.cpf}
              onChange={function (evento) {
                setNovoFuncionario({
                  nome: novoFuncionario.nome,
                  cpf: evento.target.value,
                  email: novoFuncionario.email,
                  dtNascimento: novoFuncionario.dtNascimento,
                  dataAdmissao: novoFuncionario.dataAdmissao,
                  status: novoFuncionario.status
                });
              }}
              style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
          </div>

          {/* Campo: Email */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="campoEmail">Email:</label>
            <input
              id="campoEmail"
              type="email"
              placeholder="Digite o email"
              value={novoFuncionario.email}
              onChange={function (evento) {
                setNovoFuncionario({
                  nome: novoFuncionario.nome,
                  cpf: novoFuncionario.cpf,
                  email: evento.target.value,
                  dtNascimento: novoFuncionario.dtNascimento,
                  dataAdmissao: novoFuncionario.dataAdmissao,
                  status: novoFuncionario.status
                });
              }}
              style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
          </div>

          {/* Campo: Nascimento */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="campoDtnascimento">Nascimento:</label>
            <input
              id="campoDtnascimento"
              type="date"
              placeholder="Digite a data de nascimento"
              value={novoFuncionario.dtNascimento}
              onChange={function (evento) {
                setNovoFuncionario({
                  nome: novoFuncionario.nome,
                  cpf: novoFuncionario.cpf,
                  email: novoFuncionario.email,
                  dtNascimento: evento.target.value,
                  dataAdmissao: novoFuncionario.dataAdmissao,
                  status: novoFuncionario.status
                });
              }}
              style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
          </div>

          {/* Campo: Admissão */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="campoDtAdmissao">Admissão:</label>
            <input
              id="campoDtAdmissao"
              type="date"
              placeholder="Digite a data de Admissão"
              value={novoFuncionario.dataAdmissao}
              onChange={function (evento) {
                setNovoFuncionario({
                  nome: novoFuncionario.nome,
                  cpf: novoFuncionario.cpf,
                  email: novoFuncionario.email,
                  dtNascimento: novoFuncionario.dtNascimento,
                  dataAdmissao: evento.target.value,
                  status: novoFuncionario.status
                });
              }}
              style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
          </div>
          

          {/* Status atual */}
          <div>
            <label>Status atual:</label>
            <strong style={{ marginLeft: "5px" }}>{novoFuncionario.status}</strong>
          </div>

          {/* Botão de cadastro */}
          <button
            type="button"
            onClick={salvarUsuario}
            style={{
              padding: "10px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Salvar Cadastro
          </button>

          {/* Link para voltar */}
          <a
            href="/funcionarios"
            style={{
              marginTop: "10px",
              textAlign: "center",
              textDecoration: "none",
              color: "#007bff"
            }}
          >
            ← Voltar para Lista de Funcionarios
          </a>

        </form>
      </div>
    </div>
  );
}
