$(function(){
	
	// modal mode
	$('.table').on("click", function(e){

		var selectedTable = $(this).clone();

		$('.modal-body').html(selectedTable);

		
		$("#myModal").modal('toggle')
	});

	var level;
	var cat;

	$('.level').click(function(){

		// get the category of shots 
		var temp = $('.cat.yellow').text()
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

		$.get('filtered-tables', {level: level, cat: cat}, function(matchedTables){
			$('.col-md-10').empty();
			 var source = $("#entry-template").html();
			 var template = Handlebars.compile(source);

			 $(matchedTables).each(function(index, table){
			 	var tableInfo = {
			 		title: table.title,
				 	note: table.note,
				 	array: []
			 	};
			 	$(table.array).each(function(i, ball){
			 		tableInfo.array.push(ball)
			 	})

				var html = template(tableInfo);
				$('.col-md-10').append(html);

			 })

		})
	})

	$('.cat').click(function(){
		
		// get the category of shots 
		var temp = $('.level.yellow').text()
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

		$.get('filtered-tables', {level: level, cat: cat}, function(matchedTables){
			$('.col-md-10').empty();
			 var source = $("#entry-template").html();
			 var template = Handlebars.compile(source);

			 $(matchedTables).each(function(index, table){
			 	var tableInfo = {
			 		title: table.title,
				 	note: table.note,
				 	array: []
			 	};
			 	$(table.array).each(function(i, ball){
			 		tableInfo.array.push(ball)
			 	})		

				var html = template(tableInfo);
				$('.col-md-10').append(html);

			 })

		})
	})



	
})