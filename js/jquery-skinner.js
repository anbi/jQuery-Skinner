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

(function($) {
		$.fn.skinner = function(opt) {
			var cfg = {
				'type': 'block',
				'minWidth': '',
				'width': 'auto',
				'textwrap': false,
				'maxitem': '6',
				'itemMinWidth': '',
				'mode': 'select',
				'placeHolder': 'please select',
				'valueNullable': false,
				'dropdownList': {
					'hideMode': 'auto'
				}
			};
			if (undefined !== opt) {
				$.extend(cfg, opt);
			}
			var element = this;
			var skin = {
				$: {
					select: null, // select
					container: null, // select-skinned
					controller: null, // select-skinned-text
					acceptor: null // UL
				}
			};
			skin = $.extend(skin, {
					_li_click: function(i /*the index of the option of select*/ , e) {
						var $this = this,
							itemUL = skin.$.acceptor;
						itemUL.hide();
						var selectSkinnedContHTML = (skin.$.controller).children('.select-skinned-cont').html(),
							$select = skin.$.select,
							$selectOptions = $select.find('option'),
							$selectOptionI = $selectOptions.eq(i),
							$selectOption0 = $selectOptions.eq(0);
						selectSkinnedContHTML = (selectSkinnedContHTML === '&nbsp;' ? '' : selectSkinnedContHTML);
						if ('multiple' !== cfg.multiple) {
							if (selectSkinnedContHTML !== $selectOptionI.text()) {
								$selectOptions.removeAttr('selected');
								$selectOptionI.attr('selected', 'selected');
								(skin.$.controller).html('<div class="select-skinned-cont">' + $selectOptionI.text() + '</div>');
								$this.addClass('select-skinned-li-selected');
								itemUL.nextAll('select:first').change();
							} else {
								if (true === cfg.valueNullable) {
									$selectOptionI.removeAttr('selected');
									$selectOption0.attr('selected', 'selected'); // the first option is the default value, as select thought;
									(skin.$.controller).html('<div class="select-skinned-cont">' + $selectOption0.html() || (cfg.placeHolder || '&nbsp;') + '</div>');
									$this.removeClass('select-skinned-li-selected');
									itemUL.nextAll('select:first').change();
								} else {
									itemUL.nextAll('select:first').trigger('unchange');
								}
							}
						} else { // TO DO support multiple select
							/*
							 * for multiple select
								if(selectSkinnedContHTML !== $selectOptions.eq(i).text()){// select
									// $selectOptions.removeAttr('selected');
									$selectOptions.eq(i).attr('selected','selected');
									itemUL.prev('.select-skinned-text').html('<div class="select-skinned-cont">'+$selectOptions.eq(i).text()+'</div>');
									$this.addClass('select-skinned-li-selected');
								}else{// select again
									$selectOptions.eq(i).removeAttr('selected');
									if(0 === $select.find('option[selected]').size()){// the first option is the default value, as select thought;
										$selectOption0.attr('selected','selected');
									}
									itemUL.prev('.select-skinned-text').html('<div class="select-skinned-cont">'+(cfg.placeHolder||'&nbsp;')+'</div>');
									$this.removeClass('select-skinned-li-selected');
								}
							*/
						}
					},
					_init_li: function(elem) {
						var $elem = $(elem),
							$UL = (skin.$.acceptor);
						$UL.html('');
						$elem.children('option').each(function(i, el) {
								var $el = $(el),
									myText = ($el.html() === '') ? '&nbsp;' : $el.html();
								if (0 === i) {
									if (true === cfg.valueNullable) { // hide the first option;
										return;
									} else {
										if (0 === $elem.children('option[selected]').size()) { // select the first option
											$el.attr('selected', 'selected');
										} else {}
									}
								} else {}
								var itemLI = $('<li>' + myText + '</li>').click(function() {
										skin._li_click.call(itemLI, i, $elem);
									});
								if (undefined !== $el.attr('selected')) { // add selected style to li
									itemLI.addClass('select-skinned-li-selected');
								} else {}
								$UL.append(itemLI);
							});
					},
					_apply_max_item: function() {
						var $UL = $(this),
							$LI = $UL.children('li'),
							maxitem = cfg.maxitem;
						if (undefined !== maxitem && false !== maxitem) { // apply the max item to show;
							var hTotItem = 0,
								i = maxitem;
							while (i-- > 0) {
								hTotItem += $LI.eq(i).outerHeight();
							}
							maxitem = cfg.maxitem;
							$UL.css({
									'overflow-y': 'scroll',
									'height': hTotItem + 'px'
								});
						}
					}
				});
			skin = $.extend(skin, {
					selectskinned: function(element) {
						var $element = $(element);
						skin.$.select = $element;
						$element.wrap('<div class="select-skinned" />');
						skin.$.container = $element.parent();
						var childrennn = $('<ul style="display:none;"></ul>');
						skin.$.acceptor = childrennn;
						$element.parent().on('mouseleave', function() {
								if ('auto' === cfg.dropdownList.hideMode || 'leave' === cfg.dropdownList.hideMode) {
									childrennn.hide();
								}
							});
						// will init the li in skin._init_li
						if (true === cfg.valueNullable) {
							if (0 === $element.children('option[selected]').size()) { // select the first option
								$element.children('option').eq(0).attr('selected', 'selected');
							} else {}
						} else {
							if (0 === $element.children('option[selected]').size()) { // select the first option
								$element.children('option').eq(0).attr('selected', 'selected');
							} else {}
						}
						var selectedOptions = $element.children('option[selected]'), // 'option:selected' will always has selected content.(default is the first item.)
							testoSel = (selectedOptions.size() <= 0 ? cfg.placeHolder : (selectedOptions.text() === '' ? '&nbsp;' : selectedOptions.text())),
							selectedItem = $('<div class="select-skinned-text"><div class="select-skinned-cont">' + testoSel + '</div></div>');
						skin.$.controller = selectedItem;
						selectedItem.click(function() {
								var $this = $(this),
									elemUL = $this.nextAll('ul:first'),
									pos = skin.$.container.position(),
									parentScrollable = skin.$.container.parent(':scrollable'),
									parentTop = 0,
									parentLeft = 0;
								if (0 === parentScrollable.size()) {
									parentScrollable = $(window);
								} else {
									parentTop = parentScrollable.position().top;
									parentLeft = parentScrollable.position().left;
								}
								var parentScrollTop = parentScrollable.scrollTop();
								if (parentScrollable.height() + parentTop <= (pos.top + elemUL.outerHeight() + (15) - parentScrollTop)) {
									elemUL.css({
											'top': 'auto',
											'bottom': '0'
										});
								} else {
									elemUL.css({
											'top': $this.prev('.select-skinned-text').children('.select-skinned-cont').height(),
											'bottom': 'auto'
										});
								}
								if (parentScrollable.width() + parentLeft <= (pos.left + elemUL.outerWidth())) {
									elemUL.css({
											'left': 'auto',
											'right': '0'
										});
								} else {
									elemUL.css({
											'left': '0',
											'right': 'auto'
										});
								}
								if (elemUL.is(':visible')) {
									elemUL.hide();
								} else {
									elemUL.show();
								}
								skin._apply_max_item.call(elemUL.get(0));
							});
						$element.before(selectedItem);
						$element.before(childrennn);
						$element.change(function() {
								skin._init_li(element);
								skin.addStyle();
							});
						$element.hide();
						skin._init_li(element);
						skin.addStyle();
					},
					resetSelect: function(e) {
						if ($(e).prev('ul').size() !== 0) { // use '!==' to compare with '0' is recommended.
							$(e).prev('ul').prev('.select-skinned-text').html('<div class="select-skinned-cont">' + $(e).find('option').eq(0).text() + '</div>');
						}
					},
					addStyle: function() {
						var $element = $(element),
							$selectSkinned = skin.$.container,
							$LIs = $selectSkinned.children('ul').children('li');
						if ('auto' === cfg.width) { // set width accroding to the width of the select element
							cfg.width = $element.width();
						} else {}
						$selectSkinned.css("min-width", (cfg.minWidth || cfg.width)).width(cfg.width).children('ul').css("min-width", (cfg.itemMinWidth || cfg.width)); //.width(cfg.width);
						if (true === cfg.textwrap) {
							$LIs.css({
									'white-space': 'normal'
								});
						}
						$LIs.hover(function() {
								$(this).addClass('hover');
							}, function() {
								$(this).removeClass('hover');
							});
						if ('puretext' === cfg.mode.toLowerCase()) {
							var spt = "select-skinned-pure-text";
							(skin.$.controller).addClass(spt).hover(function() {
									$(this).removeClass(spt);
								}, function() {
									$(this).addClass(spt);
								});
						}
						if ('block' !== cfg.type) {
							$selectSkinned.css({
									'float': cfg.type
								});
						}
					}
				});
			skin.selectskinned(element);
			return this;
		};
		// e.g.
		//	(function($) {
		//		$('.rightSelect').each(function(){
		//			var $this = $(this);
		//			$this.skinner({'type':$this.css("float"),'maxitem':'20'
		//				,'minWidth':($this.css('min-width')||"40px")
		//				,'mode': ($this.hasClass('pureText')?'pureText':'select')
		//				,'valueNullable': ($this.hasClass('valueNullable')?true:false)
		//			});
		//		});
		//		$('.leftSelect').each(function(){
		//			var $this = $(this);
		//			$this.skinner({'type':$this.css("float"),'maxitem':'20'
		//				,'minWidth':($this.css('min-width')||"40px")
		//				,'mode': ($this.hasClass('pureText')?'pureText':'select')
		//				,'valueNullable': ($this.hasClass('valueNullable')?true:false)
		//			});
		//		});
		//	})(jQuery);
	})(jQuery);
/* vim: set si sts=4 ts=4 sw=4 fdm=indent :*/
