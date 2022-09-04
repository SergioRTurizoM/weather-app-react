import axios from "axios";
import { React, useEffect, useState, Component } from "react";


const Geolocation = () => {
  const [position, setPosition] = useState(0);
  const [information, setInformation] = useState(0);
  const [isKelvin, setIsKelvin] = useState(true);


  let v01d = "https://dl.dropbox.com/s/6qeja6df128wj6u/01d.mp4?dl=0"
  let v01n = "https://dl.dropbox.com/s/ctyjjsii4ysf8or/01n.mp4?dl=0"
  let v02d = "https://dl.dropbox.com/s/aw4nzo9xj4rndl1/02d.mp4?dl=0"
  let v02n = "https://dl.dropbox.com/s/unkkxiv1sx9yb98/02n.mp4?dl=0"
  let v03d = "https://dl.dropbox.com/s/4ri569zbh6pn5ph/03d.mp4?dl=0"
  let v03n = "https://dl.dropbox.com/s/0rj7v1t6to8cnnh/03n.mp4?dl=0"
  let v04d = "https://dl.dropbox.com/s/66ganuxxpqmzuk8/04d.mp4?dl=0"
  let v04n = "https://dl.dropbox.com/s/cz2r797zio98nwi/04n.mp4?dl=0"
  let v09d = "https://dl.dropbox.com/s/gsfqdvhjkmx6a6v/09d.mp4?dl=0"
  let v09n = "https://dl.dropbox.com/s/i6qpl2yx6vy45sa/09n.mp4?dl=0"
  let v10d = "https://dl.dropbox.com/s/33e44j1rfeaz0w1/10d.mp4?dl=0"
  let v10n = "https://dl.dropbox.com/s/ah2b4ky49kivstt/10n.mp4?dl=0"
  let v11d = "https://dl.dropbox.com/s/fnvtpjkqqofpsel/11d.mp4?dl=0"
  let v11n = "https://dl.dropbox.com/s/9pi58t9tcqrf8hj/11n.mp4?dl=0"
  let v13d = "https://dl.dropbox.com/s/phh9mp3o0088zbb/13d.mp4?dl=0"
  let v13n = "https://dl.dropbox.com/s/3g2oooes1n9ks43/13n.mp4?dl=0"
  let v50d = "https://dl.dropbox.com/s/mutah1mkyfb3zr5/50d.mp4?dl=0"
  let v50n = "https://dl.dropbox.com/s/ncz5x2nqwmwpm31/50n.mp4?dl=0"


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
      console.log(`Latitude: ${latitude}`);
      console.log(`Longitude: ${longitude}`);
      console.log(`More or less: ${accuracy} meters`);
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
        } catch (err) {
          console.log(err);
          // if(err){
          //     // console.log(err);
          //   location.reload()
          // }
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

  console.log(information?.weather?.[0]?.icon);

  // document.body.innerHTML = `
  //     <video autoplay="true" src=./src/assets/videos/04d.mp4 loop="true"></video>`

  return (
    <div>
      <video autoPlay={true} loop={true} src={v04n}>
        
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
    </div>
  );
};

export default Geolocation;
