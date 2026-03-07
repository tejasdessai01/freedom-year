const inputs = {
  targetIncome: document.getElementById('targetIncome'),
  currentAge: document.getElementById('currentAge'),
  currentSavings: document.getElementById('currentSavings'),
  interestRate: document.getElementById('interestRate'),
  monthlySavings: document.getElementById('monthlySavings')
};

const displays = {
  freedomNumber: document.getElementById('freedomNumber'),
  monthlySavings: document.getElementById('disp-monthlySavings'),
  freedomYears: document.getElementById('freedomYears'),
  freedomDate: document.getElementById('freedomDate'),
  freedomAge: document.getElementById('freedomAge')
};

function formatMoneyShort(num) {
  if (num >= 1000000) return '$' + (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return '$' + (num / 1000).toFixed(0) + 'k';
  return '$' + num;
}

function formatMoney(num) {
  return '$' + Number(num).toLocaleString();
}

function update() {
  // 1. Get Values
  const monthlySpend = Number(inputs.targetIncome.value);
  const age = Number(inputs.currentAge.value);
  let nestEgg = Number(inputs.currentSavings.value);
  const rate = Number(inputs.interestRate.value) / 100;
  const monthlyContrib = Number(inputs.monthlySavings.value);

  // 2. The Target (The Goal)
  // 4% Rule: Need 25x annual expenses
  const targetNumber = (monthlySpend * 12) * 25;
  displays.freedomNumber.innerText = formatMoneyShort(targetNumber);
  
  // Update Hero Slider Display
  displays.monthlySavings.innerText = formatMoney(monthlyContrib);

  // 3. The Timeline (The Reality)
  const currentYear = new Date().getFullYear();
  let yearsPassed = 0;
  let reached = false;
  
  // Cap calculation at 100 years to prevent crashes
  while (yearsPassed < 100) {
    if (nestEgg >= targetNumber) {
      reached = true;
      break;
    }
    // Compounding: Add interest + contributions
    const annualGrowth = nestEgg * rate;
    const annualContrib = monthlyContrib * 12;
    nestEgg += annualGrowth + annualContrib;
    yearsPassed++;
  }

  // 4. Render Result
  if (reached) {
    displays.freedomYears.innerText = yearsPassed === 0 ? "Today" : `${yearsPassed} Years`;
    displays.freedomDate.innerText = currentYear + yearsPassed;
    displays.freedomAge.innerText = age + yearsPassed;
  } else {
    displays.freedomYears.innerText = "Never";
    displays.freedomDate.innerText = "—";
    displays.freedomAge.innerText = "—";
  }
}

// Listeners
Object.values(inputs).forEach(el => el.addEventListener('input', update));

// Init
update();
