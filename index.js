const pokeContainer=document.querySelector('.pokeContainer');
const mainImage=document.getElementById("mainImage");
const pokeName=document.getElementById("pokeName");
const pokeHeight=document.getElementById("pokeHeight");
const pokeWeight=document.getElementById("pokeWeight");
const error=document.querySelector(".error");
const pokeball=document.querySelector(".pokeball");
const defaultImage=document.querySelector(".defaultImage");
const message=document.querySelector(".message");
const pokeInfo=document.getElementById("pokeInfo");

pokeContainer.style.display='none'; 
mainImage.style.animation="none";

document.addEventListener("keydown",(e)=>{
if(e.key=="Enter")
    {
        search();
    }
});

async function search()
{
 message.style.visibility='hidden';
 defaultImage.style.display='block';
 pokeContainer.style.display='none';
 const inputField = document.getElementById("pokemonName");
 const pokemonName=document.getElementById("pokemonName").value.trim().toLowerCase();
  
  if (pokemonName === "") {
    
    pokeContainer.style.display='none';
    error.style.display='none';
    message.style.visibility='visible';
    inputField.classList.add("input-blink");
    
    setTimeout(() => 
    {
    inputField.classList.remove("input-blink");
    message.style.visibility='hidden';
    
    }, 1500);
    return;
  }
 try{
       defaultImage.style.display='none';
       pokeball.style.display='block';
        pokeContainer.style.display='none'; 
        mainImage.style.animation="none";
    const response= await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if(!response.ok)
            {
                pokeball.style.display='none';
                error.style.display='flex';
                throw new Error("Pokemon not there");
            }
        else{
        pokeball.style.display='none';
    const value=await response.json();
    error.style.display='none';
    
    pokeContainer.style.display='flex';
    const sprite =
    value.sprites.other.dream_world.front_default||
    value.sprites.other["official-artwork"].front_default ||
    value.sprites.other.home.front_default ||
    value.sprites.front_default;

    mainImage.setAttribute("src",`${sprite}`);
    mainImage.setAttribute("title",`${value.name}`);
    pokeContainer.style.display="flex";
    mainImage.style.animation="zoominout 1s ease-in-out";
    pokeName.textContent=`${value.name}`;
    pokeHeight.textContent=`${(value.height)/10} m`;
    pokeWeight.textContent=`${(value.weight)/10} kgs`;
    const typesUl = document.getElementById("pokeTypes");
    typesUl.innerHTML = "";
    value.types.forEach(type => {
        const li = document.createElement("li");
        li.textContent = type.type.name;
        li.className=`typeBadge ${type.type.name}`;
        typesUl.appendChild(li);
    });

 
    const statsUl = document.getElementById("pokeStats");
    statsUl.innerHTML = "";
    value.stats.forEach(stat => {
        const li = document.createElement("li");
        li.textContent = `${stat.stat.name}: ${stat.base_stat}`;
        statsUl.appendChild(li);
    });
    }
   
    setTimeout(() => {
  mainImage.style.animation = "float 2s ease-in-out infinite";
}, 1100);

 }
 catch(error){
    console.error(error);
 }
 
}

 