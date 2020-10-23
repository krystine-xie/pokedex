// DISPLAYING THE POKEMON CHART 

function displayPokemon() {
    // 1. declare variable called output with empty string --> this will be the HTML string to insert into the 'wrapper' div. 
    let output = ''; 

    // 2. loop through all 151 pokemon 
    for (let i=1; i<152; i++) {

        // 3. 'if' statement for the start of each row
        if (i === 1 || i % 10 === 1) {
            output += '\n<div class="row">\n\t<img id='+i+' src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/'+i+'.png">';

            // 4. 'if' statement for the end of each row
        } else if (i % 10 === 0) {
            output += '\n\t<img id='+i+' src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/'+i+'.png">\n</div>';

		    // 5. 'if' statement for the last pokemon
        } else if (i === 151) {
            output += '\n<div class="row">\n\t<img id='+i+' src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/'+i+'.png"></div>';

            // 6. else statement for all pokemon in between        
		} else {
            output += '\n\t<img id='+i+' src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/'+i+'.png">';
        }; 
    };

	// Manipulate/Modify the DOM!	
    document.getElementById('wrapper').innerHTML = output;
};

// Call the function. 

displayPokemon();


// jQuery stuff 

$(document).ready(function() {

    // Hover over the pokemon to get its name 
    $.get('https://pokeapi.co/api/v2/pokemon/?&limit=151', function(res) {
        for (let i=0; i < 152; i++) {
            let current = res.results[i];
            let name = current.name;
            let pokemonId = i+1;
            $("#"+pokemonId).hover(function() {
                $(this).css('cursor','pointer').attr('title', 'This is a ' + name + '!');
            }, function() {
                $(this).css('cursor','auto');
            });
        }
    })


    // Click on pokemon to display its attributes on the Pokedex 
    $('#wrapper img').click(function() {
        let pokemonId = $(this).attr('id');
        $.get('https://pokeapi.co/api/v2/pokemon/'+pokemonId, function(res) {
            let htmlString = ''; 
            let imgString = '';
            let pokemonName = res.name; 
            let pokemonHeight = res.height;
            let pokemonWeight = res.weight;
        
            imgString += '<img class="pokedex-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/'+pokemonId+'.png"></img>';
            htmlString += '<h2 class="capitalize">'+pokemonName+'</h2>';
            htmlString += '<p><span class="bolded">Type(s): </span></p>';
            htmlString += '<ul>';
            for(var i = 0; i < res.types.length; i++) {
                
                htmlString += "\n\t<li>" + res.types[i].type.name + "</li>";
            }
            htmlString += "\n</ul>";

            htmlString += '<p><span class="bolded">Height: </span>'+pokemonHeight/10+' m</p>' 
            htmlString += '<p><span class="bolded">Weight: </span>'+pokemonWeight/10+' kg</p>' 
            

            $('#image-profile').html(imgString);
            $('#attributes').html(htmlString);
       })
    })

});




