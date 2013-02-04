/* global : chrome */
define(['jquery', 'underscore', 'backbone', 'cgi', 'config'], function($, _, Backbone, cgi, config) {'use strict';

	var MainPage = Backbone.View.extend({
		initialize : function() {

		},

		el : 'body',

		events : {
			'submit' : 'submit',
			'click a' : 'newTab'
		},

		render : function() {
			if ( typeof window.localStorage['number'] != "undefined") {
				$(":text").val(window.localStorage['number']);
			}
		},

		newTab : function(e) {
			chrome.tabs.create({
				url : $(this).attr("href")
			});
		},

		submit : function(e) {
			var self = this, url = 'http://postserv.post.gov.tw/webpost/CSController?cmd=POS4001_3&_SYS_ID=D&_MENU_ID=189&_ACTIVE_ID=190&MAILNO=' + _.escapeHTML(this.$(":text").val());
			e.preventDefault();
			this.$el.removeClass("result");
			
			if ($("form>a").size()) {
				$("form>a").attr("href");
			}
			
			$("#content").html("LOADING");
			$("#content").before("<a href='" + url + "'>開啟原網頁</a>");
			cgi.api(config.iPost, {
				'cmd' : 'POS4001_3',
				'_SYS_ID' : 'D',
				'_MENU_ID' : '189',
				'_ACTIVE_ID' : '190',
				'MAILNO' : _.escapeHTML(this.$(':text').val())
			}, {
				sucess : function(result) {
					if (result) {
						$("body").addClass("result");
						var start = result.indexOf("<!-- ##################主要內容################# BEGIN -->"), end = result.indexOf("<!-- ##################主要內容################# END -->");
						result = _.escapeHTML(result.substring(start, end));
						$("#content").html(result);
						window.localStorage['number'] = self.$(":text").val();
					} else {
						self.$("#content").html("LOAD FAILED");
					}
				},

				error : function(xhr) {
					self.$("#content").html("CONNECT ERROR\n" + xhr);
				}
			});
		}
	});
	return MainPage;
});