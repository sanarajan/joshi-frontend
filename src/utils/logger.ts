export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: unknown;
}

class Logger {
  private logs: LogEntry[] = [];
  private maxLogs = 1000;
  private logLevel: LogLevel = LogLevel.DEBUG;

  constructor(logLevel: LogLevel = LogLevel.DEBUG) {
    this.logLevel = logLevel;
  }

  private getTimestamp(): string {
    return new Date().toISOString();
  }

  private formatLog(
    level: LogLevel,
    message: string,
    data?: unknown
  ): string {
    const timestamp = this.getTimestamp();
    const levelName = LogLevel[level];
    const dataStr = data ? ` ${JSON.stringify(data)}` : '';
    return `[${timestamp}] [${levelName}] ${message}${dataStr}`;
  }

  private addLog(level: LogLevel, message: string, data?: unknown): void {
    if (level < this.logLevel) return;

    const entry: LogEntry = { timestamp: this.getTimestamp(), level, message, data };
    this.logs.push(entry);

    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }
  }

  debug(message: string, data?: unknown): void {
    this.addLog(LogLevel.DEBUG, message, data);
    console.debug(this.formatLog(LogLevel.DEBUG, message, data));
  }

  info(message: string, data?: unknown): void {
    this.addLog(LogLevel.INFO, message, data);
    console.info(this.formatLog(LogLevel.INFO, message, data));
  }

  warn(message: string, data?: unknown): void {
    this.addLog(LogLevel.WARN, message, data);
    console.warn(this.formatLog(LogLevel.WARN, message, data));
  }

  error(message: string, data?: unknown): void {
    this.addLog(LogLevel.ERROR, message, data);
    console.error(this.formatLog(LogLevel.ERROR, message, data));
  }

  setLogLevel(level: LogLevel): void {
    this.logLevel = level;
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  clearLogs(): void {
    this.logs = [];
  }

  exportLogs(): string {
    return this.logs
      .map((log) => this.formatLog(log.level, log.message, log.data))
      .join('\n');
  }
}

export const logger = new Logger(LogLevel.DEBUG);
