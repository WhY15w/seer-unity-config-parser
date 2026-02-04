import UnityPy
import os

base_dir = os.path.dirname(__file__)
config_path = os.path.join(base_dir, "..", "ConfigPackage", "pgame_configs_bytes")
export_dir = os.path.join(base_dir, "..", "ConfigPackage", "export")

env = UnityPy.load(config_path)
for obj in env.objects:
    if obj.type.name == "TextAsset":
        data = obj.read()
        path = os.path.join(export_dir, f"{data.m_Name}.bytes")
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "wb") as f:
            f.write(data.m_Script.encode("utf-8", "surrogateescape"))
