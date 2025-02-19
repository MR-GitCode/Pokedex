function init() {
    loadDatabank()
    renderTypNav()
}

const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
const POKE_URL = "https://pokeapi.co/api/v2/pokemon/"

async function loadDatabank() {
    let response = await fetch(BASE_URL)
    let responseToJson = await response.json();
    let pokeResults = responseToJson.results  
    loadPokemon(pokeResults);
}

async function loadPokemon(pokeResults) {
    let pokeGallery = document.getElementById('poke-gallery');
    for (let pokeIndex = 0; pokeIndex < pokeResults.length; pokeIndex++) {
        let name = pokeResults[pokeIndex].name;
        let url = pokeResults[pokeIndex].url;
        let specs = await loadSpecs(url);
        let typ = specs.types[0].type.name;
        pokeGallery.innerHTML += renderGallery(name, specs, typ)
        loadTypes(specs)
    }   
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

async function loadOverlay(pokeId) {
    document.getElementById('overlay').classList.remove('hidden');
    // let response = await fetch(POKE_URL + pokeId);
    // let data= await response.json();
    // let name = data.species.name
    // let stats
    // for (let i = 0; i < array.length; i++) {
    //     const element = array[i];
        
    // }
    // console.log(stats);
    // console.log(stats);
}