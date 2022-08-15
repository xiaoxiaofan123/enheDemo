import React, { useEffect, useRef, useState } from "react";
import G6 from "@antv/g6";
import NodeDialog from './NodeDialog'
import EdgeDialog from './EdgeDialog'
import AddEdge from './AddEdgeDialog'
import Button from '@mui/material/Button';
import { containerList } from './data'
import NodeTooltip from './NodeTooltip'
import EdgeTooltip from './EdgeTooltip'
import './node.css'

// const data = {
//   // 点集
//   nodes: [
//     {
//       id: "node1",
//       name: 'aaa'
//     },
//     {
//       id: "node2",
//     }
//   ],
//   // 边集
//   edges: [
//     {
//       source: "node1",
//       target: "node2",
//       name: 'b'
//     }
//   ]
// };

const transfer = (list) => {
  return {
    nodes: list[0].cotainers.map(item => ({ ...item, id: `${item.id}` })),
    edges: list[1].container_transfers.map(item => ({ ...item, id: `${item.id}`, source: `${item.source_container_id}`, target: `${item.destination_container_id}` }))
  }
}

const data = transfer(containerList)

const App = () => {
  const ref = useRef();
  let graph = null
  const graphRef = useRef(graph)

  // 节点tooltip坐标
  const [showNodeTooltip, setShowNodeTooltip] = useState(false)
  const [nodeTooltip, setNodeToolTip] = useState(null)

  const [nodeOpen, setNodeOpen] = useState(false)
  const [editData, setEditData] = useState(null)

  // 边tooltip坐标
  const [showEdgeTooltip, setShowEdgeTooltip] = useState(false)
  const [edgeTooltip, setEdgeToolTip] = useState(null)

  const [edgeOpen, setEdgeOpen] = useState(false)

  const [addEdgeOpen, setAddEdgeOpen] = useState(false)

  const bindEvents = () => {
    graph.on('node:mouseenter', evt => {
      console.log(graph)
      const { item } = evt
      const model = item.getModel()
      const { x, y } = model
      const point = graph.getCanvasByPoint(x, y)

      setNodeToolTip({ x: point.x + 25, y: point.y - 10, data: model })
      setShowNodeTooltip(true)
    })
    // 节点上面触发mouseleave事件后隐藏tooltip和ContextMenu
    graph.on('node:mouseleave', () => {
      setShowNodeTooltip(false)
    })

    graph.on('node:click', evt => {
      const { item } = evt
      const model = item.getModel()
      setEditData(model)
      setNodeOpen(true)
    })

    graph.on('edge:click', evt => {
      const { item } = evt
      const model = item.getModel()
      setEditData(model)
      setEdgeOpen(true)
    })

    graph.on('edge:mouseenter', evt => {
      const { item } = evt
      const model = item.getModel()
      console.log(model)
      const { endPoint } = model
      const y = endPoint.y - 100
      const x = endPoint.x
      const point = graph.getCanvasByPoint(x, y)

      setEdgeToolTip({ x: point.x + 25, y: point.y - 10, data: model })
      setShowEdgeTooltip(true)
    })

    graph.on('edge:mouseleave', () => {
      setShowEdgeTooltip(false)
    })

    // 监听节点上面右键菜单事件
    graph.on('node:contextmenu', evt => {
      const { item } = evt
      const model = item.getModel()
      const { x, y } = model
      console.log(model)
      const point = graph.getCanvasByPoint(x, y)
    })
  }

  const handleNodeChange = (formData) => {
    setNodeOpen(false)
    if (!formData) return
    const i = data.nodes.findIndex(item => item.id === editData.id)
    data.nodes[i] = { ...data.nodes[i], ...formData }
    // graph.changeData(data);
    graphRef.current.changeData(data)
  }

  const handleEdgeChange = (formData) => {
    setEdgeOpen(false)
    if (!formData) return
    const i = data.edges.findIndex(item => item.id === editData.id)
    data.edges[i] = { ...data.edges[i], ...formData }
    graphRef.current.changeData(data)
  }


  const handleOpenEdge = () => {
    setAddEdgeOpen(true)
  }

  const handleAddEdge = (formData)=>{
    setAddEdgeOpen(false)
    if(formData) {
      data.edges.push(formData)
      graphRef.current.changeData(data)
    }
  }

  useEffect(() => {
    if (!graph) {
      graph = new G6.Graph({
        container: ref.current,
        width: 1200,
        height: 800,
        modes: {
          default: ['drag-canvas', 'drag-node', 'zoom-canvas']
        },
        layout: {
          type: "dagre",
          direction: "LR"
        },
        defaultEdge: {
          style: {
            stroke: 'black',
            endArrow: true
          }
        }
      });
    }
    graph.node(function (node) {
      return {
        size: 48,
        label: node.id,
      };
    });
    graph.data(data);
    graph.render();
    graphRef.current = graph
    bindEvents()
  }, []);

  return (
    <>
      <div className="app" ref={ref}>
        {showNodeTooltip && <NodeTooltip x={nodeTooltip.x} y={nodeTooltip.y} data={nodeTooltip.data} />}
        {showEdgeTooltip && <EdgeTooltip x={edgeTooltip.x} y={edgeTooltip.y} data={edgeTooltip.data} />}
        <NodeDialog open={nodeOpen} onChange={handleNodeChange} data={editData} />
        <EdgeDialog open={edgeOpen} onChange={handleEdgeChange} data={editData} />
        <AddEdge open={addEdgeOpen} onChange={handleAddEdge} options={data.nodes} />
      </div>
      <Button variant="outlined" onClick={handleOpenEdge}>
        Add Edge
      </Button>
    </>
  )
};

export default App;
