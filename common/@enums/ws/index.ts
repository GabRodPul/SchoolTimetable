export enum WsMsgType {
    Connection  = "WSM_CONNECTION",
    TxCreate    = "WSM_TX_CREATE",
    TxDelete    = "WSM_TX_DELETE",
    TxApprove   = "WSM_TX_APPROVE",
    TxDeny      = "WSM_TX_DENY",
}

export enum TxStatus {
    Pending     = "TXS_PENDING",
    Approved    = "TXS_APPROVED",
    Denied      = "TXS_DENIED"
}