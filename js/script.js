let page = 0;

async function getPokemons(page = 0) {
    const pokeList = document.querySelector('.poke-list');
    pokeList.innerHTML = '<div>Carregando Pokemons...</div>';

    const limit = 20;

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${limit * page}`);
    
    const json = await response.json();

    const pages = Math.ceil(json.count / limit);

    return json;
}

function temAnterior(page) {
    const btnAnt = document.querySelector('.btn-ant');

    if (page === 0) btnAnt.style.visibility = 'hidden';
}

function btnProx() {
    const btnProx = document.querySelector('.btn-prox');

    btnProx.onclick = async() => {
        const response = await getPokemons(page += 1);

        listaPokemons(response.results);
    }
}

function listaPokemons(pokemonsApi) {
    const pokeList = document.querySelector('.poke-list');
    pokeList.innerHTML = ''

    const pokemons = pokemonsApi.map((pokemon) => new Pokemon(pokemon.name, pokemon.url));

    pokemons.forEach((pokemon) => {
        const html = pokemon.html();
        pokeList.appendChild(html)
    });
}

// Executa quando a página termina de carregar
window.onload = async () => {
    const response = await getPokemons(page);

    listaPokemons(response.results);
    btnProx();
    temAnterior(page);
}