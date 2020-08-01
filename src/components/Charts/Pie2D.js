import React from 'react';
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const Pie2D = ({ data }) => {

    const chartConfigs = {
        type: "pie2d",
        width: "100%",
        height: "400",
        dataFormat: "json",
        dataSource: {
            chart: {
            caption: "Languages",
            subCaption: "as percentage of public repos main language",
            pieRadius: '65%',
            numberSuffix: "%",
            captionFontColor: "#102a42",
            captionFontBold: 0,
            captionFontSize: 20,
            subCaptionFontSize: 10,
            captionFont: "Roboto",
            baseFont: "Open Sans",
            baseFontSize: 16,
            baseFontColor: "#617d98",
            smartLineColor: "#617d98",
            showShadow: 0,
            showPlotBorder: 0,
            paletteColors:
                "#2caeba, #5D62B5, #FFC533, #F2726F, #8d6e63, #1de9b6, #6E80CA, #ff2501", 
            use3DLighting: 0,
            useDataPlotColorForLabels: 0,
            bgColor: "#FFFFFF",
            showBorder: 0,
            decimals: 0,
            },
            data,
        }
    };


    return (
        <ReactFC {...chartConfigs} />
    );
};

export default Pie2D;
