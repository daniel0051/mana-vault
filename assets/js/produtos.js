document.addEventListener("DOMContentLoaded", function () {
  const lista = document.querySelector("#listaProdutos");

  const listaJSON = localStorage.getItem("listaProdutos");
  const listaProdutos = JSON.parse(listaJSON) || [];

  let htmlContent = "";

  if (listaProdutos.length === 0) {
    lista.innerHTML =
      '<li class="col-12"><p class="alert alert-info">Não há produtos cadastrados salvos.</p></li>';
    return;
  }

  listaProdutos.forEach((produto) => {
    const precoFormatado = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(produto.preco);

    const imagemSrc =
      "https://res.cloudinary.com/dvnfe2e2v/image/upload/f_auto,q_auto/v1760816827/produto-01-d_etdjrd.webp";

    htmlContent += `
            <li class="col-6 col-md-3 mb-4">
                <div class="card border-0 h-100">
                    <a href="#">
                        <img
                            src="${imagemSrc}"
                            class="card-img-top mobile-img"
                            alt="${produto.nome}"
                        />
                    </a>
                    <div class="card-body text-center p-0 mt-2 d-flex flex-column justify-content-between">
                        <h5 class="card-title fw-medium fs-5">
                            ${produto.nome}
                        </h5>
                        <p class="card-text text-start">${precoFormatado}</p>
                        
                        <div class="d-grid mt-3">
                            <a href="#" class="btn btn-primary text-white">Comprar</a>
                        </div>
                    </div>
                </div>
            </li>
        `;
  });

  lista.innerHTML = htmlContent;
});

$(function () {
  const painel = $("#listaProdutos");

  painel.hide();

  painel.fadeIn(800);
});

// Fake API
const FAKE_API_URL = "http://localhost:3000/produtos";

function buscarProdutos() {
  fetch(FAKE_API_URL)
    .then((r) => {
      if (!r.ok) {
        throw new Error(`Erro ao carregar produtos: Status ${r.status}`);
      }
      return r.json();
    })
    .then((dados) => {
      exibirProdutos(dados);
    })
    .catch((error) => {
      const painelErro = document.querySelector("#painel-erro");
      if (painelErro) {
        painelErro.innerHTML = `<p class="alert alert-danger">Falha ao conectar com o catálogo de produtos. ${error.message}</p>`;
      }
      console.error("Erro na API Fake:", error);
    });
}

function exibirProdutos(produtos) {
  const lista = document.querySelector("#ApiFake");

  let html = "<h4>Produtos em Destaque da API Fake:</h4>";

  produtos.forEach((produto) => {
    html += `<li class="col-6 col-md-3 mb-4">
                <div class="card border-0 h-100">
                    <a href="#">
                        <img
                            src="${produto.imagem}"
                            class="card-img-top mobile-img"
                            alt="${produto.nome}"
                        />
                    </a>
                    <div class="card-body text-center p-0 mt-2 d-flex flex-column justify-content-between">
                        <h5 class="card-title fw-medium fs-5">
                            ${produto.nome}
                        </h5>
                        <p class="card-text text-start">${produto.preco}</p>
                        
                        <div class="d-grid mt-3">
                            <a href="#" class="btn btn-primary text-white">Comprar</a>
                        </div>
                    </div>
                </div>
            </li>`;

    html += "</ul>";
    lista.innerHTML = html;
  });
}

$(function () {
  buscarProdutos();
});
