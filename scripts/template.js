function renderGallery(name, specs, typName) {
    return `<div onclick="loadOverlay(${specs.id}, overlay(event))" class="poke-card">
                <div class="header-card">
                    <p id="poke-amount">#${specs.id}</p>
                    <h3>${name}</h3>
                </div>
                <div class="poke-img ${typName}" >
                    <img src="${specs.sprites.versions['generation-v']['black-white'].animated.front_shiny}" onerror="this.onerror=null; this.src='${specs.sprites.front_shiny}'">
                </div>
                <div id="poke-footer${specs.id}" class="poke-footer">
                </div>
            </div>`
}

function renderNav(i) {
    return `<div class="nav-icon ${types[i].name} image-container" onclick="showTypPokemons('${types[i].name}')" data-alt="${types[i].name}">
            <img  src="${types[i].icon}" alt="${types[i].name}"></img>
            </div>`
}

function renderTypSlots(typName) {
    return `<div class="icon ${typName}">
            <img  src="./assets/icons/types/${typName}.svg" alt="${typName}"></img>
            </div>`
}

function renderOverlay(data, typ) {
    return `<div onclick="overlay(event)" class="overlay-card">
            <div class="overlay-header">
                <p>#${data.id}</p>
                <h3>${data.species.name}</h3>
                <img onclick="closeOverlay()" id="close-button" src="./assets/icons/remove-close-round-red-icon.svg" alt="x">
            </div>

            <div class="overlay-img-content ${typ}">
                <img class="overlay-img" src="${data.sprites.versions['generation-v']['black-white'].animated.front_shiny}" onerror="this.onerror=null; this.src='${data.sprites.front_shiny}'">
                <div id="overlay-type${data.id}" class="typs-overlay"></div>
                <div class="overlay-buttons" >
                    <p class="bt button-left" onclick="beforePokemon(${data.id})"></p>
                    <p class="bt button-right" onclick="nextPokemon(${data.id})"></p>
                </div> 
            </div>

            <div class="overlay-stats">
                <div id="headline">
                    <div id="headline-about" class="headline-stats">
                        <h5 onclick="loadAbout(${data.id})">About</h5>
                    </div>
                    <div id="headline-stats" class="headline-stats">
                        <h5 onclick="loadStats(${data.id})">Stats</h5>
                    </div>
                    <div id="headline-evolution" class="headline-stats">
                        <h5 onclick="loadEvolution(${data.id})">Evolution</h5>
                    </div>                    
                </div>

                <div class="stats" id="stats"></div>
            </div>           
        </div>`
}

function renderTypOverlay(typName) {
    return `<div class="icon-overlay ${typName}">
            <img  src="./assets/icons/types/${typName}.svg" alt="${typName}"></img>
            </div>`
}

function renderAbout(data) {
    return `<div class="stats">
                <div class="stats-info">
                    <b>Height:</b>
                    <p>${data.height / 10} m</p>
                </div>
                <div class="stats-info">
                    <b>Weight:</b>
                    <p>${data.weight / 10} kg</p>
                </div>
                <div class="stats-info">
                    <b>Abilities:</b>
                    <div id="abilities"></div>
            </div>`
}

function renderStats(statName, statValue) {
    return `<div>
                <div class="stats-info">
                    <b>${statName}: </b>
                    <p>${statValue}</p>
                </div>
            </div>`
}

function evolutionTemplate(data) {
    return `<div class="evolution">
                <img class="evo-img" src="${data.sprites.versions['generation-v']['black-white'].animated.front_shiny}" alt="${data.name}" onerror="this.onerror=null; this.src='${data.sprites.front_shiny}'">
                <p>${data.name}</p>
            </div>`
}

function renderPageNumber(pageNum) {
    return `<li onclick="changePage(${pageNum})">
                <p>${pageNum}</p>
            </li>`
}

function renderAbilities(ability) {
    return `<p>${ability}</p>`
}

