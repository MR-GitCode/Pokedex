function init() {
    loadDatabank()
}

const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"

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
        console.log(specs);
           
        pokeGallery.innerHTML += renderGallery(name, specs)
    }
}

async function loadSpecs(url) {
    let specs = await fetch(url);
    let specsToJson = await specs.json(); 
    return specsToJson;  
}

function renderGallery(name, specs) {
    return `<div class="poke-card">
                <div class="header-card">
                    <p id="poke-amount">#${specs.id}</p>
                    <h3>${name}</h3>
                </div>
                <div class="poke-img">
                    <img src="${specs.sprites.versions['generation-v']['black-white'].animated.front_shiny}">
                </div>
                <div class="poke-footer">
                   <img src="">
                </div>
            </div>`
    
}