Weather = {
  getIcon(str){
    console.log("str=" + str)
    //str = str.toLowerCase();
    var icon = "<ul>";
    if(str.match("haze") != null){
      icon += "<li class='icon-sun'></li>"
    }else if(str.match("few cloud") != null){
      icon += "<li class='icon-cloud'></li>"
      icon += "<li class='icon-sunny'></li>"
    }else if(str.match("clear sky") != null){
      icon += "<li class='icon-sun'></li>"
    }else if(str.match("rain") != null){
      icon += "<li class='icon-cloud'></li>"
      icon += "<li class='icon-rainy'></li>"
    }else if(str.match("cloud") != null){
      icon += "<li class='icon-cloud'></li>"
    }else if(str.match("mist") != null){
      icon += "<li class='icon-mist'></li>"
    }else if(str.match("fog") != null){
      icon += "<li class='icon-mist'></li>"
    }
    icon += "</ul>"
    return icon;
  }
}
