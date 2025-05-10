'use client';

/* Importa o serviço para comunicação com a API */
import { api } from '@/services/api';

/* Importa a função para navegação programática */
import { useRouter } from 'next/navigation';

/* Importa hooks do React */
import { useEffect, useState } from 'react';

/* Estrutura da ficha de um usuário */
interface Usuario {
  id: number;
  nome: string;
  usuario: string;
  senha: string;
  status: string;
}

/* Componente de edição */
export default function EditarUsuario({ params }: { params: { id: string } }) {

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const router = useRouter();

  function buscarUsuario() {
    const id = params.id;

    api.get("/login/" + id)
      .then(function (resposta) {
        if (resposta.data && resposta.data.id) {
          setUsuario(resposta.data);
        } else {
          alert("Usuário não encontrado.");
          router.push("/login");
        }
      })
      .catch(function () {
        alert("Erro ao buscar usuário.");
        router.push("/login");
      });
  }

  function salvarAlteracoes() {
    if (usuario) {
      api.put("/login/" + usuario.id, usuario)
        .then(function () {
          alert("Usuário atualizado.");
          router.push("/login");
        });
    }
  }

  function deletarUsuario() {
    if (usuario) {
      const confirmar = confirm("Tem certeza que deseja deletar este usuário?");
      if (confirmar) {
        api.delete("/login/" + usuario.id)
          .then(function () {
            alert("Usuário deletado.");
            router.push("/login");
          });
      }
    }
  }

  function desativarUsuario() {
    if (usuario) {
      let novoStatus = "inativo";
      if (usuario.status === "inativo") {
        novoStatus = "ativo";
      }

      api.patch("/login/" + usuario.id, { status: novoStatus })
        .then(function () {
          alert("Status atualizado.");
          router.push("/login");
        });
    }
  }

  useEffect(function () {
    buscarUsuario();
  }, []);

  if (!usuario) {
    return <p style={{ padding: '20px', textAlign: 'center' }}>Carregando informações do usuário...</p>;
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5f5f5"
    }}>
      <div style={{
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "400px"
      }}>
        <h1 style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "20px",
          textAlign: "center"
        }}>
          Editar Usuário
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

          {/* Nome */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="nome">Nome:</label>
            <input
              id="nome"
              type="text"
              value={usuario.nome}
              onChange={function (evento) {
                setUsuario({
                  id: usuario.id,
                  nome: evento.target.value,
                  usuario: usuario.usuario,
                  senha: usuario.senha,
                  status: usuario.status
                });
              }}
            />
          </div>

          {/* Login */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="usuario">Login:</label>
            <input
              id="usuario"
              type="text"
              value={usuario.usuario}
              onChange={function (evento) {
                setUsuario({
                  id: usuario.id,
                  nome: usuario.nome,
                  usuario: evento.target.value,
                  senha: usuario.senha,
                  status: usuario.status
                });
              }}
            />
          </div>

          {/* Senha */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="senha">Senha:</label>
            <input
              id="senha"
              type="password"
              value={usuario.senha}
              onChange={function (evento) {
                setUsuario({
                  id: usuario.id,
                  nome: usuario.nome,
                  usuario: usuario.usuario,
                  senha: evento.target.value,
                  status: usuario.status
                });
              }}
            />
          </div>

          {/* Status */}
          <div>
            <label>Status atual:</label>
            <strong>{usuario.status}</strong>
          </div>

          {/* Botões */}
          <button
            onClick={salvarAlteracoes}
            style={{
              padding: "10px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px"
            }}
          >
            Salvar Alterações
          </button>

          <button
            onClick={desativarUsuario}
            style={{
              padding: "10px",
              backgroundColor: "#6c757d",
              color: "#fff",
              border: "none",
              borderRadius: "5px"
            }}
          >
            Ativar ou Desativar
          </button>

          <button
            onClick={deletarUsuario}
            style={{
              padding: "10px",
              backgroundColor: "#dc3545",
              color: "#fff",
              border: "none",
              borderRadius: "5px"
            }}
          >
            Deletar Usuário
          </button>
        </div>
      </div>
    </div>
  );
}
