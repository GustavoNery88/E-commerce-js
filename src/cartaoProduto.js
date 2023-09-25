import { AdicionarAocarrinho } from "./menuCarrinho.js";
import { catalogo } from "./utilidades.js";

export function renderizarCatalogo() {
  for (const produtoCatalogo of catalogo) {
    const cartaoProduto = `<div class='border-solid w-48 m-2 flex flex-col p-2 justify-between shadow-xl shadow-slate-400 rounded-lg"
    }' id="card-produto-${produtoCatalogo.id}">
        <img
        src="./assets/img/${produtoCatalogo.imagem}"
        alt="Produto 1 do Magazine Hashtag."
        />
        <p class='text-sm'>${produtoCatalogo.marca}</p>
        <p class='text-sm'>${produtoCatalogo.nome}</p>
        <p class='text-sm'>$${produtoCatalogo.preco}</p>
        <button id="adicionar-${produtoCatalogo.id}" class="bg-slate-950 text-slate-200 hover:bg-slate-700"><i class="bi bi-cart-plus-fill"></i></button>
        </div>`;

    document.getElementById("container-produto").innerHTML += cartaoProduto;
    let containerProduto = document.getElementById(`card-produto-${produtoCatalogo.id}`);
    if (produtoCatalogo.feminino === true) {
      containerProduto.classList.add("feminino");
    } else { 
      containerProduto.classList.add("masculino");
    }

  }

  for (const produtoCatalogo of catalogo) {
    document
      .getElementById(`adicionar-${produtoCatalogo.id}`)
      .addEventListener("click", () => AdicionarAocarrinho(produtoCatalogo.id));
  }
}

