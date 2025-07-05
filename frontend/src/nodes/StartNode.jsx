
import React from 'react'
import BaseNode from '../components/BaseNode'
import { Position } from 'reactflow';

const StartNode = ({id,data}) => {



  return (
    <BaseNode
    id={id}
    label="Start"
    nodeType={data.nodeType}
    handles={[
        {type:"source",position:Position.Right,idName:"start"}
    ]}
    />
  )
}

export default StartNode;
