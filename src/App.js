import { useCallback, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import './App.css';
import Forecast from './components/Forecast';
import Inputs from './components/Inputs';
import Map from './components/Map';
import TemperatureAndDetails from './components/TempreatureAndDetails';
import TimeAndLocaTion from './components/TimeAndLocaTion';
import TopButtons from './components/TopButtons';
import getFormattedWeatherData from './services/weatherServices';
function App() {
    const [query, setQuery] = useState({ q: 'ha noi' });
    const [units, setUnit] = useState('metric');
    const [weather, setWeather] = useState(null);
    let colorMap = [
        [0.2, '#fdba74'],
        [0.4, '#fb923c'],
        [0.6, '#f97316'],
        [0.8, '#ea580c'],
        [1, '#c2410c'],
    ];
    let typeTemp = units === 'metric' ? 'C' : 'F';
    const formatToast = (value) => {
        const listValue = value.split(' ');
        return listValue.reduce((acc, value) => {
            acc += value[0].toUpperCase() + value.substring(1) + ' ';
            return acc;
        }, '');
    };
    useEffect(() => {
        const fetchWeather = async () => {
            const message = query.q ? formatToast(query.q) : 'current location.';

            toast.info('Fetching weather for ' + message);
            const data = await getFormattedWeatherData({ ...query, units });
            toast.success(`Successfully fetched weather for ${data.name}, ${data.country}.`);
            setWeather(data);
        };
        fetchWeather();
    }, [query, units]);

    const threshold = units === 'metric' ? 20 : 60;

    const formatBackground = useCallback(() => {
        if (!weather) return 'from-cyan-700 to-blue-700';
        if (weather.temp <= threshold) {
            colorMap = [
                [0.2, '#93c5fd'],
                [0.4, '#60a5fa'],
                [0.6, '#3b82f6'],
                [0.8, '#2563eb'],
                [1, '#1d4ed8'],
            ];
            return 'from-cyan-700 to-blue-700';
        }

        return 'from-yellow-700 to-orange-700';
    }, [weather, units, colorMap]);
    return (
        <div
            className={`mx-auto flex flex-row w-full h-screen  justify-between px-10 bg-gradient-to-br from-cyan-700 to-blue-700 shadow-xl shadow-gray-400 ${formatBackground()}`}
        >
            <div className="w-5/12 flex flex-col justify-start items-center">
                <TopButtons setQuery={setQuery} />
                <Inputs setUnit={setUnit} setQuery={setQuery} />
                {weather && (
                    <>
                        <TimeAndLocaTion weather={weather} />
                        <Map
                            threshold={weather.temp <= threshold}
                            typeTemp={typeTemp}
                            colorMap={colorMap}
                            countryId={weather.country.toLowerCase()}
                        />
                    </>
                )}
            </div>
            <div className="w-6/12">
                {weather && (
                    <>
                        <TemperatureAndDetails typeTemp={typeTemp} weather={weather} />
                        <Forecast typeTemp={typeTemp} items={weather.hourly} title={'hourly forecast'} />
                        <Forecast typeTemp={typeTemp} items={weather.daily} title={'daily forecast'} />
                    </>
                )}
            </div>
            <ToastContainer autoClose={2800} theme="colored" newestOnTop={true} />
        </div>
    );
}

export default App;
