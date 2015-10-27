'use strict';

angular.module('yhApp')
  .factory('lokBlog', function () {
    var self = {
      prefix: 'views/blogs/',
      suffix: '.html',
      blogs: [
        '20140602-chromeDevTools'
      ],

      getUrl: function(url){
        return self.prefix + url + self.suffix;
      }

    };

    return self;
  });
