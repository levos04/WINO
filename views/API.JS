const appId = '470edf3d';
const appKey = 'b8197949b4bbc682ef8ac82dda5e609a';
const baseUrl = 'https://api.edamam.com/api/recipes/v2';

document.getElementById('search-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const calories = document.getElementById('calories').value;
    const protein = document.getElementById('protein').value;
    const carbs = document.getElementById('carbs').value;

    const queryParams = new URLSearchParams({
        type: 'public',
        app_id: appId,
        app_key: appKey,
    });

    if (calories) queryParams.append('calories', calories);
    if (protein) queryParams.append('nutrients[PROCNT]', protein);
    if (carbs) queryParams.append('nutrients[CHOCDF]', carbs);

    const url = `${baseUrl}?${queryParams.toString()}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        const recipesContainer = document.getElementById('recipes');
        recipesContainer.innerHTML = '';

        if (data.hits && data.hits.length > 0) {
            data.hits.forEach(hit => {
                const recipe = hit.recipe;
                const recipeElement = document.createElement('div');
                recipeElement.classList.add('recipe');

                recipeElement.innerHTML = `
                    <div class="bg-white shadow-md rounded-lg overflow-hidden">
                        <img class="w-full h-48 object-cover" src="${recipe.image}" alt="${recipe.label}">
                        <div class="p-4">
                            <h3 class="text-xl font-bold mb-2">${recipe.label}</h3>
                            <p class="text-gray-700 mb-2">Calorías: ${recipe.calories.toFixed(0)}</p>
                            <p class="text-gray-700 mb-2">Proteínas: ${recipe.totalNutrients.PROCNT.quantity.toFixed(1)}g</p>
                            <p class="text-gray-700 mb-2">Carbohidratos: ${recipe.totalNutrients.CHOCDF.quantity.toFixed(1)}g</p>
                            <a href="${recipe.url}" target="_blank" class="text-blue-500 hover:underline">Ver receta completa</a>
                        </div>
                    </div>
                `;

                recipesContainer.appendChild(recipeElement);
            });
        } else {
            recipesContainer.innerHTML = '<p class="text-gray-500">No se encontraron recetas.</p>';
        }
    } catch (error) {
        console.error('Error fetching recipes:', error);
        const recipesContainer = document.getElementById('recipes');
        recipesContainer.innerHTML = '<p class="text-red-500">Error al buscar recetas. Por favor, intenta de nuevo más tarde.</p>';
    }
});
