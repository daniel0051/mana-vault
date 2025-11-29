import Produto from "./Produto.js";

const form = document.querySelector("#form-cadastro-produto");
const btnLimpar = document.querySelector("#limpar");
const divResultado = document.querySelector("#resultado");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (form.checkValidity()) {
    // Cria objeto se os campos forem validos
    const nomeProduto = document.querySelector("#nome").value;
    const skuCodigo = document.querySelector("#sku").value;
    const quantidadeProduto = document.querySelector("#quantidade").value;
    const categoriaProduto = document.querySelector("#categoria").value;
    const descricaoProduto = document.querySelector("#descricao").value;
    const imagensProduto = document.querySelector("#imagens").value;
    const ativoProduto = document.querySelector("#ativo").value;
    const precoLimpo = $("#preco").cleanVal();
    const precoProduto = parseFloat(precoLimpo) / 100;

    const novoProduto = new Produto(
      nomeProduto,
      skuCodigo,
      precoProduto,
      quantidadeProduto,
      categoriaProduto,
      descricaoProduto,
      imagensProduto,
      ativoProduto
    );

    const listaJSON = localStorage.getItem("listaProdutos");
    const listaProdutos = JSON.parse(listaJSON) || [];
    listaProdutos.push(novoProduto);
    localStorage.setItem("listaProdutos", JSON.stringify(listaProdutos));

    divResultado.innerHTML = `
            <div class="alert alert-success mt-4">
              <h3>✅ Produto Cadastrado com Sucesso!</h3>
              <p><strong>Nome do Produto:</strong> ${novoProduto.nome}</p>
              <p><strong>SKU/Código:</strong> ${novoProduto.sku}</p>
            </div>`;
    form.reset();
  } else {
    alert("Por favor, corrija os campos destacados antes de enviar.");
  }
});

btnLimpar.addEventListener("click", function () {
  const campos = document.querySelectorAll("input, textarea, select");
  campos.forEach((campo) => {
    if (campo.type === "checkbox") {
      campo.checked = false;
    } else if (campo.tagName === "SELECT") {
      campo.selectedIndex = 0;
    } else {
      campo.value = "";
    }
  });
  divResultado.innerHTML = "";
});

// Validações
const campoSku = document.querySelector("#sku");
const erroSku = document.querySelector("#erroSku");
const campoNome = document.querySelector("#nome");
const erroNome = document.querySelector("#erroNome");
const campoPreco = document.querySelector("#preco");
const erroPreco = document.querySelector("#erroPreco");
const campoQuantidade = document.querySelector("#quantidade");
const erroQuantidade = document.querySelector("#erroQuantidade");

function validarNome() {
  if (!campoNome.checkValidity()) {
    erroNome.textContent = "Digite o nome do produto";
  } else {
    erroNome.textContent = "";
  }
}

function validarSku() {
  if (!campoSku.checkValidity()) {
    erroSku.textContent =
      "Código inválido. Verifique o formato. (XYZ-CAM-POLO-AM-M)";
  } else {
    erroSku.textContent = "";
  }
}

function validarPreco() {
  if (!campoPreco.checkValidity()) {
    erroPreco.textContent = "Digite o valor do produto";
  } else {
    erroPreco.textContent = "";
  }
}

function validarQuantidade() {
  if (!campoQuantidade.checkValidity()) {
    erroQuantidade.textContent = "Digite a quantidade de produtos";
  } else {
    erroQuantidade.textContent = "";
  }
}

// Nome
campoNome.addEventListener("input", validarNome);
campoNome.addEventListener("blur", validarNome);

// SKU
campoSku.addEventListener("input", validarSku);
campoSku.addEventListener("blur", validarSku);

// Preço
campoPreco.addEventListener("input", validarPreco);
campoPreco.addEventListener("blur", validarPreco);

// Quantidade
campoQuantidade.addEventListener("input", validarQuantidade);
campoQuantidade.addEventListener("blur", validarQuantidade);

$(function () {
  $("#preco").mask("000.000.000,00", { reverse: true });
});
