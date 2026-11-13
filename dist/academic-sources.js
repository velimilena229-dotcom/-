// 逐条议题出处。顺序与 app.js 中 7 个基础议题及 lab-content.js 中 20 个增补议题一致。
// 标注的是可核对的政策/案例依据，议题分析文字仍由本站独立编写。
const DEBATE_FACT_SOURCES = [
  ['国家网信办等四部门','《互联网信息服务算法推荐管理规定》','2022-01-04','https://www.cac.gov.cn/2022-01/04/c_1642894606364259.htm'],
  ['国家网信办等七部门','《生成式人工智能服务管理暂行办法》','2023-07-13','https://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm'],
  ['国家网信办等四部门','《网络暴力信息治理规定》','2024-06-14','https://www.cac.gov.cn/2024-06/14/c_1720043894161555.htm'],
  ['人力资源社会保障部等八部门','《关于维护新就业形态劳动者劳动保障权益的指导意见》','2021-07-22','https://www.mohrss.gov.cn/wap/xw/rsxw/202107/t20210722_419104.html'],
  ['中国人大网','《民法典编纂是贯彻习近平法治思想的生动实践》','2026-02-11','https://www.npc.gov.cn/npc/c2/c30834/202602/t20260211_451557.html'],
  ['中国人大网','《中华人民共和国个人信息保护法》','2021-08-20','https://www.npc.gov.cn/WZWSREL25wYy9jMi9jMzA4MzQvMjAyMTA4L3QyMDIxMDgyMF8zMTMwODguaHRtbD9yZWY9aW1i'],
  ['文化和旅游部','《2025年全国文化和旅游消费促进活动的通知》','2025-04-29','https://zwgk.mct.gov.cn/zfxxgkml/cyfz/202504/t20250429_959714.html'],
  ['教育部等五部门','《“人工智能+教育”行动计划》','2026-04-10','https://www.moe.gov.cn/srcsite/A16/s3342/202604/t20260410_1433240.html'],
  ['最高人民法院','利用网络、信息技术侵害人格权典型案例','2025-06-11','https://www.court.gov.cn/zixun/xiangqing/467511.html'],
  ['人力资源社会保障部等八部门','《关于维护新就业形态劳动者劳动保障权益的指导意见》','2021-07-22','https://www.mohrss.gov.cn/wap/xw/rsxw/202107/t20210722_419104.html'],
  ['人力资源社会保障部、教育部','《就业公共服务进校园百日行动》','2026-04-03','https://www.mohrss.gov.cn/wap/zc/zcwj/202604/t20260403_572095.html'],
  ['国务院办公厅','《关于发展银发经济增进老年人福祉的意见》','2024-01-15','https://app.www.gov.cn/govdata/gov/202401/15/511180/article.html'],
  ['国家卫生健康委等部门','《关于加快推进普惠托育服务体系建设的意见》','2025-07-09','https://app.www.gov.cn/govdata/gov/202507/09/532370/article.html'],
  ['国务院','《2026年政府工作报告》','2026-03-13','https://www.moe.gov.cn/jyb_xwfb/xw_zt/moe_357/2026/2026_zt03/baogao/202603/t20260314_1430876.html'],
  ['工业和信息化部等四部门','《通用航空装备创新应用实施方案（2024—2030年）》','2024-03-27','https://policy.mofcom.gov.cn/claw/clawContent.shtml?id=99679'],
  ['中共中央办公厅、国务院办公厅','《关于加快公共数据资源开发利用的意见》','2024-10-10','https://www.mee.gov.cn/zcwj/zyygwj/202410/t20241010_1087779.shtml'],
  ['国务院','《关于推动“高效办成一件事”的指导意见》','2024-01-16','https://www.beijing.gov.cn/zhengce/zhengcefagui/202401/t20240116_3537512.html'],
  ['中国人大网','《国务院关于推动文化和旅游深度融合发展工作情况的报告》','2025-09-11','https://www.npc.gov.cn/npc/c2/c30834/202509/t20250911_447645.html'],
  ['市场监管总局、中国消费者协会','直播带货消费提示','2025-05-09','https://www.samr.gov.cn/xw/mtjj/art/2025/art_8cca7cffb41642f2ae2cc394cac810e1.html'],
  ['国家网信办等四部门','《互联网信息服务算法推荐管理规定》','2022-01-04','https://www.cac.gov.cn/2022-01/04/c_1642894606364259.htm'],
  ['中国人大网','《国务院关于推动文化和旅游深度融合发展工作情况的报告》','2025-09-11','https://www.npc.gov.cn/npc/c2/c30834/202509/t20250911_447645.html'],
  ['中国法学会','《深入推进生态文明法治建设》','2025-06-05','https://www.chinalaw.org.cn/portal/article/index.html?cid=991063&id=35225'],
  ['商务部等十四部门','《推动消费品以旧换新行动方案》','2024-03-27','https://www.mofcom.gov.cn/zfxxgk/gkml/art/2024/art_dd00bbed993c4a35a2bc9c163413b82c.html'],
  ['中共中央社会工作部','《以党建引领提升社区议事协商效能》','2025-11-20','https://www.zyshgzb.gov.cn/n1/2025/1120/c461345-40608003.html'],
  ['财政部、工业和信息化部','《关于进一步支持专精特新中小企业高质量发展的通知》','2024-06-19','https://app.www.gov.cn/govdata/gov/202406/19/516322/article.html'],
  ['国务院','《关于深入实施“人工智能+”行动的意见》','2025-08-26','https://big5.www.gov.cn/gate/big5/www.gov.cn/zhengce/content/202508/content_7037861.htm'],
  ['中共中央、国务院','《关于进一步深化农村改革扎实推进乡村全面振兴的意见》','2025-02-24','https://www.beijing.gov.cn/zhengce/gwywj/202502/t20250224_4017267.html']
].map(([org,title,date,url]) => ({org,title,date,url}));

const CASE_SOURCE_DATES = {
  injunction:'2026-09-16', defamation:'2023-09-25', 'ai-face':'2025-06-11',
  'deepfake-rule':'2026-09-16', 'price-rule':'2026-09-10',
  'platform-fairness':'2026-09-10', 'info-public':'2021-04-22',
  'face-data':'2026-01-22', 'campus-rumor':'2025-02-11', 'campus-cards':'2021-06-23'
};

const ACADEMIC_NOTE = '重要程度为本站编辑判断：综合教材章节基础性、概念关联度和课程练习题覆盖情况标注，不代表官方命题权重。难度星级参考概念抽象度、易混淆程度和辨析负担。常见考法是本站题型归纳，并非历年考试频率统计。';
const TEXTBOOK_SOURCE = 'https://xuanshu.hep.com.cn/front/h5Mobile/bookDetails?bookId=63cac917938b7cc2960ef83d';
