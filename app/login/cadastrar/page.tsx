'use client';

/* Importa o serviço de comunicação com a API */
import { api } from '@/services/api';

/* Importa o roteador para navegação programada */
import { useRouter } from 'next/navigation';

/* Importa hooks do React */
import { useState } from 'react';

/* Estrutura do novo usuário */
interface Usuario {
  nome: string;
  usuario: string;
  senha: string;
  status: string;
}

/* Tela de cadastro */
export default function CadastrarUsuario() {
  const [novoUsuario, setNovoUsuario] = useState<Usuario>({
    nome: '',
    usuario: '',
    senha: '',
    status: 'ativo'
  });

  const router = useRouter();

  function salvarUsuario() {
    api.post("/login", novoUsuario)
      .then(function () {
        alert("Usuário cadastrado com sucesso!");
        router.push("/login");
      })
      .catch(function () {
        alert("Erro ao cadastrar usuário.");
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
          Cadastrar Novo Usuário
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
              value={novoUsuario.nome}
              onChange={function (evento) {
                setNovoUsuario({
                  nome: evento.target.value,
                  usuario: novoUsuario.usuario,
                  senha: novoUsuario.senha,
                  status: novoUsuario.status
                });
              }}
              style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
          </div>

          {/* Campo: Login */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="campoLogin">Login de acesso:</label>
            <input
              id="campoLogin"
              type="text"
              placeholder="Digite o login"
              value={novoUsuario.usuario}
              onChange={function (evento) {
                setNovoUsuario({
                  nome: novoUsuario.nome,
                  usuario: evento.target.value,
                  senha: novoUsuario.senha,
                  status: novoUsuario.status
                });
              }}
              style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
          </div>

          {/* Campo: Senha */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="campoSenha">Senha:</label>
            <input
              id="campoSenha"
              type="password"
              placeholder="Digite a senha"
              value={novoUsuario.senha}
              onChange={function (evento) {
                setNovoUsuario({
                  nome: novoUsuario.nome,
                  usuario: novoUsuario.usuario,
                  senha: evento.target.value,
                  status: novoUsuario.status
                });
              }}
              style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
          </div>

          {/* Status atual */}
          <div>
            <label>Status atual:</label>
            <strong style={{ marginLeft: "5px" }}>{novoUsuario.status}</strong>
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
            href="/login"
            style={{
              marginTop: "10px",
              textAlign: "center",
              textDecoration: "none",
              color: "#007bff"
            }}
          >
            ← Voltar para Lista de Usuários
          </a>

        </form>
      </div>
    </div>
  );
}
