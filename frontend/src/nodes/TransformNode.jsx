import { useState } from "react";
import { Position } from "reactflow";
import BaseNode from "../components/BaseNode";

const TransformNode = ({ id, data }) => {
  const [inputValue, setInputValue] = useState(data?.inputValue || "");
  const [transformType, setTransformType] = useState(
    data?.transformType || "Uppercase"
  );

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleTypeChange = (e) => {
    setTransformType(e.target.value);
  };

  const transformedValue = () => {
    switch (transformType) {
      case "Uppercase":
        return inputValue.toUpperCase();
      case "Lowercase":
        return inputValue.toLowerCase();
      case "Trim":
        return inputValue.trim();
      case "Reverse":
        return inputValue.split("").reverse().join("");
      default:
        return inputValue;
    }
  };
  return (
    <BaseNode
      id={id}
      label="Transform"
      nodeType={data.nodeType}
      handles={[
        { type: "target", position: Position.Left, idName: "-input" },
        { type: "source", position: Position.Right, idName: "-output" },
      ]}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          marginTop: "8px",
        }}
      >
        <label>
          Input:
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter text here"
            style={{ width: "100%" }}
          />
        </label>

        <label>
          Transform:
          <select
            value={transformType}
            onChange={handleTypeChange}
            style={{ width: "100%" }}
          >
            <option value="Uppercase">Uppercase</option>
            <option value="Lowercase">Lowercase</option>
            <option value="Trim">Trim</option>
            <option value="Reverse">Reverse</option>
          </select>
        </label>

        <div
          style={{
            fontSize: "12px",
            padding: "4px",
            background: "#f1f5f9",
            borderRadius: "4px",
            minHeight: "24px",
          }}
        >
          Output: {transformedValue()}
        </div>
      </div>
    </BaseNode>
  );
};

export default TransformNode;
