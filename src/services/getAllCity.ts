import { ICIty } from './../../typing';
import { ICountry } from './../../.history/typing_20230331005438';
import axios from 'axios';

const place = axios.create({
    baseURL: 'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master',
});
const allCityAndCountryApi = async () => {
    const cityInVN = [
        'An Giang (Vietnam)',
        'Vung Tau (Vietnam)',
        'bac Lieu (Vietnam)',
        'Bac Giang (Vietnam)',
        'Bac Ninh (Vietnam)',
        'Ben Tre (Vietnam)',
        'Bunh Duong (Vietnam)',
        'Binh Dinh (Vietnam)',
        'Binh Phuoc (Vietnam)',
        'Binh Thuan (Vietnam)',
        'Cao Bang (Vietnam)',
        'Can Tho (Vietnam)',
        'Đa Nang (Vietnam)',
        'Đak Lak (Vietnam)',
        'Đak Nong (Vietnam)',
        'Đien Bien (Vietnam)',
        'Đong Nai (Vietnam)',
        'Đong Thap (Vietnam)',
        'Gia Lai (Vietnam)',
        'Ha Giang (Vietnam)',
        'Ha Nam (Vietnam)',
        'Ha Noi (Vietnam)',
        'Hà Tinh (Vietnam)',
        'Hai Dương (Vietnam)',
        'Hai Phong (Vietnam)',
        'Hau Giang (Vietnam)',
        'Hoa Binh (Vietnam)',
        'Ho Chi Minh (Vietnam)',
        'Hung Yen (Vietnam)',
        'Khanh Hoa (Vietnam)',
        'Kien Giang (Vietnam)',
        'Kon Tum (Vietnam)',
        'Lai Châu (Vietnam)',
        'Lang Sơn (Vietnam)',
        'Lao Cai (Vietnam)',
        'Lam Đong (Vietnam)',
        'Long An (Vietnam)',
        'Nam Đinh (Vietnam)',
        'Nghe An (Vietnam)',
        'Ninh Binh (Vietnam)',
        'Ninh Thuan (Vietnam)',
        'Phu Tho (Vietnam)',
        'Phu Yen (Vietnam)',
        'Quang Binh (Vietnam)',
        'Quang Nam (Vietnam)',
        'Quang Ngai (Vietnam)',
        'Quang Ninh (Vietnam)',
        'Quang Tri (Vietnam)',
        'Soc Trang (Vietnam)',
        'Son La (Vietnam)',
        'Bac Kan (Vietnam)',
        'Tay Ninh (Vietnam)',
        'Thai Binh (Vietnam)',
        'Thai Nguyen (Vietnam)',
        'Thanh Hoa (Vietnam)',
        'Thua Thien Hue (Vietnam)',
        'Tien Giang (Vietnam)',
        'Tra Vinh (Vietnam)',
        'Tuyen Quang (Vietnam)',
        'Vinh Long (Vietnam)',
        'Vinh Phuc (Vietnam)',
        'Vinh (Vietnam)',
        'Yen Bai (Vietnam)',
    ];
    let allCities = await place.get<ICountry[]>('states.json').then((res) => res.data);
    // Format Cities
    allCities = allCities.filter((data: ICountry) => data.country_code !== 'VN');

    let nameAllCities: string[] = allCities.map((data) => `${data.name} (${data.country_name})`);

    let allCountries = await place.get<ICIty[]>('countries.json').then((res) => res.data);
    // Format Country
    let nameAllCountries: string[] = allCountries.map((country) => country.name);
    return [...cityInVN, ...nameAllCountries, ...nameAllCities];
};

export default allCityAndCountryApi;
