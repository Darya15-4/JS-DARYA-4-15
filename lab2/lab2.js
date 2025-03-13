function toggleLike(button) {
    let isLiked = button.getAttribute("aria-pressed") === "true";
    button.setAttribute("aria-pressed", !isLiked);

    let img = button.querySelector(".icon");
    img.src = isLiked ? "img/simple-heart-outline-11.webp" : "img/simple-heart-outline-112.png";
}




function toggleLikeTaskTwo() {
    let likeButton = document.querySelector('.task_two_button_like');
    let dislikeButton = document.querySelector('.task_two_button_dislike');
    let likeIcon = document.querySelector('.heart-icon');
    let dislikeIcon = document.querySelector('.broken-heart-icon');

    likeButton.addEventListener('click', () => {
        let isActive = likeButton.getAttribute("aria-pressed") === "true";

        likeButton.setAttribute("aria-pressed", isActive ? "false" : "true");
        likeIcon.style.filter = isActive ? "none" : "drop-shadow(0 0 15px #4d0000)";

        dislikeButton.setAttribute("aria-pressed", "false");
        dislikeIcon.style.filter = "none";
    });

    dislikeButton.addEventListener('click', () => {
        let isActive = dislikeButton.getAttribute("aria-pressed") === "true";

        dislikeButton.setAttribute("aria-pressed", isActive ? "false" : "true");
        dislikeIcon.style.filter = isActive ? "none" : "drop-shadow(0 0 15px #4d0000)";

        likeButton.setAttribute("aria-pressed", "false");
        likeIcon.style.filter = "none";
    });
}
toggleLikeTaskTwo();





let basketCount = 0;
const elBasketCount = document.querySelector('.basket__count');
const elBasketButtons = document.querySelectorAll('.basket__button');

elBasketButtons.forEach(button => {
    button.addEventListener('click', () => { 
        basketCount++; 
        elBasketCount.textContent = basketCount; 
    });
});




function generateRandomArray(length, min, max) {
    return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

const originalArray = generateRandomArray(10, 1, 100);
let currentArray = [...originalArray];

const listContainer = document.querySelector('.number-list');
const ascButton = document.querySelector('.sort-asc');
const descButton = document.querySelector('.sort-desc');
const resetButton = document.querySelector('.sort-reset');
const coordsDisplay = document.querySelector('.coords');

function renderList(array) {
    listContainer.innerHTML = '';
    array.forEach(num => {
        const listItem = document.createElement('li');
        listItem.textContent = num;
        listContainer.appendChild(listItem);
    });
}

function sortAscending() {
    currentArray.sort((a, b) => a - b);
    renderList(currentArray);
}

function sortDescending() {
    currentArray.sort((a, b) => b - a);
    renderList(currentArray);
}

function resetList() {
    currentArray = [...originalArray];
    renderList(currentArray);
}

ascButton.addEventListener('click', sortAscending);
descButton.addEventListener('click', sortDescending);
resetButton.addEventListener('click', resetList);

renderList(currentArray);

document.addEventListener('pointerdown', (event) => {
    const elementTag = event.target.tagName.toLowerCase();
    coordsDisplay.textContent = `X: ${event.clientX}, Y: ${event.clientY} - ${elementTag}`;
});