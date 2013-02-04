define(['jquery', 'underscore', 'backbone', 'vm'], function($, _, Backbone, ViewManager) {'use strict';
	// Routes, used to change page
	var MyRouter, initialize;
	MyRouter = Backbone.Router.extend({
		routes : {
			':foo' : 'pageChange',
			'*actions' : 'defaultAct'
		},
		
		panel : 'body',
		
		currentView : null,
		
		initialize : function() {
			
		},

		pageChange : function(p1) {

		},

		render : function() {
		},

		defaultAct : function() {

		}
	});

	initialize = function() {
		var router = new MyRouter();
		Backbone.history.start();
	};
	return {
		initialize : initialize
	};
});