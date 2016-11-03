var chartData = [];
var color_index = 0;
var symbol_index = 0;
var dates = [];
var temps = [];
var today = "thursday";
var temps_c_2d = [];
var temps_f_2d = [];
var dates_2d = [];
var weather_2d = [];
var pressure_2d = [];
var humidity_2d = [];
var wind_2d = [];

$(document).ready(function(){
  console.log("ready");
  var apiKey = "&APPID=0a72030de86532dc606cd9e539fc94bd";
  clearData();
  refreshWeatherApp();
  Writer.writeTableTitle();

  $("#weather-app").click(function(){
    refreshWeatherApp();
  });

  $("#selector-pressure").click(function(){
    $("#selector-pressure").toggleClass("selected");
    $("#selector-humidity").removeClass("selected");
    $("#selector-wind").removeClass("selected");
    Chart.refreshChart();
  });
  $("#selector-humidity").click(function(){
    $("#selector-pressure").removeClass("selected");
    $("#selector-humidity").toggleClass("selected");
    $("#selector-wind").removeClass("selected");
    Chart.refreshChart();
  });
  $("#selector-wind").click(function(){
    $("#selector-pressure").removeClass("selected");
    $("#selector-humidity").removeClass("selected");
    $("#selector-wind").toggleClass("selected");
    Chart.refreshChart();
  });

  function refreshWeatherApp(){
    var cityname = $(".form-group #search-cityname").val();
    var apiBaseUrlForecast = "http://api.openweathermap.org/data/2.5/forecast/city?q=";
    var apiBaseUrlCurrent = "http://api.openweathermap.org/data/2.5/weather?q=";
    var sendUrlForecast = apiBaseUrlForecast + cityname + apiKey;
    var sendUrlCurrent = apiBaseUrlCurrent + cityname + apiKey;
    //Current Weather
    $.ajax({
      url: sendUrlCurrent
    }).done(function(data){
      var day = Util.convDate(data.dt,"dddd");
      var country = Util.withCountryFlag(data.sys.country);
      var city = data.name;
      var info = parseData(data);
      info["country"] = country;
      info["city"] = city;
      info["day"] = day;
      today = info;
      Writer.writeCurrentData(info);
    }).fail(function(data){
      console.log("error");
    }).always(function(data){
      console.log("quit");
    });

    $.ajax({
      url: sendUrlForecast
    }).done(function(data){
      console.log(data);
      dates = Getarray.date(data,"ddd HH");
      temps_c = Getarray.temp(data,enum_temp_deg_type.C);
      temps_c_max = Getarray.temp(data,enum_temp_deg_type.C, enum_temp_type.MAX);
      temps_c_min = Getarray.temp(data,enum_temp_deg_type.C, enum_temp_type.MIN);
      temps_f = Getarray.temp(data,enum_temp_deg_type.F);
      temps_f_max = Getarray.temp(data,enum_temp_deg_type.F, enum_temp_type.MAX);
      temps_f_min = Getarray.temp(data,enum_temp_deg_type.F, enum_temp_type.MIN);
      weather = Getarray.weather(data);
      pressure = Getarray.pressure(data);
      humidity = Getarray.humidity(data);
      wind_kph = Getarray.wind(data);
      wind_mph = Util.convKphToMphArr(wind_kph);

      dates_2d = Util.convTo2dArray(dates,dates);
      temps_c_2d = Util.convTo2dArray(temps_c,dates);
      temps_f_2d = Util.convTo2dArray(temps_f,dates);
      weather_2d = Util.convTo2dArray(weather,dates);
      pressure_2d = Util.convTo2dArray(pressure,dates);
      humidity_2d = Util.convTo2dArray(humidity,dates);
      wind_kph_2d = Util.convTo2dArray(wind_kph,dates);
      wind_mph_2d = Util.convTo2dArray(wind_mph,dates);

      $("#weatherapp").removeClass("hide");

      //Chart.oneDayChart(dates_2d[0],temps_c_2d[0]);
      Chart.refreshChart();
      Writer.writeDayCard(dates,temps_c_min, temps_c_max, weather);
    }).fail(function(data){
      console.log("error");
    }).always(function(data){
      console.log("quit");
    });
  };
  $("#degree-picture-selector").click(function(){
    $("#deg-type-c").toggleClass("selected");
    $("#deg-type-c").toggleClass("disable");
    $("#deg-type-f").toggleClass("selected");
    $("#deg-type-f").toggleClass("disable");
    Chart.refreshChart();
    Writer.refreshTemp();
    Writer.refreshWind();
  });
  $("#day0").click(function(){
    Util.unselectAllDayButton();
    $("#day0").addClass("selected");
    Chart.refreshChart();
  });
  $("#day1").click(function(){
    Util.unselectAllDayButton();
    $("#day1").addClass("selected");
    Chart.refreshChart();
  });
  $("#day2").click(function(){
    Util.unselectAllDayButton();
    $("#day2").addClass("selected");
    Chart.refreshChart();
  });
  $("#day3").click(function(){
    Util.unselectAllDayButton();
    $("#day3").addClass("selected");
    Chart.refreshChart();
  });
  $("#day4").click(function(){
    Util.unselectAllDayButton();
    $("#day4").addClass("selected");
    Chart.refreshChart();
  });
  $("#weather-clear").click(function(){
    clearData();
    Writer.writeTableTitle();
  });
  $("#weather-forecast").click(function(){
    console.log("GetForecast");
    var cityname = $(".form-group #search-cityname").val();
    var apiBaseUrl = "http://api.openweathermap.org/data/2.5/forecast/city?q=";
    var sendUrl = apiBaseUrl + cityname + apiKey;
    console.log(sendUrl);
    $.ajax({
      url: sendUrl
    }).done(function(data){
      console.log(data);
      var country = Util.withCountryFlag(data.city.country);
      var city = data.city.name;
      for(var i = 0; i < data.list.length; i++){
        var info = parseData(data.list[i]);
        info["country"] = country;
        info["city"] = city;
        Writer.writeTableData(info);
      }
      // console.log(Util.getDateArray(data,"dddd"));
      // console.log(Util.getTempArray(data));
      // console.log(Util.getTempArray(data,enum_temp_deg_type.K));
      // console.log(Util.getTempArray(data,enum_temp_deg_type.C));
      // console.log(Util.getTempArray(data,enum_temp_deg_type.F));
      // console.log(Util.getTempArray(data,enum_temp_deg_type.K,enum_temp_type.MAX));
      // console.log(Util.getTempArray(data,enum_temp_deg_type.C,enum_temp_type.MAX));
      // console.log(Util.getTempArray(data,enum_temp_deg_type.F,enum_temp_type.MAX));
      // console.log(Util.getTempArray(data,enum_temp_deg_type.K,enum_temp_type.MIN));
      // console.log(Util.getTempArray(data,enum_temp_deg_type.C,enum_temp_type.MIN));
      // console.log(Util.getTempArray(data,enum_temp_deg_type.F,enum_temp_type.MIN));
      // console.log(Util.getHumidArray(data));
      // console.log(Util.getWindArray(data));
      // console.log(Util.getWeatherArray(data));
      // console.log(Util.getWeatherArray(data,enum_weather.DETAIL));
      dates = Getarray.date(data,"ddd hh a");
      temps = Getarray.temp(data,enum_temp_deg_type.C);
      chartData.push(Chart.dataForChart(data.city.name,temps))
      console.log(chartData);
      Chart.simpleChart("5days forecast",dates,chartData,enum_temp_deg_type.C);
    }).fail(function(data){
      console.log("error");
    }).always(function(data){
      console.log("quit");
    });
  });

  $("#weather-current").click(function(){
    var cityname = $(".form-group #cityname").val();
    var apiBaseUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
    var sendUrl = apiBaseUrl + cityname + apiKey;
    console.log(sendUrl);
    $.ajax({
      url: sendUrl
    }).done(function(data){
      console.log(data);
      var date = new Date(data.dt * 1000);
      var day = Util.convDate(data.dt,"dddd");

      console.log(data);
      var country = Util.withCountryFlag(data.sys.country);
      var city = data.name;
      var info = parseData(data);
      info["country"] = country;
      info["city"] = city;
      info["day"] = day;

      Writer.writeTableData(info);
      Writer.writeCurrentData(info);

    }).fail(function(data){
      console.log("error");
    }).always(function(data){
      console.log("quit");
    });
  });
});

function parseData(data){
  var date = new Date(data.dt * 1000);
  //console.log(date);
  //var dateStr = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
  dateStr = Util.convDate(data.dt,"YYYY/MM/DD");
  //var time = date.getHours() + ":" + date.getMinutes();
  time = Util.convDate(data.dt,"hh:mm")
  var temp_c = Util.convTemp(data.main.temp, enum_temp_deg_type.C);
  var temp_f = Util.convTemp(data.main.temp, enum_temp_deg_type.F);
  var humidity = data.main.humidity;
  var pressure = data.main.pressure;
  var weather = (data.weather[0]).main;
  var weather_detail = (data.weather[0]).description;
  var wind = data.wind.speed;
  var wind_deg = data.wind.deg;
  var info = {"date": dateStr, "time": time, "temp_c": temp_c,"temp_f":temp_f, "humidity": humidity, "weather":weather, "weather_detail":weather_detail, "wind": wind,"wind_deg":wind_deg, "pressure":pressure};
  return info;
}

function getData(){

}

// function dataWrite(data){
//   console.log(data);
//   //$("#data").text(str);
//   for(e in data){
//     var str = $("#data").text() + e + ":" + data[e] + "\n";
//     $("#data").text(str);
//   };
// }

function clearData(){
  $("#data").html("");
  chartData = [];
  color_index = 0;
  symbol_index = 0;

  //$("#cityname").val("");
}
