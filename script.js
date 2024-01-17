// Ensure the DOM is ready before executing the code
$(document).ready(function () {
    // Your OpenWeatherMap API key
    const apiKey = 'stop';
  
    // Event listener for the form submission
    $('#search-form').submit(function (event) {
      event.preventDefault();
  
      // Get the user input city name
      const cityName = $('#search-input').val().trim();
  
      if (cityName !== '') {
        // Call the function to fetch weather data
        getWeatherData(cityName);
      }
    });
  
    // Function to fetch weather data from the OpenWeatherMap API
    function getWeatherData(cityName) {
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
  
      $.ajax({
        url: apiUrl,
        method: 'GET',
      }).then(function (response) {
        // Process the API response and update the UI
        displayWeatherData(response);
      });
    }
  
    // Function to display weather data on the UI
    function displayWeatherData(weatherData) {
      // Extract relevant information from the API response
      const city = weatherData.city.name;
      const currentWeather = weatherData.list[0].main;
      const forecastData = weatherData.list.slice(1, 6); // Get the next 5 days forecast
  
      // Update the UI with current weather information
      $('#today').html(`
        <h2>${city} (${dayjs().format('M/D/YYYY')})</h2>
        <p>Temperature: ${currentWeather.temp} °F</p>
        <p>Humidity: ${currentWeather.humidity}%</p>
        <p>Wind Speed: ${weatherData.list[0].wind.speed} MPH</p>
      `);
  
      // Update the UI with the 5-day forecast
      $('#forecast').html('');
      forecastData.forEach(function (forecast) {
        $('#forecast').append(`
          <div class="col-md">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${dayjs(forecast.dt_txt).format('M/D/YYYY')}</h5>
                <p class="card-text">Temperature: ${forecast.main.temp} °F</p>
                <p class="card-text">Humidity: ${forecast.main.humidity}%</p>
              </div>
            </div>
          </div>
        `);
      });
    }
  });
  