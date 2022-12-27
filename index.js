let allCountries =[]; 
const countryName = document.getElementById('country-name');
const countryImg = document.getElementById('country-img');
let falgsRoot = document.getElementById('flags-root')
 const mySelect = document.getElementById('my-select');
const mainBox = document.getElementById('main-box');
const outerMainBox = document.getElementById('outer-main-box');
const searchCountryBtn = document.getElementById('searchCountryBtn');
const countryInput = document.getElementById('country-input');
const selectContinent = document.getElementById('select-continent');
 let country={}
 
 

function getAllCountriesLikeIWouldWriteIt() {
  return fetch("https://restcountries.com/v3.1/all").then((response) =>
    response.json()
  );
}
function getByName(name) {
  return fetch("https://restcountries.com/v2/name/"+name).then((response) =>
    response.json()
  );
}

searchCountryBtn.addEventListener('click',  ()=>{
	
	let name = countryInput.value;
	 getByName(name).then((x)=>((x.map((item)=>(((item))))))).then((x) =>(spredAllFlags(getAllFlags(x))))
	
	
	countryInput.value='';
})
 //

getAllCountriesLikeIWouldWriteIt().then((actualCountries) => {
 

 allCountries = actualCountries;
console.log(allCountries)
}).then((actualCountries)=> {
	
	addNamesToSelectElement();
	 spredAllFlags(getAllFlags(allCountries));
 getCountriesByContinent('North America');
})

function getCountriesNames(){
	let x =allCountries.map((item) => item.name.common)
	//console.log(x)
	return x;
}


function addNamesToSelectElement(){
	mySelect.innerHTML+=`<option  value="">pick a country</option>`
	for (var item of getCountriesNames() ){
		
		mySelect.innerHTML+=`<option  value="${item}">${item}</option>`
	}
	
}


function getAllFlags(arr){
	let x =arr.map((item) => item.flags.png)
	//console.log(x)
	return x;
}
function spredAllFlags(arr){
	
	falgsRoot.innerHTML="";
	//let flags = getAllFlags();
	console.log(arr)
	falgsRoot.innerHTML = arr.map((flag)=>(` <img data-index=${flag} class='flag-img' src="${flag}" ></img>`)).join("")
}


//////////////////////////////////////////////////////////////////////////////////////
function getCountryIndexIngeneralArrByFlagSRC(flag){
	for(let i=0;i<allCountries.length;i++){
		if(flag==allCountries[i].flags.png){
			return i;
		}
	}
}
mySelect.onchange = (event) => {
     var inputText = event.target.value;
     console.log(inputText);
	
	 let country = (setCounteryObject(findIndexByCountryName(inputText)))
	 console.log(country);
	 BuildMainBoxData(country);
	 event.target.value="";
 }
 
 selectContinent.onchange = (event) => {
     var inputText = event.target.value;
     console.log(inputText);
	
	let x = getCountriesByContinent(inputText);
		 spredAllFlags(getAllFlags(x));
	 
 }
 
 function findIndexByCountryName(countryName){
	 for (let item in allCountries ){
		 if(allCountries[item].name.common==countryName){
			   let index =  item;
 setCounteryObject(index)

			return item//the index in allCountries arr; 
		 } 
	 }
//
 }
 
  function getCountriesByContinent(continents){
	  
	 let x = allCountries.filter((item)=>(item.continents[0]==continents))
	 return(x);
  }
 getCountriesByContinent('North America');
 
 falgsRoot.addEventListener('click',(e)=>{
	   let index = e.target.closest("img[data-index]").dataset.index;//צריך להעביר דגל ולא אינדקס ואז דרך הדגל לעשות חיפוש של אינדקס
	 setCounteryObject(getCountryIndexIngeneralArrByFlagSRC(index));///צריך לסדר את זה למצוא קודם את האינדקס בתוך כל המערך ורק אז להעביר
	 BuildMainBoxData(country);

 })
 
 function setCounteryObject(index){
	     country = {
	name: allCountries[index].name.common,
	 capital:allCountries[index].capital[0],
	 car: allCountries[index].car.side,
	 continents:allCountries[index].continents[0],
	currenciesName:Object.values(allCountries[index].currencies)[0].name, 
	currenciesSymbol:Object.values(allCountries[index].currencies)[0].symbol,
	 flags:allCountries[index].flags.png,
	 languages:Object.values(allCountries[index].languages)[0],
	 population:allCountries[index].population,
	 timezones:allCountries[index].timezones[0]
	 
	 
 }
 console.log(country)
  return country;
 }
 
 mainBox.addEventListener('click',()=>{
	 mainBox.style.visibility="hidden";
	  outerMainBox.style.visibility="hidden";
 })
 
 function BuildMainBoxData(country){
	 mainBox.innerHTML=`
	 <div class='box-inner-div'>
	  <div>
	 	 <h2> ${country.name}</h2>
	  <h3>Capital: ${country.capital}</h3>
	   <h3>Driving side: ${country.car}</h3>
	    <h3>Continent: ${country.continents}</h3>
		<h3>Currencie: ${country.currenciesName} ${country.currenciesSymbol}</h3>
		   <h3>Languages: ${country.languages}</h3>
		      <h3>Population: ${country.population}</h3>
			     <h3>Timezones: ${country.timezones}</h3>
	 </div>
	  <div>
	   <img class='box-img' src="${country.flags}"> </img>
	 </div>
	 </div>

	 
	 `;
	  mainBox.style.visibility="visible";
	 outerMainBox.style.visibility="visible";
 }
 
