const DEV = import.meta.env.DEV

function log(initiator: string, message: unknown) {
    if (DEV) console.log(`LOG ${initiator} -`, message)
}

function warnLog(initiator: string, message: unknown) {
    if (DEV) console.warn(`WARN ${initiator} -`, message)
}

function errorLog(initiator: string, message: unknown) {
    if (DEV) console.log(`ERROR ${initiator} -`, message)
}

const info = {
    log,
    warn: warnLog,
    error: errorLog
}

export default info
