let correctCountry;
let options = [];

function getCountryNameInPortuguese(country) {
    return country.translations && country.translations.por
        ? country.translations.por.common
        : country.name.common;
}

function getRandomCountries() {
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            const randomIndex = Math.floor(Math.random() * data.length);
            correctCountry = data[randomIndex];
            options = [correctCountry];

            while (options.length < 4) {
                const randomOption = data[Math.floor(Math.random() * data.length)];
                if (!options.includes(randomOption)) {
                    options.push(randomOption);
                }
            }

            options.sort(() => Math.random() - 0.5);
            displayQuestion();
        })
        .catch(error => console.error('Erro:', error));
}

function displayQuestion() {
    document.getElementById('flagImage').src = correctCountry.flags.png;
    document.getElementById('flagImage').style.display = 'block';

    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';

    options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = getCountryNameInPortuguese(option);
        button.onclick = () => checkAnswer(option);
        optionsDiv.appendChild(button);
    });
}

function checkAnswer(selected) {
    const resultDiv = document.getElementById('result');
    if (selected.name.common === correctCountry.name.common) {
        resultDiv.innerHTML = '<p>Correto!</p>';
    } else {
        resultDiv.innerHTML = `<p>Incorreto! O país correto era: ${getCountryNameInPortuguese(correctCountry)}</p>`;
    }
    document.getElementById('nextButton').style.display = 'block';
}

document.getElementById('nextButton').onclick = () => {
    document.getElementById('result').innerHTML = '';
    document.getElementById('nextButton').style.display = 'none';
    getRandomCountries();
};

window.onload = getRandomCountries;
