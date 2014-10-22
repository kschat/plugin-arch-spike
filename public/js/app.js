angular
  .module('app', ['core'])

  .value('appSettings', {
    urls: {
      base: '/js/',

      module: '/js/modules/'
    },

    activatePluginOnStart: 0
  })

  .value('pluginUrls', ['plugins/worklist/index.html', 'plugins/messages/index.html', 'plugins/statdx/index.html', 'plugins/testplugin/index.html'])

  .controller('AppController', ['pluginUrls', 'Plugin', 'pluginManager', 'appSettings', function(pluginUrls, Plugin, pluginManager, appSettings) {
    appSettings.activatePluginOnStart = typeof appSettings.activatePluginOnStart === 'number'
      ? appSettings.activatePluginOnStart
      : (appSettings.activatePluginOnStart ? 0 : -1);

    pluginManager.length = pluginUrls.length;

    var _iframeTmpl = ''.replace.bind('<iframe src="{0}" frameborder="0" class="hide"></iframe>', '{0}')

      , _bootstrapTmpl = ''.replace.bind(angular.element('#plugin-bootstrap-tmpl').text(), '{{appName}}')

      , _bootstrapIframe = function($iframe, cw) {
          cw.angular = angular;
          cw.$ = $;
          cw.__pluginManager__ = pluginManager;
          cw.plugin = new Plugin();

          $iframe.load(function() {
            var $doc = $(cw.document)

              , appName = $doc.find('[data-ng-app]').data('ng-app')

              , script = $doc[0].createElement('script');

            script.text = _bootstrapTmpl(appName);
            
            cw.document.body.appendChild(script);
          });
        };

    for(var i = 0; i < pluginUrls.length; i++) {
      var $iframe = $(_iframeTmpl(pluginUrls[i])).appendTo('body');

      _bootstrapIframe($iframe, $iframe[0].contentWindow);
    }

  }]);
