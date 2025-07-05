import { Handle, Position } from "reactflow";
import styles from "./HandleStyles.module.css";

// creating a centralized node color for each nodeTypes
const nodeColors = {
  customInput: { from: "#34d399", to: "#059669", border: "#6ee7b7" },
  llm: { from: "#818cf8", to: "#4f46e5", border: "#a5b4fc" },
  customOutput: { from: "#a78bfa", to: "#7c3aed", border: "#c4b5fd" },
  text: { from: "#f472b6", to: "#db2777", border: "#f9a8d4" },
  database: { from: "#FFD8A8", to: "#FFA94D", border: "#FFC078" },
  api: { from: "#FFF9DB", to: "#FCC419", border: "#FCC419" },

};
const defaultGradient = {
  from: "#e5e7eb",to: "#9ca3af",border: "#9ca3af",
};

const BaseNode = ({ id, label, children, handles = [], nodeType}) => {
  const gradient = nodeColors[nodeType]||defaultGradient;
  return (
    <div
      className="base-node relative px-6 py-4 rounded-lg transition-all duration-200 min-w-[250px] "
      style={{
        width: 200,
        padding: 8,
        boxShadow: `inset 0 0 0 3px ${gradient.border}`,
        borderRadius: 4,
        background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
      }}
    >
      <div>
        <span>{label}</span>
      </div>
      <div>{children}</div>
      {handles.length > 0 &&
        handles.map((handle, index) => (
          <Handle
            key={index}
            type={handle.type}
            position={handle.position}
            id={`${id}-${handle.idName || ""}`}
            style={handle.style || {}}
            className={styles.customHandle}
          />
        ))}
    </div>
  );
};

export default BaseNode;
