
var timestampButton = 0;
var lastTimeDataSend = Date.now();
var luminosityTimeout;
var colorTimeout;
	
	
$(document).ready(function () {

	initBasicEvents();

	$('.bed.selected .color-picker').bind('colorchange', function (event) {

		// $.notify("document.ready", "Color Changed");
	});

	$(".color-picker div").jqxColorPicker({
		width: 500,
		height: 500
	});

	$(".color-picker div").jqxColorPicker({ colorMode: 'hue' });
	$(".color-picker div").addClass("mode-hue");
});

function initBasicEvents(){

	$(".header th").off("click").on("click", clickHeaderMenu);

	// Change la luminosité
	$(".bed .luminosity").off("input change").on("input change", bedLuminosityChanged);
	$(".bulb .luminosity").off("input change").on("input change", bulbLuminosityChanged);
	$(".both .luminosity").off("input change").on("input change", bothLuminosityChanged);


	// Eteint/Allume
	$(".bed .switch.bande-power").off("click").on("click", bedClickOnOff);
	$(".bulb .switch.bande-power").off("click").on("click", bulbClickOnOff);
	$(".both .switch.bande-power").off("click").on("click", bothClickOnOff);


	// Quand on change les valeurs dans les combobox on applique la nouvelle couleur
	$('.bed .rgb-value').off('change').on('change', bedRgbValueChanged);
	$('.bulb .rgb-value').off('change').on('change', bulbRgbValueChanged);
	$('.both .rgb-value').off('change').on('change', bothRgbValueChanged);
	

	// Change la couleur après un click
	$(".bed .color-picker").bind('colorchange', bedPickedColor);
	$(".bulb .color-picker").bind('colorchange', bulbPickedColor);
	$(".both .color-picker").bind('colorchange', bothPickedColor);
}
	
// Renvoie true si l'utilisateur a attendu assez longtemps pour pouvoir envoyer des données
function canSendData() {

	return Math.floor(Date.now() - lastTimeDataSend) / 150 >= 1;
}

// Envoie le changement de couleur à l'Arduino
function SetRGB(red, green, blue) {

	var stringToSend = "RGB;" + red + ";" + green + ";" + blue + ";";

	$.post('/rgbValue', {
		rgbValue: stringToSend
	});
}

// Lorsque l'on clique sur un bouton dans le header
function clickHeaderMenu(event) {

	// $.notify("blabla");
	let clickedItemClass = event.currentTarget.className.replace("selected", "");

	// On remet tous les headers et affichages par défaut
	$(".header th.selected, .actions-container > div").removeClass("selected");

	// On affiche le header sélectionné avec sa couleur
	$(".header th." + clickedItemClass).addClass("selected");

	// On affiche le corps du header sélectionné
	$(".actions-container ." + clickedItemClass).addClass("selected");
}

