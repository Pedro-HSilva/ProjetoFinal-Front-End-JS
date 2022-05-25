const form = document.querySelector("#forms") as HTMLFormElement;
const botao: any = document.getElementById("criarContaDois");

function validarCadastro() {
  const nomeUsuario: any = document.getElementById("username");
  const senhaUsuario: any = document.getElementById("password");
  const senhaDois: any = document.getElementById("passwordrepeat");

  if (!nomeUsuario.value || !senhaUsuario.value || !senhaDois.value) {
    alert("Todos os campos são de preenchimento obrigatório");
    return;
  } else if (senhaUsuario.value !== senhaDois.value) {
    alert("As senhas devem ser iguais");
    return;
  }

  const userInfo = {
    nome: nomeUsuario.value,
    senha: senhaUsuario.value,
    messages: [],
  };

  localStorage.setItem(userInfo.nome, JSON.stringify(userInfo));
  window.location.href = "login.html";
}

botao.addEventListener("click", validarCadastro);
