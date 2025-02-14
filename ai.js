// DOM Elements
const before = document.getElementById('before');
const liner = document.getElementById('liner');
const commandOutput = document.getElementById('typer');
const textarea = document.getElementById('texter');
const terminal = document.getElementById('terminal');
const cursor = document.getElementById('cursor');

// Global Variables
let isPasswordMode = false;
let isAuthenticated = false;
let commandHistory = [];
let historyIndex = 0;
let currentDirectory = "";

// URLs and Static Data
const github = "https://github.com/avii2312";
const linkedin = "https://www.linkedin.com/in/aviraj-ingle-23av23";
const discord = "https://discord.com/invite/ime_xappu";
const password = "password";
const email = "mailto:avraj.ingle@gmail.com";

const whois = [
    "<br>",
    "Hello, I'm Avraj Ingle!",
    "I like to code and am looking for new opportunities!",
    "<br>"
];

const whoami = [
    "<br>",
    "Visitor.",
    "<br>"
];

const socials = [
    "<br>",
    `github       <a href="${github}" target="_blank">github/avii2312</a>`,
    `linkedin     <a href="${linkedin}" target="_blank">linkedin/aviraj-ingle-23av23</a>`,
    `discord      <a href="${discord}" target="_blank">discord/ime_xappu</a>`,
    `email        <a href="${email}" target="_blank">email/avraj.ingle@gmail.com</a>`,
    "<br>"
];

const secret = [
    "<br>",
    '<span class="command">sudo</span> Only use if you\'re admin.',
    "<br>"
];

const projects = [
    "<br>",
    "Most of my projects are confidential, but only for you, I'll show you my <a href='https://github.com/avii2312' target='_blank'>github/avii2312</a>. Keep it a secret!",
    "<br>"
];

const help = [
    "<br>",
    '<span class="command">whois</span>     Learn about me.',
    '<span class="command">whoami</span>    Who are you?',
    '<span class="command">socials</span>   View my socials.',
    '<span class="command">projects</span>   View my projects.',
    '<span class="command">secret</span>    Find a secret.',
    '<span class="command">history</span>   View command history.',
    '<span class="command">help</span>      Display this help message.',
    '<span class="command">email</span>     Want to email me?',
    '<span class="command">clear</span>     Clear the terminal.',
    '<span class="command">banner</span>    Display the banner.',
    '<span class="command">sudo</span>      Dont use this command.',
    '<span class="command">pwd</span>       Print working directory.',
    "<br>"
];

const banner = [
    '<h1 class="index">Avraj Ingle</h1>',
    '<span class="color2">Welcome to my portfolio!</span>',
    '<span class="color2">Looking for opportunities for my skills!</span>',
    '<span class="color2">Type <span class="command">help</span> to see available commands.</span>',
    "<br>"
];

// Initialize Terminal
textarea.focus();
setTimeout(() => {
    loopLines(banner, "", 80);
    textarea.focus();
}, 100);

// Event Listeners
textarea.addEventListener("input", updateCursorPosition);
textarea.addEventListener("keyup", handleKeyUp);
// window.addEventListener("keyup", handleKeyUp);
// textarea.addEventListener("input", updateCursorPosition);

// Handle Key Events
function handleKeyUp(e) {
    if (e.keyCode === 181) { // Reload page
        document.location.reload(true);
    }

    if (isPasswordMode) {
        handlePasswordInput(e);
    } else {
        handleCommandInput(e);
    }
}

// Handle Password Input
function handlePasswordInput(e) {
    const passwordInput = textarea.value;
    commandOutput.innerHTML = "*".repeat(passwordInput.length);

    if (e.keyCode === 13) { // Enter key
        if (passwordInput === password) {
            isAuthenticated = true;
            loopLines(secret, "color2 margin", 120);
        } else {
            addLine("Really want to know the secret?", "color2 margin", 120);
        }
        resetInput();
        isPasswordMode = false;
        liner.classList.remove("password");
    }
}

// Handle Command Input
function handleCommandInput(e) {
    if (e.keyCode === 13) { // Enter key
        const command = textarea.value.trim();
        commandHistory.push(command);
        historyIndex = commandHistory.length;

        addLine(`visitor@avii.in:~/${currentDirectory} $ ${command}`, "no-animation", 0);
        executeCommand(command.toLowerCase());
        resetInput();
    } else if (e.keyCode === 38 && historyIndex > 0) { // Up arrow
        historyIndex -= 1;
        textarea.value = commandHistory[historyIndex];
        commandOutput.innerHTML = textarea.value;
    } else if (e.keyCode === 40 && historyIndex < commandHistory.length - 1) { // Down arrow
        historyIndex += 1;
        textarea.value = commandHistory[historyIndex] || "";
        commandOutput.innerHTML = textarea.value;
    }
}

// Execute Commands
function executeCommand(cmd) {
    switch (cmd) {
        case "help":
            loopLines(help, "color2 margin", 80);
            break;
        case "whois":
            loopLines(whois, "color2 margin", 80);
            break;
        case "whoami":
            loopLines(whoami, "color2 margin", 80);
            break;
        case "socials":
            loopLines(socials, "color2 margin", 80);
            break;
        case "projects":
            loopLines(projects, "color2 margin", 80);
            break;
        case "clear":
            addLine("Huge mistake, bye bye", "color2 margin", 80);
            setTimeout(function(){ 
                clearLines();
            },3000);
            break;
        case "history":
            addLine("<br>","",0);
            loopLines(commandHistory, "command", 80);
            addLine("<br>", "command", 80 * commandHistory.length+50);
            break;    
        case "sudo":
            addLine("This command is not allowed.", "error", 80);
            setTimeout(function(){ 
                window.open("https://www.youtube.com/watch?v=_2zEqSCD7F4")
            },1000);
            break;
        case "banner":
            loopLines(banner, "color2 margin", 80);
            break;
        case "pwd":
            addLine(currentDirectory || "~", "color2 margin", 80);
            break;
        case "email":
            addLine("Just send me an email, I'll reply ASAP", "color2 margin", 80);
            setTimeout(function(){ 
                window.open("mailto:avraj.ingle@gmail.com");
            },1000);
            break;
        default:
            addLine(`<span class="inherit">Command not found. Type <span class="command">'help'</span> for a list of commands.</span>`, "error", 80);
    }
}

// Reset Input
function resetInput() {
    textarea.value = "";
    commandOutput.innerHTML = "";
    updateCursorPosition();
}

// Add Line to Terminal
function addLine(text, style, time) {
    setTimeout(() => {
        const line = document.createElement("p");
        line.innerHTML = text.replace(/  /g, "&nbsp;&nbsp;");
        line.className = style;
        before.parentNode.insertBefore(line, before);
        window.scrollTo(0, document.body.offsetHeight);
    }, time);
}

// Loop Lines with Delay
function loopLines(lines, style, time) {
    lines.forEach((line, index) => {
        addLine(line, style, index * time);
    });
}

// Clear Terminal Lines
function clearLines() {
    terminal.innerHTML = '<p id="before"></p>';
    before = document.getElementById('before');
}

// Update Cursor Position
function updateCursorPosition() {
    const textBeforeCursor = textarea.value.substring(0, textarea.selectionStart);
    const tempSpan = document.createElement('span');
    tempSpan.style.whiteSpace = 'pre-wrap';
    tempSpan.textContent = textBeforeCursor;
    document.body.appendChild(tempSpan);
    const width = tempSpan.offsetWidth;
    document.body.removeChild(tempSpan);
    cursor.style.left = `${width}px`;
}