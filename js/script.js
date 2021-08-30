let recipeData, userInput;
const $input = $('input[type="text"]')
const $recipeArea = $('#recipes')
const $instructionArea = $('#instruction-area')

function getRecipe(event) {
    event.preventDefault()

    userInput = $input.val();
    $.ajax({
        url: `https://api.spoonacular.com/recipes/complexSearch?query=${userInput}&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true&apiKey=d0acc05453c4415ab10cd087ae0057ad`,
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
        let instructions = item.analyzedInstructions[0].steps;
        let $newItem =
            $(`<div class="card">
                <div id="card-header">
                    <img src="${item.image}">
                    <div class="ct-area">
                        <h3 class="card-title">${item.title}</h3>
                        <p class="card-stat">${item.readyInMinutes} min <span class="line">|</span> <i class="fas fa-utensils"></i>${item.servings}</p>
                        <div id="tag-area">
                            <div class="tag" id="cal">Cal: ${Math.round(item.nutrition.nutrients[0].amount)}</div>
                            <div class="tag" id="fat">Fat: ${Math.round(item.nutrition.nutrients[1].amount)}</div>
                            <div class="tag" id="sug">Sug: ${Math.round(item.nutrition.nutrients[5].amount)}</div>
                        </div>
                        <p class="inst-link">View Instructions</p>
                    </div> 
                </div>
                <div id="instruction-area">
                    <h3>Instructions:</h3>
                </div>
            </div>`) 
        
        $recipeArea.append($newItem)

        for(step of instructions){
            let $newStep = $(`<div class="step-area"><p class="step-num">${step.number}</p><p class="step-text">${step.step}</p></div>`)
            $newItem.find('#instruction-area').append($newStep)
        }
    }
}

let isVisible = false;
$('body').click(function(event){
    let target = $(event.target)
    let $instArea
    if(target.is('.inst-link')){
        $instArea = target.closest(".card").find("#instruction-area")
        if(isVisible === false){
            $instArea.slideDown('slow').css({'display': 'flex'})
            isVisible = true
        } else if(isVisible === true){
            $instArea.slideToggle('slow')
            isVisible = false
        }
        console.log(isVisible)
    }
})
