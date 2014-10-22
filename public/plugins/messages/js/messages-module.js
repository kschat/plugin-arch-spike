'use strict';

angular
  .module('messages', ['core'])

  .controller('Plugin1Controller', [
    'HeaderItem',
    'SidebarItem',
    'Panel',
    'ContextMenu',
    '$element',
    function(HeaderItem, SidebarItem, Panel, ContextMenu, $element) {

      plugin.sidebarItem = new SidebarItem('Messages', {

        priority: 0,

        toggle: true,

        icon: 'envelope',

        body: '#nav-item-content'

      });

      plugin.panels.push(new Panel('Messages', {
      
        body: '<h1>content</h1>',
      
        column: 'xs-8',
      
        offset: 'xs-offset-2'
      
      }));

      plugin.contextMenus.push(new ContextMenu({

        label: 'messages',

        context: ContextMenu.context.HEADER_ITEM,

        beforeShow: function() {
          console.log('messages beforeShow');
        },

        handler: function(e) {
          console.log(this);
        }

      }));

      plugin.contextMenus.push(new ContextMenu({

        label: 'add message',

        context: ContextMenu.context.PANEL,

        enabled: false,

        handler: function() { console.log(this); }

      }));

      plugin.contextMenus.push(new ContextMenu({

        label: 'edit message',

        context: ContextMenu.context.ALL

      }));

    }
  ]);