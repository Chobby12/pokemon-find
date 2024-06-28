const makeRequest = (location) =>{
    return new Promise((resolve, reject) => {
        console.log("Making Request...")
        if(location == "google"){
            resolve("Google is available");
        }
        else{
            reject("Google is the only available option")
        }
    })
}

const processRequest = (response) =>{
    return new Promise((resolve, reject) => {
        console.log("Processing Request...");
        resolve(`Additional Information: ${response}`);
    })
}

async function locate(){
    try{
        // const response = await makeRequest(`${prompt("Enter URL location").toLowerCase()}`);
        const response = await makeRequest('google');
        console.log(response)
        console.log("Sending Request...");
        const msg = await processRequest(response);
        console.log(msg)
    }
    catch{
        console.log("error")
        throw new Error("Error locating URl");
    }
}

locate();

const acc = document.querySelectorAll(".btn");
const signs = document.querySelectorAll(".sign");
const texts = document.querySelectorAll(".text");

for(i=0;i<acc.length;i++){
    acc[i].addEventListener('click',function(){
        this.classList.toggle("active");
        let panel = this.nextElementSibling;
        if(panel.style.display==="block" ){
            panel.style.display="none";
        }
        else{
            panel.style.display="block";
        }
    })
}

const findPokemon = document.querySelector("#find_pokemon");
const pokeImgOne = document.querySelector("#poke_image");
const pokeImgTwo = document.querySelector("#poke_image_two");
const pokeImgThree = document.querySelector("#poke_image_three");
const pokeImgFour = document.querySelector("#poke_image_four");
const pokeName = document.querySelector(".name");
const pokeOrder = document.querySelector(".order");
const pokeHeight = document.querySelector(".height");
const pokeWeight = document.querySelector(".weight");
const pokeAbility = document.querySelectorAll(".abilities");
const searchPokemon = document.querySelector(".find");
const result = document.querySelector(".result");

async function fetchData(){
    try{
         
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${findPokemon.value.toLowerCase()}`);
        if(findPokemon.value == ""){
            alert("Please enter a Pokemon name");
        }
        if(!res.ok){
            alert("Please Enter a valid Pokemon name");
        }
        const data = await res.json();
        console.log(data);
        console.log(data.sprites["front_default"])
        pokeImgOne.src = data.sprites["front_default"];
        pokeImgTwo.src = data.sprites["front_shiny"];
        pokeImgThree.src = data.sprites["back_default"];
        pokeImgFour.src = data.sprites["back_shiny"];
        pokeName.innerText = data.name;
        pokeOrder.innerText = data.order;
        pokeHeight.innerText = data.height;
        pokeWeight.innerText = data.weight;
        for(i=0;i<pokeAbility.length;i++){
            pokeAbility[0].innerText = data.abilities[0]["ability"]["name"];
            pokeAbility[1].innerText = data.abilities[1]["ability"]["name"];
            pokeAbility[2].innerText = data.abilities[2]["ability"]["name"];
        }
       
    }
    catch{
        err => console.log(err);
    }
}
searchPokemon.addEventListener("click",fetchData);