var source = "openweathermap"

Chart = {
  refreshChart(){
    if($("#selector-pressure").hasClass("selected")){
      this.refreshOneDayChart("Pressure",dates_2d,pressure_2d,"Pa");
    }else if($("#selector-humidity").hasClass("selected")){
      this.refreshOneDayChart("Humidity",dates_2d,humidity_2d,"%");
    }else if($("#selector-wind").hasClass("selected")){
      if($("#deg-type-c").hasClass("selected")){
        this.refreshOneDayChart("Wind",dates_2d,wind_kph_2d,"km/h");
      }else{
        this.refreshOneDayChart("Wind",dates_2d,wind_mph_2d,"mph");
      }

    }else{
      this.refreshOneDayTempChart();
    }

  },
  refreshOneDayChart(title,dates, data, unit){
    var day = 0;
    for(var i = 0; i < dates.length; i++){
      if($("#day" + i).hasClass("selected")){
        day = i;
        break;
      }
    }
    this.oneDayChart(title,dates[day],data[day],unit);
  },
  refreshOneDayTempChart(){
    var day = 0;
    for(var i = 0; i < dates.length; i++){
      if($("#day" + i).hasClass("selected")){
        day = i;
        break;
      }
    }
    if($("#deg-type-c").hasClass("selected")){
      this.oneDayChart("Temperature",dates_2d[day],temps_c_2d[day],"℃");
    }else{
      this.oneDayChart("Temperature",dates_2d[day],temps_f_2d[day],"℉");
    }
  },
  oneDayTempChart(dates,temps,unit){
    this.oneDayChart("Temperature",dates,temps,unit);
  },
  oneDayChart(title,dates,data,unit){
    var dates = Util.removeDay(dates);
    var plotdata = [];
    plotdata.push(Chart.dataForChart("",data));
    this.simpleChart(title,dates,plotdata,unit);

  },
  dataForChart(city,data){
    var obj =  {"_colorIndex": color_index, "_symbolIndex": symbol_index,"name": city, "data":data};
    //color_index++;
    //symbol_index++;
    return obj;
  },
  simpleChart: function (title, dates,temps,unit) {
    // console.log(dummy);
    // console.log(temps);
    Highcharts.chart('chart-container', {
      chart: {
        type: 'line'
      },
      title: {
        text: title
        //visible: false
      },
      //subtitle: {
        //text: source
      //},
      //xAxis: {
      //  categories: dates
      //},
      tooltip: {
        valueSuffix: unit
      },
      yAxis: {
        visible: false
      },
      xAxis: {
        categories: dates
      },
      credits:{
        enabled: false
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true
          },
          enableMouseTracking: true
        }
      },
      legend:{
        enabled: false
      },
      //series: dummy
      series: temps
    });
  }
}
