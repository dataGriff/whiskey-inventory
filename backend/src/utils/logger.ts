/**
 * Simple logger utility for consistent application logging
 */

const LOG_LEVELS = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG'
} as const;

type LogLevel = typeof LOG_LEVELS[keyof typeof LOG_LEVELS];

const shouldLog = (level: LogLevel): boolean => {
  const nodeEnv = process.env.NODE_ENV || 'development';
  
  // Don't log in test environment unless explicitly enabled
  if (nodeEnv === 'test' && !process.env.LOG_IN_TESTS) {
    return false;
  }
  
  // In production, only log errors and warnings
  if (nodeEnv === 'production' && (level === 'DEBUG' || level === 'INFO')) {
    return false;
  }
  
  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const log = (level: LogLevel, message: string, ...args: any[]) => {
  if (!shouldLog(level)) {
    return;
  }
  
  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${level}]`;
  
  switch (level) {
    case LOG_LEVELS.ERROR:
      console.error(prefix, message, ...args);
      break;
    case LOG_LEVELS.WARN:
      console.warn(prefix, message, ...args);
      break;
    default:
      console.log(prefix, message, ...args);
  }
};

export const logger = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: (message: string, ...args: any[]) => log(LOG_LEVELS.ERROR, message, ...args),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  warn: (message: string, ...args: any[]) => log(LOG_LEVELS.WARN, message, ...args),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info: (message: string, ...args: any[]) => log(LOG_LEVELS.INFO, message, ...args),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  debug: (message: string, ...args: any[]) => log(LOG_LEVELS.DEBUG, message, ...args)
};
