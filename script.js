// Initialize the knowledge counter and auto-increment rate
let knowledge = 0;
let autoIncrementRate = 0; // Rate of knowledge gain per second
let createEnglishCount = 0; // Track how many times "Create English" is purchased

// Function to increase knowledge by clicking
function increaseKnowledge() {
  knowledge++;
  updateKnowledgeDisplay();
  checkForMilestones();
}

// Function to update the knowledge display
function updateKnowledgeDisplay() {
  const knowledgeElement = document.getElementById('knowledge');
  const autoIncrementRateElement = document.getElementById('auto-increment-rate');
  if (knowledgeElement) {
    knowledgeElement.textContent = knowledge.toFixed(1);
  }
  if (autoIncrementRateElement) {
    autoIncrementRateElement.textContent = autoIncrementRate > 0 ? `+${autoIncrementRate.toFixed(1)}know/1s` : '';
  }
}

// Function to check for milestones
function checkForMilestones() {
  // Show "Create English" button when knowledge reaches 50
  if (knowledge >= 50 && !document.getElementById('create-english-button')) {
    showCreateEnglishButton();
  }
}

// Function to show the "Create English" button
function showCreateEnglishButton() {
  const buttonContainer = document.getElementById('button-container');
  if (buttonContainer) {
    const createEnglishButton = document.createElement('button');
    createEnglishButton.id = 'create-english-button';
    createEnglishButton.className = 'clicker-button';
    createEnglishButton.textContent = 'Create English (50 knowledge)';
    createEnglishButton.onclick = purchaseAutoIncrement;
    buttonContainer.appendChild(createEnglishButton);
  }
}

// Function to purchase auto-increment (Create English)
function purchaseAutoIncrement() {
  if (knowledge >= 50) {
    knowledge -= 50; // Deduct the cost
    createEnglishCount++; // Increment the purchase count

    // Adjust auto-increment rate based on purchase count
    if (createEnglishCount === 3) {
      autoIncrementRate = 0.2; // Upgrade to +0.2know/1s
    } else {
      autoIncrementRate = 0.1 * createEnglishCount; // +0.1 for each purchase
    }

    startAutoIncrement(); // Start the auto-increment
    updateKnowledgeDisplay();
  } else {
    alert('Not enough knowledge to purchase!');
  }
}

// Function to start auto-increment
function startAutoIncrement() {
  if (!this.autoIncrementInterval) {
    this.autoIncrementInterval = setInterval(() => {
      knowledge += autoIncrementRate;
      updateKnowledgeDisplay();
    }, 1000); // Increment every 1 second
  }
}