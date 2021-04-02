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
