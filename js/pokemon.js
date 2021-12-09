class Pokemon {
    constructor(options) {
        this.name = options.name;
        this.types = options.types.map(typeItem => typeItem.type.name);
        this.abilities = options.abilities.map(abilityType => abilityType.ability.name);
    }

    html() {
        // <div class="pokemon">
        //             <img src="" alt="">
        //             <h1>Nome do Pokemon</h1>
        //             <hr/>
        //             <h2>Tipo</h2>
        //             <ul>
        //                 <li>tipo 1</li>
        //                 <li>tipo 2</li>
        //             </ul>
        //             <hr/>
        //             <h2>Habilidades</h2>
        //             <ul>
        //                 <li>Habilidade 1</li>
        //                 <li>Habilidade 2</li>
        //                 <li>Habilidade 3</li>
        //             </ul>
        //         </div>
    }
}

const fakePromise = () => new Promise((resolve) => setTimeout(resolve, 3000));

function getQueryparameters() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    return params; // { id: 1 }
}

async function getPokemonData(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    const response = await fetch(url);

    const data = await response.json();

    return data;
}

window.onload = async function() {
    const { id } = getQueryparameters();

    const pokemonDiv = document.querySelector('.pokemon');

    try {
        await fakePromise();

        const data = await getPokemonData(id);

        const pokemon = new Pokemon(data);

    } catch (error) {
        pokemonDiv.innerHTML = `<div class="error">Não encontrado</div>`
    }
}