const searchForm = document.querySelector('form');
const cardInfo = document.querySelector('.cards');
const mealDetailsContent = document.querySelector('.meal-content');
const recipeCloseBtn = document.getElementById('close');

searchForm.addEventListener('submit', getMeals);
cardInfo.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', ()=> {
    console.log('closing')
    mealDetailsContent.parentElement.classList.remove('show');
});
window.addEventListener('click', (event) => {
    if(event.target.classList.contains('show')) {
        mealDetailsContent.parentElement.classList.remove('show');
    }
})


function getMeals(event) {
    event.preventDefault();
    let searchInput = document.querySelector('input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
    .then(res => res.json())
    .then(data => {
        let html = "";
        if(data.meals) {
            data.meals.forEach(meal => {
                html += `
                <div class = "card">
                    <img src="${meal.strMealThumb}" alt="food">
                    <div class="card-content">
                        <p data-id="${meal.idMeal}">
                        ${meal.strMeal} 
                        </p>
                    </div>
                    <div class="card-info">
                        <div>
                            <a href="#" class="recipe-btn">View</a>
                        </div>
                    </div>
                </div>
                `;
            });
        }
        else {
            html = "No results";
            cardInfo.classList.add('notFound');
        }
        cardInfo.innerHTML = html;
    });
}

function getMealRecipe(e) {
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement.previousElementSibling.querySelector('p');
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

function mealRecipeModal(meal){
    meal = meal[0];
    let html = `
    <div class="meal-details-content">
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <!--<div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>-->
    </div>    
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('show');
}