import { catalogo, salvarLocalStorage, lerLocalStorage } from "./utilidades.js";

let idsProdutoCarrinhoComQuantidade = lerLocalStorage('carrinho') ?? {};

function abrirCarrinho() {
  document.getElementById("carrinho").classList.remove("right-[-360px]");
  document.getElementById("carrinho").classList.add("right-[0px]");
}

function fecharCarrinho() {
  document.getElementById("carrinho").classList.remove("right-[0px]");
  document.getElementById("carrinho").classList.add("right-[-360px]");
}

function IrParaCheckout(){
  if(Object.keys(idsProdutoCarrinhoComQuantidade).length === 0){
    return;
  }

  location.href += "checkout.html";
}


export function iniciarCarrinho() {
  let botaoFecharCarrinho = document.getElementById("fechar-carrinho");
  let botaoAbrirCarrinho = document.getElementById("abrir-carrinho");
  let botaoIrParaCheckout = document.getElementById("botao-finalizar-compra")
  botaoAbrirCarrinho.addEventListener("click", abrirCarrinho);
  botaoFecharCarrinho.addEventListener("click", fecharCarrinho);
  botaoIrParaCheckout.addEventListener("click", IrParaCheckout)

}


function removerDoCarrinho(idProduto) {
  delete idsProdutoCarrinhoComQuantidade[idProduto]
  salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade)
  renderizarProdutosCarrinho()
  atualizarPrecoCarrinho()
}

function incrementarQuantidadeProduto(idProduto) {
  idsProdutoCarrinhoComQuantidade[idProduto]++;
  salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade)
  atualizarInformacaoProduto(idProduto);
  atualizarPrecoCarrinho()
}

function decrementarQuantidadeProduto(idProduto) {
  if (idsProdutoCarrinhoComQuantidade[idProduto] === 1) {
    removerDoCarrinho(idProduto);

  } else {
    idsProdutoCarrinhoComQuantidade[idProduto]--;
    salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade)
    atualizarInformacaoProduto(idProduto);
    atualizarPrecoCarrinho()
  }

}

function atualizarInformacaoProduto(idProduto) {
  document.getElementById(`quantidade-${idProduto}`).innerText = idsProdutoCarrinhoComQuantidade[idProduto]
}

function desenharProdutoNoCarrinho(idProduto) {
  let produto = catalogo.find((p) => p.id === idProduto)
  let containerProdutosCarrinho = document.getElementById("produtos-carrinho")
  let elementoArticle = document.createElement("article")
  let articleClasses = ["flex", "bg-slate-100", "rounded-lg", "p-1", "gap-2", "relative"]

  for (let articleClass of articleClasses) {
    elementoArticle.classList.add(articleClass)
  }

  let cartaoProdutoCarrinho =
    `<button class="absolute top-1 right-2" id="remover-item-${produto.id}"><i class="bi bi-x-circle-fill text-slate-700"></i></button>
    <img src="assets/img/${produto.imagem}" alt="${produto.nome}" class="h-24 rounded-lg">
    <div class="p-2 flex flex-col justify-between">
      <p  class="text-slate-900 text-sm">${produto.nome}</p>
      <p  class="text-slate-400 text-xs">Tamanho M</p>
      <p  class="text-green-700 text-lg">$${produto.preco}</p>
    </div>
    <div class="flex text-slate-950 items-end absolute bottom-1 right-2 gap-2 text-lg">
      <button id="incrementar-produto-${produto.id}">+</button>
      <p id="quantidade-${produto.id}">${idsProdutoCarrinhoComQuantidade[produto.id]}</p>
      <button id="decrementar-produto-${produto.id}">-</button>
   </div>`;

  elementoArticle.innerHTML = cartaoProdutoCarrinho
  containerProdutosCarrinho.appendChild(elementoArticle);
  document.getElementById(`incrementar-produto-${produto.id}`).addEventListener("click", () => incrementarQuantidadeProduto(idProduto))
  document.getElementById(`decrementar-produto-${produto.id}`).addEventListener("click", () => decrementarQuantidadeProduto(idProduto))
  document.getElementById(`remover-item-${produto.id}`).addEventListener("click", () => removerDoCarrinho(idProduto))
  atualizarPrecoCarrinho()
}

export function renderizarProdutosCarrinho() {
  let containerProdutosCarrinho = document.getElementById("produtos-carrinho")
  containerProdutosCarrinho.innerHTML = "";
  for (const idProduto in idsProdutoCarrinhoComQuantidade) {
    desenharProdutoNoCarrinho(idProduto)
  }

}

export function AdicionarAocarrinho(idProduto) {
  if (idProduto in idsProdutoCarrinhoComQuantidade) {
    incrementarQuantidadeProduto(idProduto);
    return;
  }

  idsProdutoCarrinhoComQuantidade[idProduto] = 1;
  salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade)
  desenharProdutoNoCarrinho(idProduto);
}

export function atualizarPrecoCarrinho() {
  let precoCarrinho = document.getElementById("preco-total");
  let precoTotalCarrinho = 0;


  for( let idProdutoNoCarrinho in idsProdutoCarrinhoComQuantidade){
    precoTotalCarrinho += catalogo.find(p => p.id === idProdutoNoCarrinho).preco * idsProdutoCarrinhoComQuantidade[idProdutoNoCarrinho]
  }
  precoCarrinho.innerHTML = `Tatal: $${precoTotalCarrinho}`

  
}