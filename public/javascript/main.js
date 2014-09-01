

$(function(){
	// log out shows up
	$(document).on('click', '#user-name', function(){
		$('#log-out').slideToggle('slow');
	});

	// var source   = $("#entry-template").html();
	// var template = Handlebars.compile(source);

	// Handlebars.registerHelper('ifCond', function(v1, v2, options) {
	//   if(v1 === v2) {
	//     return options.fn(this);
	//   }
	//   return options.inverse(this);
	// });

	// var context = {
	// 	v1: this.typeOfBall,
	// 	v2: 0
	// }	
	// var html = template(context);	



});