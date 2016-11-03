Weather = {
  getIcon(str){
    str = str.toLowerCase();
    var icon = "<ul>";
    console.log(str)
    if(str.match("haze") != null){
      icon += "<li class='icon-sun'></li>"
    }else if(str.match("few cloud") != null){
      icon += "<li class='icon-cloud'></li>"
      icon += "<li class='icon-sunny'></li>"
    }
    icon += "</ul>"
    return icon;
  }
}
