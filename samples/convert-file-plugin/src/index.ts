import {
  IPlugin,
  PluginStatus,
  ISettingsPlugin,
  ISettings,
  IApiPlugin,
  IContextMenuPlugin,
  IContextMenuItem,
  ISeparatorItem,
} from "onlyoffice-docspace-plugin";

import { settingsElements } from "./Settings";
import { convertFileItem } from "./ContextMenuItem";
import convertFile from "./ConvertFile";

class ConvertFilePlugin
  implements IPlugin, ISettingsPlugin, IApiPlugin, IContextMenuPlugin
{
  status: PluginStatus = PluginStatus.pending;

  pluginSettings: ISettings = {} as ISettings;

  origin = "";
  proxy = "";
  prefix = "";

  contextMenuItems: Map<string, IContextMenuItem | ISeparatorItem> = new Map();

  onLoadCallback = async () => {};

  updateStatus = (status: PluginStatus) => {
    this.status = status;
  };

  getStatus = () => {
    return this.status;
  };

  setOnLoadCallback = (callback: () => Promise<void>) => {
    this.onLoadCallback = callback;
  };

  getPluginSettings = () => {
    return this.pluginSettings;
  };

  setPluginSettings = (settings: ISettings): void => {
    this.pluginSettings = settings;
  };

  setOrigin = (origin: string): void => {
    this.origin = origin;
  };

  getOrigin = (): string => {
    return this.origin;
  };

  setProxy = (proxy: string): void => {
    this.proxy = proxy;
  };

  getProxy = (): string => {
    return this.proxy;
  };

  setPrefix = (prefix: string): void => {
    this.prefix = prefix;
  };

  getPrefix = (): string => {
    return this.prefix;
  };

  setAPI = (origin: string, proxy: string, prefix: string): void => {
    this.origin = origin;
    this.proxy = proxy;
    this.prefix = prefix;
  };

  getAPI = (): { origin: string; proxy: string; prefix: string } => {
    return { origin: this.origin, proxy: this.proxy, prefix: this.prefix };
  };

  addContextMenuItem = (item: IContextMenuItem | ISeparatorItem): void => {
    this.contextMenuItems.set(item.key, item);
  };

  getContextMenuItemsKeys = (): string[] => {
    const keys = Array.from(this.contextMenuItems).map(([key, item]) => key);

    return keys;
  };

  getContextMenuItems = (): Map<string, IContextMenuItem | ISeparatorItem> => {
    return this.contextMenuItems;
  };

  updateContextMenuItem = (item: IContextMenuItem | ISeparatorItem): void => {
    this.contextMenuItems.set(item.key, item);
  };
}

const plugin = new ConvertFilePlugin();

plugin.setPluginSettings(settingsElements);

convertFileItem.onClick = convertFile.onConvertFileClick;

plugin.addContextMenuItem(convertFileItem);

plugin.setOnLoadCallback(convertFile.onLoad);

declare global {
  interface Window {
    Plugins: any;
  }
}

window.Plugins.ConvertFilePlugin = plugin || {};

export default plugin;
