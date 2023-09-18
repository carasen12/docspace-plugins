import { Devices, FilesExst, FilesType, UsersType } from "../../enums";
import { IMessage } from "../utils";

export interface IContextMenuItem {
  key: string;
  label: string;
  icon: string;
  onClick: (id: number) => Promise<IMessage> | IMessage | void;
  withActiveItem?: boolean;
  fileExt?: (FilesExst | string)[];
  fileType?: FilesType[];
  usersTypes?: UsersType[];
  devices?: Devices[];
}
