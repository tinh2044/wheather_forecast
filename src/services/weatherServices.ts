import { IDaily, IWeatherData, IHourly } from './../../typing';
import { IResponse } from './../../typing';
import { DateTime } from 'luxon';
import { toast } from 'react-toastify';
import axios from 'axios';
/* A constant variable that is used to access the API. */
const API_KEY = 'cf26e7b2c25b5acd18ed5c3e836fb235';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

/* Creating a new instance of axios with the baseURL set to the BASE_URL constant. */
const weather = axios.create({
    baseURL: BASE_URL,
});
const getWeatherData = async (infoType: string, searchParams: any) => {
    const params = {
        ...searchParams,
        appid: API_KEY,
    };
    let response = await weather.get<IResponse>(infoType, { params });

    let data;
    if (response.status === 200) {
        data = response.data;
    } else {
        toast.error('Please change city name or enter by english');
    }
    return data;
};
const formatCurrentWeather = (data: IResponse | undefined) => {
    if (data !== undefined) {
        const {
            coord: { lat, lon },
            main: { temp, feels_like, temp_min, temp_max, humidity },
            name,
            dt,
            sys: { country, sunrise, sunset },
            weather,
            wind: { speed },
        } = data;
        const { main: details, icon } = weather[0];
        return {
            lat,
            lon,
            temp,
            feels_like,
            temp_min,
            temp_max,
            humidity,
            name,
            dt,
            country,
            sunrise,
            sunset,
            weather,
            speed,
            details,
            icon,
        };
    }
};
const formatForecastWeather = (data: IResponse | undefined) => {
    if (data !== undefined) {
        let { timezone, daily, hourly } = data;

        let formatDaily = daily.slice(0, daily.length - 1).map((d: IDaily) => {
            return {
                title: formatToLocalTime(d.dt, timezone, 'ccc'),
                temp: d.temp.day,
                icon: d.weather[0].icon,
            };
        });
        let formatHourly = hourly.map((h: IHourly) => {
            return {
                title: formatToLocalTime(h.dt, timezone, 'hh:mm a'),
                temp: h.temp,
                icon: h.weather[0].icon,
            };
        });
        console.log({ timezone, daily: formatDaily, hourly: formatHourly });
        return { timezone: timezone, daily: formatDaily, hourly: formatHourly };
    }
};

const getFormattedWeatherData = async (searchParams: any): Promise<IWeatherData | undefined> => {
    const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(
        formatCurrentWeather,
    );
    if (formattedCurrentWeather !== undefined) {
        const { lat, lon } = formattedCurrentWeather;
        const formattedForecastWeather = await getWeatherData('onecall', {
            lat,
            lon,
            exclude: 'current,minutely,alerts',
            units: searchParams.units,
        }).then(formatForecastWeather);
        console.log({ ...formattedCurrentWeather, ...formattedForecastWeather });

        return {
            ...formattedCurrentWeather,
            ...formattedForecastWeather,
        };
    }
};

const formatToLocalTime = (
    secs: any,
    zone: any,
    format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a",
) => {
    return DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
};

const iconUrlFromCode = (code: string) => `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;
export { formatToLocalTime, iconUrlFromCode };
