import { useState } from "react";
import BaseNode from "../components/BaseNode";
import { Position } from "reactflow";


const DBNode = ({id,data}) => {

    const [connection,setConnection]=useState(data?.connection||"")
    const [conStatus,setConStatus]=useState("Not Connected");

    const handleConnectionChange=(e)=>{
        setConnection(e.target.value);
    };

    const handleConnect=()=>{
        if(connection.trim()===""){
            setConStatus("Connection string empty");
        }
        else{
            setConStatus("Connected successfully");
        }
    };


  return (
    <BaseNode
    id={id}
    label="DB Connection"
    nodeType={data.nodeType}
    handles={[{ type:"source",position:Position.Top,idName:"-input"}]}
    >
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <label>
            DB Link:
            <input type="text" value={connection} onChange={handleConnectionChange} placeholder="mongodb://...."
            style={{width:"100%"}}    
            />
        </label>
        <button
        onClick={handleConnect}
        style={{padding: "4px 8px",
            borderRadius: "4px",
            background: "#FF8C00",
            border: "none",
            cursor: "pointer",}}
        >Connect</button>
        <div style={{ fontSize: "12px", color: conStatus === "Connected successfully" ? "green" : "red" }}>
          {conStatus}
        </div>

    </div>
      
    </BaseNode>
  )
}

export default DBNode;
