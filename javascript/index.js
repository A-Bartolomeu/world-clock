function clockCurrent() {
  //let currentElement = document.querySelector("#current-city");
  let currentDetailsElement = document.querySelector("#current-city-details");
  let currentLocation = moment.tz.guess();
  let currentCityTime = moment().tz(currentLocation);
  let currentCityName = currentLocation.replace("_", " ").split("/")[1];
  let currentCountryName = currentLocation.replace("_", " ").split("/")[0];

  currentDetailsElement.innerHTML = `
    <div class="current-city">
        <h3>${currentCityName} | ${currentCountryName}</h3>
        <p>${currentCityTime.format("dddd, Do MMMM YYYY")}</p>
    </div>
  `;

  const hours = currentCityTime.format("hh");
  const minutes = currentCityTime.format("mm");
  const seconds = currentCityTime.format("ss");

  const minute = minutes * 6;
  const hour = hours * 30;
  const second = seconds * 6;

  document.querySelector(".hour").style.transform = `rotate(${hour}deg)`;
  document.querySelector(".minute").style.transform = `rotate(${minute}deg)`;
  document.querySelector(".second").style.transform = `rotate(${second}deg)`;
}

function defaultCityTime() {
  // New York
  let newyorkElement = document.querySelector("#new_york");
  if (newyorkElement) {
    let newyorkDateElement = newyorkElement.querySelector(".date");
    let newyorkTimeElement = newyorkElement.querySelector(".time");
    let newyorkTime = moment().tz("America/New_York");

    newyorkDateElement.innerHTML = newyorkTime.format("dddd, Do MMMM YYYY");
    newyorkTimeElement.innerHTML = newyorkTime.format(
      "hh:mm:ss [<small>]A[</small>]"
    );
  }
  // London
  let londonElement = document.querySelector("#london");
  if (londonElement) {
    let londonDateElement = londonElement.querySelector(".date");
    let londonTimeElement = londonElement.querySelector(".time");
    let londonTime = moment().tz("Europe/London");

    londonDateElement.innerHTML = londonTime.format("dddd, Do MMMM YYYY");
    londonTimeElement.innerHTML = londonTime.format(
      "hh:mm:ss [<small>]A[</small>]"
    );
  }
  // Tokyo
  let tokyoElement = document.querySelector("#tokyo");
  if (tokyoElement) {
    let tokyoDateElement = tokyoElement.querySelector(".date");
    let tokyoTimeElement = tokyoElement.querySelector(".time");
    let tokyoTime = moment().tz("Asia/Tokyo");

    tokyoDateElement.innerHTML = tokyoTime.format("dddd, Do MMMM YYYY");
    tokyoTimeElement.innerHTML = tokyoTime.format(
      "hh:mm:ss [<small>]A[</small>]"
    );
  }
}

function updateCity(event) {
  let cityTimeZone = event.target.value;
  let cityName = cityTimeZone.replace("_", " ").split("/")[1];
  let countryName = cityTimeZone.replace("_", " ").split("/")[0];
  let isCityIncluded = cities.find((el) => el.id === cityName);
  if (!isCityIncluded) {
    cities.push({
      id: cityName,
      cityName,
      countryName,
      cityTimeZone,
    });
  }
}

function renderCities(cities) {
  if (cities.length === 0) return;
  let citiesString = "";
  for (const values of cities) {
    let { cityName, countryName, cityTimeZone } = values;
    let cityTime = moment().tz(cityTimeZone);
    citiesString += `
      <div class="other-city" id="${cityName.toLowerCase().replace(" ", "")}">
        <div>
          <h5>${cityName} | ${countryName}</h5>
            <div class="date">${cityTime.format("dddd, Do MMMM YYYY")}</div>
        </div>
          <div class="time">${cityTime.format(
            "hh:mm:ss"
          )} <small>${cityTime.format("A")}</small></div>
      </div>
      `;
  }
  let citiesElement = document.querySelector("#new-city");
  let cityDefaultElement = document.querySelector("#cities-default");
  cityDefaultElement.innerHTML = "";
  citiesElement.innerHTML = citiesString;
}

setInterval(() => {
  renderCities(cities);
}, 1000);
let cities = [];
defaultCityTime();
setInterval(defaultCityTime, 1000);
let citiesSelectElement = document.querySelector("#add-city");
citiesSelectElement.addEventListener("change", updateCity);
clockCurrent();
setInterval(clockCurrent, 1000);
