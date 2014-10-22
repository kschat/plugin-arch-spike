'use strict';

angular
  .module('worklist', ['core'])

  .controller('Plugin1Controller', [
    'HeaderItem',
    'SidebarItem',
    'ContextMenu',
    'Panel',
    'Dialog',
    'Popup',
    '$element',
    '$scope',
    function(HeaderItem, SidebarItem, ContextMenu, Panel, Dialog, Popup, $element, $scope) {

      $('body').on('click', '#incr-mesg', function(e) {
        var $msg = $('#message');
        $msg.text(Number($msg.text()) + 1);
      });

      plugin.sidebarItem = new SidebarItem('My Worklist', {

        priority: 0,

        toggle: true,

        icon: 'inbox',

        body: '#nav-item-content'

      });

      plugin.panels.push(new Panel('test', {

        body: '#message',
        
        column: 'xs-4'

      }));
      
      plugin.panels.push(new Panel('Worklist', {

        body: '#panel-2-content',

        column: 'xs-8'

      }));

      plugin.headerItems.push(new HeaderItem('Home', {

        handler: function(e) {
          alert('test');
        }

      }));

      plugin.modals.push(new Dialog({

        title: 'test modal',

        icon: 'info-circle',

        body: 'test modal body',

        footer: '<button class="btn btn-primary" type="button">Test button</button>',

        show: '#show-dialog'

      }));

      plugin.popups.push(new Popup('/plugins/worklist/popup.html', {

        show: '#show-popup',

        windowOptions: {
          dialog: 'yes'
        }

      }));

      plugin.contextMenus.push(new ContextMenu({
        label: 'worklist',

        context: ContextMenu.context.MODAL
      }));

    }
  ]);