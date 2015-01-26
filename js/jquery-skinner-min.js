/************************************************************************
*************************************************************************
@Name :		skinner - jQuery Plugin
@Revison :  1.3.1
@Date :		17/10/2011
@Author:	Andrea (anbi) Bianchin - http://www.andreabianchin.it#projects - http://twitter.com/#!/anbi
@License :	Open Source - MIT License : http://www.opensource.org/licenses/mit-license.php
*************************************************************************
@Usage :	allowed parameters
			# type :		- left > float left (default)
							- right > float right
							- block > display block; float:none;
			# width :	- auto > (default)
							- pixel > e.g. 100px
							- percent > e.g. 80%
			# textwrap :	- false > text doesn't wrap on dropdown (default)
							- true > text wrap on dropdown
			# maxitem :		- 2,3,4,5... "n" > number of item to show (default = 6)
							- false > show all item without scollbar
			# minWidth		# width :	- auto > (default)		number of the min-width of the text
							- pixel > e.g. 100px
							- percent > e.g. 80%
			# itemMinWidth	-	"n" > number of the min-width of the dropdown
							- pixel > e.g. 100px
							- percent > e.g. 80%
			# mode			-	'select'(default) > layout as select;
							-	'pureText' > layout as pure text;
			# placeHolder	-	'please select'(default)	the text to show when there's no value
			# valueNullable	-	false(default)	the select must be selected
													, the first option is the default option.
							-	true				the first option is the empty option,
													and it won't be show in the list.
**************************************************************************
@modifiedDate : 15/01/2015
@modifiedBy : Will.V.King
@modification : add supports for setting the min-width attribute of the text of the select and its dropdown-list; add a ' pure text ' visual mode.
**************************************************************************
@modifiedData : 16/01/2015
@modifiedBy : Will.V.King
@modification : added placeHolder;
				added valueNullable;
				Fixed Variable Scope Bug;
				Improved the function usage (_li_click,_apply_max_item is added
					, checkSelect has been changed to _init_li);
				added dorpdownlist auto hide logic;
************************************************************************
@modifiedData : 16/01/2015
@modifiedBy : Will.V.King
@modification : changed the value of valueNullable from string to boolean.
*************************************************************************/
!function(e){e.fn.skinner=function(t){var i={type:"block",minWidth:"",width:"auto",textwrap:!1,maxitem:"6",itemMinWidth:"",mode:"select",placeHolder:"please select",valueNullable:!1,dropdownList:{hideMode:"auto"}};void 0!==t&&e.extend(i,t);var l=this,n={$:{select:null,container:null,controller:null,acceptor:null}};return n=e.extend(n,{_li_click:function(e){var t=this,l=n.$.acceptor;l.hide();var s=n.$.controller.children(".select-skinned-cont").html(),c=n.$.select,o=c.find("option"),d=o.eq(e),r=o.eq(0);s="&nbsp;"===s?"":s,"multiple"!==i.multiple&&(s!==d.text()?(o.removeAttr("selected"),d.attr("selected","selected"),n.$.controller.html('<div class="select-skinned-cont">'+d.text()+"</div>"),t.addClass("select-skinned-li-selected")):!0===i.valueNullable&&(d.removeAttr("selected"),r.attr("selected","selected"),n.$.controller.html('<div class="select-skinned-cont">'+r.html()||(i.placeHolder||"&nbsp;")+"</div>"),t.removeClass("select-skinned-li-selected"))),l.next("select").change()},_init_li:function(t){var l=e(t),s=n.$.acceptor;s.html(""),l.children("option").each(function(t,c){var o=e(c),d=""===o.html()?"&nbsp;":o.html();if(0===t){if(!0===i.valueNullable)return;0===l.children("option[selected]").size()&&o.attr("selected","selected")}var r=e("<li>"+d+"</li>").click(function(){n._li_click.call(r,t,l)});void 0!==o.attr("selected")&&r.addClass("select-skinned-li-selected"),s.append(r)})},_apply_max_item:function(){var t=e(this),l=t.children("li"),n=i.maxitem;if(void 0!==n&&!1!==n){for(var s=0,c=n;c-->0;)s+=l.eq(c).outerHeight();n=i.maxitem,t.css({"overflow-y":"scroll",height:s+"px"})}}}),n=e.extend(n,{selectskinned:function(t){var l=e(t);n.$.select=l,l.wrap('<div class="select-skinned" />'),n.$.container=l.parent();var s=e('<ul style="display:none;"></ul>');n.$.acceptor=s,l.parent().on("mouseleave",function(){("auto"===i.dropdownList.hideMode||"leave"===i.dropdownList.hideMode)&&s.hide()}),!0===i.valueNullable?0===l.children("option[selected]").size()&&l.children("option").eq(0).attr("selected","selected"):0===l.children("option[selected]").size()&&l.children("option").eq(0).attr("selected","selected");var c=l.children("option[selected]"),o=c.size()<=0?i.placeHolder:""===c.text()?"&nbsp;":c.text(),d=e('<div class="select-skinned-text"><div class="select-skinned-cont">'+o+"</div></div>");n.$.controller=d,d.click(function(){var t=e(this),i=t.next("ul"),l=n.$.container.position(),s=n.$.container.parent(":scrollable"),c=0,o=0;0===s.size()?s=e(window):(c=s.position().top,o=s.position().left);var d=s.scrollTop();i.css(s.height()+c<=l.top+i.outerHeight()+15-d?{top:"auto",bottom:"0"}:{top:t.prev(".select-skinned-text").children(".select-skinned-cont").height(),bottom:"auto"}),i.css(s.width()+o<=l.left+i.outerWidth()?{left:"auto",right:"0"}:{left:"0",right:"auto"}),i.is(":visible")?i.hide():i.show(),n._apply_max_item.call(i.get(0))}),l.before(d),l.before(s),l.change(function(){n._init_li(t),n.addStyle()}),l.hide(),n._init_li(t),n.addStyle()},resetSelect:function(t){0!==e(t).prev("ul").size()&&e(t).prev("ul").prev(".select-skinned-text").html('<div class="select-skinned-cont">'+e(t).find("option").eq(0).text()+"</div>")},addStyle:function(){var t=e(l),s=n.$.container,c=s.children("ul").children("li");if("auto"===i.width&&(i.width=t.width()),s.css("min-width",i.minWidth||i.width).width(i.width).children("ul").css("min-width",i.itemMinWidth||i.width),!0===i.textwrap&&c.css({"white-space":"normal"}),c.hover(function(){e(this).addClass("hover")},function(){e(this).removeClass("hover")}),"puretext"===i.mode.toLowerCase()){var o="select-skinned-pure-text";n.$.controller.addClass(o).hover(function(){e(this).removeClass(o)},function(){e(this).addClass(o)})}"block"!==i.type&&s.css({"float":i.type})}}),n.selectskinned(l),this}}(jQuery);
//# sourceMappingURL=./jquery-skinner-min.map