// STEP 1 - Include Dependencies
// Include react
import React from "react";
// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";
// Include the fusioncharts library
import FusionCharts from "fusioncharts";
// Include the chart type
import Chart from "fusioncharts/fusioncharts.charts";
// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";


// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

// STEP 2 - Chart Data
const chartData = [
    {
        label: "JavaScript",
        value: "290"
    },
    {
        label: "CSS",
        value: "260"
    },
    {
        label: "HTML",
        value: "180"
    },
    {
        label: "Vue",
        value: "140"
    },
    {
        label: "Python",
        value: "115"
    },
    {
        label: "Dart",
        value: "100"
    },
    {
        label: "PHP",
        value: "30"
    },
    {
        label: "Rust",
        value: "30"
    }
];

// STEP 3 - Creating the JSON object to store the chart configurations
const chartConfigs = {
    type: "column2d", // The chart type
    width: "400", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
        // Chart Configuration
        chart: {
        //Set the chart caption
        caption: "Most Common Coding Languages of this user",
        //Set the chart subcaption
        subCaption: "as percentage of public repos",
        //Set the x-axis name
        xAxisName: "Coding Language",
        //Set the y-axis name
        yAxisName: "Percent of use",
        numberSuffix: "K",
        //Set the theme for your chart
        theme: "fusion"
        },
        // Chart Data
        data: chartData
    }
};


const ChartComponent = () => {
    return (
        <ReactFC {...chartConfigs} />
    );
};


export default ChartComponent;
