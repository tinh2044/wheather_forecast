import React, { useEffect, useState } from 'react';
import llCityAndCountryApi from '../services/getAllCity';

function SuggestCity({ value, handleSearch }) {
    const [allCity, setAllCity] = useState([]);
    const [suggestCity, setSuggestCity] = useState([]);
    // Get All Country and City
    useEffect(() => {
        const getAllCity = async () => {
            const allCity = await llCityAndCountryApi();
            setAllCity(allCity);
        };
        getAllCity();
    }, []);
    // Suggest Country And City
    useEffect(() => {
        if (value) {
            const formatValue = (value) => {
                if (value.includes(' ')) {
                    const listValue = value.split(' ').filter((value) => value);
                    return listValue.reduce((acc, value) => {
                        acc += value[0].toUpperCase() + value.substring(1) + ' ';
                        return acc;
                    }, '');
                } else {
                    return value[0].toUpperCase() + value.substring(1);
                }
            };
            const newValue = formatValue(value);
            const listCity = allCity.filter(
                (city) => city.includes(newValue) || city.includes(value),
            );
            setSuggestCity(listCity);
        } else {
            setSuggestCity([]);
        }
    }, [value]);
    return (
        <div className="absolute w-full shadow-orange-50 rounded  max-h-56 bg-white z-10 top-full mt-1 left-0 space-x-0 overflow-y-auto transition">
            {suggestCity.map((city, index) => (
                <p
                    key={index}
                    onClick={(e) => handleSearch(city)}
                    className=" w-full  text-base text-gray-500 px-4 py-2 border-solid border-t-2 cursor-pointer border-stone-300 transition ease-in-out hover:opacity-80 hover:bg-slate-200"
                >
                    {city}
                </p>
            ))}
        </div>
    );
}

export default SuggestCity;
