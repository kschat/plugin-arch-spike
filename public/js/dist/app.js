!function(app, undefined) {
  'use strict';  // Source: public/js/modules/core/core-module.js
  angular.module('core', []);

  // Source: public/js/modules/core/controllers/plugin-manager-controller.js
  angular  
    .module('core')  
    
    .controller('PluginManagerController', ['$scope', 'pluginManager', '$filter', 'appSettings', function($scope, pluginManager, $filter, appSettings) {  
      var _currentPluginIndex = -1;  
    
      pluginManager.onPluginsLoaded(function(plugins) {  
        plugins[appSettings.activatePluginOnStart].active = true;  
    
        $scope.$apply(function() {  
          $scope.plugins = plugins;  
          $scope.contextMenus = $filter('contextMenu')(plugins);  
        });  
      });  
    
      $scope.plugins = [];  
      $scope.contextMenus = [];  
    
      $scope.sidebarItemClicked = function(id) {  
        $scope.$apply(pluginManager.selectPlugin.bind(pluginManager, id));  
      };  
    }]);

  // Source: public/js/modules/core/directives/compile-directive.js
  angular  
    .module('core')  
    
    .directive('compile', ['$compile', function($compile) {  
      return {  
        link: function($scope, $element, $attrs) {  
          var stopWatch = $scope.$watch(  
            function(scope) { return scope.$eval($attrs.compile); },  
    
            function(value) {  
              $element.html(value);  
              $compile($element.contents())($scope);  
              stopWatch();  
            }  
          );  
        }  
      };  
    }]);

  // Source: public/js/modules/core/directives/context-menu-directive.js
  angular  
    .module('core')  
    
    .directive('contextMenu', ['appSettings', '$compile', 'ContextMenu', function(appSettings, $compile, ContextMenu) {  
    
      var _ctxs = Object.keys(ContextMenu.context)  
        .map(function(i) { return '[data-context="' + ContextMenu.context[i] + '"]'; })  
        .join(', ');  
    
      return {  
    
        replace: true,  
    
        restrict: 'E',  
    
        templateUrl: appSettings.urls.module + 'core/views/context-menu-view.html',  
    
        scope: {  
          menuItems: '='  
        },  
    
        link: function($scope, $element, $attr) {  
          $scope.itemHandler = function(e, item) {  
            if(!item.enabled) { return; }  
    
            $element.blur();  
            item.handler(e);  
          };  
    
          $element.on('blur', function(e) {  
            $element.removeClass('show');  
          });  
    
          $('body').on('contextmenu', _ctxs, function(e) {  
            $scope.currentContext = $(this).data('context');  
            $scope.$apply();  
    
            for(var i = 0; i < $scope.menuItems.length; i++) {  
              var item = $scope.menuItems[i];  
              item.enabled && item.beforeShow();  
            }  
    
            if(!$element.children('.show').length) { return; }  
              
            e.preventDefault();  
    
            $element  
              .css({ top: e.pageY, left: e.pageX })  
              .addClass('show')  
              .focus();  
          });  
        }  
      };  
    
    }]);

  // Source: public/js/modules/core/directives/header-item-directive.js
  angular  
    .module('core')  
    .directive('headerItem', ['appSettings', '$compile', function(appSettings, $compile) {  
    
      return {  
    
        replace: true,  
    
        scope: {  
          plugin: '=headerItem'  
        },  
    
        controller: ['$scope', function($scope) {  
          $scope.headerItems = $scope.plugin.headerItems || [];  
        }],  
    
        compile: function(tElement, attr, linker) {  
          var tmpl = $compile('<li data-ng-include="\'' + appSettings.urls.module + 'core/views/header-item-view.html' + '\'"></li>');  
    
          return function($scope, $element, $attr) {  
            var tmpls = [];  
    
            for(var i = $scope.headerItems.length - 1; i >= 0; i--) {  
              var tScope = $scope.$new(true);  
              tScope.item = $scope.headerItems[i];  
              tScope.plugin = $scope.plugin;  
    
              tmpls.push(tmpl(tScope));  
            }  
    
            $element.append(tmpls);  
          };  
        }  
    
      };  
    
    }]);

  // Source: public/js/modules/core/directives/modal-directive.js
  angular  
    .module('core')  
    
    .directive('modal', ['appSettings', '$compile', function(appSettings, $compile) {  
    
      return {  
        replace: true,  
    
        scope: {  
          plugin: '=modal'  
        },  
    
        controller: ['$scope', function($scope) {  
          $scope.modals = $scope.plugin.modals || [];  
        }],  
    
        compile: function(tElement, attr, linker) {  
          var tmpl = $compile('<div data-ng-include="\'' + appSettings.urls.module + 'core/views/modal-view.html' + '\'"></div>');  
    
          return function($scope, $element, $attr) {  
            var tmpls = [];  
    
            for(var i = $scope.modals.length - 1; i >= 0; i--) {  
              var tScope = $scope.$new(true);  
              tScope.modal = $scope.modals[i];  
              tScope.plugin = $scope.plugin;  
    
              tScope.$on('$includeContentLoaded', function() {  
                angular.element(tScope.modal.show).on('click', function(e) {  
                  $element  
                    .find('.modal')  
                    .modal('show');  
                });  
              });  
    
              tmpls.push(tmpl(tScope));  
            }  
    
            $element.append(tmpls);  
          };  
        }  
      };  
    
    }]);

  // Source: public/js/modules/core/directives/panel-directive.js
  angular  
    .module('core')  
      
    .directive('panel', ['appSettings', '$compile', function(appSettings, $compile) {  
    
      return {  
        replace: true,  
          
        scope: {  
          plugin: '=panel'  
        },  
    
        controller: ['$scope', function($scope) {  
          $scope.panels = $scope.plugin.panels || [];  
        }],  
    
        compile: function(tElement, attr, linker) {  
          var tmpl = $compile('<div data-ng-include="\'' + appSettings.urls.module + 'core/views/panel-view.html' + '\'"></div>');  
    
          return function($scope, $element, $attr) {  
            var tmpls = [];  
    
            for(var i = $scope.panels.length - 1; i >= 0; i--) {  
              var tScope = $scope.$new(true)  
                , el = tmpl(tScope);  
    
              tScope.panel = $scope.panels[i];  
              tScope.plugin = $scope.plugin;  
    
              tScope.$on('$includeContentLoaded', (function(plugin, panel) {  
                return function() {  
                  el.next()  
                    .find('.panel-body')  
                    .append($(panel.body, plugin.context));  
                };  
              }(tScope.plugin, tScope.panel)));  
    
              tmpls.push(el);  
            }  
    
            $element.append(tmpls);  
          };  
        }  
      };  
    
    }]);

  // Source: public/js/modules/core/directives/popup-directive.js
  angular  
    .module('core')  
    
    .directive('popup', ['appSettings', '$compile', function(appSettings, $compile) {  
    
      return {  
        replace: true,  
    
        scope: {  
          plugin: '=popup'  
        },  
    
        controller: ['$scope', function($scope) {  
          $scope.popups = $scope.plugin.popups || [];  
        }],  
    
        compile: function(tElement, attr, linker) {  
          var tmpl = $compile('<div data-ng-include="\'' + appSettings.urls.module + 'core/views/popup-view.html' + '\'"></div>');  
    
          return function($scope, $element, $attr) {  
            var tmpls = [];  
    
            for(var i = $scope.popups.length - 1; i >= 0; i--) {  
              var tScope = $scope.$new(true);  
              tScope.popup = $scope.popups[i];  
              tScope.plugin = $scope.plugin;  
    
              tScope.$on('$includeContentLoaded', (function(popup) {  
                return function() {  
                  angular.element(popup.show).on('click', function(e) {  
    
                    window.open(  
                      popup.href,  
                      popup.name,  
                      JSON.stringify(popup.windowOptions)  
                        .replace(/\{|\}|"",|"/g, '')  
                        .replace(/:/g, '=')  
                    );  
                  });  
                };  
              }(tScope.popup)));  
    
              tmpls.push(tmpl(tScope));  
            }  
    
            $element.append(tmpls);  
          };  
        }  
      };  
    
    }]);

  // Source: public/js/modules/core/directives/sidebar-item-directive.js
  angular  
    .module('core')  
    .directive('sidebarItem', ['appSettings', function(appSettings) {  
    
      var _id = 0;  
    
      return {  
    
        replace: true,  
    
        scope: {  
          plugin: '=sidebarItem',  
          selectHandler: '&itemSelect'  
        },  
    
        templateUrl: appSettings.urls.module + 'core/views/sidebar-item-view.html',  
    
        controller: ['$scope', '$sce', function($scope, $sce) {  
          $scope.eId = $scope.eId || _id++;  
          $scope.item = $scope.plugin.sidebarItem;  
        }],  
    
        link: function($scope, $element, $attr) {  
          $element  
            .find('.panel-body')  
            .append($($scope.item.body, $scope.plugin.context));  
    
          $element.on('click', function(e) {  
            $scope.selectHandler({  
              e: Math.round($(this).find('a').attr('href').split('sidbar-nav-')[1])  
            });  
          });  
        }  
    
      };  
    
    }]);

  // Source: public/js/modules/core/filters/context-menu-filter.js
  angular  
    .module('core')  
    
    .filter('contextMenu', [function() {  
      return function(input) {  
        // console.log([].concat.apply([], input.map(function(x) { return x.contextMenus || []; })));  
        return [].concat.apply([], input.map(function(x) { return x.contextMenus || []; }));  
      };  
    }]);

  // Source: public/js/modules/core/filters/header-item-filter.js
  angular  
    .module('core')  
    
    .filter('headerItem', ['$filter', function($filter) {  
      var _propFilter = $filter('property');  
      return function(plugins) {  
        return _propFilter(plugins, 'headerItems');  
      };  
    }]);

  // Source: public/js/modules/core/filters/modal-filter.js
  angular  
    .module('core')  
    
    .filter('modal', ['$filter', function($filter) {  
      var _propFilter = $filter('property');  
      return function(plugins) {  
        return _propFilter(plugins, 'modals');  
      };  
    }]);

  // Source: public/js/modules/core/filters/panel-filter.js
  angular  
    .module('core')  
    
    .filter('panel', ['$filter', function($filter) {  
      var _propFilter = $filter('property');  
      return function(plugins) {  
        return _propFilter(plugins, 'panels');  
      };  
    }]);

  // Source: public/js/modules/core/filters/property-filter.js
  angular  
    .module('core')  
    
    .filter('property', [function() {  
      return function(input, prop) {  
        return (input || []).filter(function(i) { return i[prop]; });  
      };  
    }]);

  // Source: public/js/modules/core/filters/sidebar-filter.js
  angular  
    .module('core')  
    
    .filter('sidebar', ['$filter', function($filter) {  
      var _propFilter = $filter('property');  
      return function(plugins) {  
        return _propFilter(plugins, 'sidebarItem');  
      };  
    }]);

  // Source: public/js/modules/core/filters/toTrustedHtml.js
  angular  
    .module('core')  
    
    .filter('toTrusted', ['$sce', function($sce) {  
      return $sce.trustAsHtml;  
    }]);

  // Source: public/js/modules/core/services/command-factory.js
  angular  
    .module('core')  
    
    .factory('Command', [function() {  
      var _Command = function Command() {};  
    
      _Command.prototype = Object.create({  
    
        handle: function handle() {},  
    
        undo: function undo() {}  
    
      });  
    
      return _Command;  
    }]);

  // Source: public/js/modules/core/services/context-menu-factory.js
  angular  
    .module('core')  
    
    .factory('ContextMenu', [function() {  
      var _ContextMenu = function ContextMenu(opts) {  
        if(!(this instanceof ContextMenu)) { return new ContextMenu(opts); }  
    
        opts = opts || {};  
    
        for(var i in this) { this[i] = opts[i] != null ? opts[i] : this[i]; } // checks for null and undefined  
      };  
    
      Object.defineProperty(_ContextMenu, 'context', {  
    
        enumerable: true,  
    
        value: {  
          ALL: '*',  
    
          PANEL: 'panel',  
    
          SIDEBAR_ITEM: 'sidebar-item',  
    
          HEADER_ITEM: 'header-item',  
    
          MODAL: 'modal'  
        }  
    
      });  
    
      _ContextMenu.prototype = Object.create({  
          
        context: _ContextMenu.context.ALL,  
    
        label: '',  
    
        enabled: true,  
    
        beforeShow: function() {},  
    
        handler: function() {}  
    
      });  
    
      return _ContextMenu;  
    
    }]);

  // Source: public/js/modules/core/services/header-item-factory.js
  angular  
    .module('core')  
    
    .factory('HeaderItem', [function() {  
      var _HeaderItem = function HeaderItem(label, opts) {  
        if(!(this instanceof HeaderItem)) { return new HeaderItem(label, opts); }  
          
        if(label == null) { throw Error('HeaderItem: Label is required.'); }  
    
        opts = opts || {};  
    
        for(var i in this) { this[i] = opts[i] != null ? opts[i] : this[i]; }  
    
        this.label = label;  
      };  
    
      _HeaderItem.prototype = Object.create({ label: '', icon: '', handler: function() {} });  
    
      return _HeaderItem;  
    
    }]);

  // Source: public/js/modules/core/services/modal-factory.js
  angular  
    .module('core')  
    
    .factory('Dialog', [function() {  
    
      var _Dialog = function Dialog(opts) {  
        if(!(this instanceof Dialog)) { return new Dialog(opts); }  
    
        opts = opts || {};  
    
        for(var i in this) { this[i] = opts[i] != null ? opts[i] : this[i]; }  
      };  
    
      _Dialog.prototype = Object.create({  
        id: '',  
    
        icon: '',  
    
        title: '',  
    
        body: '',  
    
        footer: '',  
    
        modal: false,  
    
        close: true,  
    
        show: ''  
      });  
    
      return _Dialog;  
    
    }]);

  // Source: public/js/modules/core/services/panel-factory.js
  angular  
    .module('core')  
    
    .factory('Panel', [function() {  
    
      var _Panel = function Panel(title, opts) {  
        if(!(this instanceof Panel)) { return new Panel(title, opts); }  
          
        if(title == null) { throw Error('Panel: Title is required.'); }  
    
        opts = opts || {};  
    
        for(var i in this) { this[i] = opts[i] != null ? opts[i] : this[i]; }  
    
        this.title = title;  
      };  
    
      _Panel.prototype = Object.create({ body: '', column: 'xs-2', offset: '' });  
    
      return _Panel;  
    
    }]);

  // Source: public/js/modules/core/services/plugin-event-bus.js
  angular  
    .module('core')  
    
    .factory('bus', ['$rootScope', 'Command', function($rootScope, Command) {  
      var _commands = {}  
        , _stubCmd = new Command();  
    
      return {  
        events: {  
          trigger: $rootScope.$broadcast.bind(angular.element('body').scope())  
        },  
    
        commands: {  
          handle: function(command) {  
            if(typeof command.handle !== 'function') { throw Error('CommandBus: Command must have handle method'); }  
            _commands.push(command);  
            command.handle();  
          },  
    
          undo: function(amt) {  
            var undos = _commands.splice(-1, amt);  
            for(var i = 0; i < undos.length; i++) {  
              undos[i].undo();  
            }  
          }  
        }  
      };  
    }]);

  // Source: public/js/modules/core/services/plugin-factory.js
  angular  
    .module('core')  
    
    .factory('Plugin', [function() {  
        
      return function Plugin() {  
    
        return {  
    
          context: {},  
    
          active: false,  
    
          loading: false,  
            
          sidebarItem: {},  
    
          headerItems: [],  
    
          panels: [],  
    
          contextMenus: [],  
    
          modals: [],  
    
          popups: []  
    
        };  
    
      };  
    
    }]);

  // Source: public/js/modules/core/services/plugin-manager-service.js
  angular  
    .module('core')  
      
    .factory('pluginManager', ['Plugin', function PluginManager(Plugin) {  
        
      var _plugins = []  
        , _callback = function() {}  
        , _loaded = 0;  
    
      return {  
    
        length: 0,  
    
        register: function(plugin) {  
          _plugins.push(plugin);  
          _loaded++;  
          this.onPluginsLoaded(_callback);  
        },  
    
        unregister: function(index) {  
          _plugins.splice(index, 1);  
        },  
    
        selectPlugin: function(index) {  
          _plugins[index].active = true;  
    
          for(var i = 0; i < _plugins.length; i++) {  
            if(i === index) { continue; }  
    
            _plugins[i].active = false;  
          }  
        },  
    
        onPluginsLoaded: function(cb) {  
          _callback = cb;  
          _loaded === this.length && cb(_plugins);  
        }  
    
      };  
    
    }]);

  // Source: public/js/modules/core/services/popup-factory.js
  angular  
    .module('core')  
    
    .factory('Popup', [function() {  
      var _Popup = function Popup(href, opts) {  
        if(!(this instanceof Popup)) { return new Popup(href, opts); }  
          
        if(href == null) { throw Error('Popup: Href is required.'); }  
    
        opts = opts || {};  
    
        this.name = 'popup-' + Date.now();  
    
        for(var i in this) { this[i] = opts[i] != null ? opts[i] : this[i]; }  
    
        this.href = href;  
      };  
    
      _Popup.prototype = Object.create({  
          
        name: '',  
    
        href: '',  
    
        show: '',  
    
        windowOptions: {}  
    
      });  
    
      return _Popup;  
    
    }]);

  // Source: public/js/modules/core/services/sidebar-item-factory.js
  angular  
    .module('core')  
    
    .factory('SidebarItem', [function() {  
      var _SidebarItem = function SidebarItem(title, opts) {  
        if(!(this instanceof SidebarItem)) { return new SidebarItem(title, opts); }  
          
        if(title == null) { throw Error('SidebarItem: Title is required.'); }  
    
        opts = opts || {};  
    
        for(var i in this) { this[i] = opts[i] != null ? opts[i] : this[i]; }  
    
        this.title = title;  
      };  
    
      _SidebarItem.prototype = Object.create({ icon: '', body: '', priority: -1, selected: false });  
    
      return _SidebarItem;  
    
    }]);

  // Source: public/js/app.js
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
  }.call(this, {});