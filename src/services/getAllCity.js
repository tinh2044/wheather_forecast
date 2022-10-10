const allCityAndCountryApi = async () => {
    const allCities = await fetch(
        'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/states.json',
    )
        .then((res) => res.json())
        .then((res) => res.map((data) => `${data.name} (${data.country_name})`));

    const allCountries = await fetch(
        'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries.json',
    )
        .then((res) => res.json())
        .then((res) => res.map((data) => data.name));
    return [...allCountries, ...allCities];
};
export default allCityAndCountryApi;
