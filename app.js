const API_URL = "https://recipe-api-app-agg6eydcchhtfjcq.centralus-01.azurewebsites.net/api/GetRecipes"; // Replace with your Function URL

async function searchRecipes() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const container = document.getElementById("recipes");

    container.innerHTML = "<p class='loading'>Loading recipes...</p>";

    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const filtered = data.filter(recipe =>
            recipe.name.toLowerCase().includes(query) ||
            recipe.cuisine.toLowerCase().includes(query)
        );

        container.innerHTML = "";

        if (filtered.length === 0) {
            container.innerHTML = "<p class='empty-state'>No recipes found</p>";
            return;
        }

        filtered.forEach(recipe => {
            const div = document.createElement("div");
            div.className = "recipe-card";

            div.innerHTML = `
                <h2>${recipe.name}</h2>
                <p><strong>Cuisine:</strong> ${recipe.cuisine}</p>
                <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
                <p><strong>Instructions:</strong> ${recipe.instructions}</p>
            `;

            container.appendChild(div);
        });

    } catch (error) {
        container.innerHTML = "<p class='empty-state'>Error loading recipes</p>";
        console.error(error);
    }
}

// Optional: Load all recipes on page load
window.onload = searchRecipes;
