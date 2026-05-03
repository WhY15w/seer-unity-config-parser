import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IChannelInfo {
  channel: string;
  id: number;
  maintainPopText: string;
}

export interface ChannelConfig {
  data?: IChannelInfo[];
}

const channelInfoSchema: FieldSchema = [
  ["channel", text()],
  ["id", int()],
  ["maintainPopText", text()],
];

export const parseChannelConfig = createSimpleListParser<IChannelInfo, ChannelConfig>({
  name: "channel",
  outputPath: "./json/channel.json",
  dataKey: "data",
  itemSchema: channelInfoSchema,
});
