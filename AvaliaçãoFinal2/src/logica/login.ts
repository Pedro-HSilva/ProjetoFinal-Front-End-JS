const botaoEntrar: any = document.getElementById("entrar");

function entrarLista() {
  const nomeUsuario: any = document.getElementById("username");
  const senhaUsuario: any = document.getElementById("password");
  const usernameStorage: any = localStorage.getItem(nomeUsuario.value);
  const usernameObjeto: any = JSON.parse(usernameStorage);

  if (!nomeUsuario.value || !senhaUsuario.value) {
    alert("Todos os campos são de preenchimento obrigatório");
    return;
  } else if (!usernameStorage || usernameObjeto.senha !== senhaUsuario.value) {
    alert("Usuário ou senha não cadastrado!");
    return;
  } else if (
    usernameObjeto.senha === senhaUsuario.value ||
    usernameObjeto.nome === nomeUsuario.value
  ) {
    sessionStorage.setItem("usuarioLogado", usernameStorage);
    window.location.href = "listaRecados.html";
  }
}

botaoEntrar.addEventListener("click", entrarLista);
