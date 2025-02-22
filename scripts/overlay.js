async function loadOverlay(pokeId) {
    document.getElementById('overlay').classList.remove('hidden');
    let overlay = document.getElementById('overlay');
    let data = await getData(pokeId)
    let typ = data.types[0].type.name;
    overlay.innerHTML = "";
    overlay.innerHTML = renderOverlay(data, typ); 
    loadAbout(pokeId)
    loadTypesOverlay(data)
}

function loadTypesOverlay(data) {
    let pokeTypesOverlay = document.getElementById(`overlay-type${data.id}`);
    let types = data.types;   
    for (let i = 0; i < types.length; i++) {
        let typ = types[i].type;
        let typName = typ.name;
        pokeTypesOverlay.innerHTML += renderTypOverlay(typName);
    }    
}

async function getData(pokeId) {
    let response = await fetch(POKE_URL + pokeId);
    let data= await response.json();
    return data;
}

async function loadAbout(pokeId) {
    let pokeStats = document.getElementById('stats');
    pokeStats.innerHTML = "";
    let data = await getData(pokeId)
    console.log(data);    
    pokeStats.innerHTML = renderAbout(data);
}

async function loadStats(pokeId) {
    let pokeStats = document.getElementById('stats');
    pokeStats.innerHTML = "";
    let data = await getData(pokeId)
    let statsOfPokemon = data.stats;
    for (let i = 0; i < statsOfPokemon.length; i++) {
        let statName = statsOfPokemon[i].stat.name;
        let statValue = statsOfPokemon[i].base_stat;
        pokeStats.innerHTML += renderStats(statName, statValue);
    }
}

async function loadEvolution(pokeId) {
    let pokeStats = document.getElementById('stats');
    pokeStats.innerHTML = "";
    let data = await getData(pokeId)
    let statsEvolution = data
    pokeStats.innerHTML += renderEvolution();
}

function beforePokemon(pokeId) {
    let beforePokemon = pokeId -1; //Überlegen was soll passieren bei Id=0 
    loadOverlay(beforePokemon)
}

function nextPokemon(pokeId) {
    let nextPokemon = pokeId +1;
    loadOverlay(nextPokemon )
}