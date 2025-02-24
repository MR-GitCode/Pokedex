function init() {
    loadDatabank()
    renderTypNav()
}

let pokeAmount = 10;

const BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=${pokeAmount}&offset=0`
const POKE_URL = "https://pokeapi.co/api/v2/pokemon/"

async function loadDatabank(url = BASE_URL) {
    let response = await fetch(url)
    let responseToJson = await response.json();
    let pokeResults = responseToJson.results;
    document.getElementById("poke-gallery").innerHTML = "";   
    await loadPokemon(pokeResults);
}

async function loadPokemon(pokeResults) {
    loadingSpinner()
    let pokeGallery = document.getElementById('poke-gallery');
    for (let pokeIndex = 0; pokeIndex < pokeResults.length; pokeIndex++) {
        let name = pokeResults[pokeIndex].name;
        let url = pokeResults[pokeIndex].url;
        let specs = await loadSpecs(url);         
        let typName = specs.types[0].type.name;
        pokeGallery.innerHTML += renderGallery(name, specs, typName)
        savePokemon(name, specs)
        loadTypes(specs)
    }
    disableLoadingSpinner()   
}

function loadTypes(specs) {
    let pokeCardFooter = document.getElementById(`poke-footer${specs.id}`);
    let types = specs.types;   
    for (let i = 0; i < types.length; i++) {
        let typ = types[i].type;
        let typName = typ.name;
        pokeCardFooter.innerHTML += renderTypSlots(typName);
    }    
}

async function loadSpecs(url) {
    let specs = await fetch(url);
    let specsToJson = await specs.json(); 
    return specsToJson;  
}

function renderTypNav() {
    let typNavigation = document.getElementById('typ-nav')
    for (let i = 0; i < types.length; i++) {
        typNavigation.innerHTML += renderNav(i)    
    }
}

function loadingSpinner() {
    document.getElementById('loading-spinner').classList.remove('hidden');
}

function disableLoadingSpinner() {
    document.getElementById('loading-spinner').classList.add('hidden');
}