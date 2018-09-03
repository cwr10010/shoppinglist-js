
import { TestBed, async, inject } from '@angular/core/testing';
import { Logger } from './logging';
import { TRACE, DEBUG, INFO, WARN, ERROR, OFF } from '../_models/loglevel';


describe('Logger', () => {

  let logger: Logger;

  let consoleLogSpy: any;
  let consoleWarnSpy: any;
  let consoleErrorSpy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Logger
      ]
    });
  });

  beforeEach(
    inject([Logger], (_logger) => {
      logger = _logger;

      consoleLogSpy = spyOn(console, 'log');
      consoleWarnSpy = spyOn(console, 'warn');
      consoleErrorSpy = spyOn(console, 'error');
    })
  );

  describe('trace()', () => {

    it('should log on trace level with no arguments if environment is set as such', () => {
      logger.loggLevel = TRACE;
      logger.trace('log message');
      expect(consoleLogSpy).toHaveBeenCalledWith('[TRACE]', 'log message');
    });

    it('should log on trace level with arguments if environment is set as such', () => {
      logger.loggLevel = TRACE;
      logger.trace('log message', 'argument');
      expect(consoleLogSpy).toHaveBeenCalledWith('[TRACE]', 'log message', 'argument');
    });

    it('should not log on trace level with no arguments if environment is set as such', () => {
      [DEBUG, INFO, WARN, ERROR, OFF].forEach((level) => {
        logger.loggLevel = level;
        logger.trace('log message');
        expect(consoleLogSpy).toHaveBeenCalledTimes(0);
      });
    });

    it('should not log on trace level with arguments if environment is set as such', () => {
      [DEBUG, INFO, WARN, ERROR, OFF].forEach((level) => {
        logger.loggLevel = level;
        logger.trace('log message', 'argument');
        expect(consoleLogSpy).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('debug()', () => {

    it('should log on debug level with no arguments if environment is set as such', () => {
      logger.loggLevel = DEBUG;
      logger.debug('log message');
      expect(consoleLogSpy).toHaveBeenCalledWith('[DEBUG]', 'log message');
    });

    it('should log on debug level with arguments if environment is set as such', () => {
      logger.loggLevel = DEBUG;
      logger.debug('log message', 'argument');
      expect(consoleLogSpy).toHaveBeenCalledWith('[DEBUG]', 'log message', 'argument');
    });

    it('should not log on debug level with no arguments if environment is set as such', () => {
      [INFO, WARN, ERROR, OFF].forEach((level) => {
        logger.loggLevel = level;
        logger.debug('log message');
        expect(consoleLogSpy).toHaveBeenCalledTimes(0);
      });
    });

    it('should not log on debug level with arguments if environment is set as such', () => {
      [INFO, WARN, ERROR, OFF].forEach((level) => {
        logger.loggLevel = level;
        logger.debug('log message', 'argument');
        expect(consoleLogSpy).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('info()', () => {

    it('should log on info level with no arguments if environment is set as such', () => {
      logger.loggLevel = INFO;
      logger.info('log message');
      expect(consoleLogSpy).toHaveBeenCalledWith('[INFO]', 'log message');
    });

    it('should log on info level with arguments if environment is set as such', () => {
      logger.loggLevel = INFO;
      logger.info('log message', 'argument');
      expect(consoleLogSpy).toHaveBeenCalledWith('[INFO]', 'log message', 'argument');
    });

    it('should not log on info level with no arguments if environment is set as such', () => {
      [WARN, ERROR, OFF].forEach((level) => {
        logger.loggLevel = level;
        logger.info('log message');
        expect(consoleLogSpy).toHaveBeenCalledTimes(0);
      });
    });

    it('should not log on info level with arguments if environment is set as such', () => {
      [WARN, ERROR, OFF].forEach((level) => {
        logger.loggLevel = level;
        logger.info('log message', 'argument');
        expect(consoleLogSpy).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('warn()', () => {

    it('should log on warn level with no arguments if environment is set as such', () => {
      logger.loggLevel = WARN;
      logger.warn('log message');
      expect(consoleWarnSpy).toHaveBeenCalledWith('[WARN]', 'log message');
    });

    it('should log on warn level with arguments if environment is set as such', () => {
      logger.loggLevel = WARN;
      logger.warn('log message', 'argument');
      expect(consoleWarnSpy).toHaveBeenCalledWith('[WARN]', 'log message', 'argument');
    });

    it('should not log on warn level with no arguments if environment is set as such', () => {
      [ERROR, OFF].forEach((level) => {
        logger.loggLevel = level;
        logger.warn('log message');
        expect(consoleWarnSpy).toHaveBeenCalledTimes(0);
      });
    });

    it('should not log on warn level with arguments if environment is set as such', () => {
      [ERROR, OFF].forEach((level) => {
        logger.loggLevel = level;
        logger.warn('log message', 'argument');
        expect(consoleWarnSpy).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('error()', () => {

    it('should log on error level with no arguments if environment is set as such', () => {
      logger.loggLevel = ERROR;
      logger.error('log message');
      expect(consoleErrorSpy).toHaveBeenCalledWith('[ERROR]', 'log message');
    });

    it('should log on error level with arguments if environment is set as such', () => {
      logger.loggLevel = ERROR;
      logger.error('log message', 'argument');
      expect(consoleErrorSpy).toHaveBeenCalledWith('[ERROR]', 'log message', 'argument');
    });

    it('should not log on error level with no arguments if environment is set as such', () => {
      [OFF].forEach((level) => {
        logger.loggLevel = level;
        logger.error('log message');
        expect(consoleErrorSpy).toHaveBeenCalledTimes(0);
      });
    });

    it('should not log on error level with arguments if environment is set as such', () => {
      [OFF].forEach((level) => {
        logger.loggLevel = level;
        logger.error('log message', 'argument');
        expect(consoleErrorSpy).toHaveBeenCalledTimes(0);
      });
    });
  });
});
