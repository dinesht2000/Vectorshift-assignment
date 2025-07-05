import { useSelector } from "react-redux";
import PipelineSubmit from "./pipelines/PipelineSubmit";

export const SubmitButton = () => {
  const nodes = useSelector((state) => state.pipeline.nodes);
  const edges = useSelector((state) => state.pipeline.edges);

  const handleClick = () => {
    PipelineSubmit(nodes, edges);
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button 
      type="submit" 
      onClick={handleClick}
      style={{
          padding: "10px 20px",
          fontSize: "16px",
          fontWeight: "bold",
          color: "#fff",
          backgroundColor: "#4f46e5", // Indigo
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "background-color 0.3s, transform 0.2s",
        }}
      >
        Submit
      </button>
    </div>
  );
};
