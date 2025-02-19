function renderGallery(name, specs, typ) {
    return `<div class="poke-card">
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