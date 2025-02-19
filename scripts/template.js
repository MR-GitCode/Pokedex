function renderGallery(name, specs, typ) {
    return `<div onclick="loadOverlay(${specs.id})" class="poke-card">
                <div class="header-card">
                    <p id="poke-amount">#${specs.id}</p>
                    <h3>${name}</h3>
                </div>
                <div class="poke-img ${typ}" >
                    <img src="${specs.sprites.versions['generation-v']['black-white'].animated.front_shiny}">
                </div>
                <div id="poke-footer${specs.id}" class="poke-footer">
                </div>
            </div>`
}

function renderNav(i) {
    return `<div class="nav-icon ${types[i].name}" onclick="showTypPoke(${types[i].name})">
            <img  src="${types[i].icon}" alt="${types[i].name}"></img>
            </div>`
}

function renderTypSlots(typName) {
    return `<div class="icon ${typName}">
            <img  src="./assets/icons/types/${typName}.svg" alt="${typName}"></img>
            </div>`
}

function renderOverlay(data) {
    return ` <div  class="overlay-card">
            <div class="overlay-header">
                <p>#${data.id}</p>
                <h3>${data.species.name}</h3>
            </div>

            <div class="overlay-img">
                <img src="${data.sprites.versions['generation-v']['black-white'].animated.front_shiny}">
                <div>
                    Type
                    <!--positon absolute ->container relative   -->
                </div>
            </div>

            <div class="overlay-stats">
                <div id="headline">
                    <h5 onclick="loadAbout(${data.id})">About</h5>
                    <h5 onclick="loadStats(${data.id})">Stats</h5>
                    <h5 onclick="loadEvolution(${data.id})">Evolution</h5>
                </div>

                <div id="stats"></div>
            </div>

            <div class="button">
                <button onclick="beforePokemon(${data.id})">left</button>
                <button onclick="nextPokemon(${data.id})">right</button>
            </div>            
        </div>`
}

function renderStats(statName, statValue) {
    return `<div>
                <p><b>${statName}: </b>${statValue}</p>
            </div>`
}

function renderAbout(data) {
    return `<div>
                <p><b>Height:</b> ${data.height}</p>
                <p><b>Weight:</b> ${data.weight}</p>
                <p><b>Abilities:</b>pfad</p>
            </div>`
}

function renderEvolution() {
    return `<div class="stats">
                <img src="" alt="">
            </div>`
}