const URL_GET_SERVER = "http://localhost:8081/get";
const lodash = require("lodash");
// function when click button find
function handleSubmit(event) {
  event.preventDefault();

  // get input data
  const place =
    document.getElementById("place").value || localStorage.getItem("place");
  const date =
    document.getElementById("date").value || localStorage.getItem("date");
  //validate date
  const period = Client.checkForDate(date);
  if (period >= 0 && period <= 16 && !lodash.isEmpty(place)) {
    fetchData(place, date, period);
  } else {
    notificationInputWrong();
  }
}

// function check local storage
function checkLocalStorage(e) {
  e.preventDefault();
  const place = localStorage.getItem("place");
  const date = localStorage.getItem("date");
  if (place && date) {
    document.getElementById("place").setAttribute("value", place);
    document.getElementById("date").setAttribute("value", date);
    const period = Client.checkForDate(date);
    fetchData(place, date, period);
  }
}
// function update UI
function updateUI(res) {
  const dateInput = document.getElementById("date").value;
  const period = Client.checkForDate(dateInput);
  const result = document.getElementById("result");
  if (period < 7) {
    result.innerHTML = "Current";
  } else {
    result.innerHTML = "Forecast";
  }
  const { arrayImg, arrayWeather } = res;
  //delete content before update
  document.getElementById("main").remove();
  const mainTag = document.createElement("main");
  mainTag.setAttribute("id", "main");
  // loop data to append
  arrayWeather.forEach((weather, index) => {
    const sectionTag = document.createElement("section");
    const imgTag = document.createElement("img");
    imgTag.setAttribute("src", arrayImg[index].webformatURL);
    const pTagDate = document.createElement("p");
    pTagDate.innerHTML = `<b>Date: <b>${weather.datetime}`;
    const pTagDes = document.createElement("p");
    pTagDes.innerHTML = `<b>Description: <b>${weather.description}`;
    const pTagTemp = document.createElement("p");
    pTagTemp.innerHTML = `<b>Temp: <b>${weather.temp} &deg;C`;
    sectionTag.appendChild(imgTag);
    sectionTag.appendChild(pTagDate);
    sectionTag.appendChild(pTagDes);
    sectionTag.appendChild(pTagTemp);
    mainTag.appendChild(sectionTag);
  });
  const footer = document.getElementById("footer");
  const container = document.getElementById("container");
  container.insertBefore(mainTag, footer);
  // container.appendChild(mainTag);
}
function resetUI() {
  alert("No data place");
  document.getElementById("main").remove();
  document.getElementById("result").innerHTML = null;
  localStorage.clear();
}

// function data input pass
async function fetchData(place, date, period) {
  localStorage.setItem("place", place);
  localStorage.setItem("date", date);
  const arrayApiRes = await fetch(URL_GET_SERVER);
  const arrayApi = await arrayApiRes.json();
  const { GEONAMES_API_KEY, WEATHERBIT_API_KEY, PIXA_BAY_API_KEY } = arrayApi;
  //fetch ApiGeonames and ApiPixaBay same time
  Promise.all([
    Client.callApiGeonames(place, GEONAMES_API_KEY),
    Client.callApiPixaBay(place, PIXA_BAY_API_KEY),
  ])
    .then(async (res) => {
      //convert response
      const [resPlace, resImage] = res;
      const resPlaceJson = await resPlace.json();
      const resImageJson = await resImage.json();

      //get position
      const lat = resPlaceJson.geonames[0].lat;
      const lng = resPlaceJson.geonames[0].lng;
      //fetch api weather
      const resWeather = await (period < 7
        ? Client.callApiWeatherbitCurrent(lat, lng, WEATHERBIT_API_KEY)
        : Client.callApiWeatherbitForecast(lat, lng, WEATHERBIT_API_KEY));
      // convert data
      const resWeatherJSON = await resWeather.json();
      let arrayImg = [{}];
      let arrayWeather = [{}];
      if (period >= 7) {
        arrayImg = lodash.map(resImageJson.hits, (webformatURL) => {
          return webformatURL;
        });
        arrayWeather = lodash.map(
          lodash.filter(resWeatherJSON.data, (_, index) => {
            const periodInt = parseInt(period);
            return (
              (index >= periodInt) & (index <= periodInt + 3) ||
              (periodInt > 12 && index >= 12)
            );
          }),
          ({ temp, weather, datetime }) => {
            return { temp, description: weather.description, datetime };
          }
        );
      } else {
        arrayImg = lodash.map(
          lodash.filter(resImageJson.hits, (_, index) => index === 0),
          (webformatURL) => {
            return webformatURL;
          }
        );
        arrayWeather = lodash.map(
          resWeatherJSON.data,
          ({ temp, weather, ob_time }) => {
            return {
              temp,
              description: weather.description,
              datetime: new Date().toDateString(),
            };
          }
        );
      }

      return { arrayImg, arrayWeather };
    })
    .then(updateUI, resetUI);
}

// function when data input wrong
function notificationInputWrong() {
  alert(
    "Date input must more than now and less than 16 day from now OR no data place"
  );
  localStorage.clear();
}
export { handleSubmit, checkLocalStorage };
