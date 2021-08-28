let recipeData, userInput;
const $input = $('input[type="text"]')
const $recipeArea = $('#recipes')


function getRecipe(event) {
    event.preventDefault()

    userInput = $input.val();
    $.ajax({
        url: `https://api.spoonacular.com/recipes/complexSearch?query=${userInput}&instructionsRequired=true&addRecipeInformation=true&apiKey=d0acc05453c4415ab10cd087ae0057ad`,
    }).then(
        (recipe) => {
            recipeData = recipe.results
            console.log(recipeData)
            render()
        },

        (error) => {
            console.log('bad request', error)
        }
    )
}

$('form').on('submit', getRecipe)

function render() {
    $recipeArea.html('')
    for (item of recipeData) {
        console.log(item)
        let newItem =
            $(`<div class="card"><img src="${item.image}"><div class="ct-area"><h3 class="card-title">${item.title}</h3><p class="card-stat">${item.readyInMinutes} min <span class="line">|</span> <i class="fas fa-utensils"></i>${item.servings}</p></div></div>`)
        $recipeArea.append(newItem)
    }
}