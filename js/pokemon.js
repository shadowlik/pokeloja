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