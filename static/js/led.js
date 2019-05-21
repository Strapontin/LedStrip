
$(document).ready(function() {

	$(".luminosity").off("input change").on("input change", luminosityChanged);
	$(".switch.bande-power").off("click").on("click", clickOnOff);
	$(".header th").off("click").on("click", clickHeaderMenu);
	
	var lastTimeDataSend = Date.now();


	$('.bed.selected .color-picker').bind('colorchange', function(event) {

		// $.notify("document.ready", "Color Changed");
	});


	$(".color-picker div").jqxColorPicker({
		width: 500,
		height: 500
	});	
	
	$(".color-picker div").jqxColorPicker({colorMode: 'hue' });
	$(".color-picker div").addClass("mode-hue");


	
	// Quand on change les valeurs dans les combobox on applique la nouvelle couleur
	$('.rgb-value').off('change').on('change', rgbValueChanged);

	
	// Change la couleur après un click
	$(".color-picker").bind('colorchange', function(event){

		var currentPage = $(event.currentTarget).parents('.colors-container');

		var color = event.args.color;
		
		var valueRed = color.r;
		var valueGreen = color.g;
		var valueBlue = color.b;
		
		rgbaColor = 'rgba(' + valueRed + ',' + valueGreen + ',' + valueBlue + ',1)';
		
		// Change le RGB dans les textbox
		currentPage.find(".rgb-value.red").val(valueRed);
		currentPage.find(".rgb-value.green").val(valueGreen);
		currentPage.find(".rgb-value.blue").val(valueBlue);

		SetRGB(valueRed, valueGreen, valueBlue);
	});
	
	
	// La valeur d'une couleur rgb a changé
	function rgbValueChanged(event) {

		var valueRed = $(".rgb-value.red").val();
		var valueGreen = $(".rgb-value.green").val();
		var valueBlue = $(".rgb-value.blue").val();
		var luminosity = $(".value-luminosity").val();
		
		if (valueRed > 255){
			valueRed = 255;
		}
		else if (valueRed < 0){
			valueRed = 0;
		}
		
		if (valueGreen > 255){
			valueGreen = 255;
		}
		else if (valueGreen < 0){
			valueGreen = 0;
		}
		
		if (valueBlue > 255){
			valueBlue = 255;
		}
		else if (valueBlue < 0){
			valueBlue = 0;
		}
		
		if (luminosity > 255) {
			luminosity = 255;
		}
		else if (luminosity < 0){
			luminosity = 0;
		}
		
		
		rgbaColor = 'rgba(' + valueRed + ',' + valueGreen + ',' + valueBlue + ',1)';
		
		$(".color-picker").jqxColorPicker('setColor', {r: valueRed, g: valueGreen, b: valueBlue});


		SetRGB(valueRed, valueGreen, valueBlue);
	}


	// Envoie le changement de couleur à l'Arduino
	function SetRGB(red, green, blue) {
		
		// On enregistre la date pour n'envoyer l'info qu'une fois par seconde
		if (Math.floor(Date.now() - lastTimeDataSend) / 500 >= 1) {

			lastTimeDataSend = Date.now();

			var stringToSend = "RGB;" + red + ";" + green + ";" + blue + ";";

			$.post('/rgbValue', {
				rgbValue: stringToSend
			});
		}
	}

	
	// Changement de la luminosité
	function luminosityChanged(event) {

		var currentPage = $(event.currentTarget).parents('.colors-container');
		var luminosity = currentPage.find(".luminosity").val();

		currentPage.find(".value-luminosity").val(luminosity);
	};
	

	// Lors du clique sur le bouton pour éteindre la bande
	function clickOnOff(event) {
		
		console.log(event);
		console.log($(".switch.bande-power")[0].control.checked);
	};

	
	// Lorsque l'on clique sur un bouton dans le header
	function clickHeaderMenu(event){
		
		// $.notify("blabla");
		let clickedItemClass = event.currentTarget.className.replace("selected", "");
		
		// On remet tous les headers et affichages par défaut
		$(".header th.selected, .actions-container > div").removeClass("selected");
		
		// On affiche le header sélectionné avec sa couleur
		$(".header th." + clickedItemClass).addClass("selected");
		
		// On affiche le corps du header sélectionné
		$(".actions-container ." + clickedItemClass).addClass("selected");
	}
});
