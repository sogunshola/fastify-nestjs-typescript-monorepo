import * as winston from "winston";
declare class Logger {
    private transports;
    private logger;
    constructor(fileName: string, env?: string);
    getLogger(): winston.Logger;
    private logConfiguration;
}
declare const logger: winston.Logger;
export { Logger, logger };
//# sourceMappingURL=winston.d.ts.map