"use strict";

var MainPage = function MainPage(props) {
  return React.createElement(
    "div",
    { className: "container" },
    React.createElement(
      "div",
      { className: "row", style: { paddingBottom: '50px', margin: '0px' } },
      React.createElement(
        "div",
        { className: "col-md-10 col-md-offset-1 text-center" },
        React.createElement(
          "h1",
          { style: { fontWeight: 'bold', color: '#fff' } },
          "Welcome to Otbo5ly!"
        ),
        React.createElement(
          "h2",
          { style: { color: '#dedede' } },
          "Hungry ? want delicious home-made middle eastren food ?"
        ),
        React.createElement(
          "h2",
          { style: { color: '#dedede' } },
          "YES! you are in the right place!"
        ),
        React.createElement(
          "div",
          { className: "col-md-6 col-xs-12", style: { color: '#fff', marginTop: '20px' } },
          React.createElement("i", { className: "glyphicon glyphicon-user", style: { fontSize: '5em' } }),
          React.createElement(
            "p",
            { style: { padding: '20px', fontSize: '1.3em' } },
            "Want to order food ?"
          ),
          React.createElement(
            "button",
            { href: "#/signup", className: "btn btn-lg btn-primary" },
            "Sign up now and start ordering!"
          )
        ),
        React.createElement(
          "div",
          { className: "col-md-6 col-xs-12", style: { color: '#fff', marginTop: '20px', borderLeft: '1px solid' } },
          React.createElement("i", { className: "glyphicon glyphicon-cutlery", style: { fontSize: '5em' } }),
          React.createElement(
            "p",
            { style: { padding: '20px', fontSize: '1.3em' } },
            "Ready to cook and sell ?"
          ),
          React.createElement(
            "button",
            { href: "#/signup", className: "btn btn-lg btn-primary" },
            "Sign up now and start selling!"
          )
        )
      )
    ),
    React.createElement(
      "div",
      { className: "row", style: { marginTop: '40px' } },
      React.createElement(
        "div",
        { className: "col-md-3 col-md-offset-1 col-xs-12" },
        React.createElement(
          "div",
          { className: "panel panel-primary" },
          React.createElement(
            "div",
            { className: "panel-heading" },
            React.createElement(
              "h3",
              { className: "panel-title" },
              "Top Cookers"
            )
          ),
          React.createElement(
            "ul",
            { className: "list-group" },
            React.createElement(
              "li",
              { className: "list-group-item" },
              "Om Ta7seen",
              React.createElement("a", { href: "#/users" })
            ),
            React.createElement(
              "li",
              { className: "list-group-item" },
              "Om A7mad",
              React.createElement("a", { href: "#/users" })
            ),
            React.createElement(
              "li",
              { className: "list-group-item" },
              "Om Ali",
              React.createElement("a", { href: "#/users" })
            )
          )
        )
      ),
      React.createElement(
        "div",
        { className: "col-md-7 col-xs-12" },
        React.createElement(
          "div",
          { className: "panel panel-default" },
          React.createElement(
            "div",
            { className: "panel-heading" },
            React.createElement(
              "h3",
              { className: "panel-title" },
              "Today's Cookings"
            )
          ),
          React.createElement(
            "ul",
            { className: "list-group" },
            React.createElement(
              "li",
              { className: "list-group-item" },
              React.createElement(
                "div",
                { className: "row" },
                React.createElement(
                  "div",
                  { className: "col-md-4" },
                  React.createElement("img", { src: "/assets/chef.png", className: "img-responsive thumbnail", style: { margin: 'auto' } }),
                  React.createElement("img", { className: "img-responsive thumbnail", style: { margin: 'auto' } })
                ),
                React.createElement(
                  "div",
                  { className: "col-md-8" },
                  React.createElement(
                    "div",
                    { className: "caption", style: { display: 'inline-block', height: '100%' } },
                    React.createElement(
                      "h3",
                      null,
                      "Om Ta7seen"
                    ),
                    React.createElement(
                      "p",
                      null,
                      React.createElement("a", { href: "#/users" })
                    ),
                    React.createElement(
                      "p",
                      { className: "btn btn-info", style: { marginBottom: '20px' } },
                      "30 JOD"
                    ),
                    React.createElement(
                      "p",
                      null,
                      React.createElement(
                        "a",
                        { className: "btn btn-primary", role: "button" },
                        "Order Now"
                      ),
                      " "
                    )
                  )
                )
              )
            )
          )
        )
      )
    )
  );
};

// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
// MainPage.propTypes = {
//   videos: React.PropTypes.array.isRequired
// };

// In the ES6 spec, files are "modules" and do not share a top-level scope.
// `var` declarations will only exist globally where explicitly defined.
window.MainPage = MainPage;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9tYWluL21haW4uanN4Il0sIm5hbWVzIjpbIk1haW5QYWdlIiwicHJvcHMiLCJwYWRkaW5nQm90dG9tIiwibWFyZ2luIiwiZm9udFdlaWdodCIsImNvbG9yIiwibWFyZ2luVG9wIiwiZm9udFNpemUiLCJwYWRkaW5nIiwiYm9yZGVyTGVmdCIsImRpc3BsYXkiLCJoZWlnaHQiLCJtYXJnaW5Cb3R0b20iLCJ3aW5kb3ciXSwibWFwcGluZ3MiOiI7O0FBQ0EsSUFBSUEsV0FBVyxTQUFYQSxRQUFXLENBQUNDLEtBQUQ7QUFBQSxTQUNiO0FBQUE7QUFBQSxNQUFLLFdBQVksV0FBakI7QUFDQTtBQUFBO0FBQUEsUUFBSyxXQUFVLEtBQWYsRUFBcUIsT0FBTyxFQUFDQyxlQUFlLE1BQWhCLEVBQXdCQyxRQUFRLEtBQWhDLEVBQTVCO0FBQ0E7QUFBQTtBQUFBLFVBQUssV0FBVSx1Q0FBZjtBQUNBO0FBQUE7QUFBQSxZQUFJLE9BQVMsRUFBQ0MsWUFBWSxNQUFiLEVBQXFCQyxPQUFPLE1BQTVCLEVBQWI7QUFBQTtBQUFBLFNBREE7QUFFQTtBQUFBO0FBQUEsWUFBSSxPQUFRLEVBQUNBLE9BQU8sU0FBUixFQUFaO0FBQUE7QUFBQSxTQUZBO0FBR0E7QUFBQTtBQUFBLFlBQUksT0FBUSxFQUFDQSxPQUFPLFNBQVIsRUFBWjtBQUFBO0FBQUEsU0FIQTtBQUlBO0FBQUE7QUFBQSxZQUFLLFdBQVUsb0JBQWYsRUFBb0MsT0FBUSxFQUFDQSxPQUFPLE1BQVIsRUFBZ0JDLFdBQVcsTUFBM0IsRUFBNUM7QUFDQSxxQ0FBRyxXQUFVLDBCQUFiLEVBQXdDLE9BQVEsRUFBQ0MsVUFBVSxLQUFYLEVBQWhELEdBREE7QUFFQTtBQUFBO0FBQUEsY0FBRyxPQUFRLEVBQUNDLFNBQVMsTUFBVixFQUFrQkQsVUFBVSxPQUE1QixFQUFYO0FBQUE7QUFBQSxXQUZBO0FBR0E7QUFBQTtBQUFBLGNBQVEsTUFBSyxVQUFiLEVBQXdCLFdBQVUsd0JBQWxDO0FBQUE7QUFBQTtBQUhBLFNBSkE7QUFTQTtBQUFBO0FBQUEsWUFBSyxXQUFVLG9CQUFmLEVBQW9DLE9BQVEsRUFBQ0YsT0FBTyxNQUFSLEVBQWdCQyxXQUFXLE1BQTNCLEVBQW1DRyxZQUFZLFdBQS9DLEVBQTVDO0FBQ0EscUNBQUcsV0FBVSw2QkFBYixFQUEyQyxPQUFRLEVBQUNGLFVBQVUsS0FBWCxFQUFuRCxHQURBO0FBRUE7QUFBQTtBQUFBLGNBQUcsT0FBUSxFQUFDQyxTQUFTLE1BQVYsRUFBa0JELFVBQVUsT0FBNUIsRUFBWDtBQUFBO0FBQUEsV0FGQTtBQUdBO0FBQUE7QUFBQSxjQUFRLE1BQUssVUFBYixFQUF3QixXQUFVLHdCQUFsQztBQUFBO0FBQUE7QUFIQTtBQVRBO0FBREEsS0FEQTtBQW9CQztBQUFBO0FBQUEsUUFBSyxXQUFVLEtBQWYsRUFBcUIsT0FBUSxFQUFDRCxXQUFXLE1BQVosRUFBN0I7QUFDRDtBQUFBO0FBQUEsVUFBSyxXQUFVLG9DQUFmO0FBQ0E7QUFBQTtBQUFBLFlBQUssV0FBVSxxQkFBZjtBQUNBO0FBQUE7QUFBQSxjQUFLLFdBQVUsZUFBZjtBQUNBO0FBQUE7QUFBQSxnQkFBSSxXQUFVLGFBQWQ7QUFBQTtBQUFBO0FBREEsV0FEQTtBQUlBO0FBQUE7QUFBQSxjQUFJLFdBQVUsWUFBZDtBQUNBO0FBQUE7QUFBQSxnQkFBSSxXQUFVLGlCQUFkO0FBQUE7QUFBMEMseUNBQUcsTUFBSyxTQUFSO0FBQTFDLGFBREE7QUFFQTtBQUFBO0FBQUEsZ0JBQUksV0FBVSxpQkFBZDtBQUFBO0FBQXdDLHlDQUFHLE1BQUssU0FBUjtBQUF4QyxhQUZBO0FBR0E7QUFBQTtBQUFBLGdCQUFJLFdBQVUsaUJBQWQ7QUFBQTtBQUFzQyx5Q0FBRyxNQUFLLFNBQVI7QUFBdEM7QUFIQTtBQUpBO0FBREEsT0FEQztBQWFEO0FBQUE7QUFBQSxVQUFLLFdBQVUsb0JBQWY7QUFDQTtBQUFBO0FBQUEsWUFBSyxXQUFVLHFCQUFmO0FBQ0E7QUFBQTtBQUFBLGNBQUssV0FBVSxlQUFmO0FBQ0E7QUFBQTtBQUFBLGdCQUFJLFdBQVUsYUFBZDtBQUFBO0FBQUE7QUFEQSxXQURBO0FBSUE7QUFBQTtBQUFBLGNBQUksV0FBVSxZQUFkO0FBQ0E7QUFBQTtBQUFBLGdCQUFJLFdBQVUsaUJBQWQ7QUFDQTtBQUFBO0FBQUEsa0JBQUssV0FBVSxLQUFmO0FBQ0E7QUFBQTtBQUFBLG9CQUFLLFdBQVUsVUFBZjtBQUNBLCtDQUFLLEtBQUksa0JBQVQsRUFBNEIsV0FBVSwwQkFBdEMsRUFBaUUsT0FBUSxFQUFDSCxRQUFRLE1BQVQsRUFBekUsR0FEQTtBQUVBLCtDQUFLLFdBQVUsMEJBQWYsRUFBMEMsT0FBUSxFQUFDQSxRQUFRLE1BQVQsRUFBbEQ7QUFGQSxpQkFEQTtBQUtBO0FBQUE7QUFBQSxvQkFBSyxXQUFVLFVBQWY7QUFDQTtBQUFBO0FBQUEsc0JBQUssV0FBVSxTQUFmLEVBQXlCLE9BQVEsRUFBQ08sU0FBUyxjQUFWLEVBQTBCQyxRQUFRLE1BQWxDLEVBQWpDO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFEQTtBQUVBO0FBQUE7QUFBQTtBQUFHLGlEQUFHLE1BQUssU0FBUjtBQUFILHFCQUZBO0FBR0E7QUFBQTtBQUFBLHdCQUFHLFdBQVUsY0FBYixFQUE0QixPQUFRLEVBQUNDLGNBQWEsTUFBZCxFQUFwQztBQUFBO0FBQUEscUJBSEE7QUFJQTtBQUFBO0FBQUE7QUFBRztBQUFBO0FBQUEsMEJBQUcsV0FBVSxpQkFBYixFQUErQixNQUFLLFFBQXBDO0FBQUE7QUFBQSx1QkFBSDtBQUFBO0FBQUE7QUFKQTtBQURBO0FBTEE7QUFEQTtBQURBO0FBSkE7QUFEQTtBQWJDO0FBcEJELEdBRGE7QUFBQSxDQUFmOztBQStEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQUMsT0FBT2IsUUFBUCxHQUFrQkEsUUFBbEIiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG52YXIgTWFpblBhZ2UgPSAocHJvcHMpID0+IChcclxuICA8ZGl2IGNsYXNzTmFtZSA9IFwiY29udGFpbmVyXCI+XHJcbiAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIiBzdHlsZT17e3BhZGRpbmdCb3R0b206ICc1MHB4JywgbWFyZ2luOiAnMHB4J319PlxyXG4gIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTEwIGNvbC1tZC1vZmZzZXQtMSB0ZXh0LWNlbnRlclwiPlxyXG4gIDxoMSBzdHlsZSA9IHt7Zm9udFdlaWdodDogJ2JvbGQnLCBjb2xvcjogJyNmZmYnfX0+V2VsY29tZSB0byBPdGJvNWx5ITwvaDE+XHJcbiAgPGgyIHN0eWxlPSB7e2NvbG9yOiAnI2RlZGVkZSd9fT5IdW5ncnkgPyB3YW50IGRlbGljaW91cyBob21lLW1hZGUgbWlkZGxlIGVhc3RyZW4gZm9vZCA/PC9oMj5cclxuICA8aDIgc3R5bGU9IHt7Y29sb3I6ICcjZGVkZWRlJ319PllFUyEgeW91IGFyZSBpbiB0aGUgcmlnaHQgcGxhY2UhPC9oMj5cclxuICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC02IGNvbC14cy0xMlwiIHN0eWxlPSB7e2NvbG9yOiAnI2ZmZicsIG1hcmdpblRvcDogJzIwcHgnfX0+XHJcbiAgPGkgY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi11c2VyXCIgc3R5bGU9IHt7Zm9udFNpemU6ICc1ZW0nfX0+PC9pPlxyXG4gIDxwIHN0eWxlPSB7e3BhZGRpbmc6ICcyMHB4JywgZm9udFNpemU6ICcxLjNlbSd9fT5XYW50IHRvIG9yZGVyIGZvb2QgPzwvcD5cclxuICA8YnV0dG9uIGhyZWY9XCIjL3NpZ251cFwiIGNsYXNzTmFtZT1cImJ0biBidG4tbGcgYnRuLXByaW1hcnlcIj5TaWduIHVwIG5vdyBhbmQgc3RhcnQgb3JkZXJpbmchPC9idXR0b24+XHJcbiAgPC9kaXY+XHJcbiAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNiBjb2wteHMtMTJcIiBzdHlsZT0ge3tjb2xvcjogJyNmZmYnLCBtYXJnaW5Ub3A6ICcyMHB4JywgYm9yZGVyTGVmdDogJzFweCBzb2xpZCd9fT5cclxuICA8aSBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLWN1dGxlcnlcIiBzdHlsZT0ge3tmb250U2l6ZTogJzVlbSd9fT48L2k+XHJcbiAgPHAgc3R5bGU9IHt7cGFkZGluZzogJzIwcHgnLCBmb250U2l6ZTogJzEuM2VtJ319PlJlYWR5IHRvIGNvb2sgYW5kIHNlbGwgPzwvcD5cclxuICA8YnV0dG9uIGhyZWY9XCIjL3NpZ251cFwiIGNsYXNzTmFtZT1cImJ0biBidG4tbGcgYnRuLXByaW1hcnlcIj5TaWduIHVwIG5vdyBhbmQgc3RhcnQgc2VsbGluZyE8L2J1dHRvbj5cclxuICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuIFxyXG5cclxuICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIiBzdHlsZT0ge3ttYXJnaW5Ub3A6ICc0MHB4J319PlxyXG4gIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTMgY29sLW1kLW9mZnNldC0xIGNvbC14cy0xMlwiPlxyXG4gIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwgcGFuZWwtcHJpbWFyeVwiPlxyXG4gIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtaGVhZGluZ1wiPlxyXG4gIDxoMyBjbGFzc05hbWU9XCJwYW5lbC10aXRsZVwiPlRvcCBDb29rZXJzPC9oMz5cclxuICA8L2Rpdj5cclxuICA8dWwgY2xhc3NOYW1lPVwibGlzdC1ncm91cFwiPlxyXG4gIDxsaSBjbGFzc05hbWU9XCJsaXN0LWdyb3VwLWl0ZW1cIj5PbSBUYTdzZWVuPGEgaHJlZj1cIiMvdXNlcnNcIj48L2E+PC9saT5cclxuICA8bGkgY2xhc3NOYW1lPVwibGlzdC1ncm91cC1pdGVtXCI+T20gQTdtYWQ8YSBocmVmPVwiIy91c2Vyc1wiPjwvYT48L2xpPlxyXG4gIDxsaSBjbGFzc05hbWU9XCJsaXN0LWdyb3VwLWl0ZW1cIj5PbSBBbGk8YSBocmVmPVwiIy91c2Vyc1wiPjwvYT48L2xpPlxyXG4gIDwvdWw+XHJcbiAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbiAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNyBjb2wteHMtMTJcIj5cclxuICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsIHBhbmVsLWRlZmF1bHRcIj5cclxuICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWhlYWRpbmdcIj5cclxuICA8aDMgY2xhc3NOYW1lPVwicGFuZWwtdGl0bGVcIj5Ub2RheSdzIENvb2tpbmdzPC9oMz5cclxuICA8L2Rpdj5cclxuICA8dWwgY2xhc3NOYW1lPVwibGlzdC1ncm91cFwiPlxyXG4gIDxsaSBjbGFzc05hbWU9XCJsaXN0LWdyb3VwLWl0ZW1cIj5cclxuICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTRcIj5cclxuICA8aW1nIHNyYz1cIi9hc3NldHMvY2hlZi5wbmdcIiBjbGFzc05hbWU9XCJpbWctcmVzcG9uc2l2ZSB0aHVtYm5haWxcIiBzdHlsZT0ge3ttYXJnaW46ICdhdXRvJ319Lz5cclxuICA8aW1nIGNsYXNzTmFtZT1cImltZy1yZXNwb25zaXZlIHRodW1ibmFpbFwiIHN0eWxlPSB7e21hcmdpbjogJ2F1dG8nfX0vPlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLThcIj5cclxuICA8ZGl2IGNsYXNzTmFtZT1cImNhcHRpb25cIiBzdHlsZT0ge3tkaXNwbGF5OiAnaW5saW5lLWJsb2NrJywgaGVpZ2h0OiAnMTAwJSd9fT5cclxuICA8aDM+T20gVGE3c2VlbjwvaDM+XHJcbiAgPHA+PGEgaHJlZj1cIiMvdXNlcnNcIj48L2E+PC9wPlxyXG4gIDxwIGNsYXNzTmFtZT1cImJ0biBidG4taW5mb1wiIHN0eWxlPSB7e21hcmdpbkJvdHRvbTonMjBweCd9fT4zMCBKT0Q8L3A+XHJcbiAgPHA+PGEgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgcm9sZT1cImJ1dHRvblwiPk9yZGVyIE5vdzwvYT4gPC9wPlxyXG4gIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG4gIDwvbGk+XHJcbiAgPC91bD5cclxuICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbiAgPC9kaXY+XHJcbiAgKTtcclxuXHJcbi8vIFByb3BUeXBlcyB0ZWxsIG90aGVyIGRldmVsb3BlcnMgd2hhdCBgcHJvcHNgIGEgY29tcG9uZW50IGV4cGVjdHNcclxuLy8gV2FybmluZ3Mgd2lsbCBiZSBzaG93biBpbiB0aGUgY29uc29sZSB3aGVuIHRoZSBkZWZpbmVkIHJ1bGVzIGFyZSB2aW9sYXRlZFxyXG4vLyBNYWluUGFnZS5wcm9wVHlwZXMgPSB7XHJcbi8vICAgdmlkZW9zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZFxyXG4vLyB9O1xyXG5cclxuLy8gSW4gdGhlIEVTNiBzcGVjLCBmaWxlcyBhcmUgXCJtb2R1bGVzXCIgYW5kIGRvIG5vdCBzaGFyZSBhIHRvcC1sZXZlbCBzY29wZS5cclxuLy8gYHZhcmAgZGVjbGFyYXRpb25zIHdpbGwgb25seSBleGlzdCBnbG9iYWxseSB3aGVyZSBleHBsaWNpdGx5IGRlZmluZWQuXHJcbndpbmRvdy5NYWluUGFnZSA9IE1haW5QYWdlOyJdfQ==