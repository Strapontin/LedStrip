

// Changement de la luminosité
function bulbLuminosityChanged(event) {

    if (canSendData()) {

        lastTimeDataSend = Date.now();

        var currentPage = $(event.currentTarget).parents('.colors-container');
        var luminosity = currentPage.find(".luminosity").val();

        currentPage.find(".value-luminosity").val(luminosity);

        $.post('/setLuminosity', {
            setLuminosity: luminosity
        });
    }
    else {

        clearTimeout(luminosityTimeout);
        luminosityTimeout = setTimeout(function () { bulbLuminosityChanged(event); }, 10);
    }
};

// Lors du clique sur le bouton pour éteindre la bande
function bulbClickOnOff(event) {

    if (event.timeStamp - timestampButton < 40) {

        console.log("checked = " + event.currentTarget.control.checked);
    }
    else {

        timestampButton = event.timeStamp;
    }
};

// La valeur d'une couleur rgb a changé
function bulbRgbValueChanged(event) {

    var valueRed = $(".rgb-value.red").val();
    var valueGreen = $(".rgb-value.green").val();
    var valueBlue = $(".rgb-value.blue").val();
    var luminosity = $(".value-luminosity").val();
    

    if (valueRed > 255) {
        valueRed = 255;
    }
    else if (valueRed < 0) {
        valueRed = 0;
    }

    if (valueGreen > 255) {
        valueGreen = 255;
    }
    else if (valueGreen < 0) {
        valueGreen = 0;
    }

    if (valueBlue > 255) {
        valueBlue = 255;
    }
    else if (valueBlue < 0) {
        valueBlue = 0;
    }

    if (luminosity > 255) {
        luminosity = 255;
    }
    else if (luminosity < 0) {
        luminosity = 0;
    }


    rgbaColor = 'rgba(' + valueRed + ',' + valueGreen + ',' + valueBlue + ',1)';

    $(".color-picker").jqxColorPicker('setColor', { r: valueRed, g: valueGreen, b: valueBlue });


    SetRGB(valueRed, valueGreen, valueBlue);
}

// Change la couleur après un choix sur un clique
function bulbPickedColor(event){


    if (canSendData()) {

        lastTimeDataSend = Date.now();
        var color = event.args.color;

        var currentPage = $(event.currentTarget).parents('.colors-container');

        var valueRed = color.r;
        var valueGreen = color.g;
        var valueBlue = color.b;

        rgbaColor = 'rgba(' + valueRed + ',' + valueGreen + ',' + valueBlue + ',1)';

        // Change le RGB dans les textbox
        currentPage.find(".rgb-value.red").val(valueRed);
        currentPage.find(".rgb-value.green").val(valueGreen);
        currentPage.find(".rgb-value.blue").val(valueBlue);

        SetRGB(valueRed, valueGreen, valueBlue);
    }
    else {

        clearTimeout(colorTimeout);
        colorTimeout = setTimeout(function () { bulbPickedColor(event); }, 10);
    }
};