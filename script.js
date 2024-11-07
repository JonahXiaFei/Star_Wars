// Define elements and get references to DOM elements
const elements = {
    "Search": "Search",
    "name": "name",
    "height": "height",
    "mass": "mass",
    "hair_color": "hair_color",
    "skin_color": "skin_color",
    "eye_color": "eye_color",
    "birth_year": "birth_year",
    "gender": "gender",
    "homeworld": "homeworld",
    "Starsbtn": "Starsbtn",
    "table": "table"
};

// Function to check if the table has items
function hasItemsInTable(tableId) {
    const table = document.getElementById(tableId);
    if (table && table.rows.length > 1) { // Check if the table has rows (excluding the header row)
        return true;
    }
    return false;
}

// Get references to DOM elements
for (const key in elements) {
    if (elements.hasOwnProperty(key)) {
        elements[key] = document.getElementById(key);
    }
}

// Event listener for Starsbtn
elements.Starsbtn.addEventListener("click", async () => {
    try {
        const starWarsCharacter = await getStarWarsCharacter();
        const homeworld = await getStarWarsHomeworld(starWarsCharacter.homeworld);
        displayCharacterInfo(starWarsCharacter, homeworld);
        getStarWarsPlane(starWarsCharacter.homeworld); // Pass homeworld as parameter
    } catch (error) {
        console.log("Error:", error);
    }
});

// Function to fetch information about a Star Wars character
async function getStarWarsCharacter() {
    const apiURL = `https://swapi.py4e.com/api/people/?search=${elements.Search.value}`;
    const response = await fetch(apiURL);
    const data = await response.json();
    return data.results[0]; // Assuming only the first result is needed
}

// Function to fetch information about the homeworld
async function getStarWarsHomeworld(homeworldUrl) {
    const response = await fetch(homeworldUrl);
    const data = await response.json();
    return data.name;
}

// Function to populate the table with planet information
async function getStarWarsPlane(homeworldUrl) {
    const apiplane = homeworldUrl;
    try {
        const response = await fetch(apiplane);
        const starWarsplane = await response.json();

        // Create a new row for the table
        const newRow = document.createElement("tr");

        // Create table cells for id, name, and population
        const tdId = document.createElement("td");
        tdId.innerText = starWarsplane.url.match(/\d+/)[0]; // Extract ID from URL

        const tdName = document.createElement("td");
        tdName.innerText = starWarsplane.name;

        const tdPopulation = document.createElement("td");
        tdPopulation.innerText = starWarsplane.population;

        // Append the table cells to the new row
        newRow.appendChild(tdId);
        newRow.appendChild(tdName);
        newRow.appendChild(tdPopulation);

        // Append the new row to the table
        const tableBody = document.getElementById("table").querySelector("tbody");
        tableBody.appendChild(newRow);
    } catch (error) {
        console.log("Error fetching planet data:", error);
    }
}

// Function to display character information in the UI
function displayCharacterInfo(character, homeworld) {
    elements.name.innerText = `Name: ${character.name}`;
    elements.height.innerText = `Height: ${character.height}`;
    elements.mass.innerText = `Mass: ${character.mass}`;
    elements.hair_color.innerText = `Hair Color: ${character.hair_color}`;
    elements.skin_color.innerText = `Skin Color: ${character.skin_color}`;
    elements.eye_color.innerText = `Eye Color: ${character.eye_color}`;
    elements.birth_year.innerText = `Birth Year: ${character.birth_year}`;
    elements.gender.innerText = `Gender: ${character.gender}`;
    elements.homeworld.innerText = `Homeworld: ${homeworld}`;
}

// Usage example: Check if the table has items
if (hasItemsInTable("table")) {
    console.log("Table has items.");
} else {
    console.log("Table is empty or doesn't exist.");
}

