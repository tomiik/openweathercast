Util = {
  init: function(){
  },
  convTo2dArray(data,dates){
    var result = [];
    var length = data.length;

    var day = dates[0].slice(0,3);
    var temp = [];
    for(var i = 0; i < data.length; i++){
      if(day !== dates[i].slice(0,3)){
        result.push(temp);
        temp = [];
      }else{
        temp.push(data[i]);
      }
      day = dates[i].slice(0,3);
    }
    return result;
  },
  averageArray: function(arr){
    var result = 0;
    for(var i = 0; i < arr.length; i++){
      result += arr[i];
    }
    return result;
  },
  maxArray: function(arr){
    var result = -999;
    for(var i = 0; i < arr.length; i++){
      result = Math.max(result,arr[i]);
    }
    return result;
  },
  minArray: function(arr){
    var result = 999;
    for(var i = 0; i < arr.length; i++){
      result = Math.min(result,arr[i]);
    }
    return result;
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
  },
  unselectAllDayButton: function(){
    $("#day0").removeClass("selected");
    $("#day1").removeClass("selected");
    $("#day2").removeClass("selected");
    $("#day3").removeClass("selected");
    $("#day4").removeClass("selected");
  }
}
