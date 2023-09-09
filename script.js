const apiKey = "7ebb509a518117c3b626725fad710a67";
const searchBar=document.querySelector(".search-bar");
const searchButton=document.querySelector(".search-button");
const icon=document.querySelector(".icon");
let selectedVal;
let api;
$(document).ready(function () {
  $("#temperatureUnit").change(function () {
      selectedVal = $("#temperatureUnit option:selected").val();
      if(selectedVal=="Farenheit"){
        api = `https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=${apiKey}`;
      }
      else if(selectedVal=="Celcius"){
        api = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}`;
      }
  });
});

async function weatherDetails(city) {
  const response = await fetch(`${api}&q=${city}`);
  if (response.ok) {
  let data = await response.json();
  document.querySelector(".error-msg").style.display="none";
  document.querySelector(".place").innerHTML=data.name;
  if(selectedVal=="Celcius"){
  document.querySelector(".temperature").innerHTML=Math.round(data.main.temp)+"&deg;C";
  document.querySelector(".feelsLike").innerHTML=Math.round(data.main.feels_like)+"&deg;C";
  document.querySelector(".minTemp").innerHTML=Math.round(data.main.temp_min)+"&deg;C";
  document.querySelector(".maxTemp").innerHTML=Math.round(data.main.temp_max)+"&deg;C";
  document.querySelector(".wind").innerHTML=data.wind.speed+"m/s";
  }
  else if(selectedVal=="Farenheit"){
    document.querySelector(".temperature").innerHTML=Math.round(data.main.temp)+"&deg;F";
    document.querySelector(".feelsLike").innerHTML=Math.round(data.main.feels_like)+"&deg;F";
    document.querySelector(".minTemp").innerHTML=Math.round(data.main.temp_min)+"&deg;F";
    document.querySelector(".maxTemp").innerHTML=Math.round(data.main.temp_max)+"&deg;F";
    document.querySelector(".wind").innerHTML=data.wind.speed+"mile/h";
  }
  document.querySelector(".description").innerHTML=data.weather[0].main;
  document.querySelector(".humidity").innerHTML=Math.round(data.main.humidity)+"%";
  document.querySelector(".wind").innerHTML=data.wind.speed+"m/s";
  if(data.weather[0].main=="Clouds"){
    icon.src="logos/clouds.png";
    document.body.style.backgroundImage = "url('images/clouds.jpg')";
  }
  else if(data.weather[0].main=="Clear"){
    icon.src="logos/clear.png";
    document.body.style.backgroundImage = "url('images/clear.jpg')";
  }
  else if(data.weather[0].main=="Drizzle"){
    icon.src="logos/drizzle.png";
    document.body.style.backgroundImage = "url('images/drizzle.jpg')";
  }
  else if(data.weather[0].main=="Rain"){
    icon.src="logos/rain.png";
    document.body.style.backgroundImage = "url('images/rain.jpg')";
  }
  else if(data.weather[0].main=="Snow"){
    icon.src="logos/clouds.png";
    document.body.style.backgroundImage = "url('images/snow.jpg')";
  }
  else if(data.weather[0].main=="Thunderstorm"){
    icon.src="logos/thunderstorm.png";
    document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";
  }
  else {
    icon.src="logos/mist.png";
    document.body.style.backgroundImage = "url('images/mist.jpg')";
  }
  document.querySelector(".main-block").style.display="block";
  document.querySelector(".weather-details").style.display="block";
  }
  else{
    console.error("Error featching weather Data");
    document.querySelector(".error-msg").style.display="block";
    document.querySelector(".main-block").style.display="none";
  document.querySelector(".weather-details").style.display="none";
  }
}
searchButton.addEventListener("click",()=>
{
  weatherDetails(searchBar.value);
});
searchBar.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    weatherDetails(searchBar.value);
  }
});