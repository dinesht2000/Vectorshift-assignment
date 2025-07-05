import { useState } from "react";
import BaseNode from "../components/BaseNode";
import { Position } from "reactflow";

const NotificationNode = ({id, data}) => {
    
  const [title, setTitle] = useState(data?.title || "Hello!");
  const [message, setMessage] = useState(
    data?.message || "This is a notification."
  );

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  return (
    <BaseNode
      id={id}
      label="Notification"
      nodeType={data.nodeType}
      handles={[
        { type: "target", position: Position.Left, idName: "title", style: { top: 40, background: "#555" } },
        { type: "target", position: Position.Left, idName: "message", style: { top: 70, background: "#555" } },
        { type: "target", position: Position.Left, idName: "trigger", style: { top: 100, background: "#555" } },
        { type: "source", position: Position.Right, idName: "output", style: { top: 60, background: "#555" } },

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
          Title:
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            style={{ width: "100%" }}
          />
        </label>

        <label>
          Message:
          <input
            type="text"
            value={message}
            onChange={handleMessageChange}
            style={{ width: "100%" }}
          />
        </label>

        <div
          style={{
            marginTop: "6px",
            backgroundColor: "#fff3cd",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ffeeba",
            fontSize: "13px",
            color: "#856404",
          }}
        >
          <strong>{title}</strong>
          <div>{message}</div>
        </div>
      </div>
    </BaseNode>
  );
};

export default NotificationNode;
