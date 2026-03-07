// Inputs
const inputs = {
  currentAge: document.getElementById('currentAge'),
  currentSavings: document.getElementById('currentSavings'),
  monthlySavings: document.getElementById('monthlySavings'),
  interestRate: document.getElementById('interestRate'),
  targetIncome: document.getElementById('targetIncome')
};

// Displays
const displays = {
  currentAge: document.getElementById('disp-currentAge'),
  currentSavings: document.getElementById('disp-currentSavings'),
  monthlySavings: document.getElementById('disp-monthlySavings'),
  interestRate: document.getElementById('disp-interestRate'),
  targetIncome: document.getElementById('disp-targetIncome'),
  freedomYear: document.getElementById('freedomYear'),
  freedomAge: document.getElementById('freedomAge'),
  freedomNestEgg: document.getElementById('freedomNestEgg')
};

function formatMoney(num) {
  return '$' + Number(num).toLocaleString();
}

function update() {
  // 1. Get Values
  const age = Number(inputs.currentAge.value);
  let nestEgg = Number(inputs.currentSavings.value);
  const monthly = Number(inputs.monthlySavings.value);
  const rate = Number(inputs.interestRate.value) / 100;
  const targetMonthly = Number(inputs.targetIncome.value);
  
  // 2. Update Input Displays
  displays.currentAge.innerText = age;
  displays.currentSavings.innerText = formatMoney(nestEgg);
  displays.monthlySavings.innerText = formatMoney(monthly);
  displays.interestRate.innerText = (rate * 100).toFixed(1) + '%';
  displays.targetIncome.innerText = formatMoney(targetMonthly);

  // 3. The Freedom Calculation (The 4% Rule)
  // Target Nest Egg = Annual Spend / 0.04
  const targetNestEgg = (targetMonthly * 12) / 0.04;
  
  const currentYear = new Date().getFullYear();
  let yearsPassed = 0;
  
  // Prevent infinite loops if they can never retire
  const MAX_YEARS = 80; 
  let reached = false;

  while (yearsPassed < MAX_YEARS) {
    if (nestEgg >= targetNestEgg) {
      reached = true;
      break;
    }
    // Add annual growth + savings
    const annualGrowth = nestEgg * rate;
    const annualSavings = monthly * 12;
    nestEgg += annualGrowth + annualSavings;
    yearsPassed++;
  }

  // 4. Update Result
  if (reached) {
    displays.freedomYear.innerText = currentYear + yearsPassed;
    displays.freedomAge.innerText = age + yearsPassed;
    displays.freedomNestEgg.innerText = formatMoney(nestEgg);
  } else {
    displays.freedomYear.innerText = "Never";
    displays.freedomAge.innerText = "—";
    displays.freedomNestEgg.innerText = "—";
  }
}

// Attach Listeners
Object.values(inputs).forEach(input => {
  input.addEventListener('input', update);
});

// Init
update();
