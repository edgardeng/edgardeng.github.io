<template>
    <div class="container-fluid">

      <div id="labelManage">
        <div id="main">
          <div class="flowchart-demo" id="flowchart-container">
            <div class="window" id="flowchartWindow1">1
            </div>
            <div class="window" id="flowchartWindow2">2
            </div>
            <div class="window" id="flowchartWindow3">3
            </div>
            <div class="window" id="flowchartWindow4">4
            </div>
          </div>
        </div>
      </div>

      <el-row >
        <el-col :span="4">
          <div class="grid-content bg-purple" style="background:lightgray;padding: 1px;min-height: 900px">
            <h5>节点类型列表</h5>
            <div>
              <el-button type="primary">启动  </el-button>
            </div>
            <div style="margin-top: 5px">
              <el-button type="primary" @click="addHandle">菜单  </el-button>
            </div>

          </div>
        </el-col>

        <el-col :span="20">
          <div class="grid-content bg-purple" style="background:gray;min-height: 900px; padding: 10px;position: relative;" id="card-container">

            <el-card class="box-card" v-for="item in nodes" :key="item.id" :id="item.id" :style="'top:' + item.top + 'px;'">
              <div slot="header" class="clearfix">
                <span>卡片名称</span>
                <el-button type="danger" icon="el-icon-close" circle size="mini" @click="deleteHandle(item)"> </el-button>
              </div>
              <div v-for="o in item.choices" :key="o.id" class="text item" :id="item.id + o.id">
                {{o.name}}
              </div>
            </el-card>

          </div>
        </el-col>
      </el-row>
    </div>
  </template>
<script>
  import jsplumb from 'jsplumb'
  export default {
    name: 'PlumbView',
    data () {
      return {
        nodes: [],
        index: 2,
        jsPlumbInstance: null,
        item: {
          'id': 'node-item-1',
          'name': '菜单名称',
          'choices': [
            {
              'id': '1',
              'name': 'ITEM One',
              'nextNode': 'Exit'
            },
            {
              'id': '2',
              'name': 'ITEM Two',
              'nextNode': 'Exit'
            },
            {
              'id': '3',
              'name': 'ITEM Three',
              'nextNode': 'Exit'
            }
          ]
        },
        'top': 100,
        'left': 100
      }
    },
    mounted(){
      this.nodes.push(this.item)
      this.plumbStart2()
    },
    methods: {
      deleteHandle (item) {
        console.log(item)
        const index = this.list.indexOf(row)
        this.nodes.splice(index, 1)
        // this.nodes.remove(item)
      },
      addHandle () {
        let newItem = {
            'id': 'node-item-1',
            'name': '菜单名称',
            'choices': [
              {
                'id': '1',
                'name': 'ITEM One',
                'nextNode': 'Exit'
              },
              {
                'id': '2',
                'name': 'ITEM Two',
                'nextNode': 'Exit'
              },
              {
                'id': '3',
                'name': 'ITEM Three',
                'nextNode': 'Exit'
              }
            ],
          'top': 100,
          'left': 100
      }
      newItem.id = 'node-item-' + this.index
        console.log(newItem)
        this.nodes.push(newItem)
        this.index = this.index + 1
        setTimeout(()=>{
          this.jInstance.draggable(newItem.id,{containment: 'parent'});
          this.jInstance.addEndpoint(newItem.id + '1', { uuid:4 , anchor: "Left",  isTarget:true});
          this.jInstance.addEndpoint(newItem.id + '2', { uuid:5 , anchor: "Left",  isTarget:true});
          this.jInstance.addEndpoint(newItem.id + '3', { uuid:6 , anchor: "Left",  isTarget:true});
        }, 2000)
      },
      plumbStart1 () {
        jsPlumb.ready(() => {
          var j = jsPlumb.getInstance({
            DragOptions: { cursor: 'pointer', zIndex: 2000 },
            PaintStyle: { stroke: 'red', strokeWidth: 3 },  //配置自己拖拽小点的时候连接线的默认样式
            Endpoint: ["Dot", {radius: 5}], //这个是控制连线终端那个小点的半径
            // EndpointStyle : { fill : "red" }, //这个是控制连线终端那个小点的样式
            // EndpointHoverStyle  : { fill : "blue" }, //这个是控制连线终端那个小点的样式
            Connector:'Bezier',
            Container: 'flowchart-container'
          });
          j.draggable('flowchartWindow1',{containment: 'parent'});
          j.draggable('flowchartWindow2',{containment: 'parent'});
          j.draggable('flowchartWindow3',{containment: 'parent'});
          j.draggable('flowchartWindow4',{containment: 'parent'});

          j.addEndpoint('flowchartWindow1',{uuid:1 , anchor: "TopCenter",  isSource:true});
          j.addEndpoint('flowchartWindow2',{uuid:2 , anchor:'Right', isTarget:true});
          j.addEndpoint('flowchartWindow3',{anthor:'Right', isTarget:true});
          // let line = j.connect({uuids: ["1", "2"], editable: true})
          j.connect({
            uuids:[1,2],  //根据uuid进行连接
            // connector: ['Bezier'],
            paintStyle: { stroke: 'red', strokeWidth: 3 },  //线的样式
            endpointStyle: { fill: 'blue', outlineStroke: 'darkgray', outlineWidth: 2 },//点的样式
            overlays: [ ['Arrow', { width: 12, length: 12, location: 0.5 }] ]   //覆盖物 箭头 及 样式
          })
        });
      },
      plumbStart2 () {
        jsPlumb.ready(() => {
          this.jInstance = jsPlumb.getInstance({
            DragOptions: { cursor: 'pointer', zIndex: 2000 },
            PaintStyle: { stroke: 'red', strokeWidth: 3 },  //配置自己拖拽小点的时候连接线的默认样式
            Endpoint: ["Dot", {radius: 5}], //这个是控制连线终端那个小点的半径
            EndpointStyle : { fill : "red" }, //这个是控制连线终端那个小点的样式
            // EndpointHoverStyle  : { fill : "blue" }, //这个是控制连线终端那个小点的样式
            Connector:'Bezier',
            Container: 'card-container'
          });
          this.jInstance.draggable('node-item-1',{containment: 'parent'});
          this.jInstance.addEndpoint('node-item-11',{ uuid:1 , anchor: "Right",  isSource:true});
          this.jInstance.addEndpoint('node-item-12',{ uuid:2 , anchor: "Right",  isSource:true});
          this.jInstance.addEndpoint('node-item-13',{ uuid:3 , anchor: "Right",  isSource:true});
        });
      }
    }
  }
</script>

<style scoped >

  .flowchart-demo {
    width: 400px;
    height: 300px;
    padding: 20px;
    margin: 20px;
    border: 1px solid #000;
    position: relative;
  }

  .flowchart-demo .window {
    border: 1px solid #346789;
    box-shadow: 2px 2px 19px #aaa;
    -o-box-shadow: 2px 2px 19px #aaa;
    -webkit-box-shadow: 2px 2px 19px #aaa;
    -moz-box-shadow: 2px 2px 19px #aaa;
    -moz-border-radius: 0.5em;
    border-radius: 0.5em;
    opacity: 0.8;
    filter: alpha(opacity=80);
    text-align: center;
    position: absolute;
    background-color: #eeeeef;
    color: black;
    font-family: helvetica;
    font-size: 0.9em;
    line-height: 60px;
    width: 60px;
    height: 60px;
  }
  .flowchart-demo .window:hover {
    box-shadow: 2px 2px 19px #444;
    -o-box-shadow: 2px 2px 19px #444;
    -webkit-box-shadow: 2px 2px 19px #444;
    -moz-box-shadow: 2px 2px 19px #444;
    filter: alpha(opacity=60);
  }

  .flowchart-demo .active {
    border: 1px dotted green;
  }
  .flowchart-demo .hover {
    border: 1px dotted red;
  }

  #flowchartWindow1 {
    top: 10px;
    left: 20px;
  }
  #flowchartWindow2 {
    top: 60px;
    left: 80px;
  }
  #flowchartWindow3 {
    top: 100px;
    left: 120px;
  }
  #flowchartWindow4 {
    top: 190px;
    left: 200px;
  }

  .box-card {
    width: 160px;
    margin: 5px;
    position: absolute;
  }

</style>

