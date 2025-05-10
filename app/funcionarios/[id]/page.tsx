'use client';

/* Importa o serviço para comunicação com a API */
import { api } from '@/services/api';

/* Importa a função para navegação programática */
import { useRouter } from 'next/navigation';

/* Importa hooks do React */
import { useEffect, useState } from 'react';

/* Estrutura da ficha de um usuário */
interface Funcionario {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  dtNascimento: string;
  dataAdmissao: string;
  status: string;
}

/* Componente de edição */
export default function EditarFuncionario({params}: {params: {id: string}}){

  const [funcionario, setFuncionario] = useState<Funcionario | null>(null);
  const router = useRouter();

  function buscarUsuario(){
    const id = params.id;
    api.get("/funcionarios" + id)
    .then(function(resposta){

    })
  }
}