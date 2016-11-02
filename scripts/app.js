$(document).ready(function(){
  console.log("ready");
  var apiKey = "&APPID=0a72030de86532dc606cd9e539fc94bd";
  clearData();
  Writer.writeTableTitle();

  $("#weather-clear").click(function(){
    clearData();
    Writer.writeTableTitle();
  });

  $("#weather-forecast").click(function(){

    console.log("GetForecast");
    var cityname = $("#cityname").val();
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
      console.log(Parser.getDateArray(data,"dddd"));
      console.log(Parser.getTempArray(data));
      console.log(Parser.getTempArray(data,enum_temp_degree.K));
      console.log(Parser.getTempArray(data,enum_temp_degree.C));
      console.log(Parser.getTempArray(data,enum_temp_degree.F));
      console.log(Parser.getTempArray(data,enum_temp_degree.K,enum_temp_type.MAX));
      console.log(Parser.getTempArray(data,enum_temp_degree.C,enum_temp_type.MAX));
      console.log(Parser.getTempArray(data,enum_temp_degree.F,enum_temp_type.MAX));
      console.log(Parser.getTempArray(data,enum_temp_degree.K,enum_temp_type.MIN));
      console.log(Parser.getTempArray(data,enum_temp_degree.C,enum_temp_type.MIN));
      console.log(Parser.getTempArray(data,enum_temp_degree.F,enum_temp_type.MIN));
      console.log(Parser.getHumidArray(data));
      console.log(Parser.getWindArray(data));
      console.log(Parser.getWeatherArray(data));
      console.log(Parser.getWeatherArray(data,enum_weather.DETAIL));

    }).fail(function(data){
      console.log("error");
    }).always(function(data){
      console.log("quit");
    });
  });

  $("#weather-current").click(function(){
    var cityname = $("#cityname").val();
    var apiBaseUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
    var sendUrl = apiBaseUrl + cityname + apiKey;
    console.log(sendUrl);
    $.ajax({
      url: sendUrl
    }).done(function(data){
      console.log(data);
      var date = new Date(data.dt * 1000);
      console.log(date);
      var country = Util.withCountryFlag(data.sys.country);
      var city = data.name;
      var info = parseData(data);
      info["country"] = country;
      info["city"] = city;
      Writer.writeTableData(info);
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
  var humidity = data.main.humidity;
  var weather = (data.weather[0]).main;
  weather = Util.getWeatherIcon(weather) + weather;
  var info = {"date": dateStr, "time": time, "temp": temp_c, "humidity": humidity, "weather":weather};
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
  //$("#cityname").val("");
}

function round(data, digit){
  shift = Math.pow(10,digit);
  data = Math.round(data * shift)/shift;
  return data;
}

function drawForecastChart(data){
  //console.log(data);
  //$("#data").text(str);
  var html = $("#data").html();
  //console.log(html);
  html += "<tr>";
  html += "<td>";
  html += data["date"];
  html += "</td>";
  html += "<td>";
  html += data["time"];
  html += "</td>";
  html += "<td>";
  html += data["country"];
  html += "</td>";
  html += "<td>";
  html += data["city"];
  html += "</td>";
  html += "<td>";
  html += data["temp"];
  html += "</td>";
  html += "<td>";
  html += data["humidity"];
  html += "</td>";
  html += "<td>";
  html += data["weather"];
  html += "</td>";
  html += "</tr>";

  $("#data").html(html);
}
