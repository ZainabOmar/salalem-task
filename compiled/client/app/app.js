'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
	_inherits(App, _React$Component);

	function App(props) {
		_classCallCheck(this, App);

		return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));
	}

	_createClass(App, [{
		key: 'render',
		value: function render() {
			React.createElement(
				'script',
				{ type: 'text/jsx' },
				'ReactRouter.run(routes, function (Handler, state) ',
				React.render(React.createElement(Handler, null), document.body),
				');'
			);
			return React.createElement(
				'div',
				{ style: { backgroundImage: 'url(/assets/header-bg.jpg)',
						backgroundPosition: 'bottom',
						paddingTop: '10px' } },
				React.createElement(
					'div',
					null,
					React.createElement(
						'div',
						{ className: 'container-fluid' },
						React.createElement(
							'nav',
							{ className: 'navbar navbar-inverse', style: { margin: '25px 50px',
									backgroundColor: 'rgba(31, 31, 31, 0.7)',
									borderColor: '#484848',
									zIndex: '3',
									position: 'absolute'
								} },
							React.createElement(
								'div',
								{ className: 'container' },
								React.createElement(
									'div',
									{ className: 'navbar-header' },
									React.createElement(
										'button',
										{ type: 'button', className: 'navbar-toggle collapsed', 'data-toggle': 'collapse', 'data-target': '#bs-example-navbar-collapse-1', 'aria-expanded': 'false' },
										React.createElement(
											'span',
											{ className: 'sr-only' },
											'Toggle navigation'
										),
										React.createElement('span', { className: 'icon-bar' }),
										React.createElement('span', { className: 'icon-bar' }),
										React.createElement('span', { clNameass: 'icon-bar' })
									),
									React.createElement(
										'a',
										{ className: 'navbar-brand', href: '#/', style: { color: "#257204" } },
										'Otbo5ly',
										React.createElement(
											'small',
											null,
											' beta'
										)
									)
								),
								React.createElement(
									'div',
									{ className: 'collapse navbar-collapse', id: 'bs-example-navbar-collapse-1' },
									React.createElement(
										'ul',
										{ className: 'nav navbar-nav' },
										React.createElement(
											'li',
											null,
											React.createElement(
												'a',
												{ href: '#/users' },
												'My Profile'
											)
										),
										React.createElement(
											'li',
											null,
											React.createElement(
												'a',
												{ href: '#/orders' },
												'My Orders'
											)
										),
										React.createElement(
											'li',
											null,
											' ',
											React.createElement(
												'a',
												{ href: '#/signin' },
												'Sign In'
											)
										),
										React.createElement(
											'li',
											null,
											React.createElement(
												'a',
												{ href: '<SignUp></SignUp>' },
												'Sign Up'
											)
										),
										React.createElement(
											'li',
											null,
											React.createElement(
												'a',
												{ href: '#/signout' },
												'Sign out'
											)
										)
									),
									React.createElement(
										'ul',
										{ className: 'nav navbar-nav navbar-right' },
										React.createElement(
											'li',
											null,
											React.createElement(
												'a',
												{ href: 'http://www.rbk.org', target: '_blank' },
												'RBK'
											)
										),
										React.createElement(
											'li',
											{ className: 'dropdown' },
											React.createElement(
												'a',
												{ className: 'dropdown-toggleName', 'data-toggle': 'dropdown', role: 'button', 'aria-haspopup': 'true', 'aria-expanded': 'false' },
												'Developers ',
												React.createElement('span', { 'class': 'caret' })
											),
											React.createElement(
												'ul',
												{ className: 'dropdown-menu' },
												React.createElement(
													'li',
													null,
													React.createElement(
														'a',
														{ href: 'https://github.com/montaserRahmani', target: '_blank' },
														'M. Rahmani'
													)
												),
												React.createElement(
													'li',
													null,
													React.createElement(
														'a',
														{ href: 'https://github.com/saeedhomsy', target: '_blank' },
														'S. Alhomsi'
													)
												),
												React.createElement(
													'li',
													null,
													React.createElement(
														'a',
														{ href: 'https://github.com/ZainabOmar', target: '_blank' },
														'Z. Hammami'
													)
												),
												React.createElement(
													'li',
													null,
													React.createElement(
														'a',
														{ href: 'https://github.com/HadeelBaloush', target: '_blank' },
														'H. Baloush'
													)
												)
											)
										)
									)
								)
							)
						)
					),
					React.createElement(
						'div',
						null,
						React.createElement('br', null),
						React.createElement('br', null),
						React.createElement('br', null),
						React.createElement('br', null),
						React.createElement('br', null)
					)
				),
				React.createElement(MainPage, null),
				React.createElement(
					Router,
					{ history: hashHistory },
					React.createElement(
						Route,
						{ path: '/signup', component: SignUp },
						'signup'
					),
					React.createElement(
						Route,
						{ path: 'signin', component: SignIn },
						'signin'
					)
				)
			);
		}
	}]);

	return App;
}(React.Component);

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined


window.App = App;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvYXBwLmpzeCJdLCJuYW1lcyI6WyJBcHAiLCJwcm9wcyIsIlJlYWN0IiwicmVuZGVyIiwiZG9jdW1lbnQiLCJib2R5IiwiYmFja2dyb3VuZEltYWdlIiwiYmFja2dyb3VuZFBvc2l0aW9uIiwicGFkZGluZ1RvcCIsIm1hcmdpbiIsImJhY2tncm91bmRDb2xvciIsImJvcmRlckNvbG9yIiwiekluZGV4IiwicG9zaXRpb24iLCJjb2xvciIsImhhc2hIaXN0b3J5IiwiU2lnblVwIiwiU2lnbkluIiwiQ29tcG9uZW50Iiwid2luZG93Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU1BLEc7OztBQUVMLGNBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxtR0FDWkEsS0FEWTtBQUVsQjs7OzsyQkFFUTtBQUNSO0FBQUE7QUFBQSxNQUFRLE1BQUssVUFBYjtBQUFBO0FBRUNDLFVBQU1DLE1BQU4sQ0FBYSxvQkFBQyxPQUFELE9BQWIsRUFBeUJDLFNBQVNDLElBQWxDLENBRkQ7QUFBQTtBQUFBO0FBS0EsVUFDQztBQUFBO0FBQUEsTUFBSyxPQUFTLEVBQUNDLGlCQUFpQiw0QkFBbEI7QUFDZEMsMEJBQW9CLFFBRE47QUFFZEMsa0JBQVksTUFGRSxFQUFkO0FBR0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBLFFBQUssV0FBVSxpQkFBZjtBQUNBO0FBQUE7QUFBQSxTQUFLLFdBQVUsdUJBQWYsRUFBdUMsT0FBUyxFQUFFQyxRQUFRLFdBQVY7QUFDaERDLDBCQUFpQix1QkFEK0I7QUFFaERDLHNCQUFhLFNBRm1DO0FBR2hEQyxpQkFBUSxHQUh3QztBQUloREMsbUJBQVU7QUFKc0MsU0FBaEQ7QUFNRDtBQUFBO0FBQUEsVUFBSyxXQUFVLFdBQWY7QUFDQTtBQUFBO0FBQUEsV0FBSyxXQUFVLGVBQWY7QUFDQTtBQUFBO0FBQUEsWUFBUSxNQUFLLFFBQWIsRUFBc0IsV0FBVSx5QkFBaEMsRUFBMEQsZUFBWSxVQUF0RSxFQUFpRixlQUFZLCtCQUE3RixFQUE2SCxpQkFBYyxPQUEzSTtBQUNBO0FBQUE7QUFBQSxhQUFNLFdBQVUsU0FBaEI7QUFBQTtBQUFBLFdBREE7QUFFQSx3Q0FBTSxXQUFVLFVBQWhCLEdBRkE7QUFHQSx3Q0FBTSxXQUFVLFVBQWhCLEdBSEE7QUFJQSx3Q0FBTSxXQUFVLFVBQWhCO0FBSkEsVUFEQTtBQU9BO0FBQUE7QUFBQSxZQUFHLFdBQVUsY0FBYixFQUE0QixNQUFLLElBQWpDLEVBQXNDLE9BQVMsRUFBQ0MsT0FBTyxTQUFSLEVBQS9DO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREE7QUFQQSxTQURBO0FBV0E7QUFBQTtBQUFBLFdBQUssV0FBVSwwQkFBZixFQUEwQyxJQUFHLDhCQUE3QztBQUNBO0FBQUE7QUFBQSxZQUFJLFdBQVUsZ0JBQWQ7QUFDQTtBQUFBO0FBQUE7QUFBSTtBQUFBO0FBQUEsY0FBRyxNQUFLLFNBQVI7QUFBQTtBQUFBO0FBQUosV0FEQTtBQUVBO0FBQUE7QUFBQTtBQUFJO0FBQUE7QUFBQSxjQUFHLE1BQUssVUFBUjtBQUFBO0FBQUE7QUFBSixXQUZBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFBSztBQUFBO0FBQUEsY0FBRyxNQUFPLFVBQVY7QUFBQTtBQUFBO0FBQUwsV0FIQTtBQUlBO0FBQUE7QUFBQTtBQUFJO0FBQUE7QUFBQSxjQUFHLE1BQUssbUJBQVI7QUFBQTtBQUFBO0FBQUosV0FKQTtBQUtBO0FBQUE7QUFBQTtBQUFJO0FBQUE7QUFBQSxjQUFHLE1BQUssV0FBUjtBQUFBO0FBQUE7QUFBSjtBQUxBLFVBREE7QUFRQTtBQUFBO0FBQUEsWUFBSSxXQUFVLDZCQUFkO0FBQ0E7QUFBQTtBQUFBO0FBQUk7QUFBQTtBQUFBLGNBQUcsTUFBSyxvQkFBUixFQUE2QixRQUFPLFFBQXBDO0FBQUE7QUFBQTtBQUFKLFdBREE7QUFFQTtBQUFBO0FBQUEsYUFBSSxXQUFVLFVBQWQ7QUFDQTtBQUFBO0FBQUEsY0FBRyxXQUFVLHFCQUFiLEVBQW1DLGVBQVksVUFBL0MsRUFBMEQsTUFBSyxRQUEvRCxFQUF3RSxpQkFBYyxNQUF0RixFQUE2RixpQkFBYyxPQUEzRztBQUFBO0FBQThILDBDQUFNLFNBQU0sT0FBWjtBQUE5SCxZQURBO0FBRUE7QUFBQTtBQUFBLGNBQUksV0FBVSxlQUFkO0FBQ0E7QUFBQTtBQUFBO0FBQUk7QUFBQTtBQUFBLGdCQUFHLE1BQUssb0NBQVIsRUFBNkMsUUFBTyxRQUFwRDtBQUFBO0FBQUE7QUFBSixhQURBO0FBRUE7QUFBQTtBQUFBO0FBQUk7QUFBQTtBQUFBLGdCQUFHLE1BQUssK0JBQVIsRUFBd0MsUUFBTyxRQUEvQztBQUFBO0FBQUE7QUFBSixhQUZBO0FBR0E7QUFBQTtBQUFBO0FBQUk7QUFBQTtBQUFBLGdCQUFHLE1BQUssK0JBQVIsRUFBd0MsUUFBTyxRQUEvQztBQUFBO0FBQUE7QUFBSixhQUhBO0FBSUE7QUFBQTtBQUFBO0FBQUk7QUFBQTtBQUFBLGdCQUFHLE1BQUssa0NBQVIsRUFBMkMsUUFBTyxRQUFsRDtBQUFBO0FBQUE7QUFBSjtBQUpBO0FBRkE7QUFGQTtBQVJBO0FBWEE7QUFOQztBQURBLE1BREE7QUEyQ0Q7QUFBQTtBQUFBO0FBQ0EscUNBREE7QUFFQSxxQ0FGQTtBQUdBLHFDQUhBO0FBSUEscUNBSkE7QUFLQTtBQUxBO0FBM0NDLEtBSEE7QUFzREQsd0JBQUMsUUFBRCxPQXREQztBQXVERDtBQUFDLFdBQUQ7QUFBQSxPQUFRLFNBQVNDLFdBQWpCO0FBQ0E7QUFBQyxXQUFEO0FBQUEsUUFBTyxNQUFLLFNBQVosRUFBc0IsV0FBV0MsTUFBakM7QUFBQTtBQUFBLE1BREE7QUFFQTtBQUFDLFdBQUQ7QUFBQSxRQUFPLE1BQUssUUFBWixFQUFxQixXQUFXQyxNQUFoQztBQUFBO0FBQUE7QUFGQTtBQXZEQyxJQUREO0FBNkRFOzs7O0VBekVjZixNQUFNZ0IsUzs7QUE0RXZCO0FBQ0E7OztBQUNBQyxPQUFPbkIsR0FBUCxHQUFhQSxHQUFiIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcblx0XHRzdXBlcihwcm9wcyk7XHJcblx0fVxyXG5cclxuXHRyZW5kZXIoKSB7XHJcblx0XHQ8c2NyaXB0IHR5cGU9XCJ0ZXh0L2pzeFwiPlxyXG5cdFx0UmVhY3RSb3V0ZXIucnVuKHJvdXRlcywgZnVuY3Rpb24gKEhhbmRsZXIsIHN0YXRlKSB7XHJcblx0XHRcdFJlYWN0LnJlbmRlcig8SGFuZGxlci8+LCBkb2N1bWVudC5ib2R5KVxyXG5cdFx0fSk7XHJcblx0XHQ8L3NjcmlwdD5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgc3R5bGUgPSB7e2JhY2tncm91bmRJbWFnZTogJ3VybCgvYXNzZXRzL2hlYWRlci1iZy5qcGcpJyxcclxuXHRcdFx0YmFja2dyb3VuZFBvc2l0aW9uOiAnYm90dG9tJyxcclxuXHRcdFx0cGFkZGluZ1RvcDogJzEwcHgnfX0+XHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XHJcblx0XHRcdDxuYXYgY2xhc3NOYW1lPVwibmF2YmFyIG5hdmJhci1pbnZlcnNlXCIgc3R5bGUgPSB7eyBtYXJnaW46ICcyNXB4IDUwcHgnLFxyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDMxLCAzMSwgMzEsIDAuNyknLFxyXG5cdFx0XHRib3JkZXJDb2xvcjogJyM0ODQ4NDgnLFxyXG5cdFx0XHR6SW5kZXg6ICczJyxcclxuXHRcdFx0cG9zaXRpb246ICdhYnNvbHV0ZSdcclxuXHRcdH19PlxyXG5cdFx0PGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cclxuXHRcdDxkaXYgY2xhc3NOYW1lPVwibmF2YmFyLWhlYWRlclwiPlxyXG5cdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwibmF2YmFyLXRvZ2dsZSBjb2xsYXBzZWRcIiBkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCIgZGF0YS10YXJnZXQ9XCIjYnMtZXhhbXBsZS1uYXZiYXItY29sbGFwc2UtMVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPlxyXG5cdFx0PHNwYW4gY2xhc3NOYW1lPVwic3Itb25seVwiPlRvZ2dsZSBuYXZpZ2F0aW9uPC9zcGFuPlxyXG5cdFx0PHNwYW4gY2xhc3NOYW1lPVwiaWNvbi1iYXJcIj48L3NwYW4+XHJcblx0XHQ8c3BhbiBjbGFzc05hbWU9XCJpY29uLWJhclwiPjwvc3Bhbj5cclxuXHRcdDxzcGFuIGNsTmFtZWFzcz1cImljb24tYmFyXCI+PC9zcGFuPlxyXG5cdFx0PC9idXR0b24+XHJcblx0XHQ8YSBjbGFzc05hbWU9XCJuYXZiYXItYnJhbmRcIiBocmVmPVwiIy9cIiBzdHlsZSA9IHt7Y29sb3I6IFwiIzI1NzIwNFwifX0+T3RibzVseVxyXG5cdFx0PHNtYWxsPiBiZXRhPC9zbWFsbD48L2E+XHJcblx0XHQ8L2Rpdj5cclxuXHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sbGFwc2UgbmF2YmFyLWNvbGxhcHNlXCIgaWQ9XCJicy1leGFtcGxlLW5hdmJhci1jb2xsYXBzZS0xXCI+XHJcblx0XHQ8dWwgY2xhc3NOYW1lPVwibmF2IG5hdmJhci1uYXZcIj5cclxuXHRcdDxsaT48YSBocmVmPVwiIy91c2Vyc1wiPk15IFByb2ZpbGU8L2E+PC9saT5cclxuXHRcdDxsaT48YSBocmVmPVwiIy9vcmRlcnNcIj5NeSBPcmRlcnM8L2E+PC9saT5cclxuXHRcdDxsaT4gPGEgaHJlZiA9IFwiIy9zaWduaW5cIj5TaWduIEluPC9hPjwvbGk+XHJcblx0XHQ8bGk+PGEgaHJlZj1cIjxTaWduVXA+PC9TaWduVXA+XCI+U2lnbiBVcDwvYT48L2xpPlxyXG5cdFx0PGxpPjxhIGhyZWY9XCIjL3NpZ25vdXRcIj5TaWduIG91dDwvYT48L2xpPlxyXG5cdFx0PC91bD5cclxuXHRcdDx1bCBjbGFzc05hbWU9XCJuYXYgbmF2YmFyLW5hdiBuYXZiYXItcmlnaHRcIj5cclxuXHRcdDxsaT48YSBocmVmPVwiaHR0cDovL3d3dy5yYmsub3JnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+UkJLPC9hPjwvbGk+XHJcblx0XHQ8bGkgY2xhc3NOYW1lPVwiZHJvcGRvd25cIj5cclxuXHRcdDxhIGNsYXNzTmFtZT1cImRyb3Bkb3duLXRvZ2dsZU5hbWVcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCIgcm9sZT1cImJ1dHRvblwiIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCI+RGV2ZWxvcGVycyA8c3BhbiBjbGFzcz1cImNhcmV0XCI+PC9zcGFuPjwvYT5cclxuXHRcdDx1bCBjbGFzc05hbWU9XCJkcm9wZG93bi1tZW51XCI+XHJcblx0XHQ8bGk+PGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9tb250YXNlclJhaG1hbmlcIiB0YXJnZXQ9XCJfYmxhbmtcIj5NLiBSYWhtYW5pPC9hPjwvbGk+XHJcblx0XHQ8bGk+PGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9zYWVlZGhvbXN5XCIgdGFyZ2V0PVwiX2JsYW5rXCI+Uy4gQWxob21zaTwvYT48L2xpPlxyXG5cdFx0PGxpPjxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vWmFpbmFiT21hclwiIHRhcmdldD1cIl9ibGFua1wiPlouIEhhbW1hbWk8L2E+PC9saT5cclxuXHRcdDxsaT48YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL0hhZGVlbEJhbG91c2hcIiB0YXJnZXQ9XCJfYmxhbmtcIj5ILiBCYWxvdXNoPC9hPjwvbGk+XHJcblx0XHQ8L3VsPlxyXG5cdFx0PC9saT5cclxuXHRcdDwvdWw+XHJcblx0XHQ8L2Rpdj5cclxuXHRcdDwvZGl2PlxyXG5cdFx0PC9uYXY+XHJcblx0XHQ8L2Rpdj5cclxuXHRcdDxkaXY+XHJcblx0XHQ8YnI+PC9icj5cclxuXHRcdDxicj48L2JyPlxyXG5cdFx0PGJyPjwvYnI+XHJcblx0XHQ8YnI+PC9icj5cclxuXHRcdDxicj48L2JyPlxyXG5cdFx0PC9kaXY+XHJcblx0XHQ8L2Rpdj5cclxuXHRcdDxNYWluUGFnZT48L01haW5QYWdlPlxyXG5cdFx0PFJvdXRlciBoaXN0b3J5PXtoYXNoSGlzdG9yeX0+XHJcblx0XHQ8Um91dGUgcGF0aD0nL3NpZ251cCcgY29tcG9uZW50PXtTaWduVXB9PnNpZ251cDwvUm91dGU+XHJcblx0XHQ8Um91dGUgcGF0aD0nc2lnbmluJyBjb21wb25lbnQ9e1NpZ25Jbn0+c2lnbmluPC9Sb3V0ZT5cclxuXHRcdDwvUm91dGVyPlxyXG5cdFx0PC9kaXY+XHJcblx0XHQpfVxyXG5cdH1cclxuXHJcblx0Ly8gSW4gdGhlIEVTNiBzcGVjLCBmaWxlcyBhcmUgXCJtb2R1bGVzXCIgYW5kIGRvIG5vdCBzaGFyZSBhIHRvcC1sZXZlbCBzY29wZVxyXG5cdC8vIGB2YXJgIGRlY2xhcmF0aW9ucyB3aWxsIG9ubHkgZXhpc3QgZ2xvYmFsbHkgd2hlcmUgZXhwbGljaXRseSBkZWZpbmVkXHJcblx0d2luZG93LkFwcCA9IEFwcDtcclxuIl19