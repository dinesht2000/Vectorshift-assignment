// textNode.js

import { useEffect, useRef, useState } from "react";
import { Handle, Position } from "reactflow";
import BaseNode from "../components/BaseNode";

const RegexMatcher = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

function VariableExtracter(text) {
  const matches = [...text.matchAll(RegexMatcher)];
  return [...new Set(matches.map((match) => match[1]))];
}

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [variables, setVariables] = useState([]);
  const textRef = useRef(null);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.height = "auto"; // if text is removed then the extra lines are removed.
      textRef.current.style.height = textRef.current.scrollHeight + "px";
    }
    const vars = VariableExtracter(currText);
    setVariables(vars);
  }, [currText]);

  const variableHandles = [
    ...variables.map((varName, index) => ({
      type: "target",
      position: Position.Left,
      idName: `var-${varName}`,
      style: {
        top: 40 + index * 30,
      },
    })),
    {
      type: "source",
      position: Position.Right,
      idName: "output",
    },
  ];

  return (
    <BaseNode
      id={id}
      label="Text:"
      nodeType={data.nodeType}
      handles={variableHandles}
    >
      <div
        style={{
          border: "1px solid grey",
          padding: "4px",
          borderRadius: "5px",
        }}
      >
        <textarea
          ref={textRef}
          value={currText}
          onChange={handleTextChange}
          style={{
            width: "100%",
            resize: "none",
            overflow: "hidden",
          }}
          rows={1} //
        />
      </div>
    </BaseNode>
  );
};
