import axios from "axios";
import { React, useEffect, useState, Component } from "react";
import Swal from "sweetalert2";


const Geolocation = () => {
  const [position, setPosition] = useState(0);
  const [information, setInformation] = useState(0);
  const [isKelvin, setIsKelvin] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  console.log(information);

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 3000,
      maximumAge: 0,
    };

    const success = (pos) => {
      const crd = pos.coords;
      const latitude = crd.latitude;
      const longitude = crd.longitude;
      const accuracy = crd.accuracy;
      // console.log(`Latitude: ${latitude}`);
      // console.log(`Longitude: ${longitude}`);
      // console.log(`More or less: ${accuracy} meters`);
      setPosition(crd);
      return crd;
    };

    const error = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);

    const lon = position.longitude
    const lat = position.latitude

    // const lon = Number.parseFloat(position.longitude).toFixed(2);
    // const lat = Number.parseFloat(position.latitude).toFixed(2);

    // const lon = -74.05
    // const lat = 4.73
    const API_key = "9ba24ad2e13d98629090000d6f8d755a";
    const urlApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`;
   

    const apiRequest = async()=> {

        try {
          const resp = await axios.get(urlApi)
          setInformation(resp.data)
          setIsLoading(false)

        
        } catch (err) {
          console.log(err);
          if(err){
              console.log(err);
            // location.reload()
          }
        }
    }
    apiRequest();
  }, []);

  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
  options.timeZone = 'UTC'; 
  options.timeZoneName = 'short';
  let now  = today.toLocaleString('en-US', options);
  console.log(now);




  return (
    <div>
      {isLoading ? (
        <>
           <video autoPlay={true} loop={true} muted={true} src="./src/assets/videos/04d.mp4">
           </video>  
        <h1>Loading...</h1>
        </>
      ) : (
      <>
       <video autoPlay={true} loop={true} muted={true} src={`./src/assets/videos/${information?.weather?.[0]?.icon}.mp4`}>
    </video>  
    <div className="Container">
      <div className="infoMain">
      <p>Country: {information?.sys?.country}</p>
      <p>City / Location: {information?.name}</p>  
      <p>{now}</p>
      </div>
      <p className="gradesNumber">{isKelvin? Number.parseFloat(information?.main?.temp - 272.15).toFixed(1) : Number.parseFloat(information?.main?.temp).toFixed(1)}  <span> {isKelvin ? '°C' : '°K'}</span> </p>
      <img src={`http://openweathermap.org/img/wn/${information?.weather?.[0]?.icon}@2x.png`} alt="" className="icon"/>
     
      </div>
      <div className="infoSecondary">
      <p> {information?.weather?.[0]?.main}</p>
      <p>{information?.weather?.[0]?.description}</p>
      <p>Temperature Now: {isKelvin? Number.parseFloat(information?.main?.temp - 272.15).toFixed(1) : Number.parseFloat(information?.main?.temp).toFixed(1)} {isKelvin ? '°C' : '°K'}</p>
      <p>Humidity: {information?.main?.humidity}</p> 
      <button type="" onClick={()=>setIsKelvin(!isKelvin)}> Change to {isKelvin ? 'Kelvin' : 'Celsius' }</button>
    </div>
        
        
        
        
        
        
        
        </>




      )}
     
    </div>
  );
};

export default Geolocation;
