const apiKey = "908be0c26757d9306845f23e98bebb74";
const englandCities = [
  "Bath",
  "Bristol",
  "Birmingham",
  "Bradford",
  "Bournemouth",
  "Cambridge",
  "Canterbury",
  "Chester",
  "Derby",
  "Exeter",
  "Gloucester",
  "Lancaster",
  "Leeds",
  "Liverpool",
  "London",
  "Manchester",
  "Newcastle upon Tyne",
  "Norwich",
  "Nottingham",
  "Oxford",
  "Plymouth",
  "Ripon",
  "Salford",
  "Sheffield",
  "Wakefield",
  "Wolverhampton",
  "Worcester",
];

const niCities = ["Armagh", "Belfast", "Londonderry", "Lisburn", "Newry"];
const scotCities = ["Aberdeen", "Dundee", "Edinburgh", "Glasgow", "Inverness"];
const walesCities = ["Bangor", "Cardiff", "Newport", "Swansea"];

const countriesDropdown = document.getElementById("countries");
const cityDropdown = document.getElementById("cities");

clearDropdown();

// Dynamically load related cities when a country is selected
countriesDropdown.addEventListener("change", showCities);
// Get city weather info. when a city is selected
cityDropdown.addEventListener("change", getWeatherInfo);

function showCities() {
  const country = countriesDropdown.value;
  switch (country) {
    case "England":
      loadCities(englandCities);
      break;
    case "Scotland":
      loadCities(scotCities);
      break;
    case "Wales":
      loadCities(walesCities);
      break;
    case "Northern Ireland":
      loadCities(niCities);
      break;
    default:
      break;
  }
}

function loadCities(citiesArr) {
  clearDropdown();
  citiesArr.forEach((city) => {
    cityDropdown.innerHTML += `<option>${city}</option>`;
  });
}

function clearDropdown() {
  cityDropdown.innerHTML = "<option value='' selected>Select a City</option>";
}

function getWeatherInfo() {
  const city = cityDropdown.value;
  const apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiCall)
    .then((res) => res.json())
    .then((data) => displayWeatherDetails(data));
}

function displayWeatherDetails(data) {
  console.log(data);
  const temperature = document.getElementById("temp");
  const humidity = document.getElementById("humidity");
  const windSpeed = document.getElementById("wind_speed");
  const windDirection = document.getElementById("wind_direction");
  const city = document.getElementById("city_name");
  const description = document.getElementById("description");
  const date = document.getElementById("date");

  date.innerHTML = formatDate(new Date(Date.now()));
  city.innerHTML = data.name;
  temperature.innerHTML = data.main.temp + "°c";
  humidity.innerHTML = data.main.humidity + "%";
  description.innerHTML = data.weather[0].description;
  windSpeed.innerHTML = data.wind.speed + "m/s";
  windDirection.innerHTML = data.wind.deg + "°";
}

// change date to DD-MM-YY format
function formatDate(date) {
  let day = date.getDate().toString();
  let month = (date.getMonth() + 1).toString();
  const year = date.getYear().toString();

  // append zero to single digits day and month
  if (day.length === 1) day = "0" + day;
  if (month.length === 1) month = "0" + month;

  return `${day}-${month}-${year}`;
}
