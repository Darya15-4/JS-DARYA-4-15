
function showError(message) {
  const errorDisplay = document.getElementById('error-display');
  errorDisplay.style.display = 'block';
  errorDisplay.style.backgroundColor = '#fdd';
  errorDisplay.style.color = '#900';
  errorDisplay.style.padding = '10px';
  errorDisplay.style.margin = '10px';
  errorDisplay.style.border = '1px solid #900';
  errorDisplay.textContent = message;
  setTimeout(() => {
    errorDisplay.textContent = '';
    errorDisplay.style.display = 'none';
  }, 3000);
}
class VersionManager {
  constructor(version = '0.0.1') {
    this.history = [];
    this.setVersion(version);
  }

  setVersion(version) {
    if (!/^(\d+)\.(\d+)\.(\d+)$/.test(version)) {
      throw new Error("Некорректный формат версии!");
    }
    const [major, minor, patch] = version.split('.').map(Number);
    this.version = { major, minor, patch };
    this.history.push({ ...this.version });
  }

  major() {
    this.version.major++;
    this.version.minor = 0;
    this.version.patch = 0;
    this.history.push({ ...this.version });
    return this;
  }

  minor() {
    this.version.minor++;
    this.version.patch = 0;
    this.history.push({ ...this.version });
    return this;
  }

  patch() {
    this.version.patch++;
    this.history.push({ ...this.version });
    return this;
  }

  rollback() {
    if (this.history.length <= 1) {
      throw new Error("Невозможно выполнить откат!");
    }
    this.history.pop();
    this.version = this.history[this.history.length - 1];
    return this;
  }

  release() {
    return `${this.version.major}.${this.version.minor}.${this.version.patch}`;
  }
}

let versionManager = null;

document.getElementById('create-version-btn').addEventListener('click', () => {
  const input = document.getElementById('version-input').value.trim();
  try {
    versionManager = new VersionManager(input || '0.0.1');
    document.getElementById('version-display').textContent = versionManager.release();
    document.getElementById('version-input').value = '';
  } catch (e) {
    showError(e.message);
  }
});

document.getElementById('major-btn').addEventListener('click', () => {
  try {
    versionManager.major();
    document.getElementById('version-display').textContent = versionManager.release();
  } catch (e) {
    showError(e.message);
  }
});

document.getElementById('minor-btn').addEventListener('click', () => {
  try {
    versionManager.minor();
    document.getElementById('version-display').textContent = versionManager.release();
  } catch (e) {
    showError(e.message);
  }
});

document.getElementById('patch-btn').addEventListener('click', () => {
  try {
    versionManager.patch();
    document.getElementById('version-display').textContent = versionManager.release();
  } catch (e) {
    showError(e.message);
  }
});

document.getElementById('rollback-btn').addEventListener('click', () => {
  try {
    versionManager.rollback();
    document.getElementById('version-display').textContent = versionManager.release();
  } catch (e) {
    showError(e.message);
  }
});
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }

  perimeter() {
    return 2 * (this.width + this.height);
  }
}

class Square extends Rectangle {
  constructor(side) {
    super(side, side);
  }
}

document.getElementById('calculate-rect-btn').addEventListener('click', () => {
  const width = Number(document.getElementById('width').value);
  const height = Number(document.getElementById('height').value);
  let shape;
  if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
    showError("Введите корректные значения!");
    return;
  }
  if (width === height) {
    shape = new Square(width);
  } else {
    shape = new Rectangle(width, height);
  }
  document.getElementById('rectangle-info').innerHTML = `
    Площадь: ${shape.area()}<br>
    Периметр: ${shape.perimeter()}
  `;
});

class Temperature {
  constructor(celsius) {
    this.setTemperature(celsius);
  }

  setTemperature(celsius) {
    if (celsius < -273.16 || celsius > 1.41e32) {
      throw new Error('Некорректное значение температуры');
    }
    this._celsius = celsius;
  }

  get celsius() {
    return this._celsius;
  }

  toCelsius() {
    return this._celsius.toFixed(2);
  }

  toKelvin() {
    return (this._celsius + 273.15).toFixed(2);
  }

  toFahrenheit() {
    return (this._celsius * 9 / 5 + 32).toFixed(2);
  }

  static add(temp1, temp2) {
    if (!(temp1 instanceof Temperature) || !(temp2 instanceof Temperature)) {
      throw new Error('Ожидаются экземпляры класса Temperature');
    }
    return new Temperature(temp1.celsius + temp2.celsius);
  }

  static subtract(temp1, temp2) {
    if (!(temp1 instanceof Temperature) || !(temp2 instanceof Temperature)) {
      throw new Error('Ожидаются экземпляры класса Temperature');
    }
    return new Temperature(temp1.celsius - temp2.celsius);
  }

  toString(unit = 'C') {
    switch (unit) {
      case 'K': {
        return `${this.toKelvin()} K`;
      }
      case 'F': {
        return `${this.toFahrenheit()} °F`;
      }
      default: {
        return `${this.toCelsius()} °C`;
      }
    }
  }
}

function updateTemperatureDisplays() {
  const unit = document.querySelector('input[name="unit"]:checked').value;
  const temp1Input = document.getElementById('temp1').value;
  const temp2Input = document.getElementById('temp2').value;
  try {
    if (temp1Input !== "") {
      const temp1 = new Temperature(Number(temp1Input));
      document.getElementById('temp1-display').textContent = temp1.toString(unit);
    } else {
      document.getElementById('temp1-display').textContent = "";
    }
    if (temp2Input !== "") {
      const temp2 = new Temperature(Number(temp2Input));
      document.getElementById('temp2-display').textContent = temp2.toString(unit);
    } else {
      document.getElementById('temp2-display').textContent = "";
    }
  } catch (e) {
    showError(e.message);
  }
}

document.getElementById('temp1').addEventListener('input', updateTemperatureDisplays);
document.getElementById('temp2').addEventListener('input', updateTemperatureDisplays);
document.querySelectorAll('input[name="unit"]').forEach((radio) => {
  radio.addEventListener('change', updateTemperatureDisplays);
});

document.getElementById('add-temp-btn').addEventListener('click', () => {
  const unit = document.querySelector('input[name="unit"]:checked').value;
  const temp1Input = document.getElementById('temp1').value;
  const temp2Input = document.getElementById('temp2').value;
  if (temp1Input === "" || temp2Input === "") {
    showError("Введите оба значения температуры!");
    return;
  }
  try {
    const result = Temperature.add(new Temperature(Number(temp1Input)), new Temperature(Number(temp2Input)));
    document.getElementById('temp-result').textContent = `Сумма: ${result.toString(unit)}`;
  } catch (e) {
    showError(e.message);
  }
});

document.getElementById('subtract-temp-btn').addEventListener('click', () => {
  const unit = document.querySelector('input[name="unit"]:checked').value;
  const temp1Input = document.getElementById('temp1').value;
  const temp2Input = document.getElementById('temp2').value;
  if (temp1Input === "" || temp2Input === "") {
    showError("Введите оба значения температуры!");
    return;
  }
  try {
    const result = Temperature.subtract(new Temperature(Number(temp1Input)), new Temperature(Number(temp2Input)));
    document.getElementById('temp-result').textContent = `Разность: ${result.toString(unit)}`;
  } catch (e) {
    showError(e.message);
  }
});
class RpsGame {
  constructor() {
    this.history = [];
    this.playerStats = { player1: 0, player2: 0 };
  }

  addRound(player1Choice, player2Choice) {
    this.history.push({ player1: player1Choice, player2: player2Choice });
    this.updateStats(player1Choice, player2Choice);
  }

  updateStats(player1Choice, player2Choice) {
    if (player1Choice === player2Choice) {
      return;
    }
    if ((player1Choice === 'Камень' && player2Choice === 'Ножницы') ||
        (player1Choice === 'Ножницы' && player2Choice === 'Бумага') ||
        (player1Choice === 'Бумага' && player2Choice === 'Камень')) {
      this.playerStats.player1++;
    } else {
      this.playerStats.player2++;
    }
  }
}

const rpsGame = new RpsGame();
let eventSource = null;

document.getElementById('start-game-btn').addEventListener('click', () => {
  if (eventSource && eventSource.readyState !== EventSource.CLOSED) {
    return;
  }
  eventSource = new EventSource('http://194.67.93.117:80/rps/stream');
  eventSource.addEventListener('round', (event) => {
    const roundData = JSON.parse(event.data);
    rpsGame.addRound(roundData.player1, roundData.player2);
    document.getElementById('game-history').innerHTML =
      rpsGame.history.map((round) => `<p>${round.player1} vs ${round.player2}</p>`).join('');
    document.getElementById('game-stats').textContent =
      `Победы: Игрок 1 — ${rpsGame.playerStats.player1}, Игрок 2 — ${rpsGame.playerStats.player2}`;
  });

  eventSource.onerror = (err) => {
    console.error("Ошибка SSE:", err);
    showError("Ошибка соединения с сервером!");
  };
});

document.getElementById('stop-game-btn').addEventListener('click', () => {
  if (eventSource) {
    eventSource.close();
    eventSource = null;
    console.log('Игра остановлена');
  }
});
