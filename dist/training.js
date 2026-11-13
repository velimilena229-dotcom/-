const LAB_NAME = '青年思辨训练场';
const LEARN_NAME = '用原理观现实';
const NEWS_NAME = '法治视角读新闻';
const QUIZ_NAME = '原理应用自测';

function casePhoto(id, alt) {
  return `<figure class="training-photo"><img src="./assets/case-${id}.jpg" alt="${esc(alt)}" decoding="async" loading="lazy"></figure>`;
}

function trainingPhoto(key, className = '') {
  const photo = TRAINING_PHOTOS[key];
  const source = 'https://commons.wikimedia.org/wiki/' + encodeURIComponent(photo.source.replaceAll(' ', '_'));
  return `<figure class="training-photo ${className}"><img src="./assets/${photo.file}" alt="${esc(photo.alt)}" decoding="async"><figcaption>${esc(photo.note)} · <a href="${source}" target="_blank" rel="noopener noreferrer">${esc(photo.author)} ↗</a> · <a href="https://creativecommons.org/${photo.terms}" target="_blank" rel="noopener noreferrer">${photo.license}</a> · 缩放展示</figcaption></figure>`;
}

function trainingCrumbs(title, parent, parentHref) {
  return [{ label: '首页', href: '#home' }, ...(parent ? [{ label: parent, href: parentHref }] : []), { label: title }];
}

function renderTrainingHome() {
  app.innerHTML = `<section class="home-minimal">
    <div class="home-positioning"><span>面向重度依赖 AI 的青年人的自主思考训练平台</span><p>先独立思考，再借助工具。</p></div><div class="home-hero-group">
      <div class="home-heading home-statement"><h1><b>以原理观现实</b><i aria-hidden="true">·</i><b>以法治见真知</b></h1></div>
      <div class="home-theory-layer">
        <a class="home-choice theory-choice" href="#theory" data-theory-entry><div class="choice-copy"><small>新闻与政策 · 带着问题阅读</small><h2>法治视角读新闻</h2><p>先提出问题，再核对材料，形成有依据的判断。</p></div><span>进入阅读 <i aria-hidden="true">→</i></span></a>
      </div>
    </div>
    <div class="home-choices home-secondary-choices">
      <a class="home-choice lab-choice" href="#lab" data-lab-entry><img class="choice-art library-home-art" src="./assets/home-library-lineart-v1.jpg" alt="" aria-hidden="true"><div class="choice-copy"><small>现实议题与公共表达</small><h2>青年思辨训练场</h2><p>真实案例 · 问思训练 · 今日一辩</p></div><span>进入训练场 →</span></a>
      <a class="home-choice learn-choice" href="#learn"><img class="choice-art" src="./assets/home-marx-engels-lineart-v1.jpg" alt="" aria-hidden="true"><div class="choice-copy"><small>原理理解与现实应用</small><h2>用原理观现实</h2><p>知行图谱 · 概念卡牌 · 原理自测</p></div><span>进入学习 →</span></a>
    </div>
  </section>`;
  document.title = '明理·法观';
}

function renderTrainingLab() {
  const entries = [
    { href: '#practice', art: 'lab-case-v2.png', title: '法治实践·案例分析', text: '先想问题，再读案情，循着分析路径核对结论。', meta: '真实案例 · 法治观察' },
    { href: '#xiezhi', art: 'xiezhi-asset-v1.png', title: '獬豸问思局', text: '抽词查阅，三分钟口述；可请獬豸给出表达建议。', meta: '热词抽签 · 语音陪练' },
    { href: '#debate', art: 'lab-debate-v2.png', title: '今日一辩', text: '抽取青年公共议题，一次展开事实依据与参考分析框架。', meta: '独立思考 · 六层分析' }
  ];
  app.innerHTML = `<section class="level-choice-page lab-hub">${locationBar('#home', '返回首页', [{ label: '首页', href: '#home' }, { label: '青年思辨训练场' }])}<div class="lab-hub-title"><span>青年思辨训练场</span><p>以习近平法治思想为主线，分析网络公共议题；看见事实，形成有依据的判断。</p></div><div class="level-choice-grid lab-levels">${entries.map((entry, index) => `<a class="level-feature-card lab-feature-card lab-feature-${index + 1}" href="${entry.href}"><img class="lab-card-art" src="./assets/${entry.art}" alt="" aria-hidden="true"><div><small>${entry.meta}</small><b>${entry.title}</b><p>${entry.text}</p></div><i>开始训练 →</i></a>`).join('')}</div></section>`;
  document.title = '青年思辨训练场｜明理·法观';
}
function renderTrainingLearn() {
  const entries = [
    { href: '#map', mark: '图', title: '知行图谱', text: '循着章节理解知识，用原理辨认现实问题。', meta: '章节框架 · 知识精讲', style: 'map-entry' },
    { href: '#concepts', mark: '理', title: '马原概念卡', text: '先试着解释，再翻牌核对，让概念真正成为自己的工具。', meta: '随机抽牌 · 翻面释义', style: 'concept-entry' },
    { href: '#final-practice', mark: '测', title: QUIZ_NAME, text: '五题一组检验理解，回看错题和分析思路。', meta: '理解检测 · 错题复盘', style: 'quiz-entry' }
  ];
  app.innerHTML = `<section class="level-choice-page learn-hub">${locationBar('#home', '返回首页', trainingCrumbs(LEARN_NAME))}<p class="book-edition">依据《马克思主义基本原理（2023年版）》梳理</p><div class="level-choice-grid learn-levels three-way">${entries.map(entry => `<a class="level-feature-card ${entry.style}" href="${entry.href}"><span class="level-card-mark" aria-hidden="true">${entry.mark}</span><div><small>${entry.meta}</small><b>${entry.title}</b><p>${entry.text}</p></div><i>进入学习 →</i></a>`).join('')}</div></section>`;
  document.title = LEARN_NAME + '｜明理·法观';
}

function renderTrainingPractice() {
  const topics = [...new Set(SITE_DATA.cases.map(item => item.topic))];
  app.innerHTML = `<section class="training-wrap practice-directory">
    ${locationBar('#lab', '返回训练场', trainingCrumbs('法治实践', LAB_NAME, '#lab'))}
    <header class="training-heading"><h1>法治实践</h1><p>先带着问题看事实，再练习判断规则如何适用。结尾可以核对官方处理结果。</p></header>
    ${topics.map(topic => `<section class="practice-theme"><h2>${esc(topic)}</h2><div class="practice-case-grid">${SITE_DATA.cases.filter(item => item.topic === topic).map(item => {
      const [photo, question] = CASE_TRAINING[item.id];
      return `<article class="practice-case-entry">${casePhoto(item.id, photo)}<div><small>${esc(item.org)} · ${esc(item.year)}</small><h3><a href="#case/${item.id}">${esc(item.title)}</a></h3><p>${esc(question)}</p><a class="training-text-link" href="#case/${item.id}">打开案卷 ↗</a></div></article>`;
    }).join('')}</div></section>`).join('')}
  </section>`;
  document.title = '法治实践｜明理·法观';
}

function renderTrainingCase(id) {
  const item = caseBy(id);
  if (!item) return renderTrainingPractice();
  const detail = CASE_DETAILS[id];
  const [photo, question] = CASE_TRAINING[id];
  const next = SITE_DATA.cases[(SITE_DATA.cases.indexOf(item) + 1) % SITE_DATA.cases.length];
  app.innerHTML = `<section class="training-wrap training-case">
    ${locationBar('#practice', '返回案卷目录', trainingCrumbs(item.topic, '法治实践', '#practice'))}
    <header class="training-heading"><p class="training-kicker">${esc(item.org)} · ${esc(CASE_SOURCE_DATES[id] || item.year)}</p><h1>${esc(item.title)}</h1></header>
    <div class="case-workspace"><div class="case-steps">
      <section class="case-question-box"><p class="training-kicker">先想一想</p><h2>${esc(question)}</h2><label for="case-first-idea">先用一句话说出你会查什么</label><textarea rows="2" maxlength="500" id="case-first-idea" placeholder="我会先查……"></textarea><button type="button" class="training-button" data-case-open>带着问题查看案情 ↓</button></section>
      <div class="case-reveal" hidden tabindex="-1">
        <section><p class="training-kicker">官方材料 · 本站摘要</p><h2>案件经过</h2><div class="case-timeline">${detail.timeline.map(([time, copy]) => `<div><b>${esc(time)}</b><p>${esc(copy)}</p></div>`).join('')}</div><button class="training-secondary" type="button" data-case-step="case-reasoning">查看分析思路 ↓</button></section>
        <section id="case-reasoning" hidden tabindex="-1"><p class="training-kicker">本站教学分析</p><h2>把事实和规则连起来</h2><div class="case-method-grid">${detail.method.map(([name, copy]) => `<article><h3>${esc(name)}</h3><p>${esc(copy)}</p></article>`).join('')}</div><p>${esc(item.thought)}</p><details><summary>${esc(detail.prompt)}</summary><p>${esc(detail.answerPoints)}</p></details><button class="training-secondary" type="button" data-case-step="case-outcome">核对官方结论 ↓</button></section>
        <section id="case-outcome" hidden tabindex="-1"><p class="training-kicker">官方处理 · 本站摘要</p><h2>核对最终结论</h2><p>${esc(detail.officialResult)}</p><p>${esc(detail.officialMeaning)}</p><div class="case-end-links"><a class="training-text-link" href="${item.source}" target="_blank" rel="noopener noreferrer">阅读权威原文 ↗</a><a class="training-text-link" href="#case/${next.id}">查看下一案 →</a></div></section>
      </div>
    </div><aside class="case-photo-side">${casePhoto(id, photo)}<p>场景实拍，非案发现场。</p><p>${esc(detail.officialType)} · <a href="${item.source}" target="_blank" rel="noopener noreferrer">核查官方出处 ↗</a></p></aside></div>
  </section>`;
  document.querySelector('[data-case-open]').addEventListener('click', event => {
    const reveal = document.querySelector('.case-reveal');
    reveal.hidden = false;
    event.currentTarget.textContent = '查看案件经过 ↓';
    reveal.focus({ preventScroll: true });
    reveal.scrollIntoView({ block: 'nearest', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  });
  document.querySelectorAll('[data-case-step]').forEach(button => button.addEventListener('click', () => {
    const target = document.getElementById(button.dataset.caseStep);
    target.hidden = false;
    target.focus({ preventScroll: true });
    target.scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }));
  document.title = item.title + '｜明理·法观';
}

let conceptSelection = null;
let conceptDrawTimer = null;
function conceptCards() { return CONCEPT_TERMS; }
function renderConcepts() {
  const cards = conceptCards();
  app.innerHTML = `<section class="training-wrap concept-page">${locationBar('#learn','返回用原理观现实',trainingCrumbs('马原概念卡',LEARN_NAME,'#learn'))}
  <div class="concept-board concept-game">
    <header class="concept-game-head"><div><h1>马原概念卡</h1><p>抽一张卡，先用自己的话解释，再翻牌核对。</p></div><span>${cards.length} 张 · 导论及七章</span></header>
    <div class="concept-table"><div class="concept-stack" data-concept-stack><div class="concept-turner"><button type="button" class="concept-face concept-front" data-concept-flip><span data-concept-chapter>明理 · 法观</span><small data-concept-question>从一个概念开始</small><b data-concept-title>思考，自有其理</b><p>先想一想，你会怎样解释？</p><em>点击抽牌</em></button><section class="concept-face concept-back" aria-hidden="true" inert><span>教材语境 · 本站概括</span><div class="concept-definition" data-concept-definition></div><button type="button" data-concept-unflip>翻回问题 ↻</button></section></div></div><p class="concept-table-caption" aria-live="polite" data-concept-caption>点击牌面开始，也可以从目录选卡。</p></div>
    <footer class="concept-game-actions"><a href="#map">章节图谱</a><button class="training-button" type="button" data-concept-draw>抽一张卡</button><button class="training-secondary" type="button" data-concept-directory>打开概念目录</button></footer>
  </div>
  <dialog class="concept-directory lexicon-dialog" aria-label="马原概念目录"><div class="lexicon-sheet"><header><div><small>按章节查找</small><h2>概念目录</h2></div><button type="button" data-concept-close aria-label="关闭概念目录">×</button></header><label class="lexicon-search">检索概念<input type="search" data-concept-search placeholder="例如：形而上学"></label><div class="concept-directory-list">${SITE_DATA.chapters.map(ch=>`<section><h3>${esc(ch.no)} · ${esc(ch.title)}</h3><div>${cards.map((c,i)=>c.chapter===ch.id?`<button type="button" data-concept-select="${i}" data-title="${esc(c.title)}">${esc(c.title)}</button>`:'').join('')}</div></section>`).join('')}</div></div></dialog></section>`;
  const stack = document.querySelector('[data-concept-stack]');
  const front = stack.querySelector('.concept-front'), back=stack.querySelector('.concept-back');
  function flip(on) {
    stack.classList.toggle('flipped',on);
    front.inert=on; front.setAttribute('aria-hidden',String(on));
    back.inert=!on; back.setAttribute('aria-hidden',String(!on));
  }
  function show() {
    const c=cards[conceptSelection]; if(!c)return;
    flip(false);
    document.querySelector('[data-concept-chapter]').textContent=chapterBy(c.chapter).no;
    document.querySelector('[data-concept-question]').textContent='什么是';
    document.querySelector('[data-concept-title]').textContent=c.title+'？';
    front.querySelector('em').textContent='点击翻牌 · 核对释义 ↻';
    document.querySelector('[data-concept-definition]').innerHTML=`<h2>${esc(c.title)}</h2><p>${esc(c.definition)}</p><h3>别混淆</h3><p>${esc(c.pitfall)}</p><h3>用到现实</h3><p>${esc(c.prompt)}</p>`;
    document.querySelector('[data-concept-draw]').textContent='再抽一张';
    document.querySelector('[data-concept-caption]').textContent='先用自己的话解释“'+c.title+'”，再翻牌。';
  }
  function draw() {
    if(conceptDrawTimer)return;
    let next=Math.floor(Math.random()*cards.length); if(next===conceptSelection)next=(next+1)%cards.length;
    flip(false); stack.classList.add('is-dealing'); front.disabled=true;
    document.querySelector('[data-concept-draw]').disabled=true;
    conceptDrawTimer=setTimeout(()=>{
      conceptDrawTimer=null; if(!stack.isConnected)return;
      conceptSelection=next; show(); stack.classList.remove('is-dealing'); front.disabled=false;
      document.querySelector('[data-concept-draw]').disabled=false;
    }, matchMedia('(prefers-reduced-motion: reduce)').matches?0:800);
  }
  document.querySelector('[data-concept-draw]').addEventListener('click',draw);
  front.addEventListener('click',()=>conceptSelection===null?draw():flip(true));
  document.querySelector('[data-concept-unflip]').addEventListener('click',()=>flip(false));
  const dialog=document.querySelector('.concept-directory');
  document.querySelector('[data-concept-directory]').addEventListener('click',()=>dialog.showModal());
  document.querySelector('[data-concept-close]').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{const b=e.target.closest('[data-concept-select]'); if(b){ clearTimeout(conceptDrawTimer);conceptDrawTimer=null;conceptSelection=Number(b.dataset.conceptSelect);show();stack.classList.remove('is-dealing');front.disabled=false;document.querySelector('[data-concept-draw]').disabled=false;dialog.close();} else if(e.target===dialog)dialog.close();});
  document.querySelector('[data-concept-search]').addEventListener('input',e=>{const q=e.target.value.trim(); dialog.querySelectorAll('[data-concept-select]').forEach(b=>b.hidden=!b.dataset.title.includes(q)); dialog.querySelectorAll('.concept-directory-list section').forEach(s=>s.hidden=![...s.querySelectorAll('button')].some(b=>!b.hidden));});
  if(conceptSelection!==null)show();
  document.title='马原概念卡｜明理·法观';
}

function debateDiscussionMarkup(topic) {
  const chosen = DEBATE_DISCUSSION[topic.title];
  const query = encodeURIComponent(topic.title.replace(/[“”？?]/g, ' ').trim());
  const search = 'https://search.bilibili.com/all?keyword=' + query;
  return `<section class="debate-discussion"><h2>看看别人如何分析</h2><p>打开外部讨论后，找出对方最强的一条理由，并核查它引用的材料。</p>${chosen ? `<a href="${chosen[1]}" target="_blank" rel="noopener noreferrer">${esc(chosen[0])} ↗</a>` : ''}<a href="${search}" target="_blank" rel="noopener noreferrer">在哔哩哔哩搜索本议题 ↗</a></section>`;
}
