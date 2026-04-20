import {
  createConfigParser,
  parseBySchema,
  int,
  optionalArray,
  optionalArrayStruct,
  optionalObject,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IFriendshipItem {
  EffectArgs?: number[];
  EffectID?: number[];
  FriendID: number;
  PetID: number;
}

export interface IPetFriends {
  Friendship?: IFriendshipItem[];
}

export interface IPetFriendsRoot {
  PetFriends?: IPetFriends;
}

const friendshipItemSchema: FieldSchema = [
  ["EffectArgs", optionalArray("int")],
  ["EffectID", optionalArray("int")],
  ["FriendID", int()],
  ["PetID", int()],
];

const petFriendsSchema: FieldSchema = [
  ["Friendship", optionalArrayStruct(friendshipItemSchema)],
];

const rootSchema: FieldSchema = [
  ["PetFriends", optionalObject(petFriendsSchema)],
];

export const parsePetFriendsConfig = createConfigParser<IPetFriendsRoot>({
  name: "pet_friends",
  outputPath: "./json/pet_friends.json",
  parse: (reader) => parseBySchema<IPetFriendsRoot>(reader, rootSchema),
});
