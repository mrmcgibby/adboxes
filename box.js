var boxes = [
    {width:24, height:10, payment:38, clicks:693},
    {width:15, height:20, payment:75, clicks:1106},
    {width:21, height:18, payment:114, clicks:182},
    {width:15, height:15, payment:190, clicks:1902},
    {width:10, height:27, payment:93, clicks:791},
    {width:27, height:22, payment:203, clicks:116},
    {width:20, height:15, payment:25, clicks:1381},
    {width:16, height:20, payment:30, clicks:318},
    {width:14, height:13, payment:126, clicks:1535},
    {width:18, height:26, payment:90, clicks:1587},
    {width:16, height:18, payment:106, clicks:768},
    {width:16, height:12, payment:35, clicks:1172},
    {width:14, height:28, payment:135, clicks:690},
    {width:16, height:20, payment:76, clicks:1546},
    {width:15, height:28, payment:54, clicks:1654},
    {width:16, height:10, payment:192, clicks:1685},
    {width:17, height:23, payment:56, clicks:10},
    {width:22, height:18, payment:139, clicks:1938},
    {width:12, height:25, payment:75, clicks:554},
    {width:16, height:25, payment:48, clicks:337},
    {width:24, height:18, payment:199, clicks:1282}
];

function box_size(box)
{
    // TODO use payment and clicks
    var area = box.width*box.height;
    return area;
}

function plot_box(box)
{
    var adbox = $("<div class='adbox'></div>");
    adbox.css("background-color", getRandomColor());
    adbox.css("top", box.top);
    adbox.css("left", box.left);
    adbox.css("height", box.height);
    adbox.css("width", box.width);
    $("#mainbox").append(adbox);
}

function plot(box_list)
{
    var first = box_list[0];
    first.top = 0;
    first.left = 0;
    plot_box(first);

    var first_regions =	[
	{
	    orientation:"left",
	    origin:first.left,
	    base:first.top,
	    limit:Infinity,
	},
	{
	    orientation:"top",
	    origin:first.top,
	    base:first.left+first.width,
	    limit:Infinity,
	},
	{
	    orientation:"right",
	    origin:first.left+first.width,
	    base:first.top+first.height,
	    limit:Infinity,
	},
	{
	    orientation:"bottom",
	    origin:first.top+first.height,
	    base:first.left,
	    limit:Infinity,
	}
    ];
    var levels = [first_regions];
    console.log(levels);

    var level_index = 0;
    var region_index = 0;
    var box_index = 1;
    while (box_index < box_list.length)
    {
	var level = levels[level_index];
	var region = level[region_index];
	var box = box_list[box_index];

	switch (region.orientation)
	{
	    case "left":
	    box.top = region.base - box.height;
	    box.left = region.origin;
	    region.origin = region.origin + box.width;
	    break;
	    case "top":
	    box.top = region.origin;
	    box.left = region.base;
	    region.origin = region.origin + box.height;
	    break;
	    case "right":
	    box.top = region.base;
	    box.left = region.origin - box.width;
	    region.origin = region.origin - box.width;
	    break;
	    case "bottom":
	    box.top = region.origin - box.height;
	    box.left = region.base - box.width;
	    region.origin = region.origin - box.height;
	    break;
	}

	region_index++;
	if (region_index == level.length)
	{
	    region_index = 0;
	}

    	box_index++;

	plot_box(box);
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

$(document).ready(function(){
    var sorted = _.sortBy(boxes, function(box){
	return -box_size(box);
    });
    plot(sorted);
    console.log(sorted);
    var index = 1;
});
