let characters = [];
let games = [];

// Load games from game.json
fetch('data/game.json')
    .then(response => response.json())
    .then(data => {
        games = data;
        loadCharacters();
    })
    .catch(error => console.error('Error loading games:', error));

// Load characters from characters.json
function loadCharacters() {
    fetch('data/characters.json')
        .then(response => response.json())
        .then(data => {
            characters = data;
            displayRandomCharacters();
        })
        .catch(error => console.error('Error loading characters:', error));
}

// Function to display random characters
function displayRandomCharacters() {
    const list = document.getElementById('charactersList');
    list.innerHTML = ''; // Clear the list

    // Get a random subset of characters (e.g., 5 characters)
    const randomCharacters = getRandomCharacters(5);

    randomCharacters.forEach(character => {
        const game = games.find(g => g.game.id === character.form); // Get game by ID
        const card = document.createElement('div');
        card.classList.add('character-card');
        card.innerHTML = `
            <img src="${character.image}" alt="${character.character}" />
            <h3>${character.character}</h3>
            <p>Birth: ${character.birth}</p>
            <p>From: ${game ? game.game.name : 'Unknown'}</p>
        `;
        list.appendChild(card);
    });
}

// Function to get a random subset of characters
function getRandomCharacters(count) {
    const shuffled = [...characters].sort(() => 0.5 - Math.random());  // Shuffle the array
    return shuffled.slice(0, count);  // Return the first 'count' characters
}

// Search Functionality
function searchCharacters() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filteredCharacters = characters.filter(character =>
        character.character.toLowerCase().includes(query) || character.form.toLowerCase().includes(query)
    );
    characters.length = 0;  // Clear the characters array and push filtered results
    characters.push(...filteredCharacters);
    displayRandomCharacters();
}
