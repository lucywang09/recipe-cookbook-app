const API_URL = "https://ambitious-mud-01374fb10.6.azurestaticapps.net";

// ── Sample recipes shown immediately on page load ──────────────────────────
const SAMPLE_RECIPES = [
    {
        name: "Spaghetti Carbonara",
        cuisine: "Italian",
        description: "A classic Roman pasta made with eggs, Pecorino Romano, guanciale and black pepper. Rich, silky and deeply satisfying.",
        image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&q=80&auto=format&fit=crop"
    },
    {
        name: "Chicken Tikka Masala",
        cuisine: "Indian",
        description: "Tender chicken in a luscious spiced tomato-cream sauce. One of the world's most beloved curries, perfect with naan or basmati rice.",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80&auto=format&fit=crop"
    },
    {
        name: "Beef Tacos",
        cuisine: "Mexican",
        description: "Seasoned beef in warm tortillas topped with fresh pico de gallo, sharp cheddar, sour cream and a squeeze of lime.",
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80&auto=format&fit=crop"
    },
    {
        name: "Margherita Pizza",
        cuisine: "Italian",
        description: "Thin crispy dough with San Marzano tomato sauce, fresh mozzarella and fragrant basil. Simple, perfect and timeless.",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80&auto=format&fit=crop"
    },
    {
        name: "Salmon Sushi Rolls",
        cuisine: "Japanese",
        description: "Fresh salmon and seasoned rice wrapped in nori. Elegant and packed with umami flavour in every single bite.",
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&q=80&auto=format&fit=crop"
    },
    {
        name: "Shakshuka",
        cuisine: "Middle Eastern",
        description: "Eggs poached in a rich, spiced tomato and pepper sauce. A vibrant one-pan dish that works brilliantly any time of day.",
        image: "https://images.unsplash.com/photo-1590412200988-a436970781fa?w=600&q=80&auto=format&fit=crop"
    }
];

// Render a list of recipe objects into the #recipes grid
function renderRecipes(recipes) {
    const container = document.getElementById("recipes");
    container.innerHTML = "";

    recipes.forEach(recipe => {
        const div = document.createElement("div");
        div.className = "recipe-card";
        div.innerHTML = `
            <div class="card-image">
                ${
                    recipe.image
                        ? `<img src="${recipe.image}" alt="${recipe.name}" />`
                        : `<span class="card-image-placeholder">🍴</span>`
                }
            </div>
            <div class="card-body">
                <span class="cuisine-badge">${recipe.cuisine || "Unknown"}</span>
                <h3>${recipe.name}</h3>
                <p>${recipe.description || "No description available."}</p>
            </div>
            <div class="card-footer">
                <span class="card-link">View Recipe &rarr;</span>
            </div>
        `;
        container.appendChild(div);
    });
}

// Show sample cards instantly — no API needed
window.addEventListener('load', () => renderRecipes(SAMPLE_RECIPES));

async function searchRecipes() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const container = document.getElementById("recipes");

    container.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            Loading recipes...
        </div>
    `;

    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const filtered = data.filter(recipe =>
            recipe.name.toLowerCase().includes(query)
        );

        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <span class="empty-icon">🍽️</span>
                    <h3>No recipes found</h3>
                    <p>Try searching with a different keyword</p>
                </div>
            `;
            return;
        }

        // Reuse the shared renderRecipes helper
        renderRecipes(filtered);

    } catch (error) {
        container.innerHTML = `
            <div class="empty-state">
                <span class="empty-icon">⚠️</span>
                <h3>Something went wrong</h3>
                <p>Could not load recipes. Please try again.</p>
            </div>
        `;
    }
}
