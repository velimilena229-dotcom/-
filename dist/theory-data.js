// 习近平法治思想专题选编。标题、发布日期与原文链接经发布机构页面核对。
// 只提供本站原创导读，不转载全文；学者阐释不冒充习近平总书记原话。
const THEORY_UPDATED = '2026-09-24';
const THEORY_SOURCE = 'https://www.chinalaw.org.cn/portal/list/index.html?id=991001';
const THEORY_ARTICLES = [
  ['2026-09-21','以习近平法治思想为指引 深化国际法治交流合作——专访中国法学会党组书记、常务副会长王洪祥','https://www.chinalaw.org.cn/portal/article/index.html?cid=991060&id=38938','思想要义','中国法学会网站（转自民主与法制时报）','法治理念如何从国内治理延伸到国际合作？'],
  ['2026-03-25','深入学习贯彻习近平法治思想','https://www.npc.gov.cn/npc/c2/c30834/202603/t20260325_453450.html','思想要义','中国人大网','从形成发展与核心要义两条线，怎样理解这一思想的理论体系？'],
  ['2025-11-17','习近平法治思想的科学体系、创新发展与时代新篇','https://www.chinalaw.org.cn/portal/article/index.html?cid=396&id=36229','思想要义','中国法学会','理论体系的发展如何回应新的法治实践？'],
  ['2025-11-13','深刻理解把握习近平法治思想的创新发展','https://www.chinalaw.org.cn/portal/article/index.html?cid=396&id=36205','思想要义','中国法学会','“创新发展”与坚持基本立场之间是什么关系？'],
  ['2022-07-28','习近平法治思想中的思维创新、理论创新、制度创新和实践创新','https://www.chinalaw.org.cn/index.php/portal/article/index/id/31323/cid/991016.html','思想要义','中国法学会','四种创新怎样从思想方法走向制度实践？'],
  ['2022-07-28','习近平法治思想作出原创性贡献的时代背景、实践逻辑和科学方法','https://www.chinalaw.org.cn/portal/article/index.html?cid=991016&id=31306','思想要义','中国法学会','为什么要把理论命题放回具体历史条件中理解？'],
  ['2026-05-27','以科学立法推动改革、促进发展、保障善治','https://www.chinalaw.org.cn/portal/article/index.html?cid=991107&id=38183','立法与宪法','中国法学会','科学立法如何在改革与稳定之间形成制度安排？'],
  ['2026-03-23','学习贯彻习近平法治思想扎实做好合宪性审查和法律案统一审议工作','https://www.chinalaw.org.cn/portal/article/index.html?cid=991101&id=37743','立法与宪法','中国法学会','合宪性审查如何维护法治统一？'],
  ['2026-03-23','深入学习贯彻党的二十届四中全会精神 加强重点领域、新兴领域、涉外领域立法','https://www.chinalaw.org.cn/portal/article/index.html?cid=991101&id=37742','立法与宪法','中国法学会','新领域立法为何既需回应现实，又需保持体系协调？'],
  ['2025-11-18','深入学习贯彻习近平法治思想 以高质量立法筑牢中国式现代化法治根基','https://www.chinalaw.org.cn/portal/article/index.html?cid=991070&id=36268','立法与宪法','中国法学会','如何把发展目标转化为具体、可执行的法律规范？'],
  ['2025-07-30','加强和改进政府立法工作 服务保障高质量发展 推进中国式现代化','https://www.chinalaw.org.cn/portal/article/index.html?cid=991064&id=35979','立法与宪法','中国法学会','政府立法怎样更准确地回应基层治理需求？'],
  ['2025-11-18','以“第二个结合”筑牢中国特色社会主义法治的文化根基','https://www.chinalaw.org.cn/portal/article/index.html?cid=991070&id=36267','思想要义','中国法学会','传统法律文化中的哪些资源能转化为现代法治理念？'],
  ['2025-06-05','论坚持依法治国和依规治党有机统一','https://www.chinalaw.org.cn/portal/article/index.html?cid=991063&id=35208','思想要义','中国法学会','依法治国与依规治党为何需要放在同一治理结构中理解？'],
  ['2025-06-05','坚持改革和法治相统一 在法治轨道上全面深化改革、推进中国式现代化','https://www.chinalaw.org.cn/portal/article/index.html?cid=991063&id=35226','思想要义','中国法学会','改革探索与规则稳定的辩证关系是什么？'],
  ['2025-11-18','充分发挥政法机关职能作用 推动完善中国特色社会主义法治体系','https://www.chinalaw.org.cn/portal/article/index.html?cid=991070&id=36272','法治实施','中国法学会','法治体系建设如何落实到不同机关的职责协同？'],
  ['2026-05-27','高标准推进法治政府建设 为“十五五”时期经济社会高质量发展提供法治保障','https://www.chinalaw.org.cn/portal/article/index.html?cid=991107&id=38181','法治实施','中国法学会','法治政府建设怎样让行政权力运行更可预期？'],
  ['2025-11-18','新时代法治政府建设取得的理论与实践成果','https://www.chinalaw.org.cn/portal/article/index.html?cid=991070&id=36266','法治实施','中国法学会','评价法治政府，为什么不能只看制度文本？'],
  ['2025-11-18','习近平法治思想引领新时代审判工作高质量发展','https://www.chinalaw.org.cn/portal/article/index.html?cid=991070&id=36271','法治实施','中国法学会','司法公正如何在个案中成为可感知的结果？'],
  ['2025-11-18','加强检察机关法律监督工作持续推进习近平法治思想的检察实践','https://www.chinalaw.org.cn/portal/article/index.html?cid=991070&id=36269','法治实施','中国法学会','法律监督在法治实施链条中解决什么问题？'],
  ['2025-07-30','深化司法体制改革 加快建设公正高效权威的社会主义司法制度','https://www.chinalaw.org.cn/portal/article/index.html?cid=991064&id=35984','法治实施','中国法学会','公正、效率与权威如何在司法改革中相互支撑？'],
  ['2025-07-29','深入学习贯彻习近平法治思想推进矛盾纠纷预防化解法治化','https://www.chinalaw.org.cn/portal/article/index.html?cid=991064&id=35978','法治实施','中国法学会','源头预防与依法解决纠纷应怎样衔接？'],
  ['2025-10-11','统筹数据发展和安全 有力有序释放数据价值','https://www.chinalaw.org.cn/portal/article/index.html?cid=991069&id=36256','数字与社会','中国法学会','释放数据价值与保护个人权益如何同时成立？'],
  ['2025-10-11','健全网络综合治理体系提升管网治网能力水平','https://www.chinalaw.org.cn/portal/article/index.html?cid=991069&id=36255','数字与社会','中国法学会','网络治理为何需要制度、平台和用户共同参与？'],
  ['2025-05-13','加强网络空间法治建设 为阔步迈向网络强国提供坚强有力保障','https://www.chinalaw.org.cn/portal/article/index.html?cid=991062&id=35051','数字与社会','中国法学会','如何把网络空间的新风险转化为可治理的法律问题？'],
  ['2026-05-27','科技创新背景下中国知识产权司法保护的机遇、挑战与应对','https://www.chinalaw.org.cn/portal/article/index.html?cid=991107&id=38180','数字与社会','中国法学会','创新激励与公共利益怎样在司法保护中取得平衡？'],
  ['2026-03-23','深入学习贯彻习近平法治思想 加快完善国家安全法治体系','https://www.chinalaw.org.cn/portal/article/index.html?cid=991101&id=37741','发展与安全','中国法学会','国家安全体系建设为什么要强调法治化？'],
  ['2025-10-11','深入贯彻习近平法治思想和总体国家安全观以严格公正司法维护国家安全和社会稳定','https://www.chinalaw.org.cn/portal/article/index.html?cid=991069&id=36260','发展与安全','中国法学会','安全目标与公正司法应如何相互校准？'],
  ['2025-06-05','深入推进生态文明法治建设 不断强化美丽中国建设法治保障','https://www.chinalaw.org.cn/portal/article/index.html?cid=991063&id=35225','发展与安全','中国法学会','生态保护如何从价值目标进入刚性规则？'],
  ['2026-08-07','深学笃行习近平法治思想 以良法善治护航海南海洋经济高质量发展','https://www.chinalaw.org.cn/portal/article/index.html?cid=991108&id=38678','发展与安全','中国法学会','海洋开发、生态保护和安全治理怎样进行系统统筹？'],
  ['2026-04-03','以良法善治推动全过程人民民主深入发展','https://paper.people.com.cn/rmrb/pc/content/202604/03/content_30149038.html','立法与宪法','人民日报理论版','民主参与如何通过法治程序转化为稳定制度？']
].map(([date,title,url,topic,sourceName,prompt]) => ({date,title,url,topic,sourceName,prompt}));
