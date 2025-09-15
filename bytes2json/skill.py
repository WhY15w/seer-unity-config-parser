from typing import List, Optional, Dict, Any, MutableSequence
import logging
import sys
import threading
import json

DEFAULT_ENCODING = "utf-8"
LOG_FORMAT = "%(asctime)s - %(levelname)s - %(message)s"
MIN_MOVE_BYTES = 30
logging.basicConfig(level=logging.INFO, format=LOG_FORMAT, stream=sys.stdout)
logger = logging.getLogger(__name__)


class ByteUtil:
    BYTE_LEN: int = 1
    SHORT_LEN: int = 2
    INT_LEN: int = 4
    LONG_LEN: int = 8
    FLOAT_LEN: int = 4
    DOUBLE_LEN: int = 8
    _int_bytes: bytearray = bytearray(4)
    _short_bytes: bytearray = bytearray(2)
    _long_bytes: bytearray = bytearray(8)
    _float_bytes: bytearray = bytearray(4)
    _double_bytes: bytearray = bytearray(8)
    _int_lock = threading.Lock()
    _short_lock = threading.Lock()
    _long_lock = threading.Lock()
    _float_lock = threading.Lock()
    _double_lock = threading.Lock()

    @staticmethod
    def read_file_to_bytes(file_path: str) -> bytes:
        """读取文件内容为字节数组"""
        try:
            with open(file_path, "rb") as file:
                return file.read()
        except Exception as e:
            logger.error(f"读取文件失败: {str(e)}")
            raise

    @staticmethod
    def read_unsigned_short(bytes_data: bytes, byte_index: List[int]) -> int:
        """读取无符号短整数"""
        if byte_index[0] + ByteUtil.SHORT_LEN > len(bytes_data):
            raise IndexError("字节数据不足，无法读取unsigned short")
        with ByteUtil._short_lock:
            ByteUtil._short_bytes[0] = bytes_data[byte_index[0]]
            ByteUtil._short_bytes[1] = bytes_data[byte_index[0] + 1]
            result = int.from_bytes(
                ByteUtil._short_bytes, byteorder="little", signed=False
            )
            byte_index[0] += ByteUtil.SHORT_LEN
            return result

    @staticmethod
    def read_signed_int(bytes_data: bytes, byte_index: List[int]) -> int:
        """读取有符号整数"""
        if byte_index[0] + ByteUtil.INT_LEN > len(bytes_data):
            raise IndexError("字节数据不足，无法读取signed int")
        with ByteUtil._int_lock:
            for i in range(ByteUtil.INT_LEN):
                ByteUtil._int_bytes[i] = bytes_data[byte_index[0] + i]
            result = int.from_bytes(
                ByteUtil._int_bytes, byteorder="little", signed=True
            )
            byte_index[0] += ByteUtil.INT_LEN
            return result

    @staticmethod
    def read_boolean(bytes_data: bytes, byte_index: List[int]) -> bool:
        """读取布尔值"""
        if byte_index[0] + ByteUtil.BYTE_LEN > len(bytes_data):
            raise IndexError("字节数据不足，无法读取boolean")
        result = bytes_data[byte_index[0]] != 0
        byte_index[0] += ByteUtil.BYTE_LEN
        return result

    @staticmethod
    def read_utf_byte(
        bytes_data: bytes, length: int, start_index: List[int], encoding: str = "utf-8"
    ) -> str:
        """读取UTF字节并解码，支持指定编码"""
        if start_index[0] + length > len(bytes_data):
            raise IndexError("insufficient bytes for UTF string")
        # 截取对应长度的字节
        utf_bytes = bytes_data[start_index[0] : start_index[0] + length]
        start_index[0] += length
        # 尝试多种编码解码，处理乱码问题
        try:
            return utf_bytes.decode(encoding, errors="strict")
        except UnicodeDecodeError:
            logger.warning(f"使用{encoding}解码失败，尝试utf-8替换模式")
            return utf_bytes.decode("utf-8", errors="replace")


# -------------------------- 核心类：IMoveItem（技能详情） --------------------------
class IMoveItem:
    """对应C# core.config.moves.IMoveItem，单个技能的完整配置"""

    def __init__(self):
        # 字符串属性
        self.info: str = ""  # 技能描述
        self.name: str = ""  # 技能名称
        self._text: Optional[str] = None  # 预留（C#中未在当前类定义，按需补充）
        # 数组属性（副作用相关）
        self.friend_side_effect: Optional[List[int]] = None  # 友方副作用ID列表
        self.friend_side_effect_arg: Optional[List[int]] = None  # 友方副作用参数
        self.side_effect: Optional[List[int]] = None  # 敌方副作用ID列表
        self.side_effect_arg: Optional[List[int]] = None  # 敌方副作用参数
        # 基础数值属性
        self.atk_num: int = 0  # 攻击次数
        self.atk_type: int = 0  # 攻击类型（如物理/特殊）
        self.category: int = 0  # 技能类别
        self.id: int = 0  # 技能唯一ID（核心标识）
        self.max_pp: int = 0  # 最大PP值（技能使用次数）
        self.mon_id: int = 0  # 关联怪物ID（专属技能用）
        self.must_hit: int = 0  # 必中标记（0=非必中，1=必中）
        self.ordinary: int = 0  # 普通技能标记（0=特殊，1=普通）
        self.power: int = 0  # 技能威力
        self.priority: int = 0  # 技能优先级（出手顺序）
        self.type: int = 0  # 技能属性（如火/水/风）
        # 解析元数据（调试与追溯）
        self.parse_metadata: Dict[str, Any] = {}

    def parse(
        self,
        bytes_data: bytes,
        byte_index: MutableSequence[int],
        encoding: str = DEFAULT_ENCODING,
        debug: bool = False,
    ) -> None:
        """严格按C# IMoveItem.Parse顺序解析字节数据"""
        start_index = byte_index[0]
        self.parse_metadata["start_index"] = start_index
        self.parse_metadata["steps"] = []  # 记录每步解析详情
        if debug:
            logger.debug(f"开始解析IMoveItem，起始索引: {start_index}")
        try:
            # 1. 攻击相关基础属性
            self.atk_num = ByteUtil.read_signed_int(bytes_data, byte_index)
            self.parse_metadata["steps"].append(
                ("atk_num", start_index, byte_index[0], self.atk_num)
            )
            self.atk_type = ByteUtil.read_signed_int(bytes_data, byte_index)
            self.parse_metadata["steps"].append(
                ("atk_type", byte_index[0] - 4, byte_index[0], self.atk_type)
            )
            self.category = ByteUtil.read_signed_int(bytes_data, byte_index)
            self.parse_metadata["steps"].append(
                ("category", byte_index[0] - 4, byte_index[0], self.category)
            )
            # 2. 友方副作用数组（条件性解析）
            has_friend_se = ByteUtil.read_boolean(bytes_data, byte_index)
            self.parse_metadata["steps"].append(
                ("has_friend_se", byte_index[0] - 1, byte_index[0], has_friend_se)
            )
            if has_friend_se:
                se_count = ByteUtil.read_signed_int(bytes_data, byte_index)
                self.friend_side_effect = [
                    ByteUtil.read_signed_int(bytes_data, byte_index)
                    for _ in range(se_count)
                ]
                self.parse_metadata["steps"].append(
                    (
                        "friend_side_effect",
                        byte_index[0] - se_count * 4 - 4,
                        byte_index[0],
                        f"共{se_count}个元素",
                    )
                )
            else:
                self.friend_side_effect = None
            # 3. 友方副作用参数数组（条件性解析）
            has_friend_se_arg = ByteUtil.read_boolean(bytes_data, byte_index)
            self.parse_metadata["steps"].append(
                (
                    "has_friend_se_arg",
                    byte_index[0] - 1,
                    byte_index[0],
                    has_friend_se_arg,
                )
            )
            if has_friend_se_arg:
                arg_count = ByteUtil.read_signed_int(bytes_data, byte_index)
                self.friend_side_effect_arg = [
                    ByteUtil.read_signed_int(bytes_data, byte_index)
                    for _ in range(arg_count)
                ]
                self.parse_metadata["steps"].append(
                    (
                        "friend_side_effect_arg",
                        byte_index[0] - arg_count * 4 - 4,
                        byte_index[0],
                        f"共{arg_count}个元素",
                    )
                )
            else:
                self.friend_side_effect_arg = None
            # 4. 技能核心标识与基础属性
            self.id = ByteUtil.read_signed_int(bytes_data, byte_index)
            self.parse_metadata["steps"].append(
                ("id", byte_index[0] - 4, byte_index[0], self.id)
            )
            self.max_pp = ByteUtil.read_signed_int(bytes_data, byte_index)
            self.parse_metadata["steps"].append(
                ("max_pp", byte_index[0] - 4, byte_index[0], self.max_pp)
            )
            self.mon_id = ByteUtil.read_signed_int(bytes_data, byte_index)
            self.parse_metadata["steps"].append(
                ("mon_id", byte_index[0] - 4, byte_index[0], self.mon_id)
            )
            self.must_hit = ByteUtil.read_signed_int(bytes_data, byte_index)
            self.parse_metadata["steps"].append(
                ("must_hit", byte_index[0] - 4, byte_index[0], self.must_hit)
            )
            # 5. 技能名称（先读长度再读字符串）
            name_len = ByteUtil.read_unsigned_short(bytes_data, byte_index)
            self.name = ByteUtil.read_utf_byte(
                bytes_data, name_len, byte_index, encoding
            )
            self.parse_metadata["steps"].append(
                ("name", byte_index[0] - name_len - 2, byte_index[0], self.name)
            )
            # 6. 技能威力与优先级
            self.power = ByteUtil.read_signed_int(bytes_data, byte_index)
            self.parse_metadata["steps"].append(
                ("power", byte_index[0] - 4, byte_index[0], self.power)
            )
            self.priority = ByteUtil.read_signed_int(bytes_data, byte_index)
            self.parse_metadata["steps"].append(
                ("priority", byte_index[0] - 4, byte_index[0], self.priority)
            )
            # 7. 敌方副作用数组（条件性解析）
            has_enemy_se = ByteUtil.read_boolean(bytes_data, byte_index)
            self.parse_metadata["steps"].append(
                ("has_enemy_se", byte_index[0] - 1, byte_index[0], has_enemy_se)
            )
            if has_enemy_se:
                se_count = ByteUtil.read_signed_int(bytes_data, byte_index)
                self.side_effect = [
                    ByteUtil.read_signed_int(bytes_data, byte_index)
                    for _ in range(se_count)
                ]
                self.parse_metadata["steps"].append(
                    (
                        "side_effect",
                        byte_index[0] - se_count * 4 - 4,
                        byte_index[0],
                        f"共{se_count}个元素",
                    )
                )
            else:
                self.side_effect = None
            # 8. 敌方副作用参数数组（条件性解析）
            has_enemy_se_arg = ByteUtil.read_boolean(bytes_data, byte_index)
            self.parse_metadata["steps"].append(
                ("has_enemy_se_arg", byte_index[0] - 1, byte_index[0], has_enemy_se_arg)
            )
            if has_enemy_se_arg:
                arg_count = ByteUtil.read_signed_int(bytes_data, byte_index)
                self.side_effect_arg = [
                    ByteUtil.read_signed_int(bytes_data, byte_index)
                    for _ in range(arg_count)
                ]
                self.parse_metadata["steps"].append(
                    (
                        "side_effect_arg",
                        byte_index[0] - arg_count * 4 - 4,
                        byte_index[0],
                        f"共{arg_count}个元素",
                    )
                )
            else:
                self.side_effect_arg = None
            # 9. 技能属性与描述
            self.type = ByteUtil.read_signed_int(bytes_data, byte_index)
            self.parse_metadata["steps"].append(
                ("type", byte_index[0] - 4, byte_index[0], self.type)
            )
            info_len = ByteUtil.read_unsigned_short(bytes_data, byte_index)
            self.info = ByteUtil.read_utf_byte(
                bytes_data, info_len, byte_index, encoding
            )
            self.parse_metadata["steps"].append(
                (
                    "info",
                    byte_index[0] - info_len - 2,
                    byte_index[0],
                    self.info[:50] + "..." if len(self.info) > 50 else self.info,
                )
            )
            # 10. 普通技能标记
            self.ordinary = ByteUtil.read_signed_int(bytes_data, byte_index)
            self.parse_metadata["steps"].append(
                ("ordinary", byte_index[0] - 4, byte_index[0], self.ordinary)
            )
            # 记录解析结果
            self.parse_metadata["end_index"] = byte_index[0]
            self.parse_metadata["total_bytes"] = byte_index[0] - start_index
            if debug:
                logger.debug(
                    f"IMoveItem解析完成: ID={self.id}, 名称={self.name}, 占用字节={self.parse_metadata['total_bytes']}"
                )
        except Exception as e:
            err_msg = f"解析IMoveItem失败（当前索引: {byte_index[0]}）: {str(e)}"
            logger.error(err_msg)
            self.parse_metadata["error"] = err_msg
            self.parse_metadata["end_index"] = byte_index[0]
            raise

    def is_valid(self) -> bool:
        """验证技能有效性：核心ID不为0，名称非空"""
        return self.id != 0 and bool(self.name.strip())

    def to_dict(self) -> Dict[str, Any]:
        """转换为字典（支持JSON序列化，处理数组与None）"""
        return {
            "id": self.id,
            "name": self.name,
            "info": self.info,
            "atk_num": self.atk_num,
            "atk_type": self.atk_type,
            "category": self.category,
            "friend_side_effect": self.friend_side_effect or [],
            "friend_side_effect_arg": self.friend_side_effect_arg or [],
            "side_effect": self.side_effect or [],
            "side_effect_arg": self.side_effect_arg or [],
            "max_pp": self.max_pp,
            "mon_id": self.mon_id,
            "must_hit": self.must_hit,
            "ordinary": self.ordinary,
            "power": self.power,
            "priority": self.priority,
            "type": self.type,
            "is_valid": self.is_valid(),
            "parse_metadata": self.parse_metadata,
        }

    def __str__(self) -> str:
        return f"IMoveItem(ID={self.id}, Name={self.name[:20]!r}, Power={self.power}, Type={self.type})"

    __repr__ = __str__


# -------------------------- 容器类：IMoves（技能列表容器） --------------------------
class IMoves:
    """对应C# core.config.moves.IMoves，技能列表的容器类"""

    def __init__(self):
        self._text: str = ""  # 文本描述（C#原属性，小写开头）
        self.move: Optional[List[IMoveItem]] = None  # 技能列表（IMoveItem数组）
        self.parse_metadata: Dict[str, Any] = {}

    def parse(
        self,
        bytes_data: bytes,
        byte_index: MutableSequence[int],
        encoding: str = DEFAULT_ENCODING,
        debug: bool = False,
    ) -> None:
        """按C# IMoves.Parse顺序解析：先技能列表，再文本"""
        start_index = byte_index[0]
        self.parse_metadata["start_index"] = start_index
        if debug:
            logger.debug(f"开始解析IMoves，起始索引: {start_index}")
        try:
            # 1. 解析技能列表（条件性：先判断是否存在）
            has_move = ByteUtil.read_boolean(bytes_data, byte_index)
            self.parse_metadata["has_move"] = has_move
            if has_move:
                move_count = ByteUtil.read_signed_int(bytes_data, byte_index)
                self.move = []
                for i in range(move_count):
                    move_item = IMoveItem()
                    move_item.parse(bytes_data, byte_index, encoding, debug)
                    self.move.append(move_item)
                if debug:
                    logger.debug(
                        f"解析IMoves: 共{move_count}个技能，已解析{len(self.move)}个"
                    )
            else:
                self.move = None
                if debug:
                    logger.debug(f"IMoves无技能列表数据")
            # 2. 解析_text属性（先读长度再读字符串）
            text_len = ByteUtil.read_unsigned_short(bytes_data, byte_index)
            self._text = ByteUtil.read_utf_byte(
                bytes_data, text_len, byte_index, encoding
            )
            self.parse_metadata["_text_length"] = text_len
            # 记录元数据
            self.parse_metadata["end_index"] = byte_index[0]
            self.parse_metadata["total_bytes"] = byte_index[0] - start_index
            if debug:
                logger.debug(
                    f"IMoves解析完成: _text长度={text_len}, 占用字节={self.parse_metadata['total_bytes']}"
                )
        except Exception as e:
            err_msg = f"解析IMoves失败（索引: {byte_index[0]}）: {str(e)}"
            logger.error(err_msg)
            self.parse_metadata["error"] = err_msg
            raise

    def is_valid(self) -> bool:
        """验证容器有效性：有技能列表或文本非空"""
        has_valid_moves = self.move and any(m.is_valid() for m in self.move)
        has_valid_text = bool(self._text.strip())
        return has_valid_moves or has_valid_text

    def to_dict(self) -> Dict[str, Any]:
        """转换为字典，技能列表转字典列表"""
        return {
            "_text": self._text,
            "move": [item.to_dict() for item in self.move] if self.move else [],
            "is_valid": self.is_valid(),
            "parse_metadata": self.parse_metadata,
        }

    def __str__(self) -> str:
        move_count = len(self.move) if self.move else 0
        return f"IMoves(技能数量={move_count}, _text长度={len(self._text)})"

    __repr__ = __str__


# -------------------------- 根容器类：IMovesTbl（moves配置根表） --------------------------
class IMovesTbl:
    """对应C# core.config.moves.IMovesTbl，moves配置的根容器"""

    def __init__(self):
        self.moves: Optional[IMoves] = None  # 关联IMoves实例
        self.parse_metadata: Dict[str, Any] = {}

    def parse(
        self,
        bytes_data: bytes,
        byte_index: MutableSequence[int],
        encoding: str = DEFAULT_ENCODING,
        debug: bool = False,
    ) -> None:
        """按C# IMovesTbl.Parse逻辑解析：条件性解析IMoves"""
        start_index = byte_index[0]
        self.parse_metadata["start_index"] = start_index
        if debug:
            logger.debug(f"开始解析IMovesTbl，起始索引: {start_index}")
        try:
            # 条件性解析IMoves：先判断是否存在
            has_moves = ByteUtil.read_boolean(bytes_data, byte_index)
            self.parse_metadata["has_moves"] = has_moves
            if has_moves:
                self.moves = IMoves()
                self.moves.parse(bytes_data, byte_index, encoding, debug)
                if debug:
                    logger.debug(f"IMovesTbl解析完成：已加载IMoves数据")
            else:
                self.moves = None
                if debug:
                    logger.debug(f"IMovesTbl无IMoves数据")
            self.parse_metadata["end_index"] = byte_index[0]
            self.parse_metadata["total_bytes"] = byte_index[0] - start_index
        except Exception as e:
            err_msg = f"解析IMovesTbl失败（索引: {byte_index[0]}）: {str(e)}"
            logger.error(err_msg)
            self.parse_metadata["error"] = err_msg
            raise

    def is_valid(self) -> bool:
        """验证根表有效性：关联的IMoves有效"""
        return self.moves and self.moves.is_valid()

    def to_dict(self) -> Dict[str, Any]:
        """转换为字典，关联的IMoves转字典"""
        return {
            "moves": self.moves.to_dict() if self.moves else None,
            "is_valid": self.is_valid(),
            "parse_metadata": self.parse_metadata,
        }

    def __str__(self) -> str:
        moves_status = "已加载" if self.moves else "未加载"
        return f"IMovesTbl(IMoves状态={moves_status}, 有效={self.is_valid()})"

    __repr__ = __str__


# -------------------------- 根接口类：IRootInterface（配置入口） --------------------------
class IRootInterface:
    """对应C# core.config.moves.IRootInterface，moves配置的入口类"""

    def __init__(self):
        self.file_name: str = "moves"  # C#中重写的fileName属性
        self.moves_tbl: Optional[IMovesTbl] = None  # 关联IMovesTbl实例
        self.parse_metadata: Dict[str, Any] = {}

    def parse(
        self,
        bytes_data: bytes,
        byte_index: MutableSequence[int],
        encoding: str = DEFAULT_ENCODING,
        debug: bool = False,
    ) -> None:
        """按C# IRootInterface.Parse逻辑解析：条件性解析IMovesTbl"""
        start_index = byte_index[0]
        self.parse_metadata["start_index"] = start_index
        if debug:
            logger.debug(f"开始解析IRootInterface，起始索引: {start_index}")
        try:
            # 条件性解析IMovesTbl：先判断是否存在
            has_moves_tbl = ByteUtil.read_boolean(bytes_data, byte_index)
            self.parse_metadata["has_moves_tbl"] = has_moves_tbl
            if has_moves_tbl:
                self.moves_tbl = IMovesTbl()
                self.moves_tbl.parse(bytes_data, byte_index, encoding, debug)
                if debug:
                    logger.debug(f"IRootInterface解析完成：已加载IMovesTbl")
            else:
                self.moves_tbl = None
                if debug:
                    logger.debug(f"IRootInterface无IMovesTbl数据")
            self.parse_metadata["end_index"] = byte_index[0]
            self.parse_metadata["total_bytes"] = byte_index[0] - start_index
        except Exception as e:
            err_msg = f"解析IRootInterface失败（索引: {byte_index[0]}）: {str(e)}"
            logger.error(err_msg)
            self.parse_metadata["error"] = err_msg
            raise

    def parse_full(
        self, bytes_data: bytes, encoding: str = DEFAULT_ENCODING, debug: bool = False
    ) -> None:
        """简化调用：直接解析完整字节数组（对应C# override Parse(byte[])）"""
        byte_index = [0]
        self.parse(bytes_data, byte_index, encoding, debug)

    def is_valid(self) -> bool:
        """验证入口有效性：关联的IMovesTbl有效"""
        return self.moves_tbl and self.moves_tbl.is_valid()

    def to_dict(self) -> Dict[str, Any]:
        """转换为字典，用于JSON序列化"""
        return {
            "file_name": self.file_name,
            "moves_tbl": self.moves_tbl.to_dict() if self.moves_tbl else None,
            "is_valid": self.is_valid(),
            "parse_metadata": self.parse_metadata,
        }

    def __str__(self) -> str:
        tbl_status = "已加载" if self.moves_tbl else "未加载"
        return f"IRootInterface(文件名={self.file_name}, IMovesTbl状态={tbl_status}, 有效={self.is_valid()})"

    __repr__ = __str__


# -------------------------- 解析主函数（读取文件→解析→生成JSON） --------------------------
def parse_moves_file(
    file_path: str,
    output_json_path: str = "moves_parsed.json",
    encoding: str = DEFAULT_ENCODING,
    debug: bool = False,
) -> IRootInterface:
    """
    解析moves.bytes文件，返回根接口实例并生成JSON
    :param file_path: moves.bytes文件路径
    :param output_json_path: 输出JSON路径
    :param encoding: 字符串编码
    :param debug: 调试模式
    :return: 解析后的IRootInterface实例
    """
    try:
        # 1. 读取字节文件
        bytes_data = ByteUtil.read_file_to_bytes(file_path)
        logger.info(f"成功读取moves文件，总字节数: {len(bytes_data)}")
        # 2. 初始化根接口并解析
        root = IRootInterface()
        root.parse_full(bytes_data, encoding, debug)
        if not root.is_valid():
            logger.warning("解析结果无效：未加载到有效moves数据")
            return root
        # 3. 生成JSON文件
        with open(output_json_path, "w", encoding="utf-8") as f:
            json.dump(root.to_dict(), f, ensure_ascii=False, indent=2)
        logger.info(f"moves配置已导出到JSON: {output_json_path}")
        # 4. 输出统计信息
        moves_count = (
            len(root.moves_tbl.moves.move)
            if (root.moves_tbl and root.moves_tbl.moves and root.moves_tbl.moves.move)
            else 0
        )
        valid_moves_count = (
            sum(1 for m in root.moves_tbl.moves.move if m.is_valid())
            if moves_count > 0
            else 0
        )
        logger.info(
            f"统计：共解析{moves_count}个技能，其中有效技能{valid_moves_count}个"
        )
        return root
    except Exception as e:
        logger.error(f"解析moves文件失败: {str(e)}", exc_info=True)
        raise


# -------------------------- 使用示例 --------------------------
if __name__ == "__main__":
    # 配置参数（根据实际情况修改）
    INPUT_MOVES_PATH = ".\\ConfigPackage\\export\\moves.bytes"  # 输入moves.bytes路径
    OUTPUT_JSON_PATH = ".\\json\\moves.json"  # 输出JSON路径
    USE_ENCODING = "utf-8"  # 乱码时尝试"gbk"或"utf-16"
    DEBUG_MODE = False  # 调试模式（详细日志）
    try:
        # 执行解析
        moves_root = parse_moves_file(
            file_path=INPUT_MOVES_PATH,
            output_json_path=OUTPUT_JSON_PATH,
            encoding=USE_ENCODING,
            debug=DEBUG_MODE,
        )
        # 打印结果预览
        print("\n=== moves配置解析结果预览 ===")
        print(f"根接口状态: {moves_root}")
        if (
            moves_root.moves_tbl
            and moves_root.moves_tbl.moves
            and moves_root.moves_tbl.moves.move
        ):
            print(f"前5个技能:")
            for i, move in enumerate(moves_root.moves_tbl.moves.move[:5]):
                print(f"  {i + 1}. {move}")
    except Exception as e:
        logger.error(f"程序执行失败: {str(e)}")
        sys.exit(1)
