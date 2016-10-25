(function ($) {
	$(document).ready(function() {

		function toggleChildren(showOrHide, $el, depth) {
			console.log("showChildren(", $el, depth, ")");
			var next = $el.next();
			if (next.length) {
				if (next.hasClass('child')) {
					switch(showOrHide) {
						case 'show':
							if (next.hasClass('depth-' + depth)) {
								next.show('flex');
							}
						break;
						case 'hide':
							var item_depth = next[0].className.match('depth-([0-9])');
							console.log(item_depth);
							if (item_depth !== null) {
								if (+item_depth[1] >= depth) {
									next.hide('flex').children('button').addClass('collapsed').removeClass('expanded');
								}
							} else {
								next.hide('flex').children('button').addClass('collapsed').removeClass('expanded');
							}
						break;
					}
				}
				toggleChildren(showOrHide, next, depth);
			}
		}

		$('.expand-button').click(function(e) {
			e.stopPropagation();
			var depth = $(this).parent()[0].className.match('depth-([0-9])');
			if ($(this).hasClass('expanded')) {
				console.log('clicked on expand button -- to collapse it!');
				$(this).addClass('collapsed').removeClass('expanded');

				if (depth !== null) {
					toggleChildren("hide", $(this).parent(), +depth[1] + 1);
				} else {
					toggleChildren("hide", $(this).parent(), 1);
				}
			} else {
				
				$(this).addClass('expanded').removeClass('collapsed');

				if (depth !== null) {
					toggleChildren("show", $(this).parent(), +depth[1] + 1);
				} else {
					toggleChildren("show", $(this).parent(), 1);
				}
			}
		});

		$('.list-group-item.subdirectory').click(function() {
			console.log('clicked subdirectory ', $(this).children('span').text());
		})
	});
})(jQuery);