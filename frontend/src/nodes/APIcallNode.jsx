import { useState } from "react";
import BaseNode from "../components/BaseNode";
import { Handle, Position } from "reactflow";

const APIcallNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || "");
  const [method, setMethod] = useState(data?.method || "GET");
  const [status, setStatus] = useState("Not called");

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleMethodChange = (e) => {
    setMethod(e.target.value);
  };

  const handleAPI = () => {
    if (!url.trim().startsWith("http")) {
      setStatus("Invalid URL");
      return;
    }
    setStatus(`API ${method} call successfull`);
  };

  return (
    <BaseNode id={id} label="API Request" nodeType={data.nodeType}>

    {/* even handle can be passed as children   */}
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-input`}
      />
       <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "8px" }}>

        <label>
          API URL:
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
            placeholder="https://api.example.com"
            style={{ width: "100%" }}
          />
        </label>

        <label>
          Method:
          <select value={method} onChange={handleMethodChange} style={{ width: "100%" }}>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </label>

        <button
          onClick={handleAPI}
          style={{
            padding: "4px 8px",
            borderRadius: "4px",
            background: "#FFA94D",
            border: "none",
            cursor: "pointer",
          }}
        >
          Call API
        </button>

        <div style={{ fontSize: "12px", color: status.includes("success") ? "green" : "red" }}>
          {status}
        </div>
      </div>
    </BaseNode>
  );
};

export default APIcallNode;
