import React, { useRef, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import classes from './TreeGraph.module.css';

require("highcharts/modules/treemap")(Highcharts);
require("highcharts/modules/treegraph")(Highcharts);


const initialNodes = [
  {
    id: "Card 1",
    name: "Ashish",
    collapsed: false,
    events: {
      click: (event) => {
        event.preventDefault();
        event.stopPropagation();
        console.log("Node Click event");
      },
    },
  },
  {
    id: "Card 2",
    parent: "Card 1",
    collapsed: true,
    link: {
      type: "curved",
    },
  },
  {
    id: "Card 3",
    parent: "Card 1",
    collapsed: true,
    link: {
      type: "curved",
    },
  },
  {
    id: "Card 4",
    parent: "Card 1",
    collapsed: true,
    link: {
      // type: "default",
    },
  },
  {
    id: "Card 5",
    parent: "Card 2",
    collapsed: true,
  },
  {
    id: "Card 6",
    parent: "Card 2",
    collapsed: true,
  },
  {
    id: "Card 7",
    parent: "Card 2",
    collapsed: true,
  },
  {
    id: "Card 8",
    parent: "Card 3",
    collapsed: true,
  },
  {
    id: "Card 9",
    parent: "Card 3",
    collapsed: true,
  },
  {
    id: "Card 10",
    parent: "Card 3",
    collapsed: true,
  },
  {
    id: "Card 11",
    parent: "Card 5",
    collapsed: true,
  },
  {
    id: "Card 12",
    parent: "Card 5",
    collapsed: true,
  },
  {
    id: "Card 13",
    parent: "Card 5",
    collapsed: true,
  },
  {
    id: "Card 14",
    parent: "Card 6",
    collapsed: true,
  },
  {
    id: "Card 15",
    parent: "Card 6",
    collapsed: true,
  },
  {
    id: "Card 16",
    parent: "Card 6",
    collapsed: true,
  },
  {
    id: "Card 17",
    parent: "Card 11",
    collapsed: true,
  },
  {
    id: "Card 18",
    parent: "Card 11",
    collapsed: true,
  },
  {
    id: "Card 19",
    parent: "Card 11",
    collapsed: true,
  },
];

const options = {
  chart: {
    spacingBottom: 30,
    marginRight: 120,
    marginLeft: 120,
    inverted: true,
    width: 1100,
    height: 5 * 200, // depth * height of one level, depth = 5
    events: {
      click: () => console.log("Chart Click Event!"),
    },
  },
  accessibility: {
    enabled: false,
  },
  title: {
    text: "",
  },
  credits: {
    enabled: false,
  },
  plotOptions: {
    treegraph: {
      events: {
        click: () => console.log("plotOptions Click Event!"),
      },
    },
  },
  series: [
    {
      type: "treegraph",
      clip: false,
      data: [],
      states: { hover: "none" },
      nodePadding: 0,
      collapseButton: {
        onlyOnHover: false,
        enabled: true,
        lineWidth: 1,
        x: 0,
        y: 0,
        height: 18,
        width: 18,
        shape: "circle",
        style: {
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "1em",
        },
      },
      link: {
        color: "#666666",
        cursor: "pointer",
        lineWidth: 3,
        radius: 10,
        type: "curved",
      },
      events: {
        click: null,
      },
      marker: {
        symbol: "rect", // 'circle', 'square','diamond', 'rect', 'triangle', 'triangle-down', 'url(graphic.png)'
        radius: 50,
        fillColor: "#ffffff",
        lineWidth: 3,
        width: 100,
        height: 150,
      },
      dataLabels: {
        // align: "left",
        allowOverlap: false,
        pointFormat: "<button>{point.id}</button>",
        // pointFormatter: (point) => {
        // console.log(point);
        //   return ``;
        // },
        style: {
          color: "#000000",
          // textOutline: "3px #ffffff",
          whiteSpace: "normal",
          fontSize: "30px",
          // textOverflow: "ellipsis",
        },
        // crop: false,
        // overflow: "none",
        useHtml: true,
        inside: true,
      },
      tooltip: {
        clusterFormat: "",
        distance: 20,
        nodeFormat:
          "{point.name} {point.name} <br>{point.title}<br>{point.description}",
        // nodeFormatter: () => {
        //   return ""
        // },

        followPointer: true,
        followTouchMove: true,
        footerFormat: `<br/><span style="font-size: 0.8em">{series.name}</span>`,
        headerFormat: `<span style="font-size: 0.8em">{series.name}</span><br/>`,
        // nullFormat:undefined,
        // nullFormatter:undefined,
        // pointFormat: "{point.fromNode.name} → {point.toNode.name}: <b>{point.weight}</b><br/>",
        // pointFormatter: undefined,
        // valueDecimals:undefined,
        // valuePrefix:undefined,
        // valueSuffix:undefined,
        // xDateFormat:undefined,
      },
      levels: [
        {
          level: 1,
          levelIsConstant: false,
        },
        {
          level: 2,
          colorByPoint: true,
        },
        {
          level: 3,
          colorVariation: {
            key: "brightness",
            to: -0.5,
          },
        },
        {
          level: 4,
          colorVariation: {
            key: "brightness",
            to: 0.5,
          },
        },
        {
          level: 6,
          dataLabels: {
            x: 10,
          },
          marker: {
            radius: 4,
          },
        },
      ],
    },
  ],
};

/**
 *
            levels: [{
                level: 1,
                dataLabels: {
                    style: {
                        fontSize: '50px'
                    }
                }
            }, {
                level: 2,
                marker: {
                    symbol: 'rect',
                    width: 100,
                    fillColor: 'red'
                }
            }], *
 */

const TreeGraph = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const chartRef = useRef();

  const nodeClickHandler = (event) => {
    event.preventDefault();
    expandCollapseChart(event.point);
    // event.point.options.marker.fillColor = "red";
    // if (
    //   "lastClickTime" in event.point &&
    //   event.point.lastClickTime > Date.now() - 800 &&
    //   event.point.isNodeClicked
    // ) {
    //   event.point.isNodeClicked = false;
    //   console.log("Double Clicked!");
    // } else {
    //   event.point.isNodeClicked = true;
    //   setTimeout(() => {
    //     if (event.point.isNodeClicked === true) {
    //       // Do something
    //       expandCollapseChart(event.point);
    //     }
    //     event.point.isNodeClicked = false;
    //   }, 800);
    // }
    // event.point.lastClickTime = Date.now();
  };

  const expandCollapseChart = (point) => {
    if (point.isLink === false && point.node.isLeaf === false && point.node.parent &&
        point.collapsed === true) {
      point.node.parentNode.children.filter(node => node.id !== point.id).forEach(node => {
        const ajdacentPoint = point.series.points.filter((p) => p.id === node.id)[0];
        ajdacentPoint.collapsed = true;
      });
      const visiblePoints = point.series.points.filter(
        (p) => p.visible === true
      );
      console.log("visiblePoints.length", visiblePoints);
      // point.series.chart.redraw();
      point.series.chart.reflow();
      point.series.chart.update({
        chart: {
          // width:
            // point.series.chart.spacingBox.width + visiblePoints.length * 100,
          // width: (visiblePoints.length + 3) * 200,
        },
      });
    }

    setTimeout(() => {
      const visiblePoints = point.series.points.filter((p) => p.visible === true);
      const dynamicChartWidth = visiblePoints.length * 200;
      console.log(visiblePoints.length);
      chartRef.current.chart.update({
        chart: {
          // width:
          // point.series.chart.spacingBox.width + visiblePoints.length * 100,
          width: dynamicChartWidth > 1100 ? dynamicChartWidth : 1100,
        },
      });
    }, 1000);
  };

  options.series[0].events.click = nodeClickHandler;
  options.series[0].data = nodes;

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartRef}
        allowChartUpdate={true}
        containerProps={{ className: classes.chart }}
      />
    </div>
  );
};

export default TreeGraph;
