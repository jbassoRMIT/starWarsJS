//Practicing api calls with async instead of .then
const apiData=async function(){
    const response=await fetch("https://jsonplaceholder.typicode.com/posts");
    const results=await response.json();
    console.log(results);
}

// apiData();

//Now try grabbing some starWars data and wrapping the render to screen functionality all in one function
//TODO: Theres a lot of repeated code here. can we turn this into one function, passing a separate argument for each function call
//TODO: try to write a function that fetches ALL people entries
const starWarsAllPeople=async function(){
    let url=`http://swapi.dev/api/people/`;
    let people=[];
    while(url){
        let response=await fetch(url);
        const {next,results}=await response.json();
        url=next;
        people=[...people,...results]
    }
    console.log(people);
}

starWarsAllPeople();

const starWarsData=async function(category){
    let url=`http://swapi.dev/api/${category}/`;
    let itemResults=[];
    while(url){
        let response=await fetch(url);
        const {next,results}=await response.json();
        url=next;
        itemResults=[...itemResults,...results]
    }
    // const response=await fetch(`http://swapi.dev/api/${category}/`);
    // const results=await response.json();

    //target the characters ul
    const categoryList=document.querySelector(`.${category}List`);

    const items=itemResults;

    //iterate over characters, creating an li, changing the inner html, and appending to the ul
    for (let i=0;i<items.length;i++){
        const item=document.createElement("li");
        item.innerHTML=items[i].name;
        categoryList.appendChild(item);
    }
}

//write separate functions to grab planet and vehicle data and append to the right section
const starWarsPlanets=async function(){
    const response=await fetch("http://swapi.dev/api/planets/");
    const results=await response.json();

    //target the characters ul
    const planetList=document.querySelector(".planetList");

    const planets=results.results;

    //iterate over characters, creating an li, changing the inner html, and appending to the ul
    for (let i=0;i<planets.length;i++){
        const planet=document.createElement("li");
        planet.innerHTML=planets[i].name;
        planetList.appendChild(planet);
    }
}

const starWarsVehicles=async function(){
    const response=await fetch("http://swapi.dev/api/vehicles/");
    const results=await response.json();

    //target the characters ul
    const vehicleList=document.querySelector(".vehicleList");

    const vehicles=results.results;

    //iterate over characters, creating an li, changing the inner html, and appending to the ul
    for (let i=0;i<vehicles.length;i++){
        const vehicle=document.createElement("li");
        vehicle.innerHTML=vehicles[i].name;
        vehicleList.appendChild(vehicle);
    }
}


//Add functionality to let user click the title to reveal the list
//target characterListHeading
const characterListHeading=document.querySelector(".characterListHeading");

//Add event listener to heading onclick and pass StarWarsData()
characterListHeading.addEventListener("click",()=>{
    starWarsData("people");
})

//Now repeat for planets, vehicles
const planetListHeading=document.querySelector(".planetListHeading");
planetListHeading.addEventListener("click",()=>{
    starWarsData("planets");
})

const vehicleListHeading=document.querySelector(".vehicleListHeading");
vehicleListHeading.addEventListener("click",()=>{
    starWarsData("vehicles");
})





