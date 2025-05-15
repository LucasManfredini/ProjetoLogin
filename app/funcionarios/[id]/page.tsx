'use client';

/* Importa o serviço para comunicação com a API */
import { api } from '@/services/api';

/* Importa a função para navegação programática */
import { useRouter } from 'next/navigation';

/* Importa hooks do React */
import { useEffect, useState } from 'react';

/* Estrutura da ficha de um Funcionario */
import Funcionario from '../interface/interface';

/* Componente de edição */
export default function EditarFuncionario({params}: {params: {id: string}}){

  const [funcionario, setFuncionario] = useState<Funcionario | null>(null);
  const router = useRouter();

  function buscarFuncionario(){
    const id = params.id;
    
    api.get("/funcionarios/" + id)
    .then(function(resposta){
      if (resposta.data && resposta.data.id){
        setFuncionario(resposta.data);
      } else {
        alert("Funcionario não encontrado.");
        router.push("/funcionarios");
      }
    })
    .catch(function () {
      alert("Erro ao buscar funcionarios");
      router.push("/funcionarios")
    });
  }

  function salvarAlteracoes() {
    if (funcionario){
      api.put("/funcionarios/" + funcionario.id, funcionario)
      .then(function (){
        alert("Funcionarios atualizado");
        router.push("/funcionarios");
      });
    }
  }

  function deletarfuncionario() {
    if (funcionario) {
      const confirmar = confirm("Tem certeza que deseja deletar este funcionario");
      if (confirmar){
        api.delete("/funcionarios/"+ funcionario.id)
          .then(function () {
            alert("Funcionario deletado.");
            router.push("/funcionarios");
          });
      }
    }
  }

  function desativarFuncionario(){
    if (funcionario) {
      let novoStatus = "Demitido";
      if (funcionario.status === "Demitido") {
        novoStatus = "Admitido";
      }

      api.patch("/funcionarios/" + funcionario.id, { status: novoStatus})
        .then(function () {
          alert("Status atualizado.");
          router.push("/funcionarios");
        });
    }
  }

  useEffect(function () {
    buscarFuncionario();
  }, []);

  if (!funcionario) {
    return <p style={{ padding: '20px', textAlign: 'center' }}>Carregando informações do funcionarios...</p>
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
          Editar Funcionario
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

          {/* Nome */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="nome">Nome:</label>
            <input
              id="nome"
              type="text"
              value={funcionario.nome}
              onChange={function (evento) {
                setFuncionario({
                  id: funcionario.id,
                  nome: evento.target.value,
                  cpf: funcionario.cpf,
                  email: funcionario.email,
                  dtNascimento: funcionario.dtNascimento,
                  dataAdmissao: funcionario.dataAdmissao,
                  status: funcionario.status
                });
              }}
            />
          </div>

          {/* CPF */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="cpf">CPF:</label>
            <input
              id="cpf"
              type="text"
              value={funcionario.cpf}
              onChange={function (evento) {
                setFuncionario({
                  id: funcionario.id,
                  nome: funcionario.nome,
                  cpf: evento.target.value,
                  email: funcionario.email,
                  dtNascimento: funcionario.dtNascimento,
                  dataAdmissao: funcionario.dataAdmissao,
                  status: funcionario.status
                });
              }}
            />
          </div>

          {/* Email */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={funcionario.email}
              onChange={function (evento) {
                setFuncionario({
                  id: funcionario.id,
                  nome: funcionario.nome,
                  cpf: funcionario.cpf,
                  email: evento.target.value,
                  dtNascimento: funcionario.dtNascimento,
                  dataAdmissao: funcionario.dataAdmissao,
                  status: funcionario.status
                });
              }}
            />
          </div>

          {/* Nascimento */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="nascimento">Data nascimento:</label>
            <input
              id="nascimento"
              type="date"
              value={funcionario.dtNascimento}
              onChange={function (evento) {
                setFuncionario({
                  id: funcionario.id,
                  nome: funcionario.nome,
                  cpf: funcionario.cpf,
                  email: funcionario.email,
                  dtNascimento: evento.target.value,
                  dataAdmissao: funcionario.dataAdmissao,
                  status: funcionario.status
                });
              }}
            />
          </div>

          {/* Admissao */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="adimissao">Data de Adimissão:</label>
            <input
              id="adimissao"
              type="date"
              value={funcionario.dataAdmissao}
              onChange={function (evento) {
                setFuncionario({
                  id: funcionario.id,
                  nome: funcionario.nome,
                  cpf: funcionario.cpf,
                  email: funcionario.email,
                  dtNascimento: funcionario.dtNascimento,
                  dataAdmissao: evento.target.value,
                  status: funcionario.status
                });
              }}
            />
          </div>

          {/* Status */}
          <div>
            <label>Status atual:</label>
            <strong>{funcionario.status}</strong>
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
            onClick={desativarFuncionario}
            style={{
              padding: "10px",
              backgroundColor: "#6c757d",
              color: "#fff",
              border: "none",
              borderRadius: "5px"
            }}
          >
            Admitir ou Demitir
          </button>

          <button
            onClick={deletarfuncionario}
            style={{
              padding: "10px",
              backgroundColor: "#dc3545",
              color: "#fff",
              border: "none",
              borderRadius: "5px"
            }}
          >
            Deletar Funcionario
          </button>
        </div>
      </div>
    </div>
  );
}