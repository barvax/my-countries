let allCountries =[]; 
const countryName = document.getElementById('country-name');
const countryImg = document.getElementById('country-img');
let falgsRoot = document.getElementById('flags-root')
 const select = document.getElementById('select');

 let country={}
 
 

function getAllCountriesLikeIWouldWriteIt() {
  return fetch("https://restcountries.com/v3.1/all").then((response) =>
    response.json()
  );
}


getAllCountriesLikeIWouldWriteIt().then((actualCountries) => {
 

 allCountries = actualCountries;
console.log(allCountries)
}).then((actualCountries)=> {
	
	addNamesToSelectElement();
	 spredAllFlags();
})

function getCountriesNames(){
	let x =allCountries.map((item) => item.name.common)
	//console.log(x)
	return x;
}


function addNamesToSelectElement(){
	select.innerHTML+=`<option  value="">pick a country</option>`
	for (var item of getCountriesNames() ){
		
		select.innerHTML+=`<option  value="${item}">${item}</option>`
	}
	
}


function getAllFlags(){
	let x =allCountries.map((item) => item.flags.png)
	//console.log(x)
	return x;
}
function spredAllFlags(){
	let counter = 0;
	let flags = getAllFlags();
	console.log(flags)
	falgsRoot.innerHTML = flags.map((flag)=>(` <img data-index=${counter++} class='flag-img' src="${flag}" ></img>`)).join("")
}

select.onchange = (event) => {
     var inputText = event.target.value;
     console.log(inputText);
	 countryName.innerHTML = inputText;
	 findIndexByCountryName(inputText)
 }
 
 function findIndexByCountryName(countryName){
	 for (let item in allCountries ){
		 if(allCountries[item].name.common==countryName){
			   let index =  item;
  country = {
	
	 capital:allCountries[index].capital[0],
	 car: allCountries[index].car.side,
	 continents:allCountries[index].continents[0],
	currenciesName:Object.values(allCountries[index].currencies)[0].name, 
	currenciesSymbol:Object.values(allCountries[index].currencies)[0].symbol,//currencies:allCountries[index].currencies.XCD.name, //+ currencies.XCD.symbol,
	 flags:allCountries[index].flags.png,
	 languages:allCountries[index].languages.eng,
	 population:allCountries[index].population,
	 timezones:allCountries[index].timezones[0]
	 
	 
 }
 console.log(country);
			return item//the index in allCountries arr; 
		 } 
	 }
//
 }
 
 falgsRoot.addEventListener('click',(e)=>{
	   let index = e.target.closest("img[data-index]").dataset.index;
	     country = {
	name: allCountries[index].name.common,
	 capital:allCountries[index].capital[0],
	 car: allCountries[index].car.side,
	 continents:allCountries[index].continents[0],
	currenciesName:Object.values(allCountries[index].currencies)[0].name, 
	currenciesSymbol:Object.values(allCountries[index].currencies)[0].symbol,//currencies:allCountries[index].currencies.XCD.name, //+ currencies.XCD.symbol,
	 flags:allCountries[index].flags.png,
	 languages:Object.values(allCountries[index].languages)[0],
	 population:allCountries[index].population,
	 timezones:allCountries[index].timezones[0]
	 
	 
 }
 console.log(country)
 })
 
 
