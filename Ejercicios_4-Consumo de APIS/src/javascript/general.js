const baseURL = 'https://pokeapi.co/api/v2/pokemon/'
const pokemon = document.getElementById('busquedaPokemon')
const boton = document.getElementById('botonBusqueda')
const cartaPokemon = document.querySelector('[data-poke-card]');
const nombrePokemon = document.querySelector('[data-poke-name]');
const imagenPokemon = document.querySelector('[data-poke-img]');
const contenedorImagenPokemon = document.querySelector('[data-poke-img-container]');
const idPokemon = document.querySelector('[data-poke-id]');
const tiposPokemon = document.querySelector('[data-poke-types]');
const statusPokemon = document.querySelector('[data-poke-stats]');
const botonBuscar = document.getElementById('botonBusqueda')



const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

botonBuscar.addEventListener('click', insertarPokemon)

function insertarPokemon(){
    window.fetch(`${baseURL}${pokemon.value.toLowerCase()}`)
    .then(data => data.json())
    .then(response => datosPokemon(response))
    .catch(error => pokemonNoEncontrado())
}

const datosPokemon = data => {
    const sprite =  data.sprites.front_default;
    const { stats, types } = data;

    nombrePokemon.textContent = data.name;
    imagenPokemon.setAttribute('src', sprite);
    idPokemon.textContent = `Nº ${data.id}`;
    obtenerColorCarta(types);
    obtenerTiposPokemon(types);
    obtenerStatusPokemon(stats);
}

const  obtenerColorCarta = types => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    imagenPokemon.style.background =  `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    imagenPokemon.style.backgroundSize = ' 5px 5px';
}

const obtenerTiposPokemon = types => {
    tiposPokemon.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        tiposPokemon.appendChild(typeTextElement);
    });
}

const obtenerStatusPokemon = stats => {
    statusPokemon.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        statusPokemon.appendChild(statElement);
    });
}


const pokemonNoEncontrado = () => {
    nombrePokemon.textContent = "NO ENCONTRADO";
    imagenPokemon.style.background =  '#fff';
    tiposPokemon.innerHTML = '';
    statusPokemon.innerHTML = '';
    idPokemon.textContent = '';
    alert('Pokemon No Encontrado, Intente de Nuevo Por Favor');
}