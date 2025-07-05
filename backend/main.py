from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/pipelines/parse")
async def parse_pipeline(request: Request):
    data = await request.json()
    nodes = data.get("nodes", [])
    edges = data.get("edges", [])

    num_nodes = len(nodes)
    num_edges = len(edges)

    adj: Dict[str, List[str]] = {node["id"]: [] for node in nodes}
    for edge in edges:
        source = edge["source"]
        target = edge["target"]
        adj[source].append(target)

    def has_cycle(node, visited, rec_stack):
        visited.add(node)
        rec_stack.add(node)

        for neighbor in adj.get(node, []):
            if neighbor not in visited:
                if has_cycle(neighbor, visited, rec_stack):
                    return True
            elif neighbor in rec_stack:
                return True

        rec_stack.remove(node)
        return False

    visited = set()
    is_dag = True

    for node in adj:
        if node not in visited:
            if has_cycle(node, visited, set()):
                is_dag = False
                break


    return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": is_dag}

