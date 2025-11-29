export default class produto {
  constructor(
    nome,
    sku,
    preco,
    quantidade,
    categoria,
    descricao,
    imagens,
    ativo
  ) {
    this.nome = nome;
    this.sku = sku;
    this.preco = preco;
    this.quantidade = quantidade;
    this.categoria = categoria;
    this.descricao = descricao;
    this.imagens = imagens;
    this.ativo = ativo;
  }
}
