
google.load("visualization", "1", {packages:["corechart"]});

      google.setOnLoadCallback(drawChart);
      
      function drawChart() {
          
          alert("ja");
          var tab = [['data1',"lol"],['data2', 6],['data4', 2],['data6', 9]];
        var data = google.visualization.arrayToDataTable(tab);

        var options = {
          title: 'Browsers and users',
          is3D: true,
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
        chart.draw(data, options);
        
      }

