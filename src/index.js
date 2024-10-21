import "../leatfet/leaflet.css";
import "babel-polyfill";
import { validateIp, addTileLayer, getAddress, addOffset } from "./helpers";
import icon from "../images/icon-location.svg";

const ipInput = document.querySelector(".search-bar__input");
const btn = document.querySelector(".search-bar__btn");

const ipInfo = document.querySelector("#ip");
const locationInfo = document.querySelector("#location");
const timezoneInfo = document.querySelector("#timezone");
const ispInfo = document.querySelector("#isp");

const markerIcon = L.icon({
  iconUrl: icon,
  iconSize: [30, 40],
});

const mapArea = document.querySelector(".map");
const map = L.map(mapArea, {
  center: [51.505, -0.09],
  zoom: 13,
  zoomControl: false,
});
addTileLayer(map);
L.marker([51.505, -0.09], { icon: markerIcon }).addTo(map);

function setInfo(mapData) {
  const { lat, lng, country, region, timezone } = mapData.location;
  console.log(mapData);
  ipInfo.innerText = mapData.ip;
  locationInfo.innerText = country + " " + region;
  timezoneInfo.innerText = timezone;
  ispInfo.innerText = mapData.isp;

  map.setView([lat, lng]);
  L.marker([lat, lng], { icon: markerIcon }).addTo(map);

  if (matchMedia("(max-width: 1023px)").matches) {
    addOffset(map);
  }
}

function getData() {
  if (validateIp(ipInput.value)) {
    getAddress(ipInput.value).then(setInfo);
  }
}
function handleKey(e) {
  if (e.key === "Enter") {
    getData();
  }
}
document.addEventListener("DOMContentLoaded", () => {
  getAddress("20.110.23.11").then(setInfo);
});
btn.addEventListener("click", getData);
ipInput.addEventListener("keydown", handleKey);
