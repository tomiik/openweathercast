Getarray = {
  init: function(){
  },
  date: function(data,format){
    console.log("getDateArray()");
    var array = [];
    for(var i = 0; i < data.list.length; i++){
      var date = Util.convDate((data.list[i]).dt,format);
      array.push(date);
    }
    return array;
  },
  temp: function(data,type,mode){
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
      temp = Util.convTemp(temp_k,type);
      array.push(temp);
    }
    return array;
  },
  humid: function(data){
    var array = [];
    var humid = 0;
    for(var i = 0; i < data.list.length; i++){
      humid = (data.list[i]).main.humidity;
      array.push(humid);
    }
    return array;
  },
  wind: function(data){
    var array = [];
    var windspeed = 0;
    for(var i = 0; i < data.list.length; i++){
      windspeed = (data.list[i]).wind.speed;
      array.push(windspeed);
    }
    return array;
  },
  weather: function(data,mode){
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
}
