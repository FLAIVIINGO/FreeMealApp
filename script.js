const searchForm = document.querySelector('form');
const cardInfo = document.querySelector('.cards');

searchForm.addEventListener('submit', getMeals);

function getMeals(event) {
    event.preventDefault();
    let searchInput = document.querySelector('input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
    .then(res => res.json())
    .then(data => {
        let html = "";
        if(data.meals) {
            console.log(data.meals);
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
                            <a href="#" class="card-link" id="card-btn">View</a>
                        </div>
                    </div>
                </div>
                `;
            });
        }
        cardInfo.innerHTML = html;
    });
}