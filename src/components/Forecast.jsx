import React, { useEffect, useRef } from 'react';
import CountUp from 'react-countup';

import { iconUrlFromCode } from '../services/weatherServices';

function Forecast({ title, items, typeTemp }) {
    const wrapperRef = useRef();
    useEffect(() => {
        wrapperRef.current.scrollLeft = 0;
    }, [items]);
    return (
        <div>
            <div className="flex items-center justify-start mt-6 ">
                <p className="text-white font-medium uppercase">{title}</p>
            </div>
            <hr className="my-2"></hr>
            <div
                className="flex flex-row items-center justify-between text-white wrapper overflow-x-scroll"
                ref={wrapperRef}
            >
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center justify-center item flex-shrink-0"
                    >
                        <p className="font-light text-sm">{item.title}</p>
                        <img src={iconUrlFromCode(item.icon)} alt="" className="w-12 my-1" />
                        <p className="font-medium">
                            <CountUp end={item.temp.toFixed()} separator=" " duration={1.5} />
                            {`°${typeTemp}`}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Forecast;
