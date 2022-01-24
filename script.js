// CREATING HTML ELEMENTS
document.body.innerHTML = `<div class="container sm mt-4"><div class="heading-container">
<h1 class='bg-warning rounded px-1'>Find the nationality based on name</h1>
</div>


<div id="mainContainer" class="main-container">
<p>This is a website which shows the country id and probability of your name present in that country</p>
<input type="text" class="search  text-lowercase">
<button class="btn btn-primary m-1 px-3 ">Search</button>
</div>
<div class='result' id="result"></div></div>`;

// Assigning variables to different html element and reading them
let button = document.getElementsByClassName("btn")[0];
let search = document.getElementsByClassName("search")[0];
let result = document.getElementsByClassName("result")[0];

result.innerHTML = `<p class='mt-2'>ENTER THE NAME YOU WANT TO KNOW THE NATIONALITY </p>`;

// on clicking the button we should get the response through the following logic
button.addEventListener("click", getdata);

async function getdata() {
  result.innerHTML = "loading...";
  try {
    let name = search.value;
    const url = `https://api.nationalize.io/?name=${name}`;
    let response = await fetch(url);
    let object = await response.json();
    result.innerHTML = `
    <div class='bg bg-info mt-4 p-3 border border-warning rounded'>
    <h3>1.Country ID : ${object.country[0].country_id}</h3> 
    <h3>Probability : ${object.country[0].probability}</h3>
    <hr/>
    <h3>2.Country ID : ${object.country[1].country_id}</h3> 
    <h3>Probability : ${object.country[1].probability}</h3>
    </div>
   
       `;
  } catch (error) {
    //If there is an error and the result cannot be found the following message will be displayed
    result.innerHTML = `<p>Sorry the name don't match our database please try with changing spelling or another name</p>`;
  }
}
