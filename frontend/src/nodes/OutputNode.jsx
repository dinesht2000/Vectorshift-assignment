// outputNode.js

import { useState } from "react";
import { Handle, Position } from "reactflow";
import BaseNode from "../components/BaseNode";

export const OutputNode = ({ id, data }) => {
  //setting pre-define value or intital name to this node
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );

  const [outputType, setOutputType] = useState(data.outputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      label={"output"}
      nodeType={data.nodeType}
      handles={[{ type: "target", position: Position.Left, idName: "-value" }]}
    >
      <div>
        <label>
          Name:
          <input type="text" value={currName} onChange={handleNameChange} />
        </label>
        <label>
          Type:
          <select value={outputType} onChange={handleTypeChange}>
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
