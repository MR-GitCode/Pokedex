let currentPage = 1;
let amountPerPage = parseInt(document.getElementById('pokeLimit').value);
let maxPages = Math.ceil(1000 / amountPerPage);

function amountPerSite() {
    pokeAmount = parseInt(document.getElementById("pokeLimit").value);
    amountPerPage = pokeAmount;
    changePage(currentPage);
    changePageNumbers();
}

function changePage(page) {
    currentPage = page;
    let offset = (currentPage - 1) * pokeAmount;
    let newBaseUrl = `https://pokeapi.co/api/v2/pokemon?limit=${pokeAmount}&offset=${offset}`;
    loadDatabank(newBaseUrl);
    changePageNumbers();
}

function changePageNumbers() {
    let pageChanger = document.querySelector(".page-numbers");
    pageChanger.innerHTML = "";
    
    for (let i = 0; i < 4; i++) {
        let pageNum = currentPage + i;
        if (pageNum > maxPages) break;
        pageChanger.innerHTML += renderPageNumber(pageNum);
    }
}

function pagePlus() {
    if (currentPage + 4 <= maxPages) {
        currentPage++;
        changePage(currentPage);
    }
}

function pageMinus() {
    if (currentPage > 1) {
        currentPage--;
        changePage(currentPage);
    }
}

function pageFirst() {
    changePage(1)
}

function pageEnd() {
    let maxPages = Math.ceil(1000 / amountPerPage);
    changePage(maxPages);
}

function savePokemon(name, specs) {
    if (!pokeList.find(pokemon => pokemon.id === specs.id)) {
        pokeList.push( {
        name: name,
        id: specs.id,
        types: specs.types,
        url: POKE_URL + specs.id
    });
    }
}

function searchPokemon(event) {
    const input = event.target.value.toLowerCase();
    if (input.length < 3) {
        document.getElementById('poke-gallery').innerHTML = "";
        return;
    }
    currentPokemons = pokeList.filter(pokemon => pokemon.name.includes(input))
    showPokeSearch(currentPokemons)
}

function showPokeSearch(currentPokemons) {
    let pokeGallery = document.getElementById('poke-gallery');
    pokeGallery.innerHTML = "";
    loadPokemon(currentPokemons)    
}

function showTypPokemons(type) {
   pokeLimit = document.getElementById(`pokeLimit`).value;
   let pokeListOfTypes = [];
   loadingSpinner()
    for (let i = 0; i < pokeList.length; i++) {
        if (typeCompare(i, type)) {
            pokeListOfTypes.push ({
                name: pokeList[i].name,
                url: pokeList[i].url 
            })}
    }
    disableLoadingSpinner() 
    loadPokemon(pokeListOfTypes)
}

function typeCompare(i, type) {
    for (let typIndex = 0; typIndex < pokeList[i].types.length; typIndex++) {
        if (pokeList[i].types[typIndex].type.name === type) {
            return true;
        }
    }
    return false;
}