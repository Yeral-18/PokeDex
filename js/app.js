const pokemons = document.getElementById("pokemons");
const searchButton = document.getElementById("search-button");
const pokeEnconrado = document.getElementById("pokemonEcontrado");
const contenedorBuscador = document.getElementById("search-container");
const pokeStat = document.getElementById("pokeStat");
const searchInput = document.getElementById("search-input");
const secPokemonEncontrado = document.getElementById("sec-pokemon-encontrado")


//declaro las variables globales colors y colorsBoxShadow que eran los colores de las card de los pokemons

const colors = {
    fire: '#FFA05D',
	grass: '#8FD594',
	electric: '#FFE43B',
	water: '#6EA5FF',
	ground: '#CAAC4D',
	rock: '#90642D',
	poison: '#9D5B9B',
	bug: '#EAFD71',
	dragon: '#97b3e6',
	psychic: '#FF96B5',
	flying: '#CDCDCD',
	fighting: '#FF5D5D',
	normal: '#F1F1F1',
    dark: '#36026C',
    ice: '#97FFF6',
    steel:'#8E9B9A',
    fairy: '#FFD6FC',
    ghost: '#7D48FF'
}

const colorsBoxShadow = {
    fire: '#E86000',
	grass: '#1F6B25',
	electric: '#DDBE00',
	water: '#184897',
	ground: '#7D5F02',
	rock: '#2F1A00',
	poison: '#7A0476',
	bug: '#9FB800',
	dragon: '#9FB800',
	psychic: '#B6073B',
	flying: '#8A8A8A',
	fighting: '#AF1C1C',
	normal: '#BABABA',
    dark: '#1A0134',
    ice: '#2D635E',
    steel:'#2B2F2F',
    fairy: '#965591',
    ghost: '#2F107A'
}
const searchPokemon = async() => { 
    const searchValue = document.getElementById("search-input").value.toLowerCase(); //creo esta variable para valuar lo que este dentro del input 
    
    if(searchValue.length>0){ //una condicion de que si el input tiene algun cactares haga el siguiente codigo
    
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}`); //se usa un fetch para recorrer la api y que busque el pokemon que este escrito en en input

            if(response.ok){  //se valida que el objeto response que es donde esta el resultado del fecth se trajo la informanacion de la api correctamente
                const data = await response.json(); //Se crea una variable data para que alamece al responce convertido en json para que en js se pueda manejar, se usa al await para que el codigo no se ejecute hasta que el api sea json

                //Aquí creamos varia valiables para traer lo que necesitamos de la api
                let pokeName = data.name; 
                let pokeImg = data.sprites.front_default;
                let type = data.types[0].type.name;
                
                //Aquí creamos dos variables para amacenar los colore dependiendo el tipo ya establecidos en el codigo de arriba
                const color = colors[type]; 
                const colorBoxShadow = colorsBoxShadow[type];
                
                //Aquí creamos varios elementos que podremos en el DOM0 
                let card = document.createElement("div");
                let divImg = document.createElement("div");
                divImg.setAttribute("class","card-img")
                card.setAttribute("class","card");
                card.style.backgroundColor = color;
                
                //esta funcion lo que hace es que cuando ponga el mouse sobre la card del pokemon buscada haga el estylo dentro, es igual a un hover en CSS
                card.onmouseover  = function(){
                    card.style.boxShadow = `1px 1px 15px 7px ${colorBoxShadow}`;
                }
                //hace lo mismo pero cuando quito el mouse 
                card.onmouseout   = function(){
                    card.style.boxShadow = "none";
                }

                //Se crean mas elementos al DOM
                let h2 = document.createElement("h2");
                h2.setAttribute("class","h2-poke-encontrado");
                let img = document.createElement("img");
                img.setAttribute("class","img-poke-encontrado");
                let p = document.createElement("p");
                let b = document.createElement("b");
                b.appendChild(document.createTextNode("Type: "));
                p.setAttribute("class","p-poke-encontrado");

                //se asignan los elementos creados al DOM
                img.src = pokeImg;
                h2.appendChild(document.createTextNode(pokeName));
                p.appendChild(b);
                p.appendChild(document.createTextNode(type));
                
                divImg.appendChild(img);
                card.appendChild(h2);
                card.appendChild(divImg);     
                card.appendChild(p);
            
                pokeEnconrado.appendChild(card);

                //se crea una variable stats en donde iran todos los stast del pokemon, tales como hp, aatque y demás, esto con el fin de no llamar cada stat con su nombre y valor
                let stats = data.stats;
                //Este for recorre todo el array de stats trayedo todo lo que diga name y base_stat
                for (let i = 0; i < stats.length; i++) {
                    // se crea una variable stat para guardar lo que se recorrio en el for
                    let stat = stats[i]; 
                    const statName = stat.stat.name;
                    let statValue = stat.base_stat;
                    console.log(`${statName}: ${statValue}`);

                    //se crean elemento al DOM para los stats
                    let cardStat = document.createElement("div");
                    cardStat.setAttribute("class", "card-Stat");
                    let pStatName = document.createElement("p");
                    pStatName.setAttribute("class", "p-Name-Stat");
                    let pStatValue = document.createElement("p");
                    pStatValue.setAttribute("class", "p-Value-Stat");
                        
                    pStatName.appendChild(document.createTextNode(statName));
                    pStatValue.appendChild(document.createTextNode(statValue));

                    cardStat.appendChild(pStatName);
                    cardStat.appendChild(pStatValue);
                    card.appendChild(cardStat);

                }
                //si la condicion anterior no se cumple y es por no encontrar el nombre del pokemon se realiza esta condicion
            }else if (response.status === 404) {
                    let divMenssageError = document.createElement("div");
                    divMenssageError.setAttribute("class","div-Error");
                    let imgMenssageError = document.createElement("img");
                    imgMenssageError.setAttribute("class","img-Error");
                    imgMenssageError.src = "http://1.bp.blogspot.com/-fBRhv06zzvM/Uj_PUZkcY0I/AAAAAAAACTc/uexDvoP6pLM/s1600/Sad_Face_Pikachu_is_Sad_by_ChibiIlliterate1.png";
                    let menssageError = document.createElement("p");
                    menssageError.setAttribute("class","p-error");

                    menssageError.appendChild(document.createTextNode("We couldn't find when we found the pokemon =("));
                    divMenssageError.appendChild(imgMenssageError);
                    divMenssageError.appendChild(menssageError);
                    secPokemonEncontrado.appendChild(divMenssageError); 
            }
            
        } catch (error) {
            console.log(error);
            console.log("No existe el pokemon")



        }
    }
}

//esta funcion es para buscar todos los pokemons
const getPokemons = async() => {
    //se recorre la api con el limite de 1000 pokemons
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
    const data = await response.json();
    const pokemonsUrl = data.results;
    for (let i = 0; i < pokemonsUrl.length; i++) {
        let url = pokemonsUrl[i].url;
        let pokemonData = await (await fetch(url)).json();
        let name = pokemonData.name;
        let imgUrl = pokemonData.sprites.front_default;
        let type = pokemonData.types[0].type.name;
        const color = colors[type];

 
        let contendPokes = document.createElement("div");
        contendPokes.setAttribute("class","poke");
        contendPokes.style.backgroundColor = color;
        let h2 = document.createElement("h2");
        h2.setAttribute("class","h2-poke");
        let image = document.createElement("img");
        image.setAttribute("class","img-poke");
        let p = document.createElement("p");
        let b = document.createElement("b");
        
        p.setAttribute("class","p-poke");

        p.appendChild(b);
        b.appendChild(document.createTextNode("Type: "));

       
        h2.appendChild(document.createTextNode(name));
        image.src = imgUrl;
        p.appendChild(document.createTextNode(type));

        
        contendPokes.appendChild(h2);
        contendPokes.appendChild(image);
        contendPokes.appendChild(p);
        
        pokemons.appendChild(contendPokes);
        
    }

}

//aqui se usa esta funcion para cuando se le de click al boton de buscar haga lo siguiente
searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    pokeEnconrado.innerHTML = "";
    secPokemonEncontrado.innerHTML = "";
    searchPokemon();

    document.getElementById("search-input").value = "";
});


getPokemons();

