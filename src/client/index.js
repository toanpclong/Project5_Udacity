import { checkForDate } from "./js/dateChecker";
import { handleSubmit, checkLocalStorage } from "./js/formHandler";
import {
  callApiGeonames,
  callApiWeatherbitCurrent,
  callApiWeatherbitForecast,
  callApiPixaBay,
} from "./js/app";

import "./styles/base.scss";
import "./styles/mobile-tablet.scss";

document.addEventListener("DOMContentLoaded", checkLocalStorage);
document.getElementById("button").addEventListener("click", handleSubmit);
export {
  checkForDate,
  handleSubmit,
  checkLocalStorage,
  callApiGeonames,
  callApiWeatherbitCurrent,
  callApiWeatherbitForecast,
  callApiPixaBay,
};
