import { BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath } from 'reactflow';

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  arrowHeadType,
  markerEndId,
}) => {
  const edgePath = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);

  return (
    <>
      <path id={id} style={style} className="react-flow__edge-path" d={edgePath} markerEnd={markerEnd} />
      {data.text && (
        <text
          className="react-flow__edge-text"
          x={(sourceX + targetX) / 2}
          y={(sourceY + targetY) / 2}
        >
          {data.text}
        </text>
      )}
    </>
  );
};

export default CustomEdge