Util = {
  init: function(){
  },
  convDate: function(date,format){
    return date = moment(date * 1000).format(format);
  },
  convTemp(temp_k,degtype){
    var temp_c = this.round(temp_k - 273.15, 2);
    var temp_f = this.round(((9/5) * temp_c + 32),2);

    if(degtype === enum_temp_deg_type.F){
      temp = temp_f;
    }else if(degtype === enum_temp_deg_type.C){
      temp = temp_c;
    }else{
      temp = temp_k;
    }
    return temp;
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
  },
  round: function(data, digit){
    shift = Math.pow(10,digit);
    data = Math.round(data * shift)/shift;
    return data;
  }
}
