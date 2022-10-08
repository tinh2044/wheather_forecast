import React, { useEffect, useRef, useState } from 'react';
import { getMapDataByCountryId } from '../services/getMapByCountyId';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';
import { cloneDeep } from 'lodash';

highchartsMap(Highcharts);

const initOptions = (colorMap) => {
    return {
        chart: {
            width: '400',
            height: '380',
            backgroundColor: 'transparent',
        },
        title: {
            text: null,
        },
        mapNavigation: {
            enabled: true,
        },
        colorAxis: {
            min: 0,
            stops: colorMap,
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'bottom',
        },
        series: [
            {
                name: 'fake data',
                joinBy: ['hc-key', 'key'],
            },
        ],
    };
};

function Map({ countryId, colorMap }) {
    const [mapData, setMapData] = useState({});
    const [options, setOptions] = useState({});
    const [mapLoaded, setMapLoaded] = useState(false);
    const chartRef = useRef(null);
    useEffect(() => {
        if (countryId) {
            console.log(countryId);
            getMapDataByCountryId(countryId)
                .then((res) => {
                    setMapData(res);
                })
                .catch((err) => console.log({ err }));
        }
    }, [countryId]);
    useEffect(() => {
        if (mapData && Object.keys(mapData).length) {
            const fakeData = mapData.features.map((feature, index) => ({
                key: feature.properties['hc-key'],
                value: Math.floor(Math.random() * 38) + 2,
            }));
            setOptions(() => ({
                ...initOptions(colorMap),
                title: {
                    text: mapData.title,
                },
                series: [
                    {
                        ...initOptions(colorMap).series[0],
                        mapData: mapData,
                        data: fakeData,
                    },
                ],
            }));

            if (!mapLoaded) setMapLoaded(true);
        }
    }, [mapData, mapLoaded, colorMap]);

    useEffect(() => {
        if (chartRef && chartRef.current) {
            chartRef.current.chart.series[0].update({
                mapData,
            });
        }
    }, [options, mapData]);

    if (!mapLoaded) return null;
    return (
        <div className="px-5">
            <HighchartsReact
                highcharts={Highcharts}
                options={cloneDeep(options)}
                constructorType={'mapChart'}
                ref={chartRef}
            />
        </div>
    );
}

export default Map;
