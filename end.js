document.addEventListener('DOMContentLoaded', () => {
    const finalScore = document.getElementById('finalScore');
    const mostRecentScore = localStorage.getItem('mostRecentScore');

    finalScore.innerText = mostRecentScore;

    document.getElementById('playAgain').addEventListener('click', () => {
        window.location.href = 'game.html';
    });

    document.getElementById('goHome').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});
