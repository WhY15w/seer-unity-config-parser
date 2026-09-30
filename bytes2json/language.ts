import {
  createSimpleListParser,
  int,
  text,
  type FieldSchema,
} from '../utils/ConfigParserTemplate'

export interface ILanguageInfo {
  id: number
  content: string
  key: string
  showType: number
}

export interface IRootInterface {
  data?: ILanguageInfo[]
}

const languageInfoSchema: FieldSchema = [
  ['content', text()],
  ['id', int()],
  ['key', text()],
  ['showType', int()],
]

export const parseLanguageConfig = createSimpleListParser<
  ILanguageInfo,
  IRootInterface
>({
  name: 'language',
  outputPath: './json/language.json',
  dataKey: 'data',
  itemSchema: languageInfoSchema,
})
