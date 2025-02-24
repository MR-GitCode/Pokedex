let currentPage = 1;

function amountPerSite() {
    pokeAmount = parseInt(document.getElementById("pokeLimit").value);
    changePage(currentPage);
}

function changePage(page) {
    currentPage = page;  
    let offset = (currentPage - 1) * pokeAmount;
    let newBaseUrl = `https://pokeapi.co/api/v2/pokemon?limit=${pokeAmount}&offset=${offset}`;
    console.log(`Seite ${currentPage}, URL: ${newBaseUrl}`);
    loadDatabank(newBaseUrl);
}

function changePokeAmount(amount) {
    pokeAmount = amount;
    const newBaseUrl = `https://pokeapi.co/api/v2/pokemon?limit=${pokeAmount}&offset=0`;
    console.log(newBaseUrl);
    loadDatabank(newBaseUrl);
}

function pagePlus() {
    let newPage = currentPage + 1;
    changePage(newPage)
}

function pageMinus() {
    if (currentPage !=1) {
        let newPage = currentPage - 1;
        changePage(newPage) 
    }
}

function savePokemon(name, specs) {
    if (!pokeList.find(pokemon => pokemon.id === specs.id)) {
        pokeList.push( {
        name: name,
        id: specs.id,
        url: POKE_URL + specs.id
    });
    }
}

function searchPokemon(event) {
    const input = event.target.value.toLowerCase();
    currentPokemons = pokeList.filter(pokemon => pokemon.name.includes(input))
    showPokeSearch(currentPokemons)
}

function showPokeSearch(currentPokemons) {
    let pokeGallery = document.getElementById('poke-gallery');
    pokeGallery.innerHTML = "";
    loadPokemon(currentPokemons)    
}