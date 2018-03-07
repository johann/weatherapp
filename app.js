class App {
  constructor() {
    this.summaryDiv = document.getElementById("current-weather");
    this.addEventListeners();
  }

  addEventListeners() {
    // let formDiv = document.getElementById("location-form");
    // formDiv.children[0]

    let form = document.querySelector("form");
    form.addEventListener("submit", event => {
      event.preventDefault();
      console.log(event.target[0].value);
      let city = event.target[0].value;
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}`)
        .then(res => res.json())
        .then(json => {
          console.log(json.results);
          if (json.results[0]) {
            let location = json.results[0].geometry.location;
            // let lat = location.lat
            // let long = location.long
            let { lat, lng } = location;
            this.fetchWeather(lat, lng);
          } else {
            // handle Error
          }
        });
    });

    /// tagName
    console.dir(form);
  }

  fetchWeather(lat, long) {
    fetch(
      `https://api.darksky.net/forecast/71f1892a6d625cc526c7ff7fec9d6973/${
        lat
      },${long}`
    )
      .then(res => res.json())
      .then(json => this.getWeatherData(json));
  }

  getWeatherData(data) {
    let currentWeather = data.currently;
    console.log(currentWeather);
    // do whatever processing here
    this.displayWeather(currentWeather);
  }

  displayWeather(weather) {
    this.summaryDiv.innerHTML = `<p> ${weather.summary}</p>`;
  }

  /*
  Objective: Fetch weather based on form
    1. We need an event listener on form
    2. How do I get to the form


  */
}
