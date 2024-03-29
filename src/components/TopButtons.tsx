/* eslint-disable no-lone-blocks */
import React, { memo, useEffect, useState } from 'react';
import { IWeatherData } from '../../typing';
import { IQuery } from '../App';
const cities = [
    {
        id: 1,
        title: 'London',
    },
    {
        id: 2,
        title: 'Sydney',
    },
    {
        id: 3,
        title: 'Tokyo',
    },
    {
        id: 4,
        title: 'Toronto',
    },
    {
        id: 5,
        title: 'Berlin',
    },
    {
        id: 6,
        title: 'Paris',
    },
    {
        id: 7,
        title: 'New York',
    },
    {
        id: 8,
        title: 'Bangkok',
    },
    {
        id: 9,
        title: 'Chicago',
    },
    {
        id: 10,
        title: 'Seoul',
    },
    {
        id: 11,
        title: 'Moscow',
    },
    {
        id: 12,
        title: 'Ottawa',
    },
    {
        id: 13,
        title: 'Ha Noi',
    },
    {
        id: 14,
        title: 'Canberra',
    },
];

interface IProps {
    weather: IWeatherData | null | undefined;
    setQuery: React.Dispatch<React.SetStateAction<IQuery>>;
}

function TopButtons({ setQuery, weather }: IProps) {
    const [listCities, setListCities] = useState<{ id: number; title: string }[]>(
        cities.slice(0, 4),
    );

    // Random City
    useEffect(() => {
        setListCities((prev) => {
            let newList: { id: number; title: string }[] = [];
            let index;
            while (newList.length < 5) {
                index = Math.floor(Math.random() * cities.length);
                if (!newList.includes(cities[index]) && !prev.includes(cities[index])) {
                    newList.push(cities[index]);
                }
            }
            return newList;
        });
    }, [weather]);

    return (
        <div className="flex items-center justify-between my-1 w-full">
            {listCities.map((city) => (
                <button
                    onClick={() => setQuery({ q: city.title })}
                    className="text-white text-sm lg:text-lg w-1/4  text-center font-medium transition ease-in hover:scale-125"
                    key={city.id}
                >
                    {city.title}
                </button>
            ))}
        </div>
    );
}

export default memo(TopButtons);
