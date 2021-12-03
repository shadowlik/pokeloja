class Pokemon {
    constructor(nome, url) {
        this.nome = nome;
        this.url = url;
        this.id = this.url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '');
        this.imagem = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${this.id}.png`;

        this.preco = Math.floor(Math.random() * 100);
    }

    html() {
        const pokeDiv = document.createElement('div');
        pokeDiv.className = 'poke';
        pokeDiv.innerHTML = `
            <img class="poke-img"
                        src="${this.imagem}"
                        alt="${this.nome}">
            <h2>${this.nome}</h2>

            <p class="price-from">R$ ${this.preco}</p>
            <p class="price-to">R$ ${(this.preco * 0.8).toFixed(2)}</p>

            <button class="poke-buy-btn">
                <img src="images/pokeball.png" alt="Pokeball">
                <span>Comprar</span>
            </button>
        `;

        return pokeDiv;
    }
}

class PokeList {
    limit = 20;

    pages = 0;
    currentPage = 0;
    loadingHtml = '<div>Carregando Pokemons...</div>';

    pokeList = document.querySelector('.poke-list');
    btnAnt = document.querySelector('.btn-ant');
    btnProx = document.querySelector('.btn-prox');
    pagesInfo = document.querySelector('#pages-info');

    constructor() {
        this.bindEvents(); // Chamamos a função para adicionar os eventos de clique
        this.getPokemons(); // Chamamos a função de buscar os pokemons no carregamento
    }

    /**
     * Adiciona os eventos de clique nos botões
     */
    bindEvents() {
        this.btnProx.onclick = () => this.nextPage();
        this.btnAnt.onclick = () => this.previousPage();
    }

    /**
     * Busca os pokemons na api
     * 
     * @param {Number} page 
     */
    async getPokemons(page) {
        this.pokeList.innerHTML = this.loadingHtml;

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${this.limit * page}`);

        const json = await response.json();

        this.pages = Math.ceil(json.count / this.limit);

        this.renderPokemons(json.results);
    }

    /**
     * Método para a próxima página
     */
    async nextPage() {
        const nextPage = this.currentPage += 1;

        if (nextPage < this.pages) { // Só podemos executar se tiver uma próxima página
            this.getPokemons(nextPage);
        }
    }

    /**
     * Método para a página anterior
     */
    async previousPage() {
        const previousPage = this.currentPage -= 1;

        if (previousPage >= 0) { // Só podemos executar se tiver uma página anterior
            this.getPokemons(previousPage);
        }
    }

    /**
     * Método para renderizar a lista de pokemons
     * 
     * @param {Pokemons[]} pokemonsApi 
     */
    renderPokemons(pokemonsApi = []) {
        this.pokeList.innerHTML = '';

        const pokemons = pokemonsApi.map((pokemon) => new Pokemon(pokemon.name, pokemon.url));

        pokemons.forEach((pokemon) => {
            const html = pokemon.html();
            this.pokeList.appendChild(html)
        });

        this.pagesInfo.innerHTML = `${this.currentPage + 1}/${this.pages}`; // Exibir em qual página estamos

        this.toggleButtons(); // Chamamos a função para esconder ou não os botões
    }

    /**
     * Método para exibir ou esconder os botões de paginação
     */
    toggleButtons() {
        this.currentPage === 0 ? this.btnAnt.style.visibility = 'hidden' : this.btnAnt.style.visibility = 'visible';
        this.currentPage + 1 === this.pages ? this.btnProx.style.visibility = 'hidden' :  this.btnProx.style.visibility = 'visible';
    }
}


// Executa quando a página termina de carregar
window.onload = async () => {
    new PokeList();
}