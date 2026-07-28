from langgraph.graph import StateGraph
from langgraph.graph import START
from langgraph.graph import END

from app.graph.state import ComplaintState
from app.graph.nodes import (
    extract_node,
    summary_node,
    risk_node,
)

builder = StateGraph(ComplaintState)

builder.add_node(
    "extract",
    extract_node,
)

builder.add_node(
    "summary",
    summary_node,
)

builder.add_node(
    "risk",
    risk_node,
)

builder.add_edge(
    START,
    "extract",
)

builder.add_edge(
    "extract",
    "summary",
)

builder.add_edge(
    "summary",
    "risk",
)

builder.add_edge(
    "risk",
    END,
)

graph = builder.compile()