"use client";

/* Importa o hook useEffect para executar algo assim que a tela abrir */
/* Importa o useState para guardar os usuários que vamos buscar */
import { useEffect, useState } from "react";

/* Link é usado para criar navegações entre páginas de forma tradicional */
import Link from "next/link";

/* useRouter é usado quando queremos navegar de forma programada usando funções */
import { useRouter } from "next/navigation";

/* Importa a nossa conexão pronta do axios */
import { api } from "@/services/api";

/* 
Aqui definimos como é um "usuário" dentro do sistema.
É como se a gente desenhasse o formato de uma ficha:
- Cada usuário terá: id, nome, usuario, senha e status.
*/
import Funcionario from "./interface/interface";

/* 
Essa função é o nosso componente de página.
Toda vez que essa página for aberta, o Next.js vai chamar essa função.
*/
export default function Login() {

    /* 
    Aqui criamos uma caixinha (estado) chamada usuarios.
    Começamos ela vazia ([]), mas depois vamos encher com os dados que vierem do servidor.
    */
    const [funcionarios, setUsuarios] = useState<Funcionario[]>([]);

    /* 
    useRouter é o nosso motorista: ele leva o usuário para outra tela quando mandarmos.
    */
    const router = useRouter();

    /* 
    Essa função serve para buscar os usuários no banco (json-server).
    É como ligar para o estoque e pedir a lista de produtos.
    */
    function carregarUsuarios() {
        /* 
        Chamamos o servidor (axios faz a ligação).
        Quando a resposta chegar (.then), atualizamos nossa caixinha (estado).
        */
        api.get("/funcionarios")
            .then(function (resposta) {
                /* 
                resposta.data é onde está a lista de usuários que o servidor mandou de volta.
                Agora colocamos esses usuários na nossa caixinha.
                */
                setUsuarios(resposta.data);
            });
    }

    /* 
    useEffect faz a função carregarUsuarios ser chamada automaticamente assim que a página abrir.
    Ou seja: quando o cliente entrar na loja, já mostramos os produtos na vitrine!
    */
    useEffect(function () {
        carregarUsuarios();
    }, []);

    /* 
    Agora começamos a desenhar o que vai aparecer na tela (o retorno do componente).
    */
    return (
        <div style={{ padding: "20px" }}>
            <h1>LISTA DE FUNCIONARIOS</h1>

            {/* 
            ul é uma lista (unordered list).
            Dentro dela vamos colocar vários itens (li) - um para cada usuário.
            */}
            <ul>
                {
                    funcionarios.map(function (funcionario) {
                        /* 
                        Para cada usuário encontrado, criamos um item na lista.
                        E deixamos ele clicável: se clicar, vamos para a tela de edição daquele usuário.
                        */
                        return (
                            <li
                                key={funcionario.id} /* Importante: cada item precisa de uma chave única */
                                onClick={function () {
                                    /* 
                                    Quando o usuário clicar no nome, levamos ele para a página específica.
                                    Exemplo: se o ID for 3, vamos para /login/3
                                    */
                                    router.push(`/funcionarios/${funcionario.id}`);
                                }}
                                style={{
                                    border: "1px solid black",
                                    padding: "10px",
                                    marginBottom: "10px",
                                    cursor: "pointer",
                                    borderRadius: "5px"
                                }}
                            >
                                {/* Mostramos as informações do usuário */}
                                <strong>NOME:</strong> {funcionario.nome} -
                                <strong> CPF:</strong> {funcionario.cpf} -
                                <strong> E-MAIL:</strong> {funcionario.email}
                                <strong> NASCIMENTO:</strong> {funcionario.dtNascimento} -
                                <strong> ADIMISSÃO:</strong> {funcionario.cpf}
                            </li>
                        );
                    })
                }
            </ul>

            <br />

            {/* 
            Criamos aqui um botão para o usuário poder cadastrar um novo usuário.
            Quando clicar, vamos levar para uma página de cadastro.
            */}
            <div style={{ marginBottom: "20px" }}>
                <Link href="/funcionarios/cadastrar" style={{
                    padding: "10px",
                    backgroundColor: "green",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "5px"
                }}>
                    Cadastrar Novo Funcionario
                </Link>
            </div>

            {/* 
            Link serve para voltar para a página inicial da aplicação.
            */}
            <Link href="/">VOLTAR PARA INÍCIO</Link>
        </div>
    );
}
