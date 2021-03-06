const tableBody = $("table tbody");

function getWeatherIcon(condition) {
  const iconsDirectory = "../assets/";
  switch (condition) {
    case "cloud":
      return `${iconsDirectory}cloud.png`;
    case "hail":
      return `${iconsDirectory}hail.png`;
    case "heavy cloud":
      return `${iconsDirectory}heavy cloud.png`;
    case "heavy rain":
      return `${iconsDirectory}heavy rain.png`;
    case "mist":
      return `${iconsDirectory}mist.png`;
    case "rain":
      return `${iconsDirectory}rain.png`;
    case "sleet":
      return `${iconsDirectory}sleet.png`;
    case "snow":
      return `${iconsDirectory}snow.png`;
    case "sun and cloud":
      return `${iconsDirectory}sun and cloud.png`;
    case "sun":
      return `${iconsDirectory}sun.png`;
    case "thunderstorm":
      return `${iconsDirectory}thunderstorm.png`;
    default:
      return "#";
  }
}

// Populate table with data from weather.json
function populateTable(data) {
  const tableRow = $("<tr></tr>");
  const cityId = $(`<td>${data.city_id}</td>`);
  const cityName = $(`<td>${data.city_name}</td>`);
  const currentCondition = $(`<td>${data.current_conditions}</td>`);
  const icon = $(
    `<td><img src='${getWeatherIcon(data.current_conditions)}' alt="${
      data.current_conditions
    }" /></td>`,
  );
  const temperature = $(
    `<td>${data.temperature.celcius}°C / ${data.temperature.fahrenheit}°F</td>`,
  );
  const windSpeed = $(`<td>${data.wind.wind_speed} mph</td>`);
  const windDir = $(`<td>${data.wind.wind_direction}</td>`);
  const windChill = $(`<td>${data.wind.wind_chill_factor}</td>`);
  tableBody.append(tableRow);
  tableRow.append(
    cityId,
    cityName,
    currentCondition,
    icon,
    temperature,
    windSpeed,
    windDir,
    windChill,
  );
}

function getWeatherData() {
  $.ajax({
    url: "weather.json",
    success: function (result) {
      tableBody.empty();
      result.forEach((data) => {
        populateTable(data);
      });
    },
    error: function (xhr) {
      alert("An error occured: " + xhr.status + " " + xhr.statusText);
    },
  });
  const time = 10 * (60 * 1000); // Set delay time to 10 minutes.
  setTimeout(getWeatherData, time); // Re-fetch data from weather.json every 10 minutes
}

$(document).ready(function () {
  getWeatherData();
});
