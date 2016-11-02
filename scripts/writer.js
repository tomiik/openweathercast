Writer = {

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
  //
  // function dataWrite(data){
  //   //console.log(data);
  //   //$("#data").text(str);
  //   var html = $("#data").html();
  //   //console.log(html);
  //   html += "<tr>";
  //   html += "<td>";
  //   html += data["date"];
  //   html += "</td>";
  //   html += "<td>";
  //   html += data["time"];
  //   html += "</td>";
  //   html += "<td>";
  //   html += data["country"];
  //   html += "</td>";
  //   html += "<td>";
  //   html += data["city"];
  //   html += "</td>";
  //   html += "<td>";
  //   html += data["temp"];
  //   html += "</td>";
  //   html += "<td>";
  //   html += data["humidity"];
  //   html += "</td>";
  //   html += "<td>";
  //   html += data["weather"];
  //   html += "</td>";
  //   html += "</tr>";
  //
  //   $("#data").html(html);
  // }



}
