export interface ICountry {
    id: number;
    name: string;
    country_id: number;
    country_code: string;
    country_name: string;
    state_code: string;
    type: null;
    latitude: string;
    longitude: string;
}

export interface ICIty {
    id: number;
    name: string;
    iso3: string;
    iso2: string;
    numeric_code: string;
    phone_code: string;
    capital: string;
    currency: string;
    currency_name: string;
    currency_symbol: string;
    tld: string;
    native: string;
    region: string;
    subregion: string;
    timezones: [
        {
            zoneName: string;
            gmtOffset: 16200;
            gmtOffsetName: string;
            abbreviation: string;
            tzName: string;
        },
    ];
}

export interface ICoord {
    lon: number;
    lat: number;
}

export interface IWeather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface ITemp {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}

export interface IWind {
    speed: number;
    deg: number;
    gust: number;
}

export interface ISys {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
}

export interface IHourly {
    dt: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: IWeather[];
    pop: number;
}

export interface IDaily {
    dt: number;
    sunrise: number;
    sunset: number;
    moonrise: number;
    moonset: number;
    moon_phase: number;
    temp: {
        day: number;
        min: number;
        max: number;
        night: number;
        eve: number;
        morn: number;
    };
    feels_like: {
        day: number;
        night: number;
        eve: number;
        morn: number;
    };
    pressure: number;
    humidity: number;
    dew_point: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: IWeather[];
    clouds: number;
    pop: number;
    rain?: number;
    snow?: number;
    uvi: number;
}

export interface IResDetailWeather {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    hourly: IHourly[];
    daily: IDaily[];
}

export interface IResponse {
    coord: ICoord;
    weather: IWeather[];
    base: string;
    main: ITemp;
    visibility: number;
    wind: IWind;
    clouds: {
        all: 0;
    };
    dt: number;
    sys: ISys;
    timezone: string;
    id: number;
    name: string;
    cod: string;
    lat: number;
    lon: number;
    timezone_offset: number;
    hourly: IHourly[];
    daily: IDaily[];
}

export interface IFormatDailyHourly {
    title: string;
    temp: number;
    icon: string;
}

export interface IWeatherData {
    lat: number;
    lon: number;
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    name: string;
    dt: number;
    country: string;
    sunrise: number;
    sunset: number;
    weather: IWeather[];
    speed: number;
    details: string;
    icon: string;
    timezone?: string;
    daily?: IFormatDailyHourly[];
    hourly?: IFormatDailyHourly[];
}
