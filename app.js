const API_URL = "https://recipe-api-app-agg6eydcchhtfjcq.centralus-01.azurewebsites.net/api/GetRecipes"; // Replace with your Function URL

async function searchRecipes() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const container = document.getElementById("recipes");

    container.innerHTML = "<p class='loading'>Loading recipes...</p>";

    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const filtered = data.filter(recipe =>
            recipe.name.toLowerCase().includes(query)
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
                <h3>${recipe.name}</h3>
                <p><strong>Cuisine:</strong> ${recipe.cuisine || "Unknown"}</p>
                <p>${recipe.description || ""}</p>
                ${recipe.image ? `<img src="${recipe.image}" alt="${recipe.name}" />` : ""}
            `;
            container.appendChild(div);
        });

    } catch (error) {
        container.innerHTML = "<p class='empty-state'>Error loading recipes</p>";
    }
}
