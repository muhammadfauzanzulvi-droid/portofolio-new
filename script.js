// ---- Typing terminal effect ----
  const lines = [
    {p:'$ ', c:'nama saya ', out:'> <strong>M.FAUZAN</strong>'},
    {p:'$ ', c:'saya adalah seorang', out:'> Mahasiswa Teknik Informatika'},
    {p:'$ ', c:'bidang yang saya minati', out:'> Web Development · IoT'},
    {p:'$ ', c:'contact', out:'> email · linkedin · github'}
  ];
  const term = document.getElementById('typedTerminal');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function renderStatic(){
    term.innerHTML = lines.map(l =>
      `<div><span class="prompt">${l.p}</span><span class="cmd">${l.c}</span></div><div class="out">${l.out}</div>`
    ).join('');
  }

  async function typeLine(el, prompt, cmd){
    const line = document.createElement('div');
    const promptSpan = document.createElement('span');
    promptSpan.className = 'prompt';
    promptSpan.textContent = prompt;
    const cmdSpan = document.createElement('span');
    cmdSpan.className = 'cmd';
    line.appendChild(promptSpan);
    line.appendChild(cmdSpan);
    el.appendChild(line);
    for(let i=0;i<cmd.length;i++){
      cmdSpan.textContent += cmd[i];
      await new Promise(r => setTimeout(r, 22));
    }
  }

  async function runTyping(){
    for(const l of lines){
      await typeLine(term, l.p, l.c);
      await new Promise(r => setTimeout(r, 180));
      const out = document.createElement('div');
      out.className = 'out';
      out.innerHTML = l.out;
      term.appendChild(out);
      await new Promise(r => setTimeout(r, 220));
    }
    const cursor = document.createElement('span');
    cursor.className = 'cursor-blink';
    term.appendChild(cursor);
  }

  if(reduceMotion){ renderStatic(); } else { runTyping(); }

  // ---- Mobile nav toggle ----
  const sidebar = document.getElementById('sidebar');
  const mobileToggle = document.getElementById('mobileToggle');
  mobileToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
  document.querySelectorAll('.file-item').forEach(item => {
    item.addEventListener('click', () => sidebar.classList.remove('open'));
  });

  // ---- Active section highlight (sidebar + tabbar) ----
  const sections = document.querySelectorAll('main section[id]');
  const fileItems = document.querySelectorAll('.file-item');
  const tabs = document.querySelectorAll('.tab');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const id = entry.target.id;
        fileItems.forEach(f => f.classList.toggle('active', f.dataset.section === id));
        tabs.forEach(t => t.classList.toggle('active', t.dataset.section === id));
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

  sections.forEach(s => observer.observe(s));

  // ---- Skill bar fill on scroll into view ----
  const bars = document.querySelectorAll('.bar-fill');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.style.width = entry.target.dataset.width + '%';
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  bars.forEach(b => barObserver.observe(b));
