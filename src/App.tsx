import React, { useCallback, useEffect, useState } from 'react';

import { toast, ToastContainer } from 'react-toastify';

import Forecast from './components/Forecast';
import Inputs from './components/Inputs';
import Map from './components/Map';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import TimeAndLocaTion from './components/TimeAndLocaTion'
import TopButtons from './components/TopButtons';

import getFormattedWeatherData from './services/weatherServices';

import { IWeatherData } from '../typing';

export interface IQuery {
    q?: string;
    lat?: number;
    lon?: number;
}

function App() {
    const [query, setQuery] = useState<IQuery>({ q: 'ho chi minh' });
    const [units, setUnit] = useState<string>('metric');
    const [weather, setWeather] = useState<IWeatherData | null | undefined>(null);
    // Set Temperature
    let typeTemp = units === 'metric' ? 'C' : 'F';
    const formatToast = (value: string) => {
        const listValue = value.split(' ');
        return listValue.reduce((acc, value) => {
            acc += value[0].toUpperCase() + value.substring(1) + ' ';
            return acc;
        }, '');
    };
    // Call Api
    useEffect(() => {
        const fetchWeather = async () => {
            const message = query.q ? formatToast(query.q) : 'current location.';
            toast.info('Fetching weather for ' + message);
            const data = await getFormattedWeatherData({ ...query, units });
            toast.success(`Successfully fetched weather for ${data?.name}, ${data?.country}.`);
            if (data !== null) {
                setWeather(data);
            }
        };
        fetchWeather();
    }, [query, units]);
    // Set Background
    const formatBackground = useCallback(() => {
        const threshold = units === 'metric' ? 20 : 60;

        if (!weather) return 'from-cyan-700 to-blue-700';
        if (weather.temp <= threshold) {
            return 'from-cyan-700 to-blue-700';
        }

        return 'from-yellow-700 to-orange-700';
    }, [weather, units]);
    return (
        <div
            className={`flex flex-col lg:flex-row w-full h-screen lg:justify-between sm:items-center lg:items-start overflow-x-hidden overflow-y-scroll lg:overflow-hidden mx-auto  px-5 bg-gradient-to-br from-cyan-700 to-blue-700 shadow-xl shadow-gray-400 ${formatBackground()} `}
        >
            <div className="w-full lg:w-5/12 sm:w-10/12 flex flex-col justify-center items-center">
                <TopButtons setQuery={setQuery} weather={weather} />
                {/* Search City Or Country */}
                <Inputs setUnit={setUnit} setQuery={setQuery} setWeather={setWeather} />
                {weather && (
                    <>
                        <TimeAndLocaTion weather={weather} />
                    </>
                )}
                <div
                    style={{
                        opacity: weather ? 1 : 0,
                    }}
                >
                    <Map
                        typeTemp={typeTemp}
                        countryId={weather ? weather.country.toLowerCase() : 'vn'}
                        handleSearch={setQuery}
                    />
                </div>
            </div>
            <div className="lg:w-7/12  sm:w-10/12">
                {weather && (
                    <div className="lg:w-full  sm:w-10/12">
                        <TemperatureAndDetails typeTemp={typeTemp} weather={weather || {}} />
                        <Forecast
                            typeTemp={typeTemp}
                            items={weather.hourly}
                            title={'hourly forecast'}
                        />
                        <Forecast
                            typeTemp={typeTemp}
                            items={weather.daily}
                            title={'daily forecast'}
                        />
                    </div>
                )}
            </div>
            <ToastContainer
                autoClose={2800}
                theme="colored"
                // toastClassName="lg:w-60 w-28"
                newestOnTop={true}
            />
        </div>
    );
}

export default App;
