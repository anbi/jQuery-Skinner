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
				'valueNullable': 'false',
				'dropdownList': {
					'hideMode': 'auto'
				}
			};
			if (opt) {
				$.extend(cfg, opt);
			}
			var element = this;
			var skin = {
				_li_click: function(i /*the index of the option of select*/ , e) {
					var $this = this,
						itemUL = $this.parent('ul');
					itemUL.hide();
					var selectSkinnedContHTML = itemUL.prev('.select-skinned-text').children('.select-skinned-cont').html(),
						$select = itemUL.next('select'),
						$selectOptions = $select.find('option');
					selectSkinnedContHTML = (selectSkinnedContHTML === '&nbsp;' ? '' : selectSkinnedContHTML);
					if ('multiple' !== cfg.multiple) {
						if (selectSkinnedContHTML !== $selectOptions.eq(i).text()) {
							$selectOptions.removeAttr('selected');
							$selectOptions.eq(i).attr('selected', 'selected');
							itemUL.prev('.select-skinned-text').html('<div class="select-skinned-cont">' + $selectOptions.eq(i).text() + '</div>');
							$this.addClass('select-skinned-li-selected');
						} else { // TO DO support multiple select
							if ('true' === cfg.valueNullable) {
								$selectOptions.eq(i).removeAttr('selected');
								$selectOptions.eq(0).attr('selected', 'selected'); // the first option is the default value, as select thought;
								itemUL.prev('.select-skinned-text').html('<div class="select-skinned-cont">' + $selectOptions.eq(0).html() || (cfg.placeHolder || '&nbsp;') + '</div>');
								$this.removeClass('select-skinned-li-selected');
							} else {}
						}
					} else {
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
									$selectOptions.eq(0).attr('selected','selected');
								}
								itemUL.prev('.select-skinned-text').html('<div class="select-skinned-cont">'+(cfg.placeHolder||'&nbsp;')+'</div>');
								$this.removeClass('select-skinned-li-selected');
							}
						*/
					}
					itemUL.next('select').change();
				},
				_init_li: function(elem) {
					var $UL = $(elem).prev('ul');
					$(elem).each(function() {
							var $this = $(this);
							$this.prev('ul').html('');
							$this.children('option').each(function(i, el) {
									var $el = $(el),
										myText = ($el.html() === '') ? '&nbsp;' : $el.html();
									if (0 === i) {
										if ('true' === cfg.valueNullable) { // hide the first option;
											return;
										} else {
											if (0 === $this.children('option[selected]').size()) { // select the first option
												$el.attr('selected', 'selected');
											} else {}
										}
									} else {}
									var itemLI = $('<li>' + myText + '</li>').click(function() {
											skin._li_click.call(itemLI, i, $this);
										});
									if (undefined !== $el.attr('selected')) { // add selected style to li
										itemLI.addClass('select-skinned-li-selected');
									} else {}
									$UL.append(itemLI);
								});
						});
				},
				_apply_max_item: function() {
					var $UL = $(this);
					if (cfg.maxitem) { // apply the max item to show;
						var hTotItem = 0;
						for (i = 0; i < cfg.maxitem; i++) {
							hTotItem += $UL.children('li:eq(' + i + ')').outerHeight();
						}
						console.log(hTotItem);
						$UL.css({
								'overflow-y': 'scroll',
								'height': hTotItem + 'px'
							});
					}
				}
			};
			skin = $.extend(skin, {
					selectskinned: function(element) {
						$(element).each(function() {
								var sc = $(this);
								sc.wrap('<div class="select-skinned" />');
								var childrennn = $('<ul></ul>').hide();
								sc.parent().on('mouseleave', function() {
										if ('auto' === cfg.dropdownList.hideMode || 'leave' === cfg.dropdownList.hideMode) {
											childrennn.hide();
										}
									});
								// will init the li in skin._init_li
								if ('true' === cfg.valueNullable) {
									if (0 === sc.children('option[selected]').size()) { // select the first option
										sc.children('option').eq(0).attr('selected', 'selected');
									} else {}
								} else {
									if (0 === sc.children('option[selected]').size()) { // select the first option
										sc.children('option').eq(0).attr('selected', 'selected');
									} else {}
								}
								var selectedOptions = sc.children('option[selected]'); // 'option:selected' will always has selected content.(default is the first item.)
								testoSel = (selectedOptions.size() <= 0 ? cfg.placeHolder : (selectedOptions.text() === '' ? '&nbsp;' : selectedOptions.text()));
								selectedItem = $('<div class="select-skinned-text"><div class="select-skinned-cont">' + testoSel + '</div></div>');
								selectedItem.click(function() {
										var $this = $(this), elemUL = $this.next('ul');
										pos = $(this).parent('.select-skinned').position();
										bodyScroll = $('body').scrollTop();
										if ($(window).height() <= (pos.top + elemUL.outerHeight() + 15 - bodyScroll)) {
											elemUL.css({
													'top': 'auto',
													'bottom': '0'
												});
										} else {
											elemUL.css({
													'top': $(this).prev('.select-skinned-text').children('.select-skinned-cont').height(),
													'bottom': 'auto'
												});
										}
										if ($(window).width() <= (pos.left + elemUL.outerWidth())) {
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
										skin._apply_max_item.call($this.next('ul').get(0));
									});
								sc.before(selectedItem);
								sc.before(childrennn);
								sc.change(function() {
										skin._init_li(element);
										skin.addStyle();
									});
								sc.hide();
							});
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
							$selectSkinned = $element.parent('.select-skinned');
						if (cfg.type != 'block') {
							$selectSkinned.css({
									'float': cfg.type
								});
						}
						if ('auto' === cfg.width) { // set width accroding to the width of the select element
							cfg.width = $element.width();
						} else {}
						$selectSkinned.css("min-width", (cfg.minWidth || cfg.width)).width(cfg.width).children('ul').css("min-width", (cfg.itemMinWidth || cfg.width)); //.width(cfg.width);
						if (cfg.textwrap) {
							$selectSkinned.children('ul').children('li').css({
									'white-space': 'normal'
								});
						}
						$('.select-skinned > ul > li').hover(function() {
								$(this).addClass('hover');
							}, function() {
								$(this).removeClass('hover');
							});
						if ('puretext' === cfg.mode.toLowerCase()) {
							var spt = "select-skinned-pure-text";
							$selectSkinned.children('.select-skinned-text').addClass(spt).hover(function() {
									$(this).removeClass(spt);
								}, function() {
									$(this).addClass(spt);
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
		//				,'valueNullable': ($this.hasClass('valueNullable')?'true':'false')
		//			});
		//		});
		//		$('.leftSelect').each(function(){
		//			var $this = $(this);
		//			$this.skinner({'type':$this.css("float"),'maxitem':'20'
		//				,'minWidth':($this.css('min-width')||"40px")
		//				,'mode': ($this.hasClass('pureText')?'pureText':'select')
		//				,'valueNullable': ($this.hasClass('valueNullable')?'true':'false')
		//			});
		//		});
		//	})(jQuery);
	})(jQuery);
/* vim: set si sts=4 ts=4 sw=4 fdm=indent :*/
