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
		var selectedLevel = $(this);
		if ( selectedLevel === level){
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
			 // var context = {
			 // 	title: result.title,
			 // 	typeOfBall: result.array[0].typeOfBall,
			 // 	note: result.note
			 // }

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

			// console.log(matchedTables)
		})
	})


	
})