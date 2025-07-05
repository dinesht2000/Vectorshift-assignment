import React from 'react'

const PipelineSubmit = async(nodes, edges) => {
 try {
    const response = await fetch("http://localhost:8000/pipelines/parse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nodes, edges }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit pipeline");
    }

    const data = await response.json();

    // Display alert
    alert(
      `Pipeline submitted successfully!\n\nNumber of nodes: ${data.num_nodes}\nNumber of edges: ${data.num_edges}\nIs DAG: ${data.is_dag ? "Yes" : "No"}`
    );
  } catch (error) {
    console.error("Error submitting pipeline:", error);
    alert("Error submitting pipeline: " + error.message);
  }
}

export default PipelineSubmit;


  

