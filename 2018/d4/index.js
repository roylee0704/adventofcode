import fs from 'fs';

function solve(sortedLogs) {
    const guardLookup = sortedLogs.reduce((lookup, log) => {
        if (!lookup[log.guardNo]) {
            lookup[log.guardNo] = new Guard();
        }
        lookup[log.guardNo].addLog(log)
        return lookup;

    }, {});

    console.log(guardLookup[3109].longestHoursSleep());
}


class Log {
    activity;
    datetime;
    guardNo;
    raw;
    unixTimestamp;
    date;
    time;

    constructor(datetime, activity, raw) {
        this.datetime = datetime;

        this.date = this.datetime.split(' ')[0];
        this.time = this.datetime.split(' ')[1];
        this.unixTimestamp = +new Date(datetime);

        this.activity = activity;
        this.raw = raw;
    }

    isFallAsleep() {
        return this.activity.trim() === 'falls asleep';
    }

    setGuardNo(guardNo) {
        this.guardNo = guardNo;
    }
}

class Guard {
    logs;

    constructor() {
        this.logs = [];
    }
    addLog(log) {
        this.logs.push(log);
    }

    longestHoursSleep() {
        this.logs.forEach(log => console.log(log.isFallAsleep()))

    }
}

const input = fs.readFileSync('./input.txt', 'utf-8');
const events = input.split('\n');

const sortedLogs = events.map(raw => {
    const dt = raw.split(']')[0].split('[')[1];
    const activity = raw.split(']')[1].trim();
    return new Log(dt, activity, raw)
}).sort((a, b) => a.unixTimestamp - b.unixTimestamp);

let guardNo = 0;
for (let i = 0; i < sortedLogs.length; i++) {
    const startShift = sortedLogs[i].activity.match(/#\d+/g);
    if (startShift) {
        guardNo = +startShift[0].slice(1);
    }
    sortedLogs[i].setGuardNo(guardNo);
}


solve(sortedLogs)