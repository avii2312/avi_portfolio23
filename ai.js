// terminal.js
document.addEventListener('DOMContentLoaded', () => {
  const outputEl = document.getElementById('output');
  const cmdInput = document.getElementById('cmd');
  const typedEl = document.getElementById('typed');
  const cursorEl = document.getElementById('cursor');

  const state = {
    history: [],
    histIndex: 0,
    isPwdMode: false,
    authenticated: false,
  };

  const DATA = {
    password: 'password',
    banner: [
      '<h1 class="command">Avraj Ingle</h1>',
      '<p class="success">Welcome to my portfolio!</p>',
      '<p class="success">Type <span class="command">help</span> for commands.</p>',
      '<br>'
    ],
    help: [
      '<p><span class="command">whois</span>     — About me</p>',
      '<p><span class="command">whoami</span>    — Who are you?</p>',
      '<p><span class="command">socials</span>   — My social links</p>',
      '<p><span class="command">projects</span>  — My projects</p>',
      '<p><span class="command">secret</span>    — Admin only</p>',
      '<p><span class="command">history</span>   — Command history</p>',
      '<p><span class="command">clear</span>     — Clear screen</p>',
      '<p><span class="command">banner</span>    — Show banner</p>',
      '<p><span class="command">sudo</span>      — ??</p>',
      '<br>'
    ],
    whois: [
      '<p>Hello, I\'m Avraj Ingle!</p>',
      '<p>I love coding and I\'m open to opportunities.</p>',
      '<br>'
    ],
    whoami: ['<p>You are a curious visitor.</p>', '<br>'],
    socials: [
      `<p>GitHub: <a class="link" href="https://github.com/avii2312" target="_blank">avii2312</a></p>`,
      `<p>LinkedIn: <a class="link" href="https://linkedin.com/in/aviraj-ingle-23av23" target="_blank">aviraj-ingle-23av23</a></p>`,
      `<p>Discord: <a class="link" href="https://discord.com/invite/ime_xappu" target="_blank">ime_xappu</a></p>`,
      `<p>Email: <a class="link" href="mailto:avraj.ingle@gmail.com">avraj.ingle@gmail.com</a></p>`,
      '<br>'
    ],
    projects: [
      '<p>Most are private, but here’s my <a class="link" href="https://github.com/avii2312" target="_blank">GitHub</a>.</p>',
      '<br>'
    ],
    secret: [
      '<p class="error">Admin only: sudo unlocks everything...</p>',
      '<br>'
    ]
  };

  /** Prints lines with a typing effect */
  async function printLines(lines, delay = 50) {
    for (const line of lines) {
      const p = document.createElement('p');
      p.innerHTML = line;
      outputEl.appendChild(p);
      await new Promise(res => setTimeout(res, delay));
      outputEl.scrollTop = outputEl.scrollHeight;
    }
  }

  /** Handles an entered command */
  async function handleCommand(cmd) {
    state.history.push(cmd);
    state.histIndex = state.history.length;
    appendLine(`<span class="prompt">visitor@avii.in:~$</span> ${cmd}`, '');

    if (state.isPwdMode) {
      if (cmd === DATA.password) {
        state.authenticated = true;
        await printLines(DATA.secret, 100);
      } else {
        appendLine('<p class="error">Wrong password!</p>');
      }
      state.isPwdMode = false;
      return;
    }

    switch (cmd) {
      case 'help':     await printLines(DATA.help);      break;
      case 'banner':   await printLines(DATA.banner);    break;
      case 'whois':    await printLines(DATA.whois);     break;
      case 'whoami':   await printLines(DATA.whoami);    break;
      case 'socials':  await printLines(DATA.socials);   break;
      case 'projects': await printLines(DATA.projects);  break;
      case 'secret':
        state.isPwdMode = true;
        appendLine('<p class="success">Enter password:</p>');
        break;
      case 'history':
        DATA.history = state.history.map((c,i) => `<p>${i+1}. ${c}</p>`);
        await printLines(DATA.history); break;
      case 'clear':
        outputEl.innerHTML = '';
        break;
      case 'sudo':
        appendLine('<p class="error">Permission denied: with little power comes... no responsibility.</p>');
        break;
      default:
        appendLine(`<p class="error">Command not found: <code>${cmd}</code>. Type 'help'.</p>`);
    }
  }

  /** Appends a raw HTML line immediately */
  function appendLine(html) {
    const p = document.createElement('p');
    p.innerHTML = html;
    outputEl.appendChild(p);
    outputEl.scrollTop = outputEl.scrollHeight;
  }

  // INITIALIZE
  printLines(DATA.banner, 100);

  // EVENT: key input
  cmdInput.addEventListener('input', () => {
    typedEl.textContent = cmdInput.value;
    cursorEl.style.left = `${typedEl.offsetWidth}px`;
  });

  cmdInput.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
      const cmd = cmdInput.value.trim();
      cmdInput.value = '';
      typedEl.textContent = '';
      await handleCommand(cmd.toLowerCase());
    }
    if (e.key === 'ArrowUp' && state.histIndex > 0) {
      state.histIndex--;
      cmdInput.value = state.history[state.histIndex] || '';
      typedEl.textContent = cmdInput.value;
      cursorEl.style.left = `${typedEl.offsetWidth}px`;
      e.preventDefault();
    }
    if (e.key === 'ArrowDown' && state.histIndex < state.history.length - 1) {
      state.histIndex++;
      cmdInput.value = state.history[state.histIndex] || '';
      typedEl.textContent = cmdInput.value;
      cursorEl.style.left = `${typedEl.offsetWidth}px`;
      e.preventDefault();
    }
  });

  // FOCUS hack: clicking anywhere focuses the hidden input
  document.getElementById('terminal').addEventListener('click', () => {
    cmdInput.focus();
  });
});
