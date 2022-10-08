import React from 'react';
import { UilTemperature, UilTear, UilWind, UilSun, UilSunset } from '@iconscout/react-unicons';
import { formatToLocalTime, iconUrlFromCode } from '../services/weatherServices';
function TemperatureAndDetails({
    weather: { details, icon, temp_min, temp_max, temp, sunrise, sunset, speed, humidity, feels_like, timezone },
    typeTemp,
}) {
    return (
        <div>
            <div className={`flex items-center justify-center  my-3  text-xl  font-light`}>
                <p className={`${temp < 20 ? 'text-cyan-300' : 'text-yellow-100'}`}>{details}</p>
            </div>
            <div className="flex flex-row items-center justify-between text-white">
                <img src={iconUrlFromCode(icon)} alt="" className="w-32" />
                <p className="text-5xl">{`${temp.toFixed()}°${typeTemp}`}</p>
                <div className="flex flex-col items-start space-y-2">
                    <div className="flex font-light text-sm items-center">
                        <UilTemperature size={18} className="mr-1" />
                        Real feel:
                        <span className="font-medium ml-1">{`${feels_like.toFixed()}°${typeTemp}`}</span>
                    </div>

                    <div className="flex font-light text-sm items-center">
                        <UilTear size={18} className="mr-1" />
                        Humidity:
                        <span className="font-medium ml-1">{`${humidity}%`}</span>
                    </div>
                    <div className="flex font-light text-sm items-center">
                        <UilWind size={18} className="mr-1" />
                        Wind Speed:
                        <span className="font-medium ml-1">{`${speed} m/s`}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-row items-center justify-center space-y-2 text-white text-sm py-3">
                <div className="flex flex-row items-center mt-2">
                    <UilSun />
                    <p className="font-light">
                        Rise: <span className="font-medium">{formatToLocalTime(sunrise, timezone, 'hh:mm a')}</span>
                    </p>
                    <p className=" mx-2 font-light">|</p>
                </div>
                <div className="flex flex-row items-center">
                    <UilSunset />
                    <p className="font-light">
                        Set: <span className="font-medium">{formatToLocalTime(sunset, timezone, 'hh:mm a')}</span>
                    </p>
                    <p className=" mx-2 font-light">|</p>
                </div>
                <div className="flex flex-row items-center">
                    <UilSun />
                    <p className="font-light">
                        Hide: <span className="font-medium">{`${temp_max.toFixed()}°`}</span>
                    </p>
                    <p className=" mx-2 font-light">|</p>
                </div>
                <div className="flex flex-row items-center">
                    <UilSun />
                    <p className="font-light">
                        Low: <span className="font-medium">{`${temp_min.toFixed()}°`}</span>
                    </p>
                    <p className="font-light"></p>
                </div>
            </div>
        </div>
    );
}

export default TemperatureAndDetails;
