import React from "react";
import { PipelineUI } from "../pipelines/PipelineUI";
import { PipelineToolbar } from "../pipelines/PipelineToolbar";
import PipelineHeader from "../pipelines/PipelineHeader";

const HomePage = () => {
  return (
    <div className="flex flex-col h-full">
      <PipelineHeader />
      <div className="flexoverflow-hidden relative ">
        <PipelineToolbar/>
        <PipelineUI />
      </div>
    </div>
  );
};

export default HomePage;
