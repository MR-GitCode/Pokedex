function changePokeAmount() {
    pokeAmount += 20;
    const newBaseUrl = `https://pokeapi.co/api/v2/pokemon?limit=${pokeAmount}&offset=0`;
    loadDatabank(newBaseUrl);
}