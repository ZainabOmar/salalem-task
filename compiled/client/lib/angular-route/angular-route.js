'use strict';

/**
 * @license AngularJS v1.3.20
 * (c) 2010-2014 Google, Inc. http://angularjs.org
 * License: MIT
 */
(function (window, angular, undefined) {
  'use strict';

  /**
   * @ngdoc module
   * @name ngRoute
   * @description
   *
   * # ngRoute
   *
   * The `ngRoute` module provides routing and deeplinking services and directives for angular apps.
   *
   * ## Example
   * See {@link ngRoute.$route#example $route} for an example of configuring and using `ngRoute`.
   *
   *
   * <div doc-module-components="ngRoute"></div>
   */
  /* global -ngRouteModule */

  var ngRouteModule = angular.module('ngRoute', ['ng']).provider('$route', $RouteProvider),
      $routeMinErr = angular.$$minErr('ngRoute');

  /**
   * @ngdoc provider
   * @name $routeProvider
   *
   * @description
   *
   * Used for configuring routes.
   *
   * ## Example
   * See {@link ngRoute.$route#example $route} for an example of configuring and using `ngRoute`.
   *
   * ## Dependencies
   * Requires the {@link ngRoute `ngRoute`} module to be installed.
   */
  function $RouteProvider() {
    function inherit(parent, extra) {
      return angular.extend(Object.create(parent), extra);
    }

    var routes = {};

    /**
     * @ngdoc method
     * @name $routeProvider#when
     *
     * @param {string} path Route path (matched against `$location.path`). If `$location.path`
     *    contains redundant trailing slash or is missing one, the route will still match and the
     *    `$location.path` will be updated to add or drop the trailing slash to exactly match the
     *    route definition.
     *
     *    * `path` can contain named groups starting with a colon: e.g. `:name`. All characters up
     *        to the next slash are matched and stored in `$routeParams` under the given `name`
     *        when the route matches.
     *    * `path` can contain named groups starting with a colon and ending with a star:
     *        e.g.`:name*`. All characters are eagerly stored in `$routeParams` under the given `name`
     *        when the route matches.
     *    * `path` can contain optional named groups with a question mark: e.g.`:name?`.
     *
     *    For example, routes like `/color/:color/largecode/:largecode*\/edit` will match
     *    `/color/brown/largecode/code/with/slashes/edit` and extract:
     *
     *    * `color: brown`
     *    * `largecode: code/with/slashes`.
     *
     *
     * @param {Object} route Mapping information to be assigned to `$route.current` on route
     *    match.
     *
     *    Object properties:
     *
     *    - `controller` – `{(string|function()=}` – Controller fn that should be associated with
     *      newly created scope or the name of a {@link angular.Module#controller registered
     *      controller} if passed as a string.
     *    - `controllerAs` – `{string=}` – A controller alias name. If present the controller will be
     *      published to scope under the `controllerAs` name.
     *    - `template` – `{string=|function()=}` – html template as a string or a function that
     *      returns an html template as a string which should be used by {@link
     *      ngRoute.directive:ngView ngView} or {@link ng.directive:ngInclude ngInclude} directives.
     *      This property takes precedence over `templateUrl`.
     *
     *      If `template` is a function, it will be called with the following parameters:
     *
     *      - `{Array.<Object>}` - route parameters extracted from the current
     *        `$location.path()` by applying the current route
     *
     *    - `templateUrl` – `{string=|function()=}` – path or function that returns a path to an html
     *      template that should be used by {@link ngRoute.directive:ngView ngView}.
     *
     *      If `templateUrl` is a function, it will be called with the following parameters:
     *
     *      - `{Array.<Object>}` - route parameters extracted from the current
     *        `$location.path()` by applying the current route
     *
     *    - `resolve` - `{Object.<string, function>=}` - An optional map of dependencies which should
     *      be injected into the controller. If any of these dependencies are promises, the router
     *      will wait for them all to be resolved or one to be rejected before the controller is
     *      instantiated.
     *      If all the promises are resolved successfully, the values of the resolved promises are
     *      injected and {@link ngRoute.$route#$routeChangeSuccess $routeChangeSuccess} event is
     *      fired. If any of the promises are rejected the
     *      {@link ngRoute.$route#$routeChangeError $routeChangeError} event is fired. The map object
     *      is:
     *
     *      - `key` – `{string}`: a name of a dependency to be injected into the controller.
     *      - `factory` - `{string|function}`: If `string` then it is an alias for a service.
     *        Otherwise if function, then it is {@link auto.$injector#invoke injected}
     *        and the return value is treated as the dependency. If the result is a promise, it is
     *        resolved before its value is injected into the controller. Be aware that
     *        `ngRoute.$routeParams` will still refer to the previous route within these resolve
     *        functions.  Use `$route.current.params` to access the new route parameters, instead.
     *
     *    - `redirectTo` – {(string|function())=} – value to update
     *      {@link ng.$location $location} path with and trigger route redirection.
     *
     *      If `redirectTo` is a function, it will be called with the following parameters:
     *
     *      - `{Object.<string>}` - route parameters extracted from the current
     *        `$location.path()` by applying the current route templateUrl.
     *      - `{string}` - current `$location.path()`
     *      - `{Object}` - current `$location.search()`
     *
     *      The custom `redirectTo` function is expected to return a string which will be used
     *      to update `$location.path()` and `$location.search()`.
     *
     *    - `[reloadOnSearch=true]` - {boolean=} - reload route when only `$location.search()`
     *      or `$location.hash()` changes.
     *
     *      If the option is set to `false` and url in the browser changes, then
     *      `$routeUpdate` event is broadcasted on the root scope.
     *
     *    - `[caseInsensitiveMatch=false]` - {boolean=} - match routes without being case sensitive
     *
     *      If the option is set to `true`, then the particular route can be matched without being
     *      case sensitive
     *
     * @returns {Object} self
     *
     * @description
     * Adds a new route definition to the `$route` service.
     */
    this.when = function (path, route) {
      //copy original route object to preserve params inherited from proto chain
      var routeCopy = angular.copy(route);
      if (angular.isUndefined(routeCopy.reloadOnSearch)) {
        routeCopy.reloadOnSearch = true;
      }
      if (angular.isUndefined(routeCopy.caseInsensitiveMatch)) {
        routeCopy.caseInsensitiveMatch = this.caseInsensitiveMatch;
      }
      routes[path] = angular.extend(routeCopy, path && pathRegExp(path, routeCopy));

      // create redirection for trailing slashes
      if (path) {
        var redirectPath = path[path.length - 1] == '/' ? path.substr(0, path.length - 1) : path + '/';

        routes[redirectPath] = angular.extend({ redirectTo: path }, pathRegExp(redirectPath, routeCopy));
      }

      return this;
    };

    /**
     * @ngdoc property
     * @name $routeProvider#caseInsensitiveMatch
     * @description
     *
     * A boolean property indicating if routes defined
     * using this provider should be matched using a case insensitive
     * algorithm. Defaults to `false`.
     */
    this.caseInsensitiveMatch = false;

    /**
     * @param path {string} path
     * @param opts {Object} options
     * @return {?Object}
     *
     * @description
     * Normalizes the given path, returning a regular expression
     * and the original path.
     *
     * Inspired by pathRexp in visionmedia/express/lib/utils.js.
     */
    function pathRegExp(path, opts) {
      var insensitive = opts.caseInsensitiveMatch,
          ret = {
        originalPath: path,
        regexp: path
      },
          keys = ret.keys = [];

      path = path.replace(/([().])/g, '\\$1').replace(/(\/)?:(\w+)([\?\*])?/g, function (_, slash, key, option) {
        var optional = option === '?' ? option : null;
        var star = option === '*' ? option : null;
        keys.push({ name: key, optional: !!optional });
        slash = slash || '';
        return '' + (optional ? '' : slash) + '(?:' + (optional ? slash : '') + (star && '(.+?)' || '([^/]+)') + (optional || '') + ')' + (optional || '');
      }).replace(/([\/$\*])/g, '\\$1');

      ret.regexp = new RegExp('^' + path + '$', insensitive ? 'i' : '');
      return ret;
    }

    /**
     * @ngdoc method
     * @name $routeProvider#otherwise
     *
     * @description
     * Sets route definition that will be used on route change when no other route definition
     * is matched.
     *
     * @param {Object|string} params Mapping information to be assigned to `$route.current`.
     * If called with a string, the value maps to `redirectTo`.
     * @returns {Object} self
     */
    this.otherwise = function (params) {
      if (typeof params === 'string') {
        params = { redirectTo: params };
      }
      this.when(null, params);
      return this;
    };

    this.$get = ['$rootScope', '$location', '$routeParams', '$q', '$injector', '$templateRequest', '$sce', function ($rootScope, $location, $routeParams, $q, $injector, $templateRequest, $sce) {

      /**
       * @ngdoc service
       * @name $route
       * @requires $location
       * @requires $routeParams
       *
       * @property {Object} current Reference to the current route definition.
       * The route definition contains:
       *
       *   - `controller`: The controller constructor as define in route definition.
       *   - `locals`: A map of locals which is used by {@link ng.$controller $controller} service for
       *     controller instantiation. The `locals` contain
       *     the resolved values of the `resolve` map. Additionally the `locals` also contain:
       *
       *     - `$scope` - The current route scope.
       *     - `$template` - The current route template HTML.
       *
       * @property {Object} routes Object with all route configuration Objects as its properties.
       *
       * @description
       * `$route` is used for deep-linking URLs to controllers and views (HTML partials).
       * It watches `$location.url()` and tries to map the path to an existing route definition.
       *
       * Requires the {@link ngRoute `ngRoute`} module to be installed.
       *
       * You can define routes through {@link ngRoute.$routeProvider $routeProvider}'s API.
       *
       * The `$route` service is typically used in conjunction with the
       * {@link ngRoute.directive:ngView `ngView`} directive and the
       * {@link ngRoute.$routeParams `$routeParams`} service.
       *
       * @example
       * This example shows how changing the URL hash causes the `$route` to match a route against the
       * URL, and the `ngView` pulls in the partial.
       *
       * <example name="$route-service" module="ngRouteExample"
       *          deps="angular-route.js" fixBase="true">
       *   <file name="index.html">
       *     <div ng-controller="MainController">
       *       Choose:
       *       <a href="Book/Moby">Moby</a> |
       *       <a href="Book/Moby/ch/1">Moby: Ch1</a> |
       *       <a href="Book/Gatsby">Gatsby</a> |
       *       <a href="Book/Gatsby/ch/4?key=value">Gatsby: Ch4</a> |
       *       <a href="Book/Scarlet">Scarlet Letter</a><br/>
       *
       *       <div ng-view></div>
       *
       *       <hr />
       *
       *       <pre>$location.path() = {{$location.path()}}</pre>
       *       <pre>$route.current.templateUrl = {{$route.current.templateUrl}}</pre>
       *       <pre>$route.current.params = {{$route.current.params}}</pre>
       *       <pre>$route.current.scope.name = {{$route.current.scope.name}}</pre>
       *       <pre>$routeParams = {{$routeParams}}</pre>
       *     </div>
       *   </file>
       *
       *   <file name="book.html">
       *     controller: {{name}}<br />
       *     Book Id: {{params.bookId}}<br />
       *   </file>
       *
       *   <file name="chapter.html">
       *     controller: {{name}}<br />
       *     Book Id: {{params.bookId}}<br />
       *     Chapter Id: {{params.chapterId}}
       *   </file>
       *
       *   <file name="script.js">
       *     angular.module('ngRouteExample', ['ngRoute'])
       *
       *      .controller('MainController', function($scope, $route, $routeParams, $location) {
       *          $scope.$route = $route;
       *          $scope.$location = $location;
       *          $scope.$routeParams = $routeParams;
       *      })
       *
       *      .controller('BookController', function($scope, $routeParams) {
       *          $scope.name = "BookController";
       *          $scope.params = $routeParams;
       *      })
       *
       *      .controller('ChapterController', function($scope, $routeParams) {
       *          $scope.name = "ChapterController";
       *          $scope.params = $routeParams;
       *      })
       *
       *     .config(function($routeProvider, $locationProvider) {
       *       $routeProvider
       *        .when('/Book/:bookId', {
       *         templateUrl: 'book.html',
       *         controller: 'BookController',
       *         resolve: {
       *           // I will cause a 1 second delay
       *           delay: function($q, $timeout) {
       *             var delay = $q.defer();
       *             $timeout(delay.resolve, 1000);
       *             return delay.promise;
       *           }
       *         }
       *       })
       *       .when('/Book/:bookId/ch/:chapterId', {
       *         templateUrl: 'chapter.html',
       *         controller: 'ChapterController'
       *       });
       *
       *       // configure html5 to get links working on jsfiddle
       *       $locationProvider.html5Mode(true);
       *     });
       *
       *   </file>
       *
       *   <file name="protractor.js" type="protractor">
       *     it('should load and compile correct template', function() {
       *       element(by.linkText('Moby: Ch1')).click();
       *       var content = element(by.css('[ng-view]')).getText();
       *       expect(content).toMatch(/controller\: ChapterController/);
       *       expect(content).toMatch(/Book Id\: Moby/);
       *       expect(content).toMatch(/Chapter Id\: 1/);
       *
       *       element(by.partialLinkText('Scarlet')).click();
       *
       *       content = element(by.css('[ng-view]')).getText();
       *       expect(content).toMatch(/controller\: BookController/);
       *       expect(content).toMatch(/Book Id\: Scarlet/);
       *     });
       *   </file>
       * </example>
       */

      /**
       * @ngdoc event
       * @name $route#$routeChangeStart
       * @eventType broadcast on root scope
       * @description
       * Broadcasted before a route change. At this  point the route services starts
       * resolving all of the dependencies needed for the route change to occur.
       * Typically this involves fetching the view template as well as any dependencies
       * defined in `resolve` route property. Once  all of the dependencies are resolved
       * `$routeChangeSuccess` is fired.
       *
       * The route change (and the `$location` change that triggered it) can be prevented
       * by calling `preventDefault` method of the event. See {@link ng.$rootScope.Scope#$on}
       * for more details about event object.
       *
       * @param {Object} angularEvent Synthetic event object.
       * @param {Route} next Future route information.
       * @param {Route} current Current route information.
       */

      /**
       * @ngdoc event
       * @name $route#$routeChangeSuccess
       * @eventType broadcast on root scope
       * @description
       * Broadcasted after a route change has happened successfully.
       * The `resolve` dependencies are now available in the `current.locals` property.
       *
       * {@link ngRoute.directive:ngView ngView} listens for the directive
       * to instantiate the controller and render the view.
       *
       * @param {Object} angularEvent Synthetic event object.
       * @param {Route} current Current route information.
       * @param {Route|Undefined} previous Previous route information, or undefined if current is
       * first route entered.
       */

      /**
       * @ngdoc event
       * @name $route#$routeChangeError
       * @eventType broadcast on root scope
       * @description
       * Broadcasted if any of the resolve promises are rejected.
       *
       * @param {Object} angularEvent Synthetic event object
       * @param {Route} current Current route information.
       * @param {Route} previous Previous route information.
       * @param {Route} rejection Rejection of the promise. Usually the error of the failed promise.
       */

      /**
       * @ngdoc event
       * @name $route#$routeUpdate
       * @eventType broadcast on root scope
       * @description
       * The `reloadOnSearch` property has been set to false, and we are reusing the same
       * instance of the Controller.
       *
       * @param {Object} angularEvent Synthetic event object
       * @param {Route} current Current/previous route information.
       */

      var forceReload = false,
          preparedRoute,
          preparedRouteIsUpdateOnly,
          $route = {
        routes: routes,

        /**
         * @ngdoc method
         * @name $route#reload
         *
         * @description
         * Causes `$route` service to reload the current route even if
         * {@link ng.$location $location} hasn't changed.
         *
         * As a result of that, {@link ngRoute.directive:ngView ngView}
         * creates new scope and reinstantiates the controller.
         */
        reload: function reload() {
          forceReload = true;
          $rootScope.$evalAsync(function () {
            // Don't support cancellation of a reload for now...
            prepareRoute();
            commitRoute();
          });
        },

        /**
         * @ngdoc method
         * @name $route#updateParams
         *
         * @description
         * Causes `$route` service to update the current URL, replacing
         * current route parameters with those specified in `newParams`.
         * Provided property names that match the route's path segment
         * definitions will be interpolated into the location's path, while
         * remaining properties will be treated as query params.
         *
         * @param {!Object<string, string>} newParams mapping of URL parameter names to values
         */
        updateParams: function updateParams(newParams) {
          if (this.current && this.current.$$route) {
            newParams = angular.extend({}, this.current.params, newParams);
            $location.path(interpolate(this.current.$$route.originalPath, newParams));
            // interpolate modifies newParams, only query params are left
            $location.search(newParams);
          } else {
            throw $routeMinErr('norout', 'Tried updating route when with no current route');
          }
        }
      };

      $rootScope.$on('$locationChangeStart', prepareRoute);
      $rootScope.$on('$locationChangeSuccess', commitRoute);

      return $route;

      /////////////////////////////////////////////////////

      /**
       * @param on {string} current url
       * @param route {Object} route regexp to match the url against
       * @return {?Object}
       *
       * @description
       * Check if the route matches the current url.
       *
       * Inspired by match in
       * visionmedia/express/lib/router/router.js.
       */
      function switchRouteMatcher(on, route) {
        var keys = route.keys,
            params = {};

        if (!route.regexp) return null;

        var m = route.regexp.exec(on);
        if (!m) return null;

        for (var i = 1, len = m.length; i < len; ++i) {
          var key = keys[i - 1];

          var val = m[i];

          if (key && val) {
            params[key.name] = val;
          }
        }
        return params;
      }

      function prepareRoute($locationEvent) {
        var lastRoute = $route.current;

        preparedRoute = parseRoute();
        preparedRouteIsUpdateOnly = preparedRoute && lastRoute && preparedRoute.$$route === lastRoute.$$route && angular.equals(preparedRoute.pathParams, lastRoute.pathParams) && !preparedRoute.reloadOnSearch && !forceReload;

        if (!preparedRouteIsUpdateOnly && (lastRoute || preparedRoute)) {
          if ($rootScope.$broadcast('$routeChangeStart', preparedRoute, lastRoute).defaultPrevented) {
            if ($locationEvent) {
              $locationEvent.preventDefault();
            }
          }
        }
      }

      function commitRoute() {
        var lastRoute = $route.current;
        var nextRoute = preparedRoute;

        if (preparedRouteIsUpdateOnly) {
          lastRoute.params = nextRoute.params;
          angular.copy(lastRoute.params, $routeParams);
          $rootScope.$broadcast('$routeUpdate', lastRoute);
        } else if (nextRoute || lastRoute) {
          forceReload = false;
          $route.current = nextRoute;
          if (nextRoute) {
            if (nextRoute.redirectTo) {
              if (angular.isString(nextRoute.redirectTo)) {
                $location.path(interpolate(nextRoute.redirectTo, nextRoute.params)).search(nextRoute.params).replace();
              } else {
                $location.url(nextRoute.redirectTo(nextRoute.pathParams, $location.path(), $location.search())).replace();
              }
            }
          }

          $q.when(nextRoute).then(function () {
            if (nextRoute) {
              var locals = angular.extend({}, nextRoute.resolve),
                  template,
                  templateUrl;

              angular.forEach(locals, function (value, key) {
                locals[key] = angular.isString(value) ? $injector.get(value) : $injector.invoke(value, null, null, key);
              });

              if (angular.isDefined(template = nextRoute.template)) {
                if (angular.isFunction(template)) {
                  template = template(nextRoute.params);
                }
              } else if (angular.isDefined(templateUrl = nextRoute.templateUrl)) {
                if (angular.isFunction(templateUrl)) {
                  templateUrl = templateUrl(nextRoute.params);
                }
                if (angular.isDefined(templateUrl)) {
                  nextRoute.loadedTemplateUrl = $sce.valueOf(templateUrl);
                  template = $templateRequest(templateUrl);
                }
              }
              if (angular.isDefined(template)) {
                locals['$template'] = template;
              }
              return $q.all(locals);
            }
          }).
          // after route change
          then(function (locals) {
            if (nextRoute == $route.current) {
              if (nextRoute) {
                nextRoute.locals = locals;
                angular.copy(nextRoute.params, $routeParams);
              }
              $rootScope.$broadcast('$routeChangeSuccess', nextRoute, lastRoute);
            }
          }, function (error) {
            if (nextRoute == $route.current) {
              $rootScope.$broadcast('$routeChangeError', nextRoute, lastRoute, error);
            }
          });
        }
      }

      /**
       * @returns {Object} the current active route, by matching it against the URL
       */
      function parseRoute() {
        // Match a route
        var params, match;
        angular.forEach(routes, function (route, path) {
          if (!match && (params = switchRouteMatcher($location.path(), route))) {
            match = inherit(route, {
              params: angular.extend({}, $location.search(), params),
              pathParams: params });
            match.$$route = route;
          }
        });
        // No route matched; fallback to "otherwise" route
        return match || routes[null] && inherit(routes[null], { params: {}, pathParams: {} });
      }

      /**
       * @returns {string} interpolation of the redirect path with the parameters
       */
      function interpolate(string, params) {
        var result = [];
        angular.forEach((string || '').split(':'), function (segment, i) {
          if (i === 0) {
            result.push(segment);
          } else {
            var segmentMatch = segment.match(/(\w+)(?:[?*])?(.*)/);
            var key = segmentMatch[1];
            result.push(params[key]);
            result.push(segmentMatch[2] || '');
            delete params[key];
          }
        });
        return result.join('');
      }
    }];
  }

  ngRouteModule.provider('$routeParams', $RouteParamsProvider);

  /**
   * @ngdoc service
   * @name $routeParams
   * @requires $route
   *
   * @description
   * The `$routeParams` service allows you to retrieve the current set of route parameters.
   *
   * Requires the {@link ngRoute `ngRoute`} module to be installed.
   *
   * The route parameters are a combination of {@link ng.$location `$location`}'s
   * {@link ng.$location#search `search()`} and {@link ng.$location#path `path()`}.
   * The `path` parameters are extracted when the {@link ngRoute.$route `$route`} path is matched.
   *
   * In case of parameter name collision, `path` params take precedence over `search` params.
   *
   * The service guarantees that the identity of the `$routeParams` object will remain unchanged
   * (but its properties will likely change) even when a route change occurs.
   *
   * Note that the `$routeParams` are only updated *after* a route change completes successfully.
   * This means that you cannot rely on `$routeParams` being correct in route resolve functions.
   * Instead you can use `$route.current.params` to access the new route's parameters.
   *
   * @example
   * ```js
   *  // Given:
   *  // URL: http://server.com/index.html#/Chapter/1/Section/2?search=moby
   *  // Route: /Chapter/:chapterId/Section/:sectionId
   *  //
   *  // Then
   *  $routeParams ==> {chapterId:'1', sectionId:'2', search:'moby'}
   * ```
   */
  function $RouteParamsProvider() {
    this.$get = function () {
      return {};
    };
  }

  ngRouteModule.directive('ngView', ngViewFactory);
  ngRouteModule.directive('ngView', ngViewFillContentFactory);

  /**
   * @ngdoc directive
   * @name ngView
   * @restrict ECA
   *
   * @description
   * # Overview
   * `ngView` is a directive that complements the {@link ngRoute.$route $route} service by
   * including the rendered template of the current route into the main layout (`index.html`) file.
   * Every time the current route changes, the included view changes with it according to the
   * configuration of the `$route` service.
   *
   * Requires the {@link ngRoute `ngRoute`} module to be installed.
   *
   * @animations
   * enter - animation is used to bring new content into the browser.
   * leave - animation is used to animate existing content away.
   *
   * The enter and leave animation occur concurrently.
   *
   * @scope
   * @priority 400
   * @param {string=} onload Expression to evaluate whenever the view updates.
   *
   * @param {string=} autoscroll Whether `ngView` should call {@link ng.$anchorScroll
   *                  $anchorScroll} to scroll the viewport after the view is updated.
   *
   *                  - If the attribute is not set, disable scrolling.
   *                  - If the attribute is set without value, enable scrolling.
   *                  - Otherwise enable scrolling only if the `autoscroll` attribute value evaluated
   *                    as an expression yields a truthy value.
   * @example
      <example name="ngView-directive" module="ngViewExample"
               deps="angular-route.js;angular-animate.js"
               animations="true" fixBase="true">
        <file name="index.html">
          <div ng-controller="MainCtrl as main">
            Choose:
            <a href="Book/Moby">Moby</a> |
            <a href="Book/Moby/ch/1">Moby: Ch1</a> |
            <a href="Book/Gatsby">Gatsby</a> |
            <a href="Book/Gatsby/ch/4?key=value">Gatsby: Ch4</a> |
            <a href="Book/Scarlet">Scarlet Letter</a><br/>
  
            <div class="view-animate-container">
              <div ng-view class="view-animate"></div>
            </div>
            <hr />
  
            <pre>$location.path() = {{main.$location.path()}}</pre>
            <pre>$route.current.templateUrl = {{main.$route.current.templateUrl}}</pre>
            <pre>$route.current.params = {{main.$route.current.params}}</pre>
            <pre>$routeParams = {{main.$routeParams}}</pre>
          </div>
        </file>
  
        <file name="book.html">
          <div>
            controller: {{book.name}}<br />
            Book Id: {{book.params.bookId}}<br />
          </div>
        </file>
  
        <file name="chapter.html">
          <div>
            controller: {{chapter.name}}<br />
            Book Id: {{chapter.params.bookId}}<br />
            Chapter Id: {{chapter.params.chapterId}}
          </div>
        </file>
  
        <file name="animations.css">
          .view-animate-container {
            position:relative;
            height:100px!important;
            background:white;
            border:1px solid black;
            height:40px;
            overflow:hidden;
          }
  
          .view-animate {
            padding:10px;
          }
  
          .view-animate.ng-enter, .view-animate.ng-leave {
            -webkit-transition:all cubic-bezier(0.250, 0.460, 0.450, 0.940) 1.5s;
            transition:all cubic-bezier(0.250, 0.460, 0.450, 0.940) 1.5s;
  
            display:block;
            width:100%;
            border-left:1px solid black;
  
            position:absolute;
            top:0;
            left:0;
            right:0;
            bottom:0;
            padding:10px;
          }
  
          .view-animate.ng-enter {
            left:100%;
          }
          .view-animate.ng-enter.ng-enter-active {
            left:0;
          }
          .view-animate.ng-leave.ng-leave-active {
            left:-100%;
          }
        </file>
  
        <file name="script.js">
          angular.module('ngViewExample', ['ngRoute', 'ngAnimate'])
            .config(['$routeProvider', '$locationProvider',
              function($routeProvider, $locationProvider) {
                $routeProvider
                  .when('/Book/:bookId', {
                    templateUrl: 'book.html',
                    controller: 'BookCtrl',
                    controllerAs: 'book'
                  })
                  .when('/Book/:bookId/ch/:chapterId', {
                    templateUrl: 'chapter.html',
                    controller: 'ChapterCtrl',
                    controllerAs: 'chapter'
                  });
  
                $locationProvider.html5Mode(true);
            }])
            .controller('MainCtrl', ['$route', '$routeParams', '$location',
              function($route, $routeParams, $location) {
                this.$route = $route;
                this.$location = $location;
                this.$routeParams = $routeParams;
            }])
            .controller('BookCtrl', ['$routeParams', function($routeParams) {
              this.name = "BookCtrl";
              this.params = $routeParams;
            }])
            .controller('ChapterCtrl', ['$routeParams', function($routeParams) {
              this.name = "ChapterCtrl";
              this.params = $routeParams;
            }]);
  
        </file>
  
        <file name="protractor.js" type="protractor">
          it('should load and compile correct template', function() {
            element(by.linkText('Moby: Ch1')).click();
            var content = element(by.css('[ng-view]')).getText();
            expect(content).toMatch(/controller\: ChapterCtrl/);
            expect(content).toMatch(/Book Id\: Moby/);
            expect(content).toMatch(/Chapter Id\: 1/);
  
            element(by.partialLinkText('Scarlet')).click();
  
            content = element(by.css('[ng-view]')).getText();
            expect(content).toMatch(/controller\: BookCtrl/);
            expect(content).toMatch(/Book Id\: Scarlet/);
          });
        </file>
      </example>
   */

  /**
   * @ngdoc event
   * @name ngView#$viewContentLoaded
   * @eventType emit on the current ngView scope
   * @description
   * Emitted every time the ngView content is reloaded.
   */
  ngViewFactory.$inject = ['$route', '$anchorScroll', '$animate'];
  function ngViewFactory($route, $anchorScroll, $animate) {
    return {
      restrict: 'ECA',
      terminal: true,
      priority: 400,
      transclude: 'element',
      link: function link(scope, $element, attr, ctrl, $transclude) {
        var currentScope,
            currentElement,
            previousLeaveAnimation,
            autoScrollExp = attr.autoscroll,
            onloadExp = attr.onload || '';

        scope.$on('$routeChangeSuccess', update);
        update();

        function cleanupLastView() {
          if (previousLeaveAnimation) {
            $animate.cancel(previousLeaveAnimation);
            previousLeaveAnimation = null;
          }

          if (currentScope) {
            currentScope.$destroy();
            currentScope = null;
          }
          if (currentElement) {
            previousLeaveAnimation = $animate.leave(currentElement);
            previousLeaveAnimation.then(function () {
              previousLeaveAnimation = null;
            });
            currentElement = null;
          }
        }

        function update() {
          var locals = $route.current && $route.current.locals,
              template = locals && locals.$template;

          if (angular.isDefined(template)) {
            var newScope = scope.$new();
            var current = $route.current;

            // Note: This will also link all children of ng-view that were contained in the original
            // html. If that content contains controllers, ... they could pollute/change the scope.
            // However, using ng-view on an element with additional content does not make sense...
            // Note: We can't remove them in the cloneAttchFn of $transclude as that
            // function is called before linking the content, which would apply child
            // directives to non existing elements.
            var clone = $transclude(newScope, function (clone) {
              $animate.enter(clone, null, currentElement || $element).then(function onNgViewEnter() {
                if (angular.isDefined(autoScrollExp) && (!autoScrollExp || scope.$eval(autoScrollExp))) {
                  $anchorScroll();
                }
              });
              cleanupLastView();
            });

            currentElement = clone;
            currentScope = current.scope = newScope;
            currentScope.$emit('$viewContentLoaded');
            currentScope.$eval(onloadExp);
          } else {
            cleanupLastView();
          }
        }
      }
    };
  }

  // This directive is called during the $transclude call of the first `ngView` directive.
  // It will replace and compile the content of the element with the loaded template.
  // We need this directive so that the element content is already filled when
  // the link function of another directive on the same element as ngView
  // is called.
  ngViewFillContentFactory.$inject = ['$compile', '$controller', '$route'];
  function ngViewFillContentFactory($compile, $controller, $route) {
    return {
      restrict: 'ECA',
      priority: -400,
      link: function link(scope, $element) {
        var current = $route.current,
            locals = current.locals;

        $element.html(locals.$template);

        var link = $compile($element.contents());

        if (current.controller) {
          locals.$scope = scope;
          var controller = $controller(current.controller, locals);
          if (current.controllerAs) {
            scope[current.controllerAs] = controller;
          }
          $element.data('$ngControllerController', controller);
          $element.children().data('$ngControllerController', controller);
        }

        link(scope);
      }
    };
  }
})(window, window.angular);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NsaWVudC9saWIvYW5ndWxhci1yb3V0ZS9hbmd1bGFyLXJvdXRlLmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsImFuZ3VsYXIiLCJ1bmRlZmluZWQiLCJuZ1JvdXRlTW9kdWxlIiwibW9kdWxlIiwicHJvdmlkZXIiLCIkUm91dGVQcm92aWRlciIsIiRyb3V0ZU1pbkVyciIsIiQkbWluRXJyIiwiaW5oZXJpdCIsInBhcmVudCIsImV4dHJhIiwiZXh0ZW5kIiwiT2JqZWN0IiwiY3JlYXRlIiwicm91dGVzIiwid2hlbiIsInBhdGgiLCJyb3V0ZSIsInJvdXRlQ29weSIsImNvcHkiLCJpc1VuZGVmaW5lZCIsInJlbG9hZE9uU2VhcmNoIiwiY2FzZUluc2Vuc2l0aXZlTWF0Y2giLCJwYXRoUmVnRXhwIiwicmVkaXJlY3RQYXRoIiwibGVuZ3RoIiwic3Vic3RyIiwicmVkaXJlY3RUbyIsIm9wdHMiLCJpbnNlbnNpdGl2ZSIsInJldCIsIm9yaWdpbmFsUGF0aCIsInJlZ2V4cCIsImtleXMiLCJyZXBsYWNlIiwiXyIsInNsYXNoIiwia2V5Iiwib3B0aW9uIiwib3B0aW9uYWwiLCJzdGFyIiwicHVzaCIsIm5hbWUiLCJSZWdFeHAiLCJvdGhlcndpc2UiLCJwYXJhbXMiLCIkZ2V0IiwiJHJvb3RTY29wZSIsIiRsb2NhdGlvbiIsIiRyb3V0ZVBhcmFtcyIsIiRxIiwiJGluamVjdG9yIiwiJHRlbXBsYXRlUmVxdWVzdCIsIiRzY2UiLCJmb3JjZVJlbG9hZCIsInByZXBhcmVkUm91dGUiLCJwcmVwYXJlZFJvdXRlSXNVcGRhdGVPbmx5IiwiJHJvdXRlIiwicmVsb2FkIiwiJGV2YWxBc3luYyIsInByZXBhcmVSb3V0ZSIsImNvbW1pdFJvdXRlIiwidXBkYXRlUGFyYW1zIiwibmV3UGFyYW1zIiwiY3VycmVudCIsIiQkcm91dGUiLCJpbnRlcnBvbGF0ZSIsInNlYXJjaCIsIiRvbiIsInN3aXRjaFJvdXRlTWF0Y2hlciIsIm9uIiwibSIsImV4ZWMiLCJpIiwibGVuIiwidmFsIiwiJGxvY2F0aW9uRXZlbnQiLCJsYXN0Um91dGUiLCJwYXJzZVJvdXRlIiwiZXF1YWxzIiwicGF0aFBhcmFtcyIsIiRicm9hZGNhc3QiLCJkZWZhdWx0UHJldmVudGVkIiwicHJldmVudERlZmF1bHQiLCJuZXh0Um91dGUiLCJpc1N0cmluZyIsInVybCIsInRoZW4iLCJsb2NhbHMiLCJyZXNvbHZlIiwidGVtcGxhdGUiLCJ0ZW1wbGF0ZVVybCIsImZvckVhY2giLCJ2YWx1ZSIsImdldCIsImludm9rZSIsImlzRGVmaW5lZCIsImlzRnVuY3Rpb24iLCJsb2FkZWRUZW1wbGF0ZVVybCIsInZhbHVlT2YiLCJhbGwiLCJlcnJvciIsIm1hdGNoIiwic3RyaW5nIiwicmVzdWx0Iiwic3BsaXQiLCJzZWdtZW50Iiwic2VnbWVudE1hdGNoIiwiam9pbiIsIiRSb3V0ZVBhcmFtc1Byb3ZpZGVyIiwiZGlyZWN0aXZlIiwibmdWaWV3RmFjdG9yeSIsIm5nVmlld0ZpbGxDb250ZW50RmFjdG9yeSIsIiRpbmplY3QiLCIkYW5jaG9yU2Nyb2xsIiwiJGFuaW1hdGUiLCJyZXN0cmljdCIsInRlcm1pbmFsIiwicHJpb3JpdHkiLCJ0cmFuc2NsdWRlIiwibGluayIsInNjb3BlIiwiJGVsZW1lbnQiLCJhdHRyIiwiY3RybCIsIiR0cmFuc2NsdWRlIiwiY3VycmVudFNjb3BlIiwiY3VycmVudEVsZW1lbnQiLCJwcmV2aW91c0xlYXZlQW5pbWF0aW9uIiwiYXV0b1Njcm9sbEV4cCIsImF1dG9zY3JvbGwiLCJvbmxvYWRFeHAiLCJvbmxvYWQiLCJ1cGRhdGUiLCJjbGVhbnVwTGFzdFZpZXciLCJjYW5jZWwiLCIkZGVzdHJveSIsImxlYXZlIiwiJHRlbXBsYXRlIiwibmV3U2NvcGUiLCIkbmV3IiwiY2xvbmUiLCJlbnRlciIsIm9uTmdWaWV3RW50ZXIiLCIkZXZhbCIsIiRlbWl0IiwiJGNvbXBpbGUiLCIkY29udHJvbGxlciIsImh0bWwiLCJjb250ZW50cyIsImNvbnRyb2xsZXIiLCIkc2NvcGUiLCJjb250cm9s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QU87QUFDTDJELGdCQUFVLEtBREw7QUFFTEUsZ0JBQVUsQ0FBQyxHQUZOO0FBR0xFLFlBQU0sY0FBU0MsS0FBVCxFQUFnQkMsUUFBaEIsRUFBMEI7QUFDOUIsWUFBSTFELFVBQVVQLE9BQU9PLE9BQXJCO0FBQUEsWUFDSXdCLFNBQVN4QixRQUFRd0IsTUFEckI7O0FBR0FrQyxpQkFBUzBCLElBQVQsQ0FBYzVELE9BQU9rRCxTQUFyQjs7QUFFQSxZQUFJbEIsT0FBTzBCLFNBQVN4QixTQUFTMkIsUUFBVCxFQUFULENBQVg7O0FBRUEsWUFBSXJGLFFBQVFzRixVQUFaLEVBQXdCO0FBQ3RCOUQsaUJBQU8rRCxNQUFQLEdBQWdCOUIsS0FBaEI7QUFDQSxjQUFJNkIsYUFBYUgsWUFBWW5GLFFBQVFzRixVQUFwQixFQUFnQzlELE1BQWhDLENBQWpCO0FBQ0EsY0FBSXhCLFFBQVF3RixZQUFaLEVBQTBCO0FBQ3hCL0Isa0JBQU16RCxRQUFRd0YsWUFBZCxJQUE4QkYsVUFBOUI7QUFDRDtBQUNENUIsbUJBQVMrQixJQUFULENBQWMseUJBQWQsRUFBeUNILFVBQXpDO0FBQ0E1QixtQkFBU2dDLFFBQVQsR0FBb0JELElBQXBCLENBQXlCLHlCQUF6QixFQUFvREgsVUFBcEQ7QUFDRDs7QUFFRDlCLGFBQUtDLEtBQUw7QUFDRDtBQXRCSSxLQUFQO0FBd0JEO0FBR0EsQ0ExOUJELEVBMDlCRzFILE1BMTlCSCxFQTA5QldBLE9BQU9DLE9BMTlCbEIiLCJmaWxlIjoiYW5ndWxhci1yb3V0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAbGljZW5zZSBBbmd1bGFySlMgdjEuMy4yMFxyXG4gKiAoYykgMjAxMC0yMDE0IEdvb2dsZSwgSW5jLiBodHRwOi8vYW5ndWxhcmpzLm9yZ1xyXG4gKiBMaWNlbnNlOiBNSVRcclxuICovXHJcbihmdW5jdGlvbih3aW5kb3csIGFuZ3VsYXIsIHVuZGVmaW5lZCkgeyd1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBAbmdkb2MgbW9kdWxlXHJcbiAqIEBuYW1lIG5nUm91dGVcclxuICogQGRlc2NyaXB0aW9uXHJcbiAqXHJcbiAqICMgbmdSb3V0ZVxyXG4gKlxyXG4gKiBUaGUgYG5nUm91dGVgIG1vZHVsZSBwcm92aWRlcyByb3V0aW5nIGFuZCBkZWVwbGlua2luZyBzZXJ2aWNlcyBhbmQgZGlyZWN0aXZlcyBmb3IgYW5ndWxhciBhcHBzLlxyXG4gKlxyXG4gKiAjIyBFeGFtcGxlXHJcbiAqIFNlZSB7QGxpbmsgbmdSb3V0ZS4kcm91dGUjZXhhbXBsZSAkcm91dGV9IGZvciBhbiBleGFtcGxlIG9mIGNvbmZpZ3VyaW5nIGFuZCB1c2luZyBgbmdSb3V0ZWAuXHJcbiAqXHJcbiAqXHJcbiAqIDxkaXYgZG9jLW1vZHVsZS1jb21wb25lbnRzPVwibmdSb3V0ZVwiPjwvZGl2PlxyXG4gKi9cclxuIC8qIGdsb2JhbCAtbmdSb3V0ZU1vZHVsZSAqL1xyXG52YXIgbmdSb3V0ZU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCduZ1JvdXRlJywgWyduZyddKS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIoJyRyb3V0ZScsICRSb3V0ZVByb3ZpZGVyKSxcclxuICAgICRyb3V0ZU1pbkVyciA9IGFuZ3VsYXIuJCRtaW5FcnIoJ25nUm91dGUnKTtcclxuXHJcbi8qKlxyXG4gKiBAbmdkb2MgcHJvdmlkZXJcclxuICogQG5hbWUgJHJvdXRlUHJvdmlkZXJcclxuICpcclxuICogQGRlc2NyaXB0aW9uXHJcbiAqXHJcbiAqIFVzZWQgZm9yIGNvbmZpZ3VyaW5nIHJvdXRlcy5cclxuICpcclxuICogIyMgRXhhbXBsZVxyXG4gKiBTZWUge0BsaW5rIG5nUm91dGUuJHJvdXRlI2V4YW1wbGUgJHJvdXRlfSBmb3IgYW4gZXhhbXBsZSBvZiBjb25maWd1cmluZyBhbmQgdXNpbmcgYG5nUm91dGVgLlxyXG4gKlxyXG4gKiAjIyBEZXBlbmRlbmNpZXNcclxuICogUmVxdWlyZXMgdGhlIHtAbGluayBuZ1JvdXRlIGBuZ1JvdXRlYH0gbW9kdWxlIHRvIGJlIGluc3RhbGxlZC5cclxuICovXHJcbmZ1bmN0aW9uICRSb3V0ZVByb3ZpZGVyKCkge1xyXG4gIGZ1bmN0aW9uIGluaGVyaXQocGFyZW50LCBleHRyYSkge1xyXG4gICAgcmV0dXJuIGFuZ3VsYXIuZXh0ZW5kKE9iamVjdC5jcmVhdGUocGFyZW50KSwgZXh0cmEpO1xyXG4gIH1cclxuXHJcbiAgdmFyIHJvdXRlcyA9IHt9O1xyXG5cclxuICAvKipcclxuICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICogQG5hbWUgJHJvdXRlUHJvdmlkZXIjd2hlblxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggUm91dGUgcGF0aCAobWF0Y2hlZCBhZ2FpbnN0IGAkbG9jYXRpb24ucGF0aGApLiBJZiBgJGxvY2F0aW9uLnBhdGhgXHJcbiAgICogICAgY29udGFpbnMgcmVkdW5kYW50IHRyYWlsaW5nIHNsYXNoIG9yIGlzIG1pc3Npbmcgb25lLCB0aGUgcm91dGUgd2lsbCBzdGlsbCBtYXRjaCBhbmQgdGhlXHJcbiAgICogICAgYCRsb2NhdGlvbi5wYXRoYCB3aWxsIGJlIHVwZGF0ZWQgdG8gYWRkIG9yIGRyb3AgdGhlIHRyYWlsaW5nIHNsYXNoIHRvIGV4YWN0bHkgbWF0Y2ggdGhlXHJcbiAgICogICAgcm91dGUgZGVmaW5pdGlvbi5cclxuICAgKlxyXG4gICAqICAgICogYHBhdGhgIGNhbiBjb250YWluIG5hbWVkIGdyb3VwcyBzdGFydGluZyB3aXRoIGEgY29sb246IGUuZy4gYDpuYW1lYC4gQWxsIGNoYXJhY3RlcnMgdXBcclxuICAgKiAgICAgICAgdG8gdGhlIG5leHQgc2xhc2ggYXJlIG1hdGNoZWQgYW5kIHN0b3JlZCBpbiBgJHJvdXRlUGFyYW1zYCB1bmRlciB0aGUgZ2l2ZW4gYG5hbWVgXHJcbiAgICogICAgICAgIHdoZW4gdGhlIHJvdXRlIG1hdGNoZXMuXHJcbiAgICogICAgKiBgcGF0aGAgY2FuIGNvbnRhaW4gbmFtZWQgZ3JvdXBzIHN0YXJ0aW5nIHdpdGggYSBjb2xvbiBhbmQgZW5kaW5nIHdpdGggYSBzdGFyOlxyXG4gICAqICAgICAgICBlLmcuYDpuYW1lKmAuIEFsbCBjaGFyYWN0ZXJzIGFyZSBlYWdlcmx5IHN0b3JlZCBpbiBgJHJvdXRlUGFyYW1zYCB1bmRlciB0aGUgZ2l2ZW4gYG5hbWVgXHJcbiAgICogICAgICAgIHdoZW4gdGhlIHJvdXRlIG1hdGNoZXMuXHJcbiAgICogICAgKiBgcGF0aGAgY2FuIGNvbnRhaW4gb3B0aW9uYWwgbmFtZWQgZ3JvdXBzIHdpdGggYSBxdWVzdGlvbiBtYXJrOiBlLmcuYDpuYW1lP2AuXHJcbiAgICpcclxuICAgKiAgICBGb3IgZXhhbXBsZSwgcm91dGVzIGxpa2UgYC9jb2xvci86Y29sb3IvbGFyZ2Vjb2RlLzpsYXJnZWNvZGUqXFwvZWRpdGAgd2lsbCBtYXRjaFxyXG4gICAqICAgIGAvY29sb3IvYnJvd24vbGFyZ2Vjb2RlL2NvZGUvd2l0aC9zbGFzaGVzL2VkaXRgIGFuZCBleHRyYWN0OlxyXG4gICAqXHJcbiAgICogICAgKiBgY29sb3I6IGJyb3duYFxyXG4gICAqICAgICogYGxhcmdlY29kZTogY29kZS93aXRoL3NsYXNoZXNgLlxyXG4gICAqXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge09iamVjdH0gcm91dGUgTWFwcGluZyBpbmZvcm1hdGlvbiB0byBiZSBhc3NpZ25lZCB0byBgJHJvdXRlLmN1cnJlbnRgIG9uIHJvdXRlXHJcbiAgICogICAgbWF0Y2guXHJcbiAgICpcclxuICAgKiAgICBPYmplY3QgcHJvcGVydGllczpcclxuICAgKlxyXG4gICAqICAgIC0gYGNvbnRyb2xsZXJgIOKAkyBgeyhzdHJpbmd8ZnVuY3Rpb24oKT19YCDigJMgQ29udHJvbGxlciBmbiB0aGF0IHNob3VsZCBiZSBhc3NvY2lhdGVkIHdpdGhcclxuICAgKiAgICAgIG5ld2x5IGNyZWF0ZWQgc2NvcGUgb3IgdGhlIG5hbWUgb2YgYSB7QGxpbmsgYW5ndWxhci5Nb2R1bGUjY29udHJvbGxlciByZWdpc3RlcmVkXHJcbiAgICogICAgICBjb250cm9sbGVyfSBpZiBwYXNzZWQgYXMgYSBzdHJpbmcuXHJcbiAgICogICAgLSBgY29udHJvbGxlckFzYCDigJMgYHtzdHJpbmc9fWAg4oCTIEEgY29udHJvbGxlciBhbGlhcyBuYW1lLiBJZiBwcmVzZW50IHRoZSBjb250cm9sbGVyIHdpbGwgYmVcclxuICAgKiAgICAgIHB1Ymxpc2hlZCB0byBzY29wZSB1bmRlciB0aGUgYGNvbnRyb2xsZXJBc2AgbmFtZS5cclxuICAgKiAgICAtIGB0ZW1wbGF0ZWAg4oCTIGB7c3RyaW5nPXxmdW5jdGlvbigpPX1gIOKAkyBodG1sIHRlbXBsYXRlIGFzIGEgc3RyaW5nIG9yIGEgZnVuY3Rpb24gdGhhdFxyXG4gICAqICAgICAgcmV0dXJucyBhbiBodG1sIHRlbXBsYXRlIGFzIGEgc3RyaW5nIHdoaWNoIHNob3VsZCBiZSB1c2VkIGJ5IHtAbGlua1xyXG4gICAqICAgICAgbmdSb3V0ZS5kaXJlY3RpdmU6bmdWaWV3IG5nVmlld30gb3Ige0BsaW5rIG5nLmRpcmVjdGl2ZTpuZ0luY2x1ZGUgbmdJbmNsdWRlfSBkaXJlY3RpdmVzLlxyXG4gICAqICAgICAgVGhpcyBwcm9wZXJ0eSB0YWtlcyBwcmVjZWRlbmNlIG92ZXIgYHRlbXBsYXRlVXJsYC5cclxuICAgKlxyXG4gICAqICAgICAgSWYgYHRlbXBsYXRlYCBpcyBhIGZ1bmN0aW9uLCBpdCB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZSBmb2xsb3dpbmcgcGFyYW1ldGVyczpcclxuICAgKlxyXG4gICAqICAgICAgLSBge0FycmF5LjxPYmplY3Q+fWAgLSByb3V0ZSBwYXJhbWV0ZXJzIGV4dHJhY3RlZCBmcm9tIHRoZSBjdXJyZW50XHJcbiAgICogICAgICAgIGAkbG9jYXRpb24ucGF0aCgpYCBieSBhcHBseWluZyB0aGUgY3VycmVudCByb3V0ZVxyXG4gICAqXHJcbiAgICogICAgLSBgdGVtcGxhdGVVcmxgIOKAkyBge3N0cmluZz18ZnVuY3Rpb24oKT19YCDigJMgcGF0aCBvciBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBwYXRoIHRvIGFuIGh0bWxcclxuICAgKiAgICAgIHRlbXBsYXRlIHRoYXQgc2hvdWxkIGJlIHVzZWQgYnkge0BsaW5rIG5nUm91dGUuZGlyZWN0aXZlOm5nVmlldyBuZ1ZpZXd9LlxyXG4gICAqXHJcbiAgICogICAgICBJZiBgdGVtcGxhdGVVcmxgIGlzIGEgZnVuY3Rpb24sIGl0IHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlIGZvbGxvd2luZyBwYXJhbWV0ZXJzOlxyXG4gICAqXHJcbiAgICogICAgICAtIGB7QXJyYXkuPE9iamVjdD59YCAtIHJvdXRlIHBhcmFtZXRlcnMgZXh0cmFjdGVkIGZyb20gdGhlIGN1cnJlbnRcclxuICAgKiAgICAgICAgYCRsb2NhdGlvbi5wYXRoKClgIGJ5IGFwcGx5aW5nIHRoZSBjdXJyZW50IHJvdXRlXHJcbiAgICpcclxuICAgKiAgICAtIGByZXNvbHZlYCAtIGB7T2JqZWN0LjxzdHJpbmcsIGZ1bmN0aW9uPj19YCAtIEFuIG9wdGlvbmFsIG1hcCBvZiBkZXBlbmRlbmNpZXMgd2hpY2ggc2hvdWxkXHJcbiAgICogICAgICBiZSBpbmplY3RlZCBpbnRvIHRoZSBjb250cm9sbGVyLiBJZiBhbnkgb2YgdGhlc2UgZGVwZW5kZW5jaWVzIGFyZSBwcm9taXNlcywgdGhlIHJvdXRlclxyXG4gICAqICAgICAgd2lsbCB3YWl0IGZvciB0aGVtIGFsbCB0byBiZSByZXNvbHZlZCBvciBvbmUgdG8gYmUgcmVqZWN0ZWQgYmVmb3JlIHRoZSBjb250cm9sbGVyIGlzXHJcbiAgICogICAgICBpbnN0YW50aWF0ZWQuXHJcbiAgICogICAgICBJZiBhbGwgdGhlIHByb21pc2VzIGFyZSByZXNvbHZlZCBzdWNjZXNzZnVsbHksIHRoZSB2YWx1ZXMgb2YgdGhlIHJlc29sdmVkIHByb21pc2VzIGFyZVxyXG4gICAqICAgICAgaW5qZWN0ZWQgYW5kIHtAbGluayBuZ1JvdXRlLiRyb3V0ZSMkcm91dGVDaGFuZ2VTdWNjZXNzICRyb3V0ZUNoYW5nZVN1Y2Nlc3N9IGV2ZW50IGlzXHJcbiAgICogICAgICBmaXJlZC4gSWYgYW55IG9mIHRoZSBwcm9taXNlcyBhcmUgcmVqZWN0ZWQgdGhlXHJcbiAgICogICAgICB7QGxpbmsgbmdSb3V0ZS4kcm91dGUjJHJvdXRlQ2hhbmdlRXJyb3IgJHJvdXRlQ2hhbmdlRXJyb3J9IGV2ZW50IGlzIGZpcmVkLiBUaGUgbWFwIG9iamVjdFxyXG4gICAqICAgICAgaXM6XHJcbiAgICpcclxuICAgKiAgICAgIC0gYGtleWAg4oCTIGB7c3RyaW5nfWA6IGEgbmFtZSBvZiBhIGRlcGVuZGVuY3kgdG8gYmUgaW5qZWN0ZWQgaW50byB0aGUgY29udHJvbGxlci5cclxuICAgKiAgICAgIC0gYGZhY3RvcnlgIC0gYHtzdHJpbmd8ZnVuY3Rpb259YDogSWYgYHN0cmluZ2AgdGhlbiBpdCBpcyBhbiBhbGlhcyBmb3IgYSBzZXJ2aWNlLlxyXG4gICAqICAgICAgICBPdGhlcndpc2UgaWYgZnVuY3Rpb24sIHRoZW4gaXQgaXMge0BsaW5rIGF1dG8uJGluamVjdG9yI2ludm9rZSBpbmplY3RlZH1cclxuICAgKiAgICAgICAgYW5kIHRoZSByZXR1cm4gdmFsdWUgaXMgdHJlYXRlZCBhcyB0aGUgZGVwZW5kZW5jeS4gSWYgdGhlIHJlc3VsdCBpcyBhIHByb21pc2UsIGl0IGlzXHJcbiAgICogICAgICAgIHJlc29sdmVkIGJlZm9yZSBpdHMgdmFsdWUgaXMgaW5qZWN0ZWQgaW50byB0aGUgY29udHJvbGxlci4gQmUgYXdhcmUgdGhhdFxyXG4gICAqICAgICAgICBgbmdSb3V0ZS4kcm91dGVQYXJhbXNgIHdpbGwgc3RpbGwgcmVmZXIgdG8gdGhlIHByZXZpb3VzIHJvdXRlIHdpdGhpbiB0aGVzZSByZXNvbHZlXHJcbiAgICogICAgICAgIGZ1bmN0aW9ucy4gIFVzZSBgJHJvdXRlLmN1cnJlbnQucGFyYW1zYCB0byBhY2Nlc3MgdGhlIG5ldyByb3V0ZSBwYXJhbWV0ZXJzLCBpbnN0ZWFkLlxyXG4gICAqXHJcbiAgICogICAgLSBgcmVkaXJlY3RUb2Ag4oCTIHsoc3RyaW5nfGZ1bmN0aW9uKCkpPX0g4oCTIHZhbHVlIHRvIHVwZGF0ZVxyXG4gICAqICAgICAge0BsaW5rIG5nLiRsb2NhdGlvbiAkbG9jYXRpb259IHBhdGggd2l0aCBhbmQgdHJpZ2dlciByb3V0ZSByZWRpcmVjdGlvbi5cclxuICAgKlxyXG4gICAqICAgICAgSWYgYHJlZGlyZWN0VG9gIGlzIGEgZnVuY3Rpb24sIGl0IHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlIGZvbGxvd2luZyBwYXJhbWV0ZXJzOlxyXG4gICAqXHJcbiAgICogICAgICAtIGB7T2JqZWN0LjxzdHJpbmc+fWAgLSByb3V0ZSBwYXJhbWV0ZXJzIGV4dHJhY3RlZCBmcm9tIHRoZSBjdXJyZW50XHJcbiAgICogICAgICAgIGAkbG9jYXRpb24ucGF0aCgpYCBieSBhcHBseWluZyB0aGUgY3VycmVudCByb3V0ZSB0ZW1wbGF0ZVVybC5cclxuICAgKiAgICAgIC0gYHtzdHJpbmd9YCAtIGN1cnJlbnQgYCRsb2NhdGlvbi5wYXRoKClgXHJcbiAgICogICAgICAtIGB7T2JqZWN0fWAgLSBjdXJyZW50IGAkbG9jYXRpb24uc2VhcmNoKClgXHJcbiAgICpcclxuICAgKiAgICAgIFRoZSBjdXN0b20gYHJlZGlyZWN0VG9gIGZ1bmN0aW9uIGlzIGV4cGVjdGVkIHRvIHJldHVybiBhIHN0cmluZyB3aGljaCB3aWxsIGJlIHVzZWRcclxuICAgKiAgICAgIHRvIHVwZGF0ZSBgJGxvY2F0aW9uLnBhdGgoKWAgYW5kIGAkbG9jYXRpb24uc2VhcmNoKClgLlxyXG4gICAqXHJcbiAgICogICAgLSBgW3JlbG9hZE9uU2VhcmNoPXRydWVdYCAtIHtib29sZWFuPX0gLSByZWxvYWQgcm91dGUgd2hlbiBvbmx5IGAkbG9jYXRpb24uc2VhcmNoKClgXHJcbiAgICogICAgICBvciBgJGxvY2F0aW9uLmhhc2goKWAgY2hhbmdlcy5cclxuICAgKlxyXG4gICAqICAgICAgSWYgdGhlIG9wdGlvbiBpcyBzZXQgdG8gYGZhbHNlYCBhbmQgdXJsIGluIHRoZSBicm93c2VyIGNoYW5nZXMsIHRoZW5cclxuICAgKiAgICAgIGAkcm91dGVVcGRhdGVgIGV2ZW50IGlzIGJyb2FkY2FzdGVkIG9uIHRoZSByb290IHNjb3BlLlxyXG4gICAqXHJcbiAgICogICAgLSBgW2Nhc2VJbnNlbnNpdGl2ZU1hdGNoPWZhbHNlXWAgLSB7Ym9vbGVhbj19IC0gbWF0Y2ggcm91dGVzIHdpdGhvdXQgYmVpbmcgY2FzZSBzZW5zaXRpdmVcclxuICAgKlxyXG4gICAqICAgICAgSWYgdGhlIG9wdGlvbiBpcyBzZXQgdG8gYHRydWVgLCB0aGVuIHRoZSBwYXJ0aWN1bGFyIHJvdXRlIGNhbiBiZSBtYXRjaGVkIHdpdGhvdXQgYmVpbmdcclxuICAgKiAgICAgIGNhc2Ugc2Vuc2l0aXZlXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBzZWxmXHJcbiAgICpcclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKiBBZGRzIGEgbmV3IHJvdXRlIGRlZmluaXRpb24gdG8gdGhlIGAkcm91dGVgIHNlcnZpY2UuXHJcbiAgICovXHJcbiAgdGhpcy53aGVuID0gZnVuY3Rpb24ocGF0aCwgcm91dGUpIHtcclxuICAgIC8vY29weSBvcmlnaW5hbCByb3V0ZSBvYmplY3QgdG8gcHJlc2VydmUgcGFyYW1zIGluaGVyaXRlZCBmcm9tIHByb3RvIGNoYWluXHJcbiAgICB2YXIgcm91dGVDb3B5ID0gYW5ndWxhci5jb3B5KHJvdXRlKTtcclxuICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKHJvdXRlQ29weS5yZWxvYWRPblNlYXJjaCkpIHtcclxuICAgICAgcm91dGVDb3B5LnJlbG9hZE9uU2VhcmNoID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKHJvdXRlQ29weS5jYXNlSW5zZW5zaXRpdmVNYXRjaCkpIHtcclxuICAgICAgcm91dGVDb3B5LmNhc2VJbnNlbnNpdGl2ZU1hdGNoID0gdGhpcy5jYXNlSW5zZW5zaXRpdmVNYXRjaDtcclxuICAgIH1cclxuICAgIHJvdXRlc1twYXRoXSA9IGFuZ3VsYXIuZXh0ZW5kKFxyXG4gICAgICByb3V0ZUNvcHksXHJcbiAgICAgIHBhdGggJiYgcGF0aFJlZ0V4cChwYXRoLCByb3V0ZUNvcHkpXHJcbiAgICApO1xyXG5cclxuICAgIC8vIGNyZWF0ZSByZWRpcmVjdGlvbiBmb3IgdHJhaWxpbmcgc2xhc2hlc1xyXG4gICAgaWYgKHBhdGgpIHtcclxuICAgICAgdmFyIHJlZGlyZWN0UGF0aCA9IChwYXRoW3BhdGgubGVuZ3RoIC0gMV0gPT0gJy8nKVxyXG4gICAgICAgICAgICA/IHBhdGguc3Vic3RyKDAsIHBhdGgubGVuZ3RoIC0gMSlcclxuICAgICAgICAgICAgOiBwYXRoICsgJy8nO1xyXG5cclxuICAgICAgcm91dGVzW3JlZGlyZWN0UGF0aF0gPSBhbmd1bGFyLmV4dGVuZChcclxuICAgICAgICB7cmVkaXJlY3RUbzogcGF0aH0sXHJcbiAgICAgICAgcGF0aFJlZ0V4cChyZWRpcmVjdFBhdGgsIHJvdXRlQ29weSlcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBAbmdkb2MgcHJvcGVydHlcclxuICAgKiBAbmFtZSAkcm91dGVQcm92aWRlciNjYXNlSW5zZW5zaXRpdmVNYXRjaFxyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqXHJcbiAgICogQSBib29sZWFuIHByb3BlcnR5IGluZGljYXRpbmcgaWYgcm91dGVzIGRlZmluZWRcclxuICAgKiB1c2luZyB0aGlzIHByb3ZpZGVyIHNob3VsZCBiZSBtYXRjaGVkIHVzaW5nIGEgY2FzZSBpbnNlbnNpdGl2ZVxyXG4gICAqIGFsZ29yaXRobS4gRGVmYXVsdHMgdG8gYGZhbHNlYC5cclxuICAgKi9cclxuICB0aGlzLmNhc2VJbnNlbnNpdGl2ZU1hdGNoID0gZmFsc2U7XHJcblxyXG4gICAvKipcclxuICAgICogQHBhcmFtIHBhdGgge3N0cmluZ30gcGF0aFxyXG4gICAgKiBAcGFyYW0gb3B0cyB7T2JqZWN0fSBvcHRpb25zXHJcbiAgICAqIEByZXR1cm4gez9PYmplY3R9XHJcbiAgICAqXHJcbiAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgKiBOb3JtYWxpemVzIHRoZSBnaXZlbiBwYXRoLCByZXR1cm5pbmcgYSByZWd1bGFyIGV4cHJlc3Npb25cclxuICAgICogYW5kIHRoZSBvcmlnaW5hbCBwYXRoLlxyXG4gICAgKlxyXG4gICAgKiBJbnNwaXJlZCBieSBwYXRoUmV4cCBpbiB2aXNpb25tZWRpYS9leHByZXNzL2xpYi91dGlscy5qcy5cclxuICAgICovXHJcbiAgZnVuY3Rpb24gcGF0aFJlZ0V4cChwYXRoLCBvcHRzKSB7XHJcbiAgICB2YXIgaW5zZW5zaXRpdmUgPSBvcHRzLmNhc2VJbnNlbnNpdGl2ZU1hdGNoLFxyXG4gICAgICAgIHJldCA9IHtcclxuICAgICAgICAgIG9yaWdpbmFsUGF0aDogcGF0aCxcclxuICAgICAgICAgIHJlZ2V4cDogcGF0aFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAga2V5cyA9IHJldC5rZXlzID0gW107XHJcblxyXG4gICAgcGF0aCA9IHBhdGhcclxuICAgICAgLnJlcGxhY2UoLyhbKCkuXSkvZywgJ1xcXFwkMScpXHJcbiAgICAgIC5yZXBsYWNlKC8oXFwvKT86KFxcdyspKFtcXD9cXCpdKT8vZywgZnVuY3Rpb24oXywgc2xhc2gsIGtleSwgb3B0aW9uKSB7XHJcbiAgICAgICAgdmFyIG9wdGlvbmFsID0gb3B0aW9uID09PSAnPycgPyBvcHRpb24gOiBudWxsO1xyXG4gICAgICAgIHZhciBzdGFyID0gb3B0aW9uID09PSAnKicgPyBvcHRpb24gOiBudWxsO1xyXG4gICAgICAgIGtleXMucHVzaCh7IG5hbWU6IGtleSwgb3B0aW9uYWw6ICEhb3B0aW9uYWwgfSk7XHJcbiAgICAgICAgc2xhc2ggPSBzbGFzaCB8fCAnJztcclxuICAgICAgICByZXR1cm4gJydcclxuICAgICAgICAgICsgKG9wdGlvbmFsID8gJycgOiBzbGFzaClcclxuICAgICAgICAgICsgJyg/OidcclxuICAgICAgICAgICsgKG9wdGlvbmFsID8gc2xhc2ggOiAnJylcclxuICAgICAgICAgICsgKHN0YXIgJiYgJyguKz8pJyB8fCAnKFteL10rKScpXHJcbiAgICAgICAgICArIChvcHRpb25hbCB8fCAnJylcclxuICAgICAgICAgICsgJyknXHJcbiAgICAgICAgICArIChvcHRpb25hbCB8fCAnJyk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5yZXBsYWNlKC8oW1xcLyRcXCpdKS9nLCAnXFxcXCQxJyk7XHJcblxyXG4gICAgcmV0LnJlZ2V4cCA9IG5ldyBSZWdFeHAoJ14nICsgcGF0aCArICckJywgaW5zZW5zaXRpdmUgPyAnaScgOiAnJyk7XHJcbiAgICByZXR1cm4gcmV0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAqIEBuYW1lICRyb3V0ZVByb3ZpZGVyI290aGVyd2lzZVxyXG4gICAqXHJcbiAgICogQGRlc2NyaXB0aW9uXHJcbiAgICogU2V0cyByb3V0ZSBkZWZpbml0aW9uIHRoYXQgd2lsbCBiZSB1c2VkIG9uIHJvdXRlIGNoYW5nZSB3aGVuIG5vIG90aGVyIHJvdXRlIGRlZmluaXRpb25cclxuICAgKiBpcyBtYXRjaGVkLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtPYmplY3R8c3RyaW5nfSBwYXJhbXMgTWFwcGluZyBpbmZvcm1hdGlvbiB0byBiZSBhc3NpZ25lZCB0byBgJHJvdXRlLmN1cnJlbnRgLlxyXG4gICAqIElmIGNhbGxlZCB3aXRoIGEgc3RyaW5nLCB0aGUgdmFsdWUgbWFwcyB0byBgcmVkaXJlY3RUb2AuXHJcbiAgICogQHJldHVybnMge09iamVjdH0gc2VsZlxyXG4gICAqL1xyXG4gIHRoaXMub3RoZXJ3aXNlID0gZnVuY3Rpb24ocGFyYW1zKSB7XHJcbiAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgcGFyYW1zID0ge3JlZGlyZWN0VG86IHBhcmFtc307XHJcbiAgICB9XHJcbiAgICB0aGlzLndoZW4obnVsbCwgcGFyYW1zKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH07XHJcblxyXG5cclxuICB0aGlzLiRnZXQgPSBbJyRyb290U2NvcGUnLFxyXG4gICAgICAgICAgICAgICAnJGxvY2F0aW9uJyxcclxuICAgICAgICAgICAgICAgJyRyb3V0ZVBhcmFtcycsXHJcbiAgICAgICAgICAgICAgICckcScsXHJcbiAgICAgICAgICAgICAgICckaW5qZWN0b3InLFxyXG4gICAgICAgICAgICAgICAnJHRlbXBsYXRlUmVxdWVzdCcsXHJcbiAgICAgICAgICAgICAgICckc2NlJyxcclxuICAgICAgZnVuY3Rpb24oJHJvb3RTY29wZSwgJGxvY2F0aW9uLCAkcm91dGVQYXJhbXMsICRxLCAkaW5qZWN0b3IsICR0ZW1wbGF0ZVJlcXVlc3QsICRzY2UpIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBzZXJ2aWNlXHJcbiAgICAgKiBAbmFtZSAkcm91dGVcclxuICAgICAqIEByZXF1aXJlcyAkbG9jYXRpb25cclxuICAgICAqIEByZXF1aXJlcyAkcm91dGVQYXJhbXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJvcGVydHkge09iamVjdH0gY3VycmVudCBSZWZlcmVuY2UgdG8gdGhlIGN1cnJlbnQgcm91dGUgZGVmaW5pdGlvbi5cclxuICAgICAqIFRoZSByb3V0ZSBkZWZpbml0aW9uIGNvbnRhaW5zOlxyXG4gICAgICpcclxuICAgICAqICAgLSBgY29udHJvbGxlcmA6IFRoZSBjb250cm9sbGVyIGNvbnN0cnVjdG9yIGFzIGRlZmluZSBpbiByb3V0ZSBkZWZpbml0aW9uLlxyXG4gICAgICogICAtIGBsb2NhbHNgOiBBIG1hcCBvZiBsb2NhbHMgd2hpY2ggaXMgdXNlZCBieSB7QGxpbmsgbmcuJGNvbnRyb2xsZXIgJGNvbnRyb2xsZXJ9IHNlcnZpY2UgZm9yXHJcbiAgICAgKiAgICAgY29udHJvbGxlciBpbnN0YW50aWF0aW9uLiBUaGUgYGxvY2Fsc2AgY29udGFpblxyXG4gICAgICogICAgIHRoZSByZXNvbHZlZCB2YWx1ZXMgb2YgdGhlIGByZXNvbHZlYCBtYXAuIEFkZGl0aW9uYWxseSB0aGUgYGxvY2Fsc2AgYWxzbyBjb250YWluOlxyXG4gICAgICpcclxuICAgICAqICAgICAtIGAkc2NvcGVgIC0gVGhlIGN1cnJlbnQgcm91dGUgc2NvcGUuXHJcbiAgICAgKiAgICAgLSBgJHRlbXBsYXRlYCAtIFRoZSBjdXJyZW50IHJvdXRlIHRlbXBsYXRlIEhUTUwuXHJcbiAgICAgKlxyXG4gICAgICogQHByb3BlcnR5IHtPYmplY3R9IHJvdXRlcyBPYmplY3Qgd2l0aCBhbGwgcm91dGUgY29uZmlndXJhdGlvbiBPYmplY3RzIGFzIGl0cyBwcm9wZXJ0aWVzLlxyXG4gICAgICpcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogYCRyb3V0ZWAgaXMgdXNlZCBmb3IgZGVlcC1saW5raW5nIFVSTHMgdG8gY29udHJvbGxlcnMgYW5kIHZpZXdzIChIVE1MIHBhcnRpYWxzKS5cclxuICAgICAqIEl0IHdhdGNoZXMgYCRsb2NhdGlvbi51cmwoKWAgYW5kIHRyaWVzIHRvIG1hcCB0aGUgcGF0aCB0byBhbiBleGlzdGluZyByb3V0ZSBkZWZpbml0aW9uLlxyXG4gICAgICpcclxuICAgICAqIFJlcXVpcmVzIHRoZSB7QGxpbmsgbmdSb3V0ZSBgbmdSb3V0ZWB9IG1vZHVsZSB0byBiZSBpbnN0YWxsZWQuXHJcbiAgICAgKlxyXG4gICAgICogWW91IGNhbiBkZWZpbmUgcm91dGVzIHRocm91Z2gge0BsaW5rIG5nUm91dGUuJHJvdXRlUHJvdmlkZXIgJHJvdXRlUHJvdmlkZXJ9J3MgQVBJLlxyXG4gICAgICpcclxuICAgICAqIFRoZSBgJHJvdXRlYCBzZXJ2aWNlIGlzIHR5cGljYWxseSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggdGhlXHJcbiAgICAgKiB7QGxpbmsgbmdSb3V0ZS5kaXJlY3RpdmU6bmdWaWV3IGBuZ1ZpZXdgfSBkaXJlY3RpdmUgYW5kIHRoZVxyXG4gICAgICoge0BsaW5rIG5nUm91dGUuJHJvdXRlUGFyYW1zIGAkcm91dGVQYXJhbXNgfSBzZXJ2aWNlLlxyXG4gICAgICpcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBUaGlzIGV4YW1wbGUgc2hvd3MgaG93IGNoYW5naW5nIHRoZSBVUkwgaGFzaCBjYXVzZXMgdGhlIGAkcm91dGVgIHRvIG1hdGNoIGEgcm91dGUgYWdhaW5zdCB0aGVcclxuICAgICAqIFVSTCwgYW5kIHRoZSBgbmdWaWV3YCBwdWxscyBpbiB0aGUgcGFydGlhbC5cclxuICAgICAqXHJcbiAgICAgKiA8ZXhhbXBsZSBuYW1lPVwiJHJvdXRlLXNlcnZpY2VcIiBtb2R1bGU9XCJuZ1JvdXRlRXhhbXBsZVwiXHJcbiAgICAgKiAgICAgICAgICBkZXBzPVwiYW5ndWxhci1yb3V0ZS5qc1wiIGZpeEJhc2U9XCJ0cnVlXCI+XHJcbiAgICAgKiAgIDxmaWxlIG5hbWU9XCJpbmRleC5odG1sXCI+XHJcbiAgICAgKiAgICAgPGRpdiBuZy1jb250cm9sbGVyPVwiTWFpbkNvbnRyb2xsZXJcIj5cclxuICAgICAqICAgICAgIENob29zZTpcclxuICAgICAqICAgICAgIDxhIGhyZWY9XCJCb29rL01vYnlcIj5Nb2J5PC9hPiB8XHJcbiAgICAgKiAgICAgICA8YSBocmVmPVwiQm9vay9Nb2J5L2NoLzFcIj5Nb2J5OiBDaDE8L2E+IHxcclxuICAgICAqICAgICAgIDxhIGhyZWY9XCJCb29rL0dhdHNieVwiPkdhdHNieTwvYT4gfFxyXG4gICAgICogICAgICAgPGEgaHJlZj1cIkJvb2svR2F0c2J5L2NoLzQ/a2V5PXZhbHVlXCI+R2F0c2J5OiBDaDQ8L2E+IHxcclxuICAgICAqICAgICAgIDxhIGhyZWY9XCJCb29rL1NjYXJsZXRcIj5TY2FybGV0IExldHRlcjwvYT48YnIvPlxyXG4gICAgICpcclxuICAgICAqICAgICAgIDxkaXYgbmctdmlldz48L2Rpdj5cclxuICAgICAqXHJcbiAgICAgKiAgICAgICA8aHIgLz5cclxuICAgICAqXHJcbiAgICAgKiAgICAgICA8cHJlPiRsb2NhdGlvbi5wYXRoKCkgPSB7eyRsb2NhdGlvbi5wYXRoKCl9fTwvcHJlPlxyXG4gICAgICogICAgICAgPHByZT4kcm91dGUuY3VycmVudC50ZW1wbGF0ZVVybCA9IHt7JHJvdXRlLmN1cnJlbnQudGVtcGxhdGVVcmx9fTwvcHJlPlxyXG4gICAgICogICAgICAgPHByZT4kcm91dGUuY3VycmVudC5wYXJhbXMgPSB7eyRyb3V0ZS5jdXJyZW50LnBhcmFtc319PC9wcmU+XHJcbiAgICAgKiAgICAgICA8cHJlPiRyb3V0ZS5jdXJyZW50LnNjb3BlLm5hbWUgPSB7eyRyb3V0ZS5jdXJyZW50LnNjb3BlLm5hbWV9fTwvcHJlPlxyXG4gICAgICogICAgICAgPHByZT4kcm91dGVQYXJhbXMgPSB7eyRyb3V0ZVBhcmFtc319PC9wcmU+XHJcbiAgICAgKiAgICAgPC9kaXY+XHJcbiAgICAgKiAgIDwvZmlsZT5cclxuICAgICAqXHJcbiAgICAgKiAgIDxmaWxlIG5hbWU9XCJib29rLmh0bWxcIj5cclxuICAgICAqICAgICBjb250cm9sbGVyOiB7e25hbWV9fTxiciAvPlxyXG4gICAgICogICAgIEJvb2sgSWQ6IHt7cGFyYW1zLmJvb2tJZH19PGJyIC8+XHJcbiAgICAgKiAgIDwvZmlsZT5cclxuICAgICAqXHJcbiAgICAgKiAgIDxmaWxlIG5hbWU9XCJjaGFwdGVyLmh0bWxcIj5cclxuICAgICAqICAgICBjb250cm9sbGVyOiB7e25hbWV9fTxiciAvPlxyXG4gICAgICogICAgIEJvb2sgSWQ6IHt7cGFyYW1zLmJvb2tJZH19PGJyIC8+XHJcbiAgICAgKiAgICAgQ2hhcHRlciBJZDoge3twYXJhbXMuY2hhcHRlcklkfX1cclxuICAgICAqICAgPC9maWxlPlxyXG4gICAgICpcclxuICAgICAqICAgPGZpbGUgbmFtZT1cInNjcmlwdC5qc1wiPlxyXG4gICAgICogICAgIGFuZ3VsYXIubW9kdWxlKCduZ1JvdXRlRXhhbXBsZScsIFsnbmdSb3V0ZSddKVxyXG4gICAgICpcclxuICAgICAqICAgICAgLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCAkcm91dGUsICRyb3V0ZVBhcmFtcywgJGxvY2F0aW9uKSB7XHJcbiAgICAgKiAgICAgICAgICAkc2NvcGUuJHJvdXRlID0gJHJvdXRlO1xyXG4gICAgICogICAgICAgICAgJHNjb3BlLiRsb2NhdGlvbiA9ICRsb2NhdGlvbjtcclxuICAgICAqICAgICAgICAgICRzY29wZS4kcm91dGVQYXJhbXMgPSAkcm91dGVQYXJhbXM7XHJcbiAgICAgKiAgICAgIH0pXHJcbiAgICAgKlxyXG4gICAgICogICAgICAuY29udHJvbGxlcignQm9va0NvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsICRyb3V0ZVBhcmFtcykge1xyXG4gICAgICogICAgICAgICAgJHNjb3BlLm5hbWUgPSBcIkJvb2tDb250cm9sbGVyXCI7XHJcbiAgICAgKiAgICAgICAgICAkc2NvcGUucGFyYW1zID0gJHJvdXRlUGFyYW1zO1xyXG4gICAgICogICAgICB9KVxyXG4gICAgICpcclxuICAgICAqICAgICAgLmNvbnRyb2xsZXIoJ0NoYXB0ZXJDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCAkcm91dGVQYXJhbXMpIHtcclxuICAgICAqICAgICAgICAgICRzY29wZS5uYW1lID0gXCJDaGFwdGVyQ29udHJvbGxlclwiO1xyXG4gICAgICogICAgICAgICAgJHNjb3BlLnBhcmFtcyA9ICRyb3V0ZVBhcmFtcztcclxuICAgICAqICAgICAgfSlcclxuICAgICAqXHJcbiAgICAgKiAgICAgLmNvbmZpZyhmdW5jdGlvbigkcm91dGVQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcclxuICAgICAqICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgKiAgICAgICAgLndoZW4oJy9Cb29rLzpib29rSWQnLCB7XHJcbiAgICAgKiAgICAgICAgIHRlbXBsYXRlVXJsOiAnYm9vay5odG1sJyxcclxuICAgICAqICAgICAgICAgY29udHJvbGxlcjogJ0Jvb2tDb250cm9sbGVyJyxcclxuICAgICAqICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICogICAgICAgICAgIC8vIEkgd2lsbCBjYXVzZSBhIDEgc2Vjb25kIGRlbGF5XHJcbiAgICAgKiAgICAgICAgICAgZGVsYXk6IGZ1bmN0aW9uKCRxLCAkdGltZW91dCkge1xyXG4gICAgICogICAgICAgICAgICAgdmFyIGRlbGF5ID0gJHEuZGVmZXIoKTtcclxuICAgICAqICAgICAgICAgICAgICR0aW1lb3V0KGRlbGF5LnJlc29sdmUsIDEwMDApO1xyXG4gICAgICogICAgICAgICAgICAgcmV0dXJuIGRlbGF5LnByb21pc2U7XHJcbiAgICAgKiAgICAgICAgICAgfVxyXG4gICAgICogICAgICAgICB9XHJcbiAgICAgKiAgICAgICB9KVxyXG4gICAgICogICAgICAgLndoZW4oJy9Cb29rLzpib29rSWQvY2gvOmNoYXB0ZXJJZCcsIHtcclxuICAgICAqICAgICAgICAgdGVtcGxhdGVVcmw6ICdjaGFwdGVyLmh0bWwnLFxyXG4gICAgICogICAgICAgICBjb250cm9sbGVyOiAnQ2hhcHRlckNvbnRyb2xsZXInXHJcbiAgICAgKiAgICAgICB9KTtcclxuICAgICAqXHJcbiAgICAgKiAgICAgICAvLyBjb25maWd1cmUgaHRtbDUgdG8gZ2V0IGxpbmtzIHdvcmtpbmcgb24ganNmaWRkbGVcclxuICAgICAqICAgICAgICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh0cnVlKTtcclxuICAgICAqICAgICB9KTtcclxuICAgICAqXHJcbiAgICAgKiAgIDwvZmlsZT5cclxuICAgICAqXHJcbiAgICAgKiAgIDxmaWxlIG5hbWU9XCJwcm90cmFjdG9yLmpzXCIgdHlwZT1cInByb3RyYWN0b3JcIj5cclxuICAgICAqICAgICBpdCgnc2hvdWxkIGxvYWQgYW5kIGNvbXBpbGUgY29ycmVjdCB0ZW1wbGF0ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICogICAgICAgZWxlbWVudChieS5saW5rVGV4dCgnTW9ieTogQ2gxJykpLmNsaWNrKCk7XHJcbiAgICAgKiAgICAgICB2YXIgY29udGVudCA9IGVsZW1lbnQoYnkuY3NzKCdbbmctdmlld10nKSkuZ2V0VGV4dCgpO1xyXG4gICAgICogICAgICAgZXhwZWN0KGNvbnRlbnQpLnRvTWF0Y2goL2NvbnRyb2xsZXJcXDogQ2hhcHRlckNvbnRyb2xsZXIvKTtcclxuICAgICAqICAgICAgIGV4cGVjdChjb250ZW50KS50b01hdGNoKC9Cb29rIElkXFw6IE1vYnkvKTtcclxuICAgICAqICAgICAgIGV4cGVjdChjb250ZW50KS50b01hdGNoKC9DaGFwdGVyIElkXFw6IDEvKTtcclxuICAgICAqXHJcbiAgICAgKiAgICAgICBlbGVtZW50KGJ5LnBhcnRpYWxMaW5rVGV4dCgnU2NhcmxldCcpKS5jbGljaygpO1xyXG4gICAgICpcclxuICAgICAqICAgICAgIGNvbnRlbnQgPSBlbGVtZW50KGJ5LmNzcygnW25nLXZpZXddJykpLmdldFRleHQoKTtcclxuICAgICAqICAgICAgIGV4cGVjdChjb250ZW50KS50b01hdGNoKC9jb250cm9sbGVyXFw6IEJvb2tDb250cm9sbGVyLyk7XHJcbiAgICAgKiAgICAgICBleHBlY3QoY29udGVudCkudG9NYXRjaCgvQm9vayBJZFxcOiBTY2FybGV0Lyk7XHJcbiAgICAgKiAgICAgfSk7XHJcbiAgICAgKiAgIDwvZmlsZT5cclxuICAgICAqIDwvZXhhbXBsZT5cclxuICAgICAqL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIGV2ZW50XHJcbiAgICAgKiBAbmFtZSAkcm91dGUjJHJvdXRlQ2hhbmdlU3RhcnRcclxuICAgICAqIEBldmVudFR5cGUgYnJvYWRjYXN0IG9uIHJvb3Qgc2NvcGVcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogQnJvYWRjYXN0ZWQgYmVmb3JlIGEgcm91dGUgY2hhbmdlLiBBdCB0aGlzICBwb2ludCB0aGUgcm91dGUgc2VydmljZXMgc3RhcnRzXHJcbiAgICAgKiByZXNvbHZpbmcgYWxsIG9mIHRoZSBkZXBlbmRlbmNpZXMgbmVlZGVkIGZvciB0aGUgcm91dGUgY2hhbmdlIHRvIG9jY3VyLlxyXG4gICAgICogVHlwaWNhbGx5IHRoaXMgaW52b2x2ZXMgZmV0Y2hpbmcgdGhlIHZpZXcgdGVtcGxhdGUgYXMgd2VsbCBhcyBhbnkgZGVwZW5kZW5jaWVzXHJcbiAgICAgKiBkZWZpbmVkIGluIGByZXNvbHZlYCByb3V0ZSBwcm9wZXJ0eS4gT25jZSAgYWxsIG9mIHRoZSBkZXBlbmRlbmNpZXMgYXJlIHJlc29sdmVkXHJcbiAgICAgKiBgJHJvdXRlQ2hhbmdlU3VjY2Vzc2AgaXMgZmlyZWQuXHJcbiAgICAgKlxyXG4gICAgICogVGhlIHJvdXRlIGNoYW5nZSAoYW5kIHRoZSBgJGxvY2F0aW9uYCBjaGFuZ2UgdGhhdCB0cmlnZ2VyZWQgaXQpIGNhbiBiZSBwcmV2ZW50ZWRcclxuICAgICAqIGJ5IGNhbGxpbmcgYHByZXZlbnREZWZhdWx0YCBtZXRob2Qgb2YgdGhlIGV2ZW50LiBTZWUge0BsaW5rIG5nLiRyb290U2NvcGUuU2NvcGUjJG9ufVxyXG4gICAgICogZm9yIG1vcmUgZGV0YWlscyBhYm91dCBldmVudCBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGFuZ3VsYXJFdmVudCBTeW50aGV0aWMgZXZlbnQgb2JqZWN0LlxyXG4gICAgICogQHBhcmFtIHtSb3V0ZX0gbmV4dCBGdXR1cmUgcm91dGUgaW5mb3JtYXRpb24uXHJcbiAgICAgKiBAcGFyYW0ge1JvdXRlfSBjdXJyZW50IEN1cnJlbnQgcm91dGUgaW5mb3JtYXRpb24uXHJcbiAgICAgKi9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBldmVudFxyXG4gICAgICogQG5hbWUgJHJvdXRlIyRyb3V0ZUNoYW5nZVN1Y2Nlc3NcclxuICAgICAqIEBldmVudFR5cGUgYnJvYWRjYXN0IG9uIHJvb3Qgc2NvcGVcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogQnJvYWRjYXN0ZWQgYWZ0ZXIgYSByb3V0ZSBjaGFuZ2UgaGFzIGhhcHBlbmVkIHN1Y2Nlc3NmdWxseS5cclxuICAgICAqIFRoZSBgcmVzb2x2ZWAgZGVwZW5kZW5jaWVzIGFyZSBub3cgYXZhaWxhYmxlIGluIHRoZSBgY3VycmVudC5sb2NhbHNgIHByb3BlcnR5LlxyXG4gICAgICpcclxuICAgICAqIHtAbGluayBuZ1JvdXRlLmRpcmVjdGl2ZTpuZ1ZpZXcgbmdWaWV3fSBsaXN0ZW5zIGZvciB0aGUgZGlyZWN0aXZlXHJcbiAgICAgKiB0byBpbnN0YW50aWF0ZSB0aGUgY29udHJvbGxlciBhbmQgcmVuZGVyIHRoZSB2aWV3LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhbmd1bGFyRXZlbnQgU3ludGhldGljIGV2ZW50IG9iamVjdC5cclxuICAgICAqIEBwYXJhbSB7Um91dGV9IGN1cnJlbnQgQ3VycmVudCByb3V0ZSBpbmZvcm1hdGlvbi5cclxuICAgICAqIEBwYXJhbSB7Um91dGV8VW5kZWZpbmVkfSBwcmV2aW91cyBQcmV2aW91cyByb3V0ZSBpbmZvcm1hdGlvbiwgb3IgdW5kZWZpbmVkIGlmIGN1cnJlbnQgaXNcclxuICAgICAqIGZpcnN0IHJvdXRlIGVudGVyZWQuXHJcbiAgICAgKi9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBldmVudFxyXG4gICAgICogQG5hbWUgJHJvdXRlIyRyb3V0ZUNoYW5nZUVycm9yXHJcbiAgICAgKiBAZXZlbnRUeXBlIGJyb2FkY2FzdCBvbiByb290IHNjb3BlXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIEJyb2FkY2FzdGVkIGlmIGFueSBvZiB0aGUgcmVzb2x2ZSBwcm9taXNlcyBhcmUgcmVqZWN0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGFuZ3VsYXJFdmVudCBTeW50aGV0aWMgZXZlbnQgb2JqZWN0XHJcbiAgICAgKiBAcGFyYW0ge1JvdXRlfSBjdXJyZW50IEN1cnJlbnQgcm91dGUgaW5mb3JtYXRpb24uXHJcbiAgICAgKiBAcGFyYW0ge1JvdXRlfSBwcmV2aW91cyBQcmV2aW91cyByb3V0ZSBpbmZvcm1hdGlvbi5cclxuICAgICAqIEBwYXJhbSB7Um91dGV9IHJlamVjdGlvbiBSZWplY3Rpb24gb2YgdGhlIHByb21pc2UuIFVzdWFsbHkgdGhlIGVycm9yIG9mIHRoZSBmYWlsZWQgcHJvbWlzZS5cclxuICAgICAqL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIGV2ZW50XHJcbiAgICAgKiBAbmFtZSAkcm91dGUjJHJvdXRlVXBkYXRlXHJcbiAgICAgKiBAZXZlbnRUeXBlIGJyb2FkY2FzdCBvbiByb290IHNjb3BlXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIFRoZSBgcmVsb2FkT25TZWFyY2hgIHByb3BlcnR5IGhhcyBiZWVuIHNldCB0byBmYWxzZSwgYW5kIHdlIGFyZSByZXVzaW5nIHRoZSBzYW1lXHJcbiAgICAgKiBpbnN0YW5jZSBvZiB0aGUgQ29udHJvbGxlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYW5ndWxhckV2ZW50IFN5bnRoZXRpYyBldmVudCBvYmplY3RcclxuICAgICAqIEBwYXJhbSB7Um91dGV9IGN1cnJlbnQgQ3VycmVudC9wcmV2aW91cyByb3V0ZSBpbmZvcm1hdGlvbi5cclxuICAgICAqL1xyXG5cclxuICAgIHZhciBmb3JjZVJlbG9hZCA9IGZhbHNlLFxyXG4gICAgICAgIHByZXBhcmVkUm91dGUsXHJcbiAgICAgICAgcHJlcGFyZWRSb3V0ZUlzVXBkYXRlT25seSxcclxuICAgICAgICAkcm91dGUgPSB7XHJcbiAgICAgICAgICByb3V0ZXM6IHJvdXRlcyxcclxuXHJcbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAgICAgICAqIEBuYW1lICRyb3V0ZSNyZWxvYWRcclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAgICAgICAqIENhdXNlcyBgJHJvdXRlYCBzZXJ2aWNlIHRvIHJlbG9hZCB0aGUgY3VycmVudCByb3V0ZSBldmVuIGlmXHJcbiAgICAgICAgICAgKiB7QGxpbmsgbmcuJGxvY2F0aW9uICRsb2NhdGlvbn0gaGFzbid0IGNoYW5nZWQuXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQXMgYSByZXN1bHQgb2YgdGhhdCwge0BsaW5rIG5nUm91dGUuZGlyZWN0aXZlOm5nVmlldyBuZ1ZpZXd9XHJcbiAgICAgICAgICAgKiBjcmVhdGVzIG5ldyBzY29wZSBhbmQgcmVpbnN0YW50aWF0ZXMgdGhlIGNvbnRyb2xsZXIuXHJcbiAgICAgICAgICAgKi9cclxuICAgICAgICAgIHJlbG9hZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGZvcmNlUmVsb2FkID0gdHJ1ZTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kZXZhbEFzeW5jKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgIC8vIERvbid0IHN1cHBvcnQgY2FuY2VsbGF0aW9uIG9mIGEgcmVsb2FkIGZvciBub3cuLi5cclxuICAgICAgICAgICAgICBwcmVwYXJlUm91dGUoKTtcclxuICAgICAgICAgICAgICBjb21taXRSb3V0ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgICAgICAgKiBAbmFtZSAkcm91dGUjdXBkYXRlUGFyYW1zXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgICAgICAgKiBDYXVzZXMgYCRyb3V0ZWAgc2VydmljZSB0byB1cGRhdGUgdGhlIGN1cnJlbnQgVVJMLCByZXBsYWNpbmdcclxuICAgICAgICAgICAqIGN1cnJlbnQgcm91dGUgcGFyYW1ldGVycyB3aXRoIHRob3NlIHNwZWNpZmllZCBpbiBgbmV3UGFyYW1zYC5cclxuICAgICAgICAgICAqIFByb3ZpZGVkIHByb3BlcnR5IG5hbWVzIHRoYXQgbWF0Y2ggdGhlIHJvdXRlJ3MgcGF0aCBzZWdtZW50XHJcbiAgICAgICAgICAgKiBkZWZpbml0aW9ucyB3aWxsIGJlIGludGVycG9sYXRlZCBpbnRvIHRoZSBsb2NhdGlvbidzIHBhdGgsIHdoaWxlXHJcbiAgICAgICAgICAgKiByZW1haW5pbmcgcHJvcGVydGllcyB3aWxsIGJlIHRyZWF0ZWQgYXMgcXVlcnkgcGFyYW1zLlxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEBwYXJhbSB7IU9iamVjdDxzdHJpbmcsIHN0cmluZz59IG5ld1BhcmFtcyBtYXBwaW5nIG9mIFVSTCBwYXJhbWV0ZXIgbmFtZXMgdG8gdmFsdWVzXHJcbiAgICAgICAgICAgKi9cclxuICAgICAgICAgIHVwZGF0ZVBhcmFtczogZnVuY3Rpb24obmV3UGFyYW1zKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnQgJiYgdGhpcy5jdXJyZW50LiQkcm91dGUpIHtcclxuICAgICAgICAgICAgICBuZXdQYXJhbXMgPSBhbmd1bGFyLmV4dGVuZCh7fSwgdGhpcy5jdXJyZW50LnBhcmFtcywgbmV3UGFyYW1zKTtcclxuICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aChpbnRlcnBvbGF0ZSh0aGlzLmN1cnJlbnQuJCRyb3V0ZS5vcmlnaW5hbFBhdGgsIG5ld1BhcmFtcykpO1xyXG4gICAgICAgICAgICAgIC8vIGludGVycG9sYXRlIG1vZGlmaWVzIG5ld1BhcmFtcywgb25seSBxdWVyeSBwYXJhbXMgYXJlIGxlZnRcclxuICAgICAgICAgICAgICAkbG9jYXRpb24uc2VhcmNoKG5ld1BhcmFtcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGhyb3cgJHJvdXRlTWluRXJyKCdub3JvdXQnLCAnVHJpZWQgdXBkYXRpbmcgcm91dGUgd2hlbiB3aXRoIG5vIGN1cnJlbnQgcm91dGUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgJHJvb3RTY29wZS4kb24oJyRsb2NhdGlvbkNoYW5nZVN0YXJ0JywgcHJlcGFyZVJvdXRlKTtcclxuICAgICRyb290U2NvcGUuJG9uKCckbG9jYXRpb25DaGFuZ2VTdWNjZXNzJywgY29tbWl0Um91dGUpO1xyXG5cclxuICAgIHJldHVybiAkcm91dGU7XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBvbiB7c3RyaW5nfSBjdXJyZW50IHVybFxyXG4gICAgICogQHBhcmFtIHJvdXRlIHtPYmplY3R9IHJvdXRlIHJlZ2V4cCB0byBtYXRjaCB0aGUgdXJsIGFnYWluc3RcclxuICAgICAqIEByZXR1cm4gez9PYmplY3R9XHJcbiAgICAgKlxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBDaGVjayBpZiB0aGUgcm91dGUgbWF0Y2hlcyB0aGUgY3VycmVudCB1cmwuXHJcbiAgICAgKlxyXG4gICAgICogSW5zcGlyZWQgYnkgbWF0Y2ggaW5cclxuICAgICAqIHZpc2lvbm1lZGlhL2V4cHJlc3MvbGliL3JvdXRlci9yb3V0ZXIuanMuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHN3aXRjaFJvdXRlTWF0Y2hlcihvbiwgcm91dGUpIHtcclxuICAgICAgdmFyIGtleXMgPSByb3V0ZS5rZXlzLFxyXG4gICAgICAgICAgcGFyYW1zID0ge307XHJcblxyXG4gICAgICBpZiAoIXJvdXRlLnJlZ2V4cCkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICB2YXIgbSA9IHJvdXRlLnJlZ2V4cC5leGVjKG9uKTtcclxuICAgICAgaWYgKCFtKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgIGZvciAodmFyIGkgPSAxLCBsZW4gPSBtLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgICAgdmFyIGtleSA9IGtleXNbaSAtIDFdO1xyXG5cclxuICAgICAgICB2YXIgdmFsID0gbVtpXTtcclxuXHJcbiAgICAgICAgaWYgKGtleSAmJiB2YWwpIHtcclxuICAgICAgICAgIHBhcmFtc1trZXkubmFtZV0gPSB2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBwYXJhbXM7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcHJlcGFyZVJvdXRlKCRsb2NhdGlvbkV2ZW50KSB7XHJcbiAgICAgIHZhciBsYXN0Um91dGUgPSAkcm91dGUuY3VycmVudDtcclxuXHJcbiAgICAgIHByZXBhcmVkUm91dGUgPSBwYXJzZVJvdXRlKCk7XHJcbiAgICAgIHByZXBhcmVkUm91dGVJc1VwZGF0ZU9ubHkgPSBwcmVwYXJlZFJvdXRlICYmIGxhc3RSb3V0ZSAmJiBwcmVwYXJlZFJvdXRlLiQkcm91dGUgPT09IGxhc3RSb3V0ZS4kJHJvdXRlXHJcbiAgICAgICAgICAmJiBhbmd1bGFyLmVxdWFscyhwcmVwYXJlZFJvdXRlLnBhdGhQYXJhbXMsIGxhc3RSb3V0ZS5wYXRoUGFyYW1zKVxyXG4gICAgICAgICAgJiYgIXByZXBhcmVkUm91dGUucmVsb2FkT25TZWFyY2ggJiYgIWZvcmNlUmVsb2FkO1xyXG5cclxuICAgICAgaWYgKCFwcmVwYXJlZFJvdXRlSXNVcGRhdGVPbmx5ICYmIChsYXN0Um91dGUgfHwgcHJlcGFyZWRSb3V0ZSkpIHtcclxuICAgICAgICBpZiAoJHJvb3RTY29wZS4kYnJvYWRjYXN0KCckcm91dGVDaGFuZ2VTdGFydCcsIHByZXBhcmVkUm91dGUsIGxhc3RSb3V0ZSkuZGVmYXVsdFByZXZlbnRlZCkge1xyXG4gICAgICAgICAgaWYgKCRsb2NhdGlvbkV2ZW50KSB7XHJcbiAgICAgICAgICAgICRsb2NhdGlvbkV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY29tbWl0Um91dGUoKSB7XHJcbiAgICAgIHZhciBsYXN0Um91dGUgPSAkcm91dGUuY3VycmVudDtcclxuICAgICAgdmFyIG5leHRSb3V0ZSA9IHByZXBhcmVkUm91dGU7XHJcblxyXG4gICAgICBpZiAocHJlcGFyZWRSb3V0ZUlzVXBkYXRlT25seSkge1xyXG4gICAgICAgIGxhc3RSb3V0ZS5wYXJhbXMgPSBuZXh0Um91dGUucGFyYW1zO1xyXG4gICAgICAgIGFuZ3VsYXIuY29weShsYXN0Um91dGUucGFyYW1zLCAkcm91dGVQYXJhbXMpO1xyXG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnJHJvdXRlVXBkYXRlJywgbGFzdFJvdXRlKTtcclxuICAgICAgfSBlbHNlIGlmIChuZXh0Um91dGUgfHwgbGFzdFJvdXRlKSB7XHJcbiAgICAgICAgZm9yY2VSZWxvYWQgPSBmYWxzZTtcclxuICAgICAgICAkcm91dGUuY3VycmVudCA9IG5leHRSb3V0ZTtcclxuICAgICAgICBpZiAobmV4dFJvdXRlKSB7XHJcbiAgICAgICAgICBpZiAobmV4dFJvdXRlLnJlZGlyZWN0VG8pIHtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcobmV4dFJvdXRlLnJlZGlyZWN0VG8pKSB7XHJcbiAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoaW50ZXJwb2xhdGUobmV4dFJvdXRlLnJlZGlyZWN0VG8sIG5leHRSb3V0ZS5wYXJhbXMpKS5zZWFyY2gobmV4dFJvdXRlLnBhcmFtcylcclxuICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICRsb2NhdGlvbi51cmwobmV4dFJvdXRlLnJlZGlyZWN0VG8obmV4dFJvdXRlLnBhdGhQYXJhbXMsICRsb2NhdGlvbi5wYXRoKCksICRsb2NhdGlvbi5zZWFyY2goKSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHEud2hlbihuZXh0Um91dGUpLlxyXG4gICAgICAgICAgdGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKG5leHRSb3V0ZSkge1xyXG4gICAgICAgICAgICAgIHZhciBsb2NhbHMgPSBhbmd1bGFyLmV4dGVuZCh7fSwgbmV4dFJvdXRlLnJlc29sdmUpLFxyXG4gICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSwgdGVtcGxhdGVVcmw7XHJcblxyXG4gICAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChsb2NhbHMsIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcclxuICAgICAgICAgICAgICAgIGxvY2Fsc1trZXldID0gYW5ndWxhci5pc1N0cmluZyh2YWx1ZSkgP1xyXG4gICAgICAgICAgICAgICAgICAgICRpbmplY3Rvci5nZXQodmFsdWUpIDogJGluamVjdG9yLmludm9rZSh2YWx1ZSwgbnVsbCwgbnVsbCwga2V5KTtcclxuICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHRlbXBsYXRlID0gbmV4dFJvdXRlLnRlbXBsYXRlKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbih0ZW1wbGF0ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZShuZXh0Um91dGUucGFyYW1zKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHRlbXBsYXRlVXJsID0gbmV4dFJvdXRlLnRlbXBsYXRlVXJsKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbih0ZW1wbGF0ZVVybCkpIHtcclxuICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmwgPSB0ZW1wbGF0ZVVybChuZXh0Um91dGUucGFyYW1zKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCh0ZW1wbGF0ZVVybCkpIHtcclxuICAgICAgICAgICAgICAgICAgbmV4dFJvdXRlLmxvYWRlZFRlbXBsYXRlVXJsID0gJHNjZS52YWx1ZU9mKHRlbXBsYXRlVXJsKTtcclxuICAgICAgICAgICAgICAgICAgdGVtcGxhdGUgPSAkdGVtcGxhdGVSZXF1ZXN0KHRlbXBsYXRlVXJsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHRlbXBsYXRlKSkge1xyXG4gICAgICAgICAgICAgICAgbG9jYWxzWyckdGVtcGxhdGUnXSA9IHRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICByZXR1cm4gJHEuYWxsKGxvY2Fscyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pLlxyXG4gICAgICAgICAgLy8gYWZ0ZXIgcm91dGUgY2hhbmdlXHJcbiAgICAgICAgICB0aGVuKGZ1bmN0aW9uKGxvY2Fscykge1xyXG4gICAgICAgICAgICBpZiAobmV4dFJvdXRlID09ICRyb3V0ZS5jdXJyZW50KSB7XHJcbiAgICAgICAgICAgICAgaWYgKG5leHRSb3V0ZSkge1xyXG4gICAgICAgICAgICAgICAgbmV4dFJvdXRlLmxvY2FscyA9IGxvY2FscztcclxuICAgICAgICAgICAgICAgIGFuZ3VsYXIuY29weShuZXh0Um91dGUucGFyYW1zLCAkcm91dGVQYXJhbXMpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJyRyb3V0ZUNoYW5nZVN1Y2Nlc3MnLCBuZXh0Um91dGUsIGxhc3RSb3V0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXh0Um91dGUgPT0gJHJvdXRlLmN1cnJlbnQpIHtcclxuICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJyRyb3V0ZUNoYW5nZUVycm9yJywgbmV4dFJvdXRlLCBsYXN0Um91dGUsIGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSB0aGUgY3VycmVudCBhY3RpdmUgcm91dGUsIGJ5IG1hdGNoaW5nIGl0IGFnYWluc3QgdGhlIFVSTFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBwYXJzZVJvdXRlKCkge1xyXG4gICAgICAvLyBNYXRjaCBhIHJvdXRlXHJcbiAgICAgIHZhciBwYXJhbXMsIG1hdGNoO1xyXG4gICAgICBhbmd1bGFyLmZvckVhY2gocm91dGVzLCBmdW5jdGlvbihyb3V0ZSwgcGF0aCkge1xyXG4gICAgICAgIGlmICghbWF0Y2ggJiYgKHBhcmFtcyA9IHN3aXRjaFJvdXRlTWF0Y2hlcigkbG9jYXRpb24ucGF0aCgpLCByb3V0ZSkpKSB7XHJcbiAgICAgICAgICBtYXRjaCA9IGluaGVyaXQocm91dGUsIHtcclxuICAgICAgICAgICAgcGFyYW1zOiBhbmd1bGFyLmV4dGVuZCh7fSwgJGxvY2F0aW9uLnNlYXJjaCgpLCBwYXJhbXMpLFxyXG4gICAgICAgICAgICBwYXRoUGFyYW1zOiBwYXJhbXN9KTtcclxuICAgICAgICAgIG1hdGNoLiQkcm91dGUgPSByb3V0ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBObyByb3V0ZSBtYXRjaGVkOyBmYWxsYmFjayB0byBcIm90aGVyd2lzZVwiIHJvdXRlXHJcbiAgICAgIHJldHVybiBtYXRjaCB8fCByb3V0ZXNbbnVsbF0gJiYgaW5oZXJpdChyb3V0ZXNbbnVsbF0sIHtwYXJhbXM6IHt9LCBwYXRoUGFyYW1zOnt9fSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBpbnRlcnBvbGF0aW9uIG9mIHRoZSByZWRpcmVjdCBwYXRoIHdpdGggdGhlIHBhcmFtZXRlcnNcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gaW50ZXJwb2xhdGUoc3RyaW5nLCBwYXJhbXMpIHtcclxuICAgICAgdmFyIHJlc3VsdCA9IFtdO1xyXG4gICAgICBhbmd1bGFyLmZvckVhY2goKHN0cmluZyB8fCAnJykuc3BsaXQoJzonKSwgZnVuY3Rpb24oc2VnbWVudCwgaSkge1xyXG4gICAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgICByZXN1bHQucHVzaChzZWdtZW50KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdmFyIHNlZ21lbnRNYXRjaCA9IHNlZ21lbnQubWF0Y2goLyhcXHcrKSg/Ols/Kl0pPyguKikvKTtcclxuICAgICAgICAgIHZhciBrZXkgPSBzZWdtZW50TWF0Y2hbMV07XHJcbiAgICAgICAgICByZXN1bHQucHVzaChwYXJhbXNba2V5XSk7XHJcbiAgICAgICAgICByZXN1bHQucHVzaChzZWdtZW50TWF0Y2hbMl0gfHwgJycpO1xyXG4gICAgICAgICAgZGVsZXRlIHBhcmFtc1trZXldO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiByZXN1bHQuam9pbignJyk7XHJcbiAgICB9XHJcbiAgfV07XHJcbn1cclxuXHJcbm5nUm91dGVNb2R1bGUucHJvdmlkZXIoJyRyb3V0ZVBhcmFtcycsICRSb3V0ZVBhcmFtc1Byb3ZpZGVyKTtcclxuXHJcblxyXG4vKipcclxuICogQG5nZG9jIHNlcnZpY2VcclxuICogQG5hbWUgJHJvdXRlUGFyYW1zXHJcbiAqIEByZXF1aXJlcyAkcm91dGVcclxuICpcclxuICogQGRlc2NyaXB0aW9uXHJcbiAqIFRoZSBgJHJvdXRlUGFyYW1zYCBzZXJ2aWNlIGFsbG93cyB5b3UgdG8gcmV0cmlldmUgdGhlIGN1cnJlbnQgc2V0IG9mIHJvdXRlIHBhcmFtZXRlcnMuXHJcbiAqXHJcbiAqIFJlcXVpcmVzIHRoZSB7QGxpbmsgbmdSb3V0ZSBgbmdSb3V0ZWB9IG1vZHVsZSB0byBiZSBpbnN0YWxsZWQuXHJcbiAqXHJcbiAqIFRoZSByb3V0ZSBwYXJhbWV0ZXJzIGFyZSBhIGNvbWJpbmF0aW9uIG9mIHtAbGluayBuZy4kbG9jYXRpb24gYCRsb2NhdGlvbmB9J3NcclxuICoge0BsaW5rIG5nLiRsb2NhdGlvbiNzZWFyY2ggYHNlYXJjaCgpYH0gYW5kIHtAbGluayBuZy4kbG9jYXRpb24jcGF0aCBgcGF0aCgpYH0uXHJcbiAqIFRoZSBgcGF0aGAgcGFyYW1ldGVycyBhcmUgZXh0cmFjdGVkIHdoZW4gdGhlIHtAbGluayBuZ1JvdXRlLiRyb3V0ZSBgJHJvdXRlYH0gcGF0aCBpcyBtYXRjaGVkLlxyXG4gKlxyXG4gKiBJbiBjYXNlIG9mIHBhcmFtZXRlciBuYW1lIGNvbGxpc2lvbiwgYHBhdGhgIHBhcmFtcyB0YWtlIHByZWNlZGVuY2Ugb3ZlciBgc2VhcmNoYCBwYXJhbXMuXHJcbiAqXHJcbiAqIFRoZSBzZXJ2aWNlIGd1YXJhbnRlZXMgdGhhdCB0aGUgaWRlbnRpdHkgb2YgdGhlIGAkcm91dGVQYXJhbXNgIG9iamVjdCB3aWxsIHJlbWFpbiB1bmNoYW5nZWRcclxuICogKGJ1dCBpdHMgcHJvcGVydGllcyB3aWxsIGxpa2VseSBjaGFuZ2UpIGV2ZW4gd2hlbiBhIHJvdXRlIGNoYW5nZSBvY2N1cnMuXHJcbiAqXHJcbiAqIE5vdGUgdGhhdCB0aGUgYCRyb3V0ZVBhcmFtc2AgYXJlIG9ubHkgdXBkYXRlZCAqYWZ0ZXIqIGEgcm91dGUgY2hhbmdlIGNvbXBsZXRlcyBzdWNjZXNzZnVsbHkuXHJcbiAqIFRoaXMgbWVhbnMgdGhhdCB5b3UgY2Fubm90IHJlbHkgb24gYCRyb3V0ZVBhcmFtc2AgYmVpbmcgY29ycmVjdCBpbiByb3V0ZSByZXNvbHZlIGZ1bmN0aW9ucy5cclxuICogSW5zdGVhZCB5b3UgY2FuIHVzZSBgJHJvdXRlLmN1cnJlbnQucGFyYW1zYCB0byBhY2Nlc3MgdGhlIG5ldyByb3V0ZSdzIHBhcmFtZXRlcnMuXHJcbiAqXHJcbiAqIEBleGFtcGxlXHJcbiAqIGBgYGpzXHJcbiAqICAvLyBHaXZlbjpcclxuICogIC8vIFVSTDogaHR0cDovL3NlcnZlci5jb20vaW5kZXguaHRtbCMvQ2hhcHRlci8xL1NlY3Rpb24vMj9zZWFyY2g9bW9ieVxyXG4gKiAgLy8gUm91dGU6IC9DaGFwdGVyLzpjaGFwdGVySWQvU2VjdGlvbi86c2VjdGlvbklkXHJcbiAqICAvL1xyXG4gKiAgLy8gVGhlblxyXG4gKiAgJHJvdXRlUGFyYW1zID09PiB7Y2hhcHRlcklkOicxJywgc2VjdGlvbklkOicyJywgc2VhcmNoOidtb2J5J31cclxuICogYGBgXHJcbiAqL1xyXG5mdW5jdGlvbiAkUm91dGVQYXJhbXNQcm92aWRlcigpIHtcclxuICB0aGlzLiRnZXQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIHt9OyB9O1xyXG59XHJcblxyXG5uZ1JvdXRlTW9kdWxlLmRpcmVjdGl2ZSgnbmdWaWV3JywgbmdWaWV3RmFjdG9yeSk7XHJcbm5nUm91dGVNb2R1bGUuZGlyZWN0aXZlKCduZ1ZpZXcnLCBuZ1ZpZXdGaWxsQ29udGVudEZhY3RvcnkpO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBAbmdkb2MgZGlyZWN0aXZlXHJcbiAqIEBuYW1lIG5nVmlld1xyXG4gKiBAcmVzdHJpY3QgRUNBXHJcbiAqXHJcbiAqIEBkZXNjcmlwdGlvblxyXG4gKiAjIE92ZXJ2aWV3XHJcbiAqIGBuZ1ZpZXdgIGlzIGEgZGlyZWN0aXZlIHRoYXQgY29tcGxlbWVudHMgdGhlIHtAbGluayBuZ1JvdXRlLiRyb3V0ZSAkcm91dGV9IHNlcnZpY2UgYnlcclxuICogaW5jbHVkaW5nIHRoZSByZW5kZXJlZCB0ZW1wbGF0ZSBvZiB0aGUgY3VycmVudCByb3V0ZSBpbnRvIHRoZSBtYWluIGxheW91dCAoYGluZGV4Lmh0bWxgKSBmaWxlLlxyXG4gKiBFdmVyeSB0aW1lIHRoZSBjdXJyZW50IHJvdXRlIGNoYW5nZXMsIHRoZSBpbmNsdWRlZCB2aWV3IGNoYW5nZXMgd2l0aCBpdCBhY2NvcmRpbmcgdG8gdGhlXHJcbiAqIGNvbmZpZ3VyYXRpb24gb2YgdGhlIGAkcm91dGVgIHNlcnZpY2UuXHJcbiAqXHJcbiAqIFJlcXVpcmVzIHRoZSB7QGxpbmsgbmdSb3V0ZSBgbmdSb3V0ZWB9IG1vZHVsZSB0byBiZSBpbnN0YWxsZWQuXHJcbiAqXHJcbiAqIEBhbmltYXRpb25zXHJcbiAqIGVudGVyIC0gYW5pbWF0aW9uIGlzIHVzZWQgdG8gYnJpbmcgbmV3IGNvbnRlbnQgaW50byB0aGUgYnJvd3Nlci5cclxuICogbGVhdmUgLSBhbmltYXRpb24gaXMgdXNlZCB0byBhbmltYXRlIGV4aXN0aW5nIGNvbnRlbnQgYXdheS5cclxuICpcclxuICogVGhlIGVudGVyIGFuZCBsZWF2ZSBhbmltYXRpb24gb2NjdXIgY29uY3VycmVudGx5LlxyXG4gKlxyXG4gKiBAc2NvcGVcclxuICogQHByaW9yaXR5IDQwMFxyXG4gKiBAcGFyYW0ge3N0cmluZz19IG9ubG9hZCBFeHByZXNzaW9uIHRvIGV2YWx1YXRlIHdoZW5ldmVyIHRoZSB2aWV3IHVwZGF0ZXMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nPX0gYXV0b3Njcm9sbCBXaGV0aGVyIGBuZ1ZpZXdgIHNob3VsZCBjYWxsIHtAbGluayBuZy4kYW5jaG9yU2Nyb2xsXHJcbiAqICAgICAgICAgICAgICAgICAgJGFuY2hvclNjcm9sbH0gdG8gc2Nyb2xsIHRoZSB2aWV3cG9ydCBhZnRlciB0aGUgdmlldyBpcyB1cGRhdGVkLlxyXG4gKlxyXG4gKiAgICAgICAgICAgICAgICAgIC0gSWYgdGhlIGF0dHJpYnV0ZSBpcyBub3Qgc2V0LCBkaXNhYmxlIHNjcm9sbGluZy5cclxuICogICAgICAgICAgICAgICAgICAtIElmIHRoZSBhdHRyaWJ1dGUgaXMgc2V0IHdpdGhvdXQgdmFsdWUsIGVuYWJsZSBzY3JvbGxpbmcuXHJcbiAqICAgICAgICAgICAgICAgICAgLSBPdGhlcndpc2UgZW5hYmxlIHNjcm9sbGluZyBvbmx5IGlmIHRoZSBgYXV0b3Njcm9sbGAgYXR0cmlidXRlIHZhbHVlIGV2YWx1YXRlZFxyXG4gKiAgICAgICAgICAgICAgICAgICAgYXMgYW4gZXhwcmVzc2lvbiB5aWVsZHMgYSB0cnV0aHkgdmFsdWUuXHJcbiAqIEBleGFtcGxlXHJcbiAgICA8ZXhhbXBsZSBuYW1lPVwibmdWaWV3LWRpcmVjdGl2ZVwiIG1vZHVsZT1cIm5nVmlld0V4YW1wbGVcIlxyXG4gICAgICAgICAgICAgZGVwcz1cImFuZ3VsYXItcm91dGUuanM7YW5ndWxhci1hbmltYXRlLmpzXCJcclxuICAgICAgICAgICAgIGFuaW1hdGlvbnM9XCJ0cnVlXCIgZml4QmFzZT1cInRydWVcIj5cclxuICAgICAgPGZpbGUgbmFtZT1cImluZGV4Lmh0bWxcIj5cclxuICAgICAgICA8ZGl2IG5nLWNvbnRyb2xsZXI9XCJNYWluQ3RybCBhcyBtYWluXCI+XHJcbiAgICAgICAgICBDaG9vc2U6XHJcbiAgICAgICAgICA8YSBocmVmPVwiQm9vay9Nb2J5XCI+TW9ieTwvYT4gfFxyXG4gICAgICAgICAgPGEgaHJlZj1cIkJvb2svTW9ieS9jaC8xXCI+TW9ieTogQ2gxPC9hPiB8XHJcbiAgICAgICAgICA8YSBocmVmPVwiQm9vay9HYXRzYnlcIj5HYXRzYnk8L2E+IHxcclxuICAgICAgICAgIDxhIGhyZWY9XCJCb29rL0dhdHNieS9jaC80P2tleT12YWx1ZVwiPkdhdHNieTogQ2g0PC9hPiB8XHJcbiAgICAgICAgICA8YSBocmVmPVwiQm9vay9TY2FybGV0XCI+U2NhcmxldCBMZXR0ZXI8L2E+PGJyLz5cclxuXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidmlldy1hbmltYXRlLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICA8ZGl2IG5nLXZpZXcgY2xhc3M9XCJ2aWV3LWFuaW1hdGVcIj48L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGhyIC8+XHJcblxyXG4gICAgICAgICAgPHByZT4kbG9jYXRpb24ucGF0aCgpID0ge3ttYWluLiRsb2NhdGlvbi5wYXRoKCl9fTwvcHJlPlxyXG4gICAgICAgICAgPHByZT4kcm91dGUuY3VycmVudC50ZW1wbGF0ZVVybCA9IHt7bWFpbi4kcm91dGUuY3VycmVudC50ZW1wbGF0ZVVybH19PC9wcmU+XHJcbiAgICAgICAgICA8cHJlPiRyb3V0ZS5jdXJyZW50LnBhcmFtcyA9IHt7bWFpbi4kcm91dGUuY3VycmVudC5wYXJhbXN9fTwvcHJlPlxyXG4gICAgICAgICAgPHByZT4kcm91dGVQYXJhbXMgPSB7e21haW4uJHJvdXRlUGFyYW1zfX08L3ByZT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9maWxlPlxyXG5cclxuICAgICAgPGZpbGUgbmFtZT1cImJvb2suaHRtbFwiPlxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICBjb250cm9sbGVyOiB7e2Jvb2submFtZX19PGJyIC8+XHJcbiAgICAgICAgICBCb29rIElkOiB7e2Jvb2sucGFyYW1zLmJvb2tJZH19PGJyIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZmlsZT5cclxuXHJcbiAgICAgIDxmaWxlIG5hbWU9XCJjaGFwdGVyLmh0bWxcIj5cclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgY29udHJvbGxlcjoge3tjaGFwdGVyLm5hbWV9fTxiciAvPlxyXG4gICAgICAgICAgQm9vayBJZDoge3tjaGFwdGVyLnBhcmFtcy5ib29rSWR9fTxiciAvPlxyXG4gICAgICAgICAgQ2hhcHRlciBJZDoge3tjaGFwdGVyLnBhcmFtcy5jaGFwdGVySWR9fVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2ZpbGU+XHJcblxyXG4gICAgICA8ZmlsZSBuYW1lPVwiYW5pbWF0aW9ucy5jc3NcIj5cclxuICAgICAgICAudmlldy1hbmltYXRlLWNvbnRhaW5lciB7XHJcbiAgICAgICAgICBwb3NpdGlvbjpyZWxhdGl2ZTtcclxuICAgICAgICAgIGhlaWdodDoxMDBweCFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICBiYWNrZ3JvdW5kOndoaXRlO1xyXG4gICAgICAgICAgYm9yZGVyOjFweCBzb2xpZCBibGFjaztcclxuICAgICAgICAgIGhlaWdodDo0MHB4O1xyXG4gICAgICAgICAgb3ZlcmZsb3c6aGlkZGVuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLnZpZXctYW5pbWF0ZSB7XHJcbiAgICAgICAgICBwYWRkaW5nOjEwcHg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAudmlldy1hbmltYXRlLm5nLWVudGVyLCAudmlldy1hbmltYXRlLm5nLWxlYXZlIHtcclxuICAgICAgICAgIC13ZWJraXQtdHJhbnNpdGlvbjphbGwgY3ViaWMtYmV6aWVyKDAuMjUwLCAwLjQ2MCwgMC40NTAsIDAuOTQwKSAxLjVzO1xyXG4gICAgICAgICAgdHJhbnNpdGlvbjphbGwgY3ViaWMtYmV6aWVyKDAuMjUwLCAwLjQ2MCwgMC40NTAsIDAuOTQwKSAxLjVzO1xyXG5cclxuICAgICAgICAgIGRpc3BsYXk6YmxvY2s7XHJcbiAgICAgICAgICB3aWR0aDoxMDAlO1xyXG4gICAgICAgICAgYm9yZGVyLWxlZnQ6MXB4IHNvbGlkIGJsYWNrO1xyXG5cclxuICAgICAgICAgIHBvc2l0aW9uOmFic29sdXRlO1xyXG4gICAgICAgICAgdG9wOjA7XHJcbiAgICAgICAgICBsZWZ0OjA7XHJcbiAgICAgICAgICByaWdodDowO1xyXG4gICAgICAgICAgYm90dG9tOjA7XHJcbiAgICAgICAgICBwYWRkaW5nOjEwcHg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAudmlldy1hbmltYXRlLm5nLWVudGVyIHtcclxuICAgICAgICAgIGxlZnQ6MTAwJTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLnZpZXctYW5pbWF0ZS5uZy1lbnRlci5uZy1lbnRlci1hY3RpdmUge1xyXG4gICAgICAgICAgbGVmdDowO1xyXG4gICAgICAgIH1cclxuICAgICAgICAudmlldy1hbmltYXRlLm5nLWxlYXZlLm5nLWxlYXZlLWFjdGl2ZSB7XHJcbiAgICAgICAgICBsZWZ0Oi0xMDAlO1xyXG4gICAgICAgIH1cclxuICAgICAgPC9maWxlPlxyXG5cclxuICAgICAgPGZpbGUgbmFtZT1cInNjcmlwdC5qc1wiPlxyXG4gICAgICAgIGFuZ3VsYXIubW9kdWxlKCduZ1ZpZXdFeGFtcGxlJywgWyduZ1JvdXRlJywgJ25nQW5pbWF0ZSddKVxyXG4gICAgICAgICAgLmNvbmZpZyhbJyRyb3V0ZVByb3ZpZGVyJywgJyRsb2NhdGlvblByb3ZpZGVyJyxcclxuICAgICAgICAgICAgZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKSB7XHJcbiAgICAgICAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgICAgIC53aGVuKCcvQm9vay86Ym9va0lkJywge1xyXG4gICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2Jvb2suaHRtbCcsXHJcbiAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdCb29rQ3RybCcsXHJcbiAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ2Jvb2snXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLndoZW4oJy9Cb29rLzpib29rSWQvY2gvOmNoYXB0ZXJJZCcsIHtcclxuICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdjaGFwdGVyLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ2hhcHRlckN0cmwnLFxyXG4gICAgICAgICAgICAgICAgICBjb250cm9sbGVyQXM6ICdjaGFwdGVyJ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh0cnVlKTtcclxuICAgICAgICAgIH1dKVxyXG4gICAgICAgICAgLmNvbnRyb2xsZXIoJ01haW5DdHJsJywgWyckcm91dGUnLCAnJHJvdXRlUGFyYW1zJywgJyRsb2NhdGlvbicsXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uKCRyb3V0ZSwgJHJvdXRlUGFyYW1zLCAkbG9jYXRpb24pIHtcclxuICAgICAgICAgICAgICB0aGlzLiRyb3V0ZSA9ICRyb3V0ZTtcclxuICAgICAgICAgICAgICB0aGlzLiRsb2NhdGlvbiA9ICRsb2NhdGlvbjtcclxuICAgICAgICAgICAgICB0aGlzLiRyb3V0ZVBhcmFtcyA9ICRyb3V0ZVBhcmFtcztcclxuICAgICAgICAgIH1dKVxyXG4gICAgICAgICAgLmNvbnRyb2xsZXIoJ0Jvb2tDdHJsJywgWyckcm91dGVQYXJhbXMnLCBmdW5jdGlvbigkcm91dGVQYXJhbXMpIHtcclxuICAgICAgICAgICAgdGhpcy5uYW1lID0gXCJCb29rQ3RybFwiO1xyXG4gICAgICAgICAgICB0aGlzLnBhcmFtcyA9ICRyb3V0ZVBhcmFtcztcclxuICAgICAgICAgIH1dKVxyXG4gICAgICAgICAgLmNvbnRyb2xsZXIoJ0NoYXB0ZXJDdHJsJywgWyckcm91dGVQYXJhbXMnLCBmdW5jdGlvbigkcm91dGVQYXJhbXMpIHtcclxuICAgICAgICAgICAgdGhpcy5uYW1lID0gXCJDaGFwdGVyQ3RybFwiO1xyXG4gICAgICAgICAgICB0aGlzLnBhcmFtcyA9ICRyb3V0ZVBhcmFtcztcclxuICAgICAgICAgIH1dKTtcclxuXHJcbiAgICAgIDwvZmlsZT5cclxuXHJcbiAgICAgIDxmaWxlIG5hbWU9XCJwcm90cmFjdG9yLmpzXCIgdHlwZT1cInByb3RyYWN0b3JcIj5cclxuICAgICAgICBpdCgnc2hvdWxkIGxvYWQgYW5kIGNvbXBpbGUgY29ycmVjdCB0ZW1wbGF0ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgZWxlbWVudChieS5saW5rVGV4dCgnTW9ieTogQ2gxJykpLmNsaWNrKCk7XHJcbiAgICAgICAgICB2YXIgY29udGVudCA9IGVsZW1lbnQoYnkuY3NzKCdbbmctdmlld10nKSkuZ2V0VGV4dCgpO1xyXG4gICAgICAgICAgZXhwZWN0KGNvbnRlbnQpLnRvTWF0Y2goL2NvbnRyb2xsZXJcXDogQ2hhcHRlckN0cmwvKTtcclxuICAgICAgICAgIGV4cGVjdChjb250ZW50KS50b01hdGNoKC9Cb29rIElkXFw6IE1vYnkvKTtcclxuICAgICAgICAgIGV4cGVjdChjb250ZW50KS50b01hdGNoKC9DaGFwdGVyIElkXFw6IDEvKTtcclxuXHJcbiAgICAgICAgICBlbGVtZW50KGJ5LnBhcnRpYWxMaW5rVGV4dCgnU2NhcmxldCcpKS5jbGljaygpO1xyXG5cclxuICAgICAgICAgIGNvbnRlbnQgPSBlbGVtZW50KGJ5LmNzcygnW25nLXZpZXddJykpLmdldFRleHQoKTtcclxuICAgICAgICAgIGV4cGVjdChjb250ZW50KS50b01hdGNoKC9jb250cm9sbGVyXFw6IEJvb2tDdHJsLyk7XHJcbiAgICAgICAgICBleHBlY3QoY29udGVudCkudG9NYXRjaCgvQm9vayBJZFxcOiBTY2FybGV0Lyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIDwvZmlsZT5cclxuICAgIDwvZXhhbXBsZT5cclxuICovXHJcblxyXG5cclxuLyoqXHJcbiAqIEBuZ2RvYyBldmVudFxyXG4gKiBAbmFtZSBuZ1ZpZXcjJHZpZXdDb250ZW50TG9hZGVkXHJcbiAqIEBldmVudFR5cGUgZW1pdCBvbiB0aGUgY3VycmVudCBuZ1ZpZXcgc2NvcGVcclxuICogQGRlc2NyaXB0aW9uXHJcbiAqIEVtaXR0ZWQgZXZlcnkgdGltZSB0aGUgbmdWaWV3IGNvbnRlbnQgaXMgcmVsb2FkZWQuXHJcbiAqL1xyXG5uZ1ZpZXdGYWN0b3J5LiRpbmplY3QgPSBbJyRyb3V0ZScsICckYW5jaG9yU2Nyb2xsJywgJyRhbmltYXRlJ107XHJcbmZ1bmN0aW9uIG5nVmlld0ZhY3RvcnkoJHJvdXRlLCAkYW5jaG9yU2Nyb2xsLCAkYW5pbWF0ZSkge1xyXG4gIHJldHVybiB7XHJcbiAgICByZXN0cmljdDogJ0VDQScsXHJcbiAgICB0ZXJtaW5hbDogdHJ1ZSxcclxuICAgIHByaW9yaXR5OiA0MDAsXHJcbiAgICB0cmFuc2NsdWRlOiAnZWxlbWVudCcsXHJcbiAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgJGVsZW1lbnQsIGF0dHIsIGN0cmwsICR0cmFuc2NsdWRlKSB7XHJcbiAgICAgICAgdmFyIGN1cnJlbnRTY29wZSxcclxuICAgICAgICAgICAgY3VycmVudEVsZW1lbnQsXHJcbiAgICAgICAgICAgIHByZXZpb3VzTGVhdmVBbmltYXRpb24sXHJcbiAgICAgICAgICAgIGF1dG9TY3JvbGxFeHAgPSBhdHRyLmF1dG9zY3JvbGwsXHJcbiAgICAgICAgICAgIG9ubG9hZEV4cCA9IGF0dHIub25sb2FkIHx8ICcnO1xyXG5cclxuICAgICAgICBzY29wZS4kb24oJyRyb3V0ZUNoYW5nZVN1Y2Nlc3MnLCB1cGRhdGUpO1xyXG4gICAgICAgIHVwZGF0ZSgpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBjbGVhbnVwTGFzdFZpZXcoKSB7XHJcbiAgICAgICAgICBpZiAocHJldmlvdXNMZWF2ZUFuaW1hdGlvbikge1xyXG4gICAgICAgICAgICAkYW5pbWF0ZS5jYW5jZWwocHJldmlvdXNMZWF2ZUFuaW1hdGlvbik7XHJcbiAgICAgICAgICAgIHByZXZpb3VzTGVhdmVBbmltYXRpb24gPSBudWxsO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjdXJyZW50U2NvcGUpIHtcclxuICAgICAgICAgICAgY3VycmVudFNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgIGN1cnJlbnRTY29wZSA9IG51bGw7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoY3VycmVudEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgcHJldmlvdXNMZWF2ZUFuaW1hdGlvbiA9ICRhbmltYXRlLmxlYXZlKGN1cnJlbnRFbGVtZW50KTtcclxuICAgICAgICAgICAgcHJldmlvdXNMZWF2ZUFuaW1hdGlvbi50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgIHByZXZpb3VzTGVhdmVBbmltYXRpb24gPSBudWxsO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY3VycmVudEVsZW1lbnQgPSBudWxsO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlKCkge1xyXG4gICAgICAgICAgdmFyIGxvY2FscyA9ICRyb3V0ZS5jdXJyZW50ICYmICRyb3V0ZS5jdXJyZW50LmxvY2FscyxcclxuICAgICAgICAgICAgICB0ZW1wbGF0ZSA9IGxvY2FscyAmJiBsb2NhbHMuJHRlbXBsYXRlO1xyXG5cclxuICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCh0ZW1wbGF0ZSkpIHtcclxuICAgICAgICAgICAgdmFyIG5ld1Njb3BlID0gc2NvcGUuJG5ldygpO1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudCA9ICRyb3V0ZS5jdXJyZW50O1xyXG5cclxuICAgICAgICAgICAgLy8gTm90ZTogVGhpcyB3aWxsIGFsc28gbGluayBhbGwgY2hpbGRyZW4gb2YgbmctdmlldyB0aGF0IHdlcmUgY29udGFpbmVkIGluIHRoZSBvcmlnaW5hbFxyXG4gICAgICAgICAgICAvLyBodG1sLiBJZiB0aGF0IGNvbnRlbnQgY29udGFpbnMgY29udHJvbGxlcnMsIC4uLiB0aGV5IGNvdWxkIHBvbGx1dGUvY2hhbmdlIHRoZSBzY29wZS5cclxuICAgICAgICAgICAgLy8gSG93ZXZlciwgdXNpbmcgbmctdmlldyBvbiBhbiBlbGVtZW50IHdpdGggYWRkaXRpb25hbCBjb250ZW50IGRvZXMgbm90IG1ha2Ugc2Vuc2UuLi5cclxuICAgICAgICAgICAgLy8gTm90ZTogV2UgY2FuJ3QgcmVtb3ZlIHRoZW0gaW4gdGhlIGNsb25lQXR0Y2hGbiBvZiAkdHJhbnNjbHVkZSBhcyB0aGF0XHJcbiAgICAgICAgICAgIC8vIGZ1bmN0aW9uIGlzIGNhbGxlZCBiZWZvcmUgbGlua2luZyB0aGUgY29udGVudCwgd2hpY2ggd291bGQgYXBwbHkgY2hpbGRcclxuICAgICAgICAgICAgLy8gZGlyZWN0aXZlcyB0byBub24gZXhpc3RpbmcgZWxlbWVudHMuXHJcbiAgICAgICAgICAgIHZhciBjbG9uZSA9ICR0cmFuc2NsdWRlKG5ld1Njb3BlLCBmdW5jdGlvbihjbG9uZSkge1xyXG4gICAgICAgICAgICAgICRhbmltYXRlLmVudGVyKGNsb25lLCBudWxsLCBjdXJyZW50RWxlbWVudCB8fCAkZWxlbWVudCkudGhlbihmdW5jdGlvbiBvbk5nVmlld0VudGVyKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKGF1dG9TY3JvbGxFeHApXHJcbiAgICAgICAgICAgICAgICAgICYmICghYXV0b1Njcm9sbEV4cCB8fCBzY29wZS4kZXZhbChhdXRvU2Nyb2xsRXhwKSkpIHtcclxuICAgICAgICAgICAgICAgICAgJGFuY2hvclNjcm9sbCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIGNsZWFudXBMYXN0VmlldygpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50ID0gY2xvbmU7XHJcbiAgICAgICAgICAgIGN1cnJlbnRTY29wZSA9IGN1cnJlbnQuc2NvcGUgPSBuZXdTY29wZTtcclxuICAgICAgICAgICAgY3VycmVudFNjb3BlLiRlbWl0KCckdmlld0NvbnRlbnRMb2FkZWQnKTtcclxuICAgICAgICAgICAgY3VycmVudFNjb3BlLiRldmFsKG9ubG9hZEV4cCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjbGVhbnVwTGFzdFZpZXcoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxufVxyXG5cclxuLy8gVGhpcyBkaXJlY3RpdmUgaXMgY2FsbGVkIGR1cmluZyB0aGUgJHRyYW5zY2x1ZGUgY2FsbCBvZiB0aGUgZmlyc3QgYG5nVmlld2AgZGlyZWN0aXZlLlxyXG4vLyBJdCB3aWxsIHJlcGxhY2UgYW5kIGNvbXBpbGUgdGhlIGNvbnRlbnQgb2YgdGhlIGVsZW1lbnQgd2l0aCB0aGUgbG9hZGVkIHRlbXBsYXRlLlxyXG4vLyBXZSBuZWVkIHRoaXMgZGlyZWN0aXZlIHNvIHRoYXQgdGhlIGVsZW1lbnQgY29udGVudCBpcyBhbHJlYWR5IGZpbGxlZCB3aGVuXHJcbi8vIHRoZSBsaW5rIGZ1bmN0aW9uIG9mIGFub3RoZXIgZGlyZWN0aXZlIG9uIHRoZSBzYW1lIGVsZW1lbnQgYXMgbmdWaWV3XHJcbi8vIGlzIGNhbGxlZC5cclxubmdWaWV3RmlsbENvbnRlbnRGYWN0b3J5LiRpbmplY3QgPSBbJyRjb21waWxlJywgJyRjb250cm9sbGVyJywgJyRyb3V0ZSddO1xyXG5mdW5jdGlvbiBuZ1ZpZXdGaWxsQ29udGVudEZhY3RvcnkoJGNvbXBpbGUsICRjb250cm9sbGVyLCAkcm91dGUpIHtcclxuICByZXR1cm4ge1xyXG4gICAgcmVzdHJpY3Q6ICdFQ0EnLFxyXG4gICAgcHJpb3JpdHk6IC00MDAsXHJcbiAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgJGVsZW1lbnQpIHtcclxuICAgICAgdmFyIGN1cnJlbnQgPSAkcm91dGUuY3VycmVudCxcclxuICAgICAgICAgIGxvY2FscyA9IGN1cnJlbnQubG9jYWxzO1xyXG5cclxuICAgICAgJGVsZW1lbnQuaHRtbChsb2NhbHMuJHRlbXBsYXRlKTtcclxuXHJcbiAgICAgIHZhciBsaW5rID0gJGNvbXBpbGUoJGVsZW1lbnQuY29udGVudHMoKSk7XHJcblxyXG4gICAgICBpZiAoY3VycmVudC5jb250cm9sbGVyKSB7XHJcbiAgICAgICAgbG9jYWxzLiRzY29wZSA9IHNjb3BlO1xyXG4gICAgICAgIHZhciBjb250cm9sbGVyID0gJGNvbnRyb2xsZXIoY3VycmVudC5jb250cm9sbGVyLCBsb2NhbHMpO1xyXG4gICAgICAgIGlmIChjdXJyZW50LmNvbnRyb2xsZXJBcykge1xyXG4gICAgICAgICAgc2NvcGVbY3VycmVudC5jb250cm9sbGVyQXNdID0gY29udHJvbGxlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgJGVsZW1lbnQuZGF0YSgnJG5nQ29udHJvbGxlckNvbnRyb2xsZXInLCBjb250cm9sbGVyKTtcclxuICAgICAgICAkZWxlbWVudC5jaGlsZHJlbigpLmRhdGEoJyRuZ0NvbnRyb2xsZXJDb250cm9sbGVyJywgY29udHJvbGxlcik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxpbmsoc2NvcGUpO1xyXG4gICAgfVxyXG4gIH07XHJcbn1cclxuXHJcblxyXG59KSh3aW5kb3csIHdpbmRvdy5hbmd1bGFyKTtcclxuIl19