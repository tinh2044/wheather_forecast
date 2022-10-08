export const getMapDataByCountryId = (countryId) =>
    import(`@highcharts/map-collection/countries/${countryId}/${countryId}-all.geo.json`);
