import React from 'react';
import { iconUrlFromCode } from '../services/weatherServices';

function Forecast({ title, items, typeTemp }) {
    return (
        <div>
            <div className="flex items-center justify-start mt-6 ">
                <p className="text-white font-medium uppercase">{title}</p>
            </div>
            <hr className="my-2"></hr>
            <div className="flex flex-row items-center justify-between text-whiteT">
                {items.map((item, index) => (
                    <div key={index} className="flex flex-col items-center justify-center">
                        <p className="font-light text-sm">{item.title}</p>
                        <img src={iconUrlFromCode(item.icon)} alt="" className="w-12 my-1" />
                        <p className="font-medium">{`${item.temp.toFixed()}°${typeTemp}`}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Forecast;
