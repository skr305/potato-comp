import moment from 'moment';
const timeState = {
    secTimer: moment( new Date() )
}

export const startOnSec = () => {
    timeState.secTimer = moment( new Date() )
}

export const endOnSec = () => {
    return moment( new Date() ).diff( timeState.secTimer, "millisecond" )
}