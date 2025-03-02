async function loadOverlay(pokeId) {
    document.getElementById('overlay').classList.remove('hidden');
    document.body.classList.add("no-scroll");
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
    removeHeadlineActive();
    document.getElementById('headline-about').classList.add('active');
    let pokeStats = document.getElementById('stats');
    pokeStats.innerHTML = "";
    let data = await getData(pokeId);
    pokeStats.innerHTML = renderAbout(data);   
    loadAbilities(data);
}

function loadAbilities(data) {
    let abilitiesContent = document.getElementById('abilities');
    let abilities = data.abilities;
    for (let i = 0; i < abilities.length; i++) {
        let ability = abilities[i].ability.name;
       abilitiesContent.innerHTML += renderAbilities(ability);
    }
}

async function loadStats(pokeId) {
    removeHeadlineActive();
    document.getElementById('headline-stats').classList.add('active');
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
    removeHeadlineActive();
    document.getElementById('headline-evolution').classList.add('active');
    let data= await (await fetch(SPECIES_URL + pokeId)).json();
    let evolutionsData = await (await fetch(data.evolution_chain.url)).json(); 
    try{        
        pushToList(evolutionsData.chain.species.name);
        pushToList(evolutionsData.chain.evolves_to[0].species.name);
        pushToList(evolutionsData.chain.evolves_to[0].evolves_to[0].species.name); 
    } catch (error) {
    }
    renderEvolutions()
}

function removeHeadlineActive() {
    document.getElementById('headline-about').classList.remove('active');
    document.getElementById('headline-stats').classList.remove('active');
    document.getElementById('headline-evolution').classList.remove('active');
}

function pushToList(form) {
    evoList.push( {
        name: form,
        url: POKE_URL + form
    });    
}

async function renderEvolutions() {
    let pokeStats = document.getElementById('stats');
    pokeStats.innerHTML = "<div id='evolution'></div>";
    let pokeEvo = document.getElementById('evolution')
    for (let i = 0; i < evoList.length; i++) {
        let pokemon = evoList[i].name;
        let data = await getData(pokemon);
        console.log(data);
        pokeEvo.innerHTML += evolutionTemplate(data)
    }
    evoList = [];
}

function beforePokemon(pokeId) {
    let beforePokemon = pokeId -1;
    loadOverlay(beforePokemon)
}

function nextPokemon(pokeId) {
    let nextPokemon = pokeId +1;
    loadOverlay(nextPokemon )
}

function overlay(event) {
    event.stopPropagation(); 
}

function closeOverlay() {
    document.getElementById('overlay').classList.add('hidden');
    document.body.classList.remove("no-scroll"); 
 }