const exprEl = document.getElementById('expr');
const resEl = document.getElementById('result');
let expression = '';
let result = '0';

function updateDisplay() {
  exprEl.textContent = expression || '0';
  resEl.textContent = result;
}

function insertToken(tok) {
  expression += tok;
  liveEvaluate();
  updateDisplay();
}

function liveEvaluate() {
  try {
    result = eval(expression) || '0';
  } catch {
    result = '0';
  }
}

document.querySelectorAll('.key').forEach(k => {
  k.addEventListener('click', () => {
    const key = k.dataset.key;
    const act = k.dataset.act;
    if (key) {
      insertToken(key);
    } else if (act === 'eq') {
      expression = result.toString();
      updateDisplay();
    } else if (act === 'clear') {
      expression = '';
      result = '0';
      updateDisplay();
    } else if (act === 'del') {
      expression = expression.slice(0, -1);
      liveEvaluate();
      updateDisplay();
    } else if (act === 'neg') {
      if (expression) expression = (-eval(expression)).toString();
      updateDisplay();
    }
  });
});

updateDisplay();