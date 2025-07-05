// llmNode.js

import { Handle, Position } from "reactflow";
import BaseNode from "../components/BaseNode";

export const LLmNode = ({ id, data }) => {
  //{ here logic for API calls and other computations to be written}

  return (
    <>
      <BaseNode
        id={id}
        label="LLM"
        nodeType={data.nodeType}
        handles={[
          {
            type: "target",
            position: Position.Left,
            idName: "system",
            style: { top: `${100 / 3}%` },
          },
          {
            type: "target",
            position: Position.Left,
            idName: "prompt",
            style: { top: `${200 / 3}%` },
          },
          { type: "source", position: Position.Right, idName: "response" },
        ]}
      >
        <div>
          <span>This is a LLM</span>
        </div>
      </BaseNode>
    </>
  );
};
