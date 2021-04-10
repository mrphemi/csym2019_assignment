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
  cityDropdown.removeAttribute("disabled");
  citiesArr.forEach((city) => {
    cityDropdown.innerHTML += `<option>${city}</option>`;
  });
}

function clearDropdown() {
  cityDropdown.innerHTML = "<option value='' selected>Select a City</option>";
}

function getWeatherInfo() {
  const city = cityDropdown.value;
  const apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  fetch(apiCall)
    .then((res) => res.json())
    .then((data) => displayWeatherDetails(data));
}

function displayWeatherDetails(data) {
  const icon = document.getElementById("icon");
  const fahrenheit = document.getElementById("temp_f");
  const celcius = document.getElementById("temp");
  const humidity = document.getElementById("humidity");
  const milesPerHour = document.getElementById("wind_speed");
  const kmPerHour = document.getElementById("wind_speed_kmh");
  const windDirection = document.getElementById("wind_direction");
  const city = document.getElementById("city_name");
  const description = document.getElementById("description");
  const date = document.getElementById("date");

  const severeSign = document.querySelector(".description div");
  const detailsContainer = document.querySelector(".weather_details");

  detailsContainer.classList.remove("hide");

  date.innerHTML = formatDate(new Date(Date.now()));
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
  );
  city.innerHTML = data.name;
  fahrenheit.innerHTML = data.main.temp + "F";
  celcius.innerHTML = fahrenheitToCelcius(data.main.temp).toFixed(2) + "°c";
  humidity.innerHTML = data.main.humidity + "%";
  description.innerHTML = data.weather[0].description;
  milesPerHour.innerHTML = data.wind.speed + "m/h";
  kmPerHour.innerHTML = milesToKm(data.wind.speed).toFixed(2) + "k/h";
  windDirection.innerHTML =
    data.wind.deg + "°" + getWindDirectionText(data.wind.deg);

  if (checkWeatherSeverity(fahrenheitToCelcius(data.main.temp))) {
    severeSign.classList.remove("hide");
  } else {
    severeSign.classList.add("hide");
  }
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

function fahrenheitToCelcius(tempInF) {
  return (tempInF - 32) * 0.5556;
}

function milesToKm(speedInMiles) {
  return speedInMiles * 1.609344;
}

function checkWeatherSeverity(temperature) {
  if (temperature > 35) return true;
  if (temperature < -5) return true;
  return false;
}

function getWindDirectionText(windDirection) {
  if (windDirection === 0 || windDirection === 360) {
    return "N";
  }

  if (windDirection > 0 && windDirection < 90) {
    return "NE";
  }

  if (windDirection === 90) {
    return "E";
  }

  if (windDirection > 90 && windDirection < 180) {
    return "SE";
  }

  if (windDirection === 180) {
    return "S";
  }

  if (windDirection > 180 && windDirection < 270) {
    return "SW";
  }

  if (windDirection === 270) {
    return "W";
  }

  if (windDirection > 270 && windDirection < 360) {
    return "NW";
  }
}
