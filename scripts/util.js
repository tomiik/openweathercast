var enum_temp_type = {
  NORMAL: 0,
  MIN: 1,
  MAX: 2
};

var enum_temp_deg_type = {
  K: 0,
  C: 1,
  F: 2
};

var enum_weather = {
  NORMAL: 0,
  DETAIL: 1
};

Util = {
  init: function(){
  },
  getDateArray: function(data,format){
    data.list
  },
  getDateArray: function(data,format){
    console.log("getDateArray()");
    var array = [];
    for(var i = 0; i < data.list.length; i++){
      var date = this.convDate((data.list[i]).dt,format);
      array.push(date);
    }
    return array;
  },
  convDate: function(date,format){
    return date = moment(date * 1000).format(format);
  },
  getTempArray: function(data,type,mode){
    //type : enum_temp_degree, .K: kelvin, .F:farenheit .C:celcius
    //mode : enum_temp_type, .NORMAL"normal", .MAX"max", .MIN"min"
    var array = [];
    var temp = 0;
    var temp_k = 0;
    var temp_c = 0;
    var temp_f = 0;
    for(var i = 0; i < data.list.length; i++){
      if(mode === enum_temp_type.MIN){
        temp_k = (data.list[i]).main.temp_min;
      }else if(mode === enum_temp_type.MAX){
        temp_k = (data.list[i]).main.temp_max;
      }else{
        temp_k = (data.list[i]).main.temp;
      }
      temp = convTemp(temp_k,type);
      array.push(temp);
    }
    return array;
  },
  convTemp(temp_k,degtype){
    var temp_c = round(temp_k - 273.15, 2);
    var temp_f = round(((9/5) * temp_c + 32),2);

    if(degtype === enum_temp_deg_type.F){
      temp = temp_f;
    }else if(degtype === enum_temp_deg_type.C){
      temp = temp_c;
    }else{
      temp = temp_k;
    }
    return temp;
  },
  getHumidArray: function(data){
    var array = [];
    var humid = 0;
    for(var i = 0; i < data.list.length; i++){
      humid = (data.list[i]).main.humidity;
      array.push(humid);
    }
    return array;
  },
  getWindArray: function(data){
    var array = [];
    var windspeed = 0;
    for(var i = 0; i < data.list.length; i++){
      windspeed = (data.list[i]).wind.speed;
      array.push(windspeed);
    }
    return array;
  },
  getWeatherArray: function(data,mode){
    var array = [];
    var weather = 0;
    var description = 0;
    for(var i = 0; i < data.list.length; i++){
      weather = ((data.list[i]).weather[0]).main;
      description = ((data.list[i]).weather[0]).description;
      if(mode == enum_weather.DESCRIPTION){
        weather = description;
      }
      array.push(weather);
    }
    return array;
  },
  getWeatherIcon: function(weather){
    var result = ""
    if(weather === "Rain"){
      result = '<i class="fa fa-tint" aria-hidden="true"></i>';
    }else if(weather === "Clouds"){
      result = '<i class="fa fa-cloud" aria-hidden="true"></i>';
    }else if(weather === "Clear"){
      result = '<i class="fa fa-sun-o" aria-hidden="true"></i>';
    }
    return result;
  },
  getCountryFlag: function(country){
    var country = country.toLowerCase();
    var result = "<span class='flag-icon flag-icon-" + country + "'></span>";
    console.log(result);
    return result;
  },
  withCountryFlag: function(country){
    return this.getCountryFlag(country) + " " + country;
  }
}
