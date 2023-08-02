import React, { useCallback, useRef } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  
  
} from 'reactflow';

import 'reactflow/dist/style.css';

import './index.css';
import Computer from './Computer';
import Database from './Database';
import Puwic from './Puwic';

const initialNodes = [
  {
    id: '0',
    data: { label: 'IP:192.000.192' },
    position: { x: 0, y: 50 },
  },
  {
    id: '1',
    data: { label: <Computer/> },
    position: { x: -300, y: 400 },
    style: { backgroundColor: 'blue', color: 'white', height:"90px", width:"90px", borderRadius:"100%" },
  },
  {
    id: '2',
    type:"output",
    data: { label: <Database/> },
    position: { x: 480, y: 100 },
    
  },
  {
    id: '3',
    data: { label: <Puwic/> },
    position: { x: 500, y: 500 },
  },
  
];

const initialEdges = [
    { id: 'e1', source: '0', target: '1', type: 'smoothstep'}, // este edge usará el componente CustomEdge
   
    { id: 'e2', source: '0', target: '2', animated: true, },
    { id: 'e3', source: '0', target: '3' , animated: true },
  ];



let id = 4;
const getId = () => `${id++}`;

const fitViewOptions = {
  padding: 3,
};

const AddNodeOnEdgeDrop = () => {
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { project } = useReactFlow();
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

    //eliminar edge
    const onEdgeClick = useCallback((event, edge) => {
        setEdges((eds) => eds.filter(e => e.id !== edge.id));
      }, []);

      //eliminar nodo
      const onNodeClick = useCallback((event, node) => {
        setNodes((nds) => nds.filter(n => n.id !== node.id));
      }, []);

     

  const onConnectEnd = useCallback(
    (event) => {
      const targetIsPane = event.target.classList.contains('react-flow__pane');

      if (targetIsPane) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
        const id = getId();
        const newNode = {
          id,
          // we are removing the half of the node width (75) to center the new node
          position: project({ x: event.clientX - left - 75, y: event.clientY - top }),
          data: { label: `Elemento ${id}` },
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) => eds.concat({ id, source: connectingNodeId.current, target: id }));
      }
    },
    [project]
  );

  return (
    <div className="wrapper" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        // onEdgeClick={onEdgeClick}
        onNodeClick={onNodeClick}
        
        fitView
        fitViewOptions={fitViewOptions}
        
      />
      
    </div>
  );
};

export default  () => (
  <ReactFlowProvider>
    <Background variant="dots" gap={12} size={1} />
    <Controls/>
    <AddNodeOnEdgeDrop />
    
  </ReactFlowProvider>
);
