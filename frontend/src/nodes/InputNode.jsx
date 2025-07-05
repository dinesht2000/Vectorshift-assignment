// inputNode.jsx

import { useState } from "react";
import BaseNode from "../components/BaseNode";
import { Position } from "reactflow";

export const InputNode = ({ id, data }) => {
  //setting pre-define value or intital name to this node
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );

  const [inputType, setInputType] = useState(data.inputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <BaseNode 
    id={id} 
    nodeType={data.nodeType}
    label="Input"
    handles={[
      {type:"source",position:Position.Right,idName:"output"},
      {type:"target",position:Position.Left,idName:"input"}

    ]}
    >
      <label>
        Name:
        <input type="text" value={currName} onChange={handleNameChange} />
      </label>
      <label>
        Type:
        <select value={inputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
};
