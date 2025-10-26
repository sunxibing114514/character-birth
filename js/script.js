// Load characters from JSON file
fetch('data/characters.json')
    .then(response => response.json())
    .then(data => {
        window.characters = data;
        displayCharacters();
    })
    .catch(error => console.error('Error loading characters:', error));

// Function to display characters
function displayCharacters() {
    const list = document.getElementById('charactersList');
    list.innerHTML = ''; // Clear the list
    characters.forEach(character => {
        const card = document.createElement('div');
        card.classList.add('character-card');
        card.innerHTML = `
            <img src="${character.image}" alt="${character.character}" />
            <h3>${character.character}</h3>
            <p>Birth: ${character.birth}</p>
            <p>From: ${character.form}</p>
        `;
        list.appendChild(card);
    });
}

// Search Functionality
function searchCharacters() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filteredCharacters = characters.filter(character =>
        character.character.toLowerCase().includes(query) || character.form.toLowerCase().includes(query)
    );
    characters.length = 0;  // Clear the characters array and push filtered results
    characters.push(...filteredCharacters);
    displayCharacters();
}
