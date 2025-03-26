const buttonResolve = document.querySelector('.resolve__button');
const textResolve = document.querySelector('.resolve__text');
const imgGif = document.querySelector('.resolve__gif');
function job() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('Работа сделана');
        }, 2000);
    });
}
buttonResolve.addEventListener('click', () => { 
    textResolve.textContent = 'Выполняется...'; 
    imgGif.style.display = 'none';
    job().then(result => {
        textResolve.textContent = result;
        imgGif.style.display = 'block';
    });
});




function getData(probalityOfError = 0.5, dataString = '') {
    probalityOfError = document.querySelector('.probalityOfError').value;
    dataString = document.querySelector('.dataString').value;
    return new Promise((resolve, reject) => {
        if (isNaN(probalityOfError) || dataString === '' || probalityOfError === '') {
            reject("Введите вероятность и данные");
            return;
        }
        setTimeout(() => {
            if (Math.random() < probalityOfError) {
                dataString = `Синтетические данные: ${dataString}`;
                resolve(dataString);
            } else {
                reject("Данные не прошли проверку");
            }
        }, 1000);
    });
}
const dataButton = document.querySelector('.data__button');
dataButton.addEventListener('click', (event) => {
    event.preventDefault();

    const checkData = getData();
    checkData
        .then((result) => {
            const dataResult = document.querySelector('.data__result');
            dataResult.textContent = result;
        })
        .catch((error) => {
            const dataResult = document.querySelector('.data__result');
            dataResult.textContent = error;
        });
});




const inventory = { 
    woods: 0,
    sticks: 0,
    ironOre: 0,
    ironIngot: 0,
    pickaxe: 0
};

const items = {
    woods: { name: "Дерево", craftingTime: 1000, requiredItems: [], failProbability: 0 },
    sticks: { name: "Палка", craftingTime: 2000, requiredItems: ["woods"], failProbability: 0.1 },
    ironOre: { name: "Железная руда", craftingTime: 3000, requiredItems: [], failProbability: 0 },
    ironIngot: { name: "Железный слиток", craftingTime: 5000, requiredItems: ["ironOre"], failProbability: 0.15 },
    pickaxe: { name: "Кирка", craftingTime: 7000, requiredItems: ["sticks", "ironIngot"], failProbability: 0.25 }
};

const treeCreateButton = document.querySelector('.button__tree');
const oreCreateButton = document.querySelector('.button__ore');
const stickCreateButton = document.querySelector('.button__stick');
const ingotCreateButton = document.querySelector('.button__ingot');
const kirkaCreateButton = document.querySelector('.button__kirka');
const resultText = document.querySelector('.kraft__text--result');

function updateUI() {
    document.querySelector('.kraft__count--woods').textContent = inventory.woods;
    document.querySelector('.kraft__count--ironOre').textContent = inventory.ironOre;
    document.querySelector('.kraft__count--sticks').textContent = inventory.sticks;
    document.querySelector('.kraft__count--ironIngot').textContent = inventory.ironIngot;
    document.querySelector('.kraft__count--pickaxe').textContent = inventory.pickaxe;
}
function showMessage(message, isError = false) {
    resultText.textContent = message;
    resultText.style.color = isError ? "red" : "black";
}
async function createElement(itemKey) {
    const item = items[itemKey];
    return new Promise((resolve, reject) => {
        for (const req of item.requiredItems) {
            if (inventory[req] === 0) {
                return reject(`Не хватает ${items[req].name}`);
            }
        }
        showMessage(`Создаётся ${item.name}...`, false);
        setTimeout(() => {
            if (Math.random() < item.failProbability) {
                showMessage(`Не удалось создать ${item.name}!`, true);
                reject();
                return
            }
            for (const req of item.requiredItems) {
                inventory[req]--;
            }
            inventory[itemKey]++;
            updateUI();
            showMessage(`${item.name} успешно создан!`, false);
            resolve();
        }, item.craftingTime);
    });
}
treeCreateButton.addEventListener('click', () => {
    inventory.woods++;
    updateUI();
    showMessage("Добавлено дерево!", false);
});

oreCreateButton.addEventListener('click', () => {
    inventory.ironOre++;
    updateUI();
    showMessage("Добавлена железная руда!", false);
});

stickCreateButton.addEventListener('click', async () => {
    try {
        await createElement('sticks');
    } catch {}
});

ingotCreateButton.addEventListener('click', async () => {
    try {
        await createElement('ironIngot');
    } catch {};
});

kirkaCreateButton.addEventListener('click', async () => {
    try {
        await createElement('pickaxe');
    } catch {}
});
updateUI();
