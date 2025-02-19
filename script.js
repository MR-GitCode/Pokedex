function init() {
    loadDatabank()
    renderTypNav()
}

const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"

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
        // console.log(type2);  
        pokeGallery.innerHTML += renderGallery(name, specs, typ)
    }
}

function loadTypes(specs) {
       
    let [type1, type2] = loadTypes(specs)
    if (specs.types.length >1) {
        let solt1 = specs.types[0].type.name;
        let solt2 = specs.types[1].type.name;
       } else
    
        
    
    // console.log(solt1);
    console.log(specs.types);
    return [solt1, solt2]; 
}

async function loadSpecs(url) {
    let specs = await fetch(url);
    let specsToJson = await specs.json(); 
    return specsToJson;  
}

function renderTypNav() {
    let typNavigation = document.getElementById('typ-nav')
    console.log(types[1].name);
    for (let i = 0; i < types.length; i++) {
        typNavigation.innerHTML += `<div class="nav-icon ${types[i].name}" onclick="showTypPoke(${types[i].name})"><img  src="${types[i].icon}" alt="${types[i].name}"></img></div>`    
    }
}


function renderGallery(name, specs, typ) {
    return `<div class="poke-card">
                <div class="header-card">
                    <p id="poke-amount">#${specs.id}</p>
                    <h3>${name}</h3>
                </div>
                <div class="poke-img ${typ}" >
                    <img src="${specs.sprites.versions['generation-v']['black-white'].animated.front_shiny}">
                </div>
                <div class="poke-footer">
                   <img src="">
                </div>
            </div>`
}