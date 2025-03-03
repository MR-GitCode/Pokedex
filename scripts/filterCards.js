let maxPokemons = 600;
let currentPage = 1;
let amountPerPage = parseInt(document.getElementById('pokeLimit').value);
let maxPages = Math.ceil(maxPokemons / amountPerPage);

function amountPerSite() {
    pokeAmount = parseInt(document.getElementById("pokeLimit").value);
    amountPerPage = pokeAmount;
    proveMaxPage();
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
    maxPages = Math.ceil(maxPokemons / amountPerPage);
    changePage(maxPages);
}

function proveMaxPage() {
    maxPages = Math.ceil(maxPokemons / amountPerPage);
    changePage(maxPages)
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
        configPagebar(0)
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
            })}}
    disableLoadingSpinner()
    configPagebar(type)
    loadPokemon(pokeListOfTypes)
    searchTypPokemon(pokeListOfTypes, type)
}

function typeCompare(i, type) {
    for (let typIndex = 0; typIndex < pokeList[i].types.length; typIndex++) {
        if (pokeList[i].types[typIndex].type.name === type) {
            return true;
        }
    }
    return false;
}

function configPagebar(i) {
    if (i === 0) {
        document.getElementById('back-button').setAttribute('style','display: flex');
        document.getElementById('bt-loadMore').setAttribute('style','display: none !important');
        document.getElementById('pagebar').setAttribute('style','display: none');  
    } else {
        document.getElementById('back-button').setAttribute('style','display: flex');
        document.getElementById('pagebar').setAttribute('style','display: none');
        document.getElementById('bt-loadMore').onclick = function() {
            loadMore(i);
        };
    }      
}

async function loadMore(type) {
    loadingSpinner()
    pokeAmount += 50;
    let BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=${pokeAmount}&offset=0`
    let responseToJson = await(await fetch(BASE_URL)).json();
    let pokeResults = responseToJson.results;
    for (let i = 0; i < pokeResults.length; i++) {
        let name = pokeResults[i].name;
        let specs = await loadSpecs(pokeResults[i].url);
        savePokemon(name, specs)
     }
    disableLoadingSpinner()
    showTypPokemons(type)
}

function searchTypPokemon(pokeListOfTypes, type) { 
        if (pokeListOfTypes.length === 0) {
            loadMore(type)
        }
    }