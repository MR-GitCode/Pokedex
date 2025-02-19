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
        pokeGallery.innerHTML += renderGallery(name, specs, typ)
        loadTypes(specs)
    }
    
}

function loadTypes(specs) {
    let pokeCardFooter = document.getElementById(`poke-footer${specs.id}`);
    let types = specs.types;
    console.log(types);
    
    
    for (let i = 0; i < types.length; i++) {
        let typ = types[i].type;
        let typName = typ.name;
        pokeCardFooter.innerHTML += renderTypSlots(typName);
    }    


    // if (specs.types.length >1) {
    //     let solt1 = specs.types[0].type.name;
    //     let solt2 = specs.types[1].type.name;
    //    } else  
    // // console.log(solt1);
    // console.log(specs.types);
    // return [solt1, solt2]; 
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