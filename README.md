<h1>jQuery-Skinner</h2>
==============

A jQuery plugin for skin a html combobox (select)
<br>
If you find any bug, report it on twitter [@anbi](http://www.twitter.com/anbi).

<h2>Usage</h2>
<p>Include Javascript and Stylesheet</p>
```html
<script src="js/jquery-skinner.js" type="text/javascript"></script>
<link href="css/jquery-skinner.css" rel="stylesheet" />
```
<p>Insert html select tag with classname:</p>
```html
<select class="myNewSelect">
	<option>Banana</option>
	<option>Cucumber</option>
	<option selected="selected">Strawberry</option>
	<option>Hedge apple</option>
	<option>Boysenberry</option>
	<option>Apple</option>
	<option>Pomegranate tree</option>
</select>
```
<p>Insert Javascript</p>
```javascript
$(function(){

	$('.myNewSelect').skinner({'width':'200px', 'maxitem':'4'});

});
```

<h3>List of params</h3>
```javascript
	$('.myNewSelect').skinner({
		'type':'left',					// Floating of element i.e. 'left' or 'right'
		'width':'150px',				// Specify a fixed width in pixel i.e. '150px
		'maxitem':false,				// Maximum number of item to show i.e. '4'
		'textwrap':true					// Force text wrap at width of select i.e true or false
		,'minWidth':'40px'				//	Minimum width of the 'textinput'
		,'itemMinWidth':'40px'			//	Minimum width of the dropdown list
		,'mode':'pureText'				//	the visual mode of the element.
		,'placeHolder':'please select'	//	set the place holder.
		,'valueNullable':'false'		//	enable leave it empty or not.
	});
```

<h3>Changelog</h3>
<ul>

<li>v 1.3.5 improve the drop down container's drop behaviour logical; 
		added disabled option;
		added events:beforeClickItem/whenClickItem/afterClickItem</li>
<li>v 1.3.1 speed up the rendering process. 
		update the perfermance and the logic about the dropdown direction.
		change only trigger when value changed. 
		support select's unchange event.
		</li>
<li>v 1.3.0 added placeHolder; added valueNullable; Fixed Variable Scope Bug;
				Improved the function usage (_li_click,_apply_max_item is added
					, checkSelect has been changed to _init_li);
				added dorpdownlist auto hide logic;</li>
<li>v 1.2.2 add a ' pure text ' visual mode</li>
<li>v 1.2.1 add supports for setting the min-width attribute of the text of the select and its dropdown-list</li>
<li>v 1.2 added max item to show option</li>
<li>v 1.1 added text wrap option</li>
<li>v 1.0 first relase</li>
</ul>

<h3>Credits</h3>
Author: *Andrea ([@anbi](http://www.twitter.com/anbi)) Bianchin*<br>
Homesite: *www.andreabianchin.it*<br>
Contributor: *[will-v-king](https://github.com/will-v-king)*<br> 
