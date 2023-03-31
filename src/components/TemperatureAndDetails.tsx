import React from 'react';
import CountUp from 'react-countup';
// import { UilTemperature, UilTear, UilWind, UilSun, UilSunset } from '@iconscout/react-unicons';

import { TbTemperature } from 'react-icons/tb';
import { MdOutlineWaterDrop } from 'react-icons/md';
import { BiWind } from 'react-icons/bi';
import { FiSun, FiSunset } from 'react-icons/fi';

import { formatToLocalTime, iconUrlFromCode } from '../services/weatherServices';
import { IWeatherData } from '../../typing';

interface IProps {
    weather: IWeatherData;
    typeTemp: string;
}

function TemperatureAndDetails({
    weather: {
        details,
        icon,
        temp_min,
        temp_max,
        temp,
        sunrise,
        sunset,
        speed,
        humidity,
        feels_like,
        timezone,
    },
    typeTemp,
}: IProps) {
    return (
        <div className="w-full">
            <div className={`flex items-center justify-center    text-xl  font-light`}>
                <p
                    className={`${
                        temp < 20 ? 'text-cyan-300' : 'text-yellow-100'
                    } text-center w-3/12`}
                >
                    {details}
                </p>
            </div>
            <div className="flex flex-row items-center justify-between text-white">
                <img src={iconUrlFromCode(icon)} alt="" className="lg:w-32 w-3/12" />
                <p className=" lg:text-5xl text-4xl text-center w-3/12">
                    <CountUp end={temp} separator=" " duration={1.5} />
                    {`°${typeTemp}`}
                </p>
                <div className="flex flex-col items-start space-y-2">
                    <div className="flex font-light text-sm items-center">
                        <TbTemperature size={18} className="mr-1" />
                        Real feel:
                        <span className="font-medium ml-1">
                            <CountUp end={feels_like} separator=" " duration={1.5} />
                            {`°${typeTemp}`}
                        </span>
                    </div>

                    <div className="flex font-light text-sm items-center">
                        <MdOutlineWaterDrop size={18} className="mr-1" />
                        Humidity:
                        <span className="font-medium ml-1">
                            <CountUp end={humidity} separator=" " duration={1.5} />
                            {`%`}
                        </span>
                    </div>
                    <div className="flex font-light text-sm items-center">
                        <BiWind size={18} className="mr-1" />
                        Wind Speed:
                        <span className="font-medium ml-1">
                            <CountUp end={speed} separator=" " duration={1.5} />
                            {`m/s`}
                        </span>
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-row flex-wrap lg:flex-nowrap items-center justify-between space-y-2 text-white text-sm py-3">
                <div className="w-6/12 lg:w-3/12 flex flex-row items-center justify-center mt-2">
                    <FiSun  />
                    <p className="font-light ml-2">
                        Rise:{' '}
                        <span className="font-medium">
                            {formatToLocalTime(sunrise, timezone, 'hh:mm a')}
                        </span>
                    </p>
                </div>
                <p className=" font-light hidden lg:inline">|</p>

                <div className="w-6/12 lg:w-3/12 flex flex-row justify-center items-center">
                    <FiSunset />
                    <p className="font-light ml-2">
                        Set:{' '}
                        <span className="font-medium">
                            {formatToLocalTime(sunset, timezone, 'hh:mm a')}
                        </span>
                    </p>
                </div>
                <p className=" font-light  hidden lg:inline">|</p>

                <div className="w-6/12 lg:w-3/12 flex  flex-row items-center justify-center">
                    <FiSun />
                    <p className="font-light ml-2">
                        Hide:{' '}
                        <span className="font-medium">
                            <CountUp end={temp_max} separator=" " duration={1.5} />
                            {`°${typeTemp}`}
                        </span>
                    </p>
                </div>
                <p className="font-light  hidden lg:inline">|</p>

                <div className="w-6/12 lg:w-3/12 flex flex-row items-center justify-center">
                    <FiSun />
                    <p className="font-light ml-2">
                        Low:{' '}
                        <span className="font-medium">
                            <CountUp end={temp_min} separator=" " duration={1.5} />
                            {`°${typeTemp}`}
                        </span>
                    </p>
                    <p className="font-light"></p>
                </div>
            </div>
        </div>
    );
}

export default TemperatureAndDetails;
