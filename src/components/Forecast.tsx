import React, { useEffect } from 'react';
import CountUp from 'react-countup';

import { iconUrlFromCode } from '../services/weatherServices';
import { IFormatDailyHourly } from '../../typing';

interface IProps {
    title: string;
    items: IFormatDailyHourly[] | undefined;
    typeTemp: string;
}

function Forecast({ title, items, typeTemp }: IProps) {
    // const wrapperRef = useRef < React.LegacyRef<HTMLDivElement>| null>();
    const wrapperRef = React.createRef<HTMLDivElement>();
    useEffect(() => {
        if (wrapperRef.current !== null) {
            wrapperRef.current.scrollLeft = 0;
        }
    }, [items, wrapperRef]);
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
                {items?.map((item: IFormatDailyHourly, index) => (
                    <div
                        key={index}
                        className="flex flex-col w-3/12 lg:w-20 items-center justify-center flex-shrink-0"
                    >
                        <p className="font-light text-sm">{item.title}</p>
                        <img src={iconUrlFromCode(item.icon)} alt="" className="w-12 my-1" />
                        <p className="font-medium">
                            <CountUp end={item.temp} separator=" " duration={1.5} />
                            {`°${typeTemp}`}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Forecast;
