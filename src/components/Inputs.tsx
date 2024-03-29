import React, { useRef, useState } from 'react';

import { AiOutlineSearch } from 'react-icons/ai';
import { TfiLocationPin } from 'react-icons/tfi';

import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import SuggestCity from './SuggestCity';
import { IWeatherData } from '../../typing';
import { IQuery } from '../App';

interface IProps {
    setQuery: React.Dispatch<React.SetStateAction<IQuery>>;

    setUnit: React.Dispatch<React.SetStateAction<string>>;

    setWeather: React.Dispatch<React.SetStateAction<IWeatherData | null | undefined>>;
}

function Inputs({ setQuery, setUnit, setWeather }: IProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const [valueInput, setValueInput] = useState<string>('');

    const handleSearch = (value: string) => {
        if (value !== '') {
            setQuery({ q: value });
            setValueInput('');
            inputRef?.current?.focus();
            setWeather(null);
        }
    };
    // Search When Enter
    document.onkeydown = (e) => {
        if (e.code === 'Enter') {
            handleSearch(valueInput);
        }
    };
    // Search Weather At Current Location
    const handleLocationClick = () => {
        if (navigator.geolocation) {
            toast.info('Fetching users location.');
            navigator.geolocation.getCurrentPosition((position) => {
                toast.success('Location fetched!');
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                setQuery({
                    lat,
                    lon,
                });
            });
        }
    };
    return (
        <div className="flex flex-row justify-between mt-3 w-full">
            <div className="flex flex-row w-9/12 lg:w-10/12  items-center justify-center ">
                <div className="w-9/12 relative">
                    <input
                        value={valueInput}
                        ref={inputRef}
                        type="text"
                        placeholder="Search country or city..."
                        className=" text-sm lg:text-xl font-light p-2 w-full shadow-xl  focus:outline-none rounded capitalize
            "
                        onChange={(e) => setValueInput(e.target.value)}
                        onBlur={() => setValueInput('')}
                    />
                    <SuggestCity value={valueInput} handleSearch={handleSearch} />
                </div>
                <div className="w-3/12 flex items-center justify-start">
                    <AiOutlineSearch
                        onClick={() => handleSearch(valueInput)}
                        size={25}
                        className="text-white mx-3 cursor-pointer transition ease-out hover:scale-125"
                    />
                    <TfiLocationPin
                        color="#fff"
                        onClick={handleLocationClick}
                        size={25}
                        className="text-white cursor-pointer transition ease-out hover:scale-125"
                    />
                </div>
            </div>
            <div className=" flex flex-row w-3/12 lg:w-2/12 items-center justify-end">
                <button
                    onClick={(e) => setUnit(e.target.name)}
                    className="text-xl text-white font-light transition ease-out hover:scale-125"
                    name="metric"
                >
                    °C
                </button>
                <p className="text-xl text-white mx-2">|</p>
                <button
                    onClick={(e) => setUnit(e.target.name)}
                    className="text-xl text-white font-light transition ease-out hover:scale-125"
                    name="imperial"
                >
                    °F
                </button>
            </div>
        </div>
    );
}

export default Inputs;
