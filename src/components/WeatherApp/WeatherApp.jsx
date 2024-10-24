import { useState, useEffect } from "react"
import axios from "axios"


const WeatherApp = () => {
    const [city, setCity] = useState('')
    const [weatherData, setWeatherData] = useState(null)
    const [error, setError] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeather(city)
    }

    useEffect(() => {
        if (city) {
            fetchWeather(city);
        }
     }, [city])

     const fetchWeather = async (city) => {
        const apiKey = 'b3a4806c21352543f3dff29c5affe4e3'
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

        try {
            const response = await axios.get(url);
            setWeatherData(response.data);
            setError(null)

            localStorage.setItem('lastCity', city)
            localStorage.setItem('weatherData', JSON.stringify(response.data))

        } catch (error) {
            setError('Error fetching weather data. Please check the city name')
            console.error('Error fetching weather data:', error)
        }
    };

        useEffect(() => {
            const savedCity = localStorage.getItem('lastCity')
            const savedWeatherData = localStorage.getItem('weatherData')

            if(savedCity && savedWeatherData) {
                setCity(savedCity);
                setWeatherData(JSON.parse(savedWeatherData));
            }
        }, []);


    return (
        <div>
            <h1>Weather App</h1>
            <form onSubmit={handleSubmit}>
                <input style={{ padding: '10px', borderRadius: '10px' }} type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city"/>
                <button style={{ marginLeft: '10px' } } type="submit">Search</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {weatherData && (
                <div>
                    <h2>Weather in {weatherData.name}</h2>
                    <p>Temperature: {weatherData.main.temp} C</p>
                    <p>Weather: {weatherData.weather[0].description}</p>
                    <p>Humidity: {weatherData.main.humidity} %</p>
                    <p>Wind Speed: {weatherData.wind.speed}</p>
                </div>
            )}

        </div>
    )
}

export default WeatherApp