/* eslint-disable no-lone-blocks */
import React, { memo } from 'react';
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
        title: 'Ho Chi Minh',
    },
];
function TopButtons({ setQuery }) {
    let listCities = (cities) => {
        let newList = [];
        let index;

        while (newList.length < 5) {
            index = Math.floor(Math.random() * cities.length);
            if (!newList.includes(cities[index])) {
                newList.push(cities[index]);
            }
        }
        return newList;
    };

    return (
        <div className="flex items-center justify-around my-3 w-full">
            {listCities(cities).map((city) => (
                <button
                    onClick={() => setQuery({ q: city.title })}
                    className="text-white text-lg font-medium"
                    key={city.id}
                >
                    {city.title}
                </button>
            ))}
        </div>
    );
}

export default memo(TopButtons);
