const app = document.querySelector('#app');

const state = {
  quiz: null,
  answers: {},
  current: 0,
  xiezhi: { term: '', termIndex: -1, phase: 'idle', remaining: 600, running: false },
  debate: { index: -1, revealed: 0, drawing: false }
};

const XIEZHI_TERMS = [
  '板凳民生', '四千精神', '千万工程', '枫桥经验', '浦江经验', '接诉即办', '吹哨报到', '小院议事厅', '四下基层', '新质生产力',
  '人工智能+', '全国统一大市场', '共同富裕', '两山理念', '城市更新', '韧性城市', '完整社区', '一刻钟便民生活圈', '平急两用', '银发经济',
  '低空经济', '专精特新', '数字政府', '一老一小', '生态产品价值实现机制', '县域商业体系', '文化数字化战略', '新就业形态', '耐心资本', '首发经济'
];

const DEBATE_TOPICS = [
  {
    title: '算法推荐是在满足需求，还是在塑造需求？',
    layers: [
      ['权威事实', '算法推荐既提高信息匹配效率，也可能形成信息茧房。我国算法推荐管理规定要求服务提供者公开基本原理，并向用户提供关闭算法推荐或选择非个性化内容的选项。'],
      ['关键词解释', '需求并非完全静止：既有现实需要，也会在信息环境、商业机制和社会交往中被影响。讨论重点是用户自主、平台责任与技术边界。'],
      ['马原原理', '技术属于生产力的重要因素，但其现实作用受社会关系和利益机制制约。需求与供给相互作用，应在矛盾双方的联系中反对“算法万能”或“算法有害”的单向判断。'],
      ['法治思想视角', '既促进技术创新，也以规则保障知情权、选择权和公平竞争。治理应抓住平台权力这一关键主体，把透明、可选择和可问责落到制度上。'],
      ['参考作答框架', '先承认算法满足需求的效率价值；再分析其塑造偏好、放大偏见的风险；随后区分平台、用户与监管责任；最后提出透明说明、用户选择和外部监督。'],
      ['高分表达示例', '算法并非站在社会关系之外的中性工具。让技术增进人的自由发展，关键不在拒绝推荐，而在以规则把“替人选择”转化为“帮助人自主选择”。']
    ]
  },
  {
    title: '人工智能生成内容的责任应由谁承担？',
    layers: [
      ['权威事实', '生成式人工智能服务管理规则和人工智能生成合成内容标识制度，分别对服务提供者、内容传播平台和使用者设置了相应义务。责任不是简单落在单一主体上。'],
      ['关键词解释', '需要区分模型开发者、服务提供者、内容发布者、传播平台和最终使用者；还要区分技术缺陷、违法生成、虚假传播与合理使用。'],
      ['马原原理', '生产工具的发展会改变实践方式与社会关系。分析责任必须从具体行为、控制能力和因果联系出发，不能把技术拟人化，也不能用“工具中立”掩盖主体责任。'],
      ['法治思想视角', '坚持权责一致、风险分级和协同治理：谁设计和控制风险，谁承担相应注意义务；谁违法使用或传播，谁为具体行为负责。'],
      ['参考作答框架', '先区分主体与行为；再判断风险是否可预见、可控制；随后匹配标识、审核、纠错和赔偿责任；最后说明创新发展与安全治理需要并行。'],
      ['高分表达示例', '人工智能不能成为责任的“真空地带”。责任配置应沿着技术控制链和内容传播链展开，让能力、收益与义务相匹配。']
    ]
  },
  {
    title: '网络舆论监督与网络暴力的边界在哪里？',
    layers: [
      ['权威事实', '网络暴力信息治理规定明确要求治理侮辱谩骂、造谣诽谤、侵犯隐私等信息，同时依法保障公众监督和正常批评评论。'],
      ['关键词解释', '舆论监督面向公共事务并以事实为基础；网络暴力通常表现为针对个体的持续攻击、污名化、隐私曝光或煽动围攻。'],
      ['马原原理', '要坚持具体问题具体分析。不能只看言辞是否尖锐，还要考察事实基础、公共利益、行为方式、传播范围和实际后果。'],
      ['法治思想视角', '权利行使有边界。既不能以治理网络暴力压缩正当监督，也不能以“监督”为名侵害人格权和正常社会秩序。'],
      ['参考作答框架', '从议题公共性、事实真实性、表达必要性、对象可识别性和损害程度五方面判断；再提出平台处置、司法救济与媒介素养协同方案。'],
      ['高分表达示例', '监督指向权力与公共问题，暴力则把复杂问题压缩为对具体人的围攻。法治的任务，是保护有事实依据的批评，也为人格尊严划出不可逾越的底线。']
    ]
  },
  {
    title: '平台用工体现了生产力进步还是劳动关系变化？',
    layers: [
      ['权威事实', '平台经济创造了灵活就业机会，也带来劳动关系认定、算法管理、劳动报酬、休息和职业保障等新问题。相关政策强调维护新就业形态劳动者权益。'],
      ['关键词解释', '生产力进步表现为数字技术提高匹配和组织效率；劳动关系变化表现为管理方式、劳动控制和风险分配被平台规则重新塑造。'],
      ['马原原理', '生产力与生产关系相互作用。技术进步会推动组织形式变化，但新关系是否合理，要看其能否适应生产力发展并保障劳动者主体地位。'],
      ['法治思想视角', '依法明确平台责任，以劳动事实而非合同名称判断权利义务，同时为不同用工形态提供分层分类保障。'],
      ['参考作答框架', '先说明效率提升；再识别算法控制与风险转移；随后分析劳动关系认定和权益短板；最后提出规则透明、协商机制和社会保障衔接。'],
      ['高分表达示例', '平台用工不是“技术进步”与“劳动保障”的二选一。真正先进的生产力，应当与更加公平、稳定、可持续的劳动关系相适应。']
    ]
  },
  {
    title: '见义勇为是否只能依靠道德激励？',
    layers: [
      ['权威事实', '民法典规定，因自愿实施紧急救助行为造成受助人损害的，救助人不承担民事责任。法律以责任豁免回应了“好人怕担责”的现实顾虑。'],
      ['关键词解释', '道德激励回答“为什么愿意做”，法律保障回答“做了以后如何保护”。二者功能不同，但可以共同塑造社会行为预期。'],
      ['马原原理', '社会意识具有相对独立性并能反作用于社会存在。道德风尚需要物质条件和制度环境支撑，不能只依靠个人勇气。'],
      ['法治思想视角', '把社会主义核心价值观融入法治建设，以明确规则保护善行、惩治恶意，让德治教化与法治保障相互促进。'],
      ['参考作答框架', '先肯定道德动机；再说明救助风险和制度顾虑；随后分析法律免责、奖励保障与证据机制；最后落到德法共治。'],
      ['高分表达示例', '善意需要道德点亮，也需要制度托底。让见义勇为从“个人冒险”变为“社会共同守护”，正是法治对公共美德的有力支撑。']
    ]
  },
  {
    title: '个人信息保护为什么既是权利问题，也是社会治理问题？',
    layers: [
      ['权威事实', '个人信息保护法确立合法、正当、必要和诚信等处理原则，并对敏感个人信息、平台义务和监管责任作出规定。'],
      ['关键词解释', '作为权利问题，它关系人格尊严和个人自主；作为治理问题，它还影响公共安全、数字经济秩序、平台权力和社会信任。'],
      ['马原原理', '个体与社会相互联系。个人信息并非孤立数据，它在社会交往中产生价值和风险，需要把个人权利置于具体社会关系中理解。'],
      ['法治思想视角', '坚持以人民为中心，在保护人格权益的同时规范数据处理秩序，通过政府监管、平台合规和社会监督形成共治。'],
      ['参考作答框架', '从个人尊严切入；扩展到数据流通与公共利益；识别过度收集、滥用和泄露风险；提出最小必要、知情选择、安全保障和救济机制。'],
      ['高分表达示例', '保护个人信息不是把数据“封存起来”，而是用法治确定可收集、可使用、可流通的边界，为数字社会建立稳定信任。']
    ]
  },
  {
    title: '文化消费中的国潮热应如何用社会存在与社会意识分析？',
    layers: [
      ['权威事实', '国潮消费连接传统文化资源、现代设计、数字传播和青年消费需求，是文化创造与市场实践相互作用的现象。'],
      ['关键词解释', '社会存在包括经济生活和现实生产方式；社会意识包括价值观念、审美趣味和文化认同。二者相互联系但并非简单同步。'],
      ['马原原理', '社会存在决定社会意识，社会意识具有相对独立性并能反作用于社会存在。国潮既有产业升级和消费结构变化的基础，也会反过来塑造文化认同与市场创新。'],
      ['法治思想视角', '保护知识产权、规范广告与产品质量、维护消费者权益，为优秀传统文化的创造性转化和创新性发展提供稳定规则。'],
      ['参考作答框架', '先找现实基础；再看文化心理和传播机制；分析积极价值与符号化风险；最后提出文化质量、产业创新和规则保障。'],
      ['高分表达示例', '国潮不是传统符号的简单复刻，而是现实生活需要、文化主体意识与现代生产方式共同作用的结果；热度能否沉淀，最终取决于内容与品质。']
    ]
  }
];

XIEZHI_TERMS.push(...EXTRA_XIEZHI_TERMS.filter(term => !XIEZHI_TERMS.includes(term)));
DEBATE_TOPICS.push(...LAB_EXTRA_TOPICS);

let xiezhiTimer = null;
let xiezhiShuffle = null;
let labTransitionActive = false;
let featureTransitionTimers = [];
let debateShuffle = null;
let labCardNavigating = false;
let theoryFilter = '全部';
let theorySelectedIndex = -1;

const THEORY_READING_LENSES = {
  '思想要义': ['先找法治建设要回答的现实问题，再区分基本立场、思想方法与制度路径。', '不要把作者的阐释当作讲话原文；核对原文后，用自己的话说明理论为何适用于现实。'],
  '立法与宪法': ['从立法目的、权利保障、规范衔接三个方面理解制度设计。', '想一想：同一目标在宪法原则、法律规定和实施机制中如何逐层落实。'],
  '法治实施': ['把立法、执法、司法、守法与监督放在一条实施链中观察。', '寻找具体主体、行为与结果，不把制度名称直接等同于治理成效。'],
  '数字与社会': ['先识别新技术带来的利益与风险，再看权利边界和责任分配。', '用一个真实网络案例检验：规则解决了哪些问题，还留下哪些新问题。'],
  '发展与安全': ['梳理发展目标、安全底线与生态约束，避免把它们写成非此即彼。', '明确不同主体的责任和可验证的实践效果，再作价值判断。']
};

const CHAPTER_TREES = {
  intro: [
    { title: '导论', topics: ['什么是马克思主义', '马克思主义的创立与发展', '马克思主义的基本特征', '马克思主义的当代价值', '自觉学习和运用马克思主义'] }
  ],
  c1: [
    { title: '第一节　世界的多样性与物质统一性', topics: ['物质及其存在方式', '物质与意识的辩证关系', '世界的物质统一性'] },
    { title: '第二节　事物的普遍联系和变化发展', topics: ['联系和发展的普遍性', '对立统一规律是事物发展的根本规律', '量变质变规律和否定之否定规律', '联系和发展的基本环节'] },
    { title: '第三节　唯物辩证法是认识世界和改造世界的根本方法', topics: ['唯物辩证法的本质特征和认识功能', '学习唯物辩证法，不断增强思维能力'] }
  ],
  c2: [
    { title: '第一节　实践与认识', topics: ['科学的实践观及其意义', '实践的本质与基本结构', '认识的本质与过程', '实践与认识的辩证运动及其规律'] },
    { title: '第二节　真理与价值', topics: ['真理的客观性、绝对性和相对性', '真理的检验标准', '真理与价值的辩证统一'] },
    { title: '第三节　认识世界和改造世界', topics: ['认识世界的根本目的在于改造世界', '一切从实际出发，实事求是', '坚持守正创新，实现理论创新和实践创新的良性互动'] }
  ],
  c3: [
    { title: '第一节　人类社会的存在与发展', topics: ['社会存在与社会意识', '社会基本矛盾及其运动规律', '人类普遍交往与世界历史的形成发展', '社会进步与社会形态更替', '文明及其多样性'] },
    { title: '第二节　社会历史发展的动力', topics: ['社会基本矛盾在历史发展中的作用', '阶级斗争、社会革命在社会发展中的作用', '科学技术在社会发展中的作用', '文化在社会发展中的作用'] },
    { title: '第三节　人民群众在历史发展中的作用', topics: ['人民群众是历史的创造者', '个人在社会历史中的作用', '群众、阶级、政党、领袖的关系'] }
  ],
  c4: [
    { title: '第一节　商品经济和价值规律', topics: ['商品经济的形成和发展', '价值规律及其作用', '以私有制为基础的商品经济的基本矛盾', '马克思劳动价值论的当代价值'] },
    { title: '第二节　资本主义经济制度', topics: ['资本主义经济制度的产生', '劳动力成为商品与货币转化为资本', '生产剩余价值是资本主义生产方式的绝对规律', '资本主义的基本矛盾与经济危机'] },
    { title: '第三节　资本主义上层建筑', topics: ['资本主义政治制度及其本质', '资本主义意识形态及其本质'] }
  ],
  c5: [
    { title: '第一节　垄断资本主义的形成与发展', topics: ['资本主义从自由竞争到垄断', '垄断资本主义的发展', '经济全球化及其影响'] },
    { title: '第二节　正确认识当代资本主义的新变化', topics: ['第二次世界大战后资本主义的变化及其实质', '当代资本主义变化的新特征', '世界大变局下资本主义的矛盾与冲突'] },
    { title: '第三节　资本主义的历史地位和发展趋势', topics: ['资本主义的历史地位', '资本主义为社会主义所代替的历史必然性'] }
  ],
  c6: [
    { title: '第一节　社会主义五百年的历史进程', topics: ['社会主义从空想到科学', '社会主义从理想到现实、从一国到多国的发展', '社会主义在中国焕发出蓬勃生机'] },
    { title: '第二节　科学社会主义基本原则', topics: ['科学社会主义基本原则的主要内容', '正确把握科学社会主义基本原则', '科学社会主义基本原则与中国特色社会主义'] },
    { title: '第三节　在实践中探索社会主义的发展规律', topics: ['社会主义建设过程的长期性', '社会主义发展道路的多样性', '社会主义在实践中开拓前进'] }
  ],
  c7: [
    { title: '第一节　展望未来共产主义新社会', topics: ['预见未来社会的方法论原则', '共产主义社会的基本特征'] },
    { title: '第二节　实现共产主义是历史发展的必然趋势', topics: ['实现共产主义是历史发展的必然', '实现共产主义是长期的历史过程'] },
    { title: '第三节　共产主义远大理想与中国特色社会主义共同理想', topics: ['坚持远大理想与共同理想的辩证统一', '坚定理想信念，投身新时代中国特色社会主义伟大事业'] }
  ]
};

// 依据两份课程思维导图梳理出的“章节—分支—知识点”关系。
// 原图采用旧版教材章节编号，本站只吸收其逻辑线索，并统一重排到 2023 年版教材目录。
const SECTION_LOGIC = {
  'intro-0': '理论体系 → 创立发展 → 基本特征 → 当代价值 → 学习运用',
  'c1-0': '物质 → 运动与时空 → 意识能动性 → 世界物质统一性',
  'c1-1': '普遍联系 → 永恒发展 → 三大规律 → 基本范畴',
  'c1-2': '辩证法功能 → 矛盾分析 → 系统思维 → 实践运用',
  'c2-0': '实践基础 → 能动反映 → 两次飞跃 → 循环上升',
  'c2-1': '真理属性 → 实践检验 → 真理尺度与价值尺度统一',
  'c2-2': '认识世界 → 改造世界 → 实事求是 → 守正创新',
  'c3-0': '社会存在 → 社会意识 → 基本矛盾 → 社会形态与文明',
  'c3-1': '根本动力 → 直接动力 → 科技文化 → 改革发展',
  'c3-2': '人民主体 → 个人作用 → 群众、政党与领袖',
  'c4-0': '商品二因素 → 劳动二重性 → 价值规律 → 私有制基本矛盾',
  'c4-1': '劳动力商品 → 剩余价值生产 → 资本积累 → 经济危机',
  'c4-2': '经济基础 → 政治制度 → 意识形态 → 阶级本质',
  'c5-0': '自由竞争 → 生产集中 → 垄断资本 → 经济全球化',
  'c5-1': '新变化 → 新特征 → 形成原因 → 本质未变',
  'c5-2': '历史进步性 → 内在局限 → 社会主义代替的必然趋势',
  'c6-0': '空想 → 科学 → 理论变现实 → 中国实践新发展',
  'c6-1': '基本原则 → 正确把握 → 同中国具体实际相结合',
  'c6-2': '长期性 → 道路多样性 → 改革创新 → 实践开拓',
  'c7-0': '立足现实运动 → 把握发展趋势 → 认识基本特征',
  'c7-1': '历史必然性 → 主体实践 → 长期性与曲折性',
  'c7-2': '远大理想 → 共同理想 → 阶段任务 → 青年行动'
};

const TOPIC_LINKS = {
  '马克思主义的基本特征': 'marx-method',
  '物质与意识的辩证关系': 'material',
  '联系和发展的普遍性': 'connection',
  '对立统一规律是事物发展的根本规律': 'contradiction',
  '量变质变规律和否定之否定规律': 'change',
  '实践与认识的辩证运动及其规律': 'practice',
  '真理与价值的辩证统一': 'truth',
  '一切从实际出发，实事求是': 'actuality',
  '社会存在与社会意识': 'social',
  '社会基本矛盾及其运动规律': 'social-contradiction',
  '社会基本矛盾在历史发展中的作用': 'social-contradiction',
  '科学技术在社会发展中的作用': 'technology',
  '人民群众是历史的创造者': 'people',
  '价值规律及其作用': 'value-law',
  '生产剩余价值是资本主义生产方式的绝对规律': 'surplus',
  '资本主义的基本矛盾与经济危机': 'capital-conflict',
  '资本主义从自由竞争到垄断': 'monopoly',
  '经济全球化及其影响': 'globalization',
  '科学社会主义基本原则的主要内容': 'scientific-socialism',
  '社会主义在实践中开拓前进': 'socialism-practice',
  '坚持远大理想与共同理想的辩证统一': 'ideal'
};

const HOTSPOT_NAMES = ['热点一', '热点二', '热点三', '热点四', '热点五', '热点六'];

function esc(value = '') {
  return String(value).replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
}

function decode(value = '') {
  try { return decodeURIComponent(value); } catch (_) { return value; }
}

function chapterBy(id) { return SITE_DATA.chapters.find(item => item.id === id); }
function pointBy(id) { return SITE_DATA.points.find(item => item.id === id); }
function caseBy(id) { return SITE_DATA.cases.find(item => item.id === id); }
function knowledgeByPointId(id) {
  const linkedTitle = Object.keys(TOPIC_LINKS).find(title => TOPIC_LINKS[title] === id);
  const point = pointBy(id);
  return knowledgeByTitle(linkedTitle) || KNOWLEDGE_CATALOG.find(item => item.title === point?.title);
}

function importance(valueOrItem, compact = false) {
  const value = typeof valueOrItem === 'number' ? valueOrItem : valueOrItem?.importance || 2;
  const label = value >= 5 ? '核心必会' : value >= 4 ? '重点掌握' : '基础理解';
  return `<span class="importance ${compact ? 'compact' : ''}" aria-label="重要程度${value}级"><b>${label}</b><i>${Array.from({ length: 5 }, (_, index) => `<em class="${index < value ? 'on' : ''}"></em>`).join('')}</i></span>`;
}

function difficulty(value = 2) {
  return `<span class="difficulty" aria-label="难度${value}星"><b>难度</b><i>${Array.from({ length: 5 }, (_, index) => `<em class="${index < value ? 'on' : ''}">★</em>`).join('')}</i></span>`;
}

function locationBar(backHref, backLabel, items) {
  return `<nav class="location-bar" aria-label="当前位置"><a class="back-button" href="${backHref}">← ${backLabel}</a><div class="breadcrumbs">${items.map((item, index) => `${index ? '<span>/</span>' : ''}${item.href ? `<a href="${item.href}">${item.label}</a>` : `<b>${item.label}</b>`}`).join('')}</div></nav>`;
}

function pageIntro(kicker, title, text, backHref, backLabel, crumbs) {
  return `<section class="inner-head">${locationBar(backHref, backLabel, crumbs)}<div class="inner-title"><span>${kicker}</span><div><h1>${title}</h1><p>${text}</p></div></div></section>`;
}


function renderDisclaimer() {
  app.innerHTML = `<section class="disclaimer-page">${locationBar('#home', '返回首页', [{ label: '首页', href: '#home' }, { label: '免责说明' }])}
    <article class="disclaimer-sheet"><header><small>使用说明 · 权利边界</small><h1>免责说明</h1><p>本说明用于明确“明理·法观”的学习属性、内容边界与使用方式。</p></header>
      <section><span>01</span><div><h2>项目性质</h2><p>本站为面向重度依赖 AI 的青年人的自主思考训练样板。新闻、法治案例和理论内容用于训练查证、推理与表达，练习反馈仅供学习参考。</p></div></section>
      <section><span>02</span><div><h2>内容与出处</h2><p>本站尽力选用教材、法律法规及权威机构公开材料，并对“官方材料”“教材原理”和“本站教学分析”作区分。受资料更新、编辑能力和静态页面时效限制，内容可能存在遗漏或滞后；涉及重要事实、政策和法律规定时，请以原发布机关及最新有效文本为准。</p></div></section>
      <section><span>03</span><div><h2>题库与参考答案</h2><p>除非题目明确标注为可核验的公开真题，其他题目均作为课程练习使用。本站提供的答案、解析和作答框架服务于学习复盘，不代表考试主管部门、学校教师或材料发布机构的唯一结论。</p></div></section>
      <section><span>04</span><div><h2>知识产权</h2><p>本站尊重文字、图片、商标及其他作品权利。引用或链接的第三方材料，其权利归原权利人所有；本站的摘编、导读和界面呈现不改变原作品权属，也不授权用户进行商业转载。若权利人认为有关内容使用不当，可向项目维护者提供具体页面、权属信息和处理要求，核实后将及时更正、补充署名或删除。</p></div></section>
      <section><span>05</span><div><h2>外部链接、答题和录音</h2><p>外部内容由第三方平台维护。新闻草稿、题库进度和错题记录保存在当前浏览器。主动开启獬豸录音陪练后，录音会提交给阿里云百炼转写，转写文本用于生成表达反馈。本地服务不把录音或转写写入文件。请避免在练习中说出个人身份信息。</p></div></section>
      <section><span>06</span><div><h2>使用责任</h2><p>使用者应结合课程要求和权威原文进行独立判断，并遵守法律法规及学术诚信规范。因脱离原文语境、依赖过期信息或不当转载使用而产生的后果，应由具体使用行为人根据实际情况承担。</p></div></section>
      <footer>最后更新：2026 年 11 月 13 日 · 本说明不排除法律规定不得免除或限制的责任。</footer>
    </article></section>`;
  document.title = '免责说明｜明理·法观';
}

function renderTheory() {
  const categories = ['全部', '思想要义', '立法与宪法', '法治实施', '数字与社会', '发展与安全'];
  const filtered = theoryFilter === '全部' ? THEORY_ARTICLES : THEORY_ARTICLES.filter(article => article.topic === theoryFilter);
  app.innerHTML = `<section class="theory-page">${locationBar('#home', '返回首页', [{ label: '首页', href: '#home' }, { label: '法治思想研读' }])}
    <div class="theory-content"><div class="theory-filters" aria-label="文章主题筛选">${categories.map(category => `<button type="button" data-theory-filter="${category}" class="${theoryFilter === category ? 'active' : ''}" aria-pressed="${theoryFilter === category}">${category}</button>`).join('')}</div>
    <div class="theory-list-meta"><span>${theoryFilter === '全部' ? '全部文章' : esc(theoryFilter)}</span><small>更新核对：${THEORY_UPDATED.replaceAll('-', '.')}</small></div>
    <div class="theory-list">${filtered.map((article, index) => `<a href="#theory-article/${THEORY_ARTICLES.indexOf(article)}" data-theory-article="${THEORY_ARTICLES.indexOf(article)}" class="theory-row theory-article-link ${theorySelectedIndex === THEORY_ARTICLES.indexOf(article) ? 'is-selected' : ''}"><span>${String(index + 1).padStart(2, '0')}</span><div><small>${article.date}　·　${article.topic}</small><h3>${esc(article.title)}</h3><p>${esc(article.prompt)}</p></div><i>带着问题研读 ↗</i></a>`).join('')}</div>
    <p class="theory-source">选编以 <a href="${THEORY_SOURCE}" target="_blank" rel="noopener noreferrer">中国法学会“习近平法治思想”专题 ↗</a> 等权威发布平台为索引，包含权威机构文章与学者研究阐释，并非全部为习近平总书记讲话原文。逐篇标明收录平台、日期与页面链接。本站仅提供原创导读，不转载全文；本页为 ${THEORY_UPDATED} 核对的静态快照，并非自动实时更新。</p></div></section>`;
  document.title = '法治思想研读｜明理·法观';
}

function renderTheoryArticle(index) {
  const article = THEORY_ARTICLES[Number(index)];
  if (!article) { renderTheory(); return; }
  theorySelectedIndex = Number(index);
  const lens = THEORY_READING_LENSES[article.topic] || THEORY_READING_LENSES['思想要义'];
  app.innerHTML = `<section class="theory-reading-page">${locationBar('#theory', '返回文章目录', [{ label: '首页', href: '#home' }, { label: '法治思想研读', href: '#theory' }, { label: '阅读导读' }])}
    <article class="theory-reading"><header><small>${esc(article.topic)} <i>·</i> ${article.date} <i>·</i> ${esc(article.sourceName)}</small><h1>${esc(article.title)}</h1><p>本站原创导读 · 非官方原文</p></header>
    <div class="theory-reading-body"><section class="reading-lead"><span>从这个问题读起</span><h2>${esc(article.prompt)}</h2></section>
    <section class="reading-lens"><span>阅读线索</span><p>${esc(lens[0])}</p><p>${esc(lens[1])}</p></section>
    <section class="reading-method"><span>三步阅读法</span><ol><li><b>找问题</b>：圈出作者试图回答的现实或理论问题。</li><li><b>理关系</b>：标出核心概念、事实依据及其连接方式。</li><li><b>作判断</b>：结合一个具体情境，写下自己的解释并核对原文。</li></ol></section></div>
    <footer class="reading-source"><span>权威页面</span><p>发布平台：${esc(article.sourceName)}；页面日期：${article.date}。本站导读只用于学习导航，具体表述以原文为准。</p><div class="reading-source-actions"><a href="${article.url}" target="_blank" rel="noopener noreferrer">阅读原页面 ↗</a><button type="button" data-copy-theory-url="${article.url}">复制页面网址</button></div><input id="theory-source-url" aria-label="原文网址，可长按复制" readonly value="${article.url}"></footer>
    </article></section>`;
  document.title = `${article.title}｜法治思想研读｜明理·法观`;
}

function formatTime(seconds) {
  const safe = Math.max(0, seconds);
  return `${String(Math.floor(safe / 60)).padStart(2, '0')}:${String(safe % 60).padStart(2, '0')}`;
}

function xiezhiPhaseLabel(x = state.xiezhi) {
  return x.phase === 'research' ? '资料查阅' : x.phase === 'speaking' ? '脱稿口述' : x.phase === 'ready' ? '准备口述' : x.phase === 'done' ? '训练完成' : '等待开始';
}

function xiezhiPhaseCopy(x = state.xiezhi) {
  return x.phase === 'research' ? '请离开页面查阅权威资料；完成后回来提前结束查阅。' : x.phase === 'ready' ? '合上资料，准备把观点完整讲出来。' : x.phase === 'speaking' ? '保持结构：定义现象—分析原因—提出判断。' : x.phase === 'done' ? '完成一次训练。回看自己的表达，再抽一题。' : '抽取后不提供解释，把查找、判断和表达留给你。';
}

function xiezhiClockActions(x = state.xiezhi) {
  if (x.phase === 'idle') return `<button class="primary-action" data-research-start ${x.term ? '' : 'disabled'}>开始 10 分钟查阅</button>`;
  if (x.phase === 'research') return `<button class="primary-action" data-timer-toggle>${x.running ? '暂停' : '继续'}</button><button data-research-finish>提前结束查阅</button>`;
  if (x.phase === 'ready') return '<button class="primary-action" data-speech-start>直接计时口述</button>';
  if (x.phase === 'speaking' && coachSession?.recorder?.state === 'recording') return '<button type="button" data-speech-finish>结束录音并点评</button>';
  if (x.phase === 'speaking') return `<button class="primary-action" data-timer-toggle>${x.running ? '暂停' : '继续'}</button><button data-speech-finish>结束口述</button>`;
  return '<button class="primary-action" data-draw-term>再抽一个词条</button>';
}

function xiezhiClockMarkup(x = state.xiezhi) {
  return `<div class="training-clock"><div><small data-timer-phase>${xiezhiPhaseLabel(x)}</small><b data-timer-display>${formatTime(x.remaining)}</b><p data-timer-copy>${xiezhiPhaseCopy(x)}</p></div><div class="clock-actions">${xiezhiClockActions(x)}</div></div>`;
}

function updateXiezhiTimer() {
  const timer = document.querySelector('[data-timer-display]');
  const phase = document.querySelector('[data-timer-phase]');
  if (timer) timer.textContent = formatTime(state.xiezhi.remaining);
  if (phase) phase.textContent = xiezhiPhaseLabel();
}

function updateXiezhiPanel() {
  const clock = document.querySelector('.training-clock');
  if (!clock) return;
  updateXiezhiTimer();
  const copy = clock.querySelector('[data-timer-copy]');
  const actions = clock.querySelector('.clock-actions');
  if (copy) copy.textContent = xiezhiPhaseCopy();
  if (actions) actions.innerHTML = xiezhiClockActions();
  clock.dataset.phase = state.xiezhi.phase;
  syncXiezhiAssistant();
}

function updateXiezhiTermCard(term, index) {
  const draw = document.querySelector('.term-draw');
  if (!draw) return;
  const frame = draw.querySelector('.term-draw-frame');
  const number = frame?.querySelector('small');
  const display = frame?.querySelector('[data-term-display]');
  const prompt = frame?.querySelector(':scope > span:last-child');
  if (number) number.textContent = `第 ${String(index + 1).padStart(2, '0')} 号签`;
  setTermPreview(display, term);
  if (prompt) prompt.textContent = '查其出处 · 述其要义';
  draw.classList.remove('is-shuffling');
  draw.classList.add('has-term', 'is-revealed');
  const seal = draw.querySelector('.draw-seal');
  if (seal) {
    seal.disabled = false;
    seal.setAttribute('aria-label', '换一个词条');
    const label = seal.querySelector('b');
    if (label) label.textContent = '再抽一签';
  }
  let clock = document.querySelector('.training-clock');
  if (!clock) {
    document.querySelector('.xiezhi-note')?.insertAdjacentHTML('beforebegin', xiezhiClockMarkup());
    clock = document.querySelector('.training-clock');
  }
  updateXiezhiPanel();
}

function stopXiezhiTimer() {
  if (xiezhiTimer) clearInterval(xiezhiTimer);
  xiezhiTimer = null;
  state.xiezhi.running = false;
}

function runXiezhiTimer() {
  stopXiezhiTimer();
  state.xiezhi.running = true;
  const deadline = Date.now() + state.xiezhi.remaining * 1000;
  const tick = () => {
    state.xiezhi.remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
    if (state.xiezhi.remaining <= 0) {
      stopXiezhiTimer();
      if (state.xiezhi.phase === 'speaking') { finishXiezhiSpeaking(); return; }
      state.xiezhi.phase = 'ready';
      updateXiezhiPanel();
      return;
    }
    updateXiezhiTimer();
  };
  xiezhiTimer = setInterval(tick, 250);
  tick();
}

function renderXiezhi() {
  const x = state.xiezhi;
  const hasTerm = Boolean(x.term);
  const termSize = termSizeClass(x.term);
  app.innerHTML = `<section class="xiezhi-page">${locationBar('#lab', '返回训练场', [{ label: '首页', href: '#home' }, { label: LAB_NAME, href: '#lab' }, { label: '獬豸问思局' }])}
    <div class="xiezhi-shell"><div class="xiezhi-visual"><img src="./assets/xiezhi-asset-v1.png" alt="獬豸主题线描形象"><span>辨曲直 · 求真知</span></div>
    <div class="xiezhi-workbench"><header><div class="xiezhi-welcome-heading"><small>獬豸问思局</small><button type="button" data-xiezhi-welcome>播放欢迎语</button></div><h1>抽一词，查一事，讲清一个判断</h1></header>
    <div class="term-draw ${hasTerm ? 'has-term is-revealed' : ''}"><div class="term-draw-frame"><button type="button" class="term-vault-trigger" data-open-lexicon aria-label="查看全部问思词条" title="查看全部词条"><span aria-hidden="true">录</span></button><small>${hasTerm ? `第 ${String(x.termIndex + 1).padStart(2, '0')} 号签` : '獬豸待命'}</small><strong data-term-display class="${termSize}">${hasTerm ? esc(x.term) : '待抽取'}</strong><span>${hasTerm ? '查其出处 · 述其要义' : '以问求思 · 以理辨事'}</span></div><div class="draw-action"><button class="draw-seal" data-draw-term aria-label="${hasTerm ? '换一个词条' : '抽取今日词条'}"><em aria-hidden="true">獬</em><b>${hasTerm ? '再抽一签' : '启签问思'}</b></button></div></div>
    ${xiezhiClockMarkup(x)}
    <p class="xiezhi-note"><b>练习方法：</b>在抽取词条后，利用10分钟自行查阅资料了解词条含义，再脱稿口述3分钟（可录视频自查表达，在了解词义的同时提升自己的表达能力）。</p></div>${xiezhiAssistantMarkup()}</div>
    <dialog class="lexicon-dialog" aria-label="问思词库"><div class="lexicon-sheet"><header><div><small>獬豸问思局 · 词库</small><h2>翻阅全部词条</h2><p>选一个词，自行核查权威出处，再用三分钟讲清概念与现实联系。</p></div><button type="button" data-close-lexicon aria-label="关闭词库">×</button></header><label class="lexicon-search">检索词条<input type="search" data-lexicon-search placeholder="输入关键词"></label><div class="lexicon-grid">${XIEZHI_TERMS.map((term, index) => `<span data-lexicon-term="${esc(term)}"><i>${String(index + 1).padStart(2, '0')}</i>${esc(term)}</span>`).join('')}</div></div></dialog></section>`;
  updateXiezhiPanel();
  syncXiezhiWelcome();
  if (x.running) runXiezhiTimer();
  document.title = '獬豸问思局｜明理·法观';
}

function termSizeClass(term = '') {
  const length = Array.from(term).length;
  return length >= 12 ? 'term-very-long' : length >= 8 ? 'term-long' : '';
}

function setTermPreview(display, term) {
  if (!display) return;
  display.textContent = term;
  display.className = termSizeClass(term);
}

function renderDebate() {
  const drawing = state.debate.drawing;
  const selected = !drawing && state.debate.index >= 0 ? DEBATE_TOPICS[state.debate.index] : null;
  const revealed = state.debate.revealed;
  const topic = drawing ? '准备议题池' : selected ? selected.title : '等待抽取今日议题';
  const status = drawing ? '议题抽取中' : selected ? '今日议题' : '今日一辩';
  const prompt = drawing ? '议题池正在由快到慢滚动，停下后先形成自己的判断。' : selected ? '不要急着寻找立场。先说清事实、概念和关系，再判断价值与制度边界。' : '每次随机抽取一个社会议题；分析路径提供权威依据与参考框架，不给唯一答案。';
  const controls = drawing
    ? `<div class="debate-drawing-control"><button class="debate-draw-seal" type="button" disabled><span>抽取中</span><b data-debate-stage-label>校准事实</b></button><div class="debate-draw-progress"><i data-debate-progress></i></div></div>`
    : selected
      ? `<button class="debate-redraw" data-draw-debate><span>重新抽取</span><b>换个议题</b></button>`
      : `<button class="debate-draw-seal" data-draw-debate><span>随机抽取</span><b>今日议题</b></button>`;
  const analysisEntry = selected ? `<div class="debate-analysis-entry">${revealed < selected.layers.length ? `<div><small>先独立思考，再核对六层路径</small><b>权威事实 · 概念 · 原理 · 法治 · 框架 · 表达</b></div><button class="analysis-reveal" data-reveal-layer>看看分析路径 →</button>` : '<div><small>分析路径已展开</small><b>继续向下阅读，逐层核对自己的判断</b></div><span>已展开</span>'}</div>` : '';
  const layers = selected && revealed ? `<div class="debate-layers">${selected.layers.map(([label, text], index) => { const source = DEBATE_FACT_SOURCES[state.debate.index]; const name = index === 0 ? '权威依据' : label; const attribution = index === 0 && source ? `<div class="debate-attribution"><b>依据：${esc(source.org)} · ${source.date}</b><a href="${source.url}" target="_blank" rel="noreferrer">${esc(source.title)} ↗</a><small>上文为本站摘要；事实和政策表述以原文为准。</small></div>` : index === 2 ? `<small class="academic-tag">教材原理 · 本站概括，参照《马克思主义基本原理（2023年版）》</small>` : index >= 3 ? '<small class="academic-tag">本站教学分析 · 非官方标准答案</small>' : ''; return `<article style="--reveal-index:${index}"><span>${String(index + 1).padStart(2, '0')}</span><div><small>第${['一','二','三','四','五','六'][index]}层</small><h2>${name}</h2><p>${text}</p>${attribution}</div></article>`; }).join('')}</div>` : '';
  app.innerHTML = `<section class="debate-page">${locationBar('#lab', '返回训练场', [{ label: '首页', href: '#home' }, { label: LAB_NAME, href: '#lab' }, { label: '今日一辩' }])}<div class="debate-stage ${drawing ? 'debate-is-drawing' : ''}">
    <header><span>公共理性训练</span><h1>抽一个现实议题，练一次完整判断</h1><p>从事实与概念出发，再连接马克思主义原理和法治视角。</p></header>
    <div class="debate-question-card ${drawing ? 'is-drawing' : selected ? 'has-topic' : 'is-idle'}"><div class="debate-question-copy"><small>${status}</small><h2 data-debate-topic-preview>${esc(topic)}</h2><p>${prompt}</p></div><div class="debate-card-controls">${controls}</div></div>${analysisEntry}${layers}${selected && revealed ? debateDiscussionMarkup(selected) : ''}</div></section>`;
  document.title = '今日一辩｜明理·法观';
}

function fitDebateTitle() {
  const title = document.querySelector('.debate-stage > header h1');
  if (!title) return;
  const available = title.clientWidth;
  if (!available) return;
  const canvas = document.createElement('canvas');
  const measure = canvas.getContext('2d');
  if (!measure) return;
  const family = getComputedStyle(title).fontFamily;
  let size = Math.min(window.innerWidth <= 760 ? 28 : 54, Math.max(9.5, available / Math.max(title.textContent.length, 1) * 1.12));
  for (; size > 9.5; size -= 0.5) {
    measure.font = `700 ${size}px ${family}`;
    if (measure.measureText(title.textContent).width <= available - 4) break;
  }
  title.style.fontSize = `${Math.max(9.5, size)}px`;
}

function renderMap(chapterId, branchId) {
  if (!chapterId || !chapterBy(chapterId)) {
    app.innerHTML = `<section class="map-selector">${locationBar('#learn', '返回学习区', [{ label: '首页', href: '#home' }, { label: LEARN_NAME, href: '#learn' }, { label: '知行图谱' }])}<div class="chapter-choice-grid">${SITE_DATA.chapters.map((chapter, index) => `<a href="#map/${chapter.id}"><span><b>${chapter.no}</b><em>${String(index + 1).padStart(2, '0')}</em></span><strong>${chapter.title}</strong><small>${chapter.focus} · ${chapter.sections.length}个知识分支</small><i>${chapter.sections.join(' · ')}</i><u>展开图谱 →</u></a>`).join('')}</div><p class="academic-note">${ACADEMIC_NOTE} <a href="${TEXTBOOK_SOURCE}" target="_blank" rel="noreferrer">教材书目信息 ↗</a></p></section>`;
    document.title = '知行图谱｜明理·法观';
    return;
  }
  const selected = chapterBy(chapterId);
  const tree = CHAPTER_TREES[selected.id] || [];
  const branchIndex = Number(branchId);
  const hasBranch = branchId !== undefined && Number.isInteger(branchIndex) && tree[branchIndex];
  const currentBranch = hasBranch ? tree[branchIndex] : null;
  const crumbs = [{ label: '首页', href: '#home' }, { label: LEARN_NAME, href: '#learn' }, { label: '知行图谱', href: '#map' }, { label: selected.title, href: hasBranch ? `#map/${selected.id}` : undefined }];
  if (hasBranch) crumbs.push({ label: currentBranch.title.replace(/^第[一二三四五六七八九十]+节　?/, '') });

  app.innerHTML = `<section class="map-tree-page">${locationBar(hasBranch ? `#map/${selected.id}` : '#map', hasBranch ? '返回本章分支' : '返回章节目录', crumbs)}
    <div class="mindmap-stage ${hasBranch ? 'branch-open' : ''}">
      <a class="mindmap-root" href="#map/${selected.id}"><small>${selected.no}</small><strong>${selected.title}</strong></a>
      ${hasBranch ? `<div class="active-branch"><header><span>当前分支</span><h1>${currentBranch.title}</h1><p>${SECTION_LOGIC[`${selected.id}-${branchIndex}`] || currentBranch.topics.join(' → ')}</p></header><div class="knowledge-node-grid">${currentBranch.topics.map(topic => { const item = knowledgeByTitle(topic); const level = item?.importance || 3; return `<a class="knowledge-node" href="#knowledge/${encodeURIComponent(topic)}"><div><b>${topic}</b><span>${level >= 5 ? '核心必会' : level >= 4 ? '重点掌握' : '基础理解'}</span></div>${difficulty(item?.difficulty || 2)}<i>查看精讲 →</i></a>`; }).join('')}</div></div>` : `<div class="mindmap-branches">${tree.map((section, index) => `<a href="#map/${selected.id}/${index}"><span>分支 ${String(index + 1).padStart(2, '0')}</span><b>${section.title.replace(/^第[一二三四五六七八九十]+节　?/, '')}</b><small>${SECTION_LOGIC[`${selected.id}-${index}`] || section.topics.join(' → ')}</small><i>展开知识点 →</i></a>`).join('')}</div>`}
    </div>
    <a class="chapter-drill-link compact-drill" href="#chapter-quiz/${selected.id}/0">本章五题练习 →</a><p class="academic-note">${ACADEMIC_NOTE} <a href="${TEXTBOOK_SOURCE}" target="_blank" rel="noreferrer">教材书目信息 ↗</a></p>
  </section>`;
  document.title = `${selected.no}知识图谱｜明理·法观`;
}

function renderKnowledge(encodedTitle) {
  const title = decode(encodedTitle);
  const item = knowledgeByTitle(title) || KNOWLEDGE_CATALOG[0];
  const chapter = chapterBy(item.chapter);
  const branchIndex = (CHAPTER_TREES[item.chapter] || []).findIndex(group => group.topics.includes(item.title));
  const section = CHAPTER_TREES[item.chapter]?.[branchIndex];
  app.innerHTML = `<section class="knowledge-compact">${locationBar(`#map/${chapter.id}/${Math.max(branchIndex, 0)}`, '返回知识分支', [{ label: '首页', href: '#home' }, { label: '知行图谱', href: '#map' }, { label: chapter.title, href: `#map/${chapter.id}` }, { label: item.title }])}<header><div><span>${section?.title || chapter.no}</span><h1>${item.title}</h1></div>${difficulty(item.difficulty)}</header><div class="compact-knowledge-cards"><section><small>教材原理 · 本站概括</small><p>${item.definition}</p></section><section><small>本站教学分析 · 理解技巧</small><p>${item.explanation}</p></section><section><small>本站教学分析 · 背诵技巧</small><p>${item.memory}</p></section><section><small>本站编辑判断 · 常见考法</small><p>${item.exam}</p></section></div><a class="chapter-drill-link compact-drill" href="#chapter-quiz/${chapter.id}/0">本章五题练习 →</a><p class="academic-note">${ACADEMIC_NOTE} <a href="${TEXTBOOK_SOURCE}" target="_blank" rel="noreferrer">教材书目信息 ↗</a></p></section>`;
  document.title = `${item.title}｜明理·法观`;
}

function renderPoint(id) {
  const item = knowledgeByPointId(id);
  renderKnowledge(encodeURIComponent((item || KNOWLEDGE_CATALOG[0]).title));
}


function renderDrill() {
  const modes = [
    { id: '考研', mark: '研', title: '考研模拟练习', text: '聚焦原理辨析与材料判断，五题一组即时分析。', meta: '原理辨析 · 材料题型' },
    { id: '公考', mark: '公', title: '考公模拟练习', text: '训练常识判断与时政联系，强化选项边界识别。', meta: '常识判断 · 时政联系' },
    { id: '期末', mark: '期', title: QUIZ_NAME, text: '使用课程题库按章巩固，完成后定位易错知识点。', meta: '课程题库 · 章节巩固' }
  ];
  app.innerHTML = `<section class="level-choice-page">${locationBar('#home', '返回首页', [{ label: '首页', href: '#home' }, { label: '考试刷题' }])}<div class="level-choice-grid drill-levels">${modes.map(mode => `<a class="level-feature-card" href="#quiz/${encodeURIComponent(mode.id)}/0"><span class="level-card-mark" aria-hidden="true">${mode.mark}</span><div><small>${mode.meta}</small><b>${mode.title}</b><p>${mode.text}</p></div><i>即点即练 →</i></a>`).join('')}</div></section>`;
  document.title = '考试刷题｜明理·法观';
}

function chapterQuestions(chapterId) {
  return KNOWLEDGE_CATALOG.filter(item => item.chapter === chapterId).map((item, index) => ({
    id: `chapter-${item.id}`,
    knowledgeTitle: item.title,
    type: index % 4 === 3 ? '判断' : '单选',
    source: '章节巩固题',
    stem: index % 4 === 3 ? `判断：“${item.pitfall}”这一表述是正确的。` : `关于“${item.title}”，下列表述最准确的是？`,
    options: index % 4 === 3 ? ['正确', '错误'] : [item.definition, item.pitfall, '这一知识只适用于书本，不能解释现实问题。', '主观愿望可以直接改变客观规律。'],
    answer: index % 4 === 3 ? [1] : [0],
    explain: `${item.definition} ${item.explanation}`
  }));
}

const WRONG_BOOK_KEY = 'mingli-v4-wrong-book';

function finalExamBank() {
  return Array.isArray(window.FINAL_EXAM_BANK) ? window.FINAL_EXAM_BANK : [];
}

function finalQuestionRoute(index) {
  const safeIndex = Math.max(0, Number(index) || 0);
  return `#quiz/${encodeURIComponent('期末')}/${Math.floor(safeIndex / 5)}/${safeIndex % 5}`;
}

function loadWrongBook() {
  try {
    const value = JSON.parse(localStorage.getItem(WRONG_BOOK_KEY) || '{}');
    return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  } catch (_) { return {}; }
}

function saveWrongBook(book) {
  try { localStorage.setItem(WRONG_BOOK_KEY, JSON.stringify(book)); } catch (_) {}
}

function recordFinalSubmission(details) {
  if (state.quiz?.kind !== 'track' || state.quiz?.key !== '期末') return;
  const signature = JSON.stringify(details.map(item => [item.question.id, item.chosen]));
  const signatureKey = `mingli-v4-submission-${state.quiz.identity}`;
  try {
    if (localStorage.getItem(signatureKey) === signature) return;
    localStorage.setItem(signatureKey, signature);
  } catch (_) {}
  const book = loadWrongBook();
  details.forEach(item => {
    const previous = book[item.question.id] || { wrongCount: 0, attempts: 0, lastWrongChosen: [] };
    const record = { ...previous, attempts: previous.attempts + 1, lastAt: Date.now() };
    if (item.ok) {
      if (record.wrongCount) record.mastered = true;
    } else {
      record.wrongCount += 1;
      record.mastered = false;
      record.lastWrongChosen = item.chosen;
    }
    if (record.wrongCount) book[item.question.id] = record;
  });
  saveWrongBook(book);
}

function finalPracticeSummary() {
  const bank = finalExamBank();
  const batches = Math.ceil(bank.length / 5);
  let answered = 0;
  let resumeBatch = 0;
  let resumeQuestion = 0;
  let resumeFound = false;
  for (let batch = 0; batch < batches; batch += 1) {
    const questions = bank.slice(batch * 5, batch * 5 + 5);
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(`mingli-v4-track-期末-${batch}`) || '{}'); } catch (_) {}
    const validAnswers = questions.filter(question => Array.isArray(saved.answers?.[question.id]) && saved.answers[question.id].length);
    answered += validAnswers.length;
    if (!resumeFound && validAnswers.length < questions.length) {
      resumeFound = true;
      resumeBatch = batch;
      resumeQuestion = Math.min(Math.max(Number(saved.current) || 0, 0), Math.max(questions.length - 1, 0));
    }
  }
  if (!resumeFound && bank.length) { resumeBatch = 0; resumeQuestion = 0; }
  const wrongBook = loadWrongBook();
  const wrongRecords = Object.values(wrongBook);
  return {
    total: bank.length,
    answered,
    progress: bank.length ? Math.round(answered / bank.length * 100) : 0,
    resumeBatch,
    resumeQuestion,
    wrongTotal: wrongRecords.length,
    pendingWrong: wrongRecords.filter(record => !record.mastered).length
  };
}

function renderFinalPractice() {
  const summary = finalPracticeSummary();
  app.innerHTML = `<section class="final-practice-page">${locationBar('#learn', '返回用原理观现实', [{ label: '首页', href: '#home' }, { label: LEARN_NAME, href: '#learn' }, { label: QUIZ_NAME }])}
    <header class="practice-dashboard-head"><small>原理理解 · 实践判断</small><h1>${QUIZ_NAME}</h1><p>每五题为一节，提交后自动生成逐题分析，并把答错题目写入本机错题本。</p></header>
    <div class="practice-progress"><div><span>当前进度</span><b>${summary.answered}<small> / ${summary.total}</small></b></div><div class="practice-progress-line"><i style="width:${summary.progress}%"></i></div><p>已完成 ${summary.progress}% · ${summary.pendingWrong ? `${summary.pendingWrong} 道仍需订正` : '当前没有待订正错题'}</p></div>
    <div class="practice-entry-grid">
      <a class="practice-entry primary" href="#quiz/${encodeURIComponent('期末')}/${summary.resumeBatch}/${summary.resumeQuestion}"><span>01</span><div><small>五题一节</small><h2>${summary.answered ? '继续上次练习' : '开始第一组练习'}</h2><p>保留本机答题进度，交卷后立即查看答案和知识点定位。</p></div><i>开始刷题 →</i></a>
      <a class="practice-entry" href="#question-bank"><span>02</span><div><small>按章检索</small><h2>查看全部题库</h2><p>浏览全部原理练习，搜索题干并直接跳转到任意一道题。</p></div><i>打开题库 →</i></a>
      <a class="practice-entry" href="#wrong-book"><span>03</span><div><small>复盘订正</small><h2>我的错题本</h2><p>${summary.wrongTotal ? `已记录 ${summary.wrongTotal} 道错题，其中 ${summary.pendingWrong} 道仍需订正。` : '交卷后，答错题目及其解析会自动汇总到这里。'}</p></div><i>查看错题 →</i></a>
    </div><p class="local-progress-note">学习进度仅保存在当前浏览器中，不上传个人信息；清理浏览器网站数据会同时清除记录。</p></section>`;
  document.title = `${QUIZ_NAME}｜明理·法观`;
}

function renderQuestionBank(rawChapter = 'all') {
  const bank = finalExamBank();
  const chapterId = rawChapter && rawChapter !== 'all' ? rawChapter : 'all';
  const indexed = bank.map((question, index) => ({ question, index }));
  const visible = chapterId === 'all' ? indexed : indexed.filter(item => item.question.chapterId === chapterId);
  app.innerHTML = `<section class="question-bank-page">${locationBar('#final-practice', '返回练习中心', [{ label: '首页', href: '#home' }, { label: QUIZ_NAME, href: '#final-practice' }, { label: '全部题库' }])}
    <header class="bank-toolbar"><div><small>完整题库 · 点击即练</small><h1>全部题库</h1><p>可按教材章节筛选或搜索题干，点击任意题目直接进入它所在的五题练习。</p></div><label><span>搜索题干</span><input type="search" data-question-bank-search placeholder="输入关键词"></label></header>
    <nav class="bank-chapters" aria-label="题库章节筛选"><a class="${chapterId === 'all' ? 'active' : ''}" href="#question-bank/all">全部</a>${SITE_DATA.chapters.map(chapter => `<a class="${chapterId === chapter.id ? 'active' : ''}" href="#question-bank/${chapter.id}">${chapter.no}</a>`).join('')}</nav>
    <div class="bank-list-meta"><span data-bank-visible-count>${visible.length} 道题</span><small>题目按原题库顺序编排</small></div>
    <div class="question-bank-list">${visible.map(({ question, index }) => { const chapter = chapterBy(question.chapterId); return `<a href="${finalQuestionRoute(index)}" data-question-bank-item data-search-text="${esc(`${question.stem} ${question.type} ${chapter?.title || ''}`.toLowerCase())}"><span>${String(index + 1).padStart(3, '0')}</span><div><small>${esc(question.type)} · ${chapter ? `${chapter.no} ${chapter.title}` : '综合练习'}</small><h2>${esc(question.stem)}</h2></div><i>进入本题 →</i></a>`; }).join('')}</div>
    <div class="bank-empty" data-bank-empty hidden>没有找到匹配题目，请缩短关键词后重试。</div></section>`;
  document.title = `全部题库｜${QUIZ_NAME}｜明理·法观`;
}

function renderWrongBook() {
  const bank = finalExamBank();
  const indexById = new Map(bank.map((question, index) => [question.id, index]));
  const book = loadWrongBook();
  const records = Object.entries(book).map(([id, record]) => ({ question: bank[indexById.get(id)], index: indexById.get(id), record })).filter(item => item.question).sort((a, b) => b.record.lastAt - a.record.lastAt);
  const pending = records.filter(item => !item.record.mastered).length;
  app.innerHTML = `<section class="wrong-book-page">${locationBar('#final-practice', '返回练习中心', [{ label: '首页', href: '#home' }, { label: QUIZ_NAME, href: '#final-practice' }, { label: '我的错题本' }])}
    <header class="wrong-book-head"><small>本机记录 · 持续订正</small><h1>我的错题本</h1><p>${records.length ? `共记录 ${records.length} 道错题，${pending} 道仍需订正；答对后会标记为“已订正”，但历史解析仍会保留。` : '完成一组练习并交卷后，答错题目会自动出现在这里。'}</p></header>
    ${records.length ? `<div class="wrong-question-list">${records.map(({ question, index, record }) => { const chosen = record.lastWrongChosen?.length ? record.lastWrongChosen.map(value => `${String.fromCharCode(65 + value)}. ${question.options[value] || ''}`).join('；') : '未作答'; const answer = question.answer.map(value => `${String.fromCharCode(65 + value)}. ${question.options[value] || ''}`).join('；'); return `<article class="${record.mastered ? 'mastered' : ''}"><header><span>题号 ${String(index + 1).padStart(3, '0')}</span><small>${esc(question.type)} · 错误 ${record.wrongCount} 次</small><b>${record.mastered ? '已订正' : '待订正'}</b></header><h2>${esc(question.stem)}</h2><div class="wrong-compare"><p><strong>上次错选</strong>${esc(chosen)}</p><p><strong>正确答案</strong>${esc(answer)}</p></div><details><summary>查看题目解析</summary><p>${esc(question.explain)}</p></details><a href="${finalQuestionRoute(index)}">重新练习这道题 →</a></article>`; }).join('')}</div>` : '<div class="wrong-book-empty"><b>还没有错题记录</b><p>先完成一组五题练习，交卷后再回来查看。</p><a href="#quiz/%E6%9C%9F%E6%9C%AB/0/0">开始练习 →</a></div>'}
    <p class="local-progress-note">错题数据仅储存在当前浏览器。本站不会将答题记录上传至服务器。</p></section>`;
  document.title = '我的错题本｜明理·法观';
}

function quizSource(kind, key) {
  if (kind === 'chapter') {
    const chapter = chapterBy(key) || SITE_DATA.chapters[0];
    return { label: `${chapter.no}章节练习`, backHref: `#map/${chapter.id}`, backLabel: `返回${chapter.no}图谱`, questions: chapterQuestions(chapter.id) };
  }
  const importedFinalBank = finalExamBank();
  const questions = key === '期末' && importedFinalBank.length ? importedFinalBank : SITE_DATA.questions.filter(question => question.track === key);
  return { label: key === '考研' ? '考研模拟练习' : key === '公考' ? '考公模拟练习' : QUIZ_NAME, backHref: key === '期末' ? '#final-practice' : '#learn', backLabel: key === '期末' ? '返回练习中心' : '返回用原理观现实', questions };
}

function startQuiz(kind, rawKey, rawBatch = '0', rawQuestion) {
  const key = decode(rawKey || (kind === 'chapter' ? 'intro' : '期末'));
  const source = quizSource(kind, key);
  const maxBatch = Math.max(0, Math.ceil(source.questions.length / 5) - 1);
  const batch = Math.min(Math.max(Number(rawBatch) || 0, 0), maxBatch);
  const questions = source.questions.slice(batch * 5, batch * 5 + 5);
  const identity = `${kind}-${key}-${batch}`;
  if (!state.quiz || state.quiz.identity !== identity) {
    state.quiz = { identity, kind, key, batch, allQuestions: source.questions, questions, label: source.label, backHref: source.backHref, backLabel: source.backLabel };
    state.answers = {};
    state.current = 0;
    try {
      const saved = JSON.parse(localStorage.getItem(`mingli-v4-${identity}`) || '{}');
      if (saved.ids?.join(',') === questions.map(question => question.id).join(',')) {
        state.answers = saved.answers || {};
        state.current = Math.min(saved.current || 0, questions.length - 1);
      }
    } catch (_) {}
  }
  if (rawQuestion !== undefined) state.current = Math.min(Math.max(Number(rawQuestion) || 0, 0), Math.max(questions.length - 1, 0));
  renderQuiz();
}

function saveQuiz() {
  if (!state.quiz) return;
  try {
    localStorage.setItem(`mingli-v4-${state.quiz.identity}`, JSON.stringify({ ids: state.quiz.questions.map(question => question.id), answers: state.answers, current: state.current }));
  } catch (_) {}
}

function questionKnowledge(question) {
  const exact = question.knowledgeTitle ? knowledgeByTitle(question.knowledgeTitle) : knowledgeByPointId(question.point);
  if (exact) return exact;
  const chapter = question.chapterId ? chapterBy(question.chapterId) : null;
  return chapter ? { title: chapter.title, chapterId: chapter.id, pitfall: '回到本章图谱，核对概念定义、题干条件与选项边界。' } : null;
}

function knowledgeLink(knowledge) {
  return knowledge?.chapterId ? `#map/${knowledge.chapterId}` : `#knowledge/${encodeURIComponent(knowledge?.title || '')}`;
}

function renderQuiz() {
  const { questions, label, backHref, backLabel, batch } = state.quiz;
  const question = questions[state.current];
  if (!question) { location.hash = backHref; return; }
  const selected = state.answers[question.id] || [];
  const knowledge = questionKnowledge(question);
  const isFinalPractice = state.quiz.kind === 'track' && state.quiz.key === '期末';
  const wrongCount = isFinalPractice ? Object.keys(loadWrongBook()).length : 0;
  app.innerHTML = `<section class="quiz-page">${locationBar(backHref, backLabel, [{ label: '首页', href: '#home' }, { label: state.quiz.kind === 'track' ? LEARN_NAME : '知行图谱', href: backHref }, { label: `${label} · 第${batch + 1}节` }])}<header class="quiz-status"><div><span>${label} · 第${batch + 1}节</span><div><i style="width:${((state.current + 1) / questions.length) * 100}%"></i></div></div><b>${state.current + 1}<small>/ ${questions.length}</small></b></header>
  <div class="quiz-body"><article class="question-card"><div class="question-tags"><span>${question.type}</span><span>${question.source}</span>${knowledge ? `<a href="${knowledgeLink(knowledge)}">${knowledge.title} ↗</a>` : ''}</div><h1>${question.stem}</h1><div class="options">${question.options.map((option, optionIndex) => `<button class="option ${selected.includes(optionIndex) ? 'selected' : ''}" data-option="${optionIndex}"><span>${String.fromCharCode(65 + optionIndex)}</span><p>${option}</p><i>${selected.includes(optionIndex) ? '✓' : ''}</i></button>`).join('')}</div><div class="quiz-actions"><button data-prev ${state.current === 0 ? 'disabled' : ''}>← 上一题</button>${state.current === questions.length - 1 ? '<button class="primary-action" data-submit>提交本节并查看分析</button>' : '<button class="primary-action" data-next>下一题 →</button>'}</div></article>
  <aside class="answer-panel"><div class="answer-panel-head"><h2>本节答题卡</h2>${isFinalPractice ? `<nav><a href="#question-bank">全部题库</a><a href="#wrong-book">错题本${wrongCount ? ` ${wrongCount}` : ''}</a></nav>` : ''}</div><div class="answer-grid">${questions.map((item, questionIndex) => `<button class="${questionIndex === state.current ? 'current' : ''} ${state.answers[item.id]?.length ? 'answered' : ''}" data-jump="${questionIndex}">${questionIndex + 1}</button>`).join('')}</div></aside></div></section>`;
  document.title = `${label} ${state.current + 1}/${questions.length}｜明理·法观`;
}

function resultsRoute(quiz = state.quiz) {
  return `#results/${quiz.kind}/${encodeURIComponent(quiz.key)}/${quiz.batch}`;
}

function quizRoute(kind, key, batch) {
  return kind === 'chapter' ? `#chapter-quiz/${encodeURIComponent(key)}/${batch}` : `#quiz/${encodeURIComponent(key)}/${batch}`;
}

function renderResults(kind, rawKey, rawBatch = '0') {
  const key = decode(rawKey || (kind === 'chapter' ? 'intro' : '期末'));
  const batch = Number(rawBatch) || 0;
  const identity = `${kind}-${key}-${batch}`;
  if (!state.quiz || state.quiz.identity !== identity) startQuiz(kind, key, String(batch));
  const { questions, allQuestions, label, backHref, backLabel } = state.quiz;
  let correct = 0;
  const details = questions.map(question => {
    const chosen = (state.answers[question.id] || []).slice().sort((a, b) => a - b);
    const answer = question.answer.slice().sort((a, b) => a - b);
    const ok = chosen.join(',') === answer.join(',');
    if (ok) correct += 1;
    return { question, chosen, ok, knowledge: questionKnowledge(question) };
  });
  const rate = questions.length ? Math.round(correct / questions.length * 100) : 0;
  const weak = [...new Map(details.filter(item => !item.ok && item.knowledge).map(item => [item.knowledge.title, item.knowledge])).values()];
  const hasNext = (batch + 1) * 5 < allQuestions.length;
  recordFinalSubmission(details);
  app.innerHTML = `<section class="results-page">${locationBar(backHref, backLabel, [{ label: '首页', href: '#home' }, { label: state.quiz.kind === 'track' ? LEARN_NAME : '知行图谱', href: backHref }, { label: `${label}结果` }])}<div class="score-block"><span>第${batch + 1}节完成</span><h1>${rate}<small>分</small></h1><p>${rate >= 80 ? '原理定位较准确，可以继续下一节。' : '先复习下方薄弱知识，再继续练习。'}</p><div><b>${questions.length}<small>本节题数</small></b><b>${correct}<small>答对</small></b><b>${questions.length - correct}<small>需复习</small></b></div></div>
  <div class="result-next">${hasNext ? `<a href="${quizRoute(kind, key, batch + 1)}">继续下一组五题 →</a>` : `<a href="${backHref}">本组已完成，返回学习入口 →</a>`}<a class="secondary" href="${quizRoute(kind, key, batch)}">重新练习本节</a>${kind === 'track' && key === '期末' ? '<a class="secondary" href="#wrong-book">查看我的错题本</a>' : ''}</div>
  <div class="results-layout"><div class="answer-analysis"><header><h2>逐题分析</h2></header>${details.map((item, detailIndex) => `<article class="answer-item ${item.ok ? 'correct' : 'wrong'}"><div class="answer-title"><span>${detailIndex + 1}</span><div><small>${item.question.type} · ${item.question.source}</small><h3>${item.question.stem}</h3></div><b>${item.ok ? '正确' : '易错'}</b></div><p><strong>正确答案：</strong>${item.question.answer.map(value => String.fromCharCode(65 + value)).join('、')}　<strong>你的答案：</strong>${item.chosen.length ? item.chosen.map(value => String.fromCharCode(65 + value)).join('、') : '未作答'}</p><div>${item.question.explain}</div>${item.knowledge ? `<a href="${knowledgeLink(item.knowledge)}">定位${item.knowledge.chapterId ? '章节' : '知识点'}：${item.knowledge.title} →</a>` : ''}</article>`).join('')}</div><aside class="weak-points"><span>易错知识定位</span><h2>${weak.length}个需要复习</h2>${weak.length ? weak.map((item, weakIndex) => `<a href="${knowledgeLink(item)}"><b>${weakIndex + 1}</b><div><strong>${item.title}</strong><small>${item.pitfall}</small></div></a>`).join('') : '<p>本节没有错题，继续保持。</p>'}<a class="map-review" href="#map/${kind === 'chapter' ? key : 'c1'}">回到知行图谱 →</a></aside></div></section>`;
  document.title = `${label}结果分析｜明理·法观`;
}

function ensureSearch() {
  if (document.querySelector('.search-modal')) return;
  document.body.insertAdjacentHTML('beforeend', `<div class="search-modal" aria-hidden="true"><div class="search-backdrop" data-search-close></div><div class="search-dialog" role="dialog" aria-modal="true" aria-label="全站搜索"><div class="search-input-wrap"><span>⌕</span><input type="search" placeholder="搜索知识点、章节、法治案例……" aria-label="搜索内容"><kbd>退出</kbd></div><div class="search-results"><div class="search-empty"><b>搜索全站知识</b><p>试试“矛盾”“实践”“价值规律”或“算法”。</p></div></div></div></div>`);
}

function openSearch() {
  ensureSearch();
  const modal = document.querySelector('.search-modal');
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  setTimeout(() => modal.querySelector('input').focus(), 50);
}

function closeSearch() {
  const modal = document.querySelector('.search-modal');
  modal?.classList.remove('open');
  modal?.setAttribute('aria-hidden', 'true');
}

function runSearch(query) {
  const target = document.querySelector('.search-results');
  const value = query.trim().toLowerCase();
  if (!value) { target.innerHTML = '<div class="search-empty"><b>搜索全站知识</b><p>试试“矛盾”“实践”“价值规律”或“算法”。</p></div>'; return; }
  const knowledge = KNOWLEDGE_CATALOG.filter(item => [item.title, item.definition, item.explanation, item.memory, item.exam].join(' ').toLowerCase().includes(value));
  const cases = SITE_DATA.cases.filter(item => [item.title, item.topic, item.brief, ...item.principles].join(' ').toLowerCase().includes(value));
  const chapters = SITE_DATA.chapters.filter(chapter => [chapter.title, chapter.focus, ...chapter.sections].join(' ').toLowerCase().includes(value));
  const results = [
    ...chapters.map(chapter => ({ type: '教材章节', title: `${chapter.no} · ${chapter.title}`, href: `#map/${chapter.id}` })),
    ...knowledge.map(item => ({ type: '知识精讲', title: item.title, href: `#knowledge/${encodeURIComponent(item.title)}` })),
    ...cases.map(item => ({ type: '法治案例', title: item.title, href: `#case/${item.id}` }))
  ];
  target.innerHTML = results.length ? `<div class="search-count">找到 ${results.length} 条内容</div>${results.map(item => `<a href="${item.href}" data-search-close><small>${item.type}</small><b>${item.title}</b><span>→</span></a>`).join('')}` : '<div class="search-empty"><b>没有找到直接匹配</b><p>换一个更短的关键词试试。</p></div>';
}

function ensureFeatureTransition(kind) {
  if (document.querySelector(`[data-feature-transition="${kind}"]`)) return;
  const isTheory = kind === 'theory';
  document.body.insertAdjacentHTML('beforeend', `<div class="lab-transition ${isTheory ? 'theory-transition' : ''}" data-feature-transition="${kind}" aria-hidden="true"><div class="transition-ornament" aria-hidden="true"><i></i><i></i><i></i></div><div class="lab-transition-content"><span>明理 · 法观</span><b>${isTheory ? '从理论出发<br>与时代同行' : '从看见新闻<br>到理解时代'}</b><i></i><p>${isTheory ? '读思想 · 见方法 · 观现实' : '以原理观现实 · 以法治见真知'}</p><small class="transition-skip-hint">点击屏幕直接进入</small></div></div>`);
}

function clearFeatureTransitionTimers() {
  featureTransitionTimers.forEach(timer => clearTimeout(timer));
  featureTransitionTimers = [];
}

function finishFeatureTransition(overlay, href) {
  if (!overlay || !labTransitionActive) return;
  clearFeatureTransitionTimers();
  location.hash = href || overlay.dataset.targetHref || '#lab';
  overlay.classList.add('leaving');
  featureTransitionTimers.push(setTimeout(() => {
    overlay.classList.remove('show', 'leaving');
    overlay.removeAttribute('data-target-href');
    labTransitionActive = false;
    featureTransitionTimers = [];
  }, 720));
}

function enterFeatureWithTransition(href, kind) {
  if (labTransitionActive || location.hash === href) return;
  ensureFeatureTransition(kind);
  const overlay = document.querySelector(`[data-feature-transition="${kind}"]`);
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { location.hash = href; return; }
  clearFeatureTransitionTimers();
  labTransitionActive = true;
  overlay.dataset.targetHref = href;
  overlay.classList.remove('leaving');
  requestAnimationFrame(() => overlay.classList.add('show'));
  featureTransitionTimers.push(setTimeout(() => { location.hash = href; }, 2100));
  featureTransitionTimers.push(setTimeout(() => { overlay.classList.add('leaving'); }, 3300));
  featureTransitionTimers.push(setTimeout(() => {
    overlay.classList.remove('show', 'leaving');
    overlay.removeAttribute('data-target-href');
    labTransitionActive = false;
    featureTransitionTimers = [];
  }, 4200));
}

function drawXiezhiTerm() {
  if (xiezhiShuffle) return;
  cancelXiezhiAssistant();
  stopXiezhiTimer();
  document.querySelectorAll('.clock-actions button').forEach(b => b.disabled = true);
  let next = Math.floor(Math.random() * XIEZHI_TERMS.length);
  if (XIEZHI_TERMS.length > 1 && next === state.xiezhi.termIndex) next = (next + 1) % XIEZHI_TERMS.length;
  const finalTerm = XIEZHI_TERMS[next];
  const display = document.querySelector('[data-term-display]');
  document.querySelectorAll('[data-draw-term]').forEach(button => { button.disabled = true; });
  document.querySelector('.term-draw')?.classList.add('is-shuffling');
  const started = performance.now();
  const duration = 2800;
  const tick = () => {
    if (!location.hash.startsWith('#xiezhi')) { xiezhiShuffle = null; return; }
    const progress = Math.min(1, (performance.now() - started) / duration);
    if (progress >= 1) {
      xiezhiShuffle = null;
      state.xiezhi = { term: finalTerm, termIndex: next, phase: 'idle', remaining: 600, running: false };
      updateXiezhiTermCard(finalTerm, next);
      return;
    }
    setTermPreview(display, XIEZHI_TERMS[Math.floor(Math.random() * XIEZHI_TERMS.length)]);
    xiezhiShuffle = setTimeout(tick, 45 + 330 * progress ** 2.3);
  };
  xiezhiShuffle = setTimeout(tick, 45);
}

function drawDebateTopic() {
  if (debateShuffle) return;
  const previous = state.debate.index;
  let next = Math.floor(Math.random() * DEBATE_TOPICS.length);
  if (DEBATE_TOPICS.length > 1 && next === previous) next = (next + 1) % DEBATE_TOPICS.length;
  state.debate = { index: -1, revealed: 0, drawing: true };
  renderDebate();
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    state.debate = { index: next, revealed: 0, drawing: false };
    renderDebate();
    return;
  }
  const stageLabel = document.querySelector('[data-debate-stage-label]');
  const topicPreview = document.querySelector('[data-debate-topic-preview]');
  const progressLine = document.querySelector('[data-debate-progress]');
  const phases = ['校准事实', '辨析概念', '寻找原理', '审视法治'];
  const started = performance.now();
  const duration = 3000;
  let activePhase = -1;
  const tick = () => {
    if (!location.hash.startsWith('#debate')) { debateShuffle = null; state.debate.drawing = false; return; }
    const progress = Math.min(1, (performance.now() - started) / duration);
    if (progress >= 1) {
      debateShuffle = null;
      state.debate = { index: next, revealed: 0, drawing: false };
      renderDebate();
      return;
    }
    const phase = Math.min(phases.length - 1, Math.floor(progress * phases.length));
    if (phase !== activePhase && stageLabel) { stageLabel.textContent = phases[phase]; activePhase = phase; }
    if (topicPreview) {
      const preview = DEBATE_TOPICS[Math.floor(Math.random() * DEBATE_TOPICS.length)].title;
      topicPreview.textContent = preview;
      topicPreview.className = '';
    }
    if (progressLine) progressLine.style.transform = `scaleX(${progress})`;
    debateShuffle = setTimeout(tick, 55 + 260 * progress ** 2.4);
  };
  debateShuffle = setTimeout(tick, 60);
}

function setActiveNav(root) {
  const group = ['theory', 'news', 'reading', 'theory-article'].includes(root) ? 'theory' : ['lab', 'practice', 'case', 'xiezhi', 'debate'].includes(root) ? 'lab' : ['learn', 'concepts', 'map', 'knowledge', 'point', 'chapter-quiz', 'drill', 'quiz', 'results', 'exams', 'exam', 'final-practice', 'question-bank', 'wrong-book'].includes(root) ? 'learn' : root === 'disclaimer' ? 'disclaimer' : 'home';
  document.body.dataset.route = root;
  document.querySelectorAll('.main-nav a').forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${group}`));
  document.body.dataset.section = group;
}

function route(animateFallback = false) {
  const hash = location.hash.replace(/^#/, '') || 'home';
  const [root, ...parts] = hash.split('/');
  if (root !== 'xiezhi') {
    stopXiezhiWelcome();
    cancelXiezhiAssistant();
    if (state.xiezhi.phase === 'speaking') { state.xiezhi.phase = 'ready'; state.xiezhi.remaining = 180; }
    stopXiezhiTimer();
    if (xiezhiShuffle) { clearTimeout(xiezhiShuffle); xiezhiShuffle = null; }
  }
  if (root !== 'debate' && debateShuffle) { clearTimeout(debateShuffle); debateShuffle = null; state.debate.drawing = false; }
  if (root !== 'concepts' && conceptDrawTimer) { clearTimeout(conceptDrawTimer); conceptDrawTimer = null; }
  setActiveNav(root);
  app.classList.remove('page-enter');
  window.scrollTo({ top: 0, behavior: 'instant' });
  if (root === 'home') renderTrainingHome();
  else if (root === 'lab') renderTrainingLab();
  else if (root === 'theory') { theorySelectedIndex = -1; renderTheory(); }
  else if (root === 'news') renderTheory();
  else if (root === 'reading') { theorySelectedIndex = -1; renderTheory(); }
  else if (root === 'theory-article') renderGuidedArticle(parts[0]);
  else if (root === 'learn') renderTrainingLearn();
  else if (root === 'concepts') renderConcepts();
  else if (root === 'final-practice') renderFinalPractice();
  else if (root === 'question-bank') renderQuestionBank(parts[0]);
  else if (root === 'wrong-book') renderWrongBook();
  else if (root === 'disclaimer') renderDisclaimer();
  else if (root === 'map') renderMap(parts[0], parts[1]);
  else if (root === 'knowledge') renderKnowledge(parts.join('/'));
  else if (root === 'point') renderPoint(parts[0]);
  else if (root === 'practice' || root === 'sources') renderTrainingPractice();
  else if (root === 'case') renderTrainingCase(parts[0]);
  else if (root === 'xiezhi') renderXiezhi();
  else if (root === 'debate') renderDebate();
  else if (root === 'drill' || root === 'exams') renderTrainingLearn();
  else if (root === 'chapters' || root === 'chapter') renderMap(parts[0]);
  else if (root === 'chapter-quiz') startQuiz('chapter', parts[0], parts[1]);
  else if (root === 'quiz' || root === 'exam') startQuiz('track', parts[0], parts[1], parts[2]);
  else if (root === 'results') renderResults(parts[0] || 'track', parts[1], parts[2]);
  else renderTrainingHome();
  if (animateFallback) {
    void app.offsetWidth;
    app.classList.add('page-enter');
  }
}

function runOpening() {
  const opening = document.querySelector('#opening');
  let alreadySeen = false;
  try { alreadySeen = sessionStorage.getItem('mingli-opening-v4') === '1'; } catch (_) {}
  if (alreadySeen || (location.hash && location.hash !== '#home')) { opening.remove(); return; }
  opening.showModal();
  opening.classList.add('play');
  opening.addEventListener('cancel', event => event.preventDefault());
  opening.addEventListener('click', () => {
    try { sessionStorage.setItem('mingli-opening-v4', '1'); } catch (_) {}
    opening.classList.add('leave');
    setTimeout(() => opening.remove(), matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 360);
  }, { once: true });
}

document.addEventListener('click', event => {
  const activeTransition = event.target.closest('[data-feature-transition].show');
  if (activeTransition && ['lab', 'theory'].includes(activeTransition.dataset.featureTransition) && !activeTransition.classList.contains('leaving')) {
    event.preventDefault();
    finishFeatureTransition(activeTransition, activeTransition.dataset.targetHref);
    return;
  }
  const labEntry = event.target.closest('[data-lab-entry]');
  if (labEntry) { event.preventDefault(); document.querySelector('.main-nav').classList.remove('open'); if (!location.hash || location.hash === '#home') enterFeatureWithTransition(labEntry.getAttribute('href'), 'lab'); else location.hash = labEntry.getAttribute('href'); return; }
  const theoryEntry = event.target.closest('[data-theory-entry]');
  if (theoryEntry) { event.preventDefault(); document.querySelector('.main-nav').classList.remove('open'); if (!location.hash || location.hash === '#home') enterFeatureWithTransition(theoryEntry.getAttribute('href'), 'theory'); else location.hash = theoryEntry.getAttribute('href'); return; }
  const labCard = event.target.closest('.lab-feature-card');
  if (labCard && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
    event.preventDefault();
    if (labCardNavigating) return;
    labCardNavigating = true;
    if (labCard.getAttribute('href') === '#xiezhi') playXiezhiWelcome();
    document.querySelector('.lab-hub')?.classList.add('is-exiting');
    setTimeout(() => { location.hash = labCard.getAttribute('href'); labCardNavigating = false; }, 105);
    return;
  }
  const theoryFilterButton = event.target.closest('[data-theory-filter]');
  if (theoryFilterButton) { theoryFilter = theoryFilterButton.dataset.theoryFilter; theorySelectedIndex = -1; renderTheory(); return; }
  const theoryArticleLink = event.target.closest('[data-theory-article]');
  if (theoryArticleLink) {
    event.preventDefault();
    const articleIndex = Number(theoryArticleLink.dataset.theoryArticle);
    if (theorySelectedIndex !== articleIndex || !theoryArticleLink.classList.contains('is-selected')) {
      document.querySelectorAll('.theory-article-link').forEach(link => link.classList.remove('is-selected', 'is-selecting'));
      theorySelectedIndex = articleIndex;
      theoryArticleLink.classList.add('is-selected');
      return;
    }
    theoryArticleLink.classList.add('is-selecting');
    setTimeout(() => { location.hash = theoryArticleLink.getAttribute('href'); }, 160);
    return;
  }
  const theoryCopy = event.target.closest('[data-copy-theory-url]');
  if (theoryCopy) {
    const url = theoryCopy.dataset.copyTheoryUrl;
    const sourceInput = document.querySelector('#theory-source-url');
    if (sourceInput) { sourceInput.focus(); sourceInput.select(); }
    Promise.resolve(navigator.clipboard?.writeText(url) || document.execCommand('copy'))
      .then(() => { theoryCopy.textContent = '已复制，可在浏览器打开'; })
      .catch(() => { theoryCopy.textContent = '请长按下方网址复制'; });
    return;
  }
  if (event.target.closest('[data-open-lexicon]')) { document.querySelector('.lexicon-dialog')?.showModal(); return; }
  if (event.target.closest('[data-close-lexicon]')) { document.querySelector('.lexicon-dialog')?.close(); return; }
  if (event.target.matches('.lexicon-dialog')) { event.target.close(); return; }
  const scrollTarget = event.target.closest('[data-scroll]');
  if (scrollTarget) {
    event.preventDefault();
    document.getElementById(scrollTarget.dataset.scroll)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  if (event.target.closest('.search-button')) openSearch();
  if (event.target.closest('[data-search-close]')) closeSearch();
  if (event.target.closest('.menu-button')) document.querySelector('.main-nav').classList.toggle('open');
  if (event.target.closest('.main-nav a')) document.querySelector('.main-nav').classList.remove('open');
  const option = event.target.closest('[data-option]');
  if (option && state.quiz) {
    const question = state.quiz.questions[state.current];
    const optionIndex = Number(option.dataset.option);
    const current = state.answers[question.id] || [];
    state.answers[question.id] = question.type === '多选' ? (current.includes(optionIndex) ? current.filter(item => item !== optionIndex) : [...current, optionIndex]) : [optionIndex];
    saveQuiz();
    renderQuiz();
  }
  const jump = event.target.closest('[data-jump]');
  if (jump && state.quiz) { state.current = Number(jump.dataset.jump); renderQuiz(); }
  if (event.target.closest('[data-prev]') && state.current > 0) { state.current -= 1; renderQuiz(); }
  if (event.target.closest('[data-next]') && state.current < state.quiz.questions.length - 1) { state.current += 1; saveQuiz(); renderQuiz(); }
  if (event.target.closest('[data-submit]') && state.quiz) location.hash = resultsRoute();
  if (event.target.closest('[data-draw-term]')) drawXiezhiTerm();
  if (event.target.closest('[data-research-start]') && state.xiezhi.term && !xiezhiShuffle) { state.xiezhi.phase = 'research'; state.xiezhi.remaining = 600; runXiezhiTimer(); updateXiezhiPanel(); }
  if (event.target.closest('[data-research-finish]') && !xiezhiShuffle) { stopXiezhiTimer(); state.xiezhi.phase = 'ready'; state.xiezhi.remaining = 180; updateXiezhiPanel(); }
  if (event.target.closest('[data-speech-start]')) { if (coachSession) return; state.xiezhi.phase = 'speaking'; state.xiezhi.remaining = 180; runXiezhiTimer(); updateXiezhiPanel(); }
  if (event.target.closest('[data-speech-finish]')) finishXiezhiSpeaking();
  if (event.target.closest('[data-timer-toggle]') && !xiezhiShuffle) {
    if (state.xiezhi.running) { stopXiezhiTimer(); updateXiezhiPanel(); }
    else { runXiezhiTimer(); updateXiezhiPanel(); }
  }
  if (event.target.closest('[data-draw-debate]')) drawDebateTopic();
  if (event.target.closest('[data-reveal-layer]')) { state.debate.revealed = 6; renderDebate(); }
});

document.addEventListener('input', event => {
  if (event.target.matches('.search-dialog input')) runSearch(event.target.value);
  if (event.target.matches('[data-lexicon-search]')) {
    const query = event.target.value.trim();
    document.querySelectorAll('[data-lexicon-term]').forEach(term => { term.hidden = !term.dataset.lexiconTerm.includes(query); });
  }
  if (event.target.matches('[data-question-bank-search]')) {
    const query = event.target.value.trim().toLowerCase();
    let visible = 0;
    document.querySelectorAll('[data-question-bank-item]').forEach(item => {
      item.hidden = Boolean(query) && !item.dataset.searchText.includes(query);
      if (!item.hidden) visible += 1;
    });
    const count = document.querySelector('[data-bank-visible-count]');
    const empty = document.querySelector('[data-bank-empty]');
    if (count) count.textContent = `${visible} 道题`;
    if (empty) empty.hidden = visible !== 0;
  }
});
document.addEventListener('keydown', event => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); openSearch(); }
  if (event.key === 'Escape') closeSearch();
});

function routeWithTransition() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (labTransitionActive) { route(false); return; }
  route(!reducedMotion);
}

window.addEventListener('hashchange', routeWithTransition);
window.addEventListener('resize', fitDebateTitle);
ensureSearch();
route(false);
runOpening();
