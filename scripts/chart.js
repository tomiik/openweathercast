var source = "openweathermap"

Chart = {
  refreshOneDayTempChart(){
    var day = 0;
    for(var i = 0; i < dates.length; i++){
      if($("#day" + i).hasClass("selected")){
        day = i;
        break;
      }
    }
    if($("#deg-type-c").hasClass("selected")){
      this.oneDayChart(dates_2d[day],temps_c_2d[day]);
    }else{
      this.oneDayChart(dates_2d[day],temps_f_2d[day]);
    }
  },
  oneDayTempChart(dates,temps){
    Chart.oneDayChart(dates,temps);
  },
  oneDayChart(dates,data){
    var plotdata = [];
    plotdata.push(Chart.dataForChart("",data));
    this.simpleChart("Temperature",dates,plotdata,enum_temp_deg_type.C);

  },
  dataForChart(city,data){
    var obj =  {"_colorIndex": color_index, "_symbolIndex": symbol_index,"name": city, "data":data};
    //color_index++;
    //symbol_index++;
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
        //visible: false
      },
      //subtitle: {
        //text: source
      //},
      //xAxis: {
      //  categories: dates
      //},
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
