$(document).on('ready', function(){
// $(function(){
	var Ball = function(type, location){
		this.type = type;
		this.top = location.top;
		this.left = location.left;
	};
	Ball.prototype.create = function(){
		// <img src="/image/0.png" class="ball-on-table" data-type="0" style="top: 0; left: 0">
		if (this.type === 0){
				this.el = $('<img>')
				.attr('src', '/image/' + this.type + '.png')
				.addClass('ball-on-table')
				.addClass('cueball')
				.attr('data-type', this.type)
				.css({
						'top': this.top - 12.5 - 4.5,
						'left': this.left - 12.5 - 4.5,
						// 'height': 34,
						// 'width': 34
				});
				
		}


		else {
			this.el = $('<img>')
				.attr('src', '/image/' + this.type + '.png')
				.addClass('ball-on-table')
				.attr('data-type', this.type)
				.css({
						'top': this.top - 12.5,
						'left': this.left - 12.5
				});
		}
	};

	// places balls from their individual starting position before falling into the page
	for(var i=0; i<16; i++){
		$('#ball'+i).css('left', i*50);
	}
  var ball;
  for(i=0; i<16; i++){
	  var randomNum = Math.random() + 1.5 ;
	  ball = $("#ball"+i);
	  TweenLite.to(ball, randomNum, {top:"250px", ease: Bounce.easeOut});
	}


	var level;
	var cat;

		//clear filter
	$('.clear-filter').click(function(e){
		e.preventDefault();
		$('.level').removeClass('yellow');
		$('.cat').removeClass('yellow');

		level = undefined;
		cat = undefined;


	});

	$('.level').click(function() {
		var selectedLevel = $(this);
		if ( selectedLevel.text() === level) {
			selectedLevel.removeClass('yellow');
			level = undefined;
		}
		else{
			$('.level').removeClass('yellow');
			selectedLevel.addClass('yellow');
			level = selectedLevel.text();
		}
	});

	$('.cat').click(function() {
		var selectedCat= $(this);
		if ( selectedCat.text() === cat){
			selectedCat.removeClass('yellow');
			cat = undefined;
		}
		else{
			$('.cat').removeClass('yellow');
			selectedCat.addClass('yellow');
			cat = selectedCat.text();

		}

	});

	// this is the variable that holds the selected ball when one of 
	// the balls is selected  to be placed on the table on Add Shots page 
	var selectedBall = "";

	// ball gets a border when being clicked on and its data type is 
	// stored into the a variable
	$('.ball').click(function(){

		$('.ball').removeClass('border');
		$(this).addClass('border');	

		selectedBall = $(this).data('type');



	});

	// a ball is placed onto the table 
	$('.table').click(function(e){
		// stop proceeding if no ball is clicked on/selected
		if( selectedBall === ""){
			return false;
		}

		var ball = new Ball(selectedBall, {top: e.offsetY, left: e.offsetX});
		ball.create();
		$(this).append(ball.el);
	});

	//submitting a new shot on Add Shots page
	$('#table-info').on('submit', function(e){
		e.preventDefault();

			//get all form input fields and convert them to an object
			var formData = $(this).serializeObject();

			// stop proceeding to the next step if the title field is not filled out 
			if(!formData.title){
				alert('Please add title');
				return false;
			}

			//get all the ball info on the table and input the info into an array
			var arrayOfBalls = [];
			var ballsOnTable = $('.ball-on-table');
			$.each(ballsOnTable, function(index, el){
				el = $(el);

				arrayOfBalls.push({ 
					'typeOfBall': el.context.dataset.type,
					"location": {
						'left': el.context.offsetLeft,
						'top': el.context.offsetTop
					}
				});
			});

			// POST to the server with username, form data, and balls on the table info
			$.post('/newTable', {
				level: level,
				cat: cat,
				form_data: formData, 
				array: JSON.stringify(arrayOfBalls) 
				}, function(result){
					console.log(result);
			});

			//clear all information on Add Shots page
			$('.level').removeClass('yellow');
			$('.cat').removeClass('yellow');
			$('.ball').removeClass('border');
			$('.table img').slice(1).remove();
			$('#title').val('');
			$('#note').val('');
	});



});