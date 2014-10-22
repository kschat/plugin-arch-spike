'use strict';

angular
  .module('testPlugin', ['core'])

  .directive('testItem', function() {
    return {
      replace: true,

      template: '<h1 id="test-directive">TEST</h1>',

      link: function(scope, element, attr) {
        console.log(element);
      }
    };
  })

  .controller('TestPluginController', ['SidebarItem', 'Panel', 'ContextMenu', '$element', function(SidebarItem, Panel, ContextMenu, $element) {

    $('body').on('click', '#testBtn', function(e) {
      e.preventDefault();

      $('#testMessage').text('button clicked');
    });

    plugin.sidebarItem = new SidebarItem('Test Plugin', {

      icon: 'pied-piper-alt',

      body: '#testBtn'

    });

    plugin.panels.push(new Panel('Test plugin panel', {

      body: '#testMessage'

    }));

    plugin.contextMenus.push(new ContextMenu({
      
      label: 'Test ctx menu',

      context: ContextMenu.context.PANEL,

      beforeShow: function(e) {
      
      }

    }));

  }]);