/* ---------- Login Functionality ---------- */
function login() {
    // Set valid credentials
    const validUsername = "naman";
    const validPassword = "pass123";
  
    // Get user inputs
    const usernameInput = document.getElementById("username").value.trim();
    const passwordInput = document.getElementById("password").value.trim();
    const errorMessage = document.getElementById("errorMessage");
  
    if (!usernameInput || !passwordInput) {
        errorMessage.textContent = "Please enter both username and password.";
        return;
    }
  
    if (usernameInput === validUsername && passwordInput === validPassword) {
        // Successful login: hide login modal and show main content
        document.getElementById("loginModal").style.display = "none";
        document.getElementById("mainContent").style.display = "block";
    } else {
        errorMessage.textContent = "Invalid username or password.";
    }
}
  
/* ---------- Poll Functionality ---------- */
let selectedPollOption = null;
  
function selectPollOption(element) {
    const options = document.querySelectorAll("#poll .option");
    options.forEach(opt => opt.classList.remove("selected"));
    element.classList.add("selected");
    selectedPollOption = element.textContent;
}
  
function submitPoll() {
    if (!selectedPollOption) {
        alert("Please select an option!");
        return;
    }
    // Store results in localStorage
    const results = JSON.parse(localStorage.getItem("pollResults")) || {};
    results[selectedPollOption] = (results[selectedPollOption] || 0) + 1;
    localStorage.setItem("pollResults", JSON.stringify(results));
    displayPollResults();
}
  
function displayPollResults() {
    const results = JSON.parse(localStorage.getItem("pollResults")) || {};
    const totalVotes = Object.values(results).reduce((a, b) => a + b, 0);
    const resultContainer = document.getElementById("pollResult");
    resultContainer.innerHTML = "<h3>Results:</h3>";
    
    for (const [option, votes] of Object.entries(results)) {
        const percentage = totalVotes ? ((votes / totalVotes) * 100).toFixed(1) : 0;
        resultContainer.innerHTML += `
            <div>${option}: ${votes} vote(s) (${percentage}%)</div>
            <div class="progress-bar">
                <div class="progress" style="width: ${percentage}%"></div>
            </div>
        `;
    }
}
  
/* ---------- Quiz Functionality ---------- */
const quizQuestions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language"
        ],
        answer: 0
    },
    {
        question: "Which language runs in a web browser?",
        options: [
            "Java",
            "C",
            "JavaScript"
        ],
        answer: 2
    }
];
  
let currentQuizQuestion = 0;
let quizScore = 0;
let quizAnswered = false;
  
function showQuizQuestion() {
    quizAnswered = false;
    const questionObj = quizQuestions[currentQuizQuestion];
    document.getElementById("quizQuestion").textContent = questionObj.question;
    const optionsContainer = document.getElementById("quizOptions");
    optionsContainer.innerHTML = "";
    questionObj.options.forEach((option, index) => {
        const optionDiv = document.createElement("div");
        optionDiv.className = "option";
        optionDiv.textContent = option;
        optionDiv.onclick = () => selectQuizOption(optionDiv, index);
        optionsContainer.appendChild(optionDiv);
    });
}
  
function selectQuizOption(optionElement, selectedIndex) {
    if (quizAnswered) return;
    quizAnswered = true;
    const options = document.querySelectorAll("#quiz .option");
    options.forEach(opt => opt.classList.remove("selected"));
    optionElement.classList.add("selected");
    checkQuizAnswer(selectedIndex);
}
  
function checkQuizAnswer(selectedIndex) {
    const correctIndex = quizQuestions[currentQuizQuestion].answer;
    if (selectedIndex === correctIndex) {
        quizScore++;
    }
}
  
function nextQuestion() {
    currentQuizQuestion++;
    if (currentQuizQuestion < quizQuestions.length) {
        showQuizQuestion();
    } else {
        displayQuizResults();
    }
}
  
function displayQuizResults() {
    document.getElementById("quizQuestion").textContent = "Quiz Completed!";
    document.getElementById("quizOptions").innerHTML = "";
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("quizResult").textContent = `Your Score: ${quizScore} / ${quizQuestions.length}`;
}
  
/* ---------- Navigation for Poll & Quiz Sections ---------- */
function showSection(sectionId) {
    document.querySelectorAll(".card").forEach(card => {
        card.classList.remove("active");
    });
    document.getElementById(sectionId).classList.add("active");
}
  
// Initialize main components
displayPollResults();
showQuizQuestion();
