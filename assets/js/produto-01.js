async function buscarCep(cep) {
  const cepLimpo = cep.replace(/\D/g, "");
  if (cepLimpo.length !== 8) {
    console.log("CEP inválido. Deve conter 8 dígitos.");
    return null;
  }

  const url = `https://viacep.com.br/ws/${cepLimpo}/json/`;

  try {
    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new Error(`Erro na requisição: Status ${resposta.status}`);
    }

    const dados = await resposta.json();

    if (dados.erro) {
      throw new Error("CEP não encontrado ou inexistente.");
    }
    return dados;
  } catch (error) {
    console.error("Falha ao buscar CEP:", error.message);
    return null;
  }
}

const pesquisar = document.querySelector("#procurar");

pesquisar.addEventListener("click", async function (event) {
  event.preventDefault();

  const valueCep = cep.value;
  const resultado = document.querySelector("#resultadoCep");
  resultado.innerHTML = "Buscando...";

  const dadosEndereco = await buscarCep(valueCep);

  if (dadosEndereco) {
    resultado.innerHTML = `
    <p class='mb-1'><strong>Logradouro:</strong> ${dadosEndereco.logradouro}</p>
    <p class='mb-1'><strong>Bairro:</strong> ${dadosEndereco.bairro}</p>
    <p class='mb-1'><strong>Localidade:</strong> ${dadosEndereco.localidade}/${dadosEndereco.uf}</p>
    <p class='mb-0'><strong>Preço: </strong><span class='bg-dark text-warning px-3 rounded-pill'>R$ 16,90</span></p>
    `;
  } else {
    resultado.innerHTML = `<p class="text-danger">CEP não encontrado ou formato inválido.</p>`;
  }
});
