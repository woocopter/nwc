console.log("!")

const searchBtn = document.querySelector('#submit');
const searchInput = document.querySelector('#search');
const getRecipeBtn = document.querySelector('#getRecipe');

/*
searchBtn.addEventListener('click', function(e) {
    e.preventDefault();
    let searchValue = searchInput.value;

    // build XHR or use fetch?
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => {
            let displayRandom = document.querySelector('#random')
            displayRandom.innerHTML = `
            <div class="card">
              <img src="${data.meals[0].strMealThumb}">
              <h3>${data.meals[0].strMeal}</h3>
            </div>`;
        })
        .catch(err => console.log(err));


    // `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`
    // random meal - https://www.themealdb.com/api/json/v1/1/random.php
});
*/

class Recipe {
    constructor(name, category, ingredients, instructions) {
        this.name = name;
        this.category = category;
        this.ingredients = ingredients;
        this.instructions = instructions;
    }
}

function displayRecipes() {
    const recipes = Storage.getRecipesFromStorage();

    recipes.forEach(recipe => addRecipeToList(recipe));
}


class Storage {
    static getRecipesFromStorage() {
        let recipes;
        if(localStorage.getItem('recipes') === null) {
            recipes = [];
        } else {
            recipes = JSON.parse(localStorage.getItem('recipes'));
        }
        return recipes;
    }
    
    static addRecipeToStorage(recipe) {
        const recipes = Storage.getRecipesFromStorage();
    
        recipes.push(recipe);
    
        localStorage.setItem('recipes', JSON.stringify(recipes));
    }
}



function addRecipeToList(recipe) {
    const list = document.querySelector('.recipeList');

    let li = document.createElement('li');
    li.classList.add('recipe');

    let i = document.createElement('i');
    i.classList.add('far');
    i.classList.add('fa-folder');

    li.appendChild(i);
    let text = document.createTextNode(` ${recipe.name}`);
    li.appendChild(text);


    let div = document.createElement('div');
    div.classList.add('details');

    let span = document.createElement('span');
    span.classList.add('ingredientsList');
    span.classList.add('col-sm-4');

    let ul = document.createElement('ul');

    recipe.ingredients.forEach(ingredient => {
        let temp = document.createElement('li');
        temp.appendChild(document.createTextNode(ingredient));
        ul.appendChild(temp);
    });

    let h3 = document.createElement('h3');
    let heading = document.createTextNode('Ingredients:');
    h3.appendChild(heading);

    heading = document.createTextNode('Instructions:');
    
    let output = `<span class="instructions col-sm-8">
    <h3>Instructions:</h3>
    <p>${recipe.instructions}</p>
    </span>`;

    // build new row
    span.appendChild(h3);
    span.appendChild(ul);
    div.appendChild(span);
    div.innerHTML += output;

    list.appendChild(li);
    list.appendChild(div);
}

function clearFields() {
    document.querySelector('#recipeName').value = '';
    document.querySelector('#category').value = '';
    document.querySelector('#ingredients').value = '';
    document.querySelector('#instructions').value = '';
}

displayRecipes();

/*
document.addEventListener('DOMContentLoaded', function(e) {
    e.preventDefault();
    fetch('https://gist.githubusercontent.com/woocopter/7b4a513d9331f9032d666ab3ed510a66/raw/54e1f4fe540101c38e8a05f70edd2dadd29f0df4/recipes.json')
        .then(response => response.json())
        .then(data => {
            let output = '';
            data.recipes.forEach(recipe => {
                output += `
                    <li class="recipe"><i class="far fa-folder"></i> ${recipe.name}</li>
                    <div class="details">
                        <span class="ingredientsList col-sm-4">
                        <h3>Ingredients:</h3>
                            <ul>
                `;
                let length = recipe.ingredients.length;

                for(let i = 0; i < length; i++) {
                    output += `<li>${recipe.measurements[i]} ${recipe.ingredients[i]}</li>`;
                }
                // recipe.ingredients.forEach(ingredient => {
                //     output += `<li>${ingredient}</li>`;
                // });           
                
                output += `
                        </ul>
                    </span>
                    <span class="instructions col-sm-8">
                        <h3>Instructions:</h3>
                        <p>${recipe.instructions}</p>
                    </span>
                </div>
            `;
        });
        document.querySelector('.recipeList').innerHTML = output;
        })
        .catch(err => console.log(err));
});
*/


// toggle form to add recipe
document.querySelector('#showRecipeForm').addEventListener('click', e => {
    let form = document.querySelector('#recipeForm');

    if(e.target.firstElementChild.classList.contains('fa-plus')) {
        e.target.firstElementChild.classList.remove('fa-plus');
        e.target.firstElementChild.classList.add('fa-minus');
    } else {
        e.target.firstElementChild.classList.remove('fa-minus');
        e.target.firstElementChild.classList.add('fa-plus');
    }

    if(form.style.display === 'block') {
        form.style.display = 'none';
    } else {
        form.style.display = 'block';
    }
});

// toggle recipe details
document.querySelector('.recipeList').addEventListener('click', e => {
    if(e.target.classList.contains('recipe')) {

        if(e.target.firstElementChild.classList.contains('fa-folder')) {
            e.target.firstElementChild.classList.remove('fa-folder');
            e.target.firstElementChild.classList.add('fa-folder-open');
        } else {
            e.target.firstElementChild.classList.remove('fa-folder-open');
            e.target.firstElementChild.classList.add('fa-folder');
        }

        if(e.target.nextElementSibling.style.display === 'flex') {
            e.target.nextElementSibling.style.display = 'none';
        } else {
            e.target.nextElementSibling.style.display = 'flex';
        }

    }
});


// submit recipe
document.querySelector('#recipeForm').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.querySelector('#recipeName').value;
    const category = document.querySelector('#category').value;
    let ingredients = document.querySelector('#ingredients').value.split('\n');
    let instructions = document.querySelector('#instructions').value.split('\n').join('<br>');

    const recipe = new Recipe(name, category, ingredients, instructions);
    addRecipeToList(recipe);
    Storage.addRecipeToStorage(recipe);
    clearFields();
});
