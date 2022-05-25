"use strict";
const botaoEntrar = document.getElementById("entrar");
function entrarLista() {
    const nomeUsuario = document.getElementById("username");
    const senhaUsuario = document.getElementById("password");
    const usernameStorage = localStorage.getItem(nomeUsuario.value);
    const usernameObjeto = JSON.parse(usernameStorage);
    if (!nomeUsuario.value || !senhaUsuario.value) {
        alert("Todos os campos são de preenchimento obrigatório");
        return;
    }
    else if (!usernameStorage || usernameObjeto.senha !== senhaUsuario.value) {
        alert("Usuário ou senha não cadastrado!");
        return;
    }
    else if (usernameObjeto.senha === senhaUsuario.value ||
        usernameObjeto.nome === nomeUsuario.value) {
        sessionStorage.setItem("usuarioLogado", usernameStorage);
        window.location.href = "listaRecados.html";
    }
}
botaoEntrar.addEventListener("click", entrarLista);
