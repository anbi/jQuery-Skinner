/************************************************************************
*************************************************************************
@Name :		skinner - jQuery Plugin
@Revison :  1.3.0
@Date :		17/10/2011
@Author:	Andrea (anbi) Bianchin - http://www.andreabianchin.it#projects - http://twitter.com/#!/anbi
@License : 	Open Source - MIT License : http://www.opensource.org/licenses/mit-license.php
*************************************************************************
@Usage : 	allowed parameters
			# type :		- left > float left (default)
							- right > float right
							- block > display block
			# width : 		- auto > (default)
							- pixel > e.g. 100px
							- percent > e.g. 80%
			# textwrap :	 - false > text doesn't wrap on dropdown (default)
							- true > text wrap on dropdown
			# maxitem : 	- 2,3,4,5... "n" > number of item to show (default = 6)
							- false > show all item without scollbar
			# minWidth		# width : 	- auto > (default)		number of the min-width of the text
							- pixel > e.g. 100px
							- percent > e.g. 80%
			# itemMinWidth	-	"n" > number of the min-width of the dropdown
							- pixel > e.g. 100px
							- percent > e.g. 80%
			# mode			-	'select'(default) > layout as select;
							-	'pureText' > layout as pure text;
			# placeHolder	-	'please select'(default)	the text to show when there's no value
			# valueNullable	-	'false'(default)	the select must be selected
													, the first option is the default option.
							-	'true'				the first option is the empty option,
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
*************************************************************************/
!function(e){e.fn.skinner=function(t){var l={type:"block",minWidth:"",width:"auto",textwrap:!1,maxitem:"6",itemMinWidth:"",mode:"select",placeHolder:"please select",valueNullable:"false",dropdownList:{hideMode:"auto"}};t&&e.extend(l,t);var s=this,n={_li_click:function(e){var t=this,i=t.parent("ul");i.hide();var s=i.prev(".select-skinned-text").children(".select-skinned-cont").html(),n=i.next("select"),d=n.find("option");s="&nbsp;"===s?"":s,"multiple"!==l.multiple&&(s!==d.eq(e).text()?(d.removeAttr("selected"),d.eq(e).attr("selected","selected"),i.prev(".select-skinned-text").html('<div class="select-skinned-cont">'+d.eq(e).text()+"</div>"),t.addClass("select-skinned-li-selected")):"true"===l.valueNullable&&(d.eq(e).removeAttr("selected"),d.eq(0).attr("selected","selected"),i.prev(".select-skinned-text").html('<div class="select-skinned-cont">'+d.eq(0).html()||(l.placeHolder||"&nbsp;")+"</div>"),t.removeClass("select-skinned-li-selected"))),i.next("select").change()},_init_li:function(t){var i=e(t).prev("ul");e(t).each(function(){var t=e(this);t.prev("ul").html(""),t.children("option").each(function(s,d){var c=e(d),o=""===c.html()?"&nbsp;":c.html();if(0===s){if("true"===l.valueNullable)return;0===t.children("option[selected]").size()&&c.attr("selected","selected")}var r=e("<li>"+o+"</li>").click(function(){n._li_click.call(r,s,t)});void 0!==c.attr("selected")&&r.addClass("select-skinned-li-selected"),i.append(r)})})},_apply_max_item:function(){var t=e(this);if(l.maxitem){var s=0;for(i=0;i<l.maxitem;i++)s+=t.children("li:eq("+i+")").outerHeight();console.log(s),t.css({"overflow-y":"scroll",height:s+"px"})}}};return n=e.extend(n,{selectskinned:function(t){e(t).each(function(){var i=e(this);i.wrap('<div class="select-skinned" />');var s=e("<ul></ul>").hide();i.parent().on("mouseleave",function(){("auto"===l.dropdownList.hideMode||"leave"===l.dropdownList.hideMode)&&s.hide()}),"true"===l.valueNullable?0===i.children("option[selected]").size()&&i.children("option").eq(0).attr("selected","selected"):0===i.children("option[selected]").size()&&i.children("option").eq(0).attr("selected","selected");var d=i.children("option[selected]");testoSel=d.size()<=0?l.placeHolder:""===d.text()?"&nbsp;":d.text(),selectedItem=e('<div class="select-skinned-text"><div class="select-skinned-cont">'+testoSel+"</div></div>"),selectedItem.click(function(){var t=e(this),i=t.next("ul");pos=e(this).parent(".select-skinned").position(),bodyScroll=e("body").scrollTop(),i.css(e(window).height()<=pos.top+i.outerHeight()+15-bodyScroll?{top:"auto",bottom:"0"}:{top:e(this).prev(".select-skinned-text").children(".select-skinned-cont").height(),bottom:"auto"}),i.css(e(window).width()<=pos.left+i.outerWidth()?{left:"auto",right:"0"}:{left:"0",right:"auto"}),i.is(":visible")?i.hide():i.show(),n._apply_max_item.call(t.next("ul").get(0))}),i.before(selectedItem),i.before(s),i.change(function(){n._init_li(t),n.addStyle()}),i.hide()}),n._init_li(t),n.addStyle()},resetSelect:function(t){0!==e(t).prev("ul").size()&&e(t).prev("ul").prev(".select-skinned-text").html('<div class="select-skinned-cont">'+e(t).find("option").eq(0).text()+"</div>")},addStyle:function(){var t=e(s),i=t.parent(".select-skinned");if("block"!=l.type&&i.css({"float":l.type}),"auto"===l.width&&(l.width=t.width()),i.css("min-width",l.minWidth||l.width).width(l.width).children("ul").css("min-width",l.itemMinWidth||l.width),l.textwrap&&i.children("ul").children("li").css({"white-space":"normal"}),e(".select-skinned > ul > li").hover(function(){e(this).addClass("hover")},function(){e(this).removeClass("hover")}),"puretext"===l.mode.toLowerCase()){var n="select-skinned-pure-text";i.children(".select-skinned-text").addClass(n).hover(function(){e(this).removeClass(n)},function(){e(this).addClass(n)})}}}),n.selectskinned(s),this}}(jQuery);
//# sourceMappingURL=./jquery-skinner-min.map