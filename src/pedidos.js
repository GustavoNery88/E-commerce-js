import { lerLocalStorage, desenharProdutoCarrinhoSimples } from "./utilidades.js";


function criarPedidoHistorico(pedidoComData){
    let elementoPedido = `<p class="text-xl text-bold my-4">${new Date(pedidoComData.dataPedido).toLocaleDateString("pt-BR", {hour: "2-digit", minute: "2-digit"})}</p>
    <section id="container-pedidos-${pedidoComData.dataPedido}" class="bg-slate-300 p-3 rounded-md flex flex-col gap-2"></section>
    `;

    let main = document.getElementById("container-historico");
    main.innerHTML += elementoPedido;

    for(let idProduto in pedidoComData.pedido){
        desenharProdutoCarrinhoSimples(idProduto, `container-pedidos-${pedidoComData.dataPedido}`, pedidoComData.pedido[idProduto])
    }
}

function renderizarHistoricoPedidos(){
    let historico = lerLocalStorage("historico");
    for(let pedidoComData of historico){
        criarPedidoHistorico(pedidoComData)
    }
}

renderizarHistoricoPedidos();