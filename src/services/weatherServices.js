import { DateTime } from 'luxon';
import { toast } from 'react-toastify';

const API_KEY = 'cf26e7b2c25b5acd18ed5c3e836fb235';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

const getWeatherData = async (infoType, searchParams) => {
    const url = new URL(BASE_URL + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
    let response = await fetch(url);
    let data;
    if (response.ok) {
        data = response.json();
    } else {
        toast.error('Please change city name');
    }

    return data;
};
const formatCurrentWeather = (data) => {
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
};

const formatForecastWeather = (data) => {
    // console.log(data);
    let { timezone, daily, hourly } = data;
    daily = daily.slice(0, daily.length - 1).map((d) => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'ccc'),
            temp: d.temp.day,
            icon: d.weather[0].icon,
        };
    });
    hourly = hourly.map((h) => {
        return {
            title: formatToLocalTime(h.dt, timezone, 'hh:mm a'),
            temp: h.temp,
            icon: h.weather[0].icon,
        };
    });

    return { timezone, daily, hourly };
};

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrentWeather);

    const { lat, lon } = formattedCurrentWeather;
    const formattedForecastWeather = await getWeatherData('onecall', {
        lat,
        lon,
        exclude: 'current,minutely,alerts',
        units: searchParams.units,
    }).then(formatForecastWeather);
    return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => {
    return DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
};

const iconUrlFromCode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;
export { formatToLocalTime, iconUrlFromCode };
