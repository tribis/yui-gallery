YUI.add("gallery-sm-menu",function(e,t){var n=e.config.doc,r=e.ClassNameManager.getClassName,i="itemClick",s=e.Base.create("menu",e.Menu.Base,[e.View],{classNames:{canHaveChildren:r("menu-can-have-children"),children:r("menu-children"),disabled:r("menu-disabled"),hasChildren:r("menu-has-children"),heading:r("menu-heading"),hidden:r("menu-hidden"),horizontal:r("menu-horizontal"),item:r("menu-item"),label:r("menu-label"),menu:r("menu"),noTouch:r("menu-notouch"),open:r("menu-open"),selected:r("menu-selected"),separator:r("menu-separator"),touch:r("menu-touch"),vertical:r("menu-vertical")},rendered:!1,sourceSelectors:{item:"> li",label:"> a, > span",subtree:"> ul, > ol"},initializer:function(t){this._openMenus={},this._published={},this._timeouts={},t&&t.sourceNode&&(t.nodes=(t.nodes||[]).concat(this.parseHTML(t.sourceNode)),e.one(t.sourceNode).remove(!0)),this._attachMenuEvents()},destructor:function(){this._detachMenuEvents(),delete this._openMenus,delete this._published,e.Object.each(this._timeouts,function(e){clearTimeout(e)},this),delete this._timeouts},getHTMLNode:function(e){return e._htmlNode||(e._htmlNode=this.get("container").one("#"+e.id)),e._htmlNode},hide:function(){return this.set("visible",!1),this},parseHTML:function(t){t=e.one(t);var r=this.classNames,i=[],s=this.sourceSelectors,o=this;return t.all(s.item).each(function(t){var u={},a=t._node,f=t.one(s.label),l=t.one(s.subtree);t.hasClass(r.heading)?u.type="heading":t.hasClass(r.separator)&&(u.type="separator"),t.hasClass(r.disabled)&&(u.state||(u.state={}),u.state.disabled=!0),t.hasClass(r.hidden)&&(u.state||(u.state={}),u.state.hidden=!0);if(f){var c=f.getAttribute("href");u.label=f.getHTML(),c&&c!=="#"&&(u.url=c)}else{var h;for(var p=0,d=a.childNodes.length;p<d;p++){h=a.childNodes[p];if(h.nodeType===n.TEXT_NODE){u.label=e.Escape.html(h.nodeValue);break}}}l&&(u.children=o.parseHTML(l)),i.push(u)}),i},render:function(){var t=this.classNames,n=this.get("container");return n.addClass(t.menu),n.addClass(t[this.get("orientation")]),"ontouchstart"in e.config.win?n.addClass(t.touch):n.addClass(t.noTouch),this._childrenNode=this.renderChildren(this.rootNode,{container:n}),n.inDoc()||e.one("body").append(n),this.rendered=!0,this},renderChildren:function(t,n){n||(n={});var r=n.container,i=r&&r.one("."+this.classNames.children);i||(i=e.Node.create(s.Templates.children({classNames:this.classNames,menu:this,item:t}))),t.isRoot()&&(i.set("tabIndex",0),i.set("role","menu")),t.hasChildren()&&i.set("aria-expanded",t.isOpen());for(var o=0,u=t.children.length;o<u;o++)this.renderNode(t.children[o],{container:i,renderChildren:!0});return r&&r.append(i),i},renderNode:function(t,n){n||(n={});var r=this.classNames,i=t._htmlNode,o=t.isHidden();i||(i=t._htmlNode=e.Node.create(s.Templates.item({classNames:r,item:t,menu:this}))),i.set("aria-hidden",o),i.toggleClass(r.hidden,o);switch(t.type){case"separator":i.set("role","separator");break;case"item":case"heading":var u=i.one("."+r.label),a=u.get("id");u.setHTML(t.label),a||(a=e.guid(),u.set("id",a)),i.set("aria-labelledby",a),t.type==="heading"?i.set("role","heading"):(i.set("role","menuitem"),i.toggleClass(r.disabled,t.isDisabled()),t.canHaveChildren&&(i.addClass(r.canHaveChildren),i.toggleClass(r.open,t.isOpen()),t.hasChildren()&&(i.addClass(r.hasChildren),n.renderChildren&&this.renderChildren(t,{container:i}))))}return n.container&&n.container.append(i),i},reposition:function(t){var n=this.get("container"),r,i;return e.Lang.isArray(t)?r={bottom:t[1],left:t[0],right:t[0],top:t[1]}:t._node?r=t.get("region"):r=t,i=this._getSortedAnchorRegions(this.get("alignments"),n.get("region"),r)[0].region,n.setXY([i.left,i.top]),this},show:function(e){return e&&e.anchorPoint&&this.reposition(e.anchorPoint),this.set("visible",!0),this},toggle:function(e){return this[this.get("visible")?"hide":"show"](e)},_attachMenuEvents:function(){this._menuEvents||(this._menuEvents=[]);var t=this.classNames,n=this.get("container");this._menuEvents.push(this.after({add:this._afterAdd,clear:this._afterClear,close:this._afterClose,disable:this._afterDisable,enable:this._afterEnable,hide:this._afterHide,open:this._afterOpen,orientationChange:this._afterOrientationChange,remove:this._afterRemove,show:this._afterShow,visibleChange:this._afterVisibleChange}),n.on("hover",this._onMenuMouseEnter,this._onMenuMouseLeave,this),n.delegate("click",this._onItemClick,"."+t.item+">."+t.label,this),n.delegate("hover",this._onItemMouseEnter,this._onItemMouseLeave,"."+t.canHaveChildren,this),e.one("doc").after("mousedown",this._afterDocMouseDown,this))},_detachMenuEvents:function(){(new e.EventHandle(this._menuEvents)).detach()},_getAncestorTestFn:function(){var e=this.get("container");return function(t){return t===e}},_getAnchorRegion:function(e,t,n){var r={};return e.replace(/^([bt])([lr])-([bt])([lr])/i,function(e,t,i,s,o){var u={b:"bottom",l:"left",r:"right",t:"top"};r[u[t]]=n[u[s]],r[u[i]]=n[u[o]]}),"bottom"in r||(r.bottom=r.top+t.height),"left"in r||(r.left=r.right-t.width),"right"in r||(r.right=r.left+t.width),"top"in r||(r.top=r.bottom-t.height),r},_getSortedAnchorRegions:function(t,n,r,i){i||(i=e.DOM.viewportRegion());var s=[],o,u,a,f;for(o=0,u=t.length;o<u;o++)a=t[o],a.point&&(a=a.point),f=this._getAnchorRegion(a,n,r),s.push({point:a,region:f,score:this._inRegion(f,i)});return s.sort(function(e,t){return e.score===t.score?0:e.score===!0?-1:t.score===!0?1:t.score-e.score}),s},_hideMenu:function(e,t){t||(t=this.getHTMLNode(e));var n=t.one("."+this.classNames.children);n.setXY([-1e4,-1e4]),delete e.data.menuAnchor},_inRegion:function(e,t){return e.bottom<=t.bottom&&e.left>=t.left&&e.right<=t.right&&e.top>=t.top?!0:Math.min(t.bottom-e.bottom,0)+Math.min(e.left-t.left,0)+Math.min(t.right-e.right,0)+Math.min(e.top-t.top,0)},_positionMenu:function(e,t){t||(t=this.getHTMLNode(e));var n=t.one("."+this.classNames.children),r=this.get("orientation"),i,s;e.parent.isRoot()&&r==="horizontal"?i=this.get("alignments"):i=e.parent&&e.parent.data.menuAnchors||
this.get("subMenuAlignments"),s=this._getSortedAnchorRegions(i,n.get("region"),t.get("region"));if(r==="vertical"||!e.parent.isRoot())e.data.menuAnchors=s;var o=s[0].region;n.setXY([o.left,o.top])},_afterAdd:function(e){if(!this.rendered)return;var t=e.parent,n,r;if(t===this.rootNode)n=this._childrenNode;else{r=this.getHTMLNode(t),n=r&&r.one("."+this.classNames.children);if(!n){r||(r=this.renderNode(t)),this.renderChildren(t,{container:r});return}}n.insert(this.renderNode(e.node,{renderChildren:!0}),e.index)},_afterClear:function(){this._openMenus={};if(!this.rendered)return;delete this._childrenNode,this.rendered=!1,this.get("container").empty(),this.render()},_afterDocMouseDown:function(e){if(!this.get("visible"))return;e.target.ancestor(this._getAncestorTestFn(),!0)||(this.closeSubMenus(),this.get("hideOnOutsideClick")&&this.hide())},_afterClose:function(e){var t=e.node,n=this.getHTMLNode(t);for(var r=0,i=t.children.length;r<i;r++)t.children[r].close();t.close(),delete this._openMenus[t.id],n&&(this._hideMenu(t,n),n.removeClass(this.classNames.open))},_afterDisable:function(e){var t=this.getHTMLNode(e.item);t&&t.addClass(this.classNames.disabled)},_afterEnable:function(e){var t=this.getHTMLNode(e.item);t&&t.removeClass(this.classNames.disabled)},_afterHide:function(e){var t=this.getHTMLNode(e.item);t&&(t.addClass(this.classNames.hidden),t.set("aria-hidden",!0))},_afterOpen:function(e){var t=e.node,n=this.getHTMLNode(t),r=t.parent,i;if(r)if(r.isOpen())for(var s=0,o=r.children.length;s<o;s++)i=r.children[s],i!==t&&i.close();else r.open();this._openMenus[t.id]=t,n&&(this._positionMenu(t,n),n.addClass(this.classNames.open))},_afterOrientationChange:function(e){this.rendered&&this.get("container").removeClass(this.classNames.horizontal).removeClass(this.classNames.vertical).addClass(this.classNames[e.newVal])},_afterRemove:function(e){delete this._openMenus[e.node.id];if(!this.rendered)return;var t=this.getHTMLNode(e.node);t&&(t.remove(!0),delete e.node._htmlNode)},_afterShow:function(e){var t=this.getHTMLNode(e.item);t&&(t.removeClass(this.classNames.hidden),t.set("aria-hidden",!1))},_afterVisibleChange:function(e){this.get("container").toggleClass(this.classNames.open,e.newVal)},_onItemClick:function(e){var t=this.getNodeById(e.currentTarget.getData("item-id")),n=i+"#"+t.id,r=t.isDisabled()||t.isHidden();(r||t.url==="#")&&e.preventDefault();if(r)return;this._published[n]||(this._published[n]=this.publish(n,{defaultFn:this._defSpecificItemClickFn})),this._published[i]||(this._published[i]=this.publish(i,{defaultFn:this._defItemClickFn})),this.fire(n,{originEvent:e,item:t})},_onItemMouseEnter:function(e){var t=this.getNodeById(e.currentTarget.get("id"));clearTimeout(this._timeouts.item);if(t.isOpen()||t.isDisabled())return;this._timeouts.item=setTimeout(function(){t.open()},200)},_onItemMouseLeave:function(e){var t=this.getNodeById(e.currentTarget.get("id"));clearTimeout(this._timeouts.item);if(!t.isOpen())return;this._timeouts.item=setTimeout(function(){t.close()},300)},_onMenuMouseEnter:function(){clearTimeout(this._timeouts.menu)},_onMenuMouseLeave:function(){var e=this;clearTimeout(this._timeouts.menu),this._timeouts.menu=setTimeout(function(){e.closeSubMenus(),e.get("hideOnMouseLeave")&&e.hide()},500)},_defItemClickFn:function(e){var t=e.item;t.canHaveChildren?(clearTimeout(this._timeouts.item),clearTimeout(this._timeouts.menu),e.item.toggle()):this.get("hideOnClick")&&(this.closeSubMenus(),this.hide())},_defSpecificItemClickFn:function(e){this.fire(i,{originEvent:e.originEvent,item:e.item})}},{ATTRS:{alignments:{valueFn:function(){return["tl-bl","tr-br","bl-tl","br-tr"]}},hideOnClick:{value:!0},hideOnMouseLeave:{value:!1},hideOnOutsideClick:{value:!0},orientation:{value:"vertical"},subMenuAlignments:{valueFn:function(){return["tl-tr","bl-br","tr-tl","br-bl"]}},visible:{value:!1}}});e.Menu=e.mix(s,e.Menu)},"@VERSION@",{requires:["classnamemanager","escape","event-hover","gallery-sm-menu-base","gallery-sm-menu-templates","node-screen","view"],skinnable:!0});
