const SITE_DATA = {
  chapters: [
    { id: 'intro', no: '导论', title: '马克思主义是关于无产阶级和人类解放的科学', sections: ['什么是马克思主义', '马克思主义的创立与发展', '马克思主义的基本特征', '马克思主义的当代价值', '自觉学习和运用马克思主义'], focus: '立场·观点·方法', law: '理解习近平法治思想的马克思主义理论品格' },
    { id: 'c1', no: '第一章', title: '世界的物质性及发展规律', sections: ['世界的多样性与物质统一性', '事物的普遍联系和变化发展', '唯物辩证法是认识世界和改造世界的根本方法'], focus: '辩证思维', law: '以系统观念统筹发展与安全、权利与秩序' },
    { id: 'c2', no: '第二章', title: '实践与认识及其发展规律', sections: ['实践与认识', '真理与价值', '认识世界和改造世界'], focus: '实践观点', law: '从法治实践检验制度成效，坚持守正创新' },
    { id: 'c3', no: '第三章', title: '人类社会及其发展规律', sections: ['人类社会的存在与发展', '社会历史发展的动力', '人民群众在历史发展中的作用'], focus: '人民立场', law: '坚持以人民为中心，回应人民法治需求' },
    { id: 'c4', no: '第四章', title: '资本主义的本质及规律', sections: ['商品经济和价值规律', '资本主义经济制度', '资本主义上层建筑'], focus: '经济分析', law: '理解平台经济中的资本逻辑与公平规制' },
    { id: 'c5', no: '第五章', title: '资本主义的发展及其趋势', sections: ['垄断资本主义的形成与发展', '正确认识当代资本主义的新变化', '资本主义的历史地位和发展趋势'], focus: '全球视野', law: '认识数字垄断、算法权力与全球治理' },
    { id: 'c6', no: '第六章', title: '社会主义的发展及其规律', sections: ['社会主义五百年的历史进程', '科学社会主义基本原则', '在实践中探索社会主义的发展规律'], focus: '制度自信', law: '理解中国特色社会主义法治道路的历史逻辑' },
    { id: 'c7', no: '第七章', title: '共产主义崇高理想及其最终实现', sections: ['展望未来共产主义新社会', '实现共产主义是历史发展的必然趋势', '共产主义远大理想与中国特色社会主义共同理想'], focus: '理想信念', law: '把远大理想落实为推进法治中国建设的行动' }
  ],
  points: [
    { id:'marx-method', chapter:'intro', title:'马克思主义的基本特征', summary:'科学性、人民性、实践性和发展性相统一。', core:'马克思主义不是封闭的教条，而是在实践中不断发展的开放理论。', importance:5, frequency:5, difficulty:2, exams:['期末','考研','公考'], keywords:['科学性','人民性','实践性','发展性'], pitfall:'把四个特征割裂开来，忽略它们的统一关系。', law:'习近平法治思想坚持人民立场、问题导向和实践品格，是马克思主义法治理论中国化时代化的重要成果。' },
    { id:'material', chapter:'c1', title:'物质与意识的辩证关系', summary:'物质决定意识，意识对物质具有能动反作用。', core:'从客观实际出发，同时发挥正确意识对实践的指导作用。', importance:5, frequency:5, difficulty:3, exams:['期末','考研','公考'], keywords:['物质第一性','意识能动性','一切从实际出发'], pitfall:'只承认决定作用而否定能动性，或把能动性夸大成意识决定现实。', law:'法治建设必须立足国情和治理实际，也要以科学理论、制度规划引领治理实践。' },
    { id:'connection', chapter:'c1', title:'联系与发展的观点', summary:'世界上的事物处于普遍联系和永恒发展之中。', core:'用整体、动态和开放的眼光观察问题。', importance:4, frequency:4, difficulty:2, exams:['期末','考研','公考'], keywords:['普遍联系','永恒发展','系统观念'], pitfall:'把联系理解为任何事物之间都有直接联系。', law:'网络治理涉及平台、用户、监管、技术与社会文化，需要多主体协同而非单点治理。' },
    { id:'contradiction', chapter:'c1', title:'对立统一规律', summary:'矛盾是事物发展的根本动力，要坚持“两点论”和“重点论”。', core:'承认矛盾、分析矛盾的特殊性，并抓住主要矛盾和矛盾的主要方面。', importance:5, frequency:5, difficulty:4, exams:['期末','考研','公考'], keywords:['矛盾同一性','矛盾斗争性','主要矛盾','矛盾特殊性'], pitfall:'把“主要矛盾”和“矛盾的主要方面”混为一谈。', law:'算法治理既要促进创新，也要防范风险；需在具体场景中识别矛盾主次并寻求动态平衡。' },
    { id:'change', chapter:'c1', title:'量变质变与辩证否定', summary:'量变是质变的必要准备，质变是量变的必然结果。', core:'重视积累、把握节点，并以扬弃推动新事物发展。', importance:4, frequency:4, difficulty:3, exams:['期末','考研'], keywords:['量变','质变','度','扬弃'], pitfall:'把任何数量变化都直接等同于质变。', law:'网络风险的持续累积可能越过治理阈值；规则完善也往往经历试点、评估与制度化过程。' },
    { id:'practice', chapter:'c2', title:'实践与认识的辩证运动', summary:'实践是认识的基础，认识反过来指导实践。', core:'认识在实践—认识—再实践—再认识的循环中发展。', importance:5, frequency:5, difficulty:3, exams:['期末','考研','公考'], keywords:['实践基础','认识反作用','认识过程'], pitfall:'把一次实践的结论看成永恒不变的终极真理。', law:'法律制度要在治理实践中接受检验，并根据新技术、新问题持续完善。' },
    { id:'truth', chapter:'c2', title:'真理与价值的辩证统一', summary:'成功实践以真理尺度与价值尺度的统一为前提。', core:'既尊重客观规律，又满足人民需要、维护公共利益。', importance:5, frequency:5, difficulty:4, exams:['期末','考研','公考'], keywords:['真理尺度','价值尺度','人民利益'], pitfall:'认为事实判断可以自动替代价值判断。', law:'技术治理既要尊重技术规律，也要回答技术发展为了谁、保护谁的问题。' },
    { id:'actuality', chapter:'c2', title:'一切从实际出发', summary:'把客观存在的事物作为观察和处理问题的根本出发点。', core:'调查研究、尊重事实、具体问题具体分析。', importance:5, frequency:4, difficulty:2, exams:['期末','考研','公考'], keywords:['实事求是','调查研究','具体分析'], pitfall:'把经验照搬当作从实际出发。', law:'司法裁判必须以事实为根据、以法律为准绳，网络热点分析也应先核验事实。' },
    { id:'social', chapter:'c3', title:'社会存在与社会意识', summary:'社会存在决定社会意识，社会意识具有相对独立性。', core:'思想观念源于社会生活，也能反作用于社会发展。', importance:5, frequency:5, difficulty:3, exams:['期末','考研','公考'], keywords:['社会存在','社会意识','相对独立性'], pitfall:'把“决定”理解为机械的一一对应。', law:'网络规则回应数字社会的新型关系，同时法治观念也塑造清朗网络空间。' },
    { id:'people', chapter:'c3', title:'人民群众是历史的创造者', summary:'人民群众是社会物质财富、精神财富的创造者和社会变革的决定力量。', core:'坚持群众观点和群众路线。', importance:5, frequency:5, difficulty:2, exams:['期末','考研','公考'], keywords:['人民主体','群众路线','历史创造者'], pitfall:'否认杰出人物作用，或把个人作用凌驾于人民群众之上。', law:'全面依法治国必须坚持以人民为中心，依法保障人民权益、依靠人民推进法治。' },
    { id:'social-contradiction', chapter:'c3', title:'社会基本矛盾运动', summary:'生产力与生产关系、经济基础与上层建筑的矛盾推动社会发展。', core:'制度调整要适应生产力发展和经济基础变化。', importance:5, frequency:4, difficulty:4, exams:['期末','考研'], keywords:['生产力','生产关系','经济基础','上层建筑'], pitfall:'把“适合”理解为没有矛盾，忽略基本适合与局部不适合并存。', law:'数字生产力发展要求法律制度及时回应数据、算法和平台关系的新变化。' },
    { id:'technology', chapter:'c3', title:'科学技术的社会作用', summary:'科技是推动社会发展的重要力量，但其作用受社会制度和价值选择影响。', core:'坚持科技向善，统筹创新发展和风险治理。', importance:4, frequency:4, difficulty:3, exams:['期末','考研','公考'], keywords:['科技革命','双刃剑','科技向善'], pitfall:'技术决定论，认为技术可以脱离社会关系自动解决一切问题。', law:'AI换脸既能创新应用，也可能侵害人格权，必须通过制度引导其向上向善。' },
    { id:'value-law', chapter:'c4', title:'价值规律', summary:'商品价值量由社会必要劳动时间决定，交换以价值量为基础。', core:'价格围绕价值波动，价值规律调节资源配置并产生分化。', importance:5, frequency:5, difficulty:4, exams:['期末','考研','公考'], keywords:['价值','社会必要劳动时间','价格波动'], pitfall:'看到价格偏离价值就认为价值规律失效。', law:'平台定价不能借算法实施不合理差别待遇，市场调节需要公平竞争法治边界。' },
    { id:'surplus', chapter:'c4', title:'剩余价值生产', summary:'剩余价值是由雇佣工人创造、被资本无偿占有的超过劳动力价值的价值。', core:'揭示资本主义生产方式的本质。', importance:5, frequency:5, difficulty:4, exams:['期末','考研'], keywords:['劳动力商品','必要劳动','剩余劳动'], pitfall:'把剩余价值简单理解为流通中低买高卖的利润。', law:'理解平台劳动者权益，需要看到技术组织形式背后的劳动关系和利益分配。' },
    { id:'capital-conflict', chapter:'c4', title:'资本主义基本矛盾', summary:'生产社会化与生产资料资本主义私人占有之间的矛盾。', core:'基本矛盾通过经济危机等形式表现出来。', importance:4, frequency:4, difficulty:4, exams:['期末','考研'], keywords:['生产社会化','私人占有','经济危机'], pitfall:'把经济危机只归因于偶然管理失误。', law:'规制资本无序扩张是维护公平竞争和社会公共利益的重要制度任务。' },
    { id:'monopoly', chapter:'c5', title:'垄断资本主义', summary:'垄断在竞争中形成，并不能消除竞争。', core:'垄断与竞争并存，金融资本和垄断组织影响经济运行。', importance:5, frequency:4, difficulty:4, exams:['期末','考研','公考'], keywords:['垄断','竞争','金融资本'], pitfall:'认为垄断形成后竞争就完全消失。', law:'反垄断和反不正当竞争规则为平台权力设置边界，维护市场活力。' },
    { id:'globalization', chapter:'c5', title:'经济全球化及其影响', summary:'经济全球化深化世界联系，也带来利益失衡与治理挑战。', core:'以辩证眼光认识机遇与风险。', importance:4, frequency:4, difficulty:3, exams:['期末','考研','公考'], keywords:['全球化','机遇风险','全球治理'], pitfall:'对全球化作全盘肯定或全盘否定。', law:'统筹推进国内法治和涉外法治，为高水平开放提供制度保障。' },
    { id:'scientific-socialism', chapter:'c6', title:'科学社会主义基本原则', summary:'科学社会主义原则必须同各国具体实际相结合。', core:'把科学社会主义基本原则与中国实际、时代特征相结合。', importance:5, frequency:5, difficulty:3, exams:['期末','考研','公考'], keywords:['基本原则','具体实际','中国特色社会主义'], pitfall:'把基本原则当成僵化模板，否认实践创新。', law:'中国特色社会主义法治道路是历史逻辑、理论逻辑和实践逻辑的统一。' },
    { id:'socialism-practice', chapter:'c6', title:'社会主义在实践中发展', summary:'社会主义建设具有长期性，道路具有多样性，要在实践中开拓前进。', core:'尊重规律、立足国情、勇于探索。', importance:4, frequency:4, difficulty:3, exams:['期末','考研','公考'], keywords:['长期性','多样性','实践探索'], pitfall:'用单一模式衡量各国社会主义实践。', law:'法治中国建设坚持顶层设计与基层探索相结合，在实践中完善制度体系。' },
    { id:'ideal', chapter:'c7', title:'远大理想与共同理想', summary:'共产主义远大理想与中国特色社会主义共同理想相互联系、相互统一。', core:'把远大目标与现阶段实际行动结合起来。', importance:4, frequency:4, difficulty:2, exams:['期末','考研','公考'], keywords:['远大理想','共同理想','知行合一'], pitfall:'把理想理解为空想，或割裂远大理想与现实实践。', law:'推进法治中国建设，是在现实实践中实现人民美好生活与共同理想的重要行动。' }
  ],
  cases: [
    { id:'injunction', topic:'网络暴力与人格权保护', title:'两千万粉丝卷入网暴：人格权侵害禁令及时“止暴”', year:'2026发布', org:'最高人民法院', brief:'两名自媒体博主持续发布侮辱、诽谤内容并煽动粉丝攻击他人。法院综合传播速度、影响范围与损害难以弥补程度，依法作出为期六个月的人格权侵害禁令。', principles:['联系与发展','矛盾分析法','人民立场'], thought:'坚持以人民为中心，在法治轨道上维护网络空间秩序与人格尊严。', source:'https://www.court.gov.cn/zixun/xiangqing/512041.html' },
    { id:'defamation', topic:'网络暴力与人格权保护', title:'“73岁企业家豪娶29岁美女”谣言案', year:'2023发布', org:'最高人民法院', brief:'行为人为吸引流量，盗用网络图片捏造婚恋信息，引发大规模传播和网民攻击。法院依法以诽谤罪追究刑事责任。', principles:['社会意识反作用','量变质变','权利与秩序'], thought:'网络空间不是法外之地，权利行使必须以不损害他人合法权益为边界。', source:'https://www.court.gov.cn/zixun/xiangqing/413002.html' },
    { id:'ai-face', topic:'AI换脸与技术治理', title:'“换脸”模板擅用他人肖像：技术创新不能越过人格权边界', year:'2025发布', org:'最高人民法院', brief:'软件运营者未经许可将他人肖像制作成AI换脸模板供用户使用。人民法院认定其构成人格权侵害，明确新技术应用的权利边界。', principles:['科技的社会作用','真理与价值','矛盾分析法'], thought:'坚持发展和规范并重，以良法善治促进人工智能向上向善。', source:'https://www.court.gov.cn/zixun/xiangqing/467511.html' },
    { id:'deepfake-rule', topic:'AI换脸与技术治理', title:'AI合成肖像和声音用于带货：委托方未审核构成共同侵权', year:'2026发布', org:'最高人民法院', brief:'带货视频未经同意使用李某瑾公开演讲、授课片段，并配以高度近似的AI合成声音。委托推广的文化公司未审核素材授权，法院认定其构成共同侵权。', principles:['科技的社会作用','真理与价值','责任与联系'], thought:'坚持发展和安全并重，技术应用各参与方都应在法治轨道上履行与其控制能力相匹配的义务。', source:'https://www.court.gov.cn/zixun/xiangqing/512041.html' },
    { id:'price-rule', topic:'公平竞争与平台规制', title:'仅因股东身份不同设置不同收费：差别待遇纠纷案', year:'2026发布', org:'最高人民法院', brief:'园区内唯一的电镀污水处理企业，对核心交易条件相同的企业按45元、55元乃至65元每吨收取不同费用。最高法认定其构成反垄断法禁止的差别待遇。', principles:['价值规律','矛盾分析法','公平正义'], thought:'依法维护公平竞争，使中小经营主体平等获取基础服务，让市场在法治边界内有效配置资源。', source:'https://www.court.gov.cn/zixun/xiangqing/511401.html' },
    { id:'platform-fairness', topic:'公平竞争与平台规制', title:'三倍交易服务费迫使商户“二选一”：限定交易案', year:'2026发布', org:'最高人民法院', brief:'某农产品市场运营方凭借市场支配地位，以三倍交易服务费迫使商户放弃在竞争市场经营。最高法认定构成限定交易，并维持损失赔偿。', principles:['垄断与竞争','经济基础与上层建筑','人民立场'], thought:'依法规范市场支配力量，破除妨碍公平竞争的壁垒，在规范中保障民生和高质量发展。', source:'https://www.court.gov.cn/zixun/xiangqing/511401.html' },
    { id:'info-public', topic:'个人信息保护与网络隐私', title:'违法收集1100万余条个人信息：公益诉讼推动全面整改', year:'2021发布', org:'最高人民检察院', brief:'音乐视频教学类应用未经同意、超出必要范围收集个人信息。检察机关提起民事公益诉讼，推动删除1100万余条违法数据、公开道歉并建立履行保障。', principles:['普遍联系','人民群众','实践观点'], thought:'依法保障人民权益，以公益诉讼和协同治理回应数字时代的不特定多数人利益风险。', source:'https://www.spp.gov.cn/spp/xwfbh/dxal/202104/t20210422_517106.shtml' },
    { id:'face-data', topic:'个人信息保护与网络隐私', title:'小区人脸信息最高储备150万条：公益诉讼推动行业整改', year:'2026发布', org:'最高人民检察院', brief:'三家物业、房地产企业在人脸信息采集、传输、存储和第三方处理环节存在多项风险。检察机关制发检察建议并推动全区物业行业规范整改。', principles:['矛盾特殊性','真理与价值','人民立场'], thought:'法治建设要保护人民权益，对不可更改、易引发重大风险的敏感个人信息实行更严格保护。', source:'https://www.spp.gov.cn/spp/xwfbh/dxal/202601/t20260122_716668.shtml' },
    { id:'campus-rumor', topic:'网络谣言与校园法治', title:'制造、散播网络谣言索财100万元：敲诈勒索案', year:'2025发布', org:'最高人民法院', brief:'行为人捏造婚内出轨、违法经营等信息，通过直播间、电话、短信和网站持续施压并索财100万元。法院以敲诈勒索罪判处有期徒刑八年七个月。', principles:['事实与价值','社会意识反作用','量变质变'], thought:'以事实为根据、以法律为准绳；网络表达和监督必须守住权利边界，受害人应及时寻求司法保护。', source:'https://www.court.gov.cn/zixun/xiangqing/454581.html' },
    { id:'campus-cards', topic:'网络谣言与校园法治', title:'在校学生贩卖银行卡成为犯罪工具人：惩治与教育并重', year:'2021发布', org:'最高检、教育部', brief:'在校学生明知银行卡可能用于信息网络犯罪仍收购、转卖多套银行卡，涉案卡承接诈骗资金207万余元。司法机关依法惩处并推动学校开展针对性警示教育。', principles:['内外因','矛盾特殊性','系统治理'], thought:'坚持依法治理与源头治理相结合，以教育、预防、惩戒和校园管理共同守护青年成长。', source:'https://www.spp.gov.cn/xwfbh/wsfbt/202106/t20210623_522065.shtml' }
  ],
  sources: [
    {type:'教材', title:'《马克思主义基本原理（2023年版）》图书信息与目录', org:'高等教育出版社', url:'https://xuanshu.hep.com.cn/front/h5Mobile/bookDetails?bookId=63cac917938b7cc2960ef83d'},
    {type:'理论', title:'习近平法治思想的形成发展与核心要义', org:'中国人大网', url:'https://www.npc.gov.cn/npc/c2/c30834/202603/t20260325_453450.html'},
    {type:'司法案例', title:'人民法院网络法治典型案例', org:'最高人民法院', url:'https://www.court.gov.cn/zixun/xiangqing/512041.html'},
    {type:'司法案例', title:'依法惩治网络暴力违法犯罪典型案例', org:'最高人民法院', url:'https://www.court.gov.cn/zixun/xiangqing/413002.html'},
    {type:'司法案例', title:'2026年人民法院反垄断典型案例', org:'最高人民法院', url:'https://www.court.gov.cn/zixun/xiangqing/511401.html'},
    {type:'司法案例', title:'利用网络、信息技术侵害人格权典型案例', org:'最高人民法院', url:'https://www.court.gov.cn/zixun/xiangqing/467511.html'},
    {type:'检察案例', title:'检察机关个人信息保护公益诉讼典型案例', org:'最高人民检察院', url:'https://www.spp.gov.cn/spp/xwfbh/dxal/202104/t20210422_517106.shtml'},
    {type:'检察案例', title:'小区人脸识别等个人信息保护公益诉讼典型案例', org:'最高人民检察院', url:'https://www.spp.gov.cn/spp/xwfbh/dxal/202601/t20260122_716668.shtml'},
    {type:'校园法治', title:'防范电信网络诈骗校园典型案例', org:'最高检、教育部', url:'https://www.spp.gov.cn/xwfbh/wsfbt/202106/t20210623_522065.shtml'}
  ],
  questions: [
    {id:'q1', point:'contradiction', track:'考研', type:'单选', source:'原创模拟题', stem:'治理生成式人工智能，既不能因风险而停滞创新，也不能只重发展而忽视安全。这一思路最直接体现了哪种方法？', options:['把握矛盾双方的对立统一','否认矛盾的客观性','只抓矛盾的次要方面','用孤立观点看问题'], answer:[0], explain:'发展与安全既相互制约又相互依存，需要在具体条件下实现动态统一，体现矛盾分析法。'},
    {id:'q2', point:'contradiction', track:'期末', type:'多选', source:'原创模拟题', stem:'分析网络暴力治理时，坚持具体问题具体分析，需要考察哪些因素？', options:['传播范围与速度','侵害权利的类型','损害是否难以弥补','脱离案情套用固定结论'], answer:[0,1,2], explain:'矛盾具有特殊性。案件处理需结合行为方式、传播范围、权利类型和损害后果作具体判断。'},
    {id:'q3', point:'contradiction', track:'公考', type:'判断', source:'原创模拟题', stem:'“既要促进平台经济创新，也要依法规范平台经营行为”体现了“两点论”与“重点论”的统一。', options:['正确','错误'], answer:[0], explain:'既看到发展与规范两个方面，又根据具体问题把握治理重点，符合辩证分析方法。'},
    {id:'q4', point:'practice', track:'期末', type:'单选', source:'原创模拟题', stem:'深度合成技术出现新风险后，相关规则经调研、试点、实施和评估不断完善，主要说明什么？', options:['实践是认识发展的动力','认识可以脱离实践','制度一经形成永不变化','感性认识高于理性认识'], answer:[0], explain:'新技术实践提出新问题、提供新经验，推动治理认识和制度规范不断发展。'},
    {id:'q5', point:'practice', track:'考研', type:'判断', source:'原创模拟题', stem:'制度成效最终要由治理实践检验，因此理论认识在实践完成后便停止发展。', options:['正确','错误'], answer:[1], explain:'实践是检验真理的唯一标准，但实践和认识都不断发展，二者形成循环上升的辩证运动。'},
    {id:'q6', point:'practice', track:'公考', type:'多选', source:'原创模拟题', stem:'个人信息保护公益诉讼推动监管部门、平台和行业共同整改，体现实践活动具有哪些特征？', options:['客观实在性','自觉能动性','社会历史性','纯粹个人性'], answer:[0,1,2], explain:'实践是人有目的地改造客观世界的社会性活动，具有客观实在性、自觉能动性和社会历史性。'},
    {id:'q7', point:'truth', track:'考研', type:'单选', source:'原创模拟题', stem:'人工智能治理既要遵循技术发展规律，又要保护人格尊严和公共利益。这体现了什么？', options:['真理尺度与价值尺度的统一','价值判断取代事实判断','客观规律服从个人意愿','真理不具有客观性'], answer:[0], explain:'有效治理既要按客观规律办事，也要符合人民利益和社会进步的价值目标。'},
    {id:'q8', point:'truth', track:'期末', type:'判断', source:'原创模拟题', stem:'只要一种技术能提升效率，其应用就天然符合社会价值要求。', options:['正确','错误'], answer:[1], explain:'效率事实不能自动证明价值正当性。技术应用仍需接受权利保护、公平正义等价值尺度检验。'},
    {id:'q9', point:'truth', track:'公考', type:'多选', source:'原创模拟题', stem:'在网络谣言治理中统一真理尺度和价值尺度，应当坚持哪些要求？', options:['先核实事实','依法保护人格权','兼顾表达自由与公共秩序','以传播热度代替证据'], answer:[0,1,2], explain:'事实核验体现真理尺度，权利保护和秩序维护体现价值尺度，二者应统一于法治实践。'},
    {id:'q10', point:'people', track:'公考', type:'单选', source:'原创模拟题', stem:'全面依法治国强调依法保障人民权益，其哲学依据最直接的是？', options:['人民群众是历史的创造者','地理环境决定社会发展','英雄人物创造全部历史','社会意识决定社会存在'], answer:[0], explain:'人民群众是社会历史的主体。法治建设必须为了人民、依靠人民、造福人民、保护人民。'},
    {id:'q11', point:'people', track:'期末', type:'多选', source:'原创模拟题', stem:'“以人民为中心”的网络治理应体现在哪些方面？', options:['回应群众急难愁盼','保障合法权益','畅通公众参与渠道','只追求平台流量增长'], answer:[0,1,2], explain:'群众观点要求把人民利益作为根本价值尺度，并依靠人民参与治理。'},
    {id:'q12', point:'people', track:'考研', type:'判断', source:'原创模拟题', stem:'坚持人民主体地位意味着否认专业机构和领导者在法治建设中的作用。', options:['正确','错误'], answer:[1], explain:'人民群众的决定作用与个人、组织的积极作用并不矛盾，关键是专业行动必须服务人民利益。'},
    {id:'q13', point:'technology', track:'考研', type:'单选', source:'原创模拟题', stem:'AI换脸既可用于影视创作，也可能被用于诈骗和侵权。这说明科学技术的社会作用具有何种特点？', options:['受到社会制度和价值选择制约','永远只产生积极影响','可以脱离社会关系独立发展','决定社会的一切变化'], answer:[0], explain:'科技是一种重要社会力量，但其具体作用取决于社会条件、利益关系和使用方式。'},
    {id:'q14', point:'technology', track:'公考', type:'多选', source:'原创模拟题', stem:'推动人工智能向上向善，需要哪些治理思维？', options:['坚持发展和安全并重','完善规则与技术措施','落实平台主体责任','认为技术会自动解决风险'], answer:[0,1,2], explain:'技术治理是多主体参与的系统工程，需要发展、规范与责任协同。'},
    {id:'q15', point:'technology', track:'期末', type:'判断', source:'原创模拟题', stem:'技术是中性的，因此技术应用产生的社会后果不属于哲学和法治分析范围。', options:['正确','错误'], answer:[1], explain:'技术嵌入具体社会关系，其设计、使用和分配都会产生价值与权利后果。'}
  ]
};

// 为每个核心知识点补齐三道首版练习。已有深度题优先保留，缺额使用
// 与该知识点的核心结论、易错点和法治联系一一对应的原创模拟题补足。
SITE_DATA.points.forEach((point) => {
  const existing = SITE_DATA.questions.filter((question) => question.point === point.id).length;
  const needed = Math.max(0, 3 - existing);
  const templates = [
    {
      type: '单选',
      stem: `关于“${point.title}”，下列表述正确的是？`,
      options: [point.core, point.pitfall, '这一原理只适用于书本概念，不能用于现实分析。', '这一原理说明主观愿望可以代替客观条件。'],
      answer: [0],
      explain: `${point.core} 答题时既要准确表述原理，也要说明其适用条件。`
    },
    {
      type: '判断',
      stem: `运用“${point.title}”分析问题，就是在任何情境下直接照搬既有结论。`,
      options: ['正确', '错误'],
      answer: [1],
      explain: `理论必须联系具体实际。${point.pitfall}`
    },
    {
      type: '单选',
      stem: `下列哪一项最能体现“${point.title}”在法治实践中的运用？`,
      options: [point.law, '只关注技术效率，暂不考虑权利与责任。', '用网络热度替代事实调查和法律论证。', '把复杂治理问题归结为单一主体的个人选择。'],
      answer: [0],
      explain: point.law
    }
  ];
  for (let index = 0; index < needed; index += 1) {
    const template = templates[(existing + index) % templates.length];
    SITE_DATA.questions.push({
      id: `auto-${point.id}-${index + 1}`,
      point: point.id,
      track: point.exams[(existing + index) % point.exams.length],
      source: '原创模拟题',
      ...template
    });
  }
});
