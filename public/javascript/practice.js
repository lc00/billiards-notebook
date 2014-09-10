$(function(){
	var level;
	var cat;
	
	// modal mode
	$(document).on("click", '.table', function(e){

		var selectedTable = $(this).clone();

		$('.modal-body').html(selectedTable);
		$("#myModal").modal('toggle');
	});

	getFilteredTables = function(level, cat){
		$.get('filtered-tables', {level: level, cat: cat}, function(matchedTables){
			$('.col-md-10').empty();

		 	$(matchedTables).each(function(index, table){
			 	var tableInfo = {
			 		title: table.title,
				 	note: table.note,
				 	array: []
			 	};
			 	$(table.array).each(function(i, ball){
			 		tableInfo.array.push(ball);
			 	});

				var html = template(tableInfo);
				$('.col-md-10').append(html);

			});

		});

	};

		//clear filter
	$('.clear-filter').click(function(e){
		e.preventDefault();
		$('.level').removeClass('yellow');
		$('.cat').removeClass('yellow');

		level = undefined;
		cat = undefined;

		getFilteredTables(level, cat);

	});


	var source = $("#entry-template").html();
	var template = Handlebars.compile(source);

	// helper function to determine if equals condition
 	Handlebars.registerHelper('ifCond', function(v1, v2, options) {
	  if(v1 === v2) {
	    return options.fn(this);
	  }
	  return options.inverse(this);
	});


	$('.level').click(function(){
		// get the category of shots 
		var temp = $('.cat.yellow').text();
		if ( temp !== '')
			cat = temp;
					
		var selectedLevel = $(this);
		if ( selectedLevel.text() === level){
			selectedLevel.removeClass('yellow');
			level = undefined;
		}
		else {
			$('.level').removeClass('yellow');
			selectedLevel.addClass('yellow');
			level = selectedLevel.text();
		}

		getFilteredTables(level, cat);
	});

	$('.cat').click(function(){		
		// get the category of shots 
		var temp = $('.level.yellow').text();
		if ( temp !== '')
			level = temp;

		var selectedCat = $(this);
		if ( selectedCat.text() === cat){
			selectedCat.removeClass('yellow');
			cat = undefined;
		}
		else {
			$('.cat').removeClass('yellow');
			selectedCat.addClass('yellow');
			cat = selectedCat.text();
		}

		getFilteredTables(level, cat);

	});
	
});

