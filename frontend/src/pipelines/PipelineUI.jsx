import { useState, useRef, useCallback, useMemo } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { useSelector, useDispatch } from "react-redux";

//shifted from Zustand to redux due to some system issue
import {
  addNode,
  onNodesChange,
  onEdgesChange,
  onConnect,
  incrementNodeID,
} from "../store/nodesSlice";

import { InputNode } from "../nodes/InputNode";
import { OutputNode } from "../nodes/OutputNode";
import { TextNode } from "../nodes/TextNode";
import { LLmNode } from "../nodes/LLmNode";
import "reactflow/dist/style.css";
import StartNode from "../nodes/StartNode";
import DBNode from "../nodes/DBNode";
import APIcallNode from "../nodes/APIcallNode";
import TransformNode from "../nodes/TransformNode";
import NotificationNode from "../nodes/NotificationNode";


const gridSize = 20;
const proOptions = { hideAttribution: true };
const blackTheme = { background: "linear-gradient(to right, #4e317d, #0f0523)"};

//customHandlers
const nodeTypes = {
  customInput: InputNode,
  llm: LLmNode,
  customOutput: OutputNode,
  text: TextNode,
  start:StartNode,
  database:DBNode,
  api:APIcallNode,
  transform:TransformNode,
  notific:NotificationNode,
};



export const PipelineUI = () => {

  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const dispatch = useDispatch();

   // pipeline here is the name of the nodeSlice
  const nodes = useSelector((state) => state.pipeline.nodes);
  const edges = useSelector((state) => state.pipeline.edges);
  const nodeIDs = useSelector((state) => state.pipeline.nodeIDs);

  const getNodeID = (type) => {
    //since we use a special naming id so at each drag there is increment in the specific nodetype which is used
    dispatch(incrementNodeID(type));
    const count = (nodeIDs[type] ?? 0) + 1; // We add +1 because dispatch runs async
    return `${type}-${count}`;
  };

  const getInitNodeData = (nodeID, type) => ({
    id: nodeID,
    nodeType: type,
  });

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      // getting position of new node and getting data from toolbar to canvas
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const data = event.dataTransfer.getData("application/reactflow");
      if (!data) return;

      const appData = JSON.parse(data);
      const type = appData?.nodeType;
      if (!type) return;

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const nodeID = getNodeID(type);
      const newNode = {
        id: nodeID,
        type,
        position,
        data: getInitNodeData(nodeID, type),
      };

      dispatch(addNode(newNode));
    },
    [reactFlowInstance, dispatch, nodeIDs]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);
  

  // useMemo is used to prevent re-render as reactflow consider nodeTypes or EdgeTypes as new object making multiple or infinite re-renders
  const memoizedNodeTypes = useMemo(() => nodeTypes, []);

  return (
    <div ref={reactFlowWrapper} style={{ width: "100vw", height: "calc(100vh - 73px)" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={(changes) => dispatch(onNodesChange(changes))}
        onEdgesChange={(changes) => dispatch(onEdgesChange(changes))}
        onConnect={(params) => dispatch(onConnect(params))}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={memoizedNodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        style={blackTheme}
      >
        <Background color="#fff" variant="dots"/>
        <Controls />
        <MiniMap 
          className="bg-white border border-gray-200 rounded-lg shadow-sm"
              maskColor="rgba(0, 0, 0, 0.1)"
              nodeColor={(node) => {
                switch (node.type) {
                  case 'customInput': return '#059669';
                  case 'llm': return '#4f46e5';
                  case 'customOutput': return '#7c3aed';
                  case 'text': return '#db2777';
                  case 'database': return '#FF8C00';
                  default: return '#9ca3af';
                }
              }}
        />
      </ReactFlow>
    </div>
  );
};
