const GEONAMES_BASE_URL = "http://api.geonames.org/searchJSON";
const WEATHERBIT_BASE_URL_CURRENT = "http://api.weatherbit.io/v2.0/current";
const WEATHERBIT_BASE_URL_FORECAST =
  "https://api.weatherbit.io/v2.0/forecast/daily";
const PIXA_BAY_BASE_URL = "https://pixabay.com/api/";
const callApiGeonames = (place, key) => {
  const URL_GEONAMES = encodeURI(
    `${GEONAMES_BASE_URL}?username=${key}&q=${place}&maxRows=1&isNameRequired=false`
  );

  return fetch(URL_GEONAMES);
};
const callApiPixaBay = (place, key) => {
  const URL_PIXA_BAY = encodeURI(
    `${PIXA_BAY_BASE_URL}?key=${key}&q=${place}&per_page=4`
  );
  return fetch(URL_PIXA_BAY);
};
const callApiWeatherbitCurrent = (lat, lng, key) => {
  const URL_WEATHERBIT_CURRENT = `${WEATHERBIT_BASE_URL_CURRENT}?key=${key}&lat=${lat}&lon=${lng}`;
  return fetch(URL_WEATHERBIT_CURRENT);
};
const callApiWeatherbitForecast = (lat, lng, key) => {
  const URL_WEATHERBIT_FORECAST = `${WEATHERBIT_BASE_URL_FORECAST}?key=${key}&lat=${lat}&lon=${lng}`;
  return fetch(URL_WEATHERBIT_FORECAST);
};
export {
  callApiGeonames,
  callApiWeatherbitCurrent,
  callApiWeatherbitForecast,
  callApiPixaBay,
};
