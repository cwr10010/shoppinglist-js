
import { TestBed, async, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Logger } from './logging';
import { TRACE, DEBUG, INFO, WARN, ERROR, OFF } from '../_models/loglevel';


describe('Logger', () => {

  let logger: Logger;
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
      spyOn(console, 'log');
      spyOn(console, 'warn');
      spyOn(console, 'error');
    })
  );

  describe('trace()', () => {

    it('should log on trace level with no arguments if environment is set as such', () => {
      logger.loggLevel = TRACE;
      logger.trace('log message');
      expect(console.log).toHaveBeenCalledWith('[TRACE]', 'log message');
    });

    it('should log on trace level with arguments if environment is set as such', () => {
      logger.loggLevel = TRACE;
      logger.trace('log message', 'argument');
      expect(console.log).toHaveBeenCalledWith('[TRACE]', 'log message', 'argument');
    });

    it('should not log on trace level with no arguments if environment is set as such', () => {
      [DEBUG, INFO, WARN, ERROR, OFF].forEach((level) => {
        logger.loggLevel = level;
        logger.trace('log message');
        expect(console.log).toHaveBeenCalledTimes(0);
      });
    });

    it('should not log on trace level with arguments if environment is set as such', () => {
      [DEBUG, INFO, WARN, ERROR, OFF].forEach((level) => {
        logger.loggLevel = level;
        logger.trace('log message', 'argument');
        expect(console.log).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('debug()', () => {

    it('should log on debug level with no arguments if environment is set as such', () => {
      logger.loggLevel = DEBUG;
      logger.debug('log message');
      expect(console.log).toHaveBeenCalledWith('[DEBUG]', 'log message');
    });

    it('should log on debug level with arguments if environment is set as such', () => {
      logger.loggLevel = DEBUG;
      logger.debug('log message', 'argument');
      expect(console.log).toHaveBeenCalledWith('[DEBUG]', 'log message', 'argument');
    });

    it('should not log on debug level with no arguments if environment is set as such', () => {
      [INFO, WARN, ERROR, OFF].forEach((level) => {
        logger.loggLevel = level;
        logger.debug('log message');
        expect(console.log).toHaveBeenCalledTimes(0);
      });
    });

    it('should not log on debug level with arguments if environment is set as such', () => {
      [INFO, WARN, ERROR, OFF].forEach((level) => {
        logger.loggLevel = level;
        logger.debug('log message', 'argument');
        expect(console.log).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('info()', () => {

    it('should log on info level with no arguments if environment is set as such', () => {
      logger.loggLevel = INFO;
      logger.info('log message');
      expect(console.log).toHaveBeenCalledWith('[INFO]', 'log message');
    });

    it('should log on info level with arguments if environment is set as such', () => {
      logger.loggLevel = INFO;
      logger.info('log message', 'argument');
      expect(console.log).toHaveBeenCalledWith('[INFO]', 'log message', 'argument');
    });

    it('should not log on info level with no arguments if environment is set as such', () => {
      [WARN, ERROR, OFF].forEach((level) => {
        logger.loggLevel = level;
        logger.info('log message');
        expect(console.log).toHaveBeenCalledTimes(0);
      });
    });

    it('should not log on info level with arguments if environment is set as such', () => {
      [WARN, ERROR, OFF].forEach((level) => {
        logger.loggLevel = level;
        logger.info('log message', 'argument');
        expect(console.log).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('warn()', () => {

    it('should log on warn level with no arguments if environment is set as such', () => {
      logger.loggLevel = WARN;
      logger.warn('log message');
      expect(console.warn).toHaveBeenCalledWith('[WARN]', 'log message');
    });

    it('should log on warn level with arguments if environment is set as such', () => {
      logger.loggLevel = WARN;
      logger.warn('log message', 'argument');
      expect(console.warn).toHaveBeenCalledWith('[WARN]', 'log message', 'argument');
    });

    it('should not log on warn level with no arguments if environment is set as such', () => {
      [ERROR, OFF].forEach((level) => {
        logger.loggLevel = level;
        logger.warn('log message');
        expect(console.warn).toHaveBeenCalledTimes(0);
      });
    });

    it('should not log on warn level with arguments if environment is set as such', () => {
      [ERROR, OFF].forEach((level) => {
        logger.loggLevel = level;
        logger.warn('log message', 'argument');
        expect(console.warn).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('error()', () => {

    it('should log on error level with no arguments if environment is set as such', () => {
      logger.loggLevel = ERROR;
      logger.error('log message');
      expect(console.error).toHaveBeenCalledWith('[ERROR]', 'log message');
    });

    it('should log on error level with arguments if environment is set as such', () => {
      logger.loggLevel = ERROR;
      logger.error('log message', 'argument');
      expect(console.error).toHaveBeenCalledWith('[ERROR]', 'log message', 'argument');
    });

    it('should not log on error level with no arguments if environment is set as such', () => {
      [OFF].forEach((level) => {
        logger.loggLevel = level;
        logger.error('log message');
        expect(console.error).toHaveBeenCalledTimes(0);
      });
    });

    it('should not log on error level with arguments if environment is set as such', () => {
      [OFF].forEach((level) => {
        logger.loggLevel = level;
        logger.error('log message', 'argument');
        expect(console.error).toHaveBeenCalledTimes(0);
      });
    });
  });
});
