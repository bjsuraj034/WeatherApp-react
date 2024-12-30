import React, { useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
import { TbSunHigh } from "react-icons/tb";
import { BsCloudSun } from "react-icons/bs";
import { MdOutlineWbCloudy } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import { BsWind } from "react-icons/bs";
import { FaCloudShowersHeavy } from "react-icons/fa6";
import { BsFillCloudLightningRainFill } from "react-icons/bs";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('Kathmandu');

  // Icon mapping
  const weatherIcons = {
    "01d": <TbSunHigh />, // clear sky (day)
    "01n": <TbSunHigh />, // clear sky (night)
    "02d": <BsCloudSun />, // few clouds (day)
    "02n": <BsCloudSun />, // few clouds (night)
    "03d": <MdOutlineWbCloudy />, // scattered clouds
    "03n": <MdOutlineWbCloudy />, // scattered clouds (night)
    "04d": <MdOutlineWbCloudy />, // overcast clouds
    "04n": <MdOutlineWbCloudy />, // overcast clouds (night)
    "09dn":<FaCloudShowersHeavy/>,//shower rain,
    "010dn":<BsFillCloudLightningRainFill/> //raining rain

  };

  const search = async (cityName) => {
    try {
      const apiKey = import.meta.env.VITE_APP_ID;
      if(cityName ==="")
      {
       return alert("Enter the city name")
      }
   
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
      const response = await fetch(url);
      if (!response.ok) {
        return alert('enter the valid city name')

      }
      const data = await response.json();
      console.log(data)

      setWeather({
        icon: data.weather[0]?.icon,  //choose the first value from the wheather array inside it there may be  one or more object  so we only care about the first index 
        //? yedi data.weather[0]? meaning exit garxa vanay look for the icon else sent undefine
        description: data.weather[0]?.description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: data.main.temp,
        location: data.name,
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    
    search(city);
  }, []);

  return (
    <div className="bg-custom-gradient w-108  h-108 max-sm:w-58  max-sm:px-5 max-sm:py-8 px-10 py-10 rounded-lg flex flex-col gap-8">
      <div className="flex gap-2 items-center">
        <input
          className="outline-none rounded-2xl px-4 py-1"
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e)=>{
          if(e.key === "Enter")
          {
            console.log("done")
            search(city)
          }
        }}
        />
        <div
          className="cursor-pointer bg-white rounded-full p-1"
          onClick={() => search(city)}
        >
          <CiSearch className="text-black text-xl " />
        </div>
      </div>

       {weather && (
        <div className="flex   flex-col gap-6 p-4">
          <div className="text-5xl text-white">
            {weatherIcons[weather.icon] || <MdOutlineWbCloudy />}
          </div>
          <div>
            <h1 className="text-white text-2xl">
              {weather.temperature}°C
            </h1>
            <h1 className="text-white text-2xl">{weather.location}</h1>
            <h2 className="text-white text-lg capitalize">
              {weather.description}
            </h2>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        {weather && (
          <>
            <div className="flex gap-2 items-start text-white">
              <WiHumidity className="text-3xl" />
              <div className="leading-tight">
                <h1>{weather.humidity}%</h1>
                <h1>Humidity</h1>
              </div>
            </div>
            <div className="flex gap-2 items-start text-white">
              <BsWind className="text-3xl" />
              <div className="leading-tight">
                <h1>{weather.windSpeed} m/s</h1>
                <h1>Wind Speed</h1>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Weather;
  