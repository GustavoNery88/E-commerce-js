
import { desenharProdutoCarrinhoSimples, lerLocalStorage, apagarDoLocalStorage, salvarLocalStorage } from "./utilidades.js";

export function desenharProdutosCheckout() {
    let idsProdutoCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};
    for (const idProduto in idsProdutoCarrinhoComQuantidade) {
        desenharProdutoCarrinhoSimples(idProduto, "container-produtos-checkout", idsProdutoCarrinhoComQuantidade[idProduto])
    }

}

function finalizarCompra(evento) {
    evento.preventDefault()
    let idsProdutoCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};
    if (Object.keys(idsProdutoCarrinhoComQuantidade).length === 0) {
        return;
    }
    let dataAtual = new Date()
    let pedidoFeito = {
        dataPedido: dataAtual,
        pedido: idsProdutoCarrinhoComQuantidade
    }


    let historicoDePedidos = lerLocalStorage("historico") ?? [];
    let historicoDePedidosAtualizado = [pedidoFeito, ...historicoDePedidos];

    salvarLocalStorage("historico", historicoDePedidosAtualizado)
    apagarDoLocalStorage("carrinho")

    window.location.href = "/src/pedidos.html"

}


desenharProdutosCheckout();

document.addEventListener("submit", (evt) => finalizarCompra(evt))
