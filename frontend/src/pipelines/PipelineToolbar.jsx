import {
  ALargeSmall,
  BellRing,
  Bot,
  CirclePlay,
  Database,
  Link2,
  SendHorizontal,
  TextCursor,
  TextCursorInput,
} from "lucide-react";
import { DraggableNode } from "../DraggableNode";

const nodeList = [
  {
    type: "customInput",
    label: "Input",
    icon: TextCursorInput,
    color: "#000",
    bgColor: "#6ee7b7",
    borderColor: "#059669",
  },
  {
    type: "llm",
    label: "LLM",
    icon: Bot,
    color: "#000",
    bgColor: "#a5b4fc",
    borderColor: "#4f46e5",
  },
  {
    type: "customOutput",
    label: "Output",
    icon: SendHorizontal,
    color: "#000",
    bgColor: "#c4b5fd",
    borderColor: "#7c3aed",
  },
  {
    type: "text",
    label: "Text",
    icon: TextCursor,
    color: "#000",
    bgColor: "#f9a8d4",
    borderColor: "#db2777",
  },
  {
    type: "start",
    label: "Start",
    icon: CirclePlay,
    color: "#000",
    bgColor: "#e5e7eb",
    borderColor: "#9ca3af",
  },
  {
    type: "database",
    label: "Database",
    icon: Database,
    color: "#000",
    bgColor: "#FFD8A8",
    borderColor: "#FFA94D",
  },
  {
    type: "api",
    label: "API request",
    icon: Link2,
    color: "#000",
    bgColor: "#FFF9DB",
    borderColor: "#FCC419",
  },
  {
    type: "transform",
    label: "Text Transformer",
    icon: ALargeSmall,
    color: "#000",
    bgColor: "#FFE3E3",
    borderColor: "#FA5252",
  },
  {
    type: "notific",
    label: "Notifier",
    icon: BellRing,
    color: "#000",
    bgColor: "#FFE8CC",
    borderColor: "#E8590C",
  },
];

export const PipelineToolbar = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection:"column",
        alignItems: "center",

        width: "100%",
        padding: "10px",
        paddingBottom:"0px",
        background: "rgba(78, 49, 125, 0.3)", // More transparent for glassy feel
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)", // Safari support
        borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
        position: "absolute",
        top: "0",
        zIndex: "1",
      }}
    >
      <div className="flex items-center">
        <div className="p-[5px] text-3xl text-white rounded-[10px] transition-all duration-200 ease-in-out cursor-grab transform flex items-center gap-2">
          Nodes:
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          {nodeList.map((item) => {
            const Icon = item.icon;
            return (
              <DraggableNode
                key={item.type}
                type={item.type}
                label={item.label}
                icon={Icon}
                color={item.color}
                bgColor={item.bgColor}
                borderColor={item.borderColor}
              />
            );
          })}
        </div>
      </div>
      <div className="p-0 mt-[10px] text-white">
        FOR TESTING TRY TEXT TRANSFORMER NODE
      </div>
    </div>
  );
};
