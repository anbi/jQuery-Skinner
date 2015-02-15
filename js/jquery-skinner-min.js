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
!function(e){e.fn.skinner=function(t){var l={type:"block",minWidth:"",width:"auto",textwrap:!1,maxitem:"6",itemMinWidth:"",mode:"select",placeHolder:"please select",valueNullable:!1,dropdownList:{hideMode:"auto"}};void 0!==t&&e.extend(l,t);var i=this,n={$:{select:null,container:null,controller:null,acceptor:null}};return n=e.extend(n,{_li_click:function(e){var t=this,i=n.$.acceptor;i.hide();var s=n.$.controller.children(".select-skinned-cont").html(),c=n.$.select,o=c.find("option"),d=o.eq(e),r=o.eq(0);s="&nbsp;"===s?"":s,"multiple"!==l.multiple&&(s!==d.text()?(o.removeAttr("selected"),d.attr("selected","selected"),n.$.controller.html('<div class="select-skinned-cont">'+d.text()+"</div>"),t.addClass("select-skinned-li-selected"),i.next("select").change()):!0===l.valueNullable&&(d.removeAttr("selected"),r.attr("selected","selected"),n.$.controller.html('<div class="select-skinned-cont">'+r.html()||(l.placeHolder||"&nbsp;")+"</div>"),t.removeClass("select-skinned-li-selected"),i.next("select").change()))},_init_li:function(t){var i=e(t),s=n.$.acceptor;s.html(""),i.children("option").each(function(t,c){var o=e(c),d=""===o.html()?"&nbsp;":o.html();if(0===t){if(!0===l.valueNullable)return;0===i.children("option[selected]").size()&&o.attr("selected","selected")}var r=e("<li>"+d+"</li>").click(function(){n._li_click.call(r,t,i)});void 0!==o.attr("selected")&&r.addClass("select-skinned-li-selected"),s.append(r)})},_apply_max_item:function(){var t=e(this),i=t.children("li"),n=l.maxitem;if(void 0!==n&&!1!==n){for(var s=0,c=n;c-->0;)s+=i.eq(c).outerHeight();n=l.maxitem,t.css({"overflow-y":"scroll",height:s+"px"})}}}),n=e.extend(n,{selectskinned:function(t){var i=e(t);n.$.select=i,i.wrap('<div class="select-skinned" />'),n.$.container=i.parent();var s=e('<ul style="display:none;"></ul>');n.$.acceptor=s,i.parent().on("mouseleave",function(){("auto"===l.dropdownList.hideMode||"leave"===l.dropdownList.hideMode)&&s.hide()}),!0===l.valueNullable?0===i.children("option[selected]").size()&&i.children("option").eq(0).attr("selected","selected"):0===i.children("option[selected]").size()&&i.children("option").eq(0).attr("selected","selected");var c=i.children("option[selected]"),o=c.size()<=0?l.placeHolder:""===c.text()?"&nbsp;":c.text(),d=e('<div class="select-skinned-text"><div class="select-skinned-cont">'+o+"</div></div>");n.$.controller=d,d.click(function(){var t=e(this),l=t.next("ul"),i=n.$.container.position(),s=n.$.container.parent(":scrollable"),c=0,o=0;0===s.size()?s=e(window):(c=s.position().top,o=s.position().left);var d=s.scrollTop();l.css(s.height()+c<=i.top+l.outerHeight()+15-d?{top:"auto",bottom:"0"}:{top:t.prev(".select-skinned-text").children(".select-skinned-cont").height(),bottom:"auto"}),l.css(s.width()+o<=i.left+l.outerWidth()?{left:"auto",right:"0"}:{left:"0",right:"auto"}),l.is(":visible")?l.hide():l.show(),n._apply_max_item.call(l.get(0))}),i.before(d),i.before(s),i.change(function(){n._init_li(t),n.addStyle()}),i.hide(),n._init_li(t),n.addStyle()},resetSelect:function(t){0!==e(t).prev("ul").size()&&e(t).prev("ul").prev(".select-skinned-text").html('<div class="select-skinned-cont">'+e(t).find("option").eq(0).text()+"</div>")},addStyle:function(){var t=e(i),s=n.$.container,c=s.children("ul").children("li");if("auto"===l.width&&(l.width=t.width()),s.css("min-width",l.minWidth||l.width).width(l.width).children("ul").css("min-width",l.itemMinWidth||l.width),!0===l.textwrap&&c.css({"white-space":"normal"}),c.hover(function(){e(this).addClass("hover")},function(){e(this).removeClass("hover")}),"puretext"===l.mode.toLowerCase()){var o="select-skinned-pure-text";n.$.controller.addClass(o).hover(function(){e(this).removeClass(o)},function(){e(this).addClass(o)})}"block"!==l.type&&s.css({"float":l.type})}}),n.selectskinned(i),this}}(jQuery);
//# sourceMappingURL=./jquery-skinner-min.map