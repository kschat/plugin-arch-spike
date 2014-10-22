'use strict';

angular
  .module('statDX', ['core'])

  .controller('StatDXController', ['SidebarItem', 'Panel', 'bus', function(SidebarItem, Panel, bus) {
    plugin.sidebarItem = new SidebarItem('StatDX', {
      icon: 'user-md',

      body: '#sdx-btn'
    });

    plugin.panels.push(new Panel('StatDX', {
      body: '.my-content'
    }));

  }]);