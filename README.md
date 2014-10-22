RadDesktop Plugin API
==

Object Model
--

### Plugin
*Main building block for all plugins.*

#### Properties

name | type | description
:-- | :-- | :--
active | *Boolean* | Make the plugin "active". Active plugins are set as the current context. That is, their panels are visible, and sidebarItem is set as "selected".
loading | *Boolean* | Set the plugin as "loading". Loading plugins are set as disabled, and can't be interacted with until they're done loading. Defaults to true.
context | *HTMLDocument* | The document of the plugin. Is automatically set to the document of the iframe of the plugin during the bootstrap process.
sidebarItem | *SidebarItem* | 1 per plugin. Registered as a sidebar NavItem when the application bootstraps.
headerItems | *Array* | n per plugin. Registers all headerItems when the application bootstraps.
panels | *Array* | n per plugin. Registers all panels when the application bootstraps.
contextMenus | *Array* | n per plugin. Registers all contextMenus when the application bootstraps.
modals | *Array* | n per plugin. Registers all modals when the application bootstraps.
popups | *Array* | n per plugin. Registers all popups when the application bootstraps.

### SidebarItem
*Represents an item (expandable list item) in the sidebar of the application. Provides a way to activate a plugin in the current context.*

#### Properties

name | type | description
:-- | :-- | :--
icon | *String* | The icon that appears in the top left corner of the SidebarItem.
title | *String* | The title of the SidebarItem.
body | *String (HTML)* | The content that appears when the SidebarItem is fully expanded.
priority | *Number* | The index of the SidebarItem. 
selected | *Boolean* | Whether the SidebarItem should be rendered as selected.
expandable | *Boolean* | Whether the SidebarItem should be able to expand upon selection.

#### Events

name | arguments | description
:-- | :-- | :--
beforeRegister | Plugin instance | Called before the plugin is registered during the bootstrap process.
afterRegister | Plugin instance | Called after the Plugin is registered during the bootstrap process.
beforeActive | Plugin instance | Called before the Plugin is set to the "active" state. Can be canceled.
afterActive | Plugin instance | Called after the plugin is set to the "active" state.
beforeExpand | Plugin instance | Called before the Plugin is expanded (only applies to plugins that are expandable). Can be canceled.
afterExpand | Plugin instance | Called after the Plugin is expanded (only applies to plugins that are epandable).
beforeStateChange | Plugin instace, Boolean state | Called before the Plugin is set to the "enabled" (true) state or "disabled" (false) state. Can be canceled.
afterStateChange | Plugin instace, Boolean state | Called after the Plugin is set to the "enabled" (true) state or "disabled" (false) state.

### HeaderItem
*Represents an item (button) in the header of the application.*

#### Properties

name | type | description
:-- | :-- | :--
icon | *String* | The icon that appears in the header item.
label | *String* | The label that appears in the HeaderItem.
action | *Function* | Action to call when the HeaderItem is triggered.

#### Events

name | arguments | description
:-- | :-- | :--
beforeAction | HeaderItem instance | Called before the action handler for the HeaderItem is called. Can be canceled.
afterAction | HeaderItem instance | Called before the action handler for the HeaderItem is called.
beforeStateChange | HeaderItem instace, Boolean state | Called before the HeaderItem is set to the "enabled" (true) state or "disabled" (false) state. Can be canceled.
afterStateChange | HeaderItem instace, Boolean state | Called after the HeaderItem is set to the "enabled" (true) state or "disabled" (false) state.

### Panel
*Represents a panel that appears on the main "canvas" of the application.*

#### Properties

name | type | description
:-- | :-- | :--
icon | *String* | The icon that appears in the top left corner of the Panel.
title | *String (HTML)* | The title of the Panel.
body | *String (HTML)* | The content that appears in the Panel.

#### Events

name | arguments | description
:-- | :-- | :--
beforeActive | Panel instance | Called before the Panel is set to the "active" state. Can be canceled.
afterActive | Panel instance | Called after the Panel is set to the "active" state.
beforeStateChange | Panel instace, Boolean state | Called before the Panel is set to the "enabled" (true) state or "disabled" (false) state. Can be canceled.
afterStateChange | Panel instace, Boolean state | Called after the Panel is set to the "enabled" (true) state or "disabled" (false) state.

### ContextMenu
*Represents a dropdown context menu that appears when a user triggers a particular action.*

#### Properties

name | type | description
:-- | :-- | :--
title | *String (HTML)* | The title of the ContextMenu.
contexts | *Array* | List of contexts in which the item will appear. Valid values are: "*", "page", "panel", "sidebar", "header-item", or "dialog". There is also an "enum" provided on the ContextMenu constructor called "context".
action | *String* | The action that triggers indicates that the ContextMenu should be shown.
items | *Array* | List of ContextItems in the ContextMenu.


#### Events

name | arguments | description
:-- | :-- | :--
beforeActive | ContextMenu instance | Called before the ContextMenu is set to the "active" state. Can be canceled.
afterActive | ContextMenu instance | Called after the ContextMenu is set to the "active" state.
beforeStateChange | ContextMenu instace, Boolean state | Called before the ContextMenu is set to the "enabled" (true) state or "disabled" (false) state. Can be canceled.
afterStateChange | ContextMenu instace, Boolean state | Called after the ContextMenu is set to the "enabled" (true) state or "disabled" (false) state.

### Modal
*Represents a modal dialog that appears over the main UI.*

#### Properties

name | type | description
:-- | :-- | :--
icon | *String* | The icon that appears in the top left corner of the Dialog.
title | *String (HTML)* | The title of the Dialog.
body | *String (HTML)* | The content that appears in the Dialog.
footer | *String (HTML)* | The content that appears in the footer of the Dialog.
close | *Boolean* | Defines if the Dialog should display a close button.
trigger | *String (Selector) &#124; Object* | If a *String* is given, it is the selector of the element that, when clicked, shows the modal. If trigger is an object, it should contain a selector property, an event property (defaults to "click" if none is given), and a handler property that is of type *Function*.

#### Events

name | arguments | description
:-- | :-- | :--
beforeActive | Dialog instance | Called before the Dialog is set to the "active" state. Can be canceled.
afterActive | Dialog instance | Called after the Dialog is set to the "active" state.

### Popup

*Represents a popup window that renders a new page*

#### Properties

name | type | description
:-- | :-- | :--
href | *String* | The URL to point the new window instance to. Property is required.
name | *String* | The name handle for the popup window.
trigger | *String (Selector) &#124; Object* | If a *String* is given, it is the selector of the element that, when clicked, shows the modal. If trigger is an object, it should contain a selector property, an event property (defaults to "click" if none is given), and a handler property that is of type *Function*.

#### Events

name | arguments | description
:-- | :-- | :--
beforeActive | Popup instance | Called before the Popup is set to the "active" state. Can be canceled.
afterActive | Popup instance | Called after the Popup is set to the "active" state.
onClose | Popup instance | Called when the Popup has been closed.

Plugin Installation
--

*Plugins are websites (most likely Angular apps) that are downloaded and injected (along with an instance of Angular) into an iframe in the main RadDesktop window. This allows plugins to have their own, sandboxed, environment while still being able to interact with the main application by means of Angular dependency injection.*

1. Register URL that points to plugin.
2. Create iframe tag in the main document with the src property pointing to the plugin URL.
3. Once all plugins have been injected as iframes, run through each registered plugin for each object in the object model (SidebarItem, HeaderItem, Panel, ContextMenu, and Dialog)

Plugin Communication
--

*Plugins will be able to communicate via an event or a command bus. Events let other plugins that something has already happened and is used as a broadcaster. The command bus is a request to another component in the application to perform a specific task. Tasks can complete, fail, or be defined.*

### Event Bus

*Allows plugins to broadcast messages to other components of the application.*

#### Properties

name | type | description
:-- | :-- | :--
trigger | *Function (topic, eventArgs)* | Triggers the event given as the first parameter, with the event arguments given as the second parameter. Should be used when trying to communicate to other plugins since plugins are loaded in iframes.
on | *Function (topic, handler)* | Listen for the event given as the first parameter with the function given as the second parameter.

### Command Bus

*Allow plugins to request other portions of the application to perform a particular action.*

#### Properties

name | type | description
:-- | :-- | :--
handle | *Function (command)* | Performs the command given. The command property should inherit from the *Command* prototype.
undo | *Function (amt)* | Call the *undo* method of and pop of the last command off the command stack. If *amt* is given, perform that many *undo* methods.

### Command

*Prototype that should be used as the base prototype of all commands passed to the Command Bus*

#### Properties

name | type | description
:-- | :-- | :--
handle | *Function* | The function that is called when the command is passed to the command bus. Command specific logic should go here.
undo | *Function* | The function that is called when a command is requested to be undone. 

Concerns/Further Investigation
--

### Injected DOM elements
~~When a plugin is registered, it is put into an iframe and all its content is hidden from the application. In order to show UI elements within the application, the plugin must register new UI elements through the plugin instance that is injected into the plugin. When a UI element is able to accept custom DOM elements, those elements are copied as text and placed into the UI element. With this current method, the events bound to the DOM element don't come with it. This is a concern and needs to be addressed. A possible work around is mirroring the hidden elements in the plugin, inside of the application.~~

DOM elements are now moved from the iframe DOM to the actual application DOM.