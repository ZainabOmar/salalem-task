'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * @license AngularJS v1.3.20
 * (c) 2010-2014 Google, Inc. http://angularjs.org
 * License: MIT
 */
(function (window, angular, undefined) {

  'use strict';

  /**
   * @ngdoc object
   * @name angular.mock
   * @description
   *
   * Namespace from 'angular-mocks.js' which contains testing related code.
   */

  angular.mock = {};

  /**
   * ! This is a private undocumented service !
   *
   * @name $browser
   *
   * @description
   * This service is a mock implementation of {@link ng.$browser}. It provides fake
   * implementation for commonly used browser apis that are hard to test, e.g. setTimeout, xhr,
   * cookies, etc...
   *
   * The api of this service is the same as that of the real {@link ng.$browser $browser}, except
   * that there are several helper methods available which can be used in tests.
   */
  angular.mock.$BrowserProvider = function () {
    this.$get = function () {
      return new angular.mock.$Browser();
    };
  };

  angular.mock.$Browser = function () {
    var self = this;

    this.isMock = true;
    self.$$url = "http://server/";
    self.$$lastUrl = self.$$url; // used by url polling fn
    self.pollFns = [];

    // TODO(vojta): remove this temporary api
    self.$$completeOutstandingRequest = angular.noop;
    self.$$incOutstandingRequestCount = angular.noop;

    // register url polling fn

    self.onUrlChange = function (listener) {
      self.pollFns.push(function () {
        if (self.$$lastUrl !== self.$$url || self.$$state !== self.$$lastState) {
          self.$$lastUrl = self.$$url;
          self.$$lastState = self.$$state;
          listener(self.$$url, self.$$state);
        }
      });

      return listener;
    };

    self.$$checkUrlChange = angular.noop;

    self.cookieHash = {};
    self.lastCookieHash = {};
    self.deferredFns = [];
    self.deferredNextId = 0;

    self.defer = function (fn, delay) {
      delay = delay || 0;
      self.deferredFns.push({ time: self.defer.now + delay, fn: fn, id: self.deferredNextId });
      self.deferredFns.sort(function (a, b) {
        return a.time - b.time;
      });
      return self.deferredNextId++;
    };

    /**
     * @name $browser#defer.now
     *
     * @description
     * Current milliseconds mock time.
     */
    self.defer.now = 0;

    self.defer.cancel = function (deferId) {
      var fnIndex;

      angular.forEach(self.deferredFns, function (fn, index) {
        if (fn.id === deferId) fnIndex = index;
      });

      if (fnIndex !== undefined) {
        self.deferredFns.splice(fnIndex, 1);
        return true;
      }

      return false;
    };

    /**
     * @name $browser#defer.flush
     *
     * @description
     * Flushes all pending requests and executes the defer callbacks.
     *
     * @param {number=} number of milliseconds to flush. See {@link #defer.now}
     */
    self.defer.flush = function (delay) {
      if (angular.isDefined(delay)) {
        self.defer.now += delay;
      } else {
        if (self.deferredFns.length) {
          self.defer.now = self.deferredFns[self.deferredFns.length - 1].time;
        } else {
          throw new Error('No deferred tasks to be flushed');
        }
      }

      while (self.deferredFns.length && self.deferredFns[0].time <= self.defer.now) {
        self.deferredFns.shift().fn();
      }
    };

    self.$$baseHref = '/';
    self.baseHref = function () {
      return this.$$baseHref;
    };
  };
  angular.mock.$Browser.prototype = {

    /**
      * @name $browser#poll
      *
      * @description
      * run all fns in pollFns
      */
    poll: function poll() {
      angular.forEach(this.pollFns, function (pollFn) {
        pollFn();
      });
    },

    addPollFn: function addPollFn(pollFn) {
      this.pollFns.push(pollFn);
      return pollFn;
    },

    url: function url(_url, replace, state) {
      if (angular.isUndefined(state)) {
        state = null;
      }
      if (_url) {
        this.$$url = _url;
        // Native pushState serializes & copies the object; simulate it.
        this.$$state = angular.copy(state);
        return this;
      }

      return this.$$url;
    },

    state: function state() {
      return this.$$state;
    },

    cookies: function cookies(name, value) {
      if (name) {
        if (angular.isUndefined(value)) {
          delete this.cookieHash[name];
        } else {
          if (angular.isString(value) && //strings only
          value.length <= 4096) {
            //strict cookie storage limits
            this.cookieHash[name] = value;
          }
        }
      } else {
        if (!angular.equals(this.cookieHash, this.lastCookieHash)) {
          this.lastCookieHash = angular.copy(this.cookieHash);
          this.cookieHash = angular.copy(this.cookieHash);
        }
        return this.cookieHash;
      }
    },

    notifyWhenNoOutstandingRequests: function notifyWhenNoOutstandingRequests(fn) {
      fn();
    }
  };

  /**
   * @ngdoc provider
   * @name $exceptionHandlerProvider
   *
   * @description
   * Configures the mock implementation of {@link ng.$exceptionHandler} to rethrow or to log errors
   * passed to the `$exceptionHandler`.
   */

  /**
   * @ngdoc service
   * @name $exceptionHandler
   *
   * @description
   * Mock implementation of {@link ng.$exceptionHandler} that rethrows or logs errors passed
   * to it. See {@link ngMock.$exceptionHandlerProvider $exceptionHandlerProvider} for configuration
   * information.
   *
   *
   * ```js
   *   describe('$exceptionHandlerProvider', function() {
   *
   *     it('should capture log messages and exceptions', function() {
   *
   *       module(function($exceptionHandlerProvider) {
   *         $exceptionHandlerProvider.mode('log');
   *       });
   *
   *       inject(function($log, $exceptionHandler, $timeout) {
   *         $timeout(function() { $log.log(1); });
   *         $timeout(function() { $log.log(2); throw 'banana peel'; });
   *         $timeout(function() { $log.log(3); });
   *         expect($exceptionHandler.errors).toEqual([]);
   *         expect($log.assertEmpty());
   *         $timeout.flush();
   *         expect($exceptionHandler.errors).toEqual(['banana peel']);
   *         expect($log.log.logs).toEqual([[1], [2], [3]]);
   *       });
   *     });
   *   });
   * ```
   */

  angular.mock.$ExceptionHandlerProvider = function () {
    var handler;

    /**
     * @ngdoc method
     * @name $exceptionHandlerProvider#mode
     *
     * @description
     * Sets the logging mode.
     *
     * @param {string} mode Mode of operation, defaults to `rethrow`.
     *
     *   - `log`: Sometimes it is desirable to test that an error is thrown, for this case the `log`
     *            mode stores an array of errors in `$exceptionHandler.errors`, to allow later
     *            assertion of them. See {@link ngMock.$log#assertEmpty assertEmpty()} and
     *            {@link ngMock.$log#reset reset()}
     *   - `rethrow`: If any errors are passed to the handler in tests, it typically means that there
     *                is a bug in the application or test, so this mock will make these tests fail.
     *                For any implementations that expect exceptions to be thrown, the `rethrow` mode
     *                will also maintain a log of thrown errors.
     */
    this.mode = function (mode) {

      switch (mode) {
        case 'log':
        case 'rethrow':
          var errors = [];
          handler = function handler(e) {
            if (arguments.length == 1) {
              errors.push(e);
            } else {
              errors.push([].slice.call(arguments, 0));
            }
            if (mode === "rethrow") {
              throw e;
            }
          };
          handler.errors = errors;
          break;
        default:
          throw new Error("Unknown mode '" + mode + "', only 'log'/'rethrow' modes are allowed!");
      }
    };

    this.$get = function () {
      return handler;
    };

    this.mode('rethrow');
  };

  /**
   * @ngdoc service
   * @name $log
   *
   * @description
   * Mock implementation of {@link ng.$log} that gathers all logged messages in arrays
   * (one array per logging level). These arrays are exposed as `logs` property of each of the
   * level-specific log function, e.g. for level `error` the array is exposed as `$log.error.logs`.
   *
   */
  angular.mock.$LogProvider = function () {
    var _debug = true;

    function concat(array1, array2, index) {
      return array1.concat(Array.prototype.slice.call(array2, index));
    }

    this.debugEnabled = function (flag) {
      if (angular.isDefined(flag)) {
        _debug = flag;
        return this;
      } else {
        return _debug;
      }
    };

    this.$get = function () {
      var $log = {
        log: function log() {
          $log.log.logs.push(concat([], arguments, 0));
        },
        warn: function warn() {
          $log.warn.logs.push(concat([], arguments, 0));
        },
        info: function info() {
          $log.info.logs.push(concat([], arguments, 0));
        },
        error: function error() {
          $log.error.logs.push(concat([], arguments, 0));
        },
        debug: function debug() {
          if (_debug) {
            $log.debug.logs.push(concat([], arguments, 0));
          }
        }
      };

      /**
       * @ngdoc method
       * @name $log#reset
       *
       * @description
       * Reset all of the logging arrays to empty.
       */
      $log.reset = function () {
        /**
         * @ngdoc property
         * @name $log#log.logs
         *
         * @description
         * Array of messages logged using {@link ng.$log#log `log()`}.
         *
         * @example
         * ```js
         * $log.log('Some Log');
         * var first = $log.log.logs.unshift();
         * ```
         */
        $log.log.logs = [];
        /**
         * @ngdoc property
         * @name $log#info.logs
         *
         * @description
         * Array of messages logged using {@link ng.$log#info `info()`}.
         *
         * @example
         * ```js
         * $log.info('Some Info');
         * var first = $log.info.logs.unshift();
         * ```
         */
        $log.info.logs = [];
        /**
         * @ngdoc property
         * @name $log#warn.logs
         *
         * @description
         * Array of messages logged using {@link ng.$log#warn `warn()`}.
         *
         * @example
         * ```js
         * $log.warn('Some Warning');
         * var first = $log.warn.logs.unshift();
         * ```
         */
        $log.warn.logs = [];
        /**
         * @ngdoc property
         * @name $log#error.logs
         *
         * @description
         * Array of messages logged using {@link ng.$log#error `error()`}.
         *
         * @example
         * ```js
         * $log.error('Some Error');
         * var first = $log.error.logs.unshift();
         * ```
         */
        $log.error.logs = [];
        /**
        * @ngdoc property
        * @name $log#debug.logs
        *
        * @description
        * Array of messages logged using {@link ng.$log#debug `debug()`}.
        *
        * @example
        * ```js
        * $log.debug('Some Error');
        * var first = $log.debug.logs.unshift();
        * ```
        */
        $log.debug.logs = [];
      };

      /**
       * @ngdoc method
       * @name $log#assertEmpty
       *
       * @description
       * Assert that all of the logging methods have no logged messages. If any messages are present,
       * an exception is thrown.
       */
      $log.assertEmpty = function () {
        var errors = [];
        angular.forEach(['error', 'warn', 'info', 'log', 'debug'], function (logLevel) {
          angular.forEach($log[logLevel].logs, function (log) {
            angular.forEach(log, function (logItem) {
              errors.push('MOCK $log (' + logLevel + '): ' + String(logItem) + '\n' + (logItem.stack || ''));
            });
          });
        });
        if (errors.length) {
          errors.unshift("Expected $log to be empty! Either a message was logged unexpectedly, or " + "an expected log message was not checked and removed:");
          errors.push('');
          throw new Error(errors.join('\n---------\n'));
        }
      };

      $log.reset();
      return $log;
    };
  };

  /**
   * @ngdoc service
   * @name $interval
   *
   * @description
   * Mock implementation of the $interval service.
   *
   * Use {@link ngMock.$interval#flush `$interval.flush(millis)`} to
   * move forward by `millis` milliseconds and trigger any functions scheduled to run in that
   * time.
   *
   * @param {function()} fn A function that should be called repeatedly.
   * @param {number} delay Number of milliseconds between each function call.
   * @param {number=} [count=0] Number of times to repeat. If not set, or 0, will repeat
   *   indefinitely.
   * @param {boolean=} [invokeApply=true] If set to `false` skips model dirty checking, otherwise
   *   will invoke `fn` within the {@link ng.$rootScope.Scope#$apply $apply} block.
   * @returns {promise} A promise which will be notified on each iteration.
   */
  angular.mock.$IntervalProvider = function () {
    this.$get = ['$browser', '$rootScope', '$q', '$$q', function ($browser, $rootScope, $q, $$q) {
      var repeatFns = [],
          nextRepeatId = 0,
          now = 0;

      var $interval = function $interval(fn, delay, count, invokeApply) {
        var iteration = 0,
            skipApply = angular.isDefined(invokeApply) && !invokeApply,
            deferred = (skipApply ? $$q : $q).defer(),
            promise = deferred.promise;

        count = angular.isDefined(count) ? count : 0;
        promise.then(null, null, fn);

        promise.$$intervalId = nextRepeatId;

        function tick() {
          deferred.notify(iteration++);

          if (count > 0 && iteration >= count) {
            var fnIndex;
            deferred.resolve(iteration);

            angular.forEach(repeatFns, function (fn, index) {
              if (fn.id === promise.$$intervalId) fnIndex = index;
            });

            if (fnIndex !== undefined) {
              repeatFns.splice(fnIndex, 1);
            }
          }

          if (skipApply) {
            $browser.defer.flush();
          } else {
            $rootScope.$apply();
          }
        }

        repeatFns.push({
          nextTime: now + delay,
          delay: delay,
          fn: tick,
          id: nextRepeatId,
          deferred: deferred
        });
        repeatFns.sort(function (a, b) {
          return a.nextTime - b.nextTime;
        });

        nextRepeatId++;
        return promise;
      };
      /**
       * @ngdoc method
       * @name $interval#cancel
       *
       * @description
       * Cancels a task associated with the `promise`.
       *
       * @param {promise} promise A promise from calling the `$interval` function.
       * @returns {boolean} Returns `true` if the task was successfully cancelled.
       */
      $interval.cancel = function (promise) {
        if (!promise) return false;
        var fnIndex;

        angular.forEach(repeatFns, function (fn, index) {
          if (fn.id === promise.$$intervalId) fnIndex = index;
        });

        if (fnIndex !== undefined) {
          repeatFns[fnIndex].deferred.reject('canceled');
          repeatFns.splice(fnIndex, 1);
          return true;
        }

        return false;
      };

      /**
       * @ngdoc method
       * @name $interval#flush
       * @description
       *
       * Runs interval tasks scheduled to be run in the next `millis` milliseconds.
       *
       * @param {number=} millis maximum timeout amount to flush up until.
       *
       * @return {number} The amount of time moved forward.
       */
      $interval.flush = function (millis) {
        now += millis;
        while (repeatFns.length && repeatFns[0].nextTime <= now) {
          var task = repeatFns[0];
          task.fn();
          task.nextTime += task.delay;
          repeatFns.sort(function (a, b) {
            return a.nextTime - b.nextTime;
          });
        }
        return millis;
      };

      return $interval;
    }];
  };

  /* jshint -W101 */
  /* The R_ISO8061_STR regex is never going to fit into the 100 char limit!
   * This directive should go inside the anonymous function but a bug in JSHint means that it would
   * not be enacted early enough to prevent the warning.
   */
  var R_ISO8061_STR = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?:\:?(\d\d)(?:\:?(\d\d)(?:\.(\d{3}))?)?)?(Z|([+-])(\d\d):?(\d\d)))?$/;

  function jsonStringToDate(string) {
    var match;
    if (match = string.match(R_ISO8061_STR)) {
      var date = new Date(0),
          tzHour = 0,
          tzMin = 0;
      if (match[9]) {
        tzHour = int(match[9] + match[10]);
        tzMin = int(match[9] + match[11]);
      }
      date.setUTCFullYear(int(match[1]), int(match[2]) - 1, int(match[3]));
      date.setUTCHours(int(match[4] || 0) - tzHour, int(match[5] || 0) - tzMin, int(match[6] || 0), int(match[7] || 0));
      return date;
    }
    return string;
  }

  function int(str) {
    return parseInt(str, 10);
  }

  function padNumber(num, digits, trim) {
    var neg = '';
    if (num < 0) {
      neg = '-';
      num = -num;
    }
    num = '' + num;
    while (num.length < digits) {
      num = '0' + num;
    }if (trim) num = num.substr(num.length - digits);
    return neg + num;
  }

  /**
   * @ngdoc type
   * @name angular.mock.TzDate
   * @description
   *
   * *NOTE*: this is not an injectable instance, just a globally available mock class of `Date`.
   *
   * Mock of the Date type which has its timezone specified via constructor arg.
   *
   * The main purpose is to create Date-like instances with timezone fixed to the specified timezone
   * offset, so that we can test code that depends on local timezone settings without dependency on
   * the time zone settings of the machine where the code is running.
   *
   * @param {number} offset Offset of the *desired* timezone in hours (fractions will be honored)
   * @param {(number|string)} timestamp Timestamp representing the desired time in *UTC*
   *
   * @example
   * !!!! WARNING !!!!!
   * This is not a complete Date object so only methods that were implemented can be called safely.
   * To make matters worse, TzDate instances inherit stuff from Date via a prototype.
   *
   * We do our best to intercept calls to "unimplemented" methods, but since the list of methods is
   * incomplete we might be missing some non-standard methods. This can result in errors like:
   * "Date.prototype.foo called on incompatible Object".
   *
   * ```js
   * var newYearInBratislava = new TzDate(-1, '2009-12-31T23:00:00Z');
   * newYearInBratislava.getTimezoneOffset() => -60;
   * newYearInBratislava.getFullYear() => 2010;
   * newYearInBratislava.getMonth() => 0;
   * newYearInBratislava.getDate() => 1;
   * newYearInBratislava.getHours() => 0;
   * newYearInBratislava.getMinutes() => 0;
   * newYearInBratislava.getSeconds() => 0;
   * ```
   *
   */
  angular.mock.TzDate = function (offset, timestamp) {
    var self = new Date(0);
    if (angular.isString(timestamp)) {
      var tsStr = timestamp;

      self.origDate = jsonStringToDate(timestamp);

      timestamp = self.origDate.getTime();
      if (isNaN(timestamp)) throw {
        name: "Illegal Argument",
        message: "Arg '" + tsStr + "' passed into TzDate constructor is not a valid date string"
      };
    } else {
      self.origDate = new Date(timestamp);
    }

    var localOffset = new Date(timestamp).getTimezoneOffset();
    self.offsetDiff = localOffset * 60 * 1000 - offset * 1000 * 60 * 60;
    self.date = new Date(timestamp + self.offsetDiff);

    self.getTime = function () {
      return self.date.getTime() - self.offsetDiff;
    };

    self.toLocaleDateString = function () {
      return self.date.toLocaleDateString();
    };

    self.getFullYear = function () {
      return self.date.getFullYear();
    };

    self.getMonth = function () {
      return self.date.getMonth();
    };

    self.getDate = function () {
      return self.date.getDate();
    };

    self.getHours = function () {
      return self.date.getHours();
    };

    self.getMinutes = function () {
      return self.date.getMinutes();
    };

    self.getSeconds = function () {
      return self.date.getSeconds();
    };

    self.getMilliseconds = function () {
      return self.date.getMilliseconds();
    };

    self.getTimezoneOffset = function () {
      return offset * 60;
    };

    self.getUTCFullYear = function () {
      return self.origDate.getUTCFullYear();
    };

    self.getUTCMonth = function () {
      return self.origDate.getUTCMonth();
    };

    self.getUTCDate = function () {
      return self.origDate.getUTCDate();
    };

    self.getUTCHours = function () {
      return self.origDate.getUTCHours();
    };

    self.getUTCMinutes = function () {
      return self.origDate.getUTCMinutes();
    };

    self.getUTCSeconds = function () {
      return self.origDate.getUTCSeconds();
    };

    self.getUTCMilliseconds = function () {
      return self.origDate.getUTCMilliseconds();
    };

    self.getDay = function () {
      return self.date.getDay();
    };

    // provide this method only on browsers that already have it
    if (self.toISOString) {
      self.toISOString = function () {
        return padNumber(self.origDate.getUTCFullYear(), 4) + '-' + padNumber(self.origDate.getUTCMonth() + 1, 2) + '-' + padNumber(self.origDate.getUTCDate(), 2) + 'T' + padNumber(self.origDate.getUTCHours(), 2) + ':' + padNumber(self.origDate.getUTCMinutes(), 2) + ':' + padNumber(self.origDate.getUTCSeconds(), 2) + '.' + padNumber(self.origDate.getUTCMilliseconds(), 3) + 'Z';
      };
    }

    //hide all methods not implemented in this mock that the Date prototype exposes
    var unimplementedMethods = ['getUTCDay', 'getYear', 'setDate', 'setFullYear', 'setHours', 'setMilliseconds', 'setMinutes', 'setMonth', 'setSeconds', 'setTime', 'setUTCDate', 'setUTCFullYear', 'setUTCHours', 'setUTCMilliseconds', 'setUTCMinutes', 'setUTCMonth', 'setUTCSeconds', 'setYear', 'toDateString', 'toGMTString', 'toJSON', 'toLocaleFormat', 'toLocaleString', 'toLocaleTimeString', 'toSource', 'toString', 'toTimeString', 'toUTCString', 'valueOf'];

    angular.forEach(unimplementedMethods, function (methodName) {
      self[methodName] = function () {
        throw new Error("Method '" + methodName + "' is not implemented in the TzDate mock");
      };
    });

    return self;
  };

  //make "tzDateInstance instanceof Date" return true
  angular.mock.TzDate.prototype = Date.prototype;
  /* jshint +W101 */

  angular.mock.animate = angular.module('ngAnimateMock', ['ng']).config(['$provide', function ($provide) {

    var reflowQueue = [];
    $provide.value('$$animateReflow', function (fn) {
      var index = reflowQueue.length;
      reflowQueue.push(fn);
      return function cancel() {
        reflowQueue.splice(index, 1);
      };
    });

    $provide.decorator('$animate', ['$delegate', '$$asyncCallback', '$timeout', '$browser', '$rootScope', '$$rAF', function ($delegate, $$asyncCallback, $timeout, $browser, $rootScope, $$rAF) {
      var animate = {
        queue: [],
        cancel: $delegate.cancel,
        enabled: $delegate.enabled,
        triggerCallbackEvents: function triggerCallbackEvents() {
          $$asyncCallback.flush();
        },
        triggerCallbackPromise: function triggerCallbackPromise() {
          $timeout.flush(0);
        },
        triggerCallbacks: function triggerCallbacks() {
          this.triggerCallbackEvents();
          this.triggerCallbackPromise();
        },
        triggerReflow: function triggerReflow() {
          angular.forEach(reflowQueue, function (fn) {
            fn();
          });
          reflowQueue = [];
        },
        flush: function flush() {
          $rootScope.$digest();
          var doNextRun,
              somethingFlushed = false;
          do {
            doNextRun = false;
            if (reflowQueue.length) {
              doNextRun = somethingFlushed = true;
              this.triggerReflow();
            }
            if ($$rAF.queue.length) {
              doNextRun = somethingFlushed = true;
              $$rAF.flush();
            }
            if ($$asyncCallback.queue.length) {
              doNextRun = somethingFlushed = true;
              this.triggerCallbackEvents();
            }
            if (timeoutsRemaining()) {
              var oldValue = timeoutsRemaining();
              this.triggerCallbackPromise();
              var newValue = timeoutsRemaining();
              if (newValue < oldValue) {
                doNextRun = somethingFlushed = true;
              }
            }
          } while (doNextRun);

          if (!somethingFlushed) {
            throw new Error('No pending animations ready to be closed or flushed');
          }

          $rootScope.$digest();

          function timeoutsRemaining() {
            return $browser.deferredFns.length;
          }
        }
      };

      angular.forEach(['animate', 'enter', 'leave', 'move', 'addClass', 'removeClass', 'setClass'], function (method) {
        animate[method] = function () {
          animate.queue.push({
            event: method,
            element: arguments[0],
            options: arguments[arguments.length - 1],
            args: arguments
          });
          return $delegate[method].apply($delegate, arguments);
        };
      });

      return animate;
    }]);
  }]);

  /**
   * @ngdoc function
   * @name angular.mock.dump
   * @description
   *
   * *NOTE*: this is not an injectable instance, just a globally available function.
   *
   * Method for serializing common angular objects (scope, elements, etc..) into strings, useful for
   * debugging.
   *
   * This method is also available on window, where it can be used to display objects on debug
   * console.
   *
   * @param {*} object - any object to turn into string.
   * @return {string} a serialized string of the argument
   */
  angular.mock.dump = function (object) {
    return serialize(object);

    function serialize(object) {
      var out;

      if (angular.isElement(object)) {
        object = angular.element(object);
        out = angular.element('<div></div>');
        angular.forEach(object, function (element) {
          out.append(angular.element(element).clone());
        });
        out = out.html();
      } else if (angular.isArray(object)) {
        out = [];
        angular.forEach(object, function (o) {
          out.push(serialize(o));
        });
        out = '[ ' + out.join(', ') + ' ]';
      } else if (angular.isObject(object)) {
        if (angular.isFunction(object.$eval) && angular.isFunction(object.$apply)) {
          out = serializeScope(object);
        } else if (object instanceof Error) {
          out = object.stack || '' + object.name + ': ' + object.message;
        } else {
          // TODO(i): this prevents methods being logged,
          // we should have a better way to serialize objects
          out = angular.toJson(object, true);
        }
      } else {
        out = String(object);
      }

      return out;
    }

    function serializeScope(scope, offset) {
      offset = offset || '  ';
      var log = [offset + 'Scope(' + scope.$id + '): {'];
      for (var key in scope) {
        if (Object.prototype.hasOwnProperty.call(scope, key) && !key.match(/^(\$|this)/)) {
          log.push('  ' + key + ': ' + angular.toJson(scope[key]));
        }
      }
      var child = scope.$$childHead;
      while (child) {
        log.push(serializeScope(child, offset + '  '));
        child = child.$$nextSibling;
      }
      log.push('}');
      return log.join('\n' + offset);
    }
  };

  /**
   * @ngdoc service
   * @name $httpBackend
   * @description
   * Fake HTTP backend implementation suitable for unit testing applications that use the
   * {@link ng.$http $http service}.
   *
   * *Note*: For fake HTTP backend implementation suitable for end-to-end testing or backend-less
   * development please see {@link ngMockE2E.$httpBackend e2e $httpBackend mock}.
   *
   * During unit testing, we want our unit tests to run quickly and have no external dependencies so
   * we don’t want to send [XHR](https://developer.mozilla.org/en/xmlhttprequest) or
   * [JSONP](http://en.wikipedia.org/wiki/JSONP) requests to a real server. All we really need is
   * to verify whether a certain request has been sent or not, or alternatively just let the
   * application make requests, respond with pre-trained responses and assert that the end result is
   * what we expect it to be.
   *
   * This mock implementation can be used to respond with static or dynamic responses via the
   * `expect` and `when` apis and their shortcuts (`expectGET`, `whenPOST`, etc).
   *
   * When an Angular application needs some data from a server, it calls the $http service, which
   * sends the request to a real server using $httpBackend service. With dependency injection, it is
   * easy to inject $httpBackend mock (which has the same API as $httpBackend) and use it to verify
   * the requests and respond with some testing data without sending a request to a real server.
   *
   * There are two ways to specify what test data should be returned as http responses by the mock
   * backend when the code under test makes http requests:
   *
   * - `$httpBackend.expect` - specifies a request expectation
   * - `$httpBackend.when` - specifies a backend definition
   *
   *
   * # Request Expectations vs Backend Definitions
   *
   * Request expectations provide a way to make assertions about requests made by the application and
   * to define responses for those requests. The test will fail if the expected requests are not made
   * or they are made in the wrong order.
   *
   * Backend definitions allow you to define a fake backend for your application which doesn't assert
   * if a particular request was made or not, it just returns a trained response if a request is made.
   * The test will pass whether or not the request gets made during testing.
   *
   *
   * <table class="table">
   *   <tr><th width="220px"></th><th>Request expectations</th><th>Backend definitions</th></tr>
   *   <tr>
   *     <th>Syntax</th>
   *     <td>.expect(...).respond(...)</td>
   *     <td>.when(...).respond(...)</td>
   *   </tr>
   *   <tr>
   *     <th>Typical usage</th>
   *     <td>strict unit tests</td>
   *     <td>loose (black-box) unit testing</td>
   *   </tr>
   *   <tr>
   *     <th>Fulfills multiple requests</th>
   *     <td>NO</td>
   *     <td>YES</td>
   *   </tr>
   *   <tr>
   *     <th>Order of requests matters</th>
   *     <td>YES</td>
   *     <td>NO</td>
   *   </tr>
   *   <tr>
   *     <th>Request required</th>
   *     <td>YES</td>
   *     <td>NO</td>
   *   </tr>
   *   <tr>
   *     <th>Response required</th>
   *     <td>optional (see below)</td>
   *     <td>YES</td>
   *   </tr>
   * </table>
   *
   * In cases where both backend definitions and request expectations are specified during unit
   * testing, the request expectations are evaluated first.
   *
   * If a request expectation has no response specified, the algorithm will search your backend
   * definitions for an appropriate response.
   *
   * If a request didn't match any expectation or if the expectation doesn't have the response
   * defined, the backend definitions are evaluated in sequential order to see if any of them match
   * the request. The response from the first matched definition is returned.
   *
   *
   * # Flushing HTTP requests
   *
   * The $httpBackend used in production always responds to requests asynchronously. If we preserved
   * this behavior in unit testing, we'd have to create async unit tests, which are hard to write,
   * to follow and to maintain. But neither can the testing mock respond synchronously; that would
   * change the execution of the code under test. For this reason, the mock $httpBackend has a
   * `flush()` method, which allows the test to explicitly flush pending requests. This preserves
   * the async api of the backend, while allowing the test to execute synchronously.
   *
   *
   * # Unit testing with mock $httpBackend
   * The following code shows how to setup and use the mock backend when unit testing a controller.
   * First we create the controller under test:
   *
    ```js
    // The module code
    angular
      .module('MyApp', [])
      .controller('MyController', MyController);
  
    // The controller code
    function MyController($scope, $http) {
      var authToken;
  
      $http.get('/auth.py').success(function(data, status, headers) {
        authToken = headers('A-Token');
        $scope.user = data;
      });
  
      $scope.saveMessage = function(message) {
        var headers = { 'Authorization': authToken };
        $scope.status = 'Saving...';
  
        $http.post('/add-msg.py', message, { headers: headers } ).success(function(response) {
          $scope.status = '';
        }).error(function() {
          $scope.status = 'ERROR!';
        });
      };
    }
    ```
   *
   * Now we setup the mock backend and create the test specs:
   *
    ```js
      // testing controller
      describe('MyController', function() {
         var $httpBackend, $rootScope, createController, authRequestHandler;
  
         // Set up the module
         beforeEach(module('MyApp'));
  
         beforeEach(inject(function($injector) {
           // Set up the mock http service responses
           $httpBackend = $injector.get('$httpBackend');
           // backend definition common for all tests
           authRequestHandler = $httpBackend.when('GET', '/auth.py')
                                  .respond({userId: 'userX'}, {'A-Token': 'xxx'});
  
           // Get hold of a scope (i.e. the root scope)
           $rootScope = $injector.get('$rootScope');
           // The $controller service is used to create instances of controllers
           var $controller = $injector.get('$controller');
  
           createController = function() {
             return $controller('MyController', {'$scope' : $rootScope });
           };
         }));
  
  
         afterEach(function() {
           $httpBackend.verifyNoOutstandingExpectation();
           $httpBackend.verifyNoOutstandingRequest();
         });
  
  
         it('should fetch authentication token', function() {
           $httpBackend.expectGET('/auth.py');
           var controller = createController();
           $httpBackend.flush();
         });
  
  
         it('should fail authentication', function() {
  
           // Notice how you can change the response even after it was set
           authRequestHandler.respond(401, '');
  
           $httpBackend.expectGET('/auth.py');
           var controller = createController();
           $httpBackend.flush();
           expect($rootScope.status).toBe('Failed...');
         });
  
  
         it('should send msg to server', function() {
           var controller = createController();
           $httpBackend.flush();
  
           // now you don’t care about the authentication, but
           // the controller will still send the request and
           // $httpBackend will respond without you having to
           // specify the expectation and response for this request
  
           $httpBackend.expectPOST('/add-msg.py', 'message content').respond(201, '');
           $rootScope.saveMessage('message content');
           expect($rootScope.status).toBe('Saving...');
           $httpBackend.flush();
           expect($rootScope.status).toBe('');
         });
  
  
         it('should send auth header', function() {
           var controller = createController();
           $httpBackend.flush();
  
           $httpBackend.expectPOST('/add-msg.py', undefined, function(headers) {
             // check if the header was send, if it wasn't the expectation won't
             // match the request and the test will fail
             return headers['Authorization'] == 'xxx';
           }).respond(201, '');
  
           $rootScope.saveMessage('whatever');
           $httpBackend.flush();
         });
      });
     ```
   */
  angular.mock.$HttpBackendProvider = function () {
    this.$get = ['$rootScope', '$timeout', createHttpBackendMock];
  };

  /**
   * General factory function for $httpBackend mock.
   * Returns instance for unit testing (when no arguments specified):
   *   - passing through is disabled
   *   - auto flushing is disabled
   *
   * Returns instance for e2e testing (when `$delegate` and `$browser` specified):
   *   - passing through (delegating request to real backend) is enabled
   *   - auto flushing is enabled
   *
   * @param {Object=} $delegate Real $httpBackend instance (allow passing through if specified)
   * @param {Object=} $browser Auto-flushing enabled if specified
   * @return {Object} Instance of $httpBackend mock
   */
  function createHttpBackendMock($rootScope, $timeout, $delegate, $browser) {
    var definitions = [],
        expectations = [],
        responses = [],
        responsesPush = angular.bind(responses, responses.push),
        copy = angular.copy;

    function createResponse(status, data, headers, statusText) {
      if (angular.isFunction(status)) return status;

      return function () {
        return angular.isNumber(status) ? [status, data, headers, statusText] : [200, status, data, headers];
      };
    }

    // TODO(vojta): change params to: method, url, data, headers, callback
    function $httpBackend(method, url, data, callback, headers, timeout, withCredentials) {
      var xhr = new MockXhr(),
          expectation = expectations[0],
          wasExpected = false;

      function prettyPrint(data) {
        return angular.isString(data) || angular.isFunction(data) || data instanceof RegExp ? data : angular.toJson(data);
      }

      function wrapResponse(wrapped) {
        if (!$browser && timeout) {
          timeout.then ? timeout.then(handleTimeout) : $timeout(handleTimeout, timeout);
        }

        return handleResponse;

        function handleResponse() {
          var response = wrapped.response(method, url, data, headers);
          xhr.$$respHeaders = response[2];
          callback(copy(response[0]), copy(response[1]), xhr.getAllResponseHeaders(), copy(response[3] || ''));
        }

        function handleTimeout() {
          for (var i = 0, ii = responses.length; i < ii; i++) {
            if (responses[i] === handleResponse) {
              responses.splice(i, 1);
              callback(-1, undefined, '');
              break;
            }
          }
        }
      }

      if (expectation && expectation.match(method, url)) {
        if (!expectation.matchData(data)) throw new Error('Expected ' + expectation + ' with different data\n' + 'EXPECTED: ' + prettyPrint(expectation.data) + '\nGOT:      ' + data);

        if (!expectation.matchHeaders(headers)) throw new Error('Expected ' + expectation + ' with different headers\n' + 'EXPECTED: ' + prettyPrint(expectation.headers) + '\nGOT:      ' + prettyPrint(headers));

        expectations.shift();

        if (expectation.response) {
          responses.push(wrapResponse(expectation));
          return;
        }
        wasExpected = true;
      }

      var i = -1,
          definition;
      while (definition = definitions[++i]) {
        if (definition.match(method, url, data, headers || {})) {
          if (definition.response) {
            // if $browser specified, we do auto flush all requests
            ($browser ? $browser.defer : responsesPush)(wrapResponse(definition));
          } else if (definition.passThrough) {
            $delegate(method, url, data, callback, headers, timeout, withCredentials);
          } else throw new Error('No response defined !');
          return;
        }
      }
      throw wasExpected ? new Error('No response defined !') : new Error('Unexpected request: ' + method + ' ' + url + '\n' + (expectation ? 'Expected ' + expectation : 'No more request expected'));
    }

    /**
     * @ngdoc method
     * @name $httpBackend#when
     * @description
     * Creates a new backend definition.
     *
     * @param {string} method HTTP method.
     * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
     *   and returns true if the url match the current definition.
     * @param {(string|RegExp|function(string))=} data HTTP request body or function that receives
     *   data string and returns true if the data is as expected.
     * @param {(Object|function(Object))=} headers HTTP headers or function that receives http header
     *   object and returns true if the headers match the current definition.
     * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
     *   request is handled. You can save this object for later use and invoke `respond` again in
     *   order to change how a matched request is handled.
     *
     *  - respond –
     *      `{function([status,] data[, headers, statusText])
     *      | function(function(method, url, data, headers)}`
     *    – The respond method takes a set of static data to be returned or a function that can
     *    return an array containing response status (number), response data (string), response
     *    headers (Object), and the text for the status (string). The respond method returns the
     *    `requestHandler` object for possible overrides.
     */
    $httpBackend.when = function (method, url, data, headers) {
      var definition = new MockHttpExpectation(method, url, data, headers),
          chain = {
        respond: function respond(status, data, headers, statusText) {
          definition.passThrough = undefined;
          definition.response = createResponse(status, data, headers, statusText);
          return chain;
        }
      };

      if ($browser) {
        chain.passThrough = function () {
          definition.response = undefined;
          definition.passThrough = true;
          return chain;
        };
      }

      definitions.push(definition);
      return chain;
    };

    /**
     * @ngdoc method
     * @name $httpBackend#whenGET
     * @description
     * Creates a new backend definition for GET requests. For more info see `when()`.
     *
     * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
     *   and returns true if the url match the current definition.
     * @param {(Object|function(Object))=} headers HTTP headers.
     * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
     * request is handled. You can save this object for later use and invoke `respond` again in
     * order to change how a matched request is handled.
     */

    /**
     * @ngdoc method
     * @name $httpBackend#whenHEAD
     * @description
     * Creates a new backend definition for HEAD requests. For more info see `when()`.
     *
     * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
     *   and returns true if the url match the current definition.
     * @param {(Object|function(Object))=} headers HTTP headers.
     * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
     * request is handled. You can save this object for later use and invoke `respond` again in
     * order to change how a matched request is handled.
     */

    /**
     * @ngdoc method
     * @name $httpBackend#whenDELETE
     * @description
     * Creates a new backend definition for DELETE requests. For more info see `when()`.
     *
     * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
     *   and returns true if the url match the current definition.
     * @param {(Object|function(Object))=} headers HTTP headers.
     * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
     * request is handled. You can save this object for later use and invoke `respond` again in
     * order to change how a matched request is handled.
     */

    /**
     * @ngdoc method
     * @name $httpBackend#whenPOST
     * @description
     * Creates a new backend definition for POST requests. For more info see `when()`.
     *
     * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
     *   and returns true if the url match the current definition.
     * @param {(string|RegExp|function(string))=} data HTTP request body or function that receives
     *   data string and returns true if the data is as expected.
     * @param {(Object|function(Object))=} headers HTTP headers.
     * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
     * request is handled. You can save this object for later use and invoke `respond` again in
     * order to change how a matched request is handled.
     */

    /**
     * @ngdoc method
     * @name $httpBackend#whenPUT
     * @description
     * Creates a new backend definition for PUT requests.  For more info see `when()`.
     *
     * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
     *   and returns true if the url match the current definition.
     * @param {(string|RegExp|function(string))=} data HTTP request body or function that receives
     *   data string and returns true if the data is as expected.
     * @param {(Object|function(Object))=} headers HTTP headers.
     * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
     * request is handled. You can save this object for later use and invoke `respond` again in
     * order to change how a matched request is handled.
     */

    /**
     * @ngdoc method
     * @name $httpBackend#whenJSONP
     * @description
     * Creates a new backend definition for JSONP requests. For more info see `when()`.
     *
     * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
     *   and returns true if the url match the current definition.
     * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
     * request is handled. You can save this object for later use and invoke `respond` again in
     * order to change how a matched request is handled.
     */
    createShortMethods('when');

    /**
     * @ngdoc method
     * @name $httpBackend#expect
     * @description
     * Creates a new request expectation.
     *
     * @param {string} method HTTP method.
     * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
     *   and returns true if the url match the current definition.
     * @param {(string|RegExp|function(string)|Object)=} data HTTP request body or function that
     *  receives data string and returns true if the data is as expected, or Object if request body
     *  is in JSON format.
     * @param {(Object|function(Object))=} headers HTTP headers or function that receives http header
     *   object and returns true if the headers match the current expectation.
     * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
     *  request is handled. You can save this object for later use and invoke `respond` again in
     *  order to change how a matched request is handled.
     *
     *  - respond –
     *    `{function([status,] data[, headers, statusText])
     *    | function(function(method, url, data, headers)}`
     *    – The respond method takes a set of static data to be returned or a function that can
     *    return an array containing response status (number), response data (string), response
     *    headers (Object), and the text for the status (string). The respond method returns the
     *    `requestHandler` object for possible overrides.
     */
    $httpBackend.expect = function (method, url, data, headers) {
      var expectation = new MockHttpExpectation(method, url, data, headers),
          chain = {
        respond: function respond(status, data, headers, statusText) {
          expectation.response = createResponse(status, data, headers, statusText);
          return chain;
        }
      };

      expectations.push(expectation);
      return chain;
    };

    /**
     * @ngdoc method
     * @name $httpBackend#expectGET
     * @description
     * Creates a new request expectation for GET requests. For more info see `expect()`.
     *
     * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
     *   and returns true if the url match the current definition.
     * @param {Object=} headers HTTP headers.
     * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
     * request is handled. You can save this object for later use and invoke `respond` again in
     * order to change how a matched request is handled. See #expect for more info.
     */

    /**
     * @ngdoc method
     * @name $httpBackend#expectHEAD
     * @description
     * Creates a new request expectation for HEAD requests. For more info see `expect()`.
     *
     * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
     *   and returns true if the url match the current definition.
     * @param {Object=} headers HTTP headers.
     * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
     *   request is handled. You can save this object for later use and invoke `respond` again in
     *   order to change how a matched request is handled.
     */

    /**
     * @ngdoc method
     * @name $httpBackend#expectDELETE
     * @description
     * Creates a new request expectation for DELETE requests. For more info see `expect()`.
     *
     * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
     *   and returns true if the url match the current definition.
     * @param {Object=} headers HTTP headers.
     * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
     *   request is handled. You can save this object for later use and invoke `respond` again in
     *   order to change how a matched request is handled.
     */

    /**
     * @ngdoc method
     * @name $httpBackend#expectPOST
     * @description
     * Creates a new request expectation for POST requests. For more info see `expect()`.
     *
     * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
     *   and returns true if the url match the current definition.
     * @param {(string|RegExp|function(string)|Object)=} data HTTP request body or function that
     *  receives data string and returns true if the data is as expected, or Object if request body
     *  is in JSON format.
     * @param {Object=} headers HTTP headers.
     * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
     *   request is handled. You can save this object for later use and invoke `respond` again in
     *   order to change how a matched request is handled.
     */

    /**
     * @ngdoc method
     * @name $httpBackend#expectPUT
     * @description
     * Creates a new request expectation for PUT requests. For more info see `expect()`.
     *
     * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
     *   and returns true if the url match the current definition.
     * @param {(string|RegExp|function(string)|Object)=} data HTTP request body or function that
     *  receives data string and returns true if the data is as expected, or Object if request body
     *  is in JSON format.
     * @param {Object=} headers HTTP headers.
     * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
     *   request is handled. You can save this object for later use and invoke `respond` again in
     *   order to change how a matched request is handled.
     */

    /**
     * @ngdoc method
     * @name $httpBackend#expectPATCH
     * @description
     * Creates a new request expectation for PATCH requests. For more info see `expect()`.
     *
     * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
     *   and returns true if the url match the current definition.
     * @param {(string|RegExp|function(string)|Object)=} data HTTP request body or function that
     *  receives data string and returns true if the data is as expected, or Object if request body
     *  is in JSON format.
     * @param {Object=} headers HTTP headers.
     * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
     *   request is handled. You can save this object for later use and invoke `respond` again in
     *   order to change how a matched request is handled.
     */

    /**
     * @ngdoc method
     * @name $httpBackend#expectJSONP
     * @description
     * Creates a new request expectation for JSONP requests. For more info see `expect()`.
     *
     * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
     *   and returns true if the url match the current definition.
     * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
     *   request is handled. You can save this object for later use and invoke `respond` again in
     *   order to change how a matched request is handled.
     */
    createShortMethods('expect');

    /**
     * @ngdoc method
     * @name $httpBackend#flush
     * @description
     * Flushes all pending requests using the trained responses.
     *
     * @param {number=} count Number of responses to flush (in the order they arrived). If undefined,
     *   all pending requests will be flushed. If there are no pending requests when the flush method
     *   is called an exception is thrown (as this typically a sign of programming error).
     */
    $httpBackend.flush = function (count, digest) {
      if (digest !== false) $rootScope.$digest();
      if (!responses.length) throw new Error('No pending request to flush !');

      if (angular.isDefined(count) && count !== null) {
        while (count--) {
          if (!responses.length) throw new Error('No more pending request to flush !');
          responses.shift()();
        }
      } else {
        while (responses.length) {
          responses.shift()();
        }
      }
      $httpBackend.verifyNoOutstandingExpectation(digest);
    };

    /**
     * @ngdoc method
     * @name $httpBackend#verifyNoOutstandingExpectation
     * @description
     * Verifies that all of the requests defined via the `expect` api were made. If any of the
     * requests were not made, verifyNoOutstandingExpectation throws an exception.
     *
     * Typically, you would call this method following each test case that asserts requests using an
     * "afterEach" clause.
     *
     * ```js
     *   afterEach($httpBackend.verifyNoOutstandingExpectation);
     * ```
     */
    $httpBackend.verifyNoOutstandingExpectation = function (digest) {
      if (digest !== false) $rootScope.$digest();
      if (expectations.length) {
        throw new Error('Unsatisfied requests: ' + expectations.join(', '));
      }
    };

    /**
     * @ngdoc method
     * @name $httpBackend#verifyNoOutstandingRequest
     * @description
     * Verifies that there are no outstanding requests that need to be flushed.
     *
     * Typically, you would call this method following each test case that asserts requests using an
     * "afterEach" clause.
     *
     * ```js
     *   afterEach($httpBackend.verifyNoOutstandingRequest);
     * ```
     */
    $httpBackend.verifyNoOutstandingRequest = function () {
      if (responses.length) {
        throw new Error('Unflushed requests: ' + responses.length);
      }
    };

    /**
     * @ngdoc method
     * @name $httpBackend#resetExpectations
     * @description
     * Resets all request expectations, but preserves all backend definitions. Typically, you would
     * call resetExpectations during a multiple-phase test when you want to reuse the same instance of
     * $httpBackend mock.
     */
    $httpBackend.resetExpectations = function () {
      expectations.length = 0;
      responses.length = 0;
    };

    return $httpBackend;

    function createShortMethods(prefix) {
      angular.forEach(['GET', 'DELETE', 'JSONP', 'HEAD'], function (method) {
        $httpBackend[prefix + method] = function (url, headers) {
          return $httpBackend[prefix](method, url, undefined, headers);
        };
      });

      angular.forEach(['PUT', 'POST', 'PATCH'], function (method) {
        $httpBackend[prefix + method] = function (url, data, headers) {
          return $httpBackend[prefix](method, url, data, headers);
        };
      });
    }
  }

  function MockHttpExpectation(method, url, data, headers) {

    this.data = data;
    this.headers = headers;

    this.match = function (m, u, d, h) {
      if (method != m) return false;
      if (!this.matchUrl(u)) return false;
      if (angular.isDefined(d) && !this.matchData(d)) return false;
      if (angular.isDefined(h) && !this.matchHeaders(h)) return false;
      return true;
    };

    this.matchUrl = function (u) {
      if (!url) return true;
      if (angular.isFunction(url.test)) return url.test(u);
      if (angular.isFunction(url)) return url(u);
      return url == u;
    };

    this.matchHeaders = function (h) {
      if (angular.isUndefined(headers)) return true;
      if (angular.isFunction(headers)) return headers(h);
      return angular.equals(headers, h);
    };

    this.matchData = function (d) {
      if (angular.isUndefined(data)) return true;
      if (data && angular.isFunction(data.test)) return data.test(d);
      if (data && angular.isFunction(data)) return data(d);
      if (data && !angular.isString(data)) {
        return angular.equals(angular.fromJson(angular.toJson(data)), angular.fromJson(d));
      }
      return data == d;
    };

    this.toString = function () {
      return method + ' ' + url;
    };
  }

  function createMockXhr() {
    return new MockXhr();
  }

  function MockXhr() {

    // hack for testing $http, $httpBackend
    MockXhr.$$lastInstance = this;

    this.open = function (method, url, async) {
      this.$$method = method;
      this.$$url = url;
      this.$$async = async;
      this.$$reqHeaders = {};
      this.$$respHeaders = {};
    };

    this.send = function (data) {
      this.$$data = data;
    };

    this.setRequestHeader = function (key, value) {
      this.$$reqHeaders[key] = value;
    };

    this.getResponseHeader = function (name) {
      // the lookup must be case insensitive,
      // that's why we try two quick lookups first and full scan last
      var header = this.$$respHeaders[name];
      if (header) return header;

      name = angular.lowercase(name);
      header = this.$$respHeaders[name];
      if (header) return header;

      header = undefined;
      angular.forEach(this.$$respHeaders, function (headerVal, headerName) {
        if (!header && angular.lowercase(headerName) == name) header = headerVal;
      });
      return header;
    };

    this.getAllResponseHeaders = function () {
      var lines = [];

      angular.forEach(this.$$respHeaders, function (value, key) {
        lines.push(key + ': ' + value);
      });
      return lines.join('\n');
    };

    this.abort = angular.noop;
  }

  /**
   * @ngdoc service
   * @name $timeout
   * @description
   *
   * This service is just a simple decorator for {@link ng.$timeout $timeout} service
   * that adds a "flush" and "verifyNoPendingTasks" methods.
   */

  angular.mock.$TimeoutDecorator = ['$delegate', '$browser', function ($delegate, $browser) {

    /**
     * @ngdoc method
     * @name $timeout#flush
     * @description
     *
     * Flushes the queue of pending tasks.
     *
     * @param {number=} delay maximum timeout amount to flush up until
     */
    $delegate.flush = function (delay) {
      $browser.defer.flush(delay);
    };

    /**
     * @ngdoc method
     * @name $timeout#verifyNoPendingTasks
     * @description
     *
     * Verifies that there are no pending tasks that need to be flushed.
     */
    $delegate.verifyNoPendingTasks = function () {
      if ($browser.deferredFns.length) {
        throw new Error('Deferred tasks to flush (' + $browser.deferredFns.length + '): ' + formatPendingTasksAsString($browser.deferredFns));
      }
    };

    function formatPendingTasksAsString(tasks) {
      var result = [];
      angular.forEach(tasks, function (task) {
        result.push('{id: ' + task.id + ', ' + 'time: ' + task.time + '}');
      });

      return result.join(', ');
    }

    return $delegate;
  }];

  angular.mock.$RAFDecorator = ['$delegate', function ($delegate) {
    var queue,
        rafFn = function rafFn(fn) {
      var index = queue.length;
      queue.push(fn);
      return function () {
        queue.splice(index, 1);
      };
    };

    queue = rafFn.queue = [];

    rafFn.supported = $delegate.supported;

    rafFn.flush = function () {
      if (queue.length === 0) {
        throw new Error('No rAF callbacks present');
      }

      var length = queue.length;
      for (var i = 0; i < length; i++) {
        queue[i]();
      }

      queue.length = 0;
    };

    return rafFn;
  }];

  angular.mock.$AsyncCallbackDecorator = ['$delegate', function ($delegate) {
    var queue,
        addFn = function addFn(fn) {
      queue.push(fn);
    };
    queue = addFn.queue = [];
    addFn.flush = function () {
      angular.forEach(queue, function (fn) {
        fn();
      });
      queue.length = 0;
    };
    return addFn;
  }];

  /**
   *
   */
  angular.mock.$RootElementProvider = function () {
    this.$get = function () {
      return angular.element('<div ng-app></div>');
    };
  };

  /**
   * @ngdoc service
   * @name $controller
   * @description
   * A decorator for {@link ng.$controller} with additional `bindings` parameter, useful when testing
   * controllers of directives that use {@link $compile#-bindtocontroller- `bindToController`}.
   *
   *
   * ## Example
   *
   * ```js
   *
   * // Directive definition ...
   *
   * myMod.directive('myDirective', {
   *   controller: 'MyDirectiveController',
   *   bindToController: {
   *     name: '@'
   *   }
   * });
   *
   *
   * // Controller definition ...
   *
   * myMod.controller('MyDirectiveController', ['log', function($log) {
   *   $log.info(this.name);
   * })];
   *
   *
   * // In a test ...
   *
   * describe('myDirectiveController', function() {
   *   it('should write the bound name to the log', inject(function($controller, $log) {
   *     var ctrl = $controller('MyDirective', { /* no locals &#42;/ }, { name: 'Clark Kent' });
   *     expect(ctrl.name).toEqual('Clark Kent');
   *     expect($log.info.logs).toEqual(['Clark Kent']);
   *   });
   * });
   *
   * ```
   *
   * @param {Function|string} constructor If called with a function then it's considered to be the
   *    controller constructor function. Otherwise it's considered to be a string which is used
   *    to retrieve the controller constructor using the following steps:
   *
   *    * check if a controller with given name is registered via `$controllerProvider`
   *    * check if evaluating the string on the current scope returns a constructor
   *    * if $controllerProvider#allowGlobals, check `window[constructor]` on the global
   *      `window` object (not recommended)
   *
   *    The string can use the `controller as property` syntax, where the controller instance is published
   *    as the specified property on the `scope`; the `scope` must be injected into `locals` param for this
   *    to work correctly.
   *
   * @param {Object} locals Injection locals for Controller.
   * @param {Object=} bindings Properties to add to the controller before invoking the constructor. This is used
   *                           to simulate the `bindToController` feature and simplify certain kinds of tests.
   * @return {Object} Instance of given controller.
   */
  angular.mock.$ControllerDecorator = ['$delegate', function ($delegate) {
    return function (expression, locals, later, ident) {
      if (later && (typeof later === 'undefined' ? 'undefined' : _typeof(later)) === 'object') {
        var create = $delegate(expression, locals, true, ident);
        angular.extend(create.instance, later);
        return create();
      }
      return $delegate(expression, locals, later, ident);
    };
  }];

  /**
   * @ngdoc module
   * @name ngMock
   * @packageName angular-mocks
   * @description
   *
   * # ngMock
   *
   * The `ngMock` module provides support to inject and mock Angular services into unit tests.
   * In addition, ngMock also extends various core ng services such that they can be
   * inspected and controlled in a synchronous manner within test code.
   *
   *
   * <div doc-module-components="ngMock"></div>
   *
   */
  angular.module('ngMock', ['ng']).provider({
    $browser: angular.mock.$BrowserProvider,
    $exceptionHandler: angular.mock.$ExceptionHandlerProvider,
    $log: angular.mock.$LogProvider,
    $interval: angular.mock.$IntervalProvider,
    $httpBackend: angular.mock.$HttpBackendProvider,
    $rootElement: angular.mock.$RootElementProvider
  }).config(['$provide', function ($provide) {
    $provide.decorator('$timeout', angular.mock.$TimeoutDecorator);
    $provide.decorator('$$rAF', angular.mock.$RAFDecorator);
    $provide.decorator('$$asyncCallback', angular.mock.$AsyncCallbackDecorator);
    $provide.decorator('$rootScope', angular.mock.$RootScopeDecorator);
    $provide.decorator('$controller', angular.mock.$ControllerDecorator);
  }]);

  /**
   * @ngdoc module
   * @name ngMockE2E
   * @module ngMockE2E
   * @packageName angular-mocks
   * @description
   *
   * The `ngMockE2E` is an angular module which contains mocks suitable for end-to-end testing.
   * Currently there is only one mock present in this module -
   * the {@link ngMockE2E.$httpBackend e2e $httpBackend} mock.
   */
  angular.module('ngMockE2E', ['ng']).config(['$provide', function ($provide) {
    $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
  }]);

  /**
   * @ngdoc service
   * @name $httpBackend
   * @module ngMockE2E
   * @description
   * Fake HTTP backend implementation suitable for end-to-end testing or backend-less development of
   * applications that use the {@link ng.$http $http service}.
   *
   * *Note*: For fake http backend implementation suitable for unit testing please see
   * {@link ngMock.$httpBackend unit-testing $httpBackend mock}.
   *
   * This implementation can be used to respond with static or dynamic responses via the `when` api
   * and its shortcuts (`whenGET`, `whenPOST`, etc) and optionally pass through requests to the
   * real $httpBackend for specific requests (e.g. to interact with certain remote apis or to fetch
   * templates from a webserver).
   *
   * As opposed to unit-testing, in an end-to-end testing scenario or in scenario when an application
   * is being developed with the real backend api replaced with a mock, it is often desirable for
   * certain category of requests to bypass the mock and issue a real http request (e.g. to fetch
   * templates or static files from the webserver). To configure the backend with this behavior
   * use the `passThrough` request handler of `when` instead of `respond`.
   *
   * Additionally, we don't want to manually have to flush mocked out requests like we do during unit
   * testing. For this reason the e2e $httpBackend flushes mocked out requests
   * automatically, closely simulating the behavior of the XMLHttpRequest object.
   *
   * To setup the application to run with this http backend, you have to create a module that depends
   * on the `ngMockE2E` and your application modules and defines the fake backend:
   *
   * ```js
   *   myAppDev = angular.module('myAppDev', ['myApp', 'ngMockE2E']);
   *   myAppDev.run(function($httpBackend) {
   *     phones = [{name: 'phone1'}, {name: 'phone2'}];
   *
   *     // returns the current list of phones
   *     $httpBackend.whenGET('/phones').respond(phones);
   *
   *     // adds a new phone to the phones array
   *     $httpBackend.whenPOST('/phones').respond(function(method, url, data) {
   *       var phone = angular.fromJson(data);
   *       phones.push(phone);
   *       return [200, phone, {}];
   *     });
   *     $httpBackend.whenGET(/^\/templates\//).passThrough();
   *     //...
   *   });
   * ```
   *
   * Afterwards, bootstrap your app with this new module.
   */

  /**
   * @ngdoc method
   * @name $httpBackend#when
   * @module ngMockE2E
   * @description
   * Creates a new backend definition.
   *
   * @param {string} method HTTP method.
   * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
   *   and returns true if the url match the current definition.
   * @param {(string|RegExp)=} data HTTP request body.
   * @param {(Object|function(Object))=} headers HTTP headers or function that receives http header
   *   object and returns true if the headers match the current definition.
   * @returns {requestHandler} Returns an object with `respond` and `passThrough` methods that
   *   control how a matched request is handled. You can save this object for later use and invoke
   *   `respond` or `passThrough` again in order to change how a matched request is handled.
   *
   *  - respond –
   *    `{function([status,] data[, headers, statusText])
   *    | function(function(method, url, data, headers)}`
   *    – The respond method takes a set of static data to be returned or a function that can return
   *    an array containing response status (number), response data (string), response headers
   *    (Object), and the text for the status (string).
   *  - passThrough – `{function()}` – Any request matching a backend definition with
   *    `passThrough` handler will be passed through to the real backend (an XHR request will be made
   *    to the server.)
   *  - Both methods return the `requestHandler` object for possible overrides.
   */

  /**
   * @ngdoc method
   * @name $httpBackend#whenGET
   * @module ngMockE2E
   * @description
   * Creates a new backend definition for GET requests. For more info see `when()`.
   *
   * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
   *   and returns true if the url match the current definition.
   * @param {(Object|function(Object))=} headers HTTP headers.
   * @returns {requestHandler} Returns an object with `respond` and `passThrough` methods that
   *   control how a matched request is handled. You can save this object for later use and invoke
   *   `respond` or `passThrough` again in order to change how a matched request is handled.
   */

  /**
   * @ngdoc method
   * @name $httpBackend#whenHEAD
   * @module ngMockE2E
   * @description
   * Creates a new backend definition for HEAD requests. For more info see `when()`.
   *
   * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
   *   and returns true if the url match the current definition.
   * @param {(Object|function(Object))=} headers HTTP headers.
   * @returns {requestHandler} Returns an object with `respond` and `passThrough` methods that
   *   control how a matched request is handled. You can save this object for later use and invoke
   *   `respond` or `passThrough` again in order to change how a matched request is handled.
   */

  /**
   * @ngdoc method
   * @name $httpBackend#whenDELETE
   * @module ngMockE2E
   * @description
   * Creates a new backend definition for DELETE requests. For more info see `when()`.
   *
   * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
   *   and returns true if the url match the current definition.
   * @param {(Object|function(Object))=} headers HTTP headers.
   * @returns {requestHandler} Returns an object with `respond` and `passThrough` methods that
   *   control how a matched request is handled. You can save this object for later use and invoke
   *   `respond` or `passThrough` again in order to change how a matched request is handled.
   */

  /**
   * @ngdoc method
   * @name $httpBackend#whenPOST
   * @module ngMockE2E
   * @description
   * Creates a new backend definition for POST requests. For more info see `when()`.
   *
   * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
   *   and returns true if the url match the current definition.
   * @param {(string|RegExp)=} data HTTP request body.
   * @param {(Object|function(Object))=} headers HTTP headers.
   * @returns {requestHandler} Returns an object with `respond` and `passThrough` methods that
   *   control how a matched request is handled. You can save this object for later use and invoke
   *   `respond` or `passThrough` again in order to change how a matched request is handled.
   */

  /**
   * @ngdoc method
   * @name $httpBackend#whenPUT
   * @module ngMockE2E
   * @description
   * Creates a new backend definition for PUT requests.  For more info see `when()`.
   *
   * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
   *   and returns true if the url match the current definition.
   * @param {(string|RegExp)=} data HTTP request body.
   * @param {(Object|function(Object))=} headers HTTP headers.
   * @returns {requestHandler} Returns an object with `respond` and `passThrough` methods that
   *   control how a matched request is handled. You can save this object for later use and invoke
   *   `respond` or `passThrough` again in order to change how a matched request is handled.
   */

  /**
   * @ngdoc method
   * @name $httpBackend#whenPATCH
   * @module ngMockE2E
   * @description
   * Creates a new backend definition for PATCH requests.  For more info see `when()`.
   *
   * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
   *   and returns true if the url match the current definition.
   * @param {(string|RegExp)=} data HTTP request body.
   * @param {(Object|function(Object))=} headers HTTP headers.
   * @returns {requestHandler} Returns an object with `respond` and `passThrough` methods that
   *   control how a matched request is handled. You can save this object for later use and invoke
   *   `respond` or `passThrough` again in order to change how a matched request is handled.
   */

  /**
   * @ngdoc method
   * @name $httpBackend#whenJSONP
   * @module ngMockE2E
   * @description
   * Creates a new backend definition for JSONP requests. For more info see `when()`.
   *
   * @param {string|RegExp|function(string)} url HTTP url or function that receives the url
   *   and returns true if the url match the current definition.
   * @returns {requestHandler} Returns an object with `respond` and `passThrough` methods that
   *   control how a matched request is handled. You can save this object for later use and invoke
   *   `respond` or `passThrough` again in order to change how a matched request is handled.
   */
  angular.mock.e2e = {};
  angular.mock.e2e.$httpBackendDecorator = ['$rootScope', '$timeout', '$delegate', '$browser', createHttpBackendMock];

  /**
   * @ngdoc type
   * @name $rootScope.Scope
   * @module ngMock
   * @description
   * {@link ng.$rootScope.Scope Scope} type decorated with helper methods useful for testing. These
   * methods are automatically available on any {@link ng.$rootScope.Scope Scope} instance when
   * `ngMock` module is loaded.
   *
   * In addition to all the regular `Scope` methods, the following helper methods are available:
   */
  angular.mock.$RootScopeDecorator = ['$delegate', function ($delegate) {

    var $rootScopePrototype = Object.getPrototypeOf($delegate);

    $rootScopePrototype.$countChildScopes = countChildScopes;
    $rootScopePrototype.$countWatchers = countWatchers;

    return $delegate;

    // ------------------------------------------------------------------------------------------ //

    /**
     * @ngdoc method
     * @name $rootScope.Scope#$countChildScopes
     * @module ngMock
     * @description
     * Counts all the direct and indirect child scopes of the current scope.
     *
     * The current scope is excluded from the count. The count includes all isolate child scopes.
     *
     * @returns {number} Total number of child scopes.
     */
    function countChildScopes() {
      // jshint validthis: true
      var count = 0; // exclude the current scope
      var pendingChildHeads = [this.$$childHead];
      var currentScope;

      while (pendingChildHeads.length) {
        currentScope = pendingChildHeads.shift();

        while (currentScope) {
          count += 1;
          pendingChildHeads.push(currentScope.$$childHead);
          currentScope = currentScope.$$nextSibling;
        }
      }

      return count;
    }

    /**
     * @ngdoc method
     * @name $rootScope.Scope#$countWatchers
     * @module ngMock
     * @description
     * Counts all the watchers of direct and indirect child scopes of the current scope.
     *
     * The watchers of the current scope are included in the count and so are all the watchers of
     * isolate child scopes.
     *
     * @returns {number} Total number of watchers.
     */
    function countWatchers() {
      // jshint validthis: true
      var count = this.$$watchers ? this.$$watchers.length : 0; // include the current scope
      var pendingChildHeads = [this.$$childHead];
      var currentScope;

      while (pendingChildHeads.length) {
        currentScope = pendingChildHeads.shift();

        while (currentScope) {
          count += currentScope.$$watchers ? currentScope.$$watchers.length : 0;
          pendingChildHeads.push(currentScope.$$childHead);
          currentScope = currentScope.$$nextSibling;
        }
      }

      return count;
    }
  }];

  if (window.jasmine || window.mocha) {

    var currentSpec = null,
        annotatedFunctions = [],
        isSpecRunning = function isSpecRunning() {
      return !!currentSpec;
    };

    angular.mock.$$annotate = angular.injector.$$annotate;
    angular.injector.$$annotate = function (fn) {
      if (typeof fn === 'function' && !fn.$inject) {
        annotatedFunctions.push(fn);
      }
      return angular.mock.$$annotate.apply(this, arguments);
    };

    (window.beforeEach || window.setup)(function () {
      annotatedFunctions = [];
      currentSpec = this;
    });

    (window.afterEach || window.teardown)(function () {
      var injector = currentSpec.$injector;

      annotatedFunctions.forEach(function (fn) {
        delete fn.$inject;
      });

      angular.forEach(currentSpec.$modules, function (module) {
        if (module && module.$$hashKey) {
          module.$$hashKey = undefined;
        }
      });

      currentSpec.$injector = null;
      currentSpec.$modules = null;
      currentSpec = null;

      if (injector) {
        injector.get('$rootElement').off();
        var $browser = injector.get('$browser');
        if ($browser.pollFns) $browser.pollFns.length = 0;
      }

      // clean up jquery's fragment cache
      angular.forEach(angular.element.fragments, function (val, key) {
        delete angular.element.fragments[key];
      });

      MockXhr.$$lastInstance = null;

      angular.forEach(angular.callbacks, function (val, key) {
        delete angular.callbacks[key];
      });
      angular.callbacks.counter = 0;
    });

    /**
     * @ngdoc function
     * @name angular.mock.module
     * @description
     *
     * *NOTE*: This function is also published on window for easy access.<br>
     * *NOTE*: This function is declared ONLY WHEN running tests with jasmine or mocha
     *
     * This function registers a module configuration code. It collects the configuration information
     * which will be used when the injector is created by {@link angular.mock.inject inject}.
     *
     * See {@link angular.mock.inject inject} for usage example
     *
     * @param {...(string|Function|Object)} fns any number of modules which are represented as string
     *        aliases or as anonymous module initialization functions. The modules are used to
     *        configure the injector. The 'ng' and 'ngMock' modules are automatically loaded. If an
     *        object literal is passed they will be registered as values in the module, the key being
     *        the module name and the value being what is returned.
     */
    window.module = angular.mock.module = function () {
      var moduleFns = Array.prototype.slice.call(arguments, 0);
      return isSpecRunning() ? workFn() : workFn;
      /////////////////////
      function workFn() {
        if (currentSpec.$injector) {
          throw new Error('Injector already created, can not register a module!');
        } else {
          var modules = currentSpec.$modules || (currentSpec.$modules = []);
          angular.forEach(moduleFns, function (module) {
            if (angular.isObject(module) && !angular.isArray(module)) {
              modules.push(function ($provide) {
                angular.forEach(module, function (value, key) {
                  $provide.value(key, value);
                });
              });
            } else {
              modules.push(module);
            }
          });
        }
      }
    };

    /**
     * @ngdoc function
     * @name angular.mock.inject
     * @description
     *
     * *NOTE*: This function is also published on window for easy access.<br>
     * *NOTE*: This function is declared ONLY WHEN running tests with jasmine or mocha
     *
     * The inject function wraps a function into an injectable function. The inject() creates new
     * instance of {@link auto.$injector $injector} per test, which is then used for
     * resolving references.
     *
     *
     * ## Resolving References (Underscore Wrapping)
     * Often, we would like to inject a reference once, in a `beforeEach()` block and reuse this
     * in multiple `it()` clauses. To be able to do this we must assign the reference to a variable
     * that is declared in the scope of the `describe()` block. Since we would, most likely, want
     * the variable to have the same name of the reference we have a problem, since the parameter
     * to the `inject()` function would hide the outer variable.
     *
     * To help with this, the injected parameters can, optionally, be enclosed with underscores.
     * These are ignored by the injector when the reference name is resolved.
     *
     * For example, the parameter `_myService_` would be resolved as the reference `myService`.
     * Since it is available in the function body as _myService_, we can then assign it to a variable
     * defined in an outer scope.
     *
     * ```
     * // Defined out reference variable outside
     * var myService;
     *
     * // Wrap the parameter in underscores
     * beforeEach( inject( function(_myService_){
     *   myService = _myService_;
     * }));
     *
     * // Use myService in a series of tests.
     * it('makes use of myService', function() {
     *   myService.doStuff();
     * });
     *
     * ```
     *
     * See also {@link angular.mock.module angular.mock.module}
     *
     * ## Example
     * Example of what a typical jasmine tests looks like with the inject method.
     * ```js
     *
     *   angular.module('myApplicationModule', [])
     *       .value('mode', 'app')
     *       .value('version', 'v1.0.1');
     *
     *
     *   describe('MyApp', function() {
     *
     *     // You need to load modules that you want to test,
     *     // it loads only the "ng" module by default.
     *     beforeEach(module('myApplicationModule'));
     *
     *
     *     // inject() is used to inject arguments of all given functions
     *     it('should provide a version', inject(function(mode, version) {
     *       expect(version).toEqual('v1.0.1');
     *       expect(mode).toEqual('app');
     *     }));
     *
     *
     *     // The inject and module method can also be used inside of the it or beforeEach
     *     it('should override a version and test the new version is injected', function() {
     *       // module() takes functions or strings (module aliases)
     *       module(function($provide) {
     *         $provide.value('version', 'overridden'); // override version here
     *       });
     *
     *       inject(function(version) {
     *         expect(version).toEqual('overridden');
     *       });
     *     });
     *   });
     *
     * ```
     *
     * @param {...Function} fns any number of functions which will be injected using the injector.
     */

    var ErrorAddingDeclarationLocationStack = function ErrorAddingDeclarationLocationStack(e, errorForStack) {
      this.message = e.message;
      this.name = e.name;
      if (e.line) this.line = e.line;
      if (e.sourceId) this.sourceId = e.sourceId;
      if (e.stack && errorForStack) this.stack = e.stack + '\n' + errorForStack.stack;
      if (e.stackArray) this.stackArray = e.stackArray;
    };
    ErrorAddingDeclarationLocationStack.prototype.toString = Error.prototype.toString;

    window.inject = angular.mock.inject = function () {
      var blockFns = Array.prototype.slice.call(arguments, 0);
      var errorForStack = new Error('Declaration Location');
      return isSpecRunning() ? workFn.call(currentSpec) : workFn;
      /////////////////////
      function workFn() {
        var modules = currentSpec.$modules || [];
        var strictDi = !!currentSpec.$injectorStrict;
        modules.unshift('ngMock');
        modules.unshift('ng');
        var injector = currentSpec.$injector;
        if (!injector) {
          if (strictDi) {
            // If strictDi is enabled, annotate the providerInjector blocks
            angular.forEach(modules, function (moduleFn) {
              if (typeof moduleFn === "function") {
                angular.injector.$$annotate(moduleFn);
              }
            });
          }
          injector = currentSpec.$injector = angular.injector(modules, strictDi);
          currentSpec.$injectorStrict = strictDi;
        }
        for (var i = 0, ii = blockFns.length; i < ii; i++) {
          if (currentSpec.$injectorStrict) {
            // If the injector is strict / strictDi, and the spec wants to inject using automatic
            // annotation, then annotate the function here.
            injector.annotate(blockFns[i]);
          }
          try {
            /* jshint -W040 */ /* Jasmine explicitly provides a `this` object when calling functions */
            injector.invoke(blockFns[i] || angular.noop, this);
            /* jshint +W040 */
          } catch (e) {
            if (e.stack && errorForStack) {
              throw new ErrorAddingDeclarationLocationStack(e, errorForStack);
            }
            throw e;
          } finally {
            errorForStack = null;
          }
        }
      }
    };

    angular.mock.inject.strictDi = function (value) {
      value = arguments.length ? !!value : true;
      return isSpecRunning() ? workFn() : workFn;

      function workFn() {
        if (value !== currentSpec.$injectorStrict) {
          if (currentSpec.$injector) {
            throw new Error('Injector already created, can not modify strict annotations');
          } else {
            currentSpec.$injectorStrict = value;
          }
        }
      }
    };
  }
})(window, window.angular);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NsaWVudC9saWIvYW5ndWxhci1tb2Nrcy9hbmd1bGFyLW1vY2tzLmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsImFuZ3VsYXIiLCJ1bmRlZmluZWQiLCJtb2NrIiwiJEJyb3dzZXJQcm92aWRlciIsIiRnZXQiLCIkQnJvd3NlciIsInNlbGYiLCJpc01vY2siLCIkJHVybCIsIiQkbGFzdFVybCIsInBvbGxGbnMiLCIkJGNvbXBsZXRlT3V0c3RhbmRpbmdSZXF1ZXN0Iiwibm9vcCIsIiQkaW5jT3V0c3RhbmRpbmdSZXF1ZXN0Q291bnQiLCJvblVybENoYW5nZSIsImxpc3RlbmVyIiwicHVzaCIsIiQkc3RhdGUiLCIkJGxhc3RTdGF0ZSIsIiQkY2hlY2tVcmxDaGFuZ2UiLCJjb29raWVIYXNoIiwibGFzdENvb2tpZUhhc2giLCJkZWZlcnJlZEZucyIsImRlZmVycmVkTmV4dElkIiwiZGVmZXIiLCJmbiIsImRlbGF5IiwidGltZSIsIm5vdyIsImlkIiwic29ydCIsImEiLCJiIiwiY2FuY2VsIiwiZGVmZXJJZCIsImZuSW5kZXgiLCJmb3JFYWNoIiwiaW5kZXgiLCJzcGxpY2UiLCJmbHVzaCIsImlzRGVmaW5lZCIsImxlbmd0aCIsIkVycm9yIiwic2hpZnQiLCIkJGJhc2VIcmVmIiwiYmFzZUhyZWYiLCJwcm90b3R5cGUiLCJwb2xsIiwicG9sbEZuIiwiYWRkUG9sbEZuIiwidXJsIiwicmVwbGFjZSIsInN0YXRlIiwiaXNVbmRlZmluZWQiLCJjb3B5IiwiY29va2llcyIsIm5hbWUiLCJ2YWx1ZSIsImlzU3RyaW5nIiwiZXF1YWxzIiwibm90aWZ5V2hlbk5vT3V0c3RhbmRpbmdSZXF1ZXN0cyIsIiRFeGNlcHRpb25IYW5kbGVyUHJvdmlkZXIiLCJoYW5kbGVyIiwibW9kZSIsImVycm9ycyIsImUiLCJhcmd1bWVudHMiLCJzbGljZSIsImNhbGwiLCIkTG9nUHJvdmlkZXIiLCJkZWJ1ZyIsImNvbmNhdCIsImFycmF5MSIsImFycmF5MiIsIkFycmF5IiwiZGVidWdFbmFibGVkIiwiZmxhZyIsIiRsb2ciLCJsb2ciLCJsb2dzIiwid2FybiIsImluZm8iLCJlcnJvciIsInJlc2V0IiwiYXNzZXJ0RW1wdHkiLCJsb2dMZXZlbCIsImxvZ0l0ZW0iLCJTdHJpbmciLCJzdGFjayIsInVuc2hpZnQiLCJqb2luIiwiJEludGVydmFsUHJvdmlkZXIiLCIkYnJvd3NlciIsIiRyb290U2NvcGUiLCIkcSIsIiQkcSIsInJlcGVhdEZucyIsIm5leHRSZXBlYXRJZCIsIiRpbnRlcnZhbCIsImNvdW50IiwiaW52b2tlQXBwbHkiLCJpdGVyYXRpb24iLCJza2lwQXBwbHkiLCJkZWZlcnJlZCIsInByb21pc2UiLCJ0aGVuIiwiJCRpbnRlcnZhbElkIiwidGljayIsIm5vdGlmeSIsInJlc29sdmUiLCIkYXBwbHkiLCJuZXh0VGltZSIsInJlamVjdCIsIm1pbGxpcyIsInRhc2siLCJSX0lTTzgwNjFfU1RSIiwianNvblN0cmluZ1RvRGF0ZSIsInN0cmluZyIsIm1hdGNoIiwiZGF0ZSIsIkRhdGUiLCJ0ekhvdXIiLCJ0ek1pbiIsImludCIsInNldFVUQ0Z1bGxZZWFyIiwic2V0VVRDSG91cnMiLCJzdHIiLCJwYXJzZUludCIsInBhZE51bWJlciIsIm51bSIsImRpZ2l0cyIsInRyaW0iLCJuZWciLCJzdWJzdHIiLCJUekRhdGUiLCJvZmZzZXQiLCJ0aW1lc3RhbXAiLCJ0c1N0ciIsIm9yaWdEYXRlIiwiZ2V0VGltZSIsImlzTmFOIiwibWVzc2FnZSIsImxvY2FsT2Zmc2V0IiwiZ2V0VGltZXpvbmVPZmZzZXQiLCJvZmZzZXREaWZmIiwidG9Mb2NhbGVEYXRlU3RyaW5nIiwiZ2V0RnVsbFllYXIiLCJnZXRNb250aCIsImdldERhdGUiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJnZXRTZWNvbmRzIiwiZ2V0TWlsbGlzZWNvbmRzIiwiZ2V0VVRDRnVsbFllYXIiLCJnZXRVVENNb250aCIsImdldFVUQ0RhdGUiLCJnZXRVVENIb3VycyIsImdldFVUQ01pbnV0ZXMiLCJnZXRVVENTZWNvbmRzIiwiZ2V0VVRDTWlsbGlzZWNvbmRzIiwiZ2V0RGF5IiwidG9JU09TdHJpbmciLCJ1bmltcGxlbWVudGVkTWV0aG9kcyIsIm1ldGhvZE5hbWUiLCJhbmltYXRlIiwibW9kdWxlIiwiY29uZmlnIiwiJHByb3ZpZGUiLCJyZWZsb3dRdWV1ZSIsImRlY29yYXRvciIsIiRkZWxlZ2F0ZSIsIiQkYXN5bmNDYWxsYmFjayIsIiR0aW1lb3V0IiwiJCRyQUYiLCJxdWV1ZSIsImVuYWJsZWQiLCJ0cmlnZ2VyQ2FsbGJhY2tFdmVudHMiLCJ0cmlnZ2VyQ2FsbGJhY2tQcm9taXNlIiwidHJpZ2dlckNhbGxiYWNrcyIsInRyaWdnZXJSZWZsb3ciLCIkZGlnZXN0IiwiZG9OZXh0UnVuIiwic29tZXRoaW5nRmx1c2hlZCIsInRpbWVvdXRzUmVtYWluaW5nIiwib2xkVmFsdWUiLCJuZXdWYWx1ZSIsIm1ldGhvZCIsImV2ZW50IiwiZWxlbWVudCIsIm9wdGlvbnMiLCJhcmdzIiwiYXBwbHkiLCJkdW1wIiwib2JqZWN0Iiwic2VyaWFsaXplIiwib3V0IiwiaXNFbGVtZW50IiwiYXBwZW5kIiwiY2xvbmUiLCJodG1sIiwiaXNBcnJheSIsIm8iLCJpc09iamVjdCIsImlzRnVuY3Rpb24iLCIkZXZhbCIsInNlcmlhbGl6ZVNjb3BlIiwidG9Kc29uIiwic2NvcGUiLCIkaWQiLCJrZXkiLCJPYmplY3QiLCJoYXNPd25Qcm9wZXJ0eSIsImNoaWxkIiwiJCRjaGlsZEhlYWQiLCIkJG5leHRTaWJsaW5nIiwiJEh0dHBCYWNrZW5kUHJvdmlkZXIiLCJjcmVhdGVIdHRwQmFja2VuZE1vY2siLCJkZWZpbml0aW9ucyIsImV4cGVjdGF0aW9ucyIsInJlc3BvbnNlcyIsInJlc3BvbnNlc1B1c2giLCJiaW5kIiwiY3JlYXRlUmVzcG9uc2UiLCJzdGF0dXMiLCJkYXRhIiwiaGVhZGVycyIsInN0YXR1c1RleHQiLCJpc051bWJlciIsIiRodHRwQmFja2VuZCIsImNhbGxiYWNrIiwidGltZW91dCIsIndpdGhDcmVkZW50aWFscyIsInhociIsIk1vY2tYaHIiLCJleHBlY3RhdGlvbiIsIndhc0V4cGVjdGVkIiwicHJldHR5UHJpbnQiLCJSZWdFeHAiLCJ3cmFwUmVzcG9uc2UiLCJ3cmFwcGVkIiwiaGFuZGxlVGltZW91dCIsImhhbmRsZVJlc3BvbnNlIiwicmVzcG9uc2UiLCIkJHJlc3BIZWFkZXJzIiwiZ2V0QWxsUmVzcG9uc2VIZWFkZXJzIiwiaSIsImlpIiwibWF0Y2hEYXRhIiwibWF0Y2hIZWFkZXJzIiwiZGVmaW5pdGlvbiIsInBhc3NUaHJvdWdoIiwid2hlbiIsIk1vY2tIdHRwRXhwZWN0YXRpb24iLCJjaGFpbiIsInJlc3BvbmQiLCJjcmVhdGVTaG9ydE1ldGhvZHMiLCJleHBlY3QiLCJkaWdlc3QiLCJ2ZXJpZnlOb091dHN0YW5kaW5nRXhwZWN0YXRpb24iLCJ2ZXJpZnlOb091dHN0YW5kaW5nUmVxdWVzdCIsInJlc2V0RXhwZWN0YXRpb25zIiwicHJlZml4IiwibSIsInUiLCJkIiwiaCIsIm1hdGNoVXJsIiwidGVzdCIsImZyb21Kc29uIiwidG9TdHJpbmciLCJjcmVhdGVNb2NrWGhyIiwiJCRsYXN0SW5zdGFuY2UiLCJvcGVuIiwiYXN5bmMiLCIkJG1ldGhvZCIsIiQkYXN5bmMiLCIkJHJlcUhlYWRlcnMiLCJzZW5kIiwiJCRkYXRhIiwic2V0UmVxdWVzdEhlYWRlciIsImdldFJlc3BvbnNlSGVhZGVyIiwiaGVhZGVyIiwibG93ZXJjYXNlIiwiaGVhZGVyVmFsIiwiaGVhZGVyTmFtZSIsImxpbmVzIiwiYWJvcnQiLCIkVGltZW91dERlY29yYXRvciIsInZlcmlmeU5vUGVuZGluZ1Rhc2tzIiwiZm9ybWF0UGVuZGluZ1Rhc2tzQXNTdHJpbmciLCJ0YXNrcyIsInJlc3VsdCIsIiRSQUZEZWNvcmF0b3IiLCJyYWZGbiIsInN1cHBvcnRlZCIsIiRBc3luY0NhbGxiYWNrRGVjb3JhdG9yIiwiYWRkRm4iLCIkUm9vdEVsZW1lbnRQcm92aWRlciIsIiRDb250cm9sbGVyRGVjb3JhdG9yIiwiZXhwcmVzc2lvbiIsImxvY2FscyIsImxhdGVyIiwiaWRlbnQiLCJjcmVhdGUiLCJleHRlbmQiLCJpbnN0YW5jZSIsInByb3ZpZGVyIiwiJGV4Y2VwdGlvbkhhbmRsZXIiLCIkcm9vdEVsZW1lbnQiLCIkUm9vdFNjb3BlRGVjb3JhdG9yIiwiZTJlIiwiJGh0dHBCYWNrZW5kRGVjb3JhdG9yIiwiJHJvb3RTY29wZVByb3RvdHlwZSIsImdldFByb3RvdHlwZU9mIiwiJGNvdW50Q2hpbGRTY29wZXMiLCJjb3VudENoaWxkU2NvcGVzIiwiJGNvdW50V2F0Y2hlcnMiLCJjb3VudFdhdGNoZXJzIiwicGVuZGluZ0NoaWxkSGVhZHMiLCJjdXJyZW50U2NvcGUiLCIkJHdhdGNoZXJzIiwiamFzbWluZSIsIm1vY2hhIiwiY3VycmVudFNwZWMiLCJhbm5vdGF0ZWRGdW5jdGlvbnMiLCJpc1NwZWNSdW5uaW5nIiwiJCRhbm5vdGF0ZSIsImluamVjdG9yIiwiJGluamVjdCIsImJlZm9yZUVhY2giLCJzZXR1cCIsImFmdGVyRWFjaCIsInRlYXJkb3duIiwiJGluamVjdG9yIiwiJG1vZHVsZXMiLCIkJGhhc2hLZXkiLCJnZXQiLCJvZmYiLCJmcmFnbWVudHMiLCJ2YWwiLCJjYWxsYmFja3MiLCJjb3VudGVyIiwibW9kdWxlRm5zIiwid29ya0ZuIiwibW9kdWxlcyIsIkVycm9yQWRkaW5nRGVjbGFyYXRpb25Mb2NhdGlvblN0YWNrIiwiZXJyb3JGb3JTdGFjayIsImxpbmUiLCJzb3VyY2VJZCIsInN0YWNrQXJyYXkiLCJpbmplY3QiLCJibG9ja0ZucyIsInN0cmljdERpIiwiJGluamVjdG9yU3RyaWN0IiwibW9kdWxlRm4iLCJhbm5vdGF0ZSIsImludm9rZSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOzs7OztBQUtBLENBQUMsVUFBU0EsTUFBVCxFQUFpQkMsT0FBakIsRUFBMEJDLFNBQTFCLEVBQXFDOztBQUV0Qzs7QUFFQTs7Ozs7Ozs7QUFPQUQsVUFBUUUsSUFBUixHQUFlLEVBQWY7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUFhQUYsVUFBUUUsSUFBUixDQUFhQyxnQkFB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LCJmaWxlIjoiYW5ndWxhci1tb2Nrcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAbGljZW5zZSBBbmd1bGFySlMgdjEuMy4yMFxyXG4gKiAoYykgMjAxMC0yMDE0IEdvb2dsZSwgSW5jLiBodHRwOi8vYW5ndWxhcmpzLm9yZ1xyXG4gKiBMaWNlbnNlOiBNSVRcclxuICovXHJcbihmdW5jdGlvbih3aW5kb3csIGFuZ3VsYXIsIHVuZGVmaW5lZCkge1xyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIEBuZ2RvYyBvYmplY3RcclxuICogQG5hbWUgYW5ndWxhci5tb2NrXHJcbiAqIEBkZXNjcmlwdGlvblxyXG4gKlxyXG4gKiBOYW1lc3BhY2UgZnJvbSAnYW5ndWxhci1tb2Nrcy5qcycgd2hpY2ggY29udGFpbnMgdGVzdGluZyByZWxhdGVkIGNvZGUuXHJcbiAqL1xyXG5hbmd1bGFyLm1vY2sgPSB7fTtcclxuXHJcbi8qKlxyXG4gKiAhIFRoaXMgaXMgYSBwcml2YXRlIHVuZG9jdW1lbnRlZCBzZXJ2aWNlICFcclxuICpcclxuICogQG5hbWUgJGJyb3dzZXJcclxuICpcclxuICogQGRlc2NyaXB0aW9uXHJcbiAqIFRoaXMgc2VydmljZSBpcyBhIG1vY2sgaW1wbGVtZW50YXRpb24gb2Yge0BsaW5rIG5nLiRicm93c2VyfS4gSXQgcHJvdmlkZXMgZmFrZVxyXG4gKiBpbXBsZW1lbnRhdGlvbiBmb3IgY29tbW9ubHkgdXNlZCBicm93c2VyIGFwaXMgdGhhdCBhcmUgaGFyZCB0byB0ZXN0LCBlLmcuIHNldFRpbWVvdXQsIHhocixcclxuICogY29va2llcywgZXRjLi4uXHJcbiAqXHJcbiAqIFRoZSBhcGkgb2YgdGhpcyBzZXJ2aWNlIGlzIHRoZSBzYW1lIGFzIHRoYXQgb2YgdGhlIHJlYWwge0BsaW5rIG5nLiRicm93c2VyICRicm93c2VyfSwgZXhjZXB0XHJcbiAqIHRoYXQgdGhlcmUgYXJlIHNldmVyYWwgaGVscGVyIG1ldGhvZHMgYXZhaWxhYmxlIHdoaWNoIGNhbiBiZSB1c2VkIGluIHRlc3RzLlxyXG4gKi9cclxuYW5ndWxhci5tb2NrLiRCcm93c2VyUHJvdmlkZXIgPSBmdW5jdGlvbigpIHtcclxuICB0aGlzLiRnZXQgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiBuZXcgYW5ndWxhci5tb2NrLiRCcm93c2VyKCk7XHJcbiAgfTtcclxufTtcclxuXHJcbmFuZ3VsYXIubW9jay4kQnJvd3NlciA9IGZ1bmN0aW9uKCkge1xyXG4gIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgdGhpcy5pc01vY2sgPSB0cnVlO1xyXG4gIHNlbGYuJCR1cmwgPSBcImh0dHA6Ly9zZXJ2ZXIvXCI7XHJcbiAgc2VsZi4kJGxhc3RVcmwgPSBzZWxmLiQkdXJsOyAvLyB1c2VkIGJ5IHVybCBwb2xsaW5nIGZuXHJcbiAgc2VsZi5wb2xsRm5zID0gW107XHJcblxyXG4gIC8vIFRPRE8odm9qdGEpOiByZW1vdmUgdGhpcyB0ZW1wb3JhcnkgYXBpXHJcbiAgc2VsZi4kJGNvbXBsZXRlT3V0c3RhbmRpbmdSZXF1ZXN0ID0gYW5ndWxhci5ub29wO1xyXG4gIHNlbGYuJCRpbmNPdXRzdGFuZGluZ1JlcXVlc3RDb3VudCA9IGFuZ3VsYXIubm9vcDtcclxuXHJcblxyXG4gIC8vIHJlZ2lzdGVyIHVybCBwb2xsaW5nIGZuXHJcblxyXG4gIHNlbGYub25VcmxDaGFuZ2UgPSBmdW5jdGlvbihsaXN0ZW5lcikge1xyXG4gICAgc2VsZi5wb2xsRm5zLnB1c2goXHJcbiAgICAgIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmIChzZWxmLiQkbGFzdFVybCAhPT0gc2VsZi4kJHVybCB8fCBzZWxmLiQkc3RhdGUgIT09IHNlbGYuJCRsYXN0U3RhdGUpIHtcclxuICAgICAgICAgIHNlbGYuJCRsYXN0VXJsID0gc2VsZi4kJHVybDtcclxuICAgICAgICAgIHNlbGYuJCRsYXN0U3RhdGUgPSBzZWxmLiQkc3RhdGU7XHJcbiAgICAgICAgICBsaXN0ZW5lcihzZWxmLiQkdXJsLCBzZWxmLiQkc3RhdGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gbGlzdGVuZXI7XHJcbiAgfTtcclxuXHJcbiAgc2VsZi4kJGNoZWNrVXJsQ2hhbmdlID0gYW5ndWxhci5ub29wO1xyXG5cclxuICBzZWxmLmNvb2tpZUhhc2ggPSB7fTtcclxuICBzZWxmLmxhc3RDb29raWVIYXNoID0ge307XHJcbiAgc2VsZi5kZWZlcnJlZEZucyA9IFtdO1xyXG4gIHNlbGYuZGVmZXJyZWROZXh0SWQgPSAwO1xyXG5cclxuICBzZWxmLmRlZmVyID0gZnVuY3Rpb24oZm4sIGRlbGF5KSB7XHJcbiAgICBkZWxheSA9IGRlbGF5IHx8IDA7XHJcbiAgICBzZWxmLmRlZmVycmVkRm5zLnB1c2goe3RpbWU6KHNlbGYuZGVmZXIubm93ICsgZGVsYXkpLCBmbjpmbiwgaWQ6IHNlbGYuZGVmZXJyZWROZXh0SWR9KTtcclxuICAgIHNlbGYuZGVmZXJyZWRGbnMuc29ydChmdW5jdGlvbihhLCBiKSB7IHJldHVybiBhLnRpbWUgLSBiLnRpbWU7fSk7XHJcbiAgICByZXR1cm4gc2VsZi5kZWZlcnJlZE5leHRJZCsrO1xyXG4gIH07XHJcblxyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSAkYnJvd3NlciNkZWZlci5ub3dcclxuICAgKlxyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqIEN1cnJlbnQgbWlsbGlzZWNvbmRzIG1vY2sgdGltZS5cclxuICAgKi9cclxuICBzZWxmLmRlZmVyLm5vdyA9IDA7XHJcblxyXG5cclxuICBzZWxmLmRlZmVyLmNhbmNlbCA9IGZ1bmN0aW9uKGRlZmVySWQpIHtcclxuICAgIHZhciBmbkluZGV4O1xyXG5cclxuICAgIGFuZ3VsYXIuZm9yRWFjaChzZWxmLmRlZmVycmVkRm5zLCBmdW5jdGlvbihmbiwgaW5kZXgpIHtcclxuICAgICAgaWYgKGZuLmlkID09PSBkZWZlcklkKSBmbkluZGV4ID0gaW5kZXg7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoZm5JbmRleCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHNlbGYuZGVmZXJyZWRGbnMuc3BsaWNlKGZuSW5kZXgsIDEpO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lICRicm93c2VyI2RlZmVyLmZsdXNoXHJcbiAgICpcclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKiBGbHVzaGVzIGFsbCBwZW5kaW5nIHJlcXVlc3RzIGFuZCBleGVjdXRlcyB0aGUgZGVmZXIgY2FsbGJhY2tzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtudW1iZXI9fSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIGZsdXNoLiBTZWUge0BsaW5rICNkZWZlci5ub3d9XHJcbiAgICovXHJcbiAgc2VsZi5kZWZlci5mbHVzaCA9IGZ1bmN0aW9uKGRlbGF5KSB7XHJcbiAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoZGVsYXkpKSB7XHJcbiAgICAgIHNlbGYuZGVmZXIubm93ICs9IGRlbGF5O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHNlbGYuZGVmZXJyZWRGbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgc2VsZi5kZWZlci5ub3cgPSBzZWxmLmRlZmVycmVkRm5zW3NlbGYuZGVmZXJyZWRGbnMubGVuZ3RoIC0gMV0udGltZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGRlZmVycmVkIHRhc2tzIHRvIGJlIGZsdXNoZWQnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHdoaWxlIChzZWxmLmRlZmVycmVkRm5zLmxlbmd0aCAmJiBzZWxmLmRlZmVycmVkRm5zWzBdLnRpbWUgPD0gc2VsZi5kZWZlci5ub3cpIHtcclxuICAgICAgc2VsZi5kZWZlcnJlZEZucy5zaGlmdCgpLmZuKCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgc2VsZi4kJGJhc2VIcmVmID0gJy8nO1xyXG4gIHNlbGYuYmFzZUhyZWYgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLiQkYmFzZUhyZWY7XHJcbiAgfTtcclxufTtcclxuYW5ndWxhci5tb2NrLiRCcm93c2VyLnByb3RvdHlwZSA9IHtcclxuXHJcbi8qKlxyXG4gICogQG5hbWUgJGJyb3dzZXIjcG9sbFxyXG4gICpcclxuICAqIEBkZXNjcmlwdGlvblxyXG4gICogcnVuIGFsbCBmbnMgaW4gcG9sbEZuc1xyXG4gICovXHJcbiAgcG9sbDogZnVuY3Rpb24gcG9sbCgpIHtcclxuICAgIGFuZ3VsYXIuZm9yRWFjaCh0aGlzLnBvbGxGbnMsIGZ1bmN0aW9uKHBvbGxGbikge1xyXG4gICAgICBwb2xsRm4oKTtcclxuICAgIH0pO1xyXG4gIH0sXHJcblxyXG4gIGFkZFBvbGxGbjogZnVuY3Rpb24ocG9sbEZuKSB7XHJcbiAgICB0aGlzLnBvbGxGbnMucHVzaChwb2xsRm4pO1xyXG4gICAgcmV0dXJuIHBvbGxGbjtcclxuICB9LFxyXG5cclxuICB1cmw6IGZ1bmN0aW9uKHVybCwgcmVwbGFjZSwgc3RhdGUpIHtcclxuICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKHN0YXRlKSkge1xyXG4gICAgICBzdGF0ZSA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBpZiAodXJsKSB7XHJcbiAgICAgIHRoaXMuJCR1cmwgPSB1cmw7XHJcbiAgICAgIC8vIE5hdGl2ZSBwdXNoU3RhdGUgc2VyaWFsaXplcyAmIGNvcGllcyB0aGUgb2JqZWN0OyBzaW11bGF0ZSBpdC5cclxuICAgICAgdGhpcy4kJHN0YXRlID0gYW5ndWxhci5jb3B5KHN0YXRlKTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuJCR1cmw7XHJcbiAgfSxcclxuXHJcbiAgc3RhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuJCRzdGF0ZTtcclxuICB9LFxyXG5cclxuICBjb29raWVzOiAgZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcclxuICAgIGlmIChuYW1lKSB7XHJcbiAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKHZhbHVlKSkge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmNvb2tpZUhhc2hbbmFtZV07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcodmFsdWUpICYmICAgICAgIC8vc3RyaW5ncyBvbmx5XHJcbiAgICAgICAgICAgIHZhbHVlLmxlbmd0aCA8PSA0MDk2KSB7ICAgICAgICAgIC8vc3RyaWN0IGNvb2tpZSBzdG9yYWdlIGxpbWl0c1xyXG4gICAgICAgICAgdGhpcy5jb29raWVIYXNoW25hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoIWFuZ3VsYXIuZXF1YWxzKHRoaXMuY29va2llSGFzaCwgdGhpcy5sYXN0Q29va2llSGFzaCkpIHtcclxuICAgICAgICB0aGlzLmxhc3RDb29raWVIYXNoID0gYW5ndWxhci5jb3B5KHRoaXMuY29va2llSGFzaCk7XHJcbiAgICAgICAgdGhpcy5jb29raWVIYXNoID0gYW5ndWxhci5jb3B5KHRoaXMuY29va2llSGFzaCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXMuY29va2llSGFzaDtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBub3RpZnlXaGVuTm9PdXRzdGFuZGluZ1JlcXVlc3RzOiBmdW5jdGlvbihmbikge1xyXG4gICAgZm4oKTtcclxuICB9XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIEBuZ2RvYyBwcm92aWRlclxyXG4gKiBAbmFtZSAkZXhjZXB0aW9uSGFuZGxlclByb3ZpZGVyXHJcbiAqXHJcbiAqIEBkZXNjcmlwdGlvblxyXG4gKiBDb25maWd1cmVzIHRoZSBtb2NrIGltcGxlbWVudGF0aW9uIG9mIHtAbGluayBuZy4kZXhjZXB0aW9uSGFuZGxlcn0gdG8gcmV0aHJvdyBvciB0byBsb2cgZXJyb3JzXHJcbiAqIHBhc3NlZCB0byB0aGUgYCRleGNlcHRpb25IYW5kbGVyYC5cclxuICovXHJcblxyXG4vKipcclxuICogQG5nZG9jIHNlcnZpY2VcclxuICogQG5hbWUgJGV4Y2VwdGlvbkhhbmRsZXJcclxuICpcclxuICogQGRlc2NyaXB0aW9uXHJcbiAqIE1vY2sgaW1wbGVtZW50YXRpb24gb2Yge0BsaW5rIG5nLiRleGNlcHRpb25IYW5kbGVyfSB0aGF0IHJldGhyb3dzIG9yIGxvZ3MgZXJyb3JzIHBhc3NlZFxyXG4gKiB0byBpdC4gU2VlIHtAbGluayBuZ01vY2suJGV4Y2VwdGlvbkhhbmRsZXJQcm92aWRlciAkZXhjZXB0aW9uSGFuZGxlclByb3ZpZGVyfSBmb3IgY29uZmlndXJhdGlvblxyXG4gKiBpbmZvcm1hdGlvbi5cclxuICpcclxuICpcclxuICogYGBganNcclxuICogICBkZXNjcmliZSgnJGV4Y2VwdGlvbkhhbmRsZXJQcm92aWRlcicsIGZ1bmN0aW9uKCkge1xyXG4gKlxyXG4gKiAgICAgaXQoJ3Nob3VsZCBjYXB0dXJlIGxvZyBtZXNzYWdlcyBhbmQgZXhjZXB0aW9ucycsIGZ1bmN0aW9uKCkge1xyXG4gKlxyXG4gKiAgICAgICBtb2R1bGUoZnVuY3Rpb24oJGV4Y2VwdGlvbkhhbmRsZXJQcm92aWRlcikge1xyXG4gKiAgICAgICAgICRleGNlcHRpb25IYW5kbGVyUHJvdmlkZXIubW9kZSgnbG9nJyk7XHJcbiAqICAgICAgIH0pO1xyXG4gKlxyXG4gKiAgICAgICBpbmplY3QoZnVuY3Rpb24oJGxvZywgJGV4Y2VwdGlvbkhhbmRsZXIsICR0aW1lb3V0KSB7XHJcbiAqICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7ICRsb2cubG9nKDEpOyB9KTtcclxuICogICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHsgJGxvZy5sb2coMik7IHRocm93ICdiYW5hbmEgcGVlbCc7IH0pO1xyXG4gKiAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkgeyAkbG9nLmxvZygzKTsgfSk7XHJcbiAqICAgICAgICAgZXhwZWN0KCRleGNlcHRpb25IYW5kbGVyLmVycm9ycykudG9FcXVhbChbXSk7XHJcbiAqICAgICAgICAgZXhwZWN0KCRsb2cuYXNzZXJ0RW1wdHkoKSk7XHJcbiAqICAgICAgICAgJHRpbWVvdXQuZmx1c2goKTtcclxuICogICAgICAgICBleHBlY3QoJGV4Y2VwdGlvbkhhbmRsZXIuZXJyb3JzKS50b0VxdWFsKFsnYmFuYW5hIHBlZWwnXSk7XHJcbiAqICAgICAgICAgZXhwZWN0KCRsb2cubG9nLmxvZ3MpLnRvRXF1YWwoW1sxXSwgWzJdLCBbM11dKTtcclxuICogICAgICAgfSk7XHJcbiAqICAgICB9KTtcclxuICogICB9KTtcclxuICogYGBgXHJcbiAqL1xyXG5cclxuYW5ndWxhci5tb2NrLiRFeGNlcHRpb25IYW5kbGVyUHJvdmlkZXIgPSBmdW5jdGlvbigpIHtcclxuICB2YXIgaGFuZGxlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAqIEBuYW1lICRleGNlcHRpb25IYW5kbGVyUHJvdmlkZXIjbW9kZVxyXG4gICAqXHJcbiAgICogQGRlc2NyaXB0aW9uXHJcbiAgICogU2V0cyB0aGUgbG9nZ2luZyBtb2RlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1vZGUgTW9kZSBvZiBvcGVyYXRpb24sIGRlZmF1bHRzIHRvIGByZXRocm93YC5cclxuICAgKlxyXG4gICAqICAgLSBgbG9nYDogU29tZXRpbWVzIGl0IGlzIGRlc2lyYWJsZSB0byB0ZXN0IHRoYXQgYW4gZXJyb3IgaXMgdGhyb3duLCBmb3IgdGhpcyBjYXNlIHRoZSBgbG9nYFxyXG4gICAqICAgICAgICAgICAgbW9kZSBzdG9yZXMgYW4gYXJyYXkgb2YgZXJyb3JzIGluIGAkZXhjZXB0aW9uSGFuZGxlci5lcnJvcnNgLCB0byBhbGxvdyBsYXRlclxyXG4gICAqICAgICAgICAgICAgYXNzZXJ0aW9uIG9mIHRoZW0uIFNlZSB7QGxpbmsgbmdNb2NrLiRsb2cjYXNzZXJ0RW1wdHkgYXNzZXJ0RW1wdHkoKX0gYW5kXHJcbiAgICogICAgICAgICAgICB7QGxpbmsgbmdNb2NrLiRsb2cjcmVzZXQgcmVzZXQoKX1cclxuICAgKiAgIC0gYHJldGhyb3dgOiBJZiBhbnkgZXJyb3JzIGFyZSBwYXNzZWQgdG8gdGhlIGhhbmRsZXIgaW4gdGVzdHMsIGl0IHR5cGljYWxseSBtZWFucyB0aGF0IHRoZXJlXHJcbiAgICogICAgICAgICAgICAgICAgaXMgYSBidWcgaW4gdGhlIGFwcGxpY2F0aW9uIG9yIHRlc3QsIHNvIHRoaXMgbW9jayB3aWxsIG1ha2UgdGhlc2UgdGVzdHMgZmFpbC5cclxuICAgKiAgICAgICAgICAgICAgICBGb3IgYW55IGltcGxlbWVudGF0aW9ucyB0aGF0IGV4cGVjdCBleGNlcHRpb25zIHRvIGJlIHRocm93biwgdGhlIGByZXRocm93YCBtb2RlXHJcbiAgICogICAgICAgICAgICAgICAgd2lsbCBhbHNvIG1haW50YWluIGEgbG9nIG9mIHRocm93biBlcnJvcnMuXHJcbiAgICovXHJcbiAgdGhpcy5tb2RlID0gZnVuY3Rpb24obW9kZSkge1xyXG5cclxuICAgIHN3aXRjaCAobW9kZSkge1xyXG4gICAgICBjYXNlICdsb2cnOlxyXG4gICAgICBjYXNlICdyZXRocm93JzpcclxuICAgICAgICB2YXIgZXJyb3JzID0gW107XHJcbiAgICAgICAgaGFuZGxlciA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgZXJyb3JzLnB1c2goZSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBlcnJvcnMucHVzaChbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKG1vZGUgPT09IFwicmV0aHJvd1wiKSB7XHJcbiAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBoYW5kbGVyLmVycm9ycyA9IGVycm9ycztcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIG1vZGUgJ1wiICsgbW9kZSArIFwiJywgb25seSAnbG9nJy8ncmV0aHJvdycgbW9kZXMgYXJlIGFsbG93ZWQhXCIpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHRoaXMuJGdldCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIGhhbmRsZXI7XHJcbiAgfTtcclxuXHJcbiAgdGhpcy5tb2RlKCdyZXRocm93Jyk7XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIEBuZ2RvYyBzZXJ2aWNlXHJcbiAqIEBuYW1lICRsb2dcclxuICpcclxuICogQGRlc2NyaXB0aW9uXHJcbiAqIE1vY2sgaW1wbGVtZW50YXRpb24gb2Yge0BsaW5rIG5nLiRsb2d9IHRoYXQgZ2F0aGVycyBhbGwgbG9nZ2VkIG1lc3NhZ2VzIGluIGFycmF5c1xyXG4gKiAob25lIGFycmF5IHBlciBsb2dnaW5nIGxldmVsKS4gVGhlc2UgYXJyYXlzIGFyZSBleHBvc2VkIGFzIGBsb2dzYCBwcm9wZXJ0eSBvZiBlYWNoIG9mIHRoZVxyXG4gKiBsZXZlbC1zcGVjaWZpYyBsb2cgZnVuY3Rpb24sIGUuZy4gZm9yIGxldmVsIGBlcnJvcmAgdGhlIGFycmF5IGlzIGV4cG9zZWQgYXMgYCRsb2cuZXJyb3IubG9nc2AuXHJcbiAqXHJcbiAqL1xyXG5hbmd1bGFyLm1vY2suJExvZ1Byb3ZpZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgdmFyIGRlYnVnID0gdHJ1ZTtcclxuXHJcbiAgZnVuY3Rpb24gY29uY2F0KGFycmF5MSwgYXJyYXkyLCBpbmRleCkge1xyXG4gICAgcmV0dXJuIGFycmF5MS5jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJyYXkyLCBpbmRleCkpO1xyXG4gIH1cclxuXHJcbiAgdGhpcy5kZWJ1Z0VuYWJsZWQgPSBmdW5jdGlvbihmbGFnKSB7XHJcbiAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoZmxhZykpIHtcclxuICAgICAgZGVidWcgPSBmbGFnO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBkZWJ1ZztcclxuICAgIH1cclxuICB9O1xyXG5cclxuICB0aGlzLiRnZXQgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciAkbG9nID0ge1xyXG4gICAgICBsb2c6IGZ1bmN0aW9uKCkgeyAkbG9nLmxvZy5sb2dzLnB1c2goY29uY2F0KFtdLCBhcmd1bWVudHMsIDApKTsgfSxcclxuICAgICAgd2FybjogZnVuY3Rpb24oKSB7ICRsb2cud2Fybi5sb2dzLnB1c2goY29uY2F0KFtdLCBhcmd1bWVudHMsIDApKTsgfSxcclxuICAgICAgaW5mbzogZnVuY3Rpb24oKSB7ICRsb2cuaW5mby5sb2dzLnB1c2goY29uY2F0KFtdLCBhcmd1bWVudHMsIDApKTsgfSxcclxuICAgICAgZXJyb3I6IGZ1bmN0aW9uKCkgeyAkbG9nLmVycm9yLmxvZ3MucHVzaChjb25jYXQoW10sIGFyZ3VtZW50cywgMCkpOyB9LFxyXG4gICAgICBkZWJ1ZzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKGRlYnVnKSB7XHJcbiAgICAgICAgICAkbG9nLmRlYnVnLmxvZ3MucHVzaChjb25jYXQoW10sIGFyZ3VtZW50cywgMCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lICRsb2cjcmVzZXRcclxuICAgICAqXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIFJlc2V0IGFsbCBvZiB0aGUgbG9nZ2luZyBhcnJheXMgdG8gZW1wdHkuXHJcbiAgICAgKi9cclxuICAgICRsb2cucmVzZXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgLyoqXHJcbiAgICAgICAqIEBuZ2RvYyBwcm9wZXJ0eVxyXG4gICAgICAgKiBAbmFtZSAkbG9nI2xvZy5sb2dzXHJcbiAgICAgICAqXHJcbiAgICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICAgKiBBcnJheSBvZiBtZXNzYWdlcyBsb2dnZWQgdXNpbmcge0BsaW5rIG5nLiRsb2cjbG9nIGBsb2coKWB9LlxyXG4gICAgICAgKlxyXG4gICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgKiBgYGBqc1xyXG4gICAgICAgKiAkbG9nLmxvZygnU29tZSBMb2cnKTtcclxuICAgICAgICogdmFyIGZpcnN0ID0gJGxvZy5sb2cubG9ncy51bnNoaWZ0KCk7XHJcbiAgICAgICAqIGBgYFxyXG4gICAgICAgKi9cclxuICAgICAgJGxvZy5sb2cubG9ncyA9IFtdO1xyXG4gICAgICAvKipcclxuICAgICAgICogQG5nZG9jIHByb3BlcnR5XHJcbiAgICAgICAqIEBuYW1lICRsb2cjaW5mby5sb2dzXHJcbiAgICAgICAqXHJcbiAgICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICAgKiBBcnJheSBvZiBtZXNzYWdlcyBsb2dnZWQgdXNpbmcge0BsaW5rIG5nLiRsb2cjaW5mbyBgaW5mbygpYH0uXHJcbiAgICAgICAqXHJcbiAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAqIGBgYGpzXHJcbiAgICAgICAqICRsb2cuaW5mbygnU29tZSBJbmZvJyk7XHJcbiAgICAgICAqIHZhciBmaXJzdCA9ICRsb2cuaW5mby5sb2dzLnVuc2hpZnQoKTtcclxuICAgICAgICogYGBgXHJcbiAgICAgICAqL1xyXG4gICAgICAkbG9nLmluZm8ubG9ncyA9IFtdO1xyXG4gICAgICAvKipcclxuICAgICAgICogQG5nZG9jIHByb3BlcnR5XHJcbiAgICAgICAqIEBuYW1lICRsb2cjd2Fybi5sb2dzXHJcbiAgICAgICAqXHJcbiAgICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICAgKiBBcnJheSBvZiBtZXNzYWdlcyBsb2dnZWQgdXNpbmcge0BsaW5rIG5nLiRsb2cjd2FybiBgd2FybigpYH0uXHJcbiAgICAgICAqXHJcbiAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAqIGBgYGpzXHJcbiAgICAgICAqICRsb2cud2FybignU29tZSBXYXJuaW5nJyk7XHJcbiAgICAgICAqIHZhciBmaXJzdCA9ICRsb2cud2Fybi5sb2dzLnVuc2hpZnQoKTtcclxuICAgICAgICogYGBgXHJcbiAgICAgICAqL1xyXG4gICAgICAkbG9nLndhcm4ubG9ncyA9IFtdO1xyXG4gICAgICAvKipcclxuICAgICAgICogQG5nZG9jIHByb3BlcnR5XHJcbiAgICAgICAqIEBuYW1lICRsb2cjZXJyb3IubG9nc1xyXG4gICAgICAgKlxyXG4gICAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAgICogQXJyYXkgb2YgbWVzc2FnZXMgbG9nZ2VkIHVzaW5nIHtAbGluayBuZy4kbG9nI2Vycm9yIGBlcnJvcigpYH0uXHJcbiAgICAgICAqXHJcbiAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAqIGBgYGpzXHJcbiAgICAgICAqICRsb2cuZXJyb3IoJ1NvbWUgRXJyb3InKTtcclxuICAgICAgICogdmFyIGZpcnN0ID0gJGxvZy5lcnJvci5sb2dzLnVuc2hpZnQoKTtcclxuICAgICAgICogYGBgXHJcbiAgICAgICAqL1xyXG4gICAgICAkbG9nLmVycm9yLmxvZ3MgPSBbXTtcclxuICAgICAgICAvKipcclxuICAgICAgICogQG5nZG9jIHByb3BlcnR5XHJcbiAgICAgICAqIEBuYW1lICRsb2cjZGVidWcubG9nc1xyXG4gICAgICAgKlxyXG4gICAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAgICogQXJyYXkgb2YgbWVzc2FnZXMgbG9nZ2VkIHVzaW5nIHtAbGluayBuZy4kbG9nI2RlYnVnIGBkZWJ1ZygpYH0uXHJcbiAgICAgICAqXHJcbiAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAqIGBgYGpzXHJcbiAgICAgICAqICRsb2cuZGVidWcoJ1NvbWUgRXJyb3InKTtcclxuICAgICAgICogdmFyIGZpcnN0ID0gJGxvZy5kZWJ1Zy5sb2dzLnVuc2hpZnQoKTtcclxuICAgICAgICogYGBgXHJcbiAgICAgICAqL1xyXG4gICAgICAkbG9nLmRlYnVnLmxvZ3MgPSBbXTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSAkbG9nI2Fzc2VydEVtcHR5XHJcbiAgICAgKlxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBBc3NlcnQgdGhhdCBhbGwgb2YgdGhlIGxvZ2dpbmcgbWV0aG9kcyBoYXZlIG5vIGxvZ2dlZCBtZXNzYWdlcy4gSWYgYW55IG1lc3NhZ2VzIGFyZSBwcmVzZW50LFxyXG4gICAgICogYW4gZXhjZXB0aW9uIGlzIHRocm93bi5cclxuICAgICAqL1xyXG4gICAgJGxvZy5hc3NlcnRFbXB0eSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgZXJyb3JzID0gW107XHJcbiAgICAgIGFuZ3VsYXIuZm9yRWFjaChbJ2Vycm9yJywgJ3dhcm4nLCAnaW5mbycsICdsb2cnLCAnZGVidWcnXSwgZnVuY3Rpb24obG9nTGV2ZWwpIHtcclxuICAgICAgICBhbmd1bGFyLmZvckVhY2goJGxvZ1tsb2dMZXZlbF0ubG9ncywgZnVuY3Rpb24obG9nKSB7XHJcbiAgICAgICAgICBhbmd1bGFyLmZvckVhY2gobG9nLCBmdW5jdGlvbihsb2dJdGVtKSB7XHJcbiAgICAgICAgICAgIGVycm9ycy5wdXNoKCdNT0NLICRsb2cgKCcgKyBsb2dMZXZlbCArICcpOiAnICsgU3RyaW5nKGxvZ0l0ZW0pICsgJ1xcbicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAobG9nSXRlbS5zdGFjayB8fCAnJykpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAoZXJyb3JzLmxlbmd0aCkge1xyXG4gICAgICAgIGVycm9ycy51bnNoaWZ0KFwiRXhwZWN0ZWQgJGxvZyB0byBiZSBlbXB0eSEgRWl0aGVyIGEgbWVzc2FnZSB3YXMgbG9nZ2VkIHVuZXhwZWN0ZWRseSwgb3IgXCIgK1xyXG4gICAgICAgICAgXCJhbiBleHBlY3RlZCBsb2cgbWVzc2FnZSB3YXMgbm90IGNoZWNrZWQgYW5kIHJlbW92ZWQ6XCIpO1xyXG4gICAgICAgIGVycm9ycy5wdXNoKCcnKTtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JzLmpvaW4oJ1xcbi0tLS0tLS0tLVxcbicpKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAkbG9nLnJlc2V0KCk7XHJcbiAgICByZXR1cm4gJGxvZztcclxuICB9O1xyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBAbmdkb2Mgc2VydmljZVxyXG4gKiBAbmFtZSAkaW50ZXJ2YWxcclxuICpcclxuICogQGRlc2NyaXB0aW9uXHJcbiAqIE1vY2sgaW1wbGVtZW50YXRpb24gb2YgdGhlICRpbnRlcnZhbCBzZXJ2aWNlLlxyXG4gKlxyXG4gKiBVc2Uge0BsaW5rIG5nTW9jay4kaW50ZXJ2YWwjZmx1c2ggYCRpbnRlcnZhbC5mbHVzaChtaWxsaXMpYH0gdG9cclxuICogbW92ZSBmb3J3YXJkIGJ5IGBtaWxsaXNgIG1pbGxpc2Vjb25kcyBhbmQgdHJpZ2dlciBhbnkgZnVuY3Rpb25zIHNjaGVkdWxlZCB0byBydW4gaW4gdGhhdFxyXG4gKiB0aW1lLlxyXG4gKlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKCl9IGZuIEEgZnVuY3Rpb24gdGhhdCBzaG91bGQgYmUgY2FsbGVkIHJlcGVhdGVkbHkuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWxheSBOdW1iZXIgb2YgbWlsbGlzZWNvbmRzIGJldHdlZW4gZWFjaCBmdW5jdGlvbiBjYWxsLlxyXG4gKiBAcGFyYW0ge251bWJlcj19IFtjb3VudD0wXSBOdW1iZXIgb2YgdGltZXMgdG8gcmVwZWF0LiBJZiBub3Qgc2V0LCBvciAwLCB3aWxsIHJlcGVhdFxyXG4gKiAgIGluZGVmaW5pdGVseS5cclxuICogQHBhcmFtIHtib29sZWFuPX0gW2ludm9rZUFwcGx5PXRydWVdIElmIHNldCB0byBgZmFsc2VgIHNraXBzIG1vZGVsIGRpcnR5IGNoZWNraW5nLCBvdGhlcndpc2VcclxuICogICB3aWxsIGludm9rZSBgZm5gIHdpdGhpbiB0aGUge0BsaW5rIG5nLiRyb290U2NvcGUuU2NvcGUjJGFwcGx5ICRhcHBseX0gYmxvY2suXHJcbiAqIEByZXR1cm5zIHtwcm9taXNlfSBBIHByb21pc2Ugd2hpY2ggd2lsbCBiZSBub3RpZmllZCBvbiBlYWNoIGl0ZXJhdGlvbi5cclxuICovXHJcbmFuZ3VsYXIubW9jay4kSW50ZXJ2YWxQcm92aWRlciA9IGZ1bmN0aW9uKCkge1xyXG4gIHRoaXMuJGdldCA9IFsnJGJyb3dzZXInLCAnJHJvb3RTY29wZScsICckcScsICckJHEnLFxyXG4gICAgICAgZnVuY3Rpb24oJGJyb3dzZXIsICAgJHJvb3RTY29wZSwgICAkcSwgICAkJHEpIHtcclxuICAgIHZhciByZXBlYXRGbnMgPSBbXSxcclxuICAgICAgICBuZXh0UmVwZWF0SWQgPSAwLFxyXG4gICAgICAgIG5vdyA9IDA7XHJcblxyXG4gICAgdmFyICRpbnRlcnZhbCA9IGZ1bmN0aW9uKGZuLCBkZWxheSwgY291bnQsIGludm9rZUFwcGx5KSB7XHJcbiAgICAgIHZhciBpdGVyYXRpb24gPSAwLFxyXG4gICAgICAgICAgc2tpcEFwcGx5ID0gKGFuZ3VsYXIuaXNEZWZpbmVkKGludm9rZUFwcGx5KSAmJiAhaW52b2tlQXBwbHkpLFxyXG4gICAgICAgICAgZGVmZXJyZWQgPSAoc2tpcEFwcGx5ID8gJCRxIDogJHEpLmRlZmVyKCksXHJcbiAgICAgICAgICBwcm9taXNlID0gZGVmZXJyZWQucHJvbWlzZTtcclxuXHJcbiAgICAgIGNvdW50ID0gKGFuZ3VsYXIuaXNEZWZpbmVkKGNvdW50KSkgPyBjb3VudCA6IDA7XHJcbiAgICAgIHByb21pc2UudGhlbihudWxsLCBudWxsLCBmbik7XHJcblxyXG4gICAgICBwcm9taXNlLiQkaW50ZXJ2YWxJZCA9IG5leHRSZXBlYXRJZDtcclxuXHJcbiAgICAgIGZ1bmN0aW9uIHRpY2soKSB7XHJcbiAgICAgICAgZGVmZXJyZWQubm90aWZ5KGl0ZXJhdGlvbisrKTtcclxuXHJcbiAgICAgICAgaWYgKGNvdW50ID4gMCAmJiBpdGVyYXRpb24gPj0gY291bnQpIHtcclxuICAgICAgICAgIHZhciBmbkluZGV4O1xyXG4gICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShpdGVyYXRpb24pO1xyXG5cclxuICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChyZXBlYXRGbnMsIGZ1bmN0aW9uKGZuLCBpbmRleCkge1xyXG4gICAgICAgICAgICBpZiAoZm4uaWQgPT09IHByb21pc2UuJCRpbnRlcnZhbElkKSBmbkluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBpZiAoZm5JbmRleCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJlcGVhdEZucy5zcGxpY2UoZm5JbmRleCwgMSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2tpcEFwcGx5KSB7XHJcbiAgICAgICAgICAkYnJvd3Nlci5kZWZlci5mbHVzaCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmVwZWF0Rm5zLnB1c2goe1xyXG4gICAgICAgIG5leHRUaW1lOihub3cgKyBkZWxheSksXHJcbiAgICAgICAgZGVsYXk6IGRlbGF5LFxyXG4gICAgICAgIGZuOiB0aWNrLFxyXG4gICAgICAgIGlkOiBuZXh0UmVwZWF0SWQsXHJcbiAgICAgICAgZGVmZXJyZWQ6IGRlZmVycmVkXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXBlYXRGbnMuc29ydChmdW5jdGlvbihhLCBiKSB7IHJldHVybiBhLm5leHRUaW1lIC0gYi5uZXh0VGltZTt9KTtcclxuXHJcbiAgICAgIG5leHRSZXBlYXRJZCsrO1xyXG4gICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lICRpbnRlcnZhbCNjYW5jZWxcclxuICAgICAqXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIENhbmNlbHMgYSB0YXNrIGFzc29jaWF0ZWQgd2l0aCB0aGUgYHByb21pc2VgLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7cHJvbWlzZX0gcHJvbWlzZSBBIHByb21pc2UgZnJvbSBjYWxsaW5nIHRoZSBgJGludGVydmFsYCBmdW5jdGlvbi5cclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdGFzayB3YXMgc3VjY2Vzc2Z1bGx5IGNhbmNlbGxlZC5cclxuICAgICAqL1xyXG4gICAgJGludGVydmFsLmNhbmNlbCA9IGZ1bmN0aW9uKHByb21pc2UpIHtcclxuICAgICAgaWYgKCFwcm9taXNlKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIHZhciBmbkluZGV4O1xyXG5cclxuICAgICAgYW5ndWxhci5mb3JFYWNoKHJlcGVhdEZucywgZnVuY3Rpb24oZm4sIGluZGV4KSB7XHJcbiAgICAgICAgaWYgKGZuLmlkID09PSBwcm9taXNlLiQkaW50ZXJ2YWxJZCkgZm5JbmRleCA9IGluZGV4O1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChmbkluZGV4ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXBlYXRGbnNbZm5JbmRleF0uZGVmZXJyZWQucmVqZWN0KCdjYW5jZWxlZCcpO1xyXG4gICAgICAgIHJlcGVhdEZucy5zcGxpY2UoZm5JbmRleCwgMSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSAkaW50ZXJ2YWwjZmx1c2hcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICpcclxuICAgICAqIFJ1bnMgaW50ZXJ2YWwgdGFza3Mgc2NoZWR1bGVkIHRvIGJlIHJ1biBpbiB0aGUgbmV4dCBgbWlsbGlzYCBtaWxsaXNlY29uZHMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXI9fSBtaWxsaXMgbWF4aW11bSB0aW1lb3V0IGFtb3VudCB0byBmbHVzaCB1cCB1bnRpbC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBhbW91bnQgb2YgdGltZSBtb3ZlZCBmb3J3YXJkLlxyXG4gICAgICovXHJcbiAgICAkaW50ZXJ2YWwuZmx1c2ggPSBmdW5jdGlvbihtaWxsaXMpIHtcclxuICAgICAgbm93ICs9IG1pbGxpcztcclxuICAgICAgd2hpbGUgKHJlcGVhdEZucy5sZW5ndGggJiYgcmVwZWF0Rm5zWzBdLm5leHRUaW1lIDw9IG5vdykge1xyXG4gICAgICAgIHZhciB0YXNrID0gcmVwZWF0Rm5zWzBdO1xyXG4gICAgICAgIHRhc2suZm4oKTtcclxuICAgICAgICB0YXNrLm5leHRUaW1lICs9IHRhc2suZGVsYXk7XHJcbiAgICAgICAgcmVwZWF0Rm5zLnNvcnQoZnVuY3Rpb24oYSwgYikgeyByZXR1cm4gYS5uZXh0VGltZSAtIGIubmV4dFRpbWU7fSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG1pbGxpcztcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuICRpbnRlcnZhbDtcclxuICB9XTtcclxufTtcclxuXHJcblxyXG4vKiBqc2hpbnQgLVcxMDEgKi9cclxuLyogVGhlIFJfSVNPODA2MV9TVFIgcmVnZXggaXMgbmV2ZXIgZ29pbmcgdG8gZml0IGludG8gdGhlIDEwMCBjaGFyIGxpbWl0IVxyXG4gKiBUaGlzIGRpcmVjdGl2ZSBzaG91bGQgZ28gaW5zaWRlIHRoZSBhbm9ueW1vdXMgZnVuY3Rpb24gYnV0IGEgYnVnIGluIEpTSGludCBtZWFucyB0aGF0IGl0IHdvdWxkXHJcbiAqIG5vdCBiZSBlbmFjdGVkIGVhcmx5IGVub3VnaCB0byBwcmV2ZW50IHRoZSB3YXJuaW5nLlxyXG4gKi9cclxudmFyIFJfSVNPODA2MV9TVFIgPSAvXihcXGR7NH0pLT8oXFxkXFxkKS0/KFxcZFxcZCkoPzpUKFxcZFxcZCkoPzpcXDo/KFxcZFxcZCkoPzpcXDo/KFxcZFxcZCkoPzpcXC4oXFxkezN9KSk/KT8pPyhafChbKy1dKShcXGRcXGQpOj8oXFxkXFxkKSkpPyQvO1xyXG5cclxuZnVuY3Rpb24ganNvblN0cmluZ1RvRGF0ZShzdHJpbmcpIHtcclxuICB2YXIgbWF0Y2g7XHJcbiAgaWYgKG1hdGNoID0gc3RyaW5nLm1hdGNoKFJfSVNPODA2MV9TVFIpKSB7XHJcbiAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKDApLFxyXG4gICAgICAgIHR6SG91ciA9IDAsXHJcbiAgICAgICAgdHpNaW4gID0gMDtcclxuICAgIGlmIChtYXRjaFs5XSkge1xyXG4gICAgICB0ekhvdXIgPSBpbnQobWF0Y2hbOV0gKyBtYXRjaFsxMF0pO1xyXG4gICAgICB0ek1pbiA9IGludChtYXRjaFs5XSArIG1hdGNoWzExXSk7XHJcbiAgICB9XHJcbiAgICBkYXRlLnNldFVUQ0Z1bGxZZWFyKGludChtYXRjaFsxXSksIGludChtYXRjaFsyXSkgLSAxLCBpbnQobWF0Y2hbM10pKTtcclxuICAgIGRhdGUuc2V0VVRDSG91cnMoaW50KG1hdGNoWzRdIHx8IDApIC0gdHpIb3VyLFxyXG4gICAgICAgICAgICAgICAgICAgICBpbnQobWF0Y2hbNV0gfHwgMCkgLSB0ek1pbixcclxuICAgICAgICAgICAgICAgICAgICAgaW50KG1hdGNoWzZdIHx8IDApLFxyXG4gICAgICAgICAgICAgICAgICAgICBpbnQobWF0Y2hbN10gfHwgMCkpO1xyXG4gICAgcmV0dXJuIGRhdGU7XHJcbiAgfVxyXG4gIHJldHVybiBzdHJpbmc7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGludChzdHIpIHtcclxuICByZXR1cm4gcGFyc2VJbnQoc3RyLCAxMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhZE51bWJlcihudW0sIGRpZ2l0cywgdHJpbSkge1xyXG4gIHZhciBuZWcgPSAnJztcclxuICBpZiAobnVtIDwgMCkge1xyXG4gICAgbmVnID0gICctJztcclxuICAgIG51bSA9IC1udW07XHJcbiAgfVxyXG4gIG51bSA9ICcnICsgbnVtO1xyXG4gIHdoaWxlIChudW0ubGVuZ3RoIDwgZGlnaXRzKSBudW0gPSAnMCcgKyBudW07XHJcbiAgaWYgKHRyaW0pXHJcbiAgICBudW0gPSBudW0uc3Vic3RyKG51bS5sZW5ndGggLSBkaWdpdHMpO1xyXG4gIHJldHVybiBuZWcgKyBudW07XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogQG5nZG9jIHR5cGVcclxuICogQG5hbWUgYW5ndWxhci5tb2NrLlR6RGF0ZVxyXG4gKiBAZGVzY3JpcHRpb25cclxuICpcclxuICogKk5PVEUqOiB0aGlzIGlzIG5vdCBhbiBpbmplY3RhYmxlIGluc3RhbmNlLCBqdXN0IGEgZ2xvYmFsbHkgYXZhaWxhYmxlIG1vY2sgY2xhc3Mgb2YgYERhdGVgLlxyXG4gKlxyXG4gKiBNb2NrIG9mIHRoZSBEYXRlIHR5cGUgd2hpY2ggaGFzIGl0cyB0aW1lem9uZSBzcGVjaWZpZWQgdmlhIGNvbnN0cnVjdG9yIGFyZy5cclxuICpcclxuICogVGhlIG1haW4gcHVycG9zZSBpcyB0byBjcmVhdGUgRGF0ZS1saWtlIGluc3RhbmNlcyB3aXRoIHRpbWV6b25lIGZpeGVkIHRvIHRoZSBzcGVjaWZpZWQgdGltZXpvbmVcclxuICogb2Zmc2V0LCBzbyB0aGF0IHdlIGNhbiB0ZXN0IGNvZGUgdGhhdCBkZXBlbmRzIG9uIGxvY2FsIHRpbWV6b25lIHNldHRpbmdzIHdpdGhvdXQgZGVwZW5kZW5jeSBvblxyXG4gKiB0aGUgdGltZSB6b25lIHNldHRpbmdzIG9mIHRoZSBtYWNoaW5lIHdoZXJlIHRoZSBjb2RlIGlzIHJ1bm5pbmcuXHJcbiAqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgT2Zmc2V0IG9mIHRoZSAqZGVzaXJlZCogdGltZXpvbmUgaW4gaG91cnMgKGZyYWN0aW9ucyB3aWxsIGJlIGhvbm9yZWQpXHJcbiAqIEBwYXJhbSB7KG51bWJlcnxzdHJpbmcpfSB0aW1lc3RhbXAgVGltZXN0YW1wIHJlcHJlc2VudGluZyB0aGUgZGVzaXJlZCB0aW1lIGluICpVVEMqXHJcbiAqXHJcbiAqIEBleGFtcGxlXHJcbiAqICEhISEgV0FSTklORyAhISEhIVxyXG4gKiBUaGlzIGlzIG5vdCBhIGNvbXBsZXRlIERhdGUgb2JqZWN0IHNvIG9ubHkgbWV0aG9kcyB0aGF0IHdlcmUgaW1wbGVtZW50ZWQgY2FuIGJlIGNhbGxlZCBzYWZlbHkuXHJcbiAqIFRvIG1ha2UgbWF0dGVycyB3b3JzZSwgVHpEYXRlIGluc3RhbmNlcyBpbmhlcml0IHN0dWZmIGZyb20gRGF0ZSB2aWEgYSBwcm90b3R5cGUuXHJcbiAqXHJcbiAqIFdlIGRvIG91ciBiZXN0IHRvIGludGVyY2VwdCBjYWxscyB0byBcInVuaW1wbGVtZW50ZWRcIiBtZXRob2RzLCBidXQgc2luY2UgdGhlIGxpc3Qgb2YgbWV0aG9kcyBpc1xyXG4gKiBpbmNvbXBsZXRlIHdlIG1pZ2h0IGJlIG1pc3Npbmcgc29tZSBub24tc3RhbmRhcmQgbWV0aG9kcy4gVGhpcyBjYW4gcmVzdWx0IGluIGVycm9ycyBsaWtlOlxyXG4gKiBcIkRhdGUucHJvdG90eXBlLmZvbyBjYWxsZWQgb24gaW5jb21wYXRpYmxlIE9iamVjdFwiLlxyXG4gKlxyXG4gKiBgYGBqc1xyXG4gKiB2YXIgbmV3WWVhckluQnJhdGlzbGF2YSA9IG5ldyBUekRhdGUoLTEsICcyMDA5LTEyLTMxVDIzOjAwOjAwWicpO1xyXG4gKiBuZXdZZWFySW5CcmF0aXNsYXZhLmdldFRpbWV6b25lT2Zmc2V0KCkgPT4gLTYwO1xyXG4gKiBuZXdZZWFySW5CcmF0aXNsYXZhLmdldEZ1bGxZZWFyKCkgPT4gMjAxMDtcclxuICogbmV3WWVhckluQnJhdGlzbGF2YS5nZXRNb250aCgpID0+IDA7XHJcbiAqIG5ld1llYXJJbkJyYXRpc2xhdmEuZ2V0RGF0ZSgpID0+IDE7XHJcbiAqIG5ld1llYXJJbkJyYXRpc2xhdmEuZ2V0SG91cnMoKSA9PiAwO1xyXG4gKiBuZXdZZWFySW5CcmF0aXNsYXZhLmdldE1pbnV0ZXMoKSA9PiAwO1xyXG4gKiBuZXdZZWFySW5CcmF0aXNsYXZhLmdldFNlY29uZHMoKSA9PiAwO1xyXG4gKiBgYGBcclxuICpcclxuICovXHJcbmFuZ3VsYXIubW9jay5UekRhdGUgPSBmdW5jdGlvbihvZmZzZXQsIHRpbWVzdGFtcCkge1xyXG4gIHZhciBzZWxmID0gbmV3IERhdGUoMCk7XHJcbiAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcodGltZXN0YW1wKSkge1xyXG4gICAgdmFyIHRzU3RyID0gdGltZXN0YW1wO1xyXG5cclxuICAgIHNlbGYub3JpZ0RhdGUgPSBqc29uU3RyaW5nVG9EYXRlKHRpbWVzdGFtcCk7XHJcblxyXG4gICAgdGltZXN0YW1wID0gc2VsZi5vcmlnRGF0ZS5nZXRUaW1lKCk7XHJcbiAgICBpZiAoaXNOYU4odGltZXN0YW1wKSlcclxuICAgICAgdGhyb3cge1xyXG4gICAgICAgIG5hbWU6IFwiSWxsZWdhbCBBcmd1bWVudFwiLFxyXG4gICAgICAgIG1lc3NhZ2U6IFwiQXJnICdcIiArIHRzU3RyICsgXCInIHBhc3NlZCBpbnRvIFR6RGF0ZSBjb25zdHJ1Y3RvciBpcyBub3QgYSB2YWxpZCBkYXRlIHN0cmluZ1wiXHJcbiAgICAgIH07XHJcbiAgfSBlbHNlIHtcclxuICAgIHNlbGYub3JpZ0RhdGUgPSBuZXcgRGF0ZSh0aW1lc3RhbXApO1xyXG4gIH1cclxuXHJcbiAgdmFyIGxvY2FsT2Zmc2V0ID0gbmV3IERhdGUodGltZXN0YW1wKS5nZXRUaW1lem9uZU9mZnNldCgpO1xyXG4gIHNlbGYub2Zmc2V0RGlmZiA9IGxvY2FsT2Zmc2V0ICogNjAgKiAxMDAwIC0gb2Zmc2V0ICogMTAwMCAqIDYwICogNjA7XHJcbiAgc2VsZi5kYXRlID0gbmV3IERhdGUodGltZXN0YW1wICsgc2VsZi5vZmZzZXREaWZmKTtcclxuXHJcbiAgc2VsZi5nZXRUaW1lID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gc2VsZi5kYXRlLmdldFRpbWUoKSAtIHNlbGYub2Zmc2V0RGlmZjtcclxuICB9O1xyXG5cclxuICBzZWxmLnRvTG9jYWxlRGF0ZVN0cmluZyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHNlbGYuZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoKTtcclxuICB9O1xyXG5cclxuICBzZWxmLmdldEZ1bGxZZWFyID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gc2VsZi5kYXRlLmdldEZ1bGxZZWFyKCk7XHJcbiAgfTtcclxuXHJcbiAgc2VsZi5nZXRNb250aCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHNlbGYuZGF0ZS5nZXRNb250aCgpO1xyXG4gIH07XHJcblxyXG4gIHNlbGYuZ2V0RGF0ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHNlbGYuZGF0ZS5nZXREYXRlKCk7XHJcbiAgfTtcclxuXHJcbiAgc2VsZi5nZXRIb3VycyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHNlbGYuZGF0ZS5nZXRIb3VycygpO1xyXG4gIH07XHJcblxyXG4gIHNlbGYuZ2V0TWludXRlcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHNlbGYuZGF0ZS5nZXRNaW51dGVzKCk7XHJcbiAgfTtcclxuXHJcbiAgc2VsZi5nZXRTZWNvbmRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gc2VsZi5kYXRlLmdldFNlY29uZHMoKTtcclxuICB9O1xyXG5cclxuICBzZWxmLmdldE1pbGxpc2Vjb25kcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHNlbGYuZGF0ZS5nZXRNaWxsaXNlY29uZHMoKTtcclxuICB9O1xyXG5cclxuICBzZWxmLmdldFRpbWV6b25lT2Zmc2V0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gb2Zmc2V0ICogNjA7XHJcbiAgfTtcclxuXHJcbiAgc2VsZi5nZXRVVENGdWxsWWVhciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHNlbGYub3JpZ0RhdGUuZ2V0VVRDRnVsbFllYXIoKTtcclxuICB9O1xyXG5cclxuICBzZWxmLmdldFVUQ01vbnRoID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gc2VsZi5vcmlnRGF0ZS5nZXRVVENNb250aCgpO1xyXG4gIH07XHJcblxyXG4gIHNlbGYuZ2V0VVRDRGF0ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHNlbGYub3JpZ0RhdGUuZ2V0VVRDRGF0ZSgpO1xyXG4gIH07XHJcblxyXG4gIHNlbGYuZ2V0VVRDSG91cnMgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiBzZWxmLm9yaWdEYXRlLmdldFVUQ0hvdXJzKCk7XHJcbiAgfTtcclxuXHJcbiAgc2VsZi5nZXRVVENNaW51dGVzID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gc2VsZi5vcmlnRGF0ZS5nZXRVVENNaW51dGVzKCk7XHJcbiAgfTtcclxuXHJcbiAgc2VsZi5nZXRVVENTZWNvbmRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gc2VsZi5vcmlnRGF0ZS5nZXRVVENTZWNvbmRzKCk7XHJcbiAgfTtcclxuXHJcbiAgc2VsZi5nZXRVVENNaWxsaXNlY29uZHMgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiBzZWxmLm9yaWdEYXRlLmdldFVUQ01pbGxpc2Vjb25kcygpO1xyXG4gIH07XHJcblxyXG4gIHNlbGYuZ2V0RGF5ID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gc2VsZi5kYXRlLmdldERheSgpO1xyXG4gIH07XHJcblxyXG4gIC8vIHByb3ZpZGUgdGhpcyBtZXRob2Qgb25seSBvbiBicm93c2VycyB0aGF0IGFscmVhZHkgaGF2ZSBpdFxyXG4gIGlmIChzZWxmLnRvSVNPU3RyaW5nKSB7XHJcbiAgICBzZWxmLnRvSVNPU3RyaW5nID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiBwYWROdW1iZXIoc2VsZi5vcmlnRGF0ZS5nZXRVVENGdWxsWWVhcigpLCA0KSArICctJyArXHJcbiAgICAgICAgICAgIHBhZE51bWJlcihzZWxmLm9yaWdEYXRlLmdldFVUQ01vbnRoKCkgKyAxLCAyKSArICctJyArXHJcbiAgICAgICAgICAgIHBhZE51bWJlcihzZWxmLm9yaWdEYXRlLmdldFVUQ0RhdGUoKSwgMikgKyAnVCcgK1xyXG4gICAgICAgICAgICBwYWROdW1iZXIoc2VsZi5vcmlnRGF0ZS5nZXRVVENIb3VycygpLCAyKSArICc6JyArXHJcbiAgICAgICAgICAgIHBhZE51bWJlcihzZWxmLm9yaWdEYXRlLmdldFVUQ01pbnV0ZXMoKSwgMikgKyAnOicgK1xyXG4gICAgICAgICAgICBwYWROdW1iZXIoc2VsZi5vcmlnRGF0ZS5nZXRVVENTZWNvbmRzKCksIDIpICsgJy4nICtcclxuICAgICAgICAgICAgcGFkTnVtYmVyKHNlbGYub3JpZ0RhdGUuZ2V0VVRDTWlsbGlzZWNvbmRzKCksIDMpICsgJ1onO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8vaGlkZSBhbGwgbWV0aG9kcyBub3QgaW1wbGVtZW50ZWQgaW4gdGhpcyBtb2NrIHRoYXQgdGhlIERhdGUgcHJvdG90eXBlIGV4cG9zZXNcclxuICB2YXIgdW5pbXBsZW1lbnRlZE1ldGhvZHMgPSBbJ2dldFVUQ0RheScsXHJcbiAgICAgICdnZXRZZWFyJywgJ3NldERhdGUnLCAnc2V0RnVsbFllYXInLCAnc2V0SG91cnMnLCAnc2V0TWlsbGlzZWNvbmRzJyxcclxuICAgICAgJ3NldE1pbnV0ZXMnLCAnc2V0TW9udGgnLCAnc2V0U2Vjb25kcycsICdzZXRUaW1lJywgJ3NldFVUQ0RhdGUnLCAnc2V0VVRDRnVsbFllYXInLFxyXG4gICAgICAnc2V0VVRDSG91cnMnLCAnc2V0VVRDTWlsbGlzZWNvbmRzJywgJ3NldFVUQ01pbnV0ZXMnLCAnc2V0VVRDTW9udGgnLCAnc2V0VVRDU2Vjb25kcycsXHJcbiAgICAgICdzZXRZZWFyJywgJ3RvRGF0ZVN0cmluZycsICd0b0dNVFN0cmluZycsICd0b0pTT04nLCAndG9Mb2NhbGVGb3JtYXQnLCAndG9Mb2NhbGVTdHJpbmcnLFxyXG4gICAgICAndG9Mb2NhbGVUaW1lU3RyaW5nJywgJ3RvU291cmNlJywgJ3RvU3RyaW5nJywgJ3RvVGltZVN0cmluZycsICd0b1VUQ1N0cmluZycsICd2YWx1ZU9mJ107XHJcblxyXG4gIGFuZ3VsYXIuZm9yRWFjaCh1bmltcGxlbWVudGVkTWV0aG9kcywgZnVuY3Rpb24obWV0aG9kTmFtZSkge1xyXG4gICAgc2VsZlttZXRob2ROYW1lXSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXRob2QgJ1wiICsgbWV0aG9kTmFtZSArIFwiJyBpcyBub3QgaW1wbGVtZW50ZWQgaW4gdGhlIFR6RGF0ZSBtb2NrXCIpO1xyXG4gICAgfTtcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHNlbGY7XHJcbn07XHJcblxyXG4vL21ha2UgXCJ0ekRhdGVJbnN0YW5jZSBpbnN0YW5jZW9mIERhdGVcIiByZXR1cm4gdHJ1ZVxyXG5hbmd1bGFyLm1vY2suVHpEYXRlLnByb3RvdHlwZSA9IERhdGUucHJvdG90eXBlO1xyXG4vKiBqc2hpbnQgK1cxMDEgKi9cclxuXHJcbmFuZ3VsYXIubW9jay5hbmltYXRlID0gYW5ndWxhci5tb2R1bGUoJ25nQW5pbWF0ZU1vY2snLCBbJ25nJ10pXHJcblxyXG4gIC5jb25maWcoWyckcHJvdmlkZScsIGZ1bmN0aW9uKCRwcm92aWRlKSB7XHJcblxyXG4gICAgdmFyIHJlZmxvd1F1ZXVlID0gW107XHJcbiAgICAkcHJvdmlkZS52YWx1ZSgnJCRhbmltYXRlUmVmbG93JywgZnVuY3Rpb24oZm4pIHtcclxuICAgICAgdmFyIGluZGV4ID0gcmVmbG93UXVldWUubGVuZ3RoO1xyXG4gICAgICByZWZsb3dRdWV1ZS5wdXNoKGZuKTtcclxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGNhbmNlbCgpIHtcclxuICAgICAgICByZWZsb3dRdWV1ZS5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcblxyXG4gICAgJHByb3ZpZGUuZGVjb3JhdG9yKCckYW5pbWF0ZScsIFsnJGRlbGVnYXRlJywgJyQkYXN5bmNDYWxsYmFjaycsICckdGltZW91dCcsICckYnJvd3NlcicsICckcm9vdFNjb3BlJywgJyQkckFGJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCRkZWxlZ2F0ZSwgICAkJGFzeW5jQ2FsbGJhY2ssICAgJHRpbWVvdXQsICAgJGJyb3dzZXIsICAgJHJvb3RTY29wZSwgICAkJHJBRikge1xyXG4gICAgICB2YXIgYW5pbWF0ZSA9IHtcclxuICAgICAgICBxdWV1ZTogW10sXHJcbiAgICAgICAgY2FuY2VsOiAkZGVsZWdhdGUuY2FuY2VsLFxyXG4gICAgICAgIGVuYWJsZWQ6ICRkZWxlZ2F0ZS5lbmFibGVkLFxyXG4gICAgICAgIHRyaWdnZXJDYWxsYmFja0V2ZW50czogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAkJGFzeW5jQ2FsbGJhY2suZmx1c2goKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRyaWdnZXJDYWxsYmFja1Byb21pc2U6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgJHRpbWVvdXQuZmx1c2goMCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0cmlnZ2VyQ2FsbGJhY2tzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHRoaXMudHJpZ2dlckNhbGxiYWNrRXZlbnRzKCk7XHJcbiAgICAgICAgICB0aGlzLnRyaWdnZXJDYWxsYmFja1Byb21pc2UoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRyaWdnZXJSZWZsb3c6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHJlZmxvd1F1ZXVlLCBmdW5jdGlvbihmbikge1xyXG4gICAgICAgICAgICBmbigpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICByZWZsb3dRdWV1ZSA9IFtdO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZmx1c2g6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgJHJvb3RTY29wZS4kZGlnZXN0KCk7XHJcbiAgICAgICAgICB2YXIgZG9OZXh0UnVuLCBzb21ldGhpbmdGbHVzaGVkID0gZmFsc2U7XHJcbiAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgIGRvTmV4dFJ1biA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAocmVmbG93UXVldWUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgZG9OZXh0UnVuID0gc29tZXRoaW5nRmx1c2hlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyUmVmbG93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCQkckFGLnF1ZXVlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgIGRvTmV4dFJ1biA9IHNvbWV0aGluZ0ZsdXNoZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICQkckFGLmZsdXNoKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCQkYXN5bmNDYWxsYmFjay5xdWV1ZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICBkb05leHRSdW4gPSBzb21ldGhpbmdGbHVzaGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICB0aGlzLnRyaWdnZXJDYWxsYmFja0V2ZW50cygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aW1lb3V0c1JlbWFpbmluZygpKSB7XHJcbiAgICAgICAgICAgICAgdmFyIG9sZFZhbHVlID0gdGltZW91dHNSZW1haW5pbmcoKTtcclxuICAgICAgICAgICAgICB0aGlzLnRyaWdnZXJDYWxsYmFja1Byb21pc2UoKTtcclxuICAgICAgICAgICAgICB2YXIgbmV3VmFsdWUgPSB0aW1lb3V0c1JlbWFpbmluZygpO1xyXG4gICAgICAgICAgICAgIGlmIChuZXdWYWx1ZSA8IG9sZFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBkb05leHRSdW4gPSBzb21ldGhpbmdGbHVzaGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gd2hpbGUgKGRvTmV4dFJ1bik7XHJcblxyXG4gICAgICAgICAgaWYgKCFzb21ldGhpbmdGbHVzaGVkKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gcGVuZGluZyBhbmltYXRpb25zIHJlYWR5IHRvIGJlIGNsb3NlZCBvciBmbHVzaGVkJyk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgJHJvb3RTY29wZS4kZGlnZXN0KCk7XHJcblxyXG4gICAgICAgICAgZnVuY3Rpb24gdGltZW91dHNSZW1haW5pbmcoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkYnJvd3Nlci5kZWZlcnJlZEZucy5sZW5ndGg7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgYW5ndWxhci5mb3JFYWNoKFxyXG4gICAgICAgIFsnYW5pbWF0ZScsJ2VudGVyJywnbGVhdmUnLCdtb3ZlJywnYWRkQ2xhc3MnLCdyZW1vdmVDbGFzcycsJ3NldENsYXNzJ10sIGZ1bmN0aW9uKG1ldGhvZCkge1xyXG4gICAgICAgIGFuaW1hdGVbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgYW5pbWF0ZS5xdWV1ZS5wdXNoKHtcclxuICAgICAgICAgICAgZXZlbnQ6IG1ldGhvZCxcclxuICAgICAgICAgICAgZWxlbWVudDogYXJndW1lbnRzWzBdLFxyXG4gICAgICAgICAgICBvcHRpb25zOiBhcmd1bWVudHNbYXJndW1lbnRzLmxlbmd0aCAtIDFdLFxyXG4gICAgICAgICAgICBhcmdzOiBhcmd1bWVudHNcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgcmV0dXJuICRkZWxlZ2F0ZVttZXRob2RdLmFwcGx5KCRkZWxlZ2F0ZSwgYXJndW1lbnRzKTtcclxuICAgICAgICB9O1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiBhbmltYXRlO1xyXG4gICAgfV0pO1xyXG5cclxuICB9XSk7XHJcblxyXG5cclxuLyoqXHJcbiAqIEBuZ2RvYyBmdW5jdGlvblxyXG4gKiBAbmFtZSBhbmd1bGFyLm1vY2suZHVtcFxyXG4gKiBAZGVzY3JpcHRpb25cclxuICpcclxuICogKk5PVEUqOiB0aGlzIGlzIG5vdCBhbiBpbmplY3RhYmxlIGluc3RhbmNlLCBqdXN0IGEgZ2xvYmFsbHkgYXZhaWxhYmxlIGZ1bmN0aW9uLlxyXG4gKlxyXG4gKiBNZXRob2QgZm9yIHNlcmlhbGl6aW5nIGNvbW1vbiBhbmd1bGFyIG9iamVjdHMgKHNjb3BlLCBlbGVtZW50cywgZXRjLi4pIGludG8gc3RyaW5ncywgdXNlZnVsIGZvclxyXG4gKiBkZWJ1Z2dpbmcuXHJcbiAqXHJcbiAqIFRoaXMgbWV0aG9kIGlzIGFsc28gYXZhaWxhYmxlIG9uIHdpbmRvdywgd2hlcmUgaXQgY2FuIGJlIHVzZWQgdG8gZGlzcGxheSBvYmplY3RzIG9uIGRlYnVnXHJcbiAqIGNvbnNvbGUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7Kn0gb2JqZWN0IC0gYW55IG9iamVjdCB0byB0dXJuIGludG8gc3RyaW5nLlxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9IGEgc2VyaWFsaXplZCBzdHJpbmcgb2YgdGhlIGFyZ3VtZW50XHJcbiAqL1xyXG5hbmd1bGFyLm1vY2suZHVtcCA9IGZ1bmN0aW9uKG9iamVjdCkge1xyXG4gIHJldHVybiBzZXJpYWxpemUob2JqZWN0KTtcclxuXHJcbiAgZnVuY3Rpb24gc2VyaWFsaXplKG9iamVjdCkge1xyXG4gICAgdmFyIG91dDtcclxuXHJcbiAgICBpZiAoYW5ndWxhci5pc0VsZW1lbnQob2JqZWN0KSkge1xyXG4gICAgICBvYmplY3QgPSBhbmd1bGFyLmVsZW1lbnQob2JqZWN0KTtcclxuICAgICAgb3V0ID0gYW5ndWxhci5lbGVtZW50KCc8ZGl2PjwvZGl2PicpO1xyXG4gICAgICBhbmd1bGFyLmZvckVhY2gob2JqZWN0LCBmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICAgICAgb3V0LmFwcGVuZChhbmd1bGFyLmVsZW1lbnQoZWxlbWVudCkuY2xvbmUoKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBvdXQgPSBvdXQuaHRtbCgpO1xyXG4gICAgfSBlbHNlIGlmIChhbmd1bGFyLmlzQXJyYXkob2JqZWN0KSkge1xyXG4gICAgICBvdXQgPSBbXTtcclxuICAgICAgYW5ndWxhci5mb3JFYWNoKG9iamVjdCwgZnVuY3Rpb24obykge1xyXG4gICAgICAgIG91dC5wdXNoKHNlcmlhbGl6ZShvKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBvdXQgPSAnWyAnICsgb3V0LmpvaW4oJywgJykgKyAnIF0nO1xyXG4gICAgfSBlbHNlIGlmIChhbmd1bGFyLmlzT2JqZWN0KG9iamVjdCkpIHtcclxuICAgICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbihvYmplY3QuJGV2YWwpICYmIGFuZ3VsYXIuaXNGdW5jdGlvbihvYmplY3QuJGFwcGx5KSkge1xyXG4gICAgICAgIG91dCA9IHNlcmlhbGl6ZVNjb3BlKG9iamVjdCk7XHJcbiAgICAgIH0gZWxzZSBpZiAob2JqZWN0IGluc3RhbmNlb2YgRXJyb3IpIHtcclxuICAgICAgICBvdXQgPSBvYmplY3Quc3RhY2sgfHwgKCcnICsgb2JqZWN0Lm5hbWUgKyAnOiAnICsgb2JqZWN0Lm1lc3NhZ2UpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIFRPRE8oaSk6IHRoaXMgcHJldmVudHMgbWV0aG9kcyBiZWluZyBsb2dnZWQsXHJcbiAgICAgICAgLy8gd2Ugc2hvdWxkIGhhdmUgYSBiZXR0ZXIgd2F5IHRvIHNlcmlhbGl6ZSBvYmplY3RzXHJcbiAgICAgICAgb3V0ID0gYW5ndWxhci50b0pzb24ob2JqZWN0LCB0cnVlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgb3V0ID0gU3RyaW5nKG9iamVjdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG91dDtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHNlcmlhbGl6ZVNjb3BlKHNjb3BlLCBvZmZzZXQpIHtcclxuICAgIG9mZnNldCA9IG9mZnNldCB8fCAgJyAgJztcclxuICAgIHZhciBsb2cgPSBbb2Zmc2V0ICsgJ1Njb3BlKCcgKyBzY29wZS4kaWQgKyAnKTogeyddO1xyXG4gICAgZm9yICh2YXIga2V5IGluIHNjb3BlKSB7XHJcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc2NvcGUsIGtleSkgJiYgIWtleS5tYXRjaCgvXihcXCR8dGhpcykvKSkge1xyXG4gICAgICAgIGxvZy5wdXNoKCcgICcgKyBrZXkgKyAnOiAnICsgYW5ndWxhci50b0pzb24oc2NvcGVba2V5XSkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB2YXIgY2hpbGQgPSBzY29wZS4kJGNoaWxkSGVhZDtcclxuICAgIHdoaWxlIChjaGlsZCkge1xyXG4gICAgICBsb2cucHVzaChzZXJpYWxpemVTY29wZShjaGlsZCwgb2Zmc2V0ICsgJyAgJykpO1xyXG4gICAgICBjaGlsZCA9IGNoaWxkLiQkbmV4dFNpYmxpbmc7XHJcbiAgICB9XHJcbiAgICBsb2cucHVzaCgnfScpO1xyXG4gICAgcmV0dXJuIGxvZy5qb2luKCdcXG4nICsgb2Zmc2V0KTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogQG5nZG9jIHNlcnZpY2VcclxuICogQG5hbWUgJGh0dHBCYWNrZW5kXHJcbiAqIEBkZXNjcmlwdGlvblxyXG4gKiBGYWtlIEhUVFAgYmFja2VuZCBpbXBsZW1lbnRhdGlvbiBzdWl0YWJsZSBmb3IgdW5pdCB0ZXN0aW5nIGFwcGxpY2F0aW9ucyB0aGF0IHVzZSB0aGVcclxuICoge0BsaW5rIG5nLiRodHRwICRodHRwIHNlcnZpY2V9LlxyXG4gKlxyXG4gKiAqTm90ZSo6IEZvciBmYWtlIEhUVFAgYmFja2VuZCBpbXBsZW1lbnRhdGlvbiBzdWl0YWJsZSBmb3IgZW5kLXRvLWVuZCB0ZXN0aW5nIG9yIGJhY2tlbmQtbGVzc1xyXG4gKiBkZXZlbG9wbWVudCBwbGVhc2Ugc2VlIHtAbGluayBuZ01vY2tFMkUuJGh0dHBCYWNrZW5kIGUyZSAkaHR0cEJhY2tlbmQgbW9ja30uXHJcbiAqXHJcbiAqIER1cmluZyB1bml0IHRlc3RpbmcsIHdlIHdhbnQgb3VyIHVuaXQgdGVzdHMgdG8gcnVuIHF1aWNrbHkgYW5kIGhhdmUgbm8gZXh0ZXJuYWwgZGVwZW5kZW5jaWVzIHNvXHJcbiAqIHdlIGRvbuKAmXQgd2FudCB0byBzZW5kIFtYSFJdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL3htbGh0dHByZXF1ZXN0KSBvclxyXG4gKiBbSlNPTlBdKGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSlNPTlApIHJlcXVlc3RzIHRvIGEgcmVhbCBzZXJ2ZXIuIEFsbCB3ZSByZWFsbHkgbmVlZCBpc1xyXG4gKiB0byB2ZXJpZnkgd2hldGhlciBhIGNlcnRhaW4gcmVxdWVzdCBoYXMgYmVlbiBzZW50IG9yIG5vdCwgb3IgYWx0ZXJuYXRpdmVseSBqdXN0IGxldCB0aGVcclxuICogYXBwbGljYXRpb24gbWFrZSByZXF1ZXN0cywgcmVzcG9uZCB3aXRoIHByZS10cmFpbmVkIHJlc3BvbnNlcyBhbmQgYXNzZXJ0IHRoYXQgdGhlIGVuZCByZXN1bHQgaXNcclxuICogd2hhdCB3ZSBleHBlY3QgaXQgdG8gYmUuXHJcbiAqXHJcbiAqIFRoaXMgbW9jayBpbXBsZW1lbnRhdGlvbiBjYW4gYmUgdXNlZCB0byByZXNwb25kIHdpdGggc3RhdGljIG9yIGR5bmFtaWMgcmVzcG9uc2VzIHZpYSB0aGVcclxuICogYGV4cGVjdGAgYW5kIGB3aGVuYCBhcGlzIGFuZCB0aGVpciBzaG9ydGN1dHMgKGBleHBlY3RHRVRgLCBgd2hlblBPU1RgLCBldGMpLlxyXG4gKlxyXG4gKiBXaGVuIGFuIEFuZ3VsYXIgYXBwbGljYXRpb24gbmVlZHMgc29tZSBkYXRhIGZyb20gYSBzZXJ2ZXIsIGl0IGNhbGxzIHRoZSAkaHR0cCBzZXJ2aWNlLCB3aGljaFxyXG4gKiBzZW5kcyB0aGUgcmVxdWVzdCB0byBhIHJlYWwgc2VydmVyIHVzaW5nICRodHRwQmFja2VuZCBzZXJ2aWNlLiBXaXRoIGRlcGVuZGVuY3kgaW5qZWN0aW9uLCBpdCBpc1xyXG4gKiBlYXN5IHRvIGluamVjdCAkaHR0cEJhY2tlbmQgbW9jayAod2hpY2ggaGFzIHRoZSBzYW1lIEFQSSBhcyAkaHR0cEJhY2tlbmQpIGFuZCB1c2UgaXQgdG8gdmVyaWZ5XHJcbiAqIHRoZSByZXF1ZXN0cyBhbmQgcmVzcG9uZCB3aXRoIHNvbWUgdGVzdGluZyBkYXRhIHdpdGhvdXQgc2VuZGluZyBhIHJlcXVlc3QgdG8gYSByZWFsIHNlcnZlci5cclxuICpcclxuICogVGhlcmUgYXJlIHR3byB3YXlzIHRvIHNwZWNpZnkgd2hhdCB0ZXN0IGRhdGEgc2hvdWxkIGJlIHJldHVybmVkIGFzIGh0dHAgcmVzcG9uc2VzIGJ5IHRoZSBtb2NrXHJcbiAqIGJhY2tlbmQgd2hlbiB0aGUgY29kZSB1bmRlciB0ZXN0IG1ha2VzIGh0dHAgcmVxdWVzdHM6XHJcbiAqXHJcbiAqIC0gYCRodHRwQmFja2VuZC5leHBlY3RgIC0gc3BlY2lmaWVzIGEgcmVxdWVzdCBleHBlY3RhdGlvblxyXG4gKiAtIGAkaHR0cEJhY2tlbmQud2hlbmAgLSBzcGVjaWZpZXMgYSBiYWNrZW5kIGRlZmluaXRpb25cclxuICpcclxuICpcclxuICogIyBSZXF1ZXN0IEV4cGVjdGF0aW9ucyB2cyBCYWNrZW5kIERlZmluaXRpb25zXHJcbiAqXHJcbiAqIFJlcXVlc3QgZXhwZWN0YXRpb25zIHByb3ZpZGUgYSB3YXkgdG8gbWFrZSBhc3NlcnRpb25zIGFib3V0IHJlcXVlc3RzIG1hZGUgYnkgdGhlIGFwcGxpY2F0aW9uIGFuZFxyXG4gKiB0byBkZWZpbmUgcmVzcG9uc2VzIGZvciB0aG9zZSByZXF1ZXN0cy4gVGhlIHRlc3Qgd2lsbCBmYWlsIGlmIHRoZSBleHBlY3RlZCByZXF1ZXN0cyBhcmUgbm90IG1hZGVcclxuICogb3IgdGhleSBhcmUgbWFkZSBpbiB0aGUgd3Jvbmcgb3JkZXIuXHJcbiAqXHJcbiAqIEJhY2tlbmQgZGVmaW5pdGlvbnMgYWxsb3cgeW91IHRvIGRlZmluZSBhIGZha2UgYmFja2VuZCBmb3IgeW91ciBhcHBsaWNhdGlvbiB3aGljaCBkb2Vzbid0IGFzc2VydFxyXG4gKiBpZiBhIHBhcnRpY3VsYXIgcmVxdWVzdCB3YXMgbWFkZSBvciBub3QsIGl0IGp1c3QgcmV0dXJucyBhIHRyYWluZWQgcmVzcG9uc2UgaWYgYSByZXF1ZXN0IGlzIG1hZGUuXHJcbiAqIFRoZSB0ZXN0IHdpbGwgcGFzcyB3aGV0aGVyIG9yIG5vdCB0aGUgcmVxdWVzdCBnZXRzIG1hZGUgZHVyaW5nIHRlc3RpbmcuXHJcbiAqXHJcbiAqXHJcbiAqIDx0YWJsZSBjbGFzcz1cInRhYmxlXCI+XHJcbiAqICAgPHRyPjx0aCB3aWR0aD1cIjIyMHB4XCI+PC90aD48dGg+UmVxdWVzdCBleHBlY3RhdGlvbnM8L3RoPjx0aD5CYWNrZW5kIGRlZmluaXRpb25zPC90aD48L3RyPlxyXG4gKiAgIDx0cj5cclxuICogICAgIDx0aD5TeW50YXg8L3RoPlxyXG4gKiAgICAgPHRkPi5leHBlY3QoLi4uKS5yZXNwb25kKC4uLik8L3RkPlxyXG4gKiAgICAgPHRkPi53aGVuKC4uLikucmVzcG9uZCguLi4pPC90ZD5cclxuICogICA8L3RyPlxyXG4gKiAgIDx0cj5cclxuICogICAgIDx0aD5UeXBpY2FsIHVzYWdlPC90aD5cclxuICogICAgIDx0ZD5zdHJpY3QgdW5pdCB0ZXN0czwvdGQ+XHJcbiAqICAgICA8dGQ+bG9vc2UgKGJsYWNrLWJveCkgdW5pdCB0ZXN0aW5nPC90ZD5cclxuICogICA8L3RyPlxyXG4gKiAgIDx0cj5cclxuICogICAgIDx0aD5GdWxmaWxscyBtdWx0aXBsZSByZXF1ZXN0czwvdGg+XHJcbiAqICAgICA8dGQ+Tk88L3RkPlxyXG4gKiAgICAgPHRkPllFUzwvdGQ+XHJcbiAqICAgPC90cj5cclxuICogICA8dHI+XHJcbiAqICAgICA8dGg+T3JkZXIgb2YgcmVxdWVzdHMgbWF0dGVyczwvdGg+XHJcbiAqICAgICA8dGQ+WUVTPC90ZD5cclxuICogICAgIDx0ZD5OTzwvdGQ+XHJcbiAqICAgPC90cj5cclxuICogICA8dHI+XHJcbiAqICAgICA8dGg+UmVxdWVzdCByZXF1aXJlZDwvdGg+XHJcbiAqICAgICA8dGQ+WUVTPC90ZD5cclxuICogICAgIDx0ZD5OTzwvdGQ+XHJcbiAqICAgPC90cj5cclxuICogICA8dHI+XHJcbiAqICAgICA8dGg+UmVzcG9uc2UgcmVxdWlyZWQ8L3RoPlxyXG4gKiAgICAgPHRkPm9wdGlvbmFsIChzZWUgYmVsb3cpPC90ZD5cclxuICogICAgIDx0ZD5ZRVM8L3RkPlxyXG4gKiAgIDwvdHI+XHJcbiAqIDwvdGFibGU+XHJcbiAqXHJcbiAqIEluIGNhc2VzIHdoZXJlIGJvdGggYmFja2VuZCBkZWZpbml0aW9ucyBhbmQgcmVxdWVzdCBleHBlY3RhdGlvbnMgYXJlIHNwZWNpZmllZCBkdXJpbmcgdW5pdFxyXG4gKiB0ZXN0aW5nLCB0aGUgcmVxdWVzdCBleHBlY3RhdGlvbnMgYXJlIGV2YWx1YXRlZCBmaXJzdC5cclxuICpcclxuICogSWYgYSByZXF1ZXN0IGV4cGVjdGF0aW9uIGhhcyBubyByZXNwb25zZSBzcGVjaWZpZWQsIHRoZSBhbGdvcml0aG0gd2lsbCBzZWFyY2ggeW91ciBiYWNrZW5kXHJcbiAqIGRlZmluaXRpb25zIGZvciBhbiBhcHByb3ByaWF0ZSByZXNwb25zZS5cclxuICpcclxuICogSWYgYSByZXF1ZXN0IGRpZG4ndCBtYXRjaCBhbnkgZXhwZWN0YXRpb24gb3IgaWYgdGhlIGV4cGVjdGF0aW9uIGRvZXNuJ3QgaGF2ZSB0aGUgcmVzcG9uc2VcclxuICogZGVmaW5lZCwgdGhlIGJhY2tlbmQgZGVmaW5pdGlvbnMgYXJlIGV2YWx1YXRlZCBpbiBzZXF1ZW50aWFsIG9yZGVyIHRvIHNlZSBpZiBhbnkgb2YgdGhlbSBtYXRjaFxyXG4gKiB0aGUgcmVxdWVzdC4gVGhlIHJlc3BvbnNlIGZyb20gdGhlIGZpcnN0IG1hdGNoZWQgZGVmaW5pdGlvbiBpcyByZXR1cm5lZC5cclxuICpcclxuICpcclxuICogIyBGbHVzaGluZyBIVFRQIHJlcXVlc3RzXHJcbiAqXHJcbiAqIFRoZSAkaHR0cEJhY2tlbmQgdXNlZCBpbiBwcm9kdWN0aW9uIGFsd2F5cyByZXNwb25kcyB0byByZXF1ZXN0cyBhc3luY2hyb25vdXNseS4gSWYgd2UgcHJlc2VydmVkXHJcbiAqIHRoaXMgYmVoYXZpb3IgaW4gdW5pdCB0ZXN0aW5nLCB3ZSdkIGhhdmUgdG8gY3JlYXRlIGFzeW5jIHVuaXQgdGVzdHMsIHdoaWNoIGFyZSBoYXJkIHRvIHdyaXRlLFxyXG4gKiB0byBmb2xsb3cgYW5kIHRvIG1haW50YWluLiBCdXQgbmVpdGhlciBjYW4gdGhlIHRlc3RpbmcgbW9jayByZXNwb25kIHN5bmNocm9ub3VzbHk7IHRoYXQgd291bGRcclxuICogY2hhbmdlIHRoZSBleGVjdXRpb24gb2YgdGhlIGNvZGUgdW5kZXIgdGVzdC4gRm9yIHRoaXMgcmVhc29uLCB0aGUgbW9jayAkaHR0cEJhY2tlbmQgaGFzIGFcclxuICogYGZsdXNoKClgIG1ldGhvZCwgd2hpY2ggYWxsb3dzIHRoZSB0ZXN0IHRvIGV4cGxpY2l0bHkgZmx1c2ggcGVuZGluZyByZXF1ZXN0cy4gVGhpcyBwcmVzZXJ2ZXNcclxuICogdGhlIGFzeW5jIGFwaSBvZiB0aGUgYmFja2VuZCwgd2hpbGUgYWxsb3dpbmcgdGhlIHRlc3QgdG8gZXhlY3V0ZSBzeW5jaHJvbm91c2x5LlxyXG4gKlxyXG4gKlxyXG4gKiAjIFVuaXQgdGVzdGluZyB3aXRoIG1vY2sgJGh0dHBCYWNrZW5kXHJcbiAqIFRoZSBmb2xsb3dpbmcgY29kZSBzaG93cyBob3cgdG8gc2V0dXAgYW5kIHVzZSB0aGUgbW9jayBiYWNrZW5kIHdoZW4gdW5pdCB0ZXN0aW5nIGEgY29udHJvbGxlci5cclxuICogRmlyc3Qgd2UgY3JlYXRlIHRoZSBjb250cm9sbGVyIHVuZGVyIHRlc3Q6XHJcbiAqXHJcbiAgYGBganNcclxuICAvLyBUaGUgbW9kdWxlIGNvZGVcclxuICBhbmd1bGFyXHJcbiAgICAubW9kdWxlKCdNeUFwcCcsIFtdKVxyXG4gICAgLmNvbnRyb2xsZXIoJ015Q29udHJvbGxlcicsIE15Q29udHJvbGxlcik7XHJcblxyXG4gIC8vIFRoZSBjb250cm9sbGVyIGNvZGVcclxuICBmdW5jdGlvbiBNeUNvbnRyb2xsZXIoJHNjb3BlLCAkaHR0cCkge1xyXG4gICAgdmFyIGF1dGhUb2tlbjtcclxuXHJcbiAgICAkaHR0cC5nZXQoJy9hdXRoLnB5Jykuc3VjY2VzcyhmdW5jdGlvbihkYXRhLCBzdGF0dXMsIGhlYWRlcnMpIHtcclxuICAgICAgYXV0aFRva2VuID0gaGVhZGVycygnQS1Ub2tlbicpO1xyXG4gICAgICAkc2NvcGUudXNlciA9IGRhdGE7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkc2NvcGUuc2F2ZU1lc3NhZ2UgPSBmdW5jdGlvbihtZXNzYWdlKSB7XHJcbiAgICAgIHZhciBoZWFkZXJzID0geyAnQXV0aG9yaXphdGlvbic6IGF1dGhUb2tlbiB9O1xyXG4gICAgICAkc2NvcGUuc3RhdHVzID0gJ1NhdmluZy4uLic7XHJcblxyXG4gICAgICAkaHR0cC5wb3N0KCcvYWRkLW1zZy5weScsIG1lc3NhZ2UsIHsgaGVhZGVyczogaGVhZGVycyB9ICkuc3VjY2VzcyhmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICRzY29wZS5zdGF0dXMgPSAnJztcclxuICAgICAgfSkuZXJyb3IoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJHNjb3BlLnN0YXR1cyA9ICdFUlJPUiEnO1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcbiAgfVxyXG4gIGBgYFxyXG4gKlxyXG4gKiBOb3cgd2Ugc2V0dXAgdGhlIG1vY2sgYmFja2VuZCBhbmQgY3JlYXRlIHRoZSB0ZXN0IHNwZWNzOlxyXG4gKlxyXG4gIGBgYGpzXHJcbiAgICAvLyB0ZXN0aW5nIGNvbnRyb2xsZXJcclxuICAgIGRlc2NyaWJlKCdNeUNvbnRyb2xsZXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgIHZhciAkaHR0cEJhY2tlbmQsICRyb290U2NvcGUsIGNyZWF0ZUNvbnRyb2xsZXIsIGF1dGhSZXF1ZXN0SGFuZGxlcjtcclxuXHJcbiAgICAgICAvLyBTZXQgdXAgdGhlIG1vZHVsZVxyXG4gICAgICAgYmVmb3JlRWFjaChtb2R1bGUoJ015QXBwJykpO1xyXG5cclxuICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKCRpbmplY3Rvcikge1xyXG4gICAgICAgICAvLyBTZXQgdXAgdGhlIG1vY2sgaHR0cCBzZXJ2aWNlIHJlc3BvbnNlc1xyXG4gICAgICAgICAkaHR0cEJhY2tlbmQgPSAkaW5qZWN0b3IuZ2V0KCckaHR0cEJhY2tlbmQnKTtcclxuICAgICAgICAgLy8gYmFja2VuZCBkZWZpbml0aW9uIGNvbW1vbiBmb3IgYWxsIHRlc3RzXHJcbiAgICAgICAgIGF1dGhSZXF1ZXN0SGFuZGxlciA9ICRodHRwQmFja2VuZC53aGVuKCdHRVQnLCAnL2F1dGgucHknKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXNwb25kKHt1c2VySWQ6ICd1c2VyWCd9LCB7J0EtVG9rZW4nOiAneHh4J30pO1xyXG5cclxuICAgICAgICAgLy8gR2V0IGhvbGQgb2YgYSBzY29wZSAoaS5lLiB0aGUgcm9vdCBzY29wZSlcclxuICAgICAgICAgJHJvb3RTY29wZSA9ICRpbmplY3Rvci5nZXQoJyRyb290U2NvcGUnKTtcclxuICAgICAgICAgLy8gVGhlICRjb250cm9sbGVyIHNlcnZpY2UgaXMgdXNlZCB0byBjcmVhdGUgaW5zdGFuY2VzIG9mIGNvbnRyb2xsZXJzXHJcbiAgICAgICAgIHZhciAkY29udHJvbGxlciA9ICRpbmplY3Rvci5nZXQoJyRjb250cm9sbGVyJyk7XHJcblxyXG4gICAgICAgICBjcmVhdGVDb250cm9sbGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgcmV0dXJuICRjb250cm9sbGVyKCdNeUNvbnRyb2xsZXInLCB7JyRzY29wZScgOiAkcm9vdFNjb3BlIH0pO1xyXG4gICAgICAgICB9O1xyXG4gICAgICAgfSkpO1xyXG5cclxuXHJcbiAgICAgICBhZnRlckVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICRodHRwQmFja2VuZC52ZXJpZnlOb091dHN0YW5kaW5nRXhwZWN0YXRpb24oKTtcclxuICAgICAgICAgJGh0dHBCYWNrZW5kLnZlcmlmeU5vT3V0c3RhbmRpbmdSZXF1ZXN0KCk7XHJcbiAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgaXQoJ3Nob3VsZCBmZXRjaCBhdXRoZW50aWNhdGlvbiB0b2tlbicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKCcvYXV0aC5weScpO1xyXG4gICAgICAgICB2YXIgY29udHJvbGxlciA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XHJcbiAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgaXQoJ3Nob3VsZCBmYWlsIGF1dGhlbnRpY2F0aW9uJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAvLyBOb3RpY2UgaG93IHlvdSBjYW4gY2hhbmdlIHRoZSByZXNwb25zZSBldmVuIGFmdGVyIGl0IHdhcyBzZXRcclxuICAgICAgICAgYXV0aFJlcXVlc3RIYW5kbGVyLnJlc3BvbmQoNDAxLCAnJyk7XHJcblxyXG4gICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKCcvYXV0aC5weScpO1xyXG4gICAgICAgICB2YXIgY29udHJvbGxlciA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XHJcbiAgICAgICAgIGV4cGVjdCgkcm9vdFNjb3BlLnN0YXR1cykudG9CZSgnRmFpbGVkLi4uJyk7XHJcbiAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgaXQoJ3Nob3VsZCBzZW5kIG1zZyB0byBzZXJ2ZXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgdmFyIGNvbnRyb2xsZXIgPSBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xyXG5cclxuICAgICAgICAgLy8gbm93IHlvdSBkb27igJl0IGNhcmUgYWJvdXQgdGhlIGF1dGhlbnRpY2F0aW9uLCBidXRcclxuICAgICAgICAgLy8gdGhlIGNvbnRyb2xsZXIgd2lsbCBzdGlsbCBzZW5kIHRoZSByZXF1ZXN0IGFuZFxyXG4gICAgICAgICAvLyAkaHR0cEJhY2tlbmQgd2lsbCByZXNwb25kIHdpdGhvdXQgeW91IGhhdmluZyB0b1xyXG4gICAgICAgICAvLyBzcGVjaWZ5IHRoZSBleHBlY3RhdGlvbiBhbmQgcmVzcG9uc2UgZm9yIHRoaXMgcmVxdWVzdFxyXG5cclxuICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdFBPU1QoJy9hZGQtbXNnLnB5JywgJ21lc3NhZ2UgY29udGVudCcpLnJlc3BvbmQoMjAxLCAnJyk7XHJcbiAgICAgICAgICRyb290U2NvcGUuc2F2ZU1lc3NhZ2UoJ21lc3NhZ2UgY29udGVudCcpO1xyXG4gICAgICAgICBleHBlY3QoJHJvb3RTY29wZS5zdGF0dXMpLnRvQmUoJ1NhdmluZy4uLicpO1xyXG4gICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcclxuICAgICAgICAgZXhwZWN0KCRyb290U2NvcGUuc3RhdHVzKS50b0JlKCcnKTtcclxuICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICBpdCgnc2hvdWxkIHNlbmQgYXV0aCBoZWFkZXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgdmFyIGNvbnRyb2xsZXIgPSBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xyXG5cclxuICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdFBPU1QoJy9hZGQtbXNnLnB5JywgdW5kZWZpbmVkLCBmdW5jdGlvbihoZWFkZXJzKSB7XHJcbiAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGhlYWRlciB3YXMgc2VuZCwgaWYgaXQgd2Fzbid0IHRoZSBleHBlY3RhdGlvbiB3b24ndFxyXG4gICAgICAgICAgIC8vIG1hdGNoIHRoZSByZXF1ZXN0IGFuZCB0aGUgdGVzdCB3aWxsIGZhaWxcclxuICAgICAgICAgICByZXR1cm4gaGVhZGVyc1snQXV0aG9yaXphdGlvbiddID09ICd4eHgnO1xyXG4gICAgICAgICB9KS5yZXNwb25kKDIwMSwgJycpO1xyXG5cclxuICAgICAgICAgJHJvb3RTY29wZS5zYXZlTWVzc2FnZSgnd2hhdGV2ZXInKTtcclxuICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XHJcbiAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gICBgYGBcclxuICovXHJcbmFuZ3VsYXIubW9jay4kSHR0cEJhY2tlbmRQcm92aWRlciA9IGZ1bmN0aW9uKCkge1xyXG4gIHRoaXMuJGdldCA9IFsnJHJvb3RTY29wZScsICckdGltZW91dCcsIGNyZWF0ZUh0dHBCYWNrZW5kTW9ja107XHJcbn07XHJcblxyXG4vKipcclxuICogR2VuZXJhbCBmYWN0b3J5IGZ1bmN0aW9uIGZvciAkaHR0cEJhY2tlbmQgbW9jay5cclxuICogUmV0dXJucyBpbnN0YW5jZSBmb3IgdW5pdCB0ZXN0aW5nICh3aGVuIG5vIGFyZ3VtZW50cyBzcGVjaWZpZWQpOlxyXG4gKiAgIC0gcGFzc2luZyB0aHJvdWdoIGlzIGRpc2FibGVkXHJcbiAqICAgLSBhdXRvIGZsdXNoaW5nIGlzIGRpc2FibGVkXHJcbiAqXHJcbiAqIFJldHVybnMgaW5zdGFuY2UgZm9yIGUyZSB0ZXN0aW5nICh3aGVuIGAkZGVsZWdhdGVgIGFuZCBgJGJyb3dzZXJgIHNwZWNpZmllZCk6XHJcbiAqICAgLSBwYXNzaW5nIHRocm91Z2ggKGRlbGVnYXRpbmcgcmVxdWVzdCB0byByZWFsIGJhY2tlbmQpIGlzIGVuYWJsZWRcclxuICogICAtIGF1dG8gZmx1c2hpbmcgaXMgZW5hYmxlZFxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdD19ICRkZWxlZ2F0ZSBSZWFsICRodHRwQmFja2VuZCBpbnN0YW5jZSAoYWxsb3cgcGFzc2luZyB0aHJvdWdoIGlmIHNwZWNpZmllZClcclxuICogQHBhcmFtIHtPYmplY3Q9fSAkYnJvd3NlciBBdXRvLWZsdXNoaW5nIGVuYWJsZWQgaWYgc3BlY2lmaWVkXHJcbiAqIEByZXR1cm4ge09iamVjdH0gSW5zdGFuY2Ugb2YgJGh0dHBCYWNrZW5kIG1vY2tcclxuICovXHJcbmZ1bmN0aW9uIGNyZWF0ZUh0dHBCYWNrZW5kTW9jaygkcm9vdFNjb3BlLCAkdGltZW91dCwgJGRlbGVnYXRlLCAkYnJvd3Nlcikge1xyXG4gIHZhciBkZWZpbml0aW9ucyA9IFtdLFxyXG4gICAgICBleHBlY3RhdGlvbnMgPSBbXSxcclxuICAgICAgcmVzcG9uc2VzID0gW10sXHJcbiAgICAgIHJlc3BvbnNlc1B1c2ggPSBhbmd1bGFyLmJpbmQocmVzcG9uc2VzLCByZXNwb25zZXMucHVzaCksXHJcbiAgICAgIGNvcHkgPSBhbmd1bGFyLmNvcHk7XHJcblxyXG4gIGZ1bmN0aW9uIGNyZWF0ZVJlc3BvbnNlKHN0YXR1cywgZGF0YSwgaGVhZGVycywgc3RhdHVzVGV4dCkge1xyXG4gICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbihzdGF0dXMpKSByZXR1cm4gc3RhdHVzO1xyXG5cclxuICAgIHJldHVybiBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIGFuZ3VsYXIuaXNOdW1iZXIoc3RhdHVzKVxyXG4gICAgICAgICAgPyBbc3RhdHVzLCBkYXRhLCBoZWFkZXJzLCBzdGF0dXNUZXh0XVxyXG4gICAgICAgICAgOiBbMjAwLCBzdGF0dXMsIGRhdGEsIGhlYWRlcnNdO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8vIFRPRE8odm9qdGEpOiBjaGFuZ2UgcGFyYW1zIHRvOiBtZXRob2QsIHVybCwgZGF0YSwgaGVhZGVycywgY2FsbGJhY2tcclxuICBmdW5jdGlvbiAkaHR0cEJhY2tlbmQobWV0aG9kLCB1cmwsIGRhdGEsIGNhbGxiYWNrLCBoZWFkZXJzLCB0aW1lb3V0LCB3aXRoQ3JlZGVudGlhbHMpIHtcclxuICAgIHZhciB4aHIgPSBuZXcgTW9ja1hocigpLFxyXG4gICAgICAgIGV4cGVjdGF0aW9uID0gZXhwZWN0YXRpb25zWzBdLFxyXG4gICAgICAgIHdhc0V4cGVjdGVkID0gZmFsc2U7XHJcblxyXG4gICAgZnVuY3Rpb24gcHJldHR5UHJpbnQoZGF0YSkge1xyXG4gICAgICByZXR1cm4gKGFuZ3VsYXIuaXNTdHJpbmcoZGF0YSkgfHwgYW5ndWxhci5pc0Z1bmN0aW9uKGRhdGEpIHx8IGRhdGEgaW5zdGFuY2VvZiBSZWdFeHApXHJcbiAgICAgICAgICA/IGRhdGFcclxuICAgICAgICAgIDogYW5ndWxhci50b0pzb24oZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gd3JhcFJlc3BvbnNlKHdyYXBwZWQpIHtcclxuICAgICAgaWYgKCEkYnJvd3NlciAmJiB0aW1lb3V0KSB7XHJcbiAgICAgICAgdGltZW91dC50aGVuID8gdGltZW91dC50aGVuKGhhbmRsZVRpbWVvdXQpIDogJHRpbWVvdXQoaGFuZGxlVGltZW91dCwgdGltZW91dCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBoYW5kbGVSZXNwb25zZTtcclxuXHJcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZVJlc3BvbnNlKCkge1xyXG4gICAgICAgIHZhciByZXNwb25zZSA9IHdyYXBwZWQucmVzcG9uc2UobWV0aG9kLCB1cmwsIGRhdGEsIGhlYWRlcnMpO1xyXG4gICAgICAgIHhoci4kJHJlc3BIZWFkZXJzID0gcmVzcG9uc2VbMl07XHJcbiAgICAgICAgY2FsbGJhY2soY29weShyZXNwb25zZVswXSksIGNvcHkocmVzcG9uc2VbMV0pLCB4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCksXHJcbiAgICAgICAgICAgICAgICAgY29weShyZXNwb25zZVszXSB8fCAnJykpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBpaSA9IHJlc3BvbnNlcy5sZW5ndGg7IGkgPCBpaTsgaSsrKSB7XHJcbiAgICAgICAgICBpZiAocmVzcG9uc2VzW2ldID09PSBoYW5kbGVSZXNwb25zZSkge1xyXG4gICAgICAgICAgICByZXNwb25zZXMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICBjYWxsYmFjaygtMSwgdW5kZWZpbmVkLCAnJyk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChleHBlY3RhdGlvbiAmJiBleHBlY3RhdGlvbi5tYXRjaChtZXRob2QsIHVybCkpIHtcclxuICAgICAgaWYgKCFleHBlY3RhdGlvbi5tYXRjaERhdGEoZGF0YSkpXHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCAnICsgZXhwZWN0YXRpb24gKyAnIHdpdGggZGlmZmVyZW50IGRhdGFcXG4nICtcclxuICAgICAgICAgICAgJ0VYUEVDVEVEOiAnICsgcHJldHR5UHJpbnQoZXhwZWN0YXRpb24uZGF0YSkgKyAnXFxuR09UOiAgICAgICcgKyBkYXRhKTtcclxuXHJcbiAgICAgIGlmICghZXhwZWN0YXRpb24ubWF0Y2hIZWFkZXJzKGhlYWRlcnMpKVxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgJyArIGV4cGVjdGF0aW9uICsgJyB3aXRoIGRpZmZlcmVudCBoZWFkZXJzXFxuJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdFWFBFQ1RFRDogJyArIHByZXR0eVByaW50KGV4cGVjdGF0aW9uLmhlYWRlcnMpICsgJ1xcbkdPVDogICAgICAnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldHR5UHJpbnQoaGVhZGVycykpO1xyXG5cclxuICAgICAgZXhwZWN0YXRpb25zLnNoaWZ0KCk7XHJcblxyXG4gICAgICBpZiAoZXhwZWN0YXRpb24ucmVzcG9uc2UpIHtcclxuICAgICAgICByZXNwb25zZXMucHVzaCh3cmFwUmVzcG9uc2UoZXhwZWN0YXRpb24pKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgd2FzRXhwZWN0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBpID0gLTEsIGRlZmluaXRpb247XHJcbiAgICB3aGlsZSAoKGRlZmluaXRpb24gPSBkZWZpbml0aW9uc1srK2ldKSkge1xyXG4gICAgICBpZiAoZGVmaW5pdGlvbi5tYXRjaChtZXRob2QsIHVybCwgZGF0YSwgaGVhZGVycyB8fCB7fSkpIHtcclxuICAgICAgICBpZiAoZGVmaW5pdGlvbi5yZXNwb25zZSkge1xyXG4gICAgICAgICAgLy8gaWYgJGJyb3dzZXIgc3BlY2lmaWVkLCB3ZSBkbyBhdXRvIGZsdXNoIGFsbCByZXF1ZXN0c1xyXG4gICAgICAgICAgKCRicm93c2VyID8gJGJyb3dzZXIuZGVmZXIgOiByZXNwb25zZXNQdXNoKSh3cmFwUmVzcG9uc2UoZGVmaW5pdGlvbikpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGVmaW5pdGlvbi5wYXNzVGhyb3VnaCkge1xyXG4gICAgICAgICAgJGRlbGVnYXRlKG1ldGhvZCwgdXJsLCBkYXRhLCBjYWxsYmFjaywgaGVhZGVycywgdGltZW91dCwgd2l0aENyZWRlbnRpYWxzKTtcclxuICAgICAgICB9IGVsc2UgdGhyb3cgbmV3IEVycm9yKCdObyByZXNwb25zZSBkZWZpbmVkICEnKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRocm93IHdhc0V4cGVjdGVkID9cclxuICAgICAgICBuZXcgRXJyb3IoJ05vIHJlc3BvbnNlIGRlZmluZWQgIScpIDpcclxuICAgICAgICBuZXcgRXJyb3IoJ1VuZXhwZWN0ZWQgcmVxdWVzdDogJyArIG1ldGhvZCArICcgJyArIHVybCArICdcXG4nICtcclxuICAgICAgICAgICAgICAgICAgKGV4cGVjdGF0aW9uID8gJ0V4cGVjdGVkICcgKyBleHBlY3RhdGlvbiA6ICdObyBtb3JlIHJlcXVlc3QgZXhwZWN0ZWQnKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICogQG5hbWUgJGh0dHBCYWNrZW5kI3doZW5cclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKiBDcmVhdGVzIGEgbmV3IGJhY2tlbmQgZGVmaW5pdGlvbi5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2QgSFRUUCBtZXRob2QuXHJcbiAgICogQHBhcmFtIHtzdHJpbmd8UmVnRXhwfGZ1bmN0aW9uKHN0cmluZyl9IHVybCBIVFRQIHVybCBvciBmdW5jdGlvbiB0aGF0IHJlY2VpdmVzIHRoZSB1cmxcclxuICAgKiAgIGFuZCByZXR1cm5zIHRydWUgaWYgdGhlIHVybCBtYXRjaCB0aGUgY3VycmVudCBkZWZpbml0aW9uLlxyXG4gICAqIEBwYXJhbSB7KHN0cmluZ3xSZWdFeHB8ZnVuY3Rpb24oc3RyaW5nKSk9fSBkYXRhIEhUVFAgcmVxdWVzdCBib2R5IG9yIGZ1bmN0aW9uIHRoYXQgcmVjZWl2ZXNcclxuICAgKiAgIGRhdGEgc3RyaW5nIGFuZCByZXR1cm5zIHRydWUgaWYgdGhlIGRhdGEgaXMgYXMgZXhwZWN0ZWQuXHJcbiAgICogQHBhcmFtIHsoT2JqZWN0fGZ1bmN0aW9uKE9iamVjdCkpPX0gaGVhZGVycyBIVFRQIGhlYWRlcnMgb3IgZnVuY3Rpb24gdGhhdCByZWNlaXZlcyBodHRwIGhlYWRlclxyXG4gICAqICAgb2JqZWN0IGFuZCByZXR1cm5zIHRydWUgaWYgdGhlIGhlYWRlcnMgbWF0Y2ggdGhlIGN1cnJlbnQgZGVmaW5pdGlvbi5cclxuICAgKiBAcmV0dXJucyB7cmVxdWVzdEhhbmRsZXJ9IFJldHVybnMgYW4gb2JqZWN0IHdpdGggYHJlc3BvbmRgIG1ldGhvZCB0aGF0IGNvbnRyb2xzIGhvdyBhIG1hdGNoZWRcclxuICAgKiAgIHJlcXVlc3QgaXMgaGFuZGxlZC4gWW91IGNhbiBzYXZlIHRoaXMgb2JqZWN0IGZvciBsYXRlciB1c2UgYW5kIGludm9rZSBgcmVzcG9uZGAgYWdhaW4gaW5cclxuICAgKiAgIG9yZGVyIHRvIGNoYW5nZSBob3cgYSBtYXRjaGVkIHJlcXVlc3QgaXMgaGFuZGxlZC5cclxuICAgKlxyXG4gICAqICAtIHJlc3BvbmQg4oCTXHJcbiAgICogICAgICBge2Z1bmN0aW9uKFtzdGF0dXMsXSBkYXRhWywgaGVhZGVycywgc3RhdHVzVGV4dF0pXHJcbiAgICogICAgICB8IGZ1bmN0aW9uKGZ1bmN0aW9uKG1ldGhvZCwgdXJsLCBkYXRhLCBoZWFkZXJzKX1gXHJcbiAgICogICAg4oCTIFRoZSByZXNwb25kIG1ldGhvZCB0YWtlcyBhIHNldCBvZiBzdGF0aWMgZGF0YSB0byBiZSByZXR1cm5lZCBvciBhIGZ1bmN0aW9uIHRoYXQgY2FuXHJcbiAgICogICAgcmV0dXJuIGFuIGFycmF5IGNvbnRhaW5pbmcgcmVzcG9uc2Ugc3RhdHVzIChudW1iZXIpLCByZXNwb25zZSBkYXRhIChzdHJpbmcpLCByZXNwb25zZVxyXG4gICAqICAgIGhlYWRlcnMgKE9iamVjdCksIGFuZCB0aGUgdGV4dCBmb3IgdGhlIHN0YXR1cyAoc3RyaW5nKS4gVGhlIHJlc3BvbmQgbWV0aG9kIHJldHVybnMgdGhlXHJcbiAgICogICAgYHJlcXVlc3RIYW5kbGVyYCBvYmplY3QgZm9yIHBvc3NpYmxlIG92ZXJyaWRlcy5cclxuICAgKi9cclxuICAkaHR0cEJhY2tlbmQud2hlbiA9IGZ1bmN0aW9uKG1ldGhvZCwgdXJsLCBkYXRhLCBoZWFkZXJzKSB7XHJcbiAgICB2YXIgZGVmaW5pdGlvbiA9IG5ldyBNb2NrSHR0cEV4cGVjdGF0aW9uKG1ldGhvZCwgdXJsLCBkYXRhLCBoZWFkZXJzKSxcclxuICAgICAgICBjaGFpbiA9IHtcclxuICAgICAgICAgIHJlc3BvbmQ6IGZ1bmN0aW9uKHN0YXR1cywgZGF0YSwgaGVhZGVycywgc3RhdHVzVGV4dCkge1xyXG4gICAgICAgICAgICBkZWZpbml0aW9uLnBhc3NUaHJvdWdoID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBkZWZpbml0aW9uLnJlc3BvbnNlID0gY3JlYXRlUmVzcG9uc2Uoc3RhdHVzLCBkYXRhLCBoZWFkZXJzLCBzdGF0dXNUZXh0KTtcclxuICAgICAgICAgICAgcmV0dXJuIGNoYWluO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgaWYgKCRicm93c2VyKSB7XHJcbiAgICAgIGNoYWluLnBhc3NUaHJvdWdoID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZGVmaW5pdGlvbi5yZXNwb25zZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICBkZWZpbml0aW9uLnBhc3NUaHJvdWdoID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gY2hhaW47XHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZGVmaW5pdGlvbnMucHVzaChkZWZpbml0aW9uKTtcclxuICAgIHJldHVybiBjaGFpbjtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICogQG5hbWUgJGh0dHBCYWNrZW5kI3doZW5HRVRcclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKiBDcmVhdGVzIGEgbmV3IGJhY2tlbmQgZGVmaW5pdGlvbiBmb3IgR0VUIHJlcXVlc3RzLiBGb3IgbW9yZSBpbmZvIHNlZSBgd2hlbigpYC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfFJlZ0V4cHxmdW5jdGlvbihzdHJpbmcpfSB1cmwgSFRUUCB1cmwgb3IgZnVuY3Rpb24gdGhhdCByZWNlaXZlcyB0aGUgdXJsXHJcbiAgICogICBhbmQgcmV0dXJucyB0cnVlIGlmIHRoZSB1cmwgbWF0Y2ggdGhlIGN1cnJlbnQgZGVmaW5pdGlvbi5cclxuICAgKiBAcGFyYW0geyhPYmplY3R8ZnVuY3Rpb24oT2JqZWN0KSk9fSBoZWFkZXJzIEhUVFAgaGVhZGVycy5cclxuICAgKiBAcmV0dXJucyB7cmVxdWVzdEhhbmRsZXJ9IFJldHVybnMgYW4gb2JqZWN0IHdpdGggYHJlc3BvbmRgIG1ldGhvZCB0aGF0IGNvbnRyb2xzIGhvdyBhIG1hdGNoZWRcclxuICAgKiByZXF1ZXN0IGlzIGhhbmRsZWQuIFlvdSBjYW4gc2F2ZSB0aGlzIG9iamVjdCBmb3IgbGF0ZXIgdXNlIGFuZCBpbnZva2UgYHJlc3BvbmRgIGFnYWluIGluXHJcbiAgICogb3JkZXIgdG8gY2hhbmdlIGhvdyBhIG1hdGNoZWQgcmVxdWVzdCBpcyBoYW5kbGVkLlxyXG4gICAqL1xyXG5cclxuICAvKipcclxuICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICogQG5hbWUgJGh0dHBCYWNrZW5kI3doZW5IRUFEXHJcbiAgICogQGRlc2NyaXB0aW9uXHJcbiAgICogQ3JlYXRlcyBhIG5ldyBiYWNrZW5kIGRlZmluaXRpb24gZm9yIEhFQUQgcmVxdWVzdHMuIEZvciBtb3JlIGluZm8gc2VlIGB3aGVuKClgLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd8UmVnRXhwfGZ1bmN0aW9uKHN0cmluZyl9IHVybCBIVFRQIHVybCBvciBmdW5jdGlvbiB0aGF0IHJlY2VpdmVzIHRoZSB1cmxcclxuICAgKiAgIGFuZCByZXR1cm5zIHRydWUgaWYgdGhlIHVybCBtYXRjaCB0aGUgY3VycmVudCBkZWZpbml0aW9uLlxyXG4gICAqIEBwYXJhbSB7KE9iamVjdHxmdW5jdGlvbihPYmplY3QpKT19IGhlYWRlcnMgSFRUUCBoZWFkZXJzLlxyXG4gICAqIEByZXR1cm5zIHtyZXF1ZXN0SGFuZGxlcn0gUmV0dXJucyBhbiBvYmplY3Qgd2l0aCBgcmVzcG9uZGAgbWV0aG9kIHRoYXQgY29udHJvbHMgaG93IGEgbWF0Y2hlZFxyXG4gICAqIHJlcXVlc3QgaXMgaGFuZGxlZC4gWW91IGNhbiBzYXZlIHRoaXMgb2JqZWN0IGZvciBsYXRlciB1c2UgYW5kIGludm9rZSBgcmVzcG9uZGAgYWdhaW4gaW5cclxuICAgKiBvcmRlciB0byBjaGFuZ2UgaG93IGEgbWF0Y2hlZCByZXF1ZXN0IGlzIGhhbmRsZWQuXHJcbiAgICovXHJcblxyXG4gIC8qKlxyXG4gICAqIEBuZ2RvYyBtZXRob2RcclxuICAgKiBAbmFtZSAkaHR0cEJhY2tlbmQjd2hlbkRFTEVURVxyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqIENyZWF0ZXMgYSBuZXcgYmFja2VuZCBkZWZpbml0aW9uIGZvciBERUxFVEUgcmVxdWVzdHMuIEZvciBtb3JlIGluZm8gc2VlIGB3aGVuKClgLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd8UmVnRXhwfGZ1bmN0aW9uKHN0cmluZyl9IHVybCBIVFRQIHVybCBvciBmdW5jdGlvbiB0aGF0IHJlY2VpdmVzIHRoZSB1cmxcclxuICAgKiAgIGFuZCByZXR1cm5zIHRydWUgaWYgdGhlIHVybCBtYXRjaCB0aGUgY3VycmVudCBkZWZpbml0aW9uLlxyXG4gICAqIEBwYXJhbSB7KE9iamVjdHxmdW5jdGlvbihPYmplY3QpKT19IGhlYWRlcnMgSFRUUCBoZWFkZXJzLlxyXG4gICAqIEByZXR1cm5zIHtyZXF1ZXN0SGFuZGxlcn0gUmV0dXJucyBhbiBvYmplY3Qgd2l0aCBgcmVzcG9uZGAgbWV0aG9kIHRoYXQgY29udHJvbHMgaG93IGEgbWF0Y2hlZFxyXG4gICAqIHJlcXVlc3QgaXMgaGFuZGxlZC4gWW91IGNhbiBzYXZlIHRoaXMgb2JqZWN0IGZvciBsYXRlciB1c2UgYW5kIGludm9rZSBgcmVzcG9uZGAgYWdhaW4gaW5cclxuICAgKiBvcmRlciB0byBjaGFuZ2UgaG93IGEgbWF0Y2hlZCByZXF1ZXN0IGlzIGhhbmRsZWQuXHJcbiAgICovXHJcblxyXG4gIC8qKlxyXG4gICAqIEBuZ2RvYyBtZXRob2RcclxuICAgKiBAbmFtZSAkaHR0cEJhY2tlbmQjd2hlblBPU1RcclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKiBDcmVhdGVzIGEgbmV3IGJhY2tlbmQgZGVmaW5pdGlvbiBmb3IgUE9TVCByZXF1ZXN0cy4gRm9yIG1vcmUgaW5mbyBzZWUgYHdoZW4oKWAuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ3xSZWdFeHB8ZnVuY3Rpb24oc3RyaW5nKX0gdXJsIEhUVFAgdXJsIG9yIGZ1bmN0aW9uIHRoYXQgcmVjZWl2ZXMgdGhlIHVybFxyXG4gICAqICAgYW5kIHJldHVybnMgdHJ1ZSBpZiB0aGUgdXJsIG1hdGNoIHRoZSBjdXJyZW50IGRlZmluaXRpb24uXHJcbiAgICogQHBhcmFtIHsoc3RyaW5nfFJlZ0V4cHxmdW5jdGlvbihzdHJpbmcpKT19IGRhdGEgSFRUUCByZXF1ZXN0IGJvZHkgb3IgZnVuY3Rpb24gdGhhdCByZWNlaXZlc1xyXG4gICAqICAgZGF0YSBzdHJpbmcgYW5kIHJldHVybnMgdHJ1ZSBpZiB0aGUgZGF0YSBpcyBhcyBleHBlY3RlZC5cclxuICAgKiBAcGFyYW0geyhPYmplY3R8ZnVuY3Rpb24oT2JqZWN0KSk9fSBoZWFkZXJzIEhUVFAgaGVhZGVycy5cclxuICAgKiBAcmV0dXJucyB7cmVxdWVzdEhhbmRsZXJ9IFJldHVybnMgYW4gb2JqZWN0IHdpdGggYHJlc3BvbmRgIG1ldGhvZCB0aGF0IGNvbnRyb2xzIGhvdyBhIG1hdGNoZWRcclxuICAgKiByZXF1ZXN0IGlzIGhhbmRsZWQuIFlvdSBjYW4gc2F2ZSB0aGlzIG9iamVjdCBmb3IgbGF0ZXIgdXNlIGFuZCBpbnZva2UgYHJlc3BvbmRgIGFnYWluIGluXHJcbiAgICogb3JkZXIgdG8gY2hhbmdlIGhvdyBhIG1hdGNoZWQgcmVxdWVzdCBpcyBoYW5kbGVkLlxyXG4gICAqL1xyXG5cclxuICAvKipcclxuICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICogQG5hbWUgJGh0dHBCYWNrZW5kI3doZW5QVVRcclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKiBDcmVhdGVzIGEgbmV3IGJhY2tlbmQgZGVmaW5pdGlvbiBmb3IgUFVUIHJlcXVlc3RzLiAgRm9yIG1vcmUgaW5mbyBzZWUgYHdoZW4oKWAuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ3xSZWdFeHB8ZnVuY3Rpb24oc3RyaW5nKX0gdXJsIEhUVFAgdXJsIG9yIGZ1bmN0aW9uIHRoYXQgcmVjZWl2ZXMgdGhlIHVybFxyXG4gICAqICAgYW5kIHJldHVybnMgdHJ1ZSBpZiB0aGUgdXJsIG1hdGNoIHRoZSBjdXJyZW50IGRlZmluaXRpb24uXHJcbiAgICogQHBhcmFtIHsoc3RyaW5nfFJlZ0V4cHxmdW5jdGlvbihzdHJpbmcpKT19IGRhdGEgSFRUUCByZXF1ZXN0IGJvZHkgb3IgZnVuY3Rpb24gdGhhdCByZWNlaXZlc1xyXG4gICAqICAgZGF0YSBzdHJpbmcgYW5kIHJldHVybnMgdHJ1ZSBpZiB0aGUgZGF0YSBpcyBhcyBleHBlY3RlZC5cclxuICAgKiBAcGFyYW0geyhPYmplY3R8ZnVuY3Rpb24oT2JqZWN0KSk9fSBoZWFkZXJzIEhUVFAgaGVhZGVycy5cclxuICAgKiBAcmV0dXJucyB7cmVxdWVzdEhhbmRsZXJ9IFJldHVybnMgYW4gb2JqZWN0IHdpdGggYHJlc3BvbmRgIG1ldGhvZCB0aGF0IGNvbnRyb2xzIGhvdyBhIG1hdGNoZWRcclxuICAgKiByZXF1ZXN0IGlzIGhhbmRsZWQuIFlvdSBjYW4gc2F2ZSB0aGlzIG9iamVjdCBmb3IgbGF0ZXIgdXNlIGFuZCBpbnZva2UgYHJlc3BvbmRgIGFnYWluIGluXHJcbiAgICogb3JkZXIgdG8gY2hhbmdlIGhvdyBhIG1hdGNoZWQgcmVxdWVzdCBpcyBoYW5kbGVkLlxyXG4gICAqL1xyXG5cclxuICAvKipcclxuICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICogQG5hbWUgJGh0dHBCYWNrZW5kI3doZW5KU09OUFxyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqIENyZWF0ZXMgYSBuZXcgYmFja2VuZCBkZWZpbml0aW9uIGZvciBKU09OUCByZXF1ZXN0cy4gRm9yIG1vcmUgaW5mbyBzZWUgYHdoZW4oKWAuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ3xSZWdFeHB8ZnVuY3Rpb24oc3RyaW5nKX0gdXJsIEhUVFAgdXJsIG9yIGZ1bmN0aW9uIHRoYXQgcmVjZWl2ZXMgdGhlIHVybFxyXG4gICAqICAgYW5kIHJldHVybnMgdHJ1ZSBpZiB0aGUgdXJsIG1hdGNoIHRoZSBjdXJyZW50IGRlZmluaXRpb24uXHJcbiAgICogQHJldHVybnMge3JlcXVlc3RIYW5kbGVyfSBSZXR1cm5zIGFuIG9iamVjdCB3aXRoIGByZXNwb25kYCBtZXRob2QgdGhhdCBjb250cm9scyBob3cgYSBtYXRjaGVkXHJcbiAgICogcmVxdWVzdCBpcyBoYW5kbGVkLiBZb3UgY2FuIHNhdmUgdGhpcyBvYmplY3QgZm9yIGxhdGVyIHVzZSBhbmQgaW52b2tlIGByZXNwb25kYCBhZ2FpbiBpblxyXG4gICAqIG9yZGVyIHRvIGNoYW5nZSBob3cgYSBtYXRjaGVkIHJlcXVlc3QgaXMgaGFuZGxlZC5cclxuICAgKi9cclxuICBjcmVhdGVTaG9ydE1ldGhvZHMoJ3doZW4nKTtcclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIEBuZ2RvYyBtZXRob2RcclxuICAgKiBAbmFtZSAkaHR0cEJhY2tlbmQjZXhwZWN0XHJcbiAgICogQGRlc2NyaXB0aW9uXHJcbiAgICogQ3JlYXRlcyBhIG5ldyByZXF1ZXN0IGV4cGVjdGF0aW9uLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1ldGhvZCBIVFRQIG1ldGhvZC5cclxuICAgKiBAcGFyYW0ge3N0cmluZ3xSZWdFeHB8ZnVuY3Rpb24oc3RyaW5nKX0gdXJsIEhUVFAgdXJsIG9yIGZ1bmN0aW9uIHRoYXQgcmVjZWl2ZXMgdGhlIHVybFxyXG4gICAqICAgYW5kIHJldHVybnMgdHJ1ZSBpZiB0aGUgdXJsIG1hdGNoIHRoZSBjdXJyZW50IGRlZmluaXRpb24uXHJcbiAgICogQHBhcmFtIHsoc3RyaW5nfFJlZ0V4cHxmdW5jdGlvbihzdHJpbmcpfE9iamVjdCk9fSBkYXRhIEhUVFAgcmVxdWVzdCBib2R5IG9yIGZ1bmN0aW9uIHRoYXRcclxuICAgKiAgcmVjZWl2ZXMgZGF0YSBzdHJpbmcgYW5kIHJldHVybnMgdHJ1ZSBpZiB0aGUgZGF0YSBpcyBhcyBleHBlY3RlZCwgb3IgT2JqZWN0IGlmIHJlcXVlc3QgYm9keVxyXG4gICAqICBpcyBpbiBKU09OIGZvcm1hdC5cclxuICAgKiBAcGFyYW0geyhPYmplY3R8ZnVuY3Rpb24oT2JqZWN0KSk9fSBoZWFkZXJzIEhUVFAgaGVhZGVycyBvciBmdW5jdGlvbiB0aGF0IHJlY2VpdmVzIGh0dHAgaGVhZGVyXHJcbiAgICogICBvYmplY3QgYW5kIHJldHVybnMgdHJ1ZSBpZiB0aGUgaGVhZGVycyBtYXRjaCB0aGUgY3VycmVudCBleHBlY3RhdGlvbi5cclxuICAgKiBAcmV0dXJucyB7cmVxdWVzdEhhbmRsZXJ9IFJldHVybnMgYW4gb2JqZWN0IHdpdGggYHJlc3BvbmRgIG1ldGhvZCB0aGF0IGNvbnRyb2xzIGhvdyBhIG1hdGNoZWRcclxuICAgKiAgcmVxdWVzdCBpcyBoYW5kbGVkLiBZb3UgY2FuIHNhdmUgdGhpcyBvYmplY3QgZm9yIGxhdGVyIHVzZSBhbmQgaW52b2tlIGByZXNwb25kYCBhZ2FpbiBpblxyXG4gICAqICBvcmRlciB0byBjaGFuZ2UgaG93IGEgbWF0Y2hlZCByZXF1ZXN0IGlzIGhhbmRsZWQuXHJcbiAgICpcclxuICAgKiAgLSByZXNwb25kIOKAk1xyXG4gICAqICAgIGB7ZnVuY3Rpb24oW3N0YXR1cyxdIGRhdGFbLCBoZWFkZXJzLCBzdGF0dXNUZXh0XSlcclxuICAgKiAgICB8IGZ1bmN0aW9uKGZ1bmN0aW9uKG1ldGhvZCwgdXJsLCBkYXRhLCBoZWFkZXJzKX1gXHJcbiAgICogICAg4oCTIFRoZSByZXNwb25kIG1ldGhvZCB0YWtlcyBhIHNldCBvZiBzdGF0aWMgZGF0YSB0byBiZSByZXR1cm5lZCBvciBhIGZ1bmN0aW9uIHRoYXQgY2FuXHJcbiAgICogICAgcmV0dXJuIGFuIGFycmF5IGNvbnRhaW5pbmcgcmVzcG9uc2Ugc3RhdHVzIChudW1iZXIpLCByZXNwb25zZSBkYXRhIChzdHJpbmcpLCByZXNwb25zZVxyXG4gICAqICAgIGhlYWRlcnMgKE9iamVjdCksIGFuZCB0aGUgdGV4dCBmb3IgdGhlIHN0YXR1cyAoc3RyaW5nKS4gVGhlIHJlc3BvbmQgbWV0aG9kIHJldHVybnMgdGhlXHJcbiAgICogICAgYHJlcXVlc3RIYW5kbGVyYCBvYmplY3QgZm9yIHBvc3NpYmxlIG92ZXJyaWRlcy5cclxuICAgKi9cclxuICAkaHR0cEJhY2tlbmQuZXhwZWN0ID0gZnVuY3Rpb24obWV0aG9kLCB1cmwsIGRhdGEsIGhlYWRlcnMpIHtcclxuICAgIHZhciBleHBlY3RhdGlvbiA9IG5ldyBNb2NrSHR0cEV4cGVjdGF0aW9uKG1ldGhvZCwgdXJsLCBkYXRhLCBoZWFkZXJzKSxcclxuICAgICAgICBjaGFpbiA9IHtcclxuICAgICAgICAgIHJlc3BvbmQ6IGZ1bmN0aW9uKHN0YXR1cywgZGF0YSwgaGVhZGVycywgc3RhdHVzVGV4dCkge1xyXG4gICAgICAgICAgICBleHBlY3RhdGlvbi5yZXNwb25zZSA9IGNyZWF0ZVJlc3BvbnNlKHN0YXR1cywgZGF0YSwgaGVhZGVycywgc3RhdHVzVGV4dCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgIGV4cGVjdGF0aW9ucy5wdXNoKGV4cGVjdGF0aW9uKTtcclxuICAgIHJldHVybiBjaGFpbjtcclxuICB9O1xyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAqIEBuYW1lICRodHRwQmFja2VuZCNleHBlY3RHRVRcclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKiBDcmVhdGVzIGEgbmV3IHJlcXVlc3QgZXhwZWN0YXRpb24gZm9yIEdFVCByZXF1ZXN0cy4gRm9yIG1vcmUgaW5mbyBzZWUgYGV4cGVjdCgpYC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfFJlZ0V4cHxmdW5jdGlvbihzdHJpbmcpfSB1cmwgSFRUUCB1cmwgb3IgZnVuY3Rpb24gdGhhdCByZWNlaXZlcyB0aGUgdXJsXHJcbiAgICogICBhbmQgcmV0dXJucyB0cnVlIGlmIHRoZSB1cmwgbWF0Y2ggdGhlIGN1cnJlbnQgZGVmaW5pdGlvbi5cclxuICAgKiBAcGFyYW0ge09iamVjdD19IGhlYWRlcnMgSFRUUCBoZWFkZXJzLlxyXG4gICAqIEByZXR1cm5zIHtyZXF1ZXN0SGFuZGxlcn0gUmV0dXJucyBhbiBvYmplY3Qgd2l0aCBgcmVzcG9uZGAgbWV0aG9kIHRoYXQgY29udHJvbHMgaG93IGEgbWF0Y2hlZFxyXG4gICAqIHJlcXVlc3QgaXMgaGFuZGxlZC4gWW91IGNhbiBzYXZlIHRoaXMgb2JqZWN0IGZvciBsYXRlciB1c2UgYW5kIGludm9rZSBgcmVzcG9uZGAgYWdhaW4gaW5cclxuICAgKiBvcmRlciB0byBjaGFuZ2UgaG93IGEgbWF0Y2hlZCByZXF1ZXN0IGlzIGhhbmRsZWQuIFNlZSAjZXhwZWN0IGZvciBtb3JlIGluZm8uXHJcbiAgICovXHJcblxyXG4gIC8qKlxyXG4gICAqIEBuZ2RvYyBtZXRob2RcclxuICAgKiBAbmFtZSAkaHR0cEJhY2tlbmQjZXhwZWN0SEVBRFxyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqIENyZWF0ZXMgYSBuZXcgcmVxdWVzdCBleHBlY3RhdGlvbiBmb3IgSEVBRCByZXF1ZXN0cy4gRm9yIG1vcmUgaW5mbyBzZWUgYGV4cGVjdCgpYC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfFJlZ0V4cHxmdW5jdGlvbihzdHJpbmcpfSB1cmwgSFRUUCB1cmwgb3IgZnVuY3Rpb24gdGhhdCByZWNlaXZlcyB0aGUgdXJsXHJcbiAgICogICBhbmQgcmV0dXJucyB0cnVlIGlmIHRoZSB1cmwgbWF0Y2ggdGhlIGN1cnJlbnQgZGVmaW5pdGlvbi5cclxuICAgKiBAcGFyYW0ge09iamVjdD19IGhlYWRlcnMgSFRUUCBoZWFkZXJzLlxyXG4gICAqIEByZXR1cm5zIHtyZXF1ZXN0SGFuZGxlcn0gUmV0dXJucyBhbiBvYmplY3Qgd2l0aCBgcmVzcG9uZGAgbWV0aG9kIHRoYXQgY29udHJvbHMgaG93IGEgbWF0Y2hlZFxyXG4gICAqICAgcmVxdWVzdCBpcyBoYW5kbGVkLiBZb3UgY2FuIHNhdmUgdGhpcyBvYmplY3QgZm9yIGxhdGVyIHVzZSBhbmQgaW52b2tlIGByZXNwb25kYCBhZ2FpbiBpblxyXG4gICAqICAgb3JkZXIgdG8gY2hhbmdlIGhvdyBhIG1hdGNoZWQgcmVxdWVzdCBpcyBoYW5kbGVkLlxyXG4gICAqL1xyXG5cclxuICAvKipcclxuICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICogQG5hbWUgJGh0dHBCYWNrZW5kI2V4cGVjdERFTEVURVxyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqIENyZWF0ZXMgYSBuZXcgcmVxdWVzdCBleHBlY3RhdGlvbiBmb3IgREVMRVRFIHJlcXVlc3RzLiBGb3IgbW9yZSBpbmZvIHNlZSBgZXhwZWN0KClgLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd8UmVnRXhwfGZ1bmN0aW9uKHN0cmluZyl9IHVybCBIVFRQIHVybCBvciBmdW5jdGlvbiB0aGF0IHJlY2VpdmVzIHRoZSB1cmxcclxuICAgKiAgIGFuZCByZXR1cm5zIHRydWUgaWYgdGhlIHVybCBtYXRjaCB0aGUgY3VycmVudCBkZWZpbml0aW9uLlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0PX0gaGVhZGVycyBIVFRQIGhlYWRlcnMuXHJcbiAgICogQHJldHVybnMge3JlcXVlc3RIYW5kbGVyfSBSZXR1cm5zIGFuIG9iamVjdCB3aXRoIGByZXNwb25kYCBtZXRob2QgdGhhdCBjb250cm9scyBob3cgYSBtYXRjaGVkXHJcbiAgICogICByZXF1ZXN0IGlzIGhhbmRsZWQuIFlvdSBjYW4gc2F2ZSB0aGlzIG9iamVjdCBmb3IgbGF0ZXIgdXNlIGFuZCBpbnZva2UgYHJlc3BvbmRgIGFnYWluIGluXHJcbiAgICogICBvcmRlciB0byBjaGFuZ2UgaG93IGEgbWF0Y2hlZCByZXF1ZXN0IGlzIGhhbmRsZWQuXHJcbiAgICovXHJcblxyXG4gIC8qKlxyXG4gICAqIEBuZ2RvYyBtZXRob2RcclxuICAgKiBAbmFtZSAkaHR0cEJhY2tlbmQjZXhwZWN0UE9TVFxyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqIENyZWF0ZXMgYSBuZXcgcmVxdWVzdCBleHBlY3RhdGlvbiBmb3IgUE9TVCByZXF1ZXN0cy4gRm9yIG1vcmUgaW5mbyBzZWUgYGV4cGVjdCgpYC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfFJlZ0V4cHxmdW5jdGlvbihzdHJpbmcpfSB1cmwgSFRUUCB1cmwgb3IgZnVuY3Rpb24gdGhhdCByZWNlaXZlcyB0aGUgdXJsXHJcbiAgICogICBhbmQgcmV0dXJucyB0cnVlIGlmIHRoZSB1cmwgbWF0Y2ggdGhlIGN1cnJlbnQgZGVmaW5pdGlvbi5cclxuICAgKiBAcGFyYW0geyhzdHJpbmd8UmVnRXhwfGZ1bmN0aW9uKHN0cmluZyl8T2JqZWN0KT19IGRhdGEgSFRUUCByZXF1ZXN0IGJvZHkgb3IgZnVuY3Rpb24gdGhhdFxyXG4gICAqICByZWNlaXZlcyBkYXRhIHN0cmluZyBhbmQgcmV0dXJucyB0cnVlIGlmIHRoZSBkYXRhIGlzIGFzIGV4cGVjdGVkLCBvciBPYmplY3QgaWYgcmVxdWVzdCBib2R5XHJcbiAgICogIGlzIGluIEpTT04gZm9ybWF0LlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0PX0gaGVhZGVycyBIVFRQIGhlYWRlcnMuXHJcbiAgICogQHJldHVybnMge3JlcXVlc3RIYW5kbGVyfSBSZXR1cm5zIGFuIG9iamVjdCB3aXRoIGByZXNwb25kYCBtZXRob2QgdGhhdCBjb250cm9scyBob3cgYSBtYXRjaGVkXHJcbiAgICogICByZXF1ZXN0IGlzIGhhbmRsZWQuIFlvdSBjYW4gc2F2ZSB0aGlzIG9iamVjdCBmb3IgbGF0ZXIgdXNlIGFuZCBpbnZva2UgYHJlc3BvbmRgIGFnYWluIGluXHJcbiAgICogICBvcmRlciB0byBjaGFuZ2UgaG93IGEgbWF0Y2hlZCByZXF1ZXN0IGlzIGhhbmRsZWQuXHJcbiAgICovXHJcblxyXG4gIC8qKlxyXG4gICAqIEBuZ2RvYyBtZXRob2RcclxuICAgKiBAbmFtZSAkaHR0cEJhY2tlbmQjZXhwZWN0UFVUXHJcbiAgICogQGRlc2NyaXB0aW9uXHJcbiAgICogQ3JlYXRlcyBhIG5ldyByZXF1ZXN0IGV4cGVjdGF0aW9uIGZvciBQVVQgcmVxdWVzdHMuIEZvciBtb3JlIGluZm8gc2VlIGBleHBlY3QoKWAuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ3xSZWdFeHB8ZnVuY3Rpb24oc3RyaW5nKX0gdXJsIEhUVFAgdXJsIG9yIGZ1bmN0aW9uIHRoYXQgcmVjZWl2ZXMgdGhlIHVybFxyXG4gICAqICAgYW5kIHJldHVybnMgdHJ1ZSBpZiB0aGUgdXJsIG1hdGNoIHRoZSBjdXJyZW50IGRlZmluaXRpb24uXHJcbiAgICogQHBhcmFtIHsoc3RyaW5nfFJlZ0V4cHxmdW5jdGlvbihzdHJpbmcpfE9iamVjdCk9fSBkYXRhIEhUVFAgcmVxdWVzdCBib2R5IG9yIGZ1bmN0aW9uIHRoYXRcclxuICAgKiAgcmVjZWl2ZXMgZGF0YSBzdHJpbmcgYW5kIHJldHVybnMgdHJ1ZSBpZiB0aGUgZGF0YSBpcyBhcyBleHBlY3RlZCwgb3IgT2JqZWN0IGlmIHJlcXVlc3QgYm9keVxyXG4gICAqICBpcyBpbiBKU09OIGZvcm1hdC5cclxuICAgKiBAcGFyYW0ge09iamVjdD19IGhlYWRlcnMgSFRUUCBoZWFkZXJzLlxyXG4gICAqIEByZXR1cm5zIHtyZXF1ZXN0SGFuZGxlcn0gUmV0dXJucyBhbiBvYmplY3Qgd2l0aCBgcmVzcG9uZGAgbWV0aG9kIHRoYXQgY29udHJvbHMgaG93IGEgbWF0Y2hlZFxyXG4gICAqICAgcmVxdWVzdCBpcyBoYW5kbGVkLiBZb3UgY2FuIHNhdmUgdGhpcyBvYmplY3QgZm9yIGxhdGVyIHVzZSBhbmQgaW52b2tlIGByZXNwb25kYCBhZ2FpbiBpblxyXG4gICAqICAgb3JkZXIgdG8gY2hhbmdlIGhvdyBhIG1hdGNoZWQgcmVxdWVzdCBpcyBoYW5kbGVkLlxyXG4gICAqL1xyXG5cclxuICAvKipcclxuICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICogQG5hbWUgJGh0dHBCYWNrZW5kI2V4cGVjdFBBVENIXHJcbiAgICogQGRlc2NyaXB0aW9uXHJcbiAgICogQ3JlYXRlcyBhIG5ldyByZXF1ZXN0IGV4cGVjdGF0aW9uIGZvciBQQVRDSCByZXF1ZXN0cy4gRm9yIG1vcmUgaW5mbyBzZWUgYGV4cGVjdCgpYC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfFJlZ0V4cHxmdW5jdGlvbihzdHJpbmcpfSB1cmwgSFRUUCB1cmwgb3IgZnVuY3Rpb24gdGhhdCByZWNlaXZlcyB0aGUgdXJsXHJcbiAgICogICBhbmQgcmV0dXJucyB0cnVlIGlmIHRoZSB1cmwgbWF0Y2ggdGhlIGN1cnJlbnQgZGVmaW5pdGlvbi5cclxuICAgKiBAcGFyYW0geyhzdHJpbmd8UmVnRXhwfGZ1bmN0aW9uKHN0cmluZyl8T2JqZWN0KT19IGRhdGEgSFRUUCByZXF1ZXN0IGJvZHkgb3IgZnVuY3Rpb24gdGhhdFxyXG4gICAqICByZWNlaXZlcyBkYXRhIHN0cmluZyBhbmQgcmV0dXJucyB0cnVlIGlmIHRoZSBkYXRhIGlzIGFzIGV4cGVjdGVkLCBvciBPYmplY3QgaWYgcmVxdWVzdCBib2R5XHJcbiAgICogIGlzIGluIEpTT04gZm9ybWF0LlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0PX0gaGVhZGVycyBIVFRQIGhlYWRlcnMuXHJcbiAgICogQHJldHVybnMge3JlcXVlc3RIYW5kbGVyfSBSZXR1cm5zIGFuIG9iamVjdCB3aXRoIGByZXNwb25kYCBtZXRob2QgdGhhdCBjb250cm9scyBob3cgYSBtYXRjaGVkXHJcbiAgICogICByZXF1ZXN0IGlzIGhhbmRsZWQuIFlvdSBjYW4gc2F2ZSB0aGlzIG9iamVjdCBmb3IgbGF0ZXIgdXNlIGFuZCBpbnZva2UgYHJlc3BvbmRgIGFnYWluIGluXHJcbiAgICogICBvcmRlciB0byBjaGFuZ2UgaG93IGEgbWF0Y2hlZCByZXF1ZXN0IGlzIGhhbmRsZWQuXHJcbiAgICovXHJcblxyXG4gIC8qKlxyXG4gICAqIEBuZ2RvYyBtZXRob2RcclxuICAgKiBAbmFtZSAkaHR0cEJhY2tlbmQjZXhwZWN0SlNPTlBcclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKiBDcmVhdGVzIGEgbmV3IHJlcXVlc3QgZXhwZWN0YXRpb24gZm9yIEpTT05QIHJlcXVlc3RzLiBGb3IgbW9yZSBpbmZvIHNlZSBgZXhwZWN0KClgLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd8UmVnRXhwfGZ1bmN0aW9uKHN0cmluZyl9IHVybCBIVFRQIHVybCBvciBmdW5jdGlvbiB0aGF0IHJlY2VpdmVzIHRoZSB1cmxcclxuICAgKiAgIGFuZCByZXR1cm5zIHRydWUgaWYgdGhlIHVybCBtYXRjaCB0aGUgY3VycmVudCBkZWZpbml0aW9uLlxyXG4gICAqIEByZXR1cm5zIHtyZXF1ZXN0SGFuZGxlcn0gUmV0dXJucyBhbiBvYmplY3Qgd2l0aCBgcmVzcG9uZGAgbWV0aG9kIHRoYXQgY29udHJvbHMgaG93IGEgbWF0Y2hlZFxyXG4gICAqICAgcmVxdWVzdCBpcyBoYW5kbGVkLiBZb3UgY2FuIHNhdmUgdGhpcyBvYmplY3QgZm9yIGxhdGVyIHVzZSBhbmQgaW52b2tlIGByZXNwb25kYCBhZ2FpbiBpblxyXG4gICAqICAgb3JkZXIgdG8gY2hhbmdlIGhvdyBhIG1hdGNoZWQgcmVxdWVzdCBpcyBoYW5kbGVkLlxyXG4gICAqL1xyXG4gIGNyZWF0ZVNob3J0TWV0aG9kcygnZXhwZWN0Jyk7XHJcblxyXG5cclxuICAvKipcclxuICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICogQG5hbWUgJGh0dHBCYWNrZW5kI2ZsdXNoXHJcbiAgICogQGRlc2NyaXB0aW9uXHJcbiAgICogRmx1c2hlcyBhbGwgcGVuZGluZyByZXF1ZXN0cyB1c2luZyB0aGUgdHJhaW5lZCByZXNwb25zZXMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge251bWJlcj19IGNvdW50IE51bWJlciBvZiByZXNwb25zZXMgdG8gZmx1c2ggKGluIHRoZSBvcmRlciB0aGV5IGFycml2ZWQpLiBJZiB1bmRlZmluZWQsXHJcbiAgICogICBhbGwgcGVuZGluZyByZXF1ZXN0cyB3aWxsIGJlIGZsdXNoZWQuIElmIHRoZXJlIGFyZSBubyBwZW5kaW5nIHJlcXVlc3RzIHdoZW4gdGhlIGZsdXNoIG1ldGhvZFxyXG4gICAqICAgaXMgY2FsbGVkIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gKGFzIHRoaXMgdHlwaWNhbGx5IGEgc2lnbiBvZiBwcm9ncmFtbWluZyBlcnJvcikuXHJcbiAgICovXHJcbiAgJGh0dHBCYWNrZW5kLmZsdXNoID0gZnVuY3Rpb24oY291bnQsIGRpZ2VzdCkge1xyXG4gICAgaWYgKGRpZ2VzdCAhPT0gZmFsc2UpICRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG4gICAgaWYgKCFyZXNwb25zZXMubGVuZ3RoKSB0aHJvdyBuZXcgRXJyb3IoJ05vIHBlbmRpbmcgcmVxdWVzdCB0byBmbHVzaCAhJyk7XHJcblxyXG4gICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKGNvdW50KSAmJiBjb3VudCAhPT0gbnVsbCkge1xyXG4gICAgICB3aGlsZSAoY291bnQtLSkge1xyXG4gICAgICAgIGlmICghcmVzcG9uc2VzLmxlbmd0aCkgdGhyb3cgbmV3IEVycm9yKCdObyBtb3JlIHBlbmRpbmcgcmVxdWVzdCB0byBmbHVzaCAhJyk7XHJcbiAgICAgICAgcmVzcG9uc2VzLnNoaWZ0KCkoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd2hpbGUgKHJlc3BvbnNlcy5sZW5ndGgpIHtcclxuICAgICAgICByZXNwb25zZXMuc2hpZnQoKSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAkaHR0cEJhY2tlbmQudmVyaWZ5Tm9PdXRzdGFuZGluZ0V4cGVjdGF0aW9uKGRpZ2VzdCk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIEBuZ2RvYyBtZXRob2RcclxuICAgKiBAbmFtZSAkaHR0cEJhY2tlbmQjdmVyaWZ5Tm9PdXRzdGFuZGluZ0V4cGVjdGF0aW9uXHJcbiAgICogQGRlc2NyaXB0aW9uXHJcbiAgICogVmVyaWZpZXMgdGhhdCBhbGwgb2YgdGhlIHJlcXVlc3RzIGRlZmluZWQgdmlhIHRoZSBgZXhwZWN0YCBhcGkgd2VyZSBtYWRlLiBJZiBhbnkgb2YgdGhlXHJcbiAgICogcmVxdWVzdHMgd2VyZSBub3QgbWFkZSwgdmVyaWZ5Tm9PdXRzdGFuZGluZ0V4cGVjdGF0aW9uIHRocm93cyBhbiBleGNlcHRpb24uXHJcbiAgICpcclxuICAgKiBUeXBpY2FsbHksIHlvdSB3b3VsZCBjYWxsIHRoaXMgbWV0aG9kIGZvbGxvd2luZyBlYWNoIHRlc3QgY2FzZSB0aGF0IGFzc2VydHMgcmVxdWVzdHMgdXNpbmcgYW5cclxuICAgKiBcImFmdGVyRWFjaFwiIGNsYXVzZS5cclxuICAgKlxyXG4gICAqIGBgYGpzXHJcbiAgICogICBhZnRlckVhY2goJGh0dHBCYWNrZW5kLnZlcmlmeU5vT3V0c3RhbmRpbmdFeHBlY3RhdGlvbik7XHJcbiAgICogYGBgXHJcbiAgICovXHJcbiAgJGh0dHBCYWNrZW5kLnZlcmlmeU5vT3V0c3RhbmRpbmdFeHBlY3RhdGlvbiA9IGZ1bmN0aW9uKGRpZ2VzdCkge1xyXG4gICAgaWYgKGRpZ2VzdCAhPT0gZmFsc2UpICRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG4gICAgaWYgKGV4cGVjdGF0aW9ucy5sZW5ndGgpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnNhdGlzZmllZCByZXF1ZXN0czogJyArIGV4cGVjdGF0aW9ucy5qb2luKCcsICcpKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAqIEBuYW1lICRodHRwQmFja2VuZCN2ZXJpZnlOb091dHN0YW5kaW5nUmVxdWVzdFxyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqIFZlcmlmaWVzIHRoYXQgdGhlcmUgYXJlIG5vIG91dHN0YW5kaW5nIHJlcXVlc3RzIHRoYXQgbmVlZCB0byBiZSBmbHVzaGVkLlxyXG4gICAqXHJcbiAgICogVHlwaWNhbGx5LCB5b3Ugd291bGQgY2FsbCB0aGlzIG1ldGhvZCBmb2xsb3dpbmcgZWFjaCB0ZXN0IGNhc2UgdGhhdCBhc3NlcnRzIHJlcXVlc3RzIHVzaW5nIGFuXHJcbiAgICogXCJhZnRlckVhY2hcIiBjbGF1c2UuXHJcbiAgICpcclxuICAgKiBgYGBqc1xyXG4gICAqICAgYWZ0ZXJFYWNoKCRodHRwQmFja2VuZC52ZXJpZnlOb091dHN0YW5kaW5nUmVxdWVzdCk7XHJcbiAgICogYGBgXHJcbiAgICovXHJcbiAgJGh0dHBCYWNrZW5kLnZlcmlmeU5vT3V0c3RhbmRpbmdSZXF1ZXN0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAocmVzcG9uc2VzLmxlbmd0aCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuZmx1c2hlZCByZXF1ZXN0czogJyArIHJlc3BvbnNlcy5sZW5ndGgpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG5cclxuICAvKipcclxuICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICogQG5hbWUgJGh0dHBCYWNrZW5kI3Jlc2V0RXhwZWN0YXRpb25zXHJcbiAgICogQGRlc2NyaXB0aW9uXHJcbiAgICogUmVzZXRzIGFsbCByZXF1ZXN0IGV4cGVjdGF0aW9ucywgYnV0IHByZXNlcnZlcyBhbGwgYmFja2VuZCBkZWZpbml0aW9ucy4gVHlwaWNhbGx5LCB5b3Ugd291bGRcclxuICAgKiBjYWxsIHJlc2V0RXhwZWN0YXRpb25zIGR1cmluZyBhIG11bHRpcGxlLXBoYXNlIHRlc3Qgd2hlbiB5b3Ugd2FudCB0byByZXVzZSB0aGUgc2FtZSBpbnN0YW5jZSBvZlxyXG4gICAqICRodHRwQmFja2VuZCBtb2NrLlxyXG4gICAqL1xyXG4gICRodHRwQmFja2VuZC5yZXNldEV4cGVjdGF0aW9ucyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgZXhwZWN0YXRpb25zLmxlbmd0aCA9IDA7XHJcbiAgICByZXNwb25zZXMubGVuZ3RoID0gMDtcclxuICB9O1xyXG5cclxuICByZXR1cm4gJGh0dHBCYWNrZW5kO1xyXG5cclxuXHJcbiAgZnVuY3Rpb24gY3JlYXRlU2hvcnRNZXRob2RzKHByZWZpeCkge1xyXG4gICAgYW5ndWxhci5mb3JFYWNoKFsnR0VUJywgJ0RFTEVURScsICdKU09OUCcsICdIRUFEJ10sIGZ1bmN0aW9uKG1ldGhvZCkge1xyXG4gICAgICRodHRwQmFja2VuZFtwcmVmaXggKyBtZXRob2RdID0gZnVuY3Rpb24odXJsLCBoZWFkZXJzKSB7XHJcbiAgICAgICByZXR1cm4gJGh0dHBCYWNrZW5kW3ByZWZpeF0obWV0aG9kLCB1cmwsIHVuZGVmaW5lZCwgaGVhZGVycyk7XHJcbiAgICAgfTtcclxuICAgIH0pO1xyXG5cclxuICAgIGFuZ3VsYXIuZm9yRWFjaChbJ1BVVCcsICdQT1NUJywgJ1BBVENIJ10sIGZ1bmN0aW9uKG1ldGhvZCkge1xyXG4gICAgICAkaHR0cEJhY2tlbmRbcHJlZml4ICsgbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgaGVhZGVycykge1xyXG4gICAgICAgIHJldHVybiAkaHR0cEJhY2tlbmRbcHJlZml4XShtZXRob2QsIHVybCwgZGF0YSwgaGVhZGVycyk7XHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIE1vY2tIdHRwRXhwZWN0YXRpb24obWV0aG9kLCB1cmwsIGRhdGEsIGhlYWRlcnMpIHtcclxuXHJcbiAgdGhpcy5kYXRhID0gZGF0YTtcclxuICB0aGlzLmhlYWRlcnMgPSBoZWFkZXJzO1xyXG5cclxuICB0aGlzLm1hdGNoID0gZnVuY3Rpb24obSwgdSwgZCwgaCkge1xyXG4gICAgaWYgKG1ldGhvZCAhPSBtKSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAoIXRoaXMubWF0Y2hVcmwodSkpIHJldHVybiBmYWxzZTtcclxuICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChkKSAmJiAhdGhpcy5tYXRjaERhdGEoZCkpIHJldHVybiBmYWxzZTtcclxuICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChoKSAmJiAhdGhpcy5tYXRjaEhlYWRlcnMoaCkpIHJldHVybiBmYWxzZTtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH07XHJcblxyXG4gIHRoaXMubWF0Y2hVcmwgPSBmdW5jdGlvbih1KSB7XHJcbiAgICBpZiAoIXVybCkgcmV0dXJuIHRydWU7XHJcbiAgICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKHVybC50ZXN0KSkgcmV0dXJuIHVybC50ZXN0KHUpO1xyXG4gICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbih1cmwpKSByZXR1cm4gdXJsKHUpO1xyXG4gICAgcmV0dXJuIHVybCA9PSB1O1xyXG4gIH07XHJcblxyXG4gIHRoaXMubWF0Y2hIZWFkZXJzID0gZnVuY3Rpb24oaCkge1xyXG4gICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQoaGVhZGVycykpIHJldHVybiB0cnVlO1xyXG4gICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbihoZWFkZXJzKSkgcmV0dXJuIGhlYWRlcnMoaCk7XHJcbiAgICByZXR1cm4gYW5ndWxhci5lcXVhbHMoaGVhZGVycywgaCk7XHJcbiAgfTtcclxuXHJcbiAgdGhpcy5tYXRjaERhdGEgPSBmdW5jdGlvbihkKSB7XHJcbiAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZChkYXRhKSkgcmV0dXJuIHRydWU7XHJcbiAgICBpZiAoZGF0YSAmJiBhbmd1bGFyLmlzRnVuY3Rpb24oZGF0YS50ZXN0KSkgcmV0dXJuIGRhdGEudGVzdChkKTtcclxuICAgIGlmIChkYXRhICYmIGFuZ3VsYXIuaXNGdW5jdGlvbihkYXRhKSkgcmV0dXJuIGRhdGEoZCk7XHJcbiAgICBpZiAoZGF0YSAmJiAhYW5ndWxhci5pc1N0cmluZyhkYXRhKSkge1xyXG4gICAgICByZXR1cm4gYW5ndWxhci5lcXVhbHMoYW5ndWxhci5mcm9tSnNvbihhbmd1bGFyLnRvSnNvbihkYXRhKSksIGFuZ3VsYXIuZnJvbUpzb24oZCkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRhdGEgPT0gZDtcclxuICB9O1xyXG5cclxuICB0aGlzLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gbWV0aG9kICsgJyAnICsgdXJsO1xyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZU1vY2tYaHIoKSB7XHJcbiAgcmV0dXJuIG5ldyBNb2NrWGhyKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIE1vY2tYaHIoKSB7XHJcblxyXG4gIC8vIGhhY2sgZm9yIHRlc3RpbmcgJGh0dHAsICRodHRwQmFja2VuZFxyXG4gIE1vY2tYaHIuJCRsYXN0SW5zdGFuY2UgPSB0aGlzO1xyXG5cclxuICB0aGlzLm9wZW4gPSBmdW5jdGlvbihtZXRob2QsIHVybCwgYXN5bmMpIHtcclxuICAgIHRoaXMuJCRtZXRob2QgPSBtZXRob2Q7XHJcbiAgICB0aGlzLiQkdXJsID0gdXJsO1xyXG4gICAgdGhpcy4kJGFzeW5jID0gYXN5bmM7XHJcbiAgICB0aGlzLiQkcmVxSGVhZGVycyA9IHt9O1xyXG4gICAgdGhpcy4kJHJlc3BIZWFkZXJzID0ge307XHJcbiAgfTtcclxuXHJcbiAgdGhpcy5zZW5kID0gZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgdGhpcy4kJGRhdGEgPSBkYXRhO1xyXG4gIH07XHJcblxyXG4gIHRoaXMuc2V0UmVxdWVzdEhlYWRlciA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcclxuICAgIHRoaXMuJCRyZXFIZWFkZXJzW2tleV0gPSB2YWx1ZTtcclxuICB9O1xyXG5cclxuICB0aGlzLmdldFJlc3BvbnNlSGVhZGVyID0gZnVuY3Rpb24obmFtZSkge1xyXG4gICAgLy8gdGhlIGxvb2t1cCBtdXN0IGJlIGNhc2UgaW5zZW5zaXRpdmUsXHJcbiAgICAvLyB0aGF0J3Mgd2h5IHdlIHRyeSB0d28gcXVpY2sgbG9va3VwcyBmaXJzdCBhbmQgZnVsbCBzY2FuIGxhc3RcclxuICAgIHZhciBoZWFkZXIgPSB0aGlzLiQkcmVzcEhlYWRlcnNbbmFtZV07XHJcbiAgICBpZiAoaGVhZGVyKSByZXR1cm4gaGVhZGVyO1xyXG5cclxuICAgIG5hbWUgPSBhbmd1bGFyLmxvd2VyY2FzZShuYW1lKTtcclxuICAgIGhlYWRlciA9IHRoaXMuJCRyZXNwSGVhZGVyc1tuYW1lXTtcclxuICAgIGlmIChoZWFkZXIpIHJldHVybiBoZWFkZXI7XHJcblxyXG4gICAgaGVhZGVyID0gdW5kZWZpbmVkO1xyXG4gICAgYW5ndWxhci5mb3JFYWNoKHRoaXMuJCRyZXNwSGVhZGVycywgZnVuY3Rpb24oaGVhZGVyVmFsLCBoZWFkZXJOYW1lKSB7XHJcbiAgICAgIGlmICghaGVhZGVyICYmIGFuZ3VsYXIubG93ZXJjYXNlKGhlYWRlck5hbWUpID09IG5hbWUpIGhlYWRlciA9IGhlYWRlclZhbDtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGhlYWRlcjtcclxuICB9O1xyXG5cclxuICB0aGlzLmdldEFsbFJlc3BvbnNlSGVhZGVycyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGxpbmVzID0gW107XHJcblxyXG4gICAgYW5ndWxhci5mb3JFYWNoKHRoaXMuJCRyZXNwSGVhZGVycywgZnVuY3Rpb24odmFsdWUsIGtleSkge1xyXG4gICAgICBsaW5lcy5wdXNoKGtleSArICc6ICcgKyB2YWx1ZSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBsaW5lcy5qb2luKCdcXG4nKTtcclxuICB9O1xyXG5cclxuICB0aGlzLmFib3J0ID0gYW5ndWxhci5ub29wO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIEBuZ2RvYyBzZXJ2aWNlXHJcbiAqIEBuYW1lICR0aW1lb3V0XHJcbiAqIEBkZXNjcmlwdGlvblxyXG4gKlxyXG4gKiBUaGlzIHNlcnZpY2UgaXMganVzdCBhIHNpbXBsZSBkZWNvcmF0b3IgZm9yIHtAbGluayBuZy4kdGltZW91dCAkdGltZW91dH0gc2VydmljZVxyXG4gKiB0aGF0IGFkZHMgYSBcImZsdXNoXCIgYW5kIFwidmVyaWZ5Tm9QZW5kaW5nVGFza3NcIiBtZXRob2RzLlxyXG4gKi9cclxuXHJcbmFuZ3VsYXIubW9jay4kVGltZW91dERlY29yYXRvciA9IFsnJGRlbGVnYXRlJywgJyRicm93c2VyJywgZnVuY3Rpb24oJGRlbGVnYXRlLCAkYnJvd3Nlcikge1xyXG5cclxuICAvKipcclxuICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICogQG5hbWUgJHRpbWVvdXQjZmx1c2hcclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKlxyXG4gICAqIEZsdXNoZXMgdGhlIHF1ZXVlIG9mIHBlbmRpbmcgdGFza3MuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge251bWJlcj19IGRlbGF5IG1heGltdW0gdGltZW91dCBhbW91bnQgdG8gZmx1c2ggdXAgdW50aWxcclxuICAgKi9cclxuICAkZGVsZWdhdGUuZmx1c2ggPSBmdW5jdGlvbihkZWxheSkge1xyXG4gICAgJGJyb3dzZXIuZGVmZXIuZmx1c2goZGVsYXkpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuZ2RvYyBtZXRob2RcclxuICAgKiBAbmFtZSAkdGltZW91dCN2ZXJpZnlOb1BlbmRpbmdUYXNrc1xyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqXHJcbiAgICogVmVyaWZpZXMgdGhhdCB0aGVyZSBhcmUgbm8gcGVuZGluZyB0YXNrcyB0aGF0IG5lZWQgdG8gYmUgZmx1c2hlZC5cclxuICAgKi9cclxuICAkZGVsZWdhdGUudmVyaWZ5Tm9QZW5kaW5nVGFza3MgPSBmdW5jdGlvbigpIHtcclxuICAgIGlmICgkYnJvd3Nlci5kZWZlcnJlZEZucy5sZW5ndGgpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdEZWZlcnJlZCB0YXNrcyB0byBmbHVzaCAoJyArICRicm93c2VyLmRlZmVycmVkRm5zLmxlbmd0aCArICcpOiAnICtcclxuICAgICAgICAgIGZvcm1hdFBlbmRpbmdUYXNrc0FzU3RyaW5nKCRicm93c2VyLmRlZmVycmVkRm5zKSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgZnVuY3Rpb24gZm9ybWF0UGVuZGluZ1Rhc2tzQXNTdHJpbmcodGFza3MpIHtcclxuICAgIHZhciByZXN1bHQgPSBbXTtcclxuICAgIGFuZ3VsYXIuZm9yRWFjaCh0YXNrcywgZnVuY3Rpb24odGFzaykge1xyXG4gICAgICByZXN1bHQucHVzaCgne2lkOiAnICsgdGFzay5pZCArICcsICcgKyAndGltZTogJyArIHRhc2sudGltZSArICd9Jyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0LmpvaW4oJywgJyk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gJGRlbGVnYXRlO1xyXG59XTtcclxuXHJcbmFuZ3VsYXIubW9jay4kUkFGRGVjb3JhdG9yID0gWyckZGVsZWdhdGUnLCBmdW5jdGlvbigkZGVsZWdhdGUpIHtcclxuICB2YXIgcXVldWUsIHJhZkZuID0gZnVuY3Rpb24oZm4pIHtcclxuICAgIHZhciBpbmRleCA9IHF1ZXVlLmxlbmd0aDtcclxuICAgIHF1ZXVlLnB1c2goZm4pO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xyXG4gICAgICBxdWV1ZS5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfTtcclxuICB9O1xyXG5cclxuICBxdWV1ZSA9IHJhZkZuLnF1ZXVlID0gW107XHJcblxyXG4gIHJhZkZuLnN1cHBvcnRlZCA9ICRkZWxlZ2F0ZS5zdXBwb3J0ZWQ7XHJcblxyXG4gIHJhZkZuLmZsdXNoID0gZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gckFGIGNhbGxiYWNrcyBwcmVzZW50Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGxlbmd0aCA9IHF1ZXVlLmxlbmd0aDtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgcXVldWVbaV0oKTtcclxuICAgIH1cclxuXHJcbiAgICBxdWV1ZS5sZW5ndGggPSAwO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiByYWZGbjtcclxufV07XHJcblxyXG5hbmd1bGFyLm1vY2suJEFzeW5jQ2FsbGJhY2tEZWNvcmF0b3IgPSBbJyRkZWxlZ2F0ZScsIGZ1bmN0aW9uKCRkZWxlZ2F0ZSkge1xyXG4gIHZhciBxdWV1ZSwgYWRkRm4gPSBmdW5jdGlvbihmbikge1xyXG4gICAgcXVldWUucHVzaChmbik7XHJcbiAgfTtcclxuICBxdWV1ZSA9IGFkZEZuLnF1ZXVlID0gW107XHJcbiAgYWRkRm4uZmx1c2ggPSBmdW5jdGlvbigpIHtcclxuICAgIGFuZ3VsYXIuZm9yRWFjaChxdWV1ZSwgZnVuY3Rpb24oZm4pIHtcclxuICAgICAgZm4oKTtcclxuICAgIH0pO1xyXG4gICAgcXVldWUubGVuZ3RoID0gMDtcclxuICB9O1xyXG4gIHJldHVybiBhZGRGbjtcclxufV07XHJcblxyXG4vKipcclxuICpcclxuICovXHJcbmFuZ3VsYXIubW9jay4kUm9vdEVsZW1lbnRQcm92aWRlciA9IGZ1bmN0aW9uKCkge1xyXG4gIHRoaXMuJGdldCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIGFuZ3VsYXIuZWxlbWVudCgnPGRpdiBuZy1hcHA+PC9kaXY+Jyk7XHJcbiAgfTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAbmdkb2Mgc2VydmljZVxyXG4gKiBAbmFtZSAkY29udHJvbGxlclxyXG4gKiBAZGVzY3JpcHRpb25cclxuICogQSBkZWNvcmF0b3IgZm9yIHtAbGluayBuZy4kY29udHJvbGxlcn0gd2l0aCBhZGRpdGlvbmFsIGBiaW5kaW5nc2AgcGFyYW1ldGVyLCB1c2VmdWwgd2hlbiB0ZXN0aW5nXHJcbiAqIGNvbnRyb2xsZXJzIG9mIGRpcmVjdGl2ZXMgdGhhdCB1c2Uge0BsaW5rICRjb21waWxlIy1iaW5kdG9jb250cm9sbGVyLSBgYmluZFRvQ29udHJvbGxlcmB9LlxyXG4gKlxyXG4gKlxyXG4gKiAjIyBFeGFtcGxlXHJcbiAqXHJcbiAqIGBgYGpzXHJcbiAqXHJcbiAqIC8vIERpcmVjdGl2ZSBkZWZpbml0aW9uIC4uLlxyXG4gKlxyXG4gKiBteU1vZC5kaXJlY3RpdmUoJ215RGlyZWN0aXZlJywge1xyXG4gKiAgIGNvbnRyb2xsZXI6ICdNeURpcmVjdGl2ZUNvbnRyb2xsZXInLFxyXG4gKiAgIGJpbmRUb0NvbnRyb2xsZXI6IHtcclxuICogICAgIG5hbWU6ICdAJ1xyXG4gKiAgIH1cclxuICogfSk7XHJcbiAqXHJcbiAqXHJcbiAqIC8vIENvbnRyb2xsZXIgZGVmaW5pdGlvbiAuLi5cclxuICpcclxuICogbXlNb2QuY29udHJvbGxlcignTXlEaXJlY3RpdmVDb250cm9sbGVyJywgWydsb2cnLCBmdW5jdGlvbigkbG9nKSB7XHJcbiAqICAgJGxvZy5pbmZvKHRoaXMubmFtZSk7XHJcbiAqIH0pXTtcclxuICpcclxuICpcclxuICogLy8gSW4gYSB0ZXN0IC4uLlxyXG4gKlxyXG4gKiBkZXNjcmliZSgnbXlEaXJlY3RpdmVDb250cm9sbGVyJywgZnVuY3Rpb24oKSB7XHJcbiAqICAgaXQoJ3Nob3VsZCB3cml0ZSB0aGUgYm91bmQgbmFtZSB0byB0aGUgbG9nJywgaW5qZWN0KGZ1bmN0aW9uKCRjb250cm9sbGVyLCAkbG9nKSB7XHJcbiAqICAgICB2YXIgY3RybCA9ICRjb250cm9sbGVyKCdNeURpcmVjdGl2ZScsIHsgLyogbm8gbG9jYWxzICYjNDI7LyB9LCB7IG5hbWU6ICdDbGFyayBLZW50JyB9KTtcclxuICogICAgIGV4cGVjdChjdHJsLm5hbWUpLnRvRXF1YWwoJ0NsYXJrIEtlbnQnKTtcclxuICogICAgIGV4cGVjdCgkbG9nLmluZm8ubG9ncykudG9FcXVhbChbJ0NsYXJrIEtlbnQnXSk7XHJcbiAqICAgfSk7XHJcbiAqIH0pO1xyXG4gKlxyXG4gKiBgYGBcclxuICpcclxuICogQHBhcmFtIHtGdW5jdGlvbnxzdHJpbmd9IGNvbnN0cnVjdG9yIElmIGNhbGxlZCB3aXRoIGEgZnVuY3Rpb24gdGhlbiBpdCdzIGNvbnNpZGVyZWQgdG8gYmUgdGhlXHJcbiAqICAgIGNvbnRyb2xsZXIgY29uc3RydWN0b3IgZnVuY3Rpb24uIE90aGVyd2lzZSBpdCdzIGNvbnNpZGVyZWQgdG8gYmUgYSBzdHJpbmcgd2hpY2ggaXMgdXNlZFxyXG4gKiAgICB0byByZXRyaWV2ZSB0aGUgY29udHJvbGxlciBjb25zdHJ1Y3RvciB1c2luZyB0aGUgZm9sbG93aW5nIHN0ZXBzOlxyXG4gKlxyXG4gKiAgICAqIGNoZWNrIGlmIGEgY29udHJvbGxlciB3aXRoIGdpdmVuIG5hbWUgaXMgcmVnaXN0ZXJlZCB2aWEgYCRjb250cm9sbGVyUHJvdmlkZXJgXHJcbiAqICAgICogY2hlY2sgaWYgZXZhbHVhdGluZyB0aGUgc3RyaW5nIG9uIHRoZSBjdXJyZW50IHNjb3BlIHJldHVybnMgYSBjb25zdHJ1Y3RvclxyXG4gKiAgICAqIGlmICRjb250cm9sbGVyUHJvdmlkZXIjYWxsb3dHbG9iYWxzLCBjaGVjayBgd2luZG93W2NvbnN0cnVjdG9yXWAgb24gdGhlIGdsb2JhbFxyXG4gKiAgICAgIGB3aW5kb3dgIG9iamVjdCAobm90IHJlY29tbWVuZGVkKVxyXG4gKlxyXG4gKiAgICBUaGUgc3RyaW5nIGNhbiB1c2UgdGhlIGBjb250cm9sbGVyIGFzIHByb3BlcnR5YCBzeW50YXgsIHdoZXJlIHRoZSBjb250cm9sbGVyIGluc3RhbmNlIGlzIHB1Ymxpc2hlZFxyXG4gKiAgICBhcyB0aGUgc3BlY2lmaWVkIHByb3BlcnR5IG9uIHRoZSBgc2NvcGVgOyB0aGUgYHNjb3BlYCBtdXN0IGJlIGluamVjdGVkIGludG8gYGxvY2Fsc2AgcGFyYW0gZm9yIHRoaXNcclxuICogICAgdG8gd29yayBjb3JyZWN0bHkuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBsb2NhbHMgSW5qZWN0aW9uIGxvY2FscyBmb3IgQ29udHJvbGxlci5cclxuICogQHBhcmFtIHtPYmplY3Q9fSBiaW5kaW5ncyBQcm9wZXJ0aWVzIHRvIGFkZCB0byB0aGUgY29udHJvbGxlciBiZWZvcmUgaW52b2tpbmcgdGhlIGNvbnN0cnVjdG9yLiBUaGlzIGlzIHVzZWRcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICB0byBzaW11bGF0ZSB0aGUgYGJpbmRUb0NvbnRyb2xsZXJgIGZlYXR1cmUgYW5kIHNpbXBsaWZ5IGNlcnRhaW4ga2luZHMgb2YgdGVzdHMuXHJcbiAqIEByZXR1cm4ge09iamVjdH0gSW5zdGFuY2Ugb2YgZ2l2ZW4gY29udHJvbGxlci5cclxuICovXHJcbmFuZ3VsYXIubW9jay4kQ29udHJvbGxlckRlY29yYXRvciA9IFsnJGRlbGVnYXRlJywgZnVuY3Rpb24oJGRlbGVnYXRlKSB7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uKGV4cHJlc3Npb24sIGxvY2FscywgbGF0ZXIsIGlkZW50KSB7XHJcbiAgICBpZiAobGF0ZXIgJiYgdHlwZW9mIGxhdGVyID09PSAnb2JqZWN0Jykge1xyXG4gICAgICB2YXIgY3JlYXRlID0gJGRlbGVnYXRlKGV4cHJlc3Npb24sIGxvY2FscywgdHJ1ZSwgaWRlbnQpO1xyXG4gICAgICBhbmd1bGFyLmV4dGVuZChjcmVhdGUuaW5zdGFuY2UsIGxhdGVyKTtcclxuICAgICAgcmV0dXJuIGNyZWF0ZSgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICRkZWxlZ2F0ZShleHByZXNzaW9uLCBsb2NhbHMsIGxhdGVyLCBpZGVudCk7XHJcbiAgfTtcclxufV07XHJcblxyXG5cclxuLyoqXHJcbiAqIEBuZ2RvYyBtb2R1bGVcclxuICogQG5hbWUgbmdNb2NrXHJcbiAqIEBwYWNrYWdlTmFtZSBhbmd1bGFyLW1vY2tzXHJcbiAqIEBkZXNjcmlwdGlvblxyXG4gKlxyXG4gKiAjIG5nTW9ja1xyXG4gKlxyXG4gKiBUaGUgYG5nTW9ja2AgbW9kdWxlIHByb3ZpZGVzIHN1cHBvcnQgdG8gaW5qZWN0IGFuZCBtb2NrIEFuZ3VsYXIgc2VydmljZXMgaW50byB1bml0IHRlc3RzLlxyXG4gKiBJbiBhZGRpdGlvbiwgbmdNb2NrIGFsc28gZXh0ZW5kcyB2YXJpb3VzIGNvcmUgbmcgc2VydmljZXMgc3VjaCB0aGF0IHRoZXkgY2FuIGJlXHJcbiAqIGluc3BlY3RlZCBhbmQgY29udHJvbGxlZCBpbiBhIHN5bmNocm9ub3VzIG1hbm5lciB3aXRoaW4gdGVzdCBjb2RlLlxyXG4gKlxyXG4gKlxyXG4gKiA8ZGl2IGRvYy1tb2R1bGUtY29tcG9uZW50cz1cIm5nTW9ja1wiPjwvZGl2PlxyXG4gKlxyXG4gKi9cclxuYW5ndWxhci5tb2R1bGUoJ25nTW9jaycsIFsnbmcnXSkucHJvdmlkZXIoe1xyXG4gICRicm93c2VyOiBhbmd1bGFyLm1vY2suJEJyb3dzZXJQcm92aWRlcixcclxuICAkZXhjZXB0aW9uSGFuZGxlcjogYW5ndWxhci5tb2NrLiRFeGNlcHRpb25IYW5kbGVyUHJvdmlkZXIsXHJcbiAgJGxvZzogYW5ndWxhci5tb2NrLiRMb2dQcm92aWRlcixcclxuICAkaW50ZXJ2YWw6IGFuZ3VsYXIubW9jay4kSW50ZXJ2YWxQcm92aWRlcixcclxuICAkaHR0cEJhY2tlbmQ6IGFuZ3VsYXIubW9jay4kSHR0cEJhY2tlbmRQcm92aWRlcixcclxuICAkcm9vdEVsZW1lbnQ6IGFuZ3VsYXIubW9jay4kUm9vdEVsZW1lbnRQcm92aWRlclxyXG59KS5jb25maWcoWyckcHJvdmlkZScsIGZ1bmN0aW9uKCRwcm92aWRlKSB7XHJcbiAgJHByb3ZpZGUuZGVjb3JhdG9yKCckdGltZW91dCcsIGFuZ3VsYXIubW9jay4kVGltZW91dERlY29yYXRvcik7XHJcbiAgJHByb3ZpZGUuZGVjb3JhdG9yKCckJHJBRicsIGFuZ3VsYXIubW9jay4kUkFGRGVjb3JhdG9yKTtcclxuICAkcHJvdmlkZS5kZWNvcmF0b3IoJyQkYXN5bmNDYWxsYmFjaycsIGFuZ3VsYXIubW9jay4kQXN5bmNDYWxsYmFja0RlY29yYXRvcik7XHJcbiAgJHByb3ZpZGUuZGVjb3JhdG9yKCckcm9vdFNjb3BlJywgYW5ndWxhci5tb2NrLiRSb290U2NvcGVEZWNvcmF0b3IpO1xyXG4gICRwcm92aWRlLmRlY29yYXRvcignJGNvbnRyb2xsZXInLCBhbmd1bGFyLm1vY2suJENvbnRyb2xsZXJEZWNvcmF0b3IpO1xyXG59XSk7XHJcblxyXG4vKipcclxuICogQG5nZG9jIG1vZHVsZVxyXG4gKiBAbmFtZSBuZ01vY2tFMkVcclxuICogQG1vZHVsZSBuZ01vY2tFMkVcclxuICogQHBhY2thZ2VOYW1lIGFuZ3VsYXItbW9ja3NcclxuICogQGRlc2NyaXB0aW9uXHJcbiAqXHJcbiAqIFRoZSBgbmdNb2NrRTJFYCBpcyBhbiBhbmd1bGFyIG1vZHVsZSB3aGljaCBjb250YWlucyBtb2NrcyBzdWl0YWJsZSBmb3IgZW5kLXRvLWVuZCB0ZXN0aW5nLlxyXG4gKiBDdXJyZW50bHkgdGhlcmUgaXMgb25seSBvbmUgbW9jayBwcmVzZW50IGluIHRoaXMgbW9kdWxlIC1cclxuICogdGhlIHtAbGluayBuZ01vY2tFMkUuJGh0dHBCYWNrZW5kIGUyZSAkaHR0cEJhY2tlbmR9IG1vY2suXHJcbiAqL1xyXG5hbmd1bGFyLm1vZHVsZSgnbmdNb2NrRTJFJywgWyduZyddKS5jb25maWcoWyckcHJvdmlkZScsIGZ1bmN0aW9uKCRwcm92aWRlKSB7XHJcbiAgJHByb3ZpZGUuZGVjb3JhdG9yKCckaHR0cEJhY2tlbmQnLCBhbmd1bGFyLm1vY2suZTJlLiRodHRwQmFja2VuZERlY29yYXRvcik7XHJcbn1dKTtcclxuXHJcbi8qKlxyXG4gKiBAbmdkb2Mgc2VydmljZVxyXG4gKiBAbmFtZSAkaHR0cEJhY2tlbmRcclxuICogQG1vZHVsZSBuZ01vY2tFMkVcclxuICogQGRlc2NyaXB0aW9uXHJcbiAqIEZha2UgSFRUUCBiYWNrZW5kIGltcGxlbWVudGF0aW9uIHN1aXRhYmxlIGZvciBlbmQtdG8tZW5kIHRlc3Rpbmcgb3IgYmFja2VuZC1sZXNzIGRldmVsb3BtZW50IG9mXHJcbiAqIGFwcGxpY2F0aW9ucyB0aGF0IHVzZSB0aGUge0BsaW5rIG5nLiRodHRwICRodHRwIHNlcnZpY2V9LlxyXG4gKlxyXG4gKiAqTm90ZSo6IEZvciBmYWtlIGh0dHAgYmFja2VuZCBpbXBsZW1lbnRhdGlvbiBzdWl0YWJsZSBmb3IgdW5pdCB0ZXN0aW5nIHBsZWFzZSBzZWVcclxuICoge0BsaW5rIG5nTW9jay4kaHR0cEJhY2tlbmQgdW5pdC10ZXN0aW5nICRodHRwQmFja2VuZCBtb2NrfS5cclxuICpcclxuICogVGhpcyBpbXBsZW1lbnRhdGlvbiBjYW4gYmUgdXNlZCB0byByZXNwb25kIHdpdGggc3RhdGljIG9yIGR5bmFtaWMgcmVzcG9uc2VzIHZpYSB0aGUgYHdoZW5gIGFwaVxyXG4gKiBhbmQgaXRzIHNob3J0Y3V0cyAoYHdoZW5HRVRgLCBgd2hlblBPU1RgLCBldGMpIGFuZCBvcHRpb25hbGx5IHBhc3MgdGhyb3VnaCByZXF1ZXN0cyB0byB0aGVcclxuICogcmVhbCAkaHR0cEJhY2tlbmQgZm9yIHNwZWNpZmljIHJlcXVlc3RzIChlLmcuIHRvIGludGVyYWN0IHdpdGggY2VydGFpbiByZW1vdGUgYXBpcyBvciB0byBmZXRjaFxyXG4gKiB0ZW1wbGF0ZXMgZnJvbSBhIHdlYnNlcnZlcikuXHJcbiAqXHJcbiAqIEFzIG9wcG9zZWQgdG8gdW5pdC10ZXN0aW5nLCBpbiBhbiBlbmQtdG8tZW5kIHRlc3Rpbmcgc2NlbmFyaW8gb3IgaW4gc2NlbmFyaW8gd2hlbiBhbiBhcHBsaWNhdGlvblxyXG4gKiBpcyBiZWluZyBkZXZlbG9wZWQgd2l0aCB0aGUgcmVhbCBiYWNrZW5kIGFwaSByZXBsYWNlZCB3aXRoIGEgbW9jaywgaXQgaXMgb2Z0ZW4gZGVzaXJhYmxlIGZvclxyXG4gKiBjZXJ0YWluIGNhdGVnb3J5IG9mIHJlcXVlc3RzIHRvIGJ5cGFzcyB0aGUgbW9jayBhbmQgaXNzdWUgYSByZWFsIGh0dHAgcmVxdWVzdCAoZS5nLiB0byBmZXRjaFxyXG4gKiB0ZW1wbGF0ZXMgb3Igc3RhdGljIGZpbGVzIGZyb20gdGhlIHdlYnNlcnZlcikuIFRvIGNvbmZpZ3VyZSB0aGUgYmFja2VuZCB3aXRoIHRoaXMgYmVoYXZpb3JcclxuICogdXNlIHRoZSBgcGFzc1Rocm91Z2hgIHJlcXVlc3QgaGFuZGxlciBvZiBgd2hlbmAgaW5zdGVhZCBvZiBgcmVzcG9uZGAuXHJcbiAqXHJcbiAqIEFkZGl0aW9uYWxseSwgd2UgZG9uJ3Qgd2FudCB0byBtYW51YWxseSBoYXZlIHRvIGZsdXNoIG1vY2tlZCBvdXQgcmVxdWVzdHMgbGlrZSB3ZSBkbyBkdXJpbmcgdW5pdFxyXG4gKiB0ZXN0aW5nLiBGb3IgdGhpcyByZWFzb24gdGhlIGUyZSAkaHR0cEJhY2tlbmQgZmx1c2hlcyBtb2NrZWQgb3V0IHJlcXVlc3RzXHJcbiAqIGF1dG9tYXRpY2FsbHksIGNsb3NlbHkgc2ltdWxhdGluZyB0aGUgYmVoYXZpb3Igb2YgdGhlIFhNTEh0dHBSZXF1ZXN0IG9iamVjdC5cclxuICpcclxuICogVG8gc2V0dXAgdGhlIGFwcGxpY2F0aW9uIHRvIHJ1biB3aXRoIHRoaXMgaHR0cCBiYWNrZW5kLCB5b3UgaGF2ZSB0byBjcmVhdGUgYSBtb2R1bGUgdGhhdCBkZXBlbmRzXHJcbiAqIG9uIHRoZSBgbmdNb2NrRTJFYCBhbmQgeW91ciBhcHBsaWNhdGlvbiBtb2R1bGVzIGFuZCBkZWZpbmVzIHRoZSBmYWtlIGJhY2tlbmQ6XHJcbiAqXHJcbiAqIGBgYGpzXHJcbiAqICAgbXlBcHBEZXYgPSBhbmd1bGFyLm1vZHVsZSgnbXlBcHBEZXYnLCBbJ215QXBwJywgJ25nTW9ja0UyRSddKTtcclxuICogICBteUFwcERldi5ydW4oZnVuY3Rpb24oJGh0dHBCYWNrZW5kKSB7XHJcbiAqICAgICBwaG9uZXMgPSBbe25hbWU6ICdwaG9uZTEnfSwge25hbWU6ICdwaG9uZTInfV07XHJcbiAqXHJcbiAqICAgICAvLyByZXR1cm5zIHRoZSBjdXJyZW50IGxpc3Qgb2YgcGhvbmVzXHJcbiAqICAgICAkaHR0cEJhY2tlbmQud2hlbkdFVCgnL3Bob25lcycpLnJlc3BvbmQocGhvbmVzKTtcclxuICpcclxuICogICAgIC8vIGFkZHMgYSBuZXcgcGhvbmUgdG8gdGhlIHBob25lcyBhcnJheVxyXG4gKiAgICAgJGh0dHBCYWNrZW5kLndoZW5QT1NUKCcvcGhvbmVzJykucmVzcG9uZChmdW5jdGlvbihtZXRob2QsIHVybCwgZGF0YSkge1xyXG4gKiAgICAgICB2YXIgcGhvbmUgPSBhbmd1bGFyLmZyb21Kc29uKGRhdGEpO1xyXG4gKiAgICAgICBwaG9uZXMucHVzaChwaG9uZSk7XHJcbiAqICAgICAgIHJldHVybiBbMjAwLCBwaG9uZSwge31dO1xyXG4gKiAgICAgfSk7XHJcbiAqICAgICAkaHR0cEJhY2tlbmQud2hlbkdFVCgvXlxcL3RlbXBsYXRlc1xcLy8pLnBhc3NUaHJvdWdoKCk7XHJcbiAqICAgICAvLy4uLlxyXG4gKiAgIH0pO1xyXG4gKiBgYGBcclxuICpcclxuICogQWZ0ZXJ3YXJkcywgYm9vdHN0cmFwIHlvdXIgYXBwIHdpdGggdGhpcyBuZXcgbW9kdWxlLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBAbmdkb2MgbWV0aG9kXHJcbiAqIEBuYW1lICRodHRwQmFja2VuZCN3aGVuXHJcbiAqIEBtb2R1bGUgbmdNb2NrRTJFXHJcbiAqIEBkZXNjcmlwdGlvblxyXG4gKiBDcmVhdGVzIGEgbmV3IGJhY2tlbmQgZGVmaW5pdGlvbi5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG1ldGhvZCBIVFRQIG1ldGhvZC5cclxuICogQHBhcmFtIHtzdHJpbmd8UmVnRXhwfGZ1bmN0aW9uKHN0cmluZyl9IHVybCBIVFRQIHVybCBvciBmdW5jdGlvbiB0aGF0IHJlY2VpdmVzIHRoZSB1cmxcclxuICogICBhbmQgcmV0dXJucyB0cnVlIGlmIHRoZSB1cmwgbWF0Y2ggdGhlIGN1cnJlbnQgZGVmaW5pdGlvbi5cclxuICogQHBhcmFtIHsoc3RyaW5nfFJlZ0V4cCk9fSBkYXRhIEhUVFAgcmVxdWVzdCBib2R5LlxyXG4gKiBAcGFyYW0geyhPYmplY3R8ZnVuY3Rpb24oT2JqZWN0KSk9fSBoZWFkZXJzIEhUVFAgaGVhZGVycyBvciBmdW5jdGlvbiB0aGF0IHJlY2VpdmVzIGh0dHAgaGVhZGVyXHJcbiAqICAgb2JqZWN0IGFuZCByZXR1cm5zIHRydWUgaWYgdGhlIGhlYWRlcnMgbWF0Y2ggdGhlIGN1cnJlbnQgZGVmaW5pdGlvbi5cclxuICogQHJldHVybnMge3JlcXVlc3RIYW5kbGVyfSBSZXR1cm5zIGFuIG9iamVjdCB3aXRoIGByZXNwb25kYCBhbmQgYHBhc3NUaHJvdWdoYCBtZXRob2RzIHRoYXRcclxuICogICBjb250cm9sIGhvdyBhIG1hdGNoZWQgcmVxdWVzdCBpcyBoYW5kbGVkLiBZb3UgY2FuIHNhdmUgdGhpcyBvYmplY3QgZm9yIGxhdGVyIHVzZSBhbmQgaW52b2tlXHJcbiAqICAgYHJlc3BvbmRgIG9yIGBwYXNzVGhyb3VnaGAgYWdhaW4gaW4gb3JkZXIgdG8gY2hhbmdlIGhvdyBhIG1hdGNoZWQgcmVxdWVzdCBpcyBoYW5kbGVkLlxyXG4gKlxyXG4gKiAgLSByZXNwb25kIOKAk1xyXG4gKiAgICBge2Z1bmN0aW9uKFtzdGF0dXMsXSBkYXRhWywgaGVhZGVycywgc3RhdHVzVGV4dF0pXHJcbiAqICAgIHwgZnVuY3Rpb24oZnVuY3Rpb24obWV0aG9kLCB1cmwsIGRhdGEsIGhlYWRlcnMpfWBcclxuICogICAg4oCTIFRoZSByZXNwb25kIG1ldGhvZCB0YWtlcyBhIHNldCBvZiBzdGF0aWMgZGF0YSB0byBiZSByZXR1cm5lZCBvciBhIGZ1bmN0aW9uIHRoYXQgY2FuIHJldHVyblxyXG4gKiAgICBhbiBhcnJheSBjb250YWluaW5nIHJlc3BvbnNlIHN0YXR1cyAobnVtYmVyKSwgcmVzcG9uc2UgZGF0YSAoc3RyaW5nKSwgcmVzcG9uc2UgaGVhZGVyc1xyXG4gKiAgICAoT2JqZWN0KSwgYW5kIHRoZSB0ZXh0IGZvciB0aGUgc3RhdHVzIChzdHJpbmcpLlxyXG4gKiAgLSBwYXNzVGhyb3VnaCDigJMgYHtmdW5jdGlvbigpfWAg4oCTIEFueSByZXF1ZXN0IG1hdGNoaW5nIGEgYmFja2VuZCBkZWZpbml0aW9uIHdpdGhcclxuICogICAgYHBhc3NUaHJvdWdoYCBoYW5kbGVyIHdpbGwgYmUgcGFzc2VkIHRocm91Z2ggdG8gdGhlIHJlYWwgYmFja2VuZCAoYW4gWEhSIHJlcXVlc3Qgd2lsbCBiZSBtYWRlXHJcbiAqICAgIHRvIHRoZSBzZXJ2ZXIuKVxyXG4gKiAgLSBCb3RoIG1ldGhvZHMgcmV0dXJuIHRoZSBgcmVxdWVzdEhhbmRsZXJgIG9iamVjdCBmb3IgcG9zc2libGUgb3ZlcnJpZGVzLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBAbmdkb2MgbWV0aG9kXHJcbiAqIEBuYW1lICRodHRwQmFja2VuZCN3aGVuR0VUXHJcbiAqIEBtb2R1bGUgbmdNb2NrRTJFXHJcbiAqIEBkZXNjcmlwdGlvblxyXG4gKiBDcmVhdGVzIGEgbmV3IGJhY2tlbmQgZGVmaW5pdGlvbiBmb3IgR0VUIHJlcXVlc3RzLiBGb3IgbW9yZSBpbmZvIHNlZSBgd2hlbigpYC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd8UmVnRXhwfGZ1bmN0aW9uKHN0cmluZyl9IHVybCBIVFRQIHVybCBvciBmdW5jdGlvbiB0aGF0IHJlY2VpdmVzIHRoZSB1cmxcclxuICogICBhbmQgcmV0dXJucyB0cnVlIGlmIHRoZSB1cmwgbWF0Y2ggdGhlIGN1cnJlbnQgZGVmaW5pdGlvbi5cclxuICogQHBhcmFtIHsoT2JqZWN0fGZ1bmN0aW9uKE9iamVjdCkpPX0gaGVhZGVycyBIVFRQIGhlYWRlcnMuXHJcbiAqIEByZXR1cm5zIHtyZXF1ZXN0SGFuZGxlcn0gUmV0dXJucyBhbiBvYmplY3Qgd2l0aCBgcmVzcG9uZGAgYW5kIGBwYXNzVGhyb3VnaGAgbWV0aG9kcyB0aGF0XHJcbiAqICAgY29udHJvbCBob3cgYSBtYXRjaGVkIHJlcXVlc3QgaXMgaGFuZGxlZC4gWW91IGNhbiBzYXZlIHRoaXMgb2JqZWN0IGZvciBsYXRlciB1c2UgYW5kIGludm9rZVxyXG4gKiAgIGByZXNwb25kYCBvciBgcGFzc1Rocm91Z2hgIGFnYWluIGluIG9yZGVyIHRvIGNoYW5nZSBob3cgYSBtYXRjaGVkIHJlcXVlc3QgaXMgaGFuZGxlZC5cclxuICovXHJcblxyXG4vKipcclxuICogQG5nZG9jIG1ldGhvZFxyXG4gKiBAbmFtZSAkaHR0cEJhY2tlbmQjd2hlbkhFQURcclxuICogQG1vZHVsZSBuZ01vY2tFMkVcclxuICogQGRlc2NyaXB0aW9uXHJcbiAqIENyZWF0ZXMgYSBuZXcgYmFja2VuZCBkZWZpbml0aW9uIGZvciBIRUFEIHJlcXVlc3RzLiBGb3IgbW9yZSBpbmZvIHNlZSBgd2hlbigpYC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd8UmVnRXhwfGZ1bmN0aW9uKHN0cmluZyl9IHVybCBIVFRQIHVybCBvciBmdW5jdGlvbiB0aGF0IHJlY2VpdmVzIHRoZSB1cmxcclxuICogICBhbmQgcmV0dXJucyB0cnVlIGlmIHRoZSB1cmwgbWF0Y2ggdGhlIGN1cnJlbnQgZGVmaW5pdGlvbi5cclxuICogQHBhcmFtIHsoT2JqZWN0fGZ1bmN0aW9uKE9iamVjdCkpPX0gaGVhZGVycyBIVFRQIGhlYWRlcnMuXHJcbiAqIEByZXR1cm5zIHtyZXF1ZXN0SGFuZGxlcn0gUmV0dXJucyBhbiBvYmplY3Qgd2l0aCBgcmVzcG9uZGAgYW5kIGBwYXNzVGhyb3VnaGAgbWV0aG9kcyB0aGF0XHJcbiAqICAgY29udHJvbCBob3cgYSBtYXRjaGVkIHJlcXVlc3QgaXMgaGFuZGxlZC4gWW91IGNhbiBzYXZlIHRoaXMgb2JqZWN0IGZvciBsYXRlciB1c2UgYW5kIGludm9rZVxyXG4gKiAgIGByZXNwb25kYCBvciBgcGFzc1Rocm91Z2hgIGFnYWluIGluIG9yZGVyIHRvIGNoYW5nZSBob3cgYSBtYXRjaGVkIHJlcXVlc3QgaXMgaGFuZGxlZC5cclxuICovXHJcblxyXG4vKipcclxuICogQG5nZG9jIG1ldGhvZFxyXG4gKiBAbmFtZSAkaHR0cEJhY2tlbmQjd2hlbkRFTEVURVxyXG4gKiBAbW9kdWxlIG5nTW9ja0UyRVxyXG4gKiBAZGVzY3JpcHRpb25cclxuICogQ3JlYXRlcyBhIG5ldyBiYWNrZW5kIGRlZmluaXRpb24gZm9yIERFTEVURSByZXF1ZXN0cy4gRm9yIG1vcmUgaW5mbyBzZWUgYHdoZW4oKWAuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfFJlZ0V4cHxmdW5jdGlvbihzdHJpbmcpfSB1cmwgSFRUUCB1cmwgb3IgZnVuY3Rpb24gdGhhdCByZWNlaXZlcyB0aGUgdXJsXHJcbiAqICAgYW5kIHJldHVybnMgdHJ1ZSBpZiB0aGUgdXJsIG1hdGNoIHRoZSBjdXJyZW50IGRlZmluaXRpb24uXHJcbiAqIEBwYXJhbSB7KE9iamVjdHxmdW5jdGlvbihPYmplY3QpKT19IGhlYWRlcnMgSFRUUCBoZWFkZXJzLlxyXG4gKiBAcmV0dXJucyB7cmVxdWVzdEhhbmRsZXJ9IFJldHVybnMgYW4gb2JqZWN0IHdpdGggYHJlc3BvbmRgIGFuZCBgcGFzc1Rocm91Z2hgIG1ldGhvZHMgdGhhdFxyXG4gKiAgIGNvbnRyb2wgaG93IGEgbWF0Y2hlZCByZXF1ZXN0IGlzIGhhbmRsZWQuIFlvdSBjYW4gc2F2ZSB0aGlzIG9iamVjdCBmb3IgbGF0ZXIgdXNlIGFuZCBpbnZva2VcclxuICogICBgcmVzcG9uZGAgb3IgYHBhc3NUaHJvdWdoYCBhZ2FpbiBpbiBvcmRlciB0byBjaGFuZ2UgaG93IGEgbWF0Y2hlZCByZXF1ZXN0IGlzIGhhbmRsZWQuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEBuZ2RvYyBtZXRob2RcclxuICogQG5hbWUgJGh0dHBCYWNrZW5kI3doZW5QT1NUXHJcbiAqIEBtb2R1bGUgbmdNb2NrRTJFXHJcbiAqIEBkZXNjcmlwdGlvblxyXG4gKiBDcmVhdGVzIGEgbmV3IGJhY2tlbmQgZGVmaW5pdGlvbiBmb3IgUE9TVCByZXF1ZXN0cy4gRm9yIG1vcmUgaW5mbyBzZWUgYHdoZW4oKWAuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfFJlZ0V4cHxmdW5jdGlvbihzdHJpbmcpfSB1cmwgSFRUUCB1cmwgb3IgZnVuY3Rpb24gdGhhdCByZWNlaXZlcyB0aGUgdXJsXHJcbiAqICAgYW5kIHJldHVybnMgdHJ1ZSBpZiB0aGUgdXJsIG1hdGNoIHRoZSBjdXJyZW50IGRlZmluaXRpb24uXHJcbiAqIEBwYXJhbSB7KHN0cmluZ3xSZWdFeHApPX0gZGF0YSBIVFRQIHJlcXVlc3QgYm9keS5cclxuICogQHBhcmFtIHsoT2JqZWN0fGZ1bmN0aW9uKE9iamVjdCkpPX0gaGVhZGVycyBIVFRQIGhlYWRlcnMuXHJcbiAqIEByZXR1cm5zIHtyZXF1ZXN0SGFuZGxlcn0gUmV0dXJucyBhbiBvYmplY3Qgd2l0aCBgcmVzcG9uZGAgYW5kIGBwYXNzVGhyb3VnaGAgbWV0aG9kcyB0aGF0XHJcbiAqICAgY29udHJvbCBob3cgYSBtYXRjaGVkIHJlcXVlc3QgaXMgaGFuZGxlZC4gWW91IGNhbiBzYXZlIHRoaXMgb2JqZWN0IGZvciBsYXRlciB1c2UgYW5kIGludm9rZVxyXG4gKiAgIGByZXNwb25kYCBvciBgcGFzc1Rocm91Z2hgIGFnYWluIGluIG9yZGVyIHRvIGNoYW5nZSBob3cgYSBtYXRjaGVkIHJlcXVlc3QgaXMgaGFuZGxlZC5cclxuICovXHJcblxyXG4vKipcclxuICogQG5nZG9jIG1ldGhvZFxyXG4gKiBAbmFtZSAkaHR0cEJhY2tlbmQjd2hlblBVVFxyXG4gKiBAbW9kdWxlIG5nTW9ja0UyRVxyXG4gKiBAZGVzY3JpcHRpb25cclxuICogQ3JlYXRlcyBhIG5ldyBiYWNrZW5kIGRlZmluaXRpb24gZm9yIFBVVCByZXF1ZXN0cy4gIEZvciBtb3JlIGluZm8gc2VlIGB3aGVuKClgLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ3xSZWdFeHB8ZnVuY3Rpb24oc3RyaW5nKX0gdXJsIEhUVFAgdXJsIG9yIGZ1bmN0aW9uIHRoYXQgcmVjZWl2ZXMgdGhlIHVybFxyXG4gKiAgIGFuZCByZXR1cm5zIHRydWUgaWYgdGhlIHVybCBtYXRjaCB0aGUgY3VycmVudCBkZWZpbml0aW9uLlxyXG4gKiBAcGFyYW0geyhzdHJpbmd8UmVnRXhwKT19IGRhdGEgSFRUUCByZXF1ZXN0IGJvZHkuXHJcbiAqIEBwYXJhbSB7KE9iamVjdHxmdW5jdGlvbihPYmplY3QpKT19IGhlYWRlcnMgSFRUUCBoZWFkZXJzLlxyXG4gKiBAcmV0dXJucyB7cmVxdWVzdEhhbmRsZXJ9IFJldHVybnMgYW4gb2JqZWN0IHdpdGggYHJlc3BvbmRgIGFuZCBgcGFzc1Rocm91Z2hgIG1ldGhvZHMgdGhhdFxyXG4gKiAgIGNvbnRyb2wgaG93IGEgbWF0Y2hlZCByZXF1ZXN0IGlzIGhhbmRsZWQuIFlvdSBjYW4gc2F2ZSB0aGlzIG9iamVjdCBmb3IgbGF0ZXIgdXNlIGFuZCBpbnZva2VcclxuICogICBgcmVzcG9uZGAgb3IgYHBhc3NUaHJvdWdoYCBhZ2FpbiBpbiBvcmRlciB0byBjaGFuZ2UgaG93IGEgbWF0Y2hlZCByZXF1ZXN0IGlzIGhhbmRsZWQuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEBuZ2RvYyBtZXRob2RcclxuICogQG5hbWUgJGh0dHBCYWNrZW5kI3doZW5QQVRDSFxyXG4gKiBAbW9kdWxlIG5nTW9ja0UyRVxyXG4gKiBAZGVzY3JpcHRpb25cclxuICogQ3JlYXRlcyBhIG5ldyBiYWNrZW5kIGRlZmluaXRpb24gZm9yIFBBVENIIHJlcXVlc3RzLiAgRm9yIG1vcmUgaW5mbyBzZWUgYHdoZW4oKWAuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfFJlZ0V4cHxmdW5jdGlvbihzdHJpbmcpfSB1cmwgSFRUUCB1cmwgb3IgZnVuY3Rpb24gdGhhdCByZWNlaXZlcyB0aGUgdXJsXHJcbiAqICAgYW5kIHJldHVybnMgdHJ1ZSBpZiB0aGUgdXJsIG1hdGNoIHRoZSBjdXJyZW50IGRlZmluaXRpb24uXHJcbiAqIEBwYXJhbSB7KHN0cmluZ3xSZWdFeHApPX0gZGF0YSBIVFRQIHJlcXVlc3QgYm9keS5cclxuICogQHBhcmFtIHsoT2JqZWN0fGZ1bmN0aW9uKE9iamVjdCkpPX0gaGVhZGVycyBIVFRQIGhlYWRlcnMuXHJcbiAqIEByZXR1cm5zIHtyZXF1ZXN0SGFuZGxlcn0gUmV0dXJucyBhbiBvYmplY3Qgd2l0aCBgcmVzcG9uZGAgYW5kIGBwYXNzVGhyb3VnaGAgbWV0aG9kcyB0aGF0XHJcbiAqICAgY29udHJvbCBob3cgYSBtYXRjaGVkIHJlcXVlc3QgaXMgaGFuZGxlZC4gWW91IGNhbiBzYXZlIHRoaXMgb2JqZWN0IGZvciBsYXRlciB1c2UgYW5kIGludm9rZVxyXG4gKiAgIGByZXNwb25kYCBvciBgcGFzc1Rocm91Z2hgIGFnYWluIGluIG9yZGVyIHRvIGNoYW5nZSBob3cgYSBtYXRjaGVkIHJlcXVlc3QgaXMgaGFuZGxlZC5cclxuICovXHJcblxyXG4vKipcclxuICogQG5nZG9jIG1ldGhvZFxyXG4gKiBAbmFtZSAkaHR0cEJhY2tlbmQjd2hlbkpTT05QXHJcbiAqIEBtb2R1bGUgbmdNb2NrRTJFXHJcbiAqIEBkZXNjcmlwdGlvblxyXG4gKiBDcmVhdGVzIGEgbmV3IGJhY2tlbmQgZGVmaW5pdGlvbiBmb3IgSlNPTlAgcmVxdWVzdHMuIEZvciBtb3JlIGluZm8gc2VlIGB3aGVuKClgLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ3xSZWdFeHB8ZnVuY3Rpb24oc3RyaW5nKX0gdXJsIEhUVFAgdXJsIG9yIGZ1bmN0aW9uIHRoYXQgcmVjZWl2ZXMgdGhlIHVybFxyXG4gKiAgIGFuZCByZXR1cm5zIHRydWUgaWYgdGhlIHVybCBtYXRjaCB0aGUgY3VycmVudCBkZWZpbml0aW9uLlxyXG4gKiBAcmV0dXJucyB7cmVxdWVzdEhhbmRsZXJ9IFJldHVybnMgYW4gb2JqZWN0IHdpdGggYHJlc3BvbmRgIGFuZCBgcGFzc1Rocm91Z2hgIG1ldGhvZHMgdGhhdFxyXG4gKiAgIGNvbnRyb2wgaG93IGEgbWF0Y2hlZCByZXF1ZXN0IGlzIGhhbmRsZWQuIFlvdSBjYW4gc2F2ZSB0aGlzIG9iamVjdCBmb3IgbGF0ZXIgdXNlIGFuZCBpbnZva2VcclxuICogICBgcmVzcG9uZGAgb3IgYHBhc3NUaHJvdWdoYCBhZ2FpbiBpbiBvcmRlciB0byBjaGFuZ2UgaG93IGEgbWF0Y2hlZCByZXF1ZXN0IGlzIGhhbmRsZWQuXHJcbiAqL1xyXG5hbmd1bGFyLm1vY2suZTJlID0ge307XHJcbmFuZ3VsYXIubW9jay5lMmUuJGh0dHBCYWNrZW5kRGVjb3JhdG9yID1cclxuICBbJyRyb290U2NvcGUnLCAnJHRpbWVvdXQnLCAnJGRlbGVnYXRlJywgJyRicm93c2VyJywgY3JlYXRlSHR0cEJhY2tlbmRNb2NrXTtcclxuXHJcblxyXG4vKipcclxuICogQG5nZG9jIHR5cGVcclxuICogQG5hbWUgJHJvb3RTY29wZS5TY29wZVxyXG4gKiBAbW9kdWxlIG5nTW9ja1xyXG4gKiBAZGVzY3JpcHRpb25cclxuICoge0BsaW5rIG5nLiRyb290U2NvcGUuU2NvcGUgU2NvcGV9IHR5cGUgZGVjb3JhdGVkIHdpdGggaGVscGVyIG1ldGhvZHMgdXNlZnVsIGZvciB0ZXN0aW5nLiBUaGVzZVxyXG4gKiBtZXRob2RzIGFyZSBhdXRvbWF0aWNhbGx5IGF2YWlsYWJsZSBvbiBhbnkge0BsaW5rIG5nLiRyb290U2NvcGUuU2NvcGUgU2NvcGV9IGluc3RhbmNlIHdoZW5cclxuICogYG5nTW9ja2AgbW9kdWxlIGlzIGxvYWRlZC5cclxuICpcclxuICogSW4gYWRkaXRpb24gdG8gYWxsIHRoZSByZWd1bGFyIGBTY29wZWAgbWV0aG9kcywgdGhlIGZvbGxvd2luZyBoZWxwZXIgbWV0aG9kcyBhcmUgYXZhaWxhYmxlOlxyXG4gKi9cclxuYW5ndWxhci5tb2NrLiRSb290U2NvcGVEZWNvcmF0b3IgPSBbJyRkZWxlZ2F0ZScsIGZ1bmN0aW9uKCRkZWxlZ2F0ZSkge1xyXG5cclxuICB2YXIgJHJvb3RTY29wZVByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZigkZGVsZWdhdGUpO1xyXG5cclxuICAkcm9vdFNjb3BlUHJvdG90eXBlLiRjb3VudENoaWxkU2NvcGVzID0gY291bnRDaGlsZFNjb3BlcztcclxuICAkcm9vdFNjb3BlUHJvdG90eXBlLiRjb3VudFdhdGNoZXJzID0gY291bnRXYXRjaGVycztcclxuXHJcbiAgcmV0dXJuICRkZWxlZ2F0ZTtcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXHJcblxyXG4gIC8qKlxyXG4gICAqIEBuZ2RvYyBtZXRob2RcclxuICAgKiBAbmFtZSAkcm9vdFNjb3BlLlNjb3BlIyRjb3VudENoaWxkU2NvcGVzXHJcbiAgICogQG1vZHVsZSBuZ01vY2tcclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKiBDb3VudHMgYWxsIHRoZSBkaXJlY3QgYW5kIGluZGlyZWN0IGNoaWxkIHNjb3BlcyBvZiB0aGUgY3VycmVudCBzY29wZS5cclxuICAgKlxyXG4gICAqIFRoZSBjdXJyZW50IHNjb3BlIGlzIGV4Y2x1ZGVkIGZyb20gdGhlIGNvdW50LiBUaGUgY291bnQgaW5jbHVkZXMgYWxsIGlzb2xhdGUgY2hpbGQgc2NvcGVzLlxyXG4gICAqXHJcbiAgICogQHJldHVybnMge251bWJlcn0gVG90YWwgbnVtYmVyIG9mIGNoaWxkIHNjb3Blcy5cclxuICAgKi9cclxuICBmdW5jdGlvbiBjb3VudENoaWxkU2NvcGVzKCkge1xyXG4gICAgLy8ganNoaW50IHZhbGlkdGhpczogdHJ1ZVxyXG4gICAgdmFyIGNvdW50ID0gMDsgLy8gZXhjbHVkZSB0aGUgY3VycmVudCBzY29wZVxyXG4gICAgdmFyIHBlbmRpbmdDaGlsZEhlYWRzID0gW3RoaXMuJCRjaGlsZEhlYWRdO1xyXG4gICAgdmFyIGN1cnJlbnRTY29wZTtcclxuXHJcbiAgICB3aGlsZSAocGVuZGluZ0NoaWxkSGVhZHMubGVuZ3RoKSB7XHJcbiAgICAgIGN1cnJlbnRTY29wZSA9IHBlbmRpbmdDaGlsZEhlYWRzLnNoaWZ0KCk7XHJcblxyXG4gICAgICB3aGlsZSAoY3VycmVudFNjb3BlKSB7XHJcbiAgICAgICAgY291bnQgKz0gMTtcclxuICAgICAgICBwZW5kaW5nQ2hpbGRIZWFkcy5wdXNoKGN1cnJlbnRTY29wZS4kJGNoaWxkSGVhZCk7XHJcbiAgICAgICAgY3VycmVudFNjb3BlID0gY3VycmVudFNjb3BlLiQkbmV4dFNpYmxpbmc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY291bnQ7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAqIEBuYW1lICRyb290U2NvcGUuU2NvcGUjJGNvdW50V2F0Y2hlcnNcclxuICAgKiBAbW9kdWxlIG5nTW9ja1xyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqIENvdW50cyBhbGwgdGhlIHdhdGNoZXJzIG9mIGRpcmVjdCBhbmQgaW5kaXJlY3QgY2hpbGQgc2NvcGVzIG9mIHRoZSBjdXJyZW50IHNjb3BlLlxyXG4gICAqXHJcbiAgICogVGhlIHdhdGNoZXJzIG9mIHRoZSBjdXJyZW50IHNjb3BlIGFyZSBpbmNsdWRlZCBpbiB0aGUgY291bnQgYW5kIHNvIGFyZSBhbGwgdGhlIHdhdGNoZXJzIG9mXHJcbiAgICogaXNvbGF0ZSBjaGlsZCBzY29wZXMuXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUb3RhbCBudW1iZXIgb2Ygd2F0Y2hlcnMuXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gY291bnRXYXRjaGVycygpIHtcclxuICAgIC8vIGpzaGludCB2YWxpZHRoaXM6IHRydWVcclxuICAgIHZhciBjb3VudCA9IHRoaXMuJCR3YXRjaGVycyA/IHRoaXMuJCR3YXRjaGVycy5sZW5ndGggOiAwOyAvLyBpbmNsdWRlIHRoZSBjdXJyZW50IHNjb3BlXHJcbiAgICB2YXIgcGVuZGluZ0NoaWxkSGVhZHMgPSBbdGhpcy4kJGNoaWxkSGVhZF07XHJcbiAgICB2YXIgY3VycmVudFNjb3BlO1xyXG5cclxuICAgIHdoaWxlIChwZW5kaW5nQ2hpbGRIZWFkcy5sZW5ndGgpIHtcclxuICAgICAgY3VycmVudFNjb3BlID0gcGVuZGluZ0NoaWxkSGVhZHMuc2hpZnQoKTtcclxuXHJcbiAgICAgIHdoaWxlIChjdXJyZW50U2NvcGUpIHtcclxuICAgICAgICBjb3VudCArPSBjdXJyZW50U2NvcGUuJCR3YXRjaGVycyA/IGN1cnJlbnRTY29wZS4kJHdhdGNoZXJzLmxlbmd0aCA6IDA7XHJcbiAgICAgICAgcGVuZGluZ0NoaWxkSGVhZHMucHVzaChjdXJyZW50U2NvcGUuJCRjaGlsZEhlYWQpO1xyXG4gICAgICAgIGN1cnJlbnRTY29wZSA9IGN1cnJlbnRTY29wZS4kJG5leHRTaWJsaW5nO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNvdW50O1xyXG4gIH1cclxufV07XHJcblxyXG5cclxuaWYgKHdpbmRvdy5qYXNtaW5lIHx8IHdpbmRvdy5tb2NoYSkge1xyXG5cclxuICB2YXIgY3VycmVudFNwZWMgPSBudWxsLFxyXG4gICAgICBhbm5vdGF0ZWRGdW5jdGlvbnMgPSBbXSxcclxuICAgICAgaXNTcGVjUnVubmluZyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiAhIWN1cnJlbnRTcGVjO1xyXG4gICAgICB9O1xyXG5cclxuICBhbmd1bGFyLm1vY2suJCRhbm5vdGF0ZSA9IGFuZ3VsYXIuaW5qZWN0b3IuJCRhbm5vdGF0ZTtcclxuICBhbmd1bGFyLmluamVjdG9yLiQkYW5ub3RhdGUgPSBmdW5jdGlvbihmbikge1xyXG4gICAgaWYgKHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJyAmJiAhZm4uJGluamVjdCkge1xyXG4gICAgICBhbm5vdGF0ZWRGdW5jdGlvbnMucHVzaChmbik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYW5ndWxhci5tb2NrLiQkYW5ub3RhdGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICB9O1xyXG5cclxuXHJcbiAgKHdpbmRvdy5iZWZvcmVFYWNoIHx8IHdpbmRvdy5zZXR1cCkoZnVuY3Rpb24oKSB7XHJcbiAgICBhbm5vdGF0ZWRGdW5jdGlvbnMgPSBbXTtcclxuICAgIGN1cnJlbnRTcGVjID0gdGhpcztcclxuICB9KTtcclxuXHJcbiAgKHdpbmRvdy5hZnRlckVhY2ggfHwgd2luZG93LnRlYXJkb3duKShmdW5jdGlvbigpIHtcclxuICAgIHZhciBpbmplY3RvciA9IGN1cnJlbnRTcGVjLiRpbmplY3RvcjtcclxuXHJcbiAgICBhbm5vdGF0ZWRGdW5jdGlvbnMuZm9yRWFjaChmdW5jdGlvbihmbikge1xyXG4gICAgICBkZWxldGUgZm4uJGluamVjdDtcclxuICAgIH0pO1xyXG5cclxuICAgIGFuZ3VsYXIuZm9yRWFjaChjdXJyZW50U3BlYy4kbW9kdWxlcywgZnVuY3Rpb24obW9kdWxlKSB7XHJcbiAgICAgIGlmIChtb2R1bGUgJiYgbW9kdWxlLiQkaGFzaEtleSkge1xyXG4gICAgICAgIG1vZHVsZS4kJGhhc2hLZXkgPSB1bmRlZmluZWQ7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGN1cnJlbnRTcGVjLiRpbmplY3RvciA9IG51bGw7XHJcbiAgICBjdXJyZW50U3BlYy4kbW9kdWxlcyA9IG51bGw7XHJcbiAgICBjdXJyZW50U3BlYyA9IG51bGw7XHJcblxyXG4gICAgaWYgKGluamVjdG9yKSB7XHJcbiAgICAgIGluamVjdG9yLmdldCgnJHJvb3RFbGVtZW50Jykub2ZmKCk7XHJcbiAgICAgIHZhciAkYnJvd3NlciA9IGluamVjdG9yLmdldCgnJGJyb3dzZXInKTtcclxuICAgICAgaWYgKCRicm93c2VyLnBvbGxGbnMpICRicm93c2VyLnBvbGxGbnMubGVuZ3RoID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjbGVhbiB1cCBqcXVlcnkncyBmcmFnbWVudCBjYWNoZVxyXG4gICAgYW5ndWxhci5mb3JFYWNoKGFuZ3VsYXIuZWxlbWVudC5mcmFnbWVudHMsIGZ1bmN0aW9uKHZhbCwga2V5KSB7XHJcbiAgICAgIGRlbGV0ZSBhbmd1bGFyLmVsZW1lbnQuZnJhZ21lbnRzW2tleV07XHJcbiAgICB9KTtcclxuXHJcbiAgICBNb2NrWGhyLiQkbGFzdEluc3RhbmNlID0gbnVsbDtcclxuXHJcbiAgICBhbmd1bGFyLmZvckVhY2goYW5ndWxhci5jYWxsYmFja3MsIGZ1bmN0aW9uKHZhbCwga2V5KSB7XHJcbiAgICAgIGRlbGV0ZSBhbmd1bGFyLmNhbGxiYWNrc1trZXldO1xyXG4gICAgfSk7XHJcbiAgICBhbmd1bGFyLmNhbGxiYWNrcy5jb3VudGVyID0gMDtcclxuICB9KTtcclxuXHJcbiAgLyoqXHJcbiAgICogQG5nZG9jIGZ1bmN0aW9uXHJcbiAgICogQG5hbWUgYW5ndWxhci5tb2NrLm1vZHVsZVxyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqXHJcbiAgICogKk5PVEUqOiBUaGlzIGZ1bmN0aW9uIGlzIGFsc28gcHVibGlzaGVkIG9uIHdpbmRvdyBmb3IgZWFzeSBhY2Nlc3MuPGJyPlxyXG4gICAqICpOT1RFKjogVGhpcyBmdW5jdGlvbiBpcyBkZWNsYXJlZCBPTkxZIFdIRU4gcnVubmluZyB0ZXN0cyB3aXRoIGphc21pbmUgb3IgbW9jaGFcclxuICAgKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gcmVnaXN0ZXJzIGEgbW9kdWxlIGNvbmZpZ3VyYXRpb24gY29kZS4gSXQgY29sbGVjdHMgdGhlIGNvbmZpZ3VyYXRpb24gaW5mb3JtYXRpb25cclxuICAgKiB3aGljaCB3aWxsIGJlIHVzZWQgd2hlbiB0aGUgaW5qZWN0b3IgaXMgY3JlYXRlZCBieSB7QGxpbmsgYW5ndWxhci5tb2NrLmluamVjdCBpbmplY3R9LlxyXG4gICAqXHJcbiAgICogU2VlIHtAbGluayBhbmd1bGFyLm1vY2suaW5qZWN0IGluamVjdH0gZm9yIHVzYWdlIGV4YW1wbGVcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7Li4uKHN0cmluZ3xGdW5jdGlvbnxPYmplY3QpfSBmbnMgYW55IG51bWJlciBvZiBtb2R1bGVzIHdoaWNoIGFyZSByZXByZXNlbnRlZCBhcyBzdHJpbmdcclxuICAgKiAgICAgICAgYWxpYXNlcyBvciBhcyBhbm9ueW1vdXMgbW9kdWxlIGluaXRpYWxpemF0aW9uIGZ1bmN0aW9ucy4gVGhlIG1vZHVsZXMgYXJlIHVzZWQgdG9cclxuICAgKiAgICAgICAgY29uZmlndXJlIHRoZSBpbmplY3Rvci4gVGhlICduZycgYW5kICduZ01vY2snIG1vZHVsZXMgYXJlIGF1dG9tYXRpY2FsbHkgbG9hZGVkLiBJZiBhblxyXG4gICAqICAgICAgICBvYmplY3QgbGl0ZXJhbCBpcyBwYXNzZWQgdGhleSB3aWxsIGJlIHJlZ2lzdGVyZWQgYXMgdmFsdWVzIGluIHRoZSBtb2R1bGUsIHRoZSBrZXkgYmVpbmdcclxuICAgKiAgICAgICAgdGhlIG1vZHVsZSBuYW1lIGFuZCB0aGUgdmFsdWUgYmVpbmcgd2hhdCBpcyByZXR1cm5lZC5cclxuICAgKi9cclxuICB3aW5kb3cubW9kdWxlID0gYW5ndWxhci5tb2NrLm1vZHVsZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIG1vZHVsZUZucyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XHJcbiAgICByZXR1cm4gaXNTcGVjUnVubmluZygpID8gd29ya0ZuKCkgOiB3b3JrRm47XHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIGZ1bmN0aW9uIHdvcmtGbigpIHtcclxuICAgICAgaWYgKGN1cnJlbnRTcGVjLiRpbmplY3Rvcikge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW5qZWN0b3IgYWxyZWFkeSBjcmVhdGVkLCBjYW4gbm90IHJlZ2lzdGVyIGEgbW9kdWxlIScpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBtb2R1bGVzID0gY3VycmVudFNwZWMuJG1vZHVsZXMgfHwgKGN1cnJlbnRTcGVjLiRtb2R1bGVzID0gW10pO1xyXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaChtb2R1bGVGbnMsIGZ1bmN0aW9uKG1vZHVsZSkge1xyXG4gICAgICAgICAgaWYgKGFuZ3VsYXIuaXNPYmplY3QobW9kdWxlKSAmJiAhYW5ndWxhci5pc0FycmF5KG1vZHVsZSkpIHtcclxuICAgICAgICAgICAgbW9kdWxlcy5wdXNoKGZ1bmN0aW9uKCRwcm92aWRlKSB7XHJcbiAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKG1vZHVsZSwgZnVuY3Rpb24odmFsdWUsIGtleSkge1xyXG4gICAgICAgICAgICAgICAgJHByb3ZpZGUudmFsdWUoa2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbW9kdWxlcy5wdXNoKG1vZHVsZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBAbmdkb2MgZnVuY3Rpb25cclxuICAgKiBAbmFtZSBhbmd1bGFyLm1vY2suaW5qZWN0XHJcbiAgICogQGRlc2NyaXB0aW9uXHJcbiAgICpcclxuICAgKiAqTk9URSo6IFRoaXMgZnVuY3Rpb24gaXMgYWxzbyBwdWJsaXNoZWQgb24gd2luZG93IGZvciBlYXN5IGFjY2Vzcy48YnI+XHJcbiAgICogKk5PVEUqOiBUaGlzIGZ1bmN0aW9uIGlzIGRlY2xhcmVkIE9OTFkgV0hFTiBydW5uaW5nIHRlc3RzIHdpdGggamFzbWluZSBvciBtb2NoYVxyXG4gICAqXHJcbiAgICogVGhlIGluamVjdCBmdW5jdGlvbiB3cmFwcyBhIGZ1bmN0aW9uIGludG8gYW4gaW5qZWN0YWJsZSBmdW5jdGlvbi4gVGhlIGluamVjdCgpIGNyZWF0ZXMgbmV3XHJcbiAgICogaW5zdGFuY2Ugb2Yge0BsaW5rIGF1dG8uJGluamVjdG9yICRpbmplY3Rvcn0gcGVyIHRlc3QsIHdoaWNoIGlzIHRoZW4gdXNlZCBmb3JcclxuICAgKiByZXNvbHZpbmcgcmVmZXJlbmNlcy5cclxuICAgKlxyXG4gICAqXHJcbiAgICogIyMgUmVzb2x2aW5nIFJlZmVyZW5jZXMgKFVuZGVyc2NvcmUgV3JhcHBpbmcpXHJcbiAgICogT2Z0ZW4sIHdlIHdvdWxkIGxpa2UgdG8gaW5qZWN0IGEgcmVmZXJlbmNlIG9uY2UsIGluIGEgYGJlZm9yZUVhY2goKWAgYmxvY2sgYW5kIHJldXNlIHRoaXNcclxuICAgKiBpbiBtdWx0aXBsZSBgaXQoKWAgY2xhdXNlcy4gVG8gYmUgYWJsZSB0byBkbyB0aGlzIHdlIG11c3QgYXNzaWduIHRoZSByZWZlcmVuY2UgdG8gYSB2YXJpYWJsZVxyXG4gICAqIHRoYXQgaXMgZGVjbGFyZWQgaW4gdGhlIHNjb3BlIG9mIHRoZSBgZGVzY3JpYmUoKWAgYmxvY2suIFNpbmNlIHdlIHdvdWxkLCBtb3N0IGxpa2VseSwgd2FudFxyXG4gICAqIHRoZSB2YXJpYWJsZSB0byBoYXZlIHRoZSBzYW1lIG5hbWUgb2YgdGhlIHJlZmVyZW5jZSB3ZSBoYXZlIGEgcHJvYmxlbSwgc2luY2UgdGhlIHBhcmFtZXRlclxyXG4gICAqIHRvIHRoZSBgaW5qZWN0KClgIGZ1bmN0aW9uIHdvdWxkIGhpZGUgdGhlIG91dGVyIHZhcmlhYmxlLlxyXG4gICAqXHJcbiAgICogVG8gaGVscCB3aXRoIHRoaXMsIHRoZSBpbmplY3RlZCBwYXJhbWV0ZXJzIGNhbiwgb3B0aW9uYWxseSwgYmUgZW5jbG9zZWQgd2l0aCB1bmRlcnNjb3Jlcy5cclxuICAgKiBUaGVzZSBhcmUgaWdub3JlZCBieSB0aGUgaW5qZWN0b3Igd2hlbiB0aGUgcmVmZXJlbmNlIG5hbWUgaXMgcmVzb2x2ZWQuXHJcbiAgICpcclxuICAgKiBGb3IgZXhhbXBsZSwgdGhlIHBhcmFtZXRlciBgX215U2VydmljZV9gIHdvdWxkIGJlIHJlc29sdmVkIGFzIHRoZSByZWZlcmVuY2UgYG15U2VydmljZWAuXHJcbiAgICogU2luY2UgaXQgaXMgYXZhaWxhYmxlIGluIHRoZSBmdW5jdGlvbiBib2R5IGFzIF9teVNlcnZpY2VfLCB3ZSBjYW4gdGhlbiBhc3NpZ24gaXQgdG8gYSB2YXJpYWJsZVxyXG4gICAqIGRlZmluZWQgaW4gYW4gb3V0ZXIgc2NvcGUuXHJcbiAgICpcclxuICAgKiBgYGBcclxuICAgKiAvLyBEZWZpbmVkIG91dCByZWZlcmVuY2UgdmFyaWFibGUgb3V0c2lkZVxyXG4gICAqIHZhciBteVNlcnZpY2U7XHJcbiAgICpcclxuICAgKiAvLyBXcmFwIHRoZSBwYXJhbWV0ZXIgaW4gdW5kZXJzY29yZXNcclxuICAgKiBiZWZvcmVFYWNoKCBpbmplY3QoIGZ1bmN0aW9uKF9teVNlcnZpY2VfKXtcclxuICAgKiAgIG15U2VydmljZSA9IF9teVNlcnZpY2VfO1xyXG4gICAqIH0pKTtcclxuICAgKlxyXG4gICAqIC8vIFVzZSBteVNlcnZpY2UgaW4gYSBzZXJpZXMgb2YgdGVzdHMuXHJcbiAgICogaXQoJ21ha2VzIHVzZSBvZiBteVNlcnZpY2UnLCBmdW5jdGlvbigpIHtcclxuICAgKiAgIG15U2VydmljZS5kb1N0dWZmKCk7XHJcbiAgICogfSk7XHJcbiAgICpcclxuICAgKiBgYGBcclxuICAgKlxyXG4gICAqIFNlZSBhbHNvIHtAbGluayBhbmd1bGFyLm1vY2subW9kdWxlIGFuZ3VsYXIubW9jay5tb2R1bGV9XHJcbiAgICpcclxuICAgKiAjIyBFeGFtcGxlXHJcbiAgICogRXhhbXBsZSBvZiB3aGF0IGEgdHlwaWNhbCBqYXNtaW5lIHRlc3RzIGxvb2tzIGxpa2Ugd2l0aCB0aGUgaW5qZWN0IG1ldGhvZC5cclxuICAgKiBgYGBqc1xyXG4gICAqXHJcbiAgICogICBhbmd1bGFyLm1vZHVsZSgnbXlBcHBsaWNhdGlvbk1vZHVsZScsIFtdKVxyXG4gICAqICAgICAgIC52YWx1ZSgnbW9kZScsICdhcHAnKVxyXG4gICAqICAgICAgIC52YWx1ZSgndmVyc2lvbicsICd2MS4wLjEnKTtcclxuICAgKlxyXG4gICAqXHJcbiAgICogICBkZXNjcmliZSgnTXlBcHAnLCBmdW5jdGlvbigpIHtcclxuICAgKlxyXG4gICAqICAgICAvLyBZb3UgbmVlZCB0byBsb2FkIG1vZHVsZXMgdGhhdCB5b3Ugd2FudCB0byB0ZXN0LFxyXG4gICAqICAgICAvLyBpdCBsb2FkcyBvbmx5IHRoZSBcIm5nXCIgbW9kdWxlIGJ5IGRlZmF1bHQuXHJcbiAgICogICAgIGJlZm9yZUVhY2gobW9kdWxlKCdteUFwcGxpY2F0aW9uTW9kdWxlJykpO1xyXG4gICAqXHJcbiAgICpcclxuICAgKiAgICAgLy8gaW5qZWN0KCkgaXMgdXNlZCB0byBpbmplY3QgYXJndW1lbnRzIG9mIGFsbCBnaXZlbiBmdW5jdGlvbnNcclxuICAgKiAgICAgaXQoJ3Nob3VsZCBwcm92aWRlIGEgdmVyc2lvbicsIGluamVjdChmdW5jdGlvbihtb2RlLCB2ZXJzaW9uKSB7XHJcbiAgICogICAgICAgZXhwZWN0KHZlcnNpb24pLnRvRXF1YWwoJ3YxLjAuMScpO1xyXG4gICAqICAgICAgIGV4cGVjdChtb2RlKS50b0VxdWFsKCdhcHAnKTtcclxuICAgKiAgICAgfSkpO1xyXG4gICAqXHJcbiAgICpcclxuICAgKiAgICAgLy8gVGhlIGluamVjdCBhbmQgbW9kdWxlIG1ldGhvZCBjYW4gYWxzbyBiZSB1c2VkIGluc2lkZSBvZiB0aGUgaXQgb3IgYmVmb3JlRWFjaFxyXG4gICAqICAgICBpdCgnc2hvdWxkIG92ZXJyaWRlIGEgdmVyc2lvbiBhbmQgdGVzdCB0aGUgbmV3IHZlcnNpb24gaXMgaW5qZWN0ZWQnLCBmdW5jdGlvbigpIHtcclxuICAgKiAgICAgICAvLyBtb2R1bGUoKSB0YWtlcyBmdW5jdGlvbnMgb3Igc3RyaW5ncyAobW9kdWxlIGFsaWFzZXMpXHJcbiAgICogICAgICAgbW9kdWxlKGZ1bmN0aW9uKCRwcm92aWRlKSB7XHJcbiAgICogICAgICAgICAkcHJvdmlkZS52YWx1ZSgndmVyc2lvbicsICdvdmVycmlkZGVuJyk7IC8vIG92ZXJyaWRlIHZlcnNpb24gaGVyZVxyXG4gICAqICAgICAgIH0pO1xyXG4gICAqXHJcbiAgICogICAgICAgaW5qZWN0KGZ1bmN0aW9uKHZlcnNpb24pIHtcclxuICAgKiAgICAgICAgIGV4cGVjdCh2ZXJzaW9uKS50b0VxdWFsKCdvdmVycmlkZGVuJyk7XHJcbiAgICogICAgICAgfSk7XHJcbiAgICogICAgIH0pO1xyXG4gICAqICAgfSk7XHJcbiAgICpcclxuICAgKiBgYGBcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7Li4uRnVuY3Rpb259IGZucyBhbnkgbnVtYmVyIG9mIGZ1bmN0aW9ucyB3aGljaCB3aWxsIGJlIGluamVjdGVkIHVzaW5nIHRoZSBpbmplY3Rvci5cclxuICAgKi9cclxuXHJcblxyXG5cclxuICB2YXIgRXJyb3JBZGRpbmdEZWNsYXJhdGlvbkxvY2F0aW9uU3RhY2sgPSBmdW5jdGlvbihlLCBlcnJvckZvclN0YWNrKSB7XHJcbiAgICB0aGlzLm1lc3NhZ2UgPSBlLm1lc3NhZ2U7XHJcbiAgICB0aGlzLm5hbWUgPSBlLm5hbWU7XHJcbiAgICBpZiAoZS5saW5lKSB0aGlzLmxpbmUgPSBlLmxpbmU7XHJcbiAgICBpZiAoZS5zb3VyY2VJZCkgdGhpcy5zb3VyY2VJZCA9IGUuc291cmNlSWQ7XHJcbiAgICBpZiAoZS5zdGFjayAmJiBlcnJvckZvclN0YWNrKVxyXG4gICAgICB0aGlzLnN0YWNrID0gZS5zdGFjayArICdcXG4nICsgZXJyb3JGb3JTdGFjay5zdGFjaztcclxuICAgIGlmIChlLnN0YWNrQXJyYXkpIHRoaXMuc3RhY2tBcnJheSA9IGUuc3RhY2tBcnJheTtcclxuICB9O1xyXG4gIEVycm9yQWRkaW5nRGVjbGFyYXRpb25Mb2NhdGlvblN0YWNrLnByb3RvdHlwZS50b1N0cmluZyA9IEVycm9yLnByb3RvdHlwZS50b1N0cmluZztcclxuXHJcbiAgd2luZG93LmluamVjdCA9IGFuZ3VsYXIubW9jay5pbmplY3QgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBibG9ja0ZucyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XHJcbiAgICB2YXIgZXJyb3JGb3JTdGFjayA9IG5ldyBFcnJvcignRGVjbGFyYXRpb24gTG9jYXRpb24nKTtcclxuICAgIHJldHVybiBpc1NwZWNSdW5uaW5nKCkgPyB3b3JrRm4uY2FsbChjdXJyZW50U3BlYykgOiB3b3JrRm47XHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIGZ1bmN0aW9uIHdvcmtGbigpIHtcclxuICAgICAgdmFyIG1vZHVsZXMgPSBjdXJyZW50U3BlYy4kbW9kdWxlcyB8fCBbXTtcclxuICAgICAgdmFyIHN0cmljdERpID0gISFjdXJyZW50U3BlYy4kaW5qZWN0b3JTdHJpY3Q7XHJcbiAgICAgIG1vZHVsZXMudW5zaGlmdCgnbmdNb2NrJyk7XHJcbiAgICAgIG1vZHVsZXMudW5zaGlmdCgnbmcnKTtcclxuICAgICAgdmFyIGluamVjdG9yID0gY3VycmVudFNwZWMuJGluamVjdG9yO1xyXG4gICAgICBpZiAoIWluamVjdG9yKSB7XHJcbiAgICAgICAgaWYgKHN0cmljdERpKSB7XHJcbiAgICAgICAgICAvLyBJZiBzdHJpY3REaSBpcyBlbmFibGVkLCBhbm5vdGF0ZSB0aGUgcHJvdmlkZXJJbmplY3RvciBibG9ja3NcclxuICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChtb2R1bGVzLCBmdW5jdGlvbihtb2R1bGVGbikge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG1vZHVsZUZuID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgICBhbmd1bGFyLmluamVjdG9yLiQkYW5ub3RhdGUobW9kdWxlRm4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5qZWN0b3IgPSBjdXJyZW50U3BlYy4kaW5qZWN0b3IgPSBhbmd1bGFyLmluamVjdG9yKG1vZHVsZXMsIHN0cmljdERpKTtcclxuICAgICAgICBjdXJyZW50U3BlYy4kaW5qZWN0b3JTdHJpY3QgPSBzdHJpY3REaTtcclxuICAgICAgfVxyXG4gICAgICBmb3IgKHZhciBpID0gMCwgaWkgPSBibG9ja0Zucy5sZW5ndGg7IGkgPCBpaTsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRTcGVjLiRpbmplY3RvclN0cmljdCkge1xyXG4gICAgICAgICAgLy8gSWYgdGhlIGluamVjdG9yIGlzIHN0cmljdCAvIHN0cmljdERpLCBhbmQgdGhlIHNwZWMgd2FudHMgdG8gaW5qZWN0IHVzaW5nIGF1dG9tYXRpY1xyXG4gICAgICAgICAgLy8gYW5ub3RhdGlvbiwgdGhlbiBhbm5vdGF0ZSB0aGUgZnVuY3Rpb24gaGVyZS5cclxuICAgICAgICAgIGluamVjdG9yLmFubm90YXRlKGJsb2NrRm5zW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIC8qIGpzaGludCAtVzA0MCAqLy8qIEphc21pbmUgZXhwbGljaXRseSBwcm92aWRlcyBhIGB0aGlzYCBvYmplY3Qgd2hlbiBjYWxsaW5nIGZ1bmN0aW9ucyAqL1xyXG4gICAgICAgICAgaW5qZWN0b3IuaW52b2tlKGJsb2NrRm5zW2ldIHx8IGFuZ3VsYXIubm9vcCwgdGhpcyk7XHJcbiAgICAgICAgICAvKiBqc2hpbnQgK1cwNDAgKi9cclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICBpZiAoZS5zdGFjayAmJiBlcnJvckZvclN0YWNrKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvckFkZGluZ0RlY2xhcmF0aW9uTG9jYXRpb25TdGFjayhlLCBlcnJvckZvclN0YWNrKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAgIGVycm9yRm9yU3RhY2sgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG5cclxuICBhbmd1bGFyLm1vY2suaW5qZWN0LnN0cmljdERpID0gZnVuY3Rpb24odmFsdWUpIHtcclxuICAgIHZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA/ICEhdmFsdWUgOiB0cnVlO1xyXG4gICAgcmV0dXJuIGlzU3BlY1J1bm5pbmcoKSA/IHdvcmtGbigpIDogd29ya0ZuO1xyXG5cclxuICAgIGZ1bmN0aW9uIHdvcmtGbigpIHtcclxuICAgICAgaWYgKHZhbHVlICE9PSBjdXJyZW50U3BlYy4kaW5qZWN0b3JTdHJpY3QpIHtcclxuICAgICAgICBpZiAoY3VycmVudFNwZWMuJGluamVjdG9yKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0luamVjdG9yIGFscmVhZHkgY3JlYXRlZCwgY2FuIG5vdCBtb2RpZnkgc3RyaWN0IGFubm90YXRpb25zJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGN1cnJlbnRTcGVjLiRpbmplY3RvclN0cmljdCA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcbn1cclxuXHJcblxyXG59KSh3aW5kb3csIHdpbmRvdy5hbmd1bGFyKTtcclxuIl19