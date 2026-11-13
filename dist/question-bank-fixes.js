// Word 原题库在每章最后一道客观题后紧接主观题解析，抽取时会粘进 D 选项。
// 这里只恢复原客观题选项，不改动题干、答案和题源标注。
const FINAL_OPTION_FIXES = {
  'final-2023-intro-28': '人民性',
  'final-2023-c1-61': '说明事物发展是必然性和偶然性综合作用的结果',
  'final-2023-c2-138': '唯理论',
  'final-2023-c3-90': '否定社会历史的规律性',
  'final-2023-c4-38': '是在物的外壳掩盖下的一种剥削关系',
  'final-2023-c5-40': '有利于争夺霸权地位',
  'final-2023-c6-34': '无产阶级是强大的阶级',
  'final-2023-c7-20': '离不开马克思主义理论的指导'
};

(window.FINAL_EXAM_BANK || []).forEach((question) => {
  if (FINAL_OPTION_FIXES[question.id] && question.options?.[3]) question.options[3] = FINAL_OPTION_FIXES[question.id];
});
