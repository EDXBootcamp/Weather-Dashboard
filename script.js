// Ensure the DOM is ready before executing the code
$(document).ready(function () {
    // Your OpenWeatherMap API key
    const apiKey = 'tes';
  
    // Event listener for the form submission
    $('#search-form').submit(function (event) {
      event.preventDefault();
  
      // Get the user input city name
      const cityName = $('#search-input').val().trim();
  
      if (cityName !== '') {
        // Call the function to fetch weather data
        getWeatherData(cityName);
        // Add the searched city to the search history
        addToSearchHistory(cityName);
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
    
      const weatherIconClass = getWeatherIconClass(weatherData.list[0].weather[0].id);
      // Update the UI with current weather information
      $('#today').html(`
        <h2>${city} (${dayjs().format('M/D/YYYY')}) <i class="${weatherIconClass}"></i></h2>
        <p>Temperature: ${currentWeather.temp} °F</p>
        <p>Humidity: ${currentWeather.humidity}%</p>
        <p>Wind Speed: ${weatherData.list[0].wind.speed} MPH</p>
      `);
  
      // Update the UI with the 5-day forecast
      $('#forecast').html('');
      forecastData.forEach(function (forecast) {
        const forecastIconClass = getWeatherIconClass(forecast.weather[0].id);
        $('#forecast').append(`
          <div class="col-md">
            <div class="card forecast-5">
              <div class="card-body">
                <h5 class="card-title">${dayjs(forecast.dt_txt).format('M/D/YYYY')}</h5>
                <div class="text-white"><i class="${forecastIconClass}"></i></div>
                <p class="card-text">Temperature: ${forecast.main.temp} °F</p>
                <p class="card-text">Humidity: ${forecast.main.humidity}%</p>
              </div>
            </div>
          </div>
        `);
      });
    }

    // Function to get wether icon
    function getWeatherIconClass(weatherCode) {
        // Add more mappings as needed
        switch (weatherCode) {
            case 500: // Light rain
                return 'fa-solid fa-cloud-sun-rain';
            case 501: // Moderate rain
                return 'fa-solid fa-cloud-showers-water';
            case 502: // Heavy rain
                return 'fa-solid fa-cloud-showers-water';
            case 503: // Very heavy rain
                return 'fa-solid fa-cloud-rain';
            case 504: // Extreme rain
                return 'fa-solid fa-cloud-showers-heavy';
            case 511: // Freezing rain
                return 'fa-solid fa-cloud';
            case 800: // Clear sky
                return 'fa-solid fa-sun';
            case 801: // Few clouds
                return 'fa-solid fa-cloud-sun';
            case 802: // Scattered clouds
                return 'fa-solid fa-cloud-sun';
            case 803: // Broken clouds
                return 'fa-brands fa-soundcloud';
            case 804: // Overcast clouds
                return 'fa-solid fa-cloud-bolt';
            default:
                return 'fa-solid fa-question-mark-circle';
        }
    }

    // Function to add the searched city to the search history and localStorage
    function addToSearchHistory(cityName) {
        const historyItem = `<a href="#" class="list-group-item">${cityName}</a>`;
        $('#history').prepend(historyItem);

        // Get the existing search history from localStorage
        const existingHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

        // Add the new city to the history
        existingHistory.unshift(cityName);

        // Save the updated history back to localStorage
        localStorage.setItem('searchHistory', JSON.stringify(existingHistory));
    }

    // Function to display the search history from localStorage
    function displaySearchHistory() {
        const existingHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

        existingHistory.forEach(function (cityName) {
            const historyItem = `<a href="#" class="list-group-item">${cityName}</a>`;
            $('#history').append(historyItem);
        });
    }

    // Display the search history on page load
    displaySearchHistory();
  });


  
  