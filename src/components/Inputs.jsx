import React, { useRef, useState } from 'react';
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
function Inputs({ setQuery, setUnit }) {
    const inputRef = useRef();
    const [valueInput, setValueInput] = useState('');
    const handleSearch = (value) => {
        if (value !== '') {
            setQuery({ q: value });
            setValueInput('');
            inputRef.current.focus();
        }
    };
    document.onkeydown = (e) => {
        if (e.code === 'Enter') {
            handleSearch(valueInput);
        }
    };
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
            <div className="flex flex-row w-3/4 items-center justify-center space-x-4 ">
                <input
                    value={valueInput}
                    ref={inputRef}
                    type="text"
                    placeholder="Search..."
                    className="text-xl font-light p-2 w-full shadow-xl  focus:outline-none capitalize rounded
        "
                    onChange={(e) => setValueInput(e.target.value)}
                />
                <UilSearch
                    onClick={() => handleSearch(valueInput)}
                    size={25}
                    className="text-white cursor-pointer transition ease-out hover:scale-125"
                />
                <UilLocationPoint
                    onClick={handleLocationClick}
                    size={25}
                    className="text-white cursor-pointer transition ease-out hover:scale-125"
                />
            </div>

            <div className=" flex flex-row w-2/12 items-center justify-evenly">
                <button
                    onClick={(e) => setUnit(e.target.name)}
                    className="text-xl text-white font-light transition ease-out hover:scale-125"
                    name="metric"
                >
                    °C
                </button>
                <p className="text-xl text-white mx-1">|</p>
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
