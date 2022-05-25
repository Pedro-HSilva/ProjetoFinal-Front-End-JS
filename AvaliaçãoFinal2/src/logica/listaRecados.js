"use strict";
const usuarioLogado = sessionStorage.getItem("usuarioLogado");
const usuarioLogadoObjeto = JSON.parse(usuarioLogado);
const tabela = document.getElementById("table");
document.addEventListener("DOMContentLoaded", () => {
    if (!usuarioLogadoObjeto) {
        alert("Usuário não está logado");
        window.location.href = "login.html";
        return;
    }
    preencherTabela();
});
//valor dessa função é o objeto
function pegarLocalStorage() {
    const userInfos = JSON.parse(localStorage.getItem(usuarioLogadoObjeto.nome) || "[]");
    return userInfos;
}
function setarLocalStorage(param) {
    localStorage.setItem(usuarioLogadoObjeto.nome, JSON.stringify(param));
}
const formulario = document.getElementById("info_recado");
const inputDescricao = document.getElementById("descricao");
const inputDetalhamento = document.getElementById("detalhamento");
const botaoSalvar = document.getElementById("salvar");
function salvarRecados(event) {
    event.preventDefault();
    let mensagens = pegarLocalStorage().messages;
    if (!inputDescricao.value || !inputDetalhamento.value) {
        alert("Todos os campos são de preenchimento obrigatório!");
        return;
    }
    const recado = {
        id: definirID(),
        descricao: inputDescricao.value,
        detalhamento: inputDetalhamento.value,
    };
    mensagens.push(recado);
    const userInfos = pegarLocalStorage();
    userInfos.messages = mensagens;
    setarLocalStorage(userInfos);
    preencherTabela();
}
function definirID() {
    let maximo = 0;
    const mensagens = pegarLocalStorage().messages;
    mensagens.forEach((mensagem) => {
        if (mensagem.id > maximo) {
            maximo = mensagem.id;
        }
    });
    return maximo + 1;
}
const preencherTabela = () => {
    tabela.innerHTML = `
  
  <br>
  <tr id="identificador">
  
  <th class="item"><ins><b>#</b></ins></th>
  <th class="item"><ins><b>Descrição</b></ins></th>
  <th class="item2"><ins><b>Detalhamento</b></ins></th>
  <th class="item2"><ins><b>Ação</b></ins></th>
  
  </tr>
  <br>
  
  `;
    let recados = pegarLocalStorage().messages;
    let index = 0;
    for (const mensagem of recados) {
        index++;
        tabela.innerHTML += `
    
    <tr id="itensTabela">
        <td class="tds" id="num">${index}</td>
        <td class="tds">${mensagem.descricao}</td>
        <td class="tds">${mensagem.detalhamento}</td>
        <td class="tds"><button style="cursor: pointer" type="button" id='btn-editar' onclick="editarMensagem(${mensagem.id})">EDITAR</button>
        <button style="cursor: pointer" id="btn-apagar" type="button" onclick="removerRecado(${mensagem.id})">APAGAR</button>
        </td>
        
    </tr>
    `;
    }
};
const removerRecado = (id) => {
    const userInfos = pegarLocalStorage();
    const recados = pegarLocalStorage().messages;
    const removeRecados = recados.findIndex((mensagem) => {
        return mensagem.id === id;
    });
    recados.splice(removeRecados, 1);
    userInfos.messages = recados;
    if (confirm("Queres mesmo remover o recado?")) {
        setarLocalStorage(userInfos);
        preencherTabela();
    }
};
function editarMensagem(id) {
    const descricao = prompt("Editar descrição:");
    const detalhamento = prompt("Edite seu detalhe:");
    if (!descricao || !detalhamento) {
        alert("Você precisa digitar alguma valor:");
        return;
    }
    if (descricao.length > 40 || detalhamento.length > 60) {
        alert("O limite de caracteres é de 30 para a descrição e 50 para o detalhe.");
        return;
    }
    const userInfos = pegarLocalStorage();
    let recados = userInfos.messages;
    const recadosIndex = recados.findIndex((mensagem) => {
        return mensagem.id === id;
    });
    recados[recadosIndex].descricao = descricao;
    recados[recadosIndex].detalhamento = detalhamento;
    setarLocalStorage(userInfos);
    preencherTabela();
}
formulario === null || formulario === void 0 ? void 0 : formulario.addEventListener("submit", salvarRecados);
