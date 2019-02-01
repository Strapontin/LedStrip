
$(document).ready(function() {
	
	$("#color-picker").jqxColorPicker({
		width: 500,
		height: 500
	});
	
	// $("#color-picker").jqxColorPicker({colorMode: 'hue' });
	
	// $('#jqxButton').on('click', function () {
	  // var color = $("#colorPicker").jqxColorPicker('getColor');
		// var hex = color.hex;
		// var rgb = color.r + "," + color.g + "," + color.b;
		// alert("Hex: #" + hex + ", RGB: " + rgb);
	// });
	
	// colorBlock = palette des couleurs
	// var colorBlock = document.getElementById('color-block');
	// var ctx1 = colorBlock.getContext('2d');
	// var width1 = colorBlock.width;
	// var height1 = colorBlock.height;

	// // color-strip = bande des couleurs
	// var colorStrip = document.getElementById('color-strip');
	// var ctx2 = colorStrip.getContext('2d');
	// var width2 = colorStrip.width;
	// var height2 = colorStrip.height;

	// // color-label = Affichage de la couleur sélectionnée
	// var colorLabel = document.getElementById('color-label');

	// var x = 0;
	// var y = 0;
	// var drag = false;
	// var rgbaColor = 'rgba(255,0,0,1)';

	// ctx1.rect(0, 0, width1, height1);
	// fillGradient();

	// ctx2.rect(0, 0, width2, height2);
	// var grd1 = ctx2.createLinearGradient(0, 0, 0, height1);
	// grd1.addColorStop(0, 'rgba(255, 0, 0, 1)');
	// grd1.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
	// grd1.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
	// grd1.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
	// grd1.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
	// grd1.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
	// grd1.addColorStop(1, 'rgba(255, 0, 0, 1)');
	// ctx2.fillStyle = grd1;
	// ctx2.fill();
	

	// Quand on change les valeurs dans les combobox on applique la nouvelle couleur
	$('.rgb-value').off('change');
	$('.rgb-value').on('change', rgbValueChanged);	



	// Lors du click sur la bande
	// function click(event) {
	  // x = event.offsetX;
	  // y = event.offsetY;
	  // var imageData = ctx2.getImageData(x, y, 1, 1).data;
	  // rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
	  // fillGradient();
	// }

	// Rempli la palette de la couleur souhaitée
	// function fillGradient() {
	  // ctx1.fillStyle = rgbaColor;
	  // ctx1.fillRect(0, 0, width1, height1);

	  // var grdWhite = ctx2.createLinearGradient(0, 0, width1, 0);
	  // grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
	  // grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
	  // ctx1.fillStyle = grdWhite;
	  // ctx1.fillRect(0, 0, width1, height1);

	  // var grdBlack = ctx2.createLinearGradient(0, 0, 0, height1);
	  // grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
	  // grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
	  // ctx1.fillStyle = grdBlack;
	  // ctx1.fillRect(0, 0, width1, height1);
	// }

	// function mousedown(event) {
	  // drag = true;
	  // changeColor(event);
	// }

	// function mousemove(event) {
	  // if (drag) {
		// changeColor(event);
	  // }
	// }

	// function mouseup(event) {
	  // drag = false;
	// }

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
	
	// // Change la couleur après un click
	// function changeColor(event) {
		
		// x = event.offsetX;
		// y = event.offsetY;

		// var imageData = ctx1.getImageData(x, y, 1, 1).data;

		// rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';

		// // Change la couleur du label pour la couleur sélectionnée
		// colorLabel.style.backgroundColor = rgbaColor;
	  
		// // Change le RGB dans les textbox
		// $("#value-red").val(imageData[0]);
		// $("#value-green").val(imageData[1]);
		// $("#value-blue").val(imageData[2]);
	// }
	
	// La valeur d'une couleur rgb a changé
	function rgbValueChanged(event) {
		var valueRed = $("#value-red").val();
		var valueGreen = $("#value-green").val();
		var valueBlue = $("#value-blue").val();
		
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
		
		
		rgbaColor = 'rgba(' + valueRed + ',' + valueGreen + ',' + valueBlue + ',1)';
		
		$("#color-picker").jqxColorPicker('setColor', {r: valueRed, g: valueGreen, b: valueBlue});
	}

	// colorStrip.addEventListener("click", click, false);

	// colorBlock.addEventListener("mousedown", mousedown, false);
	// colorBlock.addEventListener("mouseup", mouseup, false);
	// colorBlock.addEventListener("mousemove", mousemove, false);
});