import styled from "styled-components";

export const DraggableNode = ({
  type,
  label,
  icon: Icon,
  color,
  bgColor,
  borderColor,
}) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing"; // optional just to make ui better
    // so we setData to perform drag operation here
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <NodeContainer
      bgColor={bgColor}
      borderColor={borderColor}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      draggable
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span className="font-medium text-gray-900" style={{ color: `${color}` }}>
        {label}
      </span>
    </NodeContainer>
  );
};

const NodeContainer = styled.div`
  padding: 10px;
  border-width: 2px;
  border-style: dashed;
  border-radius: 10px;
  transition: all 0.2s ease;
  cursor: grab;
  transform: scale(1);
  display: flex;
  align-items: center;
  gap: 8px;

  background: ${(props) => props.bgColor};
  border-color: ${(props) => props.borderColor};

  &:hover {
    border-style: solid;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: scale(1.05);
  }

  &:active {
    cursor: grabbing;
  }
`;
