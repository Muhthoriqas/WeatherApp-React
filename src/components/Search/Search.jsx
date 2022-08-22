import React, { useState } from "react";
import Header from "../Header/Header";
import "./searchStyles.scss";
// import "bootstrap/dist/css/bootstrap.css";
// import Spinner from "react-bootstrap/Spinner";
const api = {
  key: "4f53d51627db8d9c8df1e2a38f700478",
  base: "https://api.openweathermap.org/data/2.5/",
};

function Search() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  // const [loading, setLoading] = useState(false);
  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          if (result.cod === "404") {
            alert("City Not Found");
          }
          setWeather(result);
          setQuery("");
          // console.log(result);
        });
      // setLoading(true);
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp < 16
            ? "app cold"
            : "app"
          : "app cold"
      }
    >
      <main>
        <Header />
        <div
          className="container
        "
        >
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="Enter Location Here..."
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </div>
          <br />
        </div>

        {typeof weather.main != "undefined" ? (
          // {loading ? :}
          <div className="container-weather">
            <div className="weather-info">
              <div className="location-box">
                <div className="location">
                  {weather.name}, {weather.sys.country}
                </div>
                <div className="date">{dateBuilder(new Date())}</div>
                <div className="temp">{Math.round(weather.main.temp)}°c </div>
              </div>

              <div className="weather-box">
                <div className="info">
                  <img src={require("./icons/icons8-wind-100.png")} alt="" />
                  <span>
                    {weather.wind.speed}
                    <span className="text"> Wind</span>
                  </span>
                </div>

                <div className="info">
                  <img src={require("./icons/icons8-sun-100.png")} alt="" />
                  <span>
                    {weather.weather[0].main}
                    <span className="text">Weather </span>
                  </span>
                </div>

                <div className="info">
                  <img
                    src={require("./icons/icons8-temperature-outside-100.png")}
                    alt=""
                  />
                  <span>
                    {weather.main.temp_max}°c{" "}
                    <span className="text">Temp Max</span>
                  </span>
                </div>
                <div className="info" name="wind">
                  <img
                    src={require("./icons/icons8-freezing-100.png")}
                    alt=""
                  />
                  <span>
                    {weather.main.temp_min}°c
                    <span className="text">Temp Min</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default Search;
