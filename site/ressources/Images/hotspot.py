with open("arrow_i.cur", "rb") as f:
    f.seek(10)
    x_bytes = f.read(2)
    hotspot_x = int.from_bytes(x_bytes, "little")

    y_bytes = f.read(2)
    hotspot_y = int.from_bytes(y_bytes, "little")

print(f"Bytes X: {x_bytes.hex()}, Bytes Y: {y_bytes.hex()}")
print(f"Hotspot : X={hotspot_x}, Y={hotspot_y}")

