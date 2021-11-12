var colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
], quotesData;
var currentQuote = '', currentAuthor = '';

function getQoutes() {
    return fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
    .then(res => res.json())
    .then(data => {
        quotesData = data;
    })
}
function getRandomQuote() {
    return quotesData.quotes[
        Math.floor(Math.random() * quotesData.quotes.length)
    ];
}
function getRandomColor() {
    return colors[
        Math.floor(Math.random() * colors.length)
    ];
}
function getQuote() {
    let randomQuote = getRandomQuote();

    currentAuthor = randomQuote.author;
    currentQuote = randomQuote.quote;

    $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?&hashtags=quotes&text=' + '"' + 
    encodeURIComponent(currentQuote) + '" -' + encodeURIComponent(currentAuthor));
    

    $('#fb-quote').attr('href', 'https://www.facebook.com/sharer.php?u=' + encodeURIComponent('https://codepen.io/Ngohiep') + '&quote=' + currentQuote + ' --' + currentAuthor + ' #quotes')

    $('#text').animate({opacity: 0}, 500, function() {
        $(this).animate({opacity: 1}, 500)
        $('#alt-text').text(currentQuote)
        document.documentElement.style.setProperty('--color1', getRandomColor());
    })
    
    $('#author').animate({opacity: 0}, 500, function() {
        $('#author').animate({opacity: 1}, 500)
        $('#alt-author').text(currentAuthor)
        
    })
}
$(document).ready(function() {
    getQoutes().then(() => getQuote())
    $('#new-quote-btn').on('click', () => getQuote())
})
