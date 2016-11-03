Writer = {
  writeCurrentData: function(data){
    this.writeCityName(data["city"] + " - " + data["country"]);
    this.writeDay(data.day);
    this.writeWeather(data.weather_detail);
    this.drawWeatherIcon(data.weather_detail);
    this.writeTemp(Util.round(data.temp_c,0));
    this.writePrecipitation(data.precipitation);
    this.writePressure(data.pressure);
    this.writeHumidity(data.humidity);
    this.refreshWind();
  },
  writeDayCard(dates,temps_min,temps_max,weather,weathers){
    dates_2d = Util.convTo2dArray(dates,dates);
    temps_min_2d = Util.convTo2dArray(temps_min,dates);
    temps_max_2d = Util.convTo2dArray(temps_max,dates);
    weather_2d = Util.convTo2dArray(weather,dates);

    for(i = 0; i < dates_2d.length; i++){
      this.writeDayCardDay(i,(dates_2d[i])[0].slice(0,3));
      this.writeDayCardTemp(i,Util.round(Util.minArray(temps_min_2d[i]),0), Util.round(Util.maxArray(temps_max_2d[i]),0));
      this.writeDayCardIcon(i,Weather.getIcon(weather_2d[i]));
    }
  },
  writeDayCardIcon(dayNum,day){
    $("#day" + dayNum + "-day").text(day);
  },
  writeDayCardDay(dayNum,day){
    $("#day" + dayNum + "-day").text(day);
  },
  writeDayCardTemp(dayNum,temp_min, temp_max){
    //C = &#x2103;|F = &#x2109;
    $("#day" + dayNum + "-temp-min").html(temp_min + "&#x2103;");
    $("#day" + dayNum + "-temp-max").html(temp_max + "&#x2103;");
  },
  writePressure(pressure){
    $("#pressure").text(pressure);
  },
  writePrecipitation(pre){
    $("#precipitation").text(pre);
  },
  writeHumidity(hum){
    $("#humidity").text(hum);
  },
  refreshWind(){
    if($("#deg-type-c").hasClass("selected")){
      this.writeWind(Util.round(today.wind,2) + " km/h");
    }else{
      this.writeWind(Util.round(today.wind/1.609344,2) + " mph");
    }
  },
  writeWind(wind){
    $("#wind").text(wind);
  },
  writeCityName(str){
    $("#cityname").html(str);
  },
  writeDay(str){
    $("#day").text(str);
  },
  writeWeather(str){
    $("#description").text(str);
  },
  drawWeatherIcon(str){
    icon = Weather.getIcon(str);
    $("#degree-picture-icon").html(icon);
  },
  refreshTemp(){
    if($("#deg-type-c").hasClass("selected")){
      this.writeTemp(Util.round(today.temp_c,0));
    }else{
      this.writeTemp(Util.round(today.temp_f,0));
    }
  },
  writeTemp(temp){
    $("#degree-picture-temp").text(temp);
  },
  writeTableTitle: function(){
    var html = $("#data").html();
    html +="<tr><th>Date</th>"
    html +="<th>Time</th>";
    html +="<th>Country</th>";
    html +="<th>City</th>";
    html +="<th>Temp</th>";
    html +="<th>Humid</th>";
    html +="<th>Weather</th></tr>";
    $("#data").html(html);
  },
  writeTableData: function(data){
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
  },
}
