import React, { memo, useEffect, useRef, useState } from 'react';
import { getMapDataByCountryId } from '../services/getMapByCountyId';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';
import { cloneDeep } from 'lodash';

highchartsMap(Highcharts);

const initOptions = (typeTemp) => {
    return {
        chart: {
            width: '400',
            height: '380',
            backgroundColor: 'transparent',
        },
        title: {
            text: `The chart shows the temperature of Vietnam`,
            style: {
                color: '#fff',
                textAlign: 'center',
            },
        },
        mapNavigation: {
            enabled: false,
        },
        colorAxis: {
            min: 0,
            stops: [
                [0.1, '#93c5fd'],
                [0.2, '#60a5fa'],
                [0.3, '#3b82f6'],
                [0.4, '#2563eb'],
                [0.5, '#1d4ed8'],
                [0.6, '#fdba74'],
                [0.7, '#fb923c'],
                [0.8, '#f97316'],
                [0.9, '#ea580c'],
                [1, '#c2410c'],
            ],
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'bottom',
        },

        series: [
            {
                name: 'fake temperature',
                joinBy: ['hc-key', 'key'],
            },
        ],
        tooltip: {
            borderWidth: '2px',
            valueSuffix: `°${typeTemp}`,
        },
    };
};

function Map({ typeTemp, countryId }) {
    const [mapData, setMapData] = useState({});
    const [options, setOptions] = useState({});
    const [mapLoaded, setMapLoaded] = useState(false);
    const chartRef = useRef(null);
    useEffect(() => {
        if (countryId) {
            getMapDataByCountryId(countryId)
                .then((res) => {
                    setMapData(res);
                })
                .catch((err) => console.log({ err }));
        }
    }, [countryId]);
    useEffect(() => {
        if (mapData && Object.keys(mapData).length) {
            const fakeData = mapData.features.map((feature) => {
                let temp = Math.floor(Math.random() * 30) + 4;
                temp = typeTemp === 'F' ? temp * 1.8 + 32 : temp;
                return {
                    key: feature.properties['hc-key'],
                    value: temp,
                };
            });
            setOptions(() => ({
                ...initOptions(typeTemp),
                title: {
                    text: mapData.title,
                },
                series: [
                    {
                        ...initOptions(typeTemp).series[0],
                        mapData: mapData,
                        data: fakeData,
                    },
                ],
            }));

            if (!mapLoaded) setMapLoaded(true);
        }
    }, [mapData, mapLoaded, typeTemp]);

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

export default memo(Map);
