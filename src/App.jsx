import React, { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import NodeFlow from './components/NodeFlow';

import 'reactflow/dist/style.css';
import LabelIP from './components/LabelIP';

const initialNodes = [
  { id: '1', position: { x: 550, y: 300 }, data: { label: <LabelIP/> } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
  { id: '3', position: { x: 100, y: 600 }, data: { label: '3' } },
  { id: '4', position: { x: 600, y: 150 }, data: { label: '4' } },
  { id: '5', position: { x: 900, y: 600 }, data: { label: '5' } },
];
const initialEdges = [
  { id: 'e1-2', source: '2', target: '1' },
  { id: 'e1-3', source: '1', target:'3' },
  { id: 'e1-4', source: '4', target:'1' },
  { id: 'e1-5', source: '1', target:'5' },

];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <div className='flex justify-center items-center ' >
      
    <div className='w-[80vw] h-[90vh] mt-10 border border-gray-900 ' >
    <NodeFlow/>



      {/* <ReactFlow
        className='border border-gray-950 '
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow> */}


      
    </div>
    </div>
  );
}