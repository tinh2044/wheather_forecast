export const getMapDataByCountryId = (countryId: string) =>
    import(`@highcharts/map-collection/countries/${countryId}/${countryId}-all.geo.json`);
