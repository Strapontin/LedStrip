
$(document).ready(function() {

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
	});
	
	
	// La valeur d'une couleur rgb a changé
	function rgbValueChanged(event) {
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
	}
	
	// Changement de la luminosité
	$("#luminosity").on("input change", function() {
		
		$("#value-luminosity").val($("#luminosity").get(0).value);
	});
});