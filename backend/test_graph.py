from app.graph.complaint_graph import graph

result = graph.invoke(
    {
        "complaint_text":
        """
        Customer ABC Pharma reported
        broken blister packs
        for batch BT-101.
        """
    }
)

print(result)