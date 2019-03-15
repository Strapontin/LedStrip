
$(document).ready(function() {

	$("#luminosity").on("input change", luminosityChanged);
	$(".switch.bande-power").on("click", clickOnOff);
	$(".header th").on("click", clickHeaderMenu);
	
	var lastTimeDataSend = Date.now();


	// $.notify("document.ready", "success");

	$("#color-picker div").jqxColorPicker({
		width: 500,
		height: 500
	});	
	
	$("#color-picker div").jqxColorPicker({colorMode: 'hue' });
	// $("#color-picker div").addClass("little-color-picker");
	$("#color-picker div").addClass("mode-hue");
	
	// Quand on change les valeurs dans les combobox on applique la nouvelle couleur
	$('.rgb-value').off('change');
	$('.rgb-value').on('change', rgbValueChanged);	
	
	// Change la couleur après un click
	$("#color-picker").bind('colorchange', function(event){
		
		var color = event.args.color;
		
		var valueRed = color.r;
		var valueGreen = color.g;
		var valueBlue = color.b;
		
		rgbaColor = 'rgba(' + valueRed + ',' + valueGreen + ',' + valueBlue + ',1)';
		
		// Change le RGB dans les textbox
		$("#value-red").val(valueRed);
		$("#value-green").val(valueGreen);
		$("#value-blue").val(valueBlue);

		SetRGB(valueRed, valueGreen, valueBlue);
	});
	
	
	// La valeur d'une couleur rgb a changé
	function rgbValueChanged(event) {


		console.log("rgbChanged");

		var valueRed = $("#value-red").val();
		var valueGreen = $("#value-green").val();
		var valueBlue = $("#value-blue").val();
		var luminosity = $("#value-luminosity").val();
		
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
		
		$("#color-picker").jqxColorPicker('setColor', {r: valueRed, g: valueGreen, b: valueBlue});


		SetRGB(valueRed, valueGreen, valueBlue);
	}


	// Envoie le changement de couleur à l'Arduino
	function SetRGB(red, green, blue) {
	
		console.log("set rgb");

		
		// On enregistre la date pour n'envoyer l'info qu'une fois par seconde
		if (Math.floor(Date.now() - lastTimeDataSend) / 500 >= 1) {

			lastTimeDataSend = Date.now();

			var stringToSend = "RGB;" + red + ";" + green + ";" + blue + ";";

			$.post('/rgbValue', {
				rgbValue: stringToSend
			});

			console.log("post rgb");
		}
	}

	
	// Changement de la luminosité
	function luminosityChanged(event) {
		
		$("#value-luminosity").val($("#luminosity").get(0).value);
	};
	
	// Lors du clique sur le bouton pour éteindre la bande
	function clickOnOff() {
		
		console.log($(".switch.bande-power")[0].control.checked);
	};
	
	// Lorsque l'on clique sur un bouton dans le header
	function clickHeaderMenu(event){
		
		// $.notify("blabla");
		let clickedItemClass = event.currentTarget.className.replace("selected", "");
		console.log(clickedItemClass);
		
		// On remet tous les headers et affichages par défaut
		$(".header th.selected, .actions-container > div").removeClass("selected");
		
		// On affiche le header sélectionné avec sa couleur
		$(".header th." + clickedItemClass).addClass("selected");
		
		// On affiche le corps du header sélectionné
		$(".actions-container ." + clickedItemClass).addClass("selected");
	}
});
