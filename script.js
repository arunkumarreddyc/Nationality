// CREATING HTML ELEMENTS
document.body.innerHTML = `
<div class="container sm mt-4"><div class="heading-container">
<h1 class='bg-warning rounded px-1 heading'>   Find the nationality based on name</h1>
</div>


<div id="mainContainer" class="main-container">
<a href="World Trade Press Report_Country_Codes.pdf" target="_blank">Download country codes</a>
<p> This is a website which shows the country code and probability of the name present in that country</p>
<input type="text" class="searchbar  text-lowercase">
<button class="btn btn-primary m-1 px-3 ">Search</button>
</div>

<div class='result' id="result"></div></div>
`;

// Assigning variables to different html element and reading them
let button = document.getElementsByClassName("btn")[0];
let searchbar = document.getElementsByClassName("searchbar")[0];
let result = document.getElementsByClassName("result")[0];

result.innerHTML = `<p class='mt-2'>TO KNOW THE NATIONALITY, ENTER THE NAME OF THE PERSON</p>`;

// on clicking the search button we should get the response 
button.addEventListener("click", getdata);
// using the enter key for getting the response
searchbar.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   button.click();
  }
});

// Use of async and await and fetching the api to get the data
async function getdata() {
  result.innerHTML = "loading...";
  try {
    let name = searchbar.value;
    const url = `https://api.nationalize.io/?name=${name}`;
    let response = await fetch(url);
    let object = await response.json();
    result.innerHTML = `
    <div class='bg bg-info mt-4 p-2 border border-warning rounded'>
    <h3>1.Country code : ${object.country[0].country_id}</h3> 
    <h3>Probability : ${object.country[0].probability}</h3>
    <hr/>
    <h3>2.Country code : ${object.country[1].country_id}</h3> 
    <h3>Probability : ${object.country[1].probability}</h3>
    </div>
    <p>*Please find the document in pdf format above to know the country by country codes.</p>
       `;
  } catch (error) {
    //If there is an error and the result cannot be found the following message will be displayed in the browser
    result.innerHTML = `<p class='mt-2'>Sorry the name don't match with our database please try by changing the spelling or use another name.*Also note that the search bar only supports single words.</p>
    `;
  }
}
