# responsive_menu

![](http://kurubusi.net/wp-content/uploads/2014/10/kurubusi.responsive_menu_img1.jpg)

## Overview
Drawer Menu responsive

## Installation

1. Reading file
```html
   <head>
      …
      <script type="text/javascript" src="kurubusi.responsive_menu_pkg.js"></script>
      <link href="kurubusi.responsive_menu.css" rel="stylesheet" type="text/css">
      …
   </head>
```


2. Class is attached to the object used as a switch. 
```html
   <button type="button" class="k_nav_b" data-krm-group="group_a" data-krm-breakpoint="760" data-krm-fadeto="right">MENU</button>
```
* `class="k_nav_b"`        **indispensable**
* `data-krm-group="group_a"`        **option**
* `data-krm-breakpoint="760"`        **option**
* `data-krm-fadeto="right"`        **option**


3. Class is attached to the menu of a target. 
```html
   <div class="k_target_obj" data-krm-group="group_a">
      …
   </div>
```
* `class="k_target_obj""`        **indispensable**
* `data-krm-group="group_a"`        **option**


[Produced by KURUBUSI](http://kurubusi.net/)
