from app.ai.intent import detect_intent

print(
    detect_intent(
        "Apollo Pharmacy reported broken capsules."
    )
)

print(
    detect_intent(
        "Sorry, batch number is BMX24602."
    )
)

print(
    detect_intent(
        "Upload this complaint PDF."
    )
)