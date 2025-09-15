from typing import List, Optional, Dict, Any, MutableSequence
import logging
import sys
import threading

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    stream=sys.stdout,
)
logger = logging.getLogger(__name__)
DEFAULT_ENCODING = "utf-8"
LOG_FORMAT = "%(asctime)s - %(levelname)s - %(message)s"
MIN_MONSTER_BYTES = 1


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


# -------------------------- 字节工具类 --------------------------
# class ByteUtil:
#     """字节处理工具类，线程安全实现"""
#     BYTE_LEN: int = 1
#     SHORT_LEN: int = 2
#     INT_LEN: int = 4
#     LONG_LEN: int = 8
#
#     # 线程安全缓冲区
#     _int_bytes: bytearray = bytearray(4)
#     _short_bytes: bytearray = bytearray(2)
#
#     # 线程锁
#     _int_lock = threading.Lock()
#     _short_lock = threading.Lock()
#
#     @staticmethod
#     def read_file_to_bytes(file_path: str) -> bytes:
#         """读取文件为字节数组"""
#         try:
#             with open(file_path, "rb") as f:
#                 data = f.read()
#             logger.info(f"成功读取文件: {file_path}，大小: {len(data)}字节")
#             return data
#         except Exception as e:
#             logger.error(f"读取文件失败: {str(e)}")
#             raise
#
#     @staticmethod
#     def read_unsigned_short(bytes_data: bytes, byte_index: MutableSequence[int]) -> int:
#         """读取无符号短整数（little-endian）"""
#         if byte_index[0] + ByteUtil.SHORT_LEN > len(bytes_data):
#             raise IndexError(f"字节不足，需要{ByteUtil.SHORT_LEN}字节")
#
#         with ByteUtil._short_lock:
#             ByteUtil._short_bytes[0] = bytes_data[byte_index[0]]
#             ByteUtil._short_bytes[1] = bytes_data[byte_index[0] + 1]
#             result = int.from_bytes(ByteUtil._short_bytes, byteorder="little", signed=False)
#             byte_index[0] += ByteUtil.SHORT_LEN
#             return result
#
#     @staticmethod
#     def read_signed_int(bytes_data: bytes, byte_index: MutableSequence[int]) -> int:
#         """读取有符号整数（little-endian）"""
#         if byte_index[0] + ByteUtil.INT_LEN > len(bytes_data):
#             raise IndexError(f"字节不足，需要{ByteUtil.INT_LEN}字节")
#
#         with ByteUtil._int_lock:
#             for i in range(ByteUtil.INT_LEN):
#                 ByteUtil._int_bytes[i] = bytes_data[byte_index[0] + i]
#             result = int.from_bytes(ByteUtil._int_bytes, byteorder="little", signed=True)
#             byte_index[0] += ByteUtil.INT_LEN
#             return result
#
#     @staticmethod
#     def read_boolean(bytes_data: bytes, byte_index: MutableSequence[int]) -> bool:
#         """读取布尔值（1字节）"""
#         if byte_index[0] + ByteUtil.BYTE_LEN > len(bytes_data):
#             raise IndexError(f"字节不足，需要{ByteUtil.BYTE_LEN}字节")
#
#         result = bytes_data[byte_index[0]] != 0
#         byte_index[0] += ByteUtil.BYTE_LEN
#         return result
#
#     @staticmethod
#     def read_utf_byte(bytes_data: bytes, length: int, byte_index: MutableSequence[int],
#                       encoding: str = DEFAULT_ENCODING) -> str:
#         """读取指定长度的UTF字符串"""
#         if byte_index[0] + length > len(bytes_data):
#             raise IndexError(f"字符串字节不足，需要{length}字节")
#
#         utf_bytes = bytes_data[byte_index[0]:byte_index[0] + length]
#         byte_index[0] += length
#
#         try:
#             return utf_bytes.decode(encoding, errors="strict")
#         except UnicodeDecodeError:
#             logger.warning(f"使用{encoding}解码失败，尝试utf-8替换模式")
#             return utf_bytes.decode("utf-8", errors="replace").replace("\x00", "")
class IBuffInfo:
    """对应C#的IBuffInfo类，存储buff配置信息，带有增强的解析和调试功能"""

    def __init__(self):
        self.desc: str = ""  # 对应C#的Desc
        self.tag: str = ""  # 对应C#的Tag
        self.desc_tag: str = ""  # 对应C#的desc_tag
        self.icon: Optional[List[int]] = None  # 对应C#的icon数组
        self.icontype: int = 0  # 对应C#的icontype
        self.id: int = 0  # 对应C#的id
        self.parse_metadata: Dict[str, Any] = {}  # 存储解析过程的元数据，用于调试

    def parse(
        self,
        bytes_data: bytes,
        byte_index: List[int],
        encoding: str = "utf-8",
        debug: bool = False,
    ) -> None:
        """
        解析字节数组，填充当前实例的属性（与C# Parse方法逻辑一致）
        增强版：支持指定编码、调试日志和元数据记录
        :param bytes_data: 完整的字节数组
        :param byte_index: 引用类型的索引（用列表包裹，模拟C#的ref int）
        :param encoding: 字符串解码使用的编码
        :param debug: 是否输出调试日志
        """
        # 记录初始索引位置
        initial_index = byte_index[0]
        self.parse_metadata["start_index"] = initial_index
        if debug:
            logger.debug(f"开始解析IBuffInfo，初始索引: {initial_index}")
        try:
            # 1. 读取Desc：先读长度（unsigned short），再读对应长度的字符串
            desc_start = byte_index[0]
            desc_len = ByteUtil.read_unsigned_short(bytes_data, byte_index)
            self.desc = ByteUtil.read_utf_byte(
                bytes_data, desc_len, byte_index, encoding
            )
            if debug:
                logger.debug(
                    f"解析Desc: 长度={desc_len}, 内容={self.desc!r}, 索引变化: {desc_start}→{byte_index[0]}"
                )
            self.parse_metadata["desc"] = {
                "start": desc_start,
                "length": desc_len,
                "end": byte_index[0],
            }
            # 2. 读取Tag
            tag_start = byte_index[0]
            tag_len = ByteUtil.read_unsigned_short(bytes_data, byte_index)
            self.tag = ByteUtil.read_utf_byte(bytes_data, tag_len, byte_index, encoding)
            if debug:
                logger.debug(
                    f"解析Tag: 长度={tag_len}, 内容={self.tag!r}, 索引变化: {tag_start}→{byte_index[0]}"
                )
            self.parse_metadata["tag"] = {
                "start": tag_start,
                "length": tag_len,
                "end": byte_index[0],
            }
            # 3. 读取desc_tag
            desc_tag_start = byte_index[0]
            desc_tag_len = ByteUtil.read_unsigned_short(bytes_data, byte_index)
            self.desc_tag = ByteUtil.read_utf_byte(
                bytes_data, desc_tag_len, byte_index, encoding
            )
            # 清理可能的空字符
            self.desc_tag = self.desc_tag.replace("\x00", "")
            if debug:
                logger.debug(
                    f"解析desc_tag: 长度={desc_tag_len}, 内容={self.desc_tag!r}, 索引变化: {desc_tag_start}→{byte_index[0]}"
                )
            self.parse_metadata["desc_tag"] = {
                "start": desc_tag_start,
                "length": desc_tag_len,
                "end": byte_index[0],
            }
            # 4. 读取icon数组（条件性：先判断bool值）
            icon_start = byte_index[0]
            has_icon = ByteUtil.read_boolean(bytes_data, byte_index)
            self.parse_metadata["has_icon"] = has_icon
            if has_icon:
                icon_count = ByteUtil.read_signed_int(bytes_data, byte_index)
                self.icon = []
                for i in range(icon_count):
                    icon_id = ByteUtil.read_signed_int(bytes_data, byte_index)
                    self.icon.append(icon_id)
                if debug:
                    logger.debug(
                        f"解析icon数组: 元素数量={icon_count}, 索引变化: {icon_start}→{byte_index[0]}"
                    )
                self.parse_metadata["icon"] = {
                    "start": icon_start,
                    "count": icon_count,
                    "end": byte_index[0],
                }
            else:
                self.icon = None
                if debug:
                    logger.debug(f"无icon数组, 索引变化: {icon_start}→{byte_index[0]}")
                self.parse_metadata["icon"] = {
                    "start": icon_start,
                    "count": 0,
                    "end": byte_index[0],
                }
            # 5. 读取icontype（signed int）
            icontype_start = byte_index[0]
            self.icontype = ByteUtil.read_signed_int(bytes_data, byte_index)
            if debug:
                logger.debug(
                    f"解析icontype: 值={self.icontype}, 索引变化: {icontype_start}→{byte_index[0]}"
                )
            self.parse_metadata["icontype"] = {
                "start": icontype_start,
                "end": byte_index[0],
            }
            # 6. 读取id（signed int，buff唯一标识）
            id_start = byte_index[0]
            self.id = ByteUtil.read_signed_int(bytes_data, byte_index)
            if debug:
                logger.debug(
                    f"解析id: 值={self.id}, 索引变化: {id_start}→{byte_index[0]}"
                )
            self.parse_metadata["id"] = {"start": id_start, "end": byte_index[0]}
            # 记录总解析字节数
            self.parse_metadata["total_bytes_parsed"] = byte_index[0] - initial_index
            self.parse_metadata["end_index"] = byte_index[0]
        except Exception as e:
            logger.error(f"解析IBuffInfo时出错 (索引: {byte_index[0]}): {str(e)}")
            self.parse_metadata["error"] = str(e)
            raise  # 重新抛出异常，让调用者处理

    def is_valid(self, check_empty: bool = False) -> bool:
        """
        验证当前buff信息是否有效
        :param check_empty: 是否检查字段为空
        :return: 布尔值表示是否有效
        """
        # 基本验证：id必须存在
        if self.id == 0:
            return False
        # 如果需要检查空字段
        if check_empty:
            # 至少有一个描述性字段不为空
            if not self.desc and not self.tag and not self.desc_tag:
                return False
        return True

    def to_dict(self) -> Dict[str, Any]:
        """转换为字典，方便序列化和输出"""
        return {
            "id": self.id,
            "desc": self.desc,
            "tag": self.tag,
            "desc_tag": self.desc_tag,
            "icontype": self.icontype,
            "icon": self.icon,
            "is_valid": self.is_valid(),
        }

    def __str__(self) -> str:
        """方便打印查看解析结果"""
        return (
            f"IBuffInfo(id={self.id}, desc={self.desc[:50]!r}{'...' if len(self.desc) > 50 else ''}, "
            f"tag={self.tag!r}, desc_tag={self.desc_tag!r}, icontype={self.icontype}, "
            f"icon={'有数据' if self.icon else 'None'}, "
            f"有效={self.is_valid()})"
        )

    def __repr__(self) -> str:
        return self.__str__()


def parse_buff_file(
    file_path: str,
    encoding: str = "utf-8",
    max_parse: Optional[int] = None,
    debug: bool = False,
) -> List[IBuffInfo]:
    """
    解析整个buff文件并返回所有IBuffInfo对象的列表
    :param file_path: 文件路径
    :param encoding: 字符串解码使用的编码
    :param max_parse: 最大解析数量，None表示解析全部
    :param debug: 是否输出调试日志
    :return: IBuffInfo对象列表
    """
    buff_list = []
    try:
        # 读取整个文件为字节数组
        all_bytes = ByteUtil.read_file_to_bytes(file_path)
        byte_index = [0]  # 用列表模拟引用传递的索引
        total_bytes = len(all_bytes)
        logger.info(f"成功读取文件: {file_path}, 总字节数: {total_bytes}")
        # 读取buff总数
        has_buff = ByteUtil.read_boolean(all_bytes, byte_index)
        if not has_buff:
            logger.info("文件中没有buff数据")
            return buff_list
        buff_count = ByteUtil.read_signed_int(all_bytes, byte_index)
        logger.info(f"BUFF总数: {buff_count}, 将解析最多{max_parse or '全部'}个")
        # 计算实际需要解析的数量
        parse_count = min(buff_count, max_parse) if max_parse else buff_count
        # 循环解析每个buff
        for i in range(parse_count):
            # 检查是否还有足够的字节可供解析
            if byte_index[0] + 10 > total_bytes:  # 至少需要10字节才能解析一个基本的buff
                logger.warning(
                    f"字节不足，提前结束解析。已解析{len(buff_list)}个，当前索引: {byte_index[0]}"
                )
                break
            try:
                buff_info = IBuffInfo()
                buff_info.parse(all_bytes, byte_index, encoding=encoding, debug=debug)
                buff_list.append(buff_info)
                # 定期输出进度
                if (i + 1) % 100 == 0:
                    logger.info(
                        f"已解析 {i + 1}/{parse_count} 个精灵数据，当前索引: {byte_index[0]}"
                    )
            except Exception as e:
                logger.error(
                    f"解析第{i + 1}个精灵数据时出错: {str(e)}，将跳过该个精灵数据"
                )
                # 尝试恢复：向前移动一个字节继续解析（可能无效，但值得尝试）
                if byte_index[0] < total_bytes:
                    byte_index[0] += 1
                continue
        logger.info(f"解析完成，共解析{len(buff_list)}个精灵数据")
        return buff_list
    except Exception as e:
        logger.error(f"解析文件时发生错误: {str(e)}")
        raise


# -------------------------- 技能相关类 --------------------------
class ISpMoveItem:
    """特殊技能项（对应C#的ISpMoveItem）"""

    def __init__(self):
        self.id: int = 0  # 技能ID
        self.rec: int = 0  # 记录参数
        self.tag: int = 0  # 小写tag参数
        self.Tag: int = 0  # 大写Tag参数（保持C#原命名区分）
        self.parse_metadata: Dict[str, Any] = {}

    def parse(
        self, bytes_data: bytes, byte_index: MutableSequence[int], debug: bool = False
    ) -> None:
        """解析特殊技能数据（严格遵循C#解析顺序）"""
        start_index = byte_index[0]
        self.parse_metadata["start_index"] = start_index
        if debug:
            logger.debug(f"解析ISpMoveItem，起始索引: {start_index}")
        try:
            # 按C#顺序解析：ID → Rec → Tag → tag
            self.id = ByteUtil.read_signed_int(bytes_data, byte_index)
            self.rec = ByteUtil.read_signed_int(bytes_data, byte_index)
            self.Tag = ByteUtil.read_signed_int(bytes_data, byte_index)
            self.tag = ByteUtil.read_signed_int(bytes_data, byte_index)
            self.parse_metadata["end_index"] = byte_index[0]
            self.parse_metadata["total_bytes"] = byte_index[0] - start_index
            if debug:
                logger.debug(
                    f"解析完成: ID={self.id}, Rec={self.rec}, Tag={self.Tag}, tag={self.tag}"
                )
        except Exception as e:
            err_msg = f"解析ISpMoveItem失败: {str(e)}"
            logger.error(err_msg)
            self.parse_metadata["error"] = err_msg
            raise

    def to_dict(self) -> Dict[str, Any]:
        """转换为字典（保留大小写区分的字段）"""
        return {
            "ID": self.id,
            "Rec": self.rec,
            "Tag": self.Tag,
            "tag": self.tag,  # 保留小写tag，与C#一致
        }


class IMoveItem:
    """基础技能项（对应C#的IMoveItem）"""

    def __init__(self):
        self.id: int = 0  # 技能ID
        self.learning_lv: int = 0  # 学习等级
        self.rec: int = 0  # 记录参数
        self.tag: int = 0  # 标签参数
        self.parse_metadata: Dict[str, Any] = {}

    def parse(
        self, bytes_data: bytes, byte_index: MutableSequence[int], debug: bool = False
    ) -> None:
        """解析基础技能数据（严格遵循C#解析顺序）"""
        start_index = byte_index[0]
        self.parse_metadata["start_index"] = start_index
        if debug:
            logger.debug(f"解析IMoveItem，起始索引: {start_index}")
        try:
            # 按C#顺序解析：ID → LearningLv → Rec → Tag
            self.id = ByteUtil.read_signed_int(bytes_data, byte_index)
            self.learning_lv = ByteUtil.read_signed_int(bytes_data, byte_index)
            self.rec = ByteUtil.read_signed_int(bytes_data, byte_index)
            self.tag = ByteUtil.read_signed_int(bytes_data, byte_index)
            self.parse_metadata["end_index"] = byte_index[0]
            self.parse_metadata["total_bytes"] = byte_index[0] - start_index
            if debug:
                logger.debug(f"解析完成: ID={self.id}, 学习等级={self.learning_lv}")
        except Exception as e:
            err_msg = f"解析IMoveItem失败: {str(e)}"
            logger.error(err_msg)
            self.parse_metadata["error"] = err_msg
            raise

    def to_dict(self) -> Dict[str, Any]:
        """转换为字典"""
        return {
            "ID": self.id,
            "LearningLv": self.learning_lv,
            "Rec": self.rec,
            "Tag": self.tag,
        }


class ILearnableMoves:
    """技能学习列表（对应C#的ILearnableMoves）"""

    def __init__(self):
        self.adv_move: Optional[List[ISpMoveItem]] = None  # 高级技能
        self.move: Optional[List[IMoveItem]] = None  # 普通技能
        self.sp_move: Optional[List[ISpMoveItem]] = None  # 特殊技能
        self.parse_metadata: Dict[str, Any] = {}

    def parse(
        self, bytes_data: bytes, byte_index: MutableSequence[int], debug: bool = False
    ) -> None:
        """解析技能列表（严格遵循C#解析顺序）"""
        start_index = byte_index[0]
        self.parse_metadata["start_index"] = start_index
        if debug:
            logger.debug(f"解析ILearnableMoves，起始索引: {start_index}")
        try:
            # 1. 解析AdvMove数组
            has_adv_move = ByteUtil.read_boolean(bytes_data, byte_index)
            self.parse_metadata["has_adv_move"] = has_adv_move
            if has_adv_move:
                count = ByteUtil.read_signed_int(bytes_data, byte_index)
                self.adv_move = []
                for i in range(count):
                    move = ISpMoveItem()
                    move.parse(bytes_data, byte_index, debug)
                    self.adv_move.append(move)
                if debug:
                    logger.debug(f"解析AdvMove: {count}个技能")
            # 2. 解析Move数组
            has_move = ByteUtil.read_boolean(bytes_data, byte_index)
            self.parse_metadata["has_move"] = has_move
            if has_move:
                count = ByteUtil.read_signed_int(bytes_data, byte_index)
                self.move = []
                for i in range(count):
                    move = IMoveItem()
                    move.parse(bytes_data, byte_index, debug)
                    self.move.append(move)
                if debug:
                    logger.debug(f"解析Move: {count}个技能")
            # 3. 解析SpMove数组
            has_sp_move = ByteUtil.read_boolean(bytes_data, byte_index)
            self.parse_metadata["has_sp_move"] = has_sp_move
            if has_sp_move:
                count = ByteUtil.read_signed_int(bytes_data, byte_index)
                self.sp_move = []
                for i in range(count):
                    move = ISpMoveItem()
                    move.parse(bytes_data, byte_index, debug)
                    self.sp_move.append(move)
                if debug:
                    logger.debug(f"解析SpMove: {count}个技能")
            self.parse_metadata["end_index"] = byte_index[0]
            self.parse_metadata["total_bytes"] = byte_index[0] - start_index
        except Exception as e:
            err_msg = f"解析ILearnableMoves失败: {str(e)}"
            logger.error(err_msg)
            self.parse_metadata["error"] = err_msg
            raise

    def to_dict(self) -> Dict[str, Any]:
        """转换为字典"""
        result = {}
        if self.adv_move:
            result["AdvMove"] = [m.to_dict() for m in self.adv_move]
        if self.move:
            result["Move"] = [m.to_dict() for m in self.move]
        if self.sp_move:
            result["SpMove"] = [m.to_dict() for m in self.sp_move]
        return result


class MonstersInfo:
    def __init__(self):
        # 1. 技能相关属性（引用类型：LearnableMoves/MoveItem）
        self.def_name: str = ""  # 配置名称（唯一标识）
        self.extra_moves: Optional[ILearnableMoves] = None  # 额外技能组
        self.learnable_moves: Optional[ILearnableMoves] = None  # 可学习技能组
        self.move: Optional[IMoveItem] = None  # 当前携带技能
        self.show_extra_moves: Optional[ILearnableMoves] = None  # 展示用额外技能组
        self.sp_extra_moves: Optional[ILearnableMoves] = None  # 特殊额外技能组
        # 2. 战斗基础属性
        self.atk: int = 0  # 攻击力
        self.character_attr_param: int = 0  # 角色属性参数
        self.combo: int = 0  # 连击数
        self.defense: int = 0  # 防御力（避开Python关键字def）
        self.hp: int = 0  # 生命值
        self.sp_atk: int = 0  # 特殊攻击力
        self.sp_def: int = 0  # 特殊防御力
        self.spd: int = 0  # 速度
        self.support: int = 0  # 支援值
        # 3. 进化相关属性
        self.evolves_to: int = 0  # 进化后怪物ID
        self.evolv_flag: int = 0  # 进化标记（0=不可进化）
        self.evolving_lv: int = 0  # 进化等级
        # 4. 标识与功能属性
        self.id: int = 0  # 怪物配置ID（核心唯一标识）
        self.real_id: int = 0  # 怪物实际ID（可能与配置ID不同）
        self.pet_class: int = 0  # 宠物类别（如普通/稀有）
        self.type: int = 0  # 怪物属性类型（如火/水/风）
        self.vip: int = 0  # VIP专属标记（0=非VIP）
        self.gender: int = 0  # 性别（0=无性别，1=公，2=母）
        self.free_forbidden: int = 0  # 免费获取限制（0=允许免费）
        self.transform: int = 0  # 变身能力标记（0=不可变身）
        self.is_fly_pet: int = 0  # 飞行宠物标记（0=否）
        self.is_ride_pet: int = 0  # 坐骑宠物标记（0=否）
        # 5. 解析元数据（调试/追溯用）
        self.parse_metadata: Dict[str, Any] = {}

    def parse(
        self,
        bytes_data: bytes,
        byte_index: MutableSequence[int],
        encoding: str = "utf-8",
        debug: bool = False,
    ) -> None:
        # 记录初始索引位置
        start_index = byte_index[0]
        self.parse_metadata["start_index"] = start_index
        if debug:
            logger.debug(f"开始解析Monsters，初始索引: {start_index}")
        try:
            # 1. 战斗属性解析
            self.atk = ByteUtil.read_signed_int(bytes_data, byte_index)
            self.character_attr_param = ByteUtil.read_signed_int(bytes_data, byte_index)
            self.combo = ByteUtil.read_signed_int(bytes_data, byte_index)
            self.defense = ByteUtil.read_signed_int(bytes_data, byte_index)
            print(self.atk)
            print(self.character_attr_param)
            print(self.combo)
            print(self.defense)
            # 2. 名称解析
            name_len = ByteUtil.read_unsigned_short(bytes_data, byte_index)
            self.def_name = ByteUtil.read_utf_byte(
                bytes_data, name_len, byte_index, encoding
            )
            print(self.def_name)
            # 3. 进化属性解析
            self.evolv_flag = ByteUtil.read_signed_int(bytes_data, byte_index)
            self.evolves_to = ByteUtil.read_signed_int(bytes_data, byte_index)
            self.evolving_lv = ByteUtil.read_signed_int(bytes_data, byte_index)
            # 4. 额外技能解析
            has_extra_moves = ByteUtil.read_boolean(bytes_data, byte_index)
            if has_extra_moves:
                self.extra_moves = ILearnableMoves()
                self.extra_moves.parse(bytes_data, byte_index, debug)
            # 5. 其他基础属性
            self.free_forbidden = ByteUtil.read_signed_int(bytes_data, byte_index)
            self.gender = ByteUtil.read_signed_int(bytes_data, byte_index)
            self.hp = ByteUtil.read_signed_int(bytes_data, byte_index)
            self.id = ByteUtil.read_signed_int(bytes_data, byte_index)
            # 6. 可学习技能解析
            has_learnable_moves = ByteUtil.read_boolean(bytes_data, byte_index)
            if has_learnable_moves:
                self.learnable_moves = ILearnableMoves()
                self.learnable_moves.parse(bytes_data, byte_index, debug)
            # 7. 单个技能解析
            has_move = ByteUtil.read_boolean(bytes_data, byte_index)
            if has_move:
                self.move = IMoveItem()
                self.move.parse(bytes_data, byte_index, debug)
            # 8. 更多属性解析
            self.pet_class = ByteUtil.read_signed_int(bytes_data, byte_index)
            self.real_id = ByteUtil.read_signed_int(bytes_data, byte_index)
            # 9. 展示用技能解析
            has_show_extra_moves = ByteUtil.read_boolean(bytes_data, byte_index)
            if has_show_extra_moves:
                self.show_extra_moves = ILearnableMoves()
                self.show_extra_moves.parse(bytes_data, byte_index, debug)
            # 10. 特殊属性解析
            self.sp_atk = ByteUtil.read_signed_int(bytes_data, byte_index)
            self.sp_def = ByteUtil.read_signed_int(bytes_data, byte_index)
            # 11. 特殊额外技能解析
            has_sp_extra_moves = ByteUtil.read_boolean(bytes_data, byte_index)
            if has_sp_extra_moves:
                self.sp_extra_moves = ILearnableMoves()
                self.sp_extra_moves.parse(bytes_data, byte_index, debug)
            # 12. 剩余属性解析
            self.spd = ByteUtil.read_signed_int(bytes_data, byte_index)
            self.support = ByteUtil.read_signed_int(bytes_data, byte_index)
            self.transform = ByteUtil.read_signed_int(bytes_data, byte_index)
            self.type = ByteUtil.read_signed_int(bytes_data, byte_index)
            self.vip = ByteUtil.read_signed_int(bytes_data, byte_index)
            self.is_fly_pet = ByteUtil.read_signed_int(bytes_data, byte_index)
            self.is_ride_pet = ByteUtil.read_signed_int(bytes_data, byte_index)
            # 解析元数据
            self.parse_metadata["end_index"] = byte_index[0]
            self.parse_metadata["total_bytes"] = byte_index[0] - start_index
            if debug:
                logger.debug(f"解析完成: {self.def_name} (ID: {self.id})")
        except Exception as e:
            err_msg = f"解析MonsterItem失败: {str(e)}"
            logger.error(err_msg)
            self.parse_metadata["error"] = err_msg
            raise

    def is_valid(self, check_empty: bool = False) -> bool:
        """
        验证当前buff信息是否有效
        :param check_empty: 是否检查字段为空
        :return: 布尔值表示是否有效
        """
        # 基本验证：id必须存在
        if self.id == 0:
            return False
        # 如果需要检查空字段
        if check_empty:
            # 至少有一个描述性字段不为空
            if not self.desc and not self.tag and not self.desc_tag:
                return False
        return True

    def to_dict(self) -> Dict[str, Any]:
        """转换为字典，生成最终JSON结构"""
        result = {
            "ID": self.id,
            "RealID": self.real_id,
            "DefName": self.def_name,
            "Type": self.type,
            "PetClass": self.pet_class,
            "Gender": self.gender,
            "VIP": self.vip,
            "FreeForbidden": self.free_forbidden,
            "Transform": self.transform,
            "IsFlyPet": bool(self.is_fly_pet),
            "IsRidePet": bool(self.is_ride_pet),
            "Atk": self.atk,
            "Def": self.defense,
            "HP": self.hp,
            "SpAtk": self.sp_atk,
            "SpDef": self.sp_def,
            "Spd": self.spd,
            "Combo": self.combo,
            "Support": self.support,
            "CharacterAttrParam": self.character_attr_param,
            "EvolvesTo": self.evolves_to,
            "EvolvFlag": self.evolv_flag,
            "EvolvingLv": self.evolving_lv,
        }
        # 添加技能数据
        if self.learnable_moves:
            result["LearnableMoves"] = self.learnable_moves.to_dict()
        if self.extra_moves:
            result["ExtraMoves"] = self.extra_moves.to_dict()
        if self.show_extra_moves:
            result["ShowExtraMoves"] = self.show_extra_moves.to_dict()
        if self.sp_extra_moves:
            result["SpExtraMoves"] = self.sp_extra_moves.to_dict()
        if self.move:
            result["Move"] = self.move.to_dict()
        return result

    def __str__(self) -> str:
        return f"MonsterItem(ID={self.id}, DefName={self.def_name}, Type={self.type})"

    __repr__ = __str__


def parse_monster_file(
    file_path: str,
    encoding: str = "utf-8",
    max_parse: Optional[int] = None,
    debug: bool = False,
) -> List[MonstersInfo]:
    monster_list = []
    try:
        # 读取整个文件为字节数组
        all_bytes = ByteUtil.read_file_to_bytes(file_path)
        byte_index = [0]  # 用列表模拟引用传递的索引
        total_bytes = len(all_bytes)
        logger.info(f"成功读取文件: {file_path}, 总字节数: {total_bytes}")
        # 读取buff总数
        has_buff = ByteUtil.read_boolean(all_bytes, byte_index)
        print(byte_index)
        if not has_buff:
            logger.info("文件中没有buff数据")
            return monster_list
        has = ByteUtil.read_boolean(all_bytes, byte_index)
        monster_count = ByteUtil.read_signed_int(all_bytes, byte_index)
        print(byte_index)
        logger.info(f"精灵总数: {monster_count}, 将解析最多{max_parse or '全部'}个")
        # # 读取buff总数
        # has_buff = ByteUtil.read_boolean(all_bytes, byte_index)
        # if not has_buff:
        #     logger.info("文件中没有buff数据")
        #     return buff_list
        #
        # buff_count = ByteUtil.read_signed_int(all_bytes, byte_index)
        # logger.info(f"BUFF总数: {buff_count}, 将解析最多{max_parse or '全部'}个")
        #
        # # 计算实际需要解析的数量
        # parse_count = min(buff_count, max_parse) if max_parse else buff_count
        # 循环解析每个buff
        for i in range(monster_count):
            # 检查是否还有足够的字节可供解析
            if byte_index[0] + 10 > total_bytes:  # 至少需要10字节才能解析一个基本的buff
                # logger.warning(f"字节不足，提前结束解析。已解析{len(buff_list)}个，当前索引: {byte_index[0]}")
                # break
                pass
            try:
                monsters = MonstersInfo()
                monsters.parse(all_bytes, byte_index, encoding=encoding, debug=debug)
                monster_list.append(monsters)
                # buff_info = IBuffInfo()
                # buff_info.parse(all_bytes, byte_index, encoding=encoding, debug=debug)
                # buff_list.append(buff_info)
                # 定期输出进度
                if (i + 1) % 100 == 0:
                    logger.info(
                        f"已解析 {i + 1}/{monster_count} 个精灵数据，当前索引: {byte_index[0]}"
                    )
            except Exception as e:
                logger.error(
                    f"解析第{i + 1}个精灵数据时出错: {str(e)}，将跳过该个精灵数据"
                )
                # 尝试恢复：向前移动一个字节继续解析（可能无效，但值得尝试）
                if byte_index[0] < total_bytes:
                    byte_index[0] += 1
                continue
        logger.info(f"解析完成，共解析{len(monster_list)}个精灵数据")
        return monster_list
    except Exception as e:
        logger.error(f"解析文件时发生错误: {str(e)}")
        raise


# -------------------------- 使用示例 --------------------------
# 完美可以用20250913
if __name__ == "__main__":
    # 示例：解析buff.bytes文件中的所有IBuffInfo
    file_path = ".\\ConfigPackage\\export\\monsters.bytes"
    try:
        # 尝试不同的编码解决乱码问题，常见选项: 'utf-8', 'gbk', 'utf-16'
        buffs = parse_monster_file(
            file_path,
            encoding="utf-8",  # 尝试使用gbk编码解决乱码
            max_parse=None,  # 解析全部buff
            debug=False,  # 调试模式，会输出详细日志
        )
        # 输出统计信息
        valid_count = sum(1 for buff in buffs if buff.is_valid())
        logger.info(f"有效精灵数量: {valid_count}/{len(buffs)}")
        # 打印前10个buff的信息
        print("\n前10个精灵信息:")
        for i, buff in enumerate(buffs[:10]):
            print(f"第{i + 1}个精灵信息: {buff}")
        # 打印无效的buff示例（如果有）
        invalid_buffs = [b for b in buffs if not b.is_valid()]
        if invalid_buffs:
            print("\n无效的buff示例:")
            for i, buff in enumerate(invalid_buffs[:5]):
                print(f"第{i + 1}个无效buff: {buff}")
        # 保存解析结果到文件（可选）
        import json

        with open(
            ".\\json\\monsters.json",
            "w",
            encoding="utf-8",
        ) as f:
            json.dump([b.to_dict() for b in buffs], f, ensure_ascii=False, indent=2)
        logger.info("解析结果已保存到 monsters.json")
    except Exception as e:
        logger.error(f"程序执行出错: {e}")
