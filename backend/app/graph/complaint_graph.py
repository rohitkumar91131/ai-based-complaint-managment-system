from langgraph.graph import StateGraph
from langgraph.graph import START
from langgraph.graph import END

from app.graph.state import ComplaintState
from app.graph.nodes import (
    intent_node,
    intent_router,
    extract_node,
    edit_node,
    document_node,
    summary_node,
    risk_node,
)

builder = StateGraph(ComplaintState)

# ===========================
# Register Nodes
# ===========================

builder.add_node(
    "intent",
    intent_node,
)

builder.add_node(
    "extract",
    extract_node,
)

builder.add_node(
    "edit",
    edit_node,
)

builder.add_node(
    "document",
    document_node,
)

builder.add_node(
    "summary",
    summary_node,
)

builder.add_node(
    "risk",
    risk_node,
)

# ===========================
# Start
# ===========================

builder.add_edge(
    START,
    "intent",
)

# ===========================
# Conditional Routing
# ===========================

builder.add_conditional_edges(
    "intent",
    intent_router,
    {
        "LOG_COMPLAINT": "extract",
        "EDIT_COMPLAINT": "edit",
        "DOCUMENT_EXTRACTION": "document",
    },
)

# ===========================
# Common Flow
# ===========================

builder.add_edge(
    "extract",
    "summary",
)

builder.add_edge(
    "edit",
    "summary",
)

builder.add_edge(
    "document",
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