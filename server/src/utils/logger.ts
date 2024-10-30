import { bgBlue, bgYellow, bgRed, disable } from "colors/safe";

interface ILoggerConfig {
  colorsEnabled?: boolean;
}

interface ILogger {
  info: (...args: string[]) => void;
  warn: (...args: string[]) => void;
  error: (...args: string[]) => void;
}

function getLogger(
  moduleName: string,
  loggerConfig: ILoggerConfig = { colorsEnabled: true }
): ILogger { 

  if (!loggerConfig.colorsEnabled) {
    disable();
  }

  return {
    info: (...args: string[]) =>
      console.log(bgBlue(`${moduleName}`), ":", ...args),
    warn: (...args: string[]) =>
      console.error(bgYellow(`${moduleName}`), ":", ...args),
    error: (...args: string[]) =>
      console.error(bgRed(`${moduleName}`), ":", ...args),
  };
}

export default getLogger;