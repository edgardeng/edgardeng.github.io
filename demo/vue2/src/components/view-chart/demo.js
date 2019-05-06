var uploadedDataURL = "/asset/get/s/data-1557133096474-sFRwBmQGJ.json";

var geoJson = {}
$.ajax({
  url : uploadedDataURL,
  async : false,
  dataType : 'json',
  success : function(data){
    echarts.registerMap('ls', data);
    var geoCoordMap = {
      '第一网格':[121.3830,31.2652],
      '第二网格':[121.3783,31.2574],
      '第三网格':[121.3843,31.2567],
      '第四网格':[121.3912,31.2606],
      '第五网格':[121.4000,31.2596],
      '第六网格':[121.3957,31.2505],
    }
    var data = [
      {name:'第一网格', value: 29},
      {name:'第二网格', value: 23},
      {name:'第三网格', value: 137},
      {name:'第四网格', value: 165},
      {name:'第五网格', value: 70},
      {name:'第六网格', value: 48}

    ];
    var convertData = function (data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          });
        }
      }
      return res;
    };
    myChart.setOption(option = {

      backgroundColor: '#fff',
      tooltip: {
        formatter : function(e){
          if (typeof(e.value)[2] == "undefined") {
            return e.name;
          }else{
            return '企业数<br>'+e.name + ':' + e.value[2] + '家';
          }

        }
      },
      geo: {
        map: 'ls',
        show: true,
        label: {
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            areaColor: '#C9E6FF',
            borderColor: '#fff',
            borderWidth: 2,
            shadowColor: '#5AB2FE',
            shadowBlur: 20
          }
        },
        zoom:1.2,
      },
      series: [{
        type: 'map',
        map: 'ls',
        geoIndex: 1,
        aspectScale: 0.75, //长宽比
        zoom:1.2,
        label: {
          emphasis: {
            show: false,
            textStyle: {
              color: '#05C3F9'
            }
          }
        },
        roam: false,
        itemStyle: {
          normal: {
            areaColor: 'transparent',
            borderColor: '#fff',
            borderWidth: 2
          },
          emphasis: {
            areaColor: '#C9E6FF',
            shadowColor: '#5AB2FE',
            shadowBlur: 20
          }
        },
        data: data,
      },
        {
          name: '企业数',
          type: 'scatter',
          coordinateSystem: 'geo',
          symbol: 'circle',
          symbolSize: function (val) {
            var num = val[2] / 2;
            if(num < 20){
              return 20
            }else{
              return num;
            }
          },
          label: {
            normal: {
              show: true,
              formatter: function(value){
                return value.value[2]
              },
              textStyle: {
                color: '#fff',
                fontSize: 12,
              }
            }
          },
          itemStyle: {
            normal: {
              color: '#1C3E64', //标志颜色
            }
          },
          zlevel: 6,
          data: convertData(data),
        }
      ]
    });
  }
})
