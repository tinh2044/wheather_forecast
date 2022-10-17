import React from 'react';
import { formatToLocalTime } from '../services/weatherServices';

function TimeAndLocaTion({ weather: { dt, timezone, name, country } }) {
    return (
        <div className="flex flex-col items-center justify-start w-full">
            <div className="flex flex-row items-center justify-center w-full my-2 lg:mr-10 mr-0">
                <p className="text-white lg:text-xl font-extralight text-lg">
                    {formatToLocalTime(dt, timezone)}
                </p>
            </div>
            <div className="flex flex-row items-center justify-center my-2 lg:mr-20 mr-0 w-full">
                <p className="text-white text-3xl font-medium  w-full text-center mb-3">
                    {name}, {country}
                </p>
            </div>
        </div>
    );
}

export default TimeAndLocaTion;
