var source = "openweathermap"
var color_index = 0;
var symbol_index = 0;
var dummy = [{
        "name": 'Tokyo',
        "data": [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
      }, {
        "name": 'London',
        "data": [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
      }];


Chart = {
  dataForChart(city,data){
    var obj =  {"_colorIndex": color_index, "_symbolIndex": symbol_index,"name": city, "data":data};
    color_index++;
    symbol_index++;
    return obj;
  },
  simpleChart: function (title, dates,temps,temp_type) {
    // console.log(dummy);
    // console.log(temps);
    Highcharts.chart('chart-container', {
      chart: {
        type: 'line'
      },
      title: {
        text: title
      },
      subtitle: {
        text: source
      },
      xAxis: {
        categories: dates
      },
      yAxis: {
        title: {
          text: 'Temperature (°C)'
        }
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true
          },
          enableMouseTracking: true
        }
      },
      //series: dummy
      series: temps
    });
  }
}
