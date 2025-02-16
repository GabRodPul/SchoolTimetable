import { WsMsgType as WsMsgType } from "#common/@enums/ws";
import { Id, WarningData } from "../models";

export type WsWarningMsg = { 
    type: WsMsgType,
    data: WarningData & Id
}