$('#btnGenerarMatricula').click(() => {
    const randomNumericPart = generateRandomMatricula();
    const randomLetterPart = generateRandomLetters(3);
    const randomMatricula = `${randomNumericPart} ${randomLetterPart}`;
    setGeneratedMatricula(randomMatricula);
    addMatriculaToTable(randomMatricula);
});

$('#btnGenereteNextMatricula').click(() => {
    const inputValue = getInputValue().toUpperCase();
    if (validateMatriculaField()) {
        $("#proximaMatriculaError").hide();
        const nextMatricula = generateNextMatricula(inputValue);
        addMatriculaToDiv(addSpaceAtPosition(nextMatricula, 4));
    } else {
        $("#proximaMatriculaError").show();
    }

});


function validateMatriculaField() {
    var inputValue = getInputValue().trim();
    if (inputValue === "") {
        return false;
    } else {
        return true;
    }
}
function addSpaceAtPosition(str, position) {
    if (position > 0 && position <= str.length) {
        const firstPart = str.slice(0, position);
        const secondPart = str.slice(position);
        return `${firstPart} ${secondPart}`;
    }
    return str;
}

function addMatriculaToDiv(nextMatricula) {
    $('#inputNextMatricula').append(`<div class='row-background'>${nextMatricula}</div>`);
}

function addMatriculaToTable(matricula) {
    const newRow = `<tr><td><div class='row-background'>${matricula}</div></td></tr>`;
    $('#generetedMatriculas tbody').append(newRow);
}

function generateRandomMatricula() {
    const randomNumber = getRandomInt(0, 1000);
    return formatNumber(randomNumber, 4);
}

function formatNumber(number, length) {
    return number.toString().padStart(length, '0');
}

function generateRandomLetters(length) {
    const alphabet = 'BCDFGHJKLMNPRSTVWXZ';
    let randomLetters = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = getRandomInt(0, alphabet.length);
        randomLetters += alphabet.charAt(randomIndex);
    }

    return randomLetters;
}

function generateNextLetter(value) {
    const alphabet = 'BCDFGHJKLMNPRSTVWXZ';
    let nextDigitIndex = alphabet.indexOf(value);
    let nextDigit = (nextDigitIndex === 24) ? 0 : nextDigitIndex + 1;
    return alphabet.charAt(nextDigit);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateNextDigit(digit) {
    const alphabet = 'BCDFGHJKLMNPRSTVWXZ';
    const nextIndex = (alphabet.indexOf(digit) + 1) % alphabet.length;
    const nextDigit = alphabet.charAt(nextIndex);
    return nextDigit;
}

function generateNextThreeDigits(digit) {
    let nextDigit = generateNextDigit(digit[2]);

    if (nextDigit === 'B') {
        let nextMiddleDigit = generateNextDigit(digit[1]);
        if (nextMiddleDigit === 'B') {
            let nextFirstDigit = generateNextDigit(digit[0]);
            return `${nextFirstDigit}BB`;
        }
        return `${digit[0]}${nextMiddleDigit}B`;
    }
    return `${digit[0]}${digit[1]}${nextDigit}`;
}

function generateNextMatricula(inputValue) {
    let numericDigits = parseInt(inputValue.substring(0, 4));
    let lettersDigits = inputValue.substring(4, 7);
    if (numericDigits === 9999) {
        numericDigits = 0;
        lettersDigits = generateNextThreeDigits(lettersDigits);
    } else {
        numericDigits += 1;
    }
    return `${formatNumber(numericDigits, 4)}${lettersDigits}`;
}

function setGeneratedMatricula(matricula) {
    $('#inputGeneratedMatricula').val(matricula);
}

function getInputValue() {
    return $('#inputMatricula').val();
}
