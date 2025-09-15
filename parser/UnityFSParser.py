import UnityPy
import os

env = UnityPy.load(".\ConfigPackage\pgame_configs_bytes")
for obj in env.objects:
    if obj.type.name == "TextAsset":
        export_dir = ".\ConfigPackage\export"
        data = obj.read()
        path = os.path.join(export_dir, f"{data.m_Name}.bytes")
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "wb") as f:
            f.write(data.m_Script.encode("utf-8", "surrogateescape"))
