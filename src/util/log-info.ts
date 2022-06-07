export type LogMeta = {
    extraMessage ?: string
}
export const SUC_LOG_GETTER =  ( meta ?: LogMeta ) => {
    let endInfo = " finish the model and page compilation... "
    if( meta && meta.extraMessage ) {
        endInfo += '\n'
        endInfo += 'extra message: \n'
        endInfo += meta.extraMessage
    }
    return endInfo
}