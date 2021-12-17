/**
 * TODO
 * - Calcular total do carrinho ao adicionar pokemon
 * - Renderizar o carrinho ao adicionar
 * - Abrir o carrinho
 * - Remover um pokemon
 * - Calcular total do carrinho ao remover pokemon
 * - Renderizar o carrinho ao remover
 * - Salvar o carrinho no cliente
 * - Carregar caso haja carrinho salvo
 */
class Carrinho {
    btnCarrinho = document.querySelector('#botao-carrinho');
    btnFecharCarrinho = document.querySelector('#fechar-carrinho');
    items = [];
    total = 0;

    constructor() {
        this.btnCarrinho.addEventListener('click', this.abrirCarrinho);

        this.btnFecharCarrinho.addEventListener('click', this.fecharCarrinho);

        console.log('Carrinho carregado...');
    }

    abrirCarrinho(event) {
        event.preventDefault();
        const openCartClass = 'carrinho-aberto';

        document.body.className.includes(openCartClass) ? document.body.className = '' : document.body.className = openCartClass;
    }

    fecharCarrinho(event) {
        event.preventDefault();

        document.body.className = '';
    }

    adicionar(pokemon) {
        this.items.push(pokemon);
    }
}

// Executa quando a página termina de carregar
window.addEventListener('load', async () => {
    window.carrinho = new Carrinho();
});