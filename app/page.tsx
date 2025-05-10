'use client';

/* Importa o roteador para navegação programada */
import { useRouter } from 'next/navigation';

/* Componente principal da página inicial */
export default function PaginaInicial() {
  /* Criamos o motorista para navegar entre telas */
  const router = useRouter();

  /* Função para ir para a tela de cadastro de usuários (login) */
  function irParaCadastroUsuarios() {
    router.push("/login/cadastrar");
  }

  /* Função para ir para a tela de cadastro de funcionários */
  function irParaCadastroFuncionarios() {
    router.push("/funcionarios/cadastrar");
  }

  /* Retorno da interface visual */
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f4f4f4",
      padding: "20px"
    }}>
      <div style={{
        backgroundColor: "#ffffff",
        padding: "40px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center"
      }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Bem-vindo ao Sistema</h1>

        {/* Botão para cadastrar login */}
        <button
          onClick={irParaCadastroUsuarios}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          Cadastrar Usuário (Login)
        </button>

        {/* Botão para cadastrar funcionário */}
        <button
          onClick={irParaCadastroFuncionarios}
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          Cadastrar Funcionário
        </button>
      </div>
    </div>
  );
}
