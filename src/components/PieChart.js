import Taro, { Component } from "@tarojs/taro";
import * as echarts from "./ec-canvas/echarts";
// import "./ec-canvas/macarons"

function setChartData(chart, data) {
  let option = {
    title: {
        text: '入店人数',
        textStyle:{
          fontSize: 14
        }
    },
    series : [
      {
        name: '访问来源',
        type: 'pie',
        center: ['50%', '50%'],
        radius: [0, '60%'],
        data: data,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        label: {
          normal: {
              show: true,
              textStyle: {
                  color: '#000',
                  fontSize: 14
              }
          }
      },
      }
    ],
    tooltip : {
        trigger: 'item',
        formatter: "{a}{b} : {c} ({d}%)"
    },
    color:['#1E9C0D','#4D98F4'],
  };
  chart.setOption(option);
}

export default class PieChart extends Component {
  config = {
    usingComponents: {
      "ec-canvas": "./ec-canvas/ec-canvas"
    }
  };

  constructor(props) {
    super(props);
  }

  state = {
    ec: {
      lazyLoad: true
    }
  };

  refresh(data) {
    this.Chart.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      setChartData(chart, data);
      return chart;
    });
  }

  refChart = node => (this.Chart = node);

  render() {
    return (
      <ec-canvas
        ref={this.refChart}
        canvas-id='mychart-area'
        ec={this.state.ec}
      />
    );
  }
}
