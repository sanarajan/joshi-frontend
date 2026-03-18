export var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 1] = "INFO";
    LogLevel[LogLevel["WARN"] = 2] = "WARN";
    LogLevel[LogLevel["ERROR"] = 3] = "ERROR";
})(LogLevel || (LogLevel = {}));
class Logger {
    constructor(logLevel = LogLevel.DEBUG) {
        Object.defineProperty(this, "logs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "maxLogs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1000
        });
        Object.defineProperty(this, "logLevel", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: LogLevel.DEBUG
        });
        this.logLevel = logLevel;
    }
    getTimestamp() {
        return new Date().toISOString();
    }
    formatLog(level, message, data) {
        const timestamp = this.getTimestamp();
        const levelName = LogLevel[level];
        const dataStr = data ? ` ${JSON.stringify(data)}` : '';
        return `[${timestamp}] [${levelName}] ${message}${dataStr}`;
    }
    addLog(level, message, data) {
        if (level < this.logLevel)
            return;
        const entry = { timestamp: this.getTimestamp(), level, message, data };
        this.logs.push(entry);
        if (this.logs.length > this.maxLogs) {
            this.logs.shift();
        }
    }
    debug(message, data) {
        this.addLog(LogLevel.DEBUG, message, data);
        console.debug(this.formatLog(LogLevel.DEBUG, message, data));
    }
    info(message, data) {
        this.addLog(LogLevel.INFO, message, data);
        console.info(this.formatLog(LogLevel.INFO, message, data));
    }
    warn(message, data) {
        this.addLog(LogLevel.WARN, message, data);
        console.warn(this.formatLog(LogLevel.WARN, message, data));
    }
    error(message, data) {
        this.addLog(LogLevel.ERROR, message, data);
        console.error(this.formatLog(LogLevel.ERROR, message, data));
    }
    setLogLevel(level) {
        this.logLevel = level;
    }
    getLogs() {
        return [...this.logs];
    }
    clearLogs() {
        this.logs = [];
    }
    exportLogs() {
        return this.logs
            .map((log) => this.formatLog(log.level, log.message, log.data))
            .join('\n');
    }
}
export const logger = new Logger(LogLevel.DEBUG);
