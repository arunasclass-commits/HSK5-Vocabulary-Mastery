export type Example = { lv: number; zh: string; py: string; en: string };
export type Word = {
  n: number; zh: string; py: string; pyPlain: string; en: string; family: string;
  parts: { c: string; m: string }[];
  hook: string; usage: string; cols: string[];
  ex: Example[];
};
export const WORDS: Word[] = [
  {
    "n": 3521,
    "zh": "中华民族",
    "py": "Zhōnghuá Mínzú",
    "pyPlain": "zhonghua minzu",
    "en": "the Chinese nation / Chinese ethnic nation",
    "family": "中",
    "parts": [
      {
        "c": "中",
        "m": "central / China"
      },
      {
        "c": "华",
        "m": "splendid; Chinese"
      },
      {
        "c": "民",
        "m": "people"
      },
      {
        "c": "族",
        "m": "ethnic group"
      }
    ],
    "hook": "中+华 = China; 民+族 = a people. Together: the Chinese nation as a whole.",
    "usage": "Formal and written. Common in culture, history, and national topics. Not casual chat about one person.",
    "cols": [
      "中华民族的历史",
      "中华民族伟大复兴"
    ],
    "ex": [
      {
        "lv": 1,
        "zh": "中华民族有悠久的历史。",
        "py": "Zhōnghuá mínzú yǒu yōujiǔ de lìshǐ.",
        "en": "The Chinese nation has a long history."
      },
      {
        "lv": 2,
        "zh": "这部纪录片介绍了中华民族的文化传统。",
        "py": "Zhè bù jìlùpiàn jièshào le Zhōnghuá mínzú de wénhuà chuántǒng.",
        "en": "This documentary introduces the cultural traditions of the Chinese nation."
      }
    ]
  },
  {
    "n": 3522,
    "zh": "中级",
    "py": "zhōngjí",
    "pyPlain": "zhongji",
    "en": "intermediate; middle level",
    "family": "中",
    "parts": [
      {
        "c": "中",
        "m": "middle"
      },
      {
        "c": "级",
        "m": "level / grade"
      }
    ],
    "hook": "中 = middle, 级 = rank. Middle rank, not beginner and not advanced.",
    "usage": "Courses, exams, positions. Pair with 初级 / 高级.",
    "cols": [
      "中级班",
      "中级水平",
      "中级汉语"
    ],
    "ex": [
      {
        "lv": 1,
        "zh": "我在上中级汉语班。",
        "py": "Wǒ zài shàng zhōngjí Hànyǔ bān.",
        "en": "I am in an intermediate Chinese class."
      },
      {
        "lv": 2,
        "zh": "通过中级考试以后，他才申请了高级课程。",
        "py": "Tōngguò zhōngjí kǎoshì yǐhòu, tā cái shēnqǐng le gāojí kèchéng.",
        "en": "Only after passing the intermediate exam did he apply for the advanced course."
      }
    ]
  },
  {
    "n": 3523,
    "zh": "中介",
    "py": "zhōngjiè",
    "pyPlain": "zhongjie",
    "en": "intermediary; middleman; intermediary service",
    "family": "中",
    "parts": [
      {
        "c": "中",
        "m": "middle"
      },
      {
        "c": "介",
        "m": "to be between; introduce"
      }
    ],
    "hook": "介 sits between two sides. 中介 is the person or company in the middle.",
    "usage": "Housing, jobs, business introductions. Often 中介公司.",
    "cols": [
      "房屋中介",
      "通过中介",
      "中介服务"
    ],
    "ex": [
      {
        "lv": 1,
        "zh": "我们通过中介找到了房子。",
        "py": "Wǒmen tōngguò zhōngjiè zhǎodào le fángzi.",
        "en": "We found a place through an intermediary."
      },
      {
        "lv": 2,
        "zh": "公司正在寻找一家可靠的中介来联系海外客户。",
        "py": "Gōngsī zhèngzài xúnzhǎo yì jiā kěkào de zhōngjiè lái liánxì hǎiwài kèhù.",
        "en": "The company is looking for a reliable intermediary to contact overseas clients."
      }
    ]
  },
  {
    "n": 3524,
    "zh": "中期",
    "py": "zhōngqī",
    "pyPlain": "zhongqi",
    "en": "middle period; mid-term",
    "family": "中",
    "parts": [
      {
        "c": "中",
        "m": "middle"
      },
      {
        "c": "期",
        "m": "period"
      }
    ],
    "hook": "期 is a time span. 中期 is the middle stretch of a plan, illness, or project.",
    "usage": "Reports and planning. Contrast 初期 / 后期.",
    "cols": [
      "中期报告",
      "中期目标",
      "项目中期"
    ],
    "ex": [
      {
        "lv": 1,
        "zh": "项目已经进入中期。",
        "py": "Xiàngmù yǐjīng jìnrù zhōngqī.",
        "en": "The project has entered the middle period."
      },
      {
        "lv": 2,
        "zh": "根据中期报告，住房计划需要调整。",
        "py": "Gēnjù zhōngqī bàogào, zhùfáng jìhuà xūyào tiáozhěng.",
        "en": "According to the mid-term report, the housing plan needs adjustment."
      }
    ]
  },
  {
    "n": 3525,
    "zh": "中外",
    "py": "zhōngwài",
    "pyPlain": "zhongwai",
    "en": "China and foreign countries; Chinese and foreign",
    "family": "中",
    "parts": [
      {
        "c": "中",
        "m": "China"
      },
      {
        "c": "外",
        "m": "outside / foreign"
      }
    ],
    "hook": "中 and 外 side by side: Chinese and foreign, not one or the other.",
    "usage": "Formal pairs: 中外合作, 中外交流. Written and official more than chat.",
    "cols": [
      "中外合作",
      "中外交流",
      "中外专家"
    ],
    "ex": [
      {
        "lv": 1,
        "zh": "这次会议有中外专家参加。",
        "py": "Zhè cì huìyì yǒu zhōngwài zhuānjiā cānjiā.",
        "en": "Chinese and foreign experts attended this meeting."
      },
      {
        "lv": 2,
        "zh": "中外合作让这项研究进展得更快。",
        "py": "Zhōngwài hézuò ràng zhè xiàng yánjiū jìnzhǎn de gèng kuài.",
        "en": "Chinese-foreign cooperation made this research progress faster."
      }
    ]
  },
  {
    "n": 3526,
    "zh": "中心",
    "py": "zhōngxīn",
    "pyPlain": "zhongxin",
    "en": "center; heart; central point",
    "family": "中",
    "parts": [
      {
        "c": "中",
        "m": "middle"
      },
      {
        "c": "心",
        "m": "heart"
      }
    ],
    "hook": "The heart in the middle: a physical center or the main point.",
    "usage": "Place names and abstract focus. 市中心, 以…为中心.",
    "cols": [
      "市中心",
      "研究中心",
      "中心思想"
    ],
    "ex": [
      {
        "lv": 1,
        "zh": "医院在市中心。",
        "py": "Yīyuàn zài shì zhōngxīn.",
        "en": "The hospital is in the city center."
      },
      {
        "lv": 2,
        "zh": "讨论的中心是如何提高学习效率。",
        "py": "Tǎolùn de zhōngxīn shì rúhé tígāo xuéxí xiàolǜ.",
        "en": "The center of the discussion is how to improve study efficiency."
      }
    ]
  },
  {
    "n": 3527,
    "zh": "中药",
    "py": "zhōngyào",
    "pyPlain": "zhongyao",
    "en": "traditional Chinese medicine; Chinese medicinal drugs",
    "family": "中",
    "parts": [
      {
        "c": "中",
        "m": "Chinese"
      },
      {
        "c": "药",
        "m": "medicine / drug"
      }
    ],
    "hook": "药 is the substance. 中药 = Chinese medicinal materials, not the doctor.",
    "usage": "Herbs, decoctions, pharmacies. Contrast 中医 (practice or practitioner).",
    "cols": [
      "吃中药",
      "中药方",
      "中药店"
    ],
    "ex": [
      {
        "lv": 1,
        "zh": "奶奶每天喝中药。",
        "py": "Nǎinai měitiān hē zhōngyào.",
        "en": "Grandma drinks Chinese medicine every day."
      },
      {
        "lv": 2,
        "zh": "医生给他开了一种需要煮的中药。",
        "py": "Yīshēng gěi tā kāi le yì zhǒng xūyào zhǔ de zhōngyào.",
        "en": "The doctor prescribed a kind of Chinese medicine that needs to be boiled."
      }
    ]
  },
  {
    "n": 3528,
    "zh": "中医",
    "py": "zhōngyī",
    "pyPlain": "zhongyi",
    "en": "traditional Chinese medicine; Chinese medical practice/doctor",
    "family": "中",
    "parts": [
      {
        "c": "中",
        "m": "Chinese"
      },
      {
        "c": "医",
        "m": "medicine / doctor"
      }
    ],
    "hook": "医 is the practice or the person who treats. 中医 can mean TCM or a TCM doctor.",
    "usage": "看中医 = see a TCM doctor. 中医理论 = TCM theory. Not the herbs themselves.",
    "cols": [
      "看中医",
      "中医理论",
      "中医诊所"
    ],
    "ex": [
      {
        "lv": 1,
        "zh": "他不舒服的时候喜欢看中医。",
        "py": "Tā bù shūfu de shíhou xǐhuan kàn zhōngyī.",
        "en": "When he feels unwell he likes to see a Chinese medicine doctor."
      },
      {
        "lv": 2,
        "zh": "中医强调从整体上看一个人的生活习惯。",
        "py": "Zhōngyī qiángdiào cóng zhěngtǐ shàng kàn yí gè rén de shēnghuó xíguàn.",
        "en": "Traditional Chinese medicine emphasizes looking at a person's habits as a whole."
      }
    ]
  },
  {
    "n": 3529,
    "zh": "种类",
    "py": "zhǒnglèi",
    "pyPlain": "zhonglei",
    "en": "type; kind; category",
    "family": "种",
    "parts": [
      {
        "c": "种",
        "m": "kind (zhǒng)"
      },
      {
        "c": "类",
        "m": "category"
      }
    ],
    "hook": "种 here is zhǒng, a kind. 种类 = types. Not 种植 (zhòng, to plant).",
    "usage": "Countable categories. 各种各样的种类 is redundant; prefer 各种种类 or 许多种类.",
    "cols": [
      "各种种类",
      "种类很多",
      "植物种类"
    ],
    "ex": [
      {
        "lv": 1,
        "zh": "这种子的种类很多。",
        "py": "Zhè zhǒngzi de zhǒnglèi hěn duō.",
        "en": "There are many kinds of these seeds."
      },
      {
        "lv": 2,
        "zh": "市场上竹子制品的种类越来越多。",
        "py": "Shìchǎng shàng zhúzi zhìpǐn de zhǒnglèi yuèláiyuè duō.",
        "en": "There are more and more kinds of bamboo products on the market."
      }
    ]
  },
  {
    "n": 3530,
    "zh": "种子",
    "py": "zhǒngzi",
    "pyPlain": "zhongzi",
    "en": "seed",
    "family": "种",
    "parts": [
      {
        "c": "种",
        "m": "seed / kind"
      },
      {
        "c": "子",
        "m": "small thing / noun suffix"
      }
    ],
    "hook": "种 as a noun seed, plus 子. Pronounce zhǒng, not zhòng.",
    "usage": "Agriculture and metaphor (希望的种子). Everyday and written.",
    "cols": [
      "播种子",
      "一粒种子",
      "种子发芽"
    ],
    "ex": [
      {
        "lv": 1,
        "zh": "春天适合种植种子。",
        "py": "Chūntiān shìhé zhòngzhí zhǒngzi.",
        "en": "Spring is suitable for planting seeds."
      },
      {
        "lv": 2,
        "zh": "这些种子如果不抓紧种，就可能错过季节。",
        "py": "Zhèxiē zhǒngzi rúguǒ bù zhuājǐn zhòng, jiù kěnéng cuòguò jìjié.",
        "en": "If these seeds are not planted soon, the season may be missed."
      }
    ]
  },
  {
    "n": 3531,
    "zh": "重大",
    "py": "zhòngdà",
    "pyPlain": "zhongda",
    "en": "major; significant; important",
    "family": "重",
    "parts": [
      {
        "c": "重",
        "m": "heavy (zhòng)"
      },
      {
        "c": "大",
        "m": "big"
      }
    ],
    "hook": "Heavy + big = weighty in importance. zhòng, not chóng.",
    "usage": "Formal: 重大变化, 重大决定. Stronger than 重要.",
    "cols": [
      "重大变化",
      "重大意义",
      "重大问题"
    ],
    "ex": [
      {
        "lv": 1,
        "zh": "这是一个重大决定。",
        "py": "Zhè shì yí gè zhòngdà juédìng.",
        "en": "This is a major decision."
      },
      {
        "lv": 2,
        "zh": "住房政策的调整对许多人来说是重大变化。",
        "py": "Zhùfáng zhèngcè de tiáozhěng duì xǔduō rén lái shuō shì zhòngdà biànhuà.",
        "en": "The adjustment of housing policy is a major change for many people."
      }
    ]
  },
  {
    "n": 3532,
    "zh": "众多",
    "py": "zhòngduō",
    "pyPlain": "zhongduo",
    "en": "numerous; many",
    "family": "重",
    "parts": [
      {
        "c": "众",
        "m": "crowd"
      },
      {
        "c": "多",
        "m": "many"
      }
    ],
    "hook": "众 is many people. 众多 = numerous, slightly written.",
    "usage": "Written flavor. 众多选择, 众多专家. Spoken often uses 很多.",
    "cols": [
      "众多选择",
      "众多专家",
      "众多问题"
    ],
    "ex": [
      {
        "lv": 1,
        "zh": "会上有众多专家。",
        "py": "Huì shàng yǒu zhòngduō zhuānjiā.",
        "en": "There were numerous experts at the meeting."
      },
      {
        "lv": 2,
        "zh": "在众多住房方案中，他们最终选择了市中心的一套。",
        "py": "Zài zhòngduō zhùfáng fāng'àn zhōng, tāmen zuìzhōng xuǎnzé le shì zhōngxīn de yí tào.",
        "en": "Among numerous housing options, they finally chose one in the city center."
      }
    ]
  },
  {
    "n": 3533,
    "zh": "重量",
    "py": "zhòngliàng",
    "pyPlain": "zhongliang",
    "en": "weight",
    "family": "重",
    "parts": [
      {
        "c": "重",
        "m": "heavy (zhòng)"
      },
      {
        "c": "量",
        "m": "amount"
      }
    ],
    "hook": "How heavy something is. Not 重视 and not 重新 (chóng).",
    "usage": "Physical weight. 重量是两公斤.",
    "cols": [
      "重量是…",
      "减轻重量",
      "总重量"
    ],
    "ex": [
      {
        "lv": 1,
        "zh": "这个箱子的重量是十公斤。",
        "py": "Zhège xiāngzi de zhòngliàng shì shí gōngjīn.",
        "en": "The weight of this box is ten kilograms."
      },
      {
        "lv": 2,
        "zh": "行李重量超过了规定，他只好拿出一些东西。",
        "py": "Xíngli zhòngliàng chāoguò le guīdìng, tā zhǐhǎo ná chū yìxiē dōngxi.",
        "en": "The luggage weight exceeded the limit, so he had to take some things out."
      }
    ]
  },
  {
    "n": 3534,
    "zh": "种植",
    "py": "zhòngzhí",
    "pyPlain": "zhongzhi",
    "en": "plant; cultivate",
    "family": "种",
    "parts": [
      {
        "c": "种",
        "m": "to plant (zhòng)"
      },
      {
        "c": "植",
        "m": "to plant"
      }
    ],
    "hook": "种 here is zhòng, the verb. 种植 = cultivate. Not 种子 zhǒngzi.",
    "usage": "Farming and formal notices. Spoken often just 种.",
    "cols": [
      "种植竹子",
      "种植面积",
      "适合种植"
    ],
    "ex": [
      {
        "lv": 1,
        "zh": "农民在山上种植竹子。",
        "py": "Nóngmín zài shān shàng zhòngzhí zhúzi.",
        "en": "Farmers plant bamboo on the mountain."
      },
      {
        "lv": 2,
        "zh": "这个地区适合种植多种种子作物。",
        "py": "Zhège dìqū shìhé zhòngzhí duō zhǒng zhǒngzi zuòwù.",
        "en": "This region is suitable for cultivating many seed crops."
      }
    ]
  },
  {
    "n": 3535,
    "zh": "周年",
    "py": "zhōunián",
    "pyPlain": "zhounian",
    "en": "anniversary; annual cycle",
    "family": "周",
    "parts": [
      {
        "c": "周",
        "m": "cycle / week"
      },
      {
        "c": "年",
        "m": "year"
      }
    ],
    "hook": "A full yearly cycle. 十周年 = tenth anniversary.",
    "usage": "Celebrations and institutions. 周年纪念.",
    "cols": [
      "周年纪念",
      "十周年",
      "成立周年"
    ],
    "ex": [
      {
        "lv": 1,
        "zh": "学校明年举办五十周年纪念。",
        "py": "Xuéxiào míngnián jǔbàn wǔshí zhōunián jìniàn.",
        "en": "The school will hold its fiftieth anniversary next year."
      },
      {
        "lv": 2,
        "zh": "公司成立二十周年时，主席亲自来主持活动。",
        "py": "Gōngsī chénglì èrshí zhōunián shí, zhǔxí qīnzì lái zhǔchí huódòng.",
        "en": "When the company marked its twentieth anniversary, the chairperson came in person to host the event."
      }
    ]
  },
  {
    "n": 3536,
    "zh": "猪",
    "py": "zhū",
    "pyPlain": "zhu",
    "en": "pig",
    "family": "猪",
    "parts": [
      {
        "c": "猪",
        "m": "pig; radical 犭 + 者"
      }
    ],
    "hook": "A farm animal and a common food source. 猪肉 is pork.",
    "usage": "Neutral for the animal. Careful: calling a person 猪 is insulting.",
    "cols": [
      "养猪",
      "猪肉",
      "一头猪"
    ],
    "ex": [
      {
        "lv": 1,
        "zh": "他们家养了两头猪。",
        "py": "Tāmen jiā yǎng le liǎng tóu zhū.",
        "en": "Their family raises two pigs."
      },
      {
        "lv": 2,
        "zh": "主食以外，这家人也常吃猪肉。",
        "py": "Zhǔshí yǐwài, zhè jiā rén yě cháng chī zhūròu.",
        "en": "Besides staple food, this family also often eats pork."
      }
    ]
  },
  {
    "n": 3537,
    "zh": "逐步",
    "py": "zhúbù",
    "pyPlain": "zhubu",
    "en": "step by step; gradually",
    "family": "逐",
    "parts": [
      {
        "c": "逐",
        "m": "one by one"
      },
      {
        "c": "步",
        "m": "step"
      }
    ],
    "hook": "逐 = one after another, 步 = step. Staged steps, not a smooth fade.",
    "usage": "Plans and policies. 逐步实现, 逐步提高. Contrast 逐渐.",
    "cols": [
      "逐步实现",
      "逐步提高",
      "逐步完善"
    ],
    "ex": [
      {
        "lv": 1,
        "zh": "我们要逐步提高水平。",
        "py": "Wǒmen yào zhúbù tígāo shuǐpíng.",
        "en": "We need to improve our level step by step."
      },
      {
        "lv": 2,
        "zh": "公司决定逐步注册新的服务项目。",
        "py": "Gōngsī juédìng zhúbù zhùcè xīn de fúwù xiàngmù.",
        "en": "The company decided to register new services step by step."
      }
    ]
  },
  {
    "n": 3538,
    "zh": "逐渐",
    "py": "zhújiàn",
    "pyPlain": "zhujian",
    "en": "gradually",
    "family": "逐",
    "parts": [
      {
        "c": "逐",
        "m": "progressively"
      },
      {
        "c": "渐",
        "m": "gradual"
      }
    ],
    "hook": "渐 is a slow seep. 逐渐 = a process changing little by little, not discrete stages.",
    "usage": "Natural change over time. 逐渐习惯, 逐渐转变.",
    "cols": [
      "逐渐习惯",
      "逐渐增加",
      "逐渐转变"
    ],
    "ex": [
      {
        "lv": 1,
        "zh": "天气逐渐变冷了。",
        "py": "Tiānqì zhújiàn biàn lěng le.",
        "en": "The weather is gradually getting cold."
      },
      {
        "lv": 2,
        "zh": "一个人的生活习惯会随着年龄逐渐转变。",
        "py": "Yí gè rén de shēnghuó xíguàn huì suízhe niánlíng zhújiàn zhuǎnbiàn.",
        "en": "A person's habits gradually change with age."
      }
    ]
  },
  {
    "n": 3539,
    "zh": "竹子",
    "py": "zhúzi",
    "pyPlain": "zhuzi",
    "en": "bamboo",
    "family": "竹",
    "parts": [
      {
        "c": "竹",
        "m": "bamboo"
      },
      {
        "c": "子",
        "m": "noun suffix"
      }
    ],
    "hook": "竹 is the plant; 子 makes it a concrete noun. Culture symbol as well as material.",
    "usage": "Plant, material, metaphor for integrity. 竹林.",
    "cols": [
      "种竹子",
      "竹林",
      "竹子制品"
    ],
    "ex": [
      {
        "lv": 1,
        "zh": "院子里种着竹子。",
        "py": "Yuànzi lǐ zhòngzhe zhúzi.",
        "en": "Bamboo is planted in the courtyard."
      },
      {
        "lv": 2,
        "zh": "这种装饰用的是本地种植的竹子。",
        "py": "Zhè zhǒng zhuāngshì yòng de shì běndì zhòngzhí de zhúzi.",
        "en": "This decoration uses locally grown bamboo."
      }
    ]
  },
  {
    "n": 3540,
    "zh": "煮",
    "py": "zhǔ",
    "pyPlain": "zhu",
    "en": "boil; cook by boiling",
    "family": "煮",
    "parts": [
      {
        "c": "煮",
        "m": "煮 = fire-related cooking + 者"
      }
    ],
    "hook": "Water and heat until food is cooked. 煮饭, 煮中药.",
    "usage": "Everyday cooking verb. Result complement 煮好了.",
    "cols": [
      "煮饭",
      "煮面",
      "把中药煮好"
    ],
    "ex": [
      {
        "lv": 1,
        "zh": "妈妈正在煮面。",
        "py": "Māma zhèngzài zhǔ miàn.",
        "en": "Mom is boiling noodles."
      },
      {
        "lv": 2,
        "zh": "这副中药要煮二十分钟才能喝。",
        "py": "Zhè fù zhōngyào yào zhǔ èrshí fēnzhōng cái néng hē.",
        "en": "This dose of Chinese medicine must be boiled for twenty minutes before drinking."
      }
    ]
  },
  {
    "n": 3541,
    "zh": "主持",
    "py": "zhǔchí",
    "pyPlain": "zhuchi",
    "en": "host; preside over; conduct",
    "family": "主",
    "parts": [
      {
        "c": "主",
        "m": "main / host"
      },
      {
        "c": "持",
        "m": "hold"
      }
    ],
    "hook": "The main person holding the event. Host a show or preside over a meeting.",
    "usage": "主持会议, 节目主持人. More formal than 当主持人 in writing.",
    "cols": [
      "主持会议",
      "主持人",
      "主持活动"
    ],
    "ex": [
      {
        "lv": 1,
        "zh": "王老师主持今天的会议。",
        "py": "Wáng lǎoshī zhǔchí jīntiān de huìyì.",
        "en": "Teacher Wang is presiding over today's meeting."
      },
      {
        "lv": 2,
        "zh": "周年活动由中心主任亲自主持。",
        "py": "Zhōunián huódòng yóu zhōngxīn zhǔrèn qīnzì zhǔchí.",
        "en": "The anniversary event is hosted in person by the center director."
      }
    ]
  },
  {
    "n": 3542,
    "zh": "主动",
    "py": "zhǔdòng",
    "pyPlain": "zhudong",
    "en": "take the initiative; active; proactive",
    "family": "主",
    "parts": [
      {
        "c": "主",
        "m": "self as agent"
      },
      {
        "c": "动",
        "m": "move"
      }
    ],
    "hook": "You move first. Opposite of 被动.",
    "usage": "Learning and work. 主动学习, 主动联系.",
    "cols": [
      "主动学习",
      "主动联系",
      "主动帮助"
    ],
    "ex": [
      {
        "lv": 1,
        "zh": "学生应该主动问问题。",
        "py": "Xuéshēng yīnggāi zhǔdòng wèn wèntí.",
        "en": "Students should take the initiative to ask questions."
      },
      {
        "lv": 2,
        "zh": "他主动注册了中级班，而不是等老师安排。",
        "py": "Tā zhǔdòng zhùcè le zhōngjí bān, ér bú shì děng lǎoshī ānpái.",
        "en": "He proactively registered for the intermediate class instead of waiting for the teacher to arrange it."
      }
    ]
  },
  {
    "n": 3543,
    "zh": "主观",
    "py": "zhǔguān",
    "pyPlain": "zhuguan",
    "en": "subjective",
    "family": "主",
    "parts": [
      {
        "c": "主",
        "m": "subject"
      },
      {
        "c": "观",
        "m": "view"
      }
    ],
    "hook": "A view from the self. Opposite 客观.",
    "usage": "判断, 看法. Slightly formal. Do not confuse with 主人.",
    "cols": [
      "主观判断",
      "主观看法",
      "太主观"
    ],
    "ex": [
      {
        "lv": 1,
        "zh": "这个评价有点主观。",
        "py": "Zhège píngjià yǒudiǎn zhǔguān.",
        "en": "This evaluation is a bit subjective."
      },
      {
        "lv": 2,
        "zh": "专家提醒我们，不要只凭主观印象做重大决定。",
        "py": "Zhuānjiā tíxǐng wǒmen, búyào zhǐ píng zhǔguān yìnxiàng zuò zhòngdà juédìng.",
        "en": "Experts remind us not to make major decisions only from subjective impressions."
      }
    ]
  },
  {
    "n": 3544,
    "zh": "主人",
    "py": "zhǔrén",
    "pyPlain": "zhuren",
    "en": "host; owner; master",
    "family": "主",
    "parts": [
      {
        "c": "主",
        "m": "master / host"
      },
      {
        "c": "人",
        "m": "person"
      }
    ],
    "hook": "The person who owns the place or receives guests. Not 主任 (job title).",
    "usage": "主人招待客人. Also 房子的主人.",
    "cols": [
      "房子的主人",
      "热情的主人",
      "主人招待"
    ],
    "ex": [
      {
        "lv": 1,
        "zh": "主人请我们坐下喝茶。",
        "py": "Zhǔrén qǐng wǒmen zuò xià hē chá.",
        "en": "The host asked us to sit and drink tea."
      },
      {
        "lv": 2,
        "zh": "住房的主人还没有注册新的住址。",
        "py": "Zhùfáng de zhǔrén hái méiyǒu zhùcè xīn de zhùzhǐ.",
        "en": "The owner of the housing has not yet registered the new address."
      }
    ]
  },
  {
    "n": 3545,
    "zh": "主任",
    "py": "zhǔrèn",
    "pyPlain": "zhuren",
    "en": "director; head; person in charge",
    "family": "主",
    "parts": [
      {
        "c": "主",
        "m": "chief"
      },
      {
        "c": "任",
        "m": "duty / office"
      }
    ],
    "hook": "The person who holds the main duty. A title, not the host of a dinner.",
    "usage": "办公室主任, 科室主任. Formal address.",
    "cols": [
      "办公室主任",
      "系主任",
      "主任说"
    ],
    "ex": [
      {
        "lv": 1,
        "zh": "请把消息转告主任。",
        "py": "Qǐng bǎ xiāoxi zhuǎngào zhǔrèn.",
        "en": "Please pass the message on to the director."
      },
      {
        "lv": 2,
        "zh": "中心主任决定逐步完善住宿安排。",
        "py": "Zhōngxīn zhǔrèn juédìng zhúbù wánshàn zhùsù ānpái.",
        "en": "The center director decided to improve accommodation arrangements step by step."
      }
    ]
  },
  {
    "n": 3546,
    "zh": "主食",
    "py": "zhǔshí",
    "pyPlain": "zhushi",
    "en": "staple food; main food",
    "family": "主",
    "parts": [
      {
        "c": "主",
        "m": "main"
      },
      {
        "c": "食",
        "m": "food"
      }
    ],
    "hook": "The food that fills the meal: rice, noodles, bread. Not side dishes.",
    "usage": "米饭是主食. Culture and daily life topics.",
    "cols": [
      "以米饭为主食",
      "主食是面条"
    ],
    "ex": [
      {
        "lv": 1,
        "zh": "南方人的主食常常是米饭。",
        "py": "Nánfāng rén de zhǔshí chángcháng shì mǐfàn.",
        "en": "The staple food of southerners is often rice."
      },
      {
        "lv": 2,
        "zh": "即使注重健康，他也没有完全改变主食。",
        "py": "Jíshǐ zhùzhòng jiànkāng, tā yě méiyǒu wánquán gǎibiàn zhǔshí.",
        "en": "Even though he attaches importance to health, he has not completely changed his staple food."
      }
    ]
  },
  {
    "n": 3547,
    "zh": "主题",
    "py": "zhǔtí",
    "pyPlain": "zhuti",
    "en": "theme; topic; subject",
    "family": "主",
    "parts": [
      {
        "c": "主",
        "m": "main"
      },
      {
        "c": "题",
        "m": "topic"
      }
    ],
    "hook": "The main topic of a talk, essay, or party.",
    "usage": "会议主题, 主题是…. Written and spoken.",
    "cols": [
      "会议主题",
      "主题演讲",
      "围绕主题"
    ],
    "ex": [
      {
        "lv": 1,
        "zh": "今天讨论的主题是住房。",
        "py": "Jīntiān tǎolùn de zhǔtí shì zhùfáng.",
        "en": "Today's discussion topic is housing."
      },
      {
        "lv": 2,
        "zh": "这次活动的主题是中外文化交流。",
        "py": "Zhè cì huódòng de zhǔtí shì zhōngwài wénhuà jiāoliú.",
        "en": "The theme of this event is Chinese and foreign cultural exchange."
      }
    ]
  },
  {
    "n": 3548,
    "zh": "主席",
    "py": "zhǔxí",
    "pyPlain": "zhuxi",
    "en": "chairperson; chairman; presiding official",
    "family": "主",
    "parts": [
      {
        "c": "主",
        "m": "chief"
      },
      {
        "c": "席",
        "m": "seat"
      }
    ],
    "hook": "The main seat. A formal office, higher than 主任 in many contexts.",
    "usage": "会议主席, 主席讲话. Formal.",
    "cols": [
      "会议主席",
      "主席致辞",
      "主席台"
    ],
    "ex": [
      {
        "lv": 1,
        "zh": "主席宣布会议开始。",
        "py": "Zhǔxí xuānbù huìyì kāishǐ.",
        "en": "The chairperson announced the start of the meeting."
      },
      {
        "lv": 2,
        "zh": "主席强调，重大问题要由专家共同讨论。",
        "py": "Zhǔxí qiángdiào, zhòngdà wèntí yào yóu zhuānjiā gòngtóng tǎolùn.",
        "en": "The chairperson stressed that major issues should be discussed by experts together."
      }
    ]
  },
  {
    "n": 3549,
    "zh": "注册",
    "py": "zhùcè",
    "pyPlain": "zhuce",
    "en": "register; registration",
    "family": "注",
    "parts": [
      {
        "c": "注",
        "m": "record / pour in"
      },
      {
        "c": "册",
        "m": "register book"
      }
    ],
    "hook": "Write the name into the official book. Accounts, courses, companies.",
    "usage": "注册账号, 注册公司. Modern and administrative.",
    "cols": [
      "注册账号",
      "注册公司",
      "完成注册"
    ],
    "ex": [
      {
        "lv": 1,
        "zh": "请先注册再登录。",
        "py": "Qǐng xiān zhùcè zài dēnglù.",
        "en": "Please register before logging in."
      },
      {
        "lv": 2,
        "zh": "新住址必须在一周内完成注册。",
        "py": "Xīn zhùzhǐ bìxū zài yì zhōu nèi wánchéng zhùcè.",
        "en": "The new residential address must be registered within a week."
      }
    ]
  },
  {
    "n": 3550,
    "zh": "住房",
    "py": "zhùfáng",
    "pyPlain": "zhufang",
    "en": "housing; dwelling",
    "family": "住",
    "parts": [
      {
        "c": "住",
        "m": "live"
      },
      {
        "c": "房",
        "m": "house"
      }
    ],
    "hook": "The house you live in as a social topic: supply, price, conditions.",
    "usage": "住房问题, 住房条件. More topic-like than 房子.",
    "cols": [
      "住房问题",
      "住房条件",
      "解决住房"
    ],
    "ex": [
      {
        "lv": 1,
        "zh": "城市住房越来越贵。",
        "py": "Chéngshì zhùfáng yuèláiyuè guì.",
        "en": "Urban housing is getting more and more expensive."
      },
      {
        "lv": 2,
        "zh": "中期报告重点讨论了年轻人的住房问题。",
        "py": "Zhōngqī bàogào zhòngdiǎn tǎolùn le niánqīng rén de zhùfáng wèntí.",
        "en": "The mid-term report focused on young people's housing problems."
      }
    ]
  },
  {
    "n": 3551,
    "zh": "住宿",
    "py": "zhùsù",
    "pyPlain": "zhusu",
    "en": "stay; accommodation; lodge",
    "family": "住",
    "parts": [
      {
        "c": "住",
        "m": "stay"
      },
      {
        "c": "宿",
        "m": "lodge overnight"
      }
    ],
    "hook": "宿 is overnight lodging. Hotels, dorms, short stays. Not long-term housing policy.",
    "usage": "住宿安排, 学生住宿.",
    "cols": [
      "安排住宿",
      "住宿费",
      "学生住宿"
    ],
    "ex": [
      {
        "lv": 1,
        "zh": "旅行时住宿要提前订。",
        "py": "Lǚxíng shí zhùsù yào tíqián dìng.",
        "en": "When traveling, book accommodation in advance."
      },
      {
        "lv": 2,
        "zh": "会议主办方已经为中外专家安排了住宿。",
        "py": "Huìyì zhǔbànfāng yǐjīng wèi zhōngwài zhuānjiā ānpái le zhùsù.",
        "en": "The organizers have arranged accommodation for Chinese and foreign experts."
      }
    ]
  },
  {
    "n": 3552,
    "zh": "住址",
    "py": "zhùzhǐ",
    "pyPlain": "zhuzhi",
    "en": "residential address",
    "family": "住",
    "parts": [
      {
        "c": "住",
        "m": "reside"
      },
      {
        "c": "址",
        "m": "site / address"
      }
    ],
    "hook": "址 is the site. 住址 is where you officially live, used on forms.",
    "usage": "填写住址. More official than 地址, which can be any address.",
    "cols": [
      "填写住址",
      "新住址",
      "家庭住址"
    ],
    "ex": [
      {
        "lv": 1,
        "zh": "请写下你的住址。",
        "py": "Qǐng xiě xià nǐ de zhùzhǐ.",
        "en": "Please write down your residential address."
      },
      {
        "lv": 2,
        "zh": "注册时住址写错了，他只好重新提交。",
        "py": "Zhùcè shí zhùzhǐ xiě cuò le, tā zhǐhǎo chóngxīn tíjiāo.",
        "en": "He wrote the address wrong when registering, so he had to submit it again."
      }
    ]
  },
  {
    "n": 3553,
    "zh": "注重",
    "py": "zhùzhòng",
    "pyPlain": "zhuzhong",
    "en": "attach importance to; emphasize",
    "family": "注",
    "parts": [
      {
        "c": "注",
        "m": "focus / pour"
      },
      {
        "c": "重",
        "m": "weight (zhòng)"
      }
    ],
    "hook": "Pour weight onto something. You treat it as important in practice.",
    "usage": "注重效率, 注重细节. Close to 重视, slightly more about ongoing attention.",
    "cols": [
      "注重效率",
      "注重健康",
      "注重细节"
    ],
    "ex": [
      {
        "lv": 1,
        "zh": "我很注重学习效率。",
        "py": "Wǒ hěn zhùzhòng xuéxí xiàolǜ.",
        "en": "I attach great importance to study efficiency."
      },
      {
        "lv": 2,
        "zh": "这家公司越来越注重员工的住宿条件。",
        "py": "Zhè jiā gōngsī yuèláiyuè zhùzhòng yuángōng de zhùsù tiáojiàn.",
        "en": "This company increasingly emphasizes employees' accommodation conditions."
      }
    ]
  },
  {
    "n": 3554,
    "zh": "抓",
    "py": "zhuā",
    "pyPlain": "zhua",
    "en": "grab; grasp; catch",
    "family": "抓",
    "parts": [
      {
        "c": "抓",
        "m": "hand radical + claw"
      }
    ],
    "hook": "Hand closes on something. Physical grab, or catch a point / opportunity.",
    "usage": "抓住机会, 抓重点. Everyday verb.",
    "cols": [
      "抓住",
      "抓紧",
      "抓重点"
    ],
    "ex": [
      {
        "lv": 1,
        "zh": "他抓住了我的手。",
        "py": "Tā zhuā zhù le wǒ de shǒu.",
        "en": "He grabbed my hand."
      },
      {
        "lv": 2,
        "zh": "学习时要抓住重点，不要平均用力。",
        "py": "Xuéxí shí yào zhuā zhù zhòngdiǎn, búyào píngjūn yònglì.",
        "en": "When studying, grasp the key points; do not spread effort evenly."
      }
    ]
  },
  {
    "n": 3555,
    "zh": "抓紧",
    "py": "zhuājǐn",
    "pyPlain": "zhuajin",
    "en": "grasp tightly; hurry up; make the most of",
    "family": "抓",
    "parts": [
      {
        "c": "抓",
        "m": "grab"
      },
      {
        "c": "紧",
        "m": "tight"
      }
    ],
    "hook": "抓 = hand + claw → grab. 紧 = tight. 抓紧 = grab tightly → hurry / make the most of.",
    "usage": "抓紧时间 is the core collocation. Spoken and written.",
    "cols": [
      "抓紧时间",
      "抓紧机会",
      "抓紧完成"
    ],
    "ex": [
      {
        "lv": 1,
        "zh": "抓紧时间。",
        "py": "Zhuājǐn shíjiān.",
        "en": "Make the most of the time."
      },
      {
        "lv": 2,
        "zh": "报名快结束了，你要抓紧注册。",
        "py": "Bàomíng kuài jiéshù le, nǐ yào zhuājǐn zhùcè.",
        "en": "Registration is about to close; you need to hurry up and register."
      }
    ]
  },
  {
    "n": 3556,
    "zh": "专家",
    "py": "zhuānjiā",
    "pyPlain": "zhuanjia",
    "en": "expert; specialist",
    "family": "专",
    "parts": [
      {
        "c": "专",
        "m": "specialized"
      },
      {
        "c": "家",
        "m": "specialist suffix"
      }
    ],
    "hook": "家 here means a person skilled in a field, as in 科学家.",
    "usage": "Neutral professional title. 请专家, 专家认为.",
    "cols": [
      "专家认为",
      "请专家",
      "行业专家"
    ],
    "ex": [
      {
        "lv": 1,
        "zh": "这位专家研究竹子种植。",
        "py": "Zhè wèi zhuānjiā yánjiū zhúzi zhòngzhí.",
        "en": "This expert studies bamboo cultivation."
      },
      {
        "lv": 2,
        "zh": "中外专家都认为住房问题需要逐步解决。",
        "py": "Zhōngwài zhuānjiā dōu rènwéi zhùfáng wèntí xūyào zhúbù jiějué.",
        "en": "Chinese and foreign experts all believe the housing issue needs to be solved step by step."
      }
    ]
  },
  {
    "n": 3557,
    "zh": "专心",
    "py": "zhuānxīn",
    "pyPlain": "zhuanxin",
    "en": "concentrate; be absorbed in",
    "family": "专",
    "parts": [
      {
        "c": "专",
        "m": "exclusive"
      },
      {
        "c": "心",
        "m": "mind"
      }
    ],
    "hook": "The mind is on one thing only. 专心学习.",
    "usage": "专心 + verb. State, not a job title.",
    "cols": [
      "专心学习",
      "专心工作",
      "很专心"
    ],
    "ex": [
      {
        "lv": 1,
        "zh": "请专心听。",
        "py": "Qǐng zhuānxīn tīng.",
        "en": "Please listen with full attention."
      },
      {
        "lv": 2,
        "zh": "只有专心，才能在中级阶段真正提高。",
        "py": "Zhǐyǒu zhuānxīn, cáinéng zài zhōngjí jiēduàn zhēnzhèng tígāo.",
        "en": "Only by concentrating can you really improve at the intermediate stage."
      }
    ]
  },
  {
    "n": 3558,
    "zh": "转变",
    "py": "zhuǎnbiàn",
    "pyPlain": "zhuanbian",
    "en": "change; transform; undergo transformation",
    "family": "转",
    "parts": [
      {
        "c": "转",
        "m": "turn"
      },
      {
        "c": "变",
        "m": "change"
      }
    ],
    "hook": "A turn into a different state. Attitudes, habits, situations.",
    "usage": "转变观念, 发生转变. Slightly formal. Not a physical U-turn (转弯).",
    "cols": [
      "转变观念",
      "发生转变",
      "逐渐转变"
    ],
    "ex": [
      {
        "lv": 1,
        "zh": "他的态度转变了。",
        "py": "Tā de tàidù zhuǎnbiàn le.",
        "en": "His attitude has changed."
      },
      {
        "lv": 2,
        "zh": "人们的住房观念正在逐渐转变。",
        "py": "Rénmen de zhùfáng guānniàn zhèngzài zhújiàn zhuǎnbiàn.",
        "en": "People's ideas about housing are gradually transforming."
      }
    ]
  },
  {
    "n": 3559,
    "zh": "转告",
    "py": "zhuǎngào",
    "pyPlain": "zhuangao",
    "en": "pass on a message; tell someone on another's behalf",
    "family": "转",
    "parts": [
      {
        "c": "转",
        "m": "transfer"
      },
      {
        "c": "告",
        "m": "tell"
      }
    ],
    "hook": "Turn the message toward a third person. You are not the original speaker.",
    "usage": "请转告他. Needs a recipient. Do not use for telling your own news.",
    "cols": [
      "请转告",
      "转告一声",
      "代为转告"
    ],
    "ex": [
      {
        "lv": 1,
        "zh": "请转告他会议改时间了。",
        "py": "Qǐng zhuǎngào tā huìyì gǎi shíjiān le.",
        "en": "Please tell him the meeting time has changed."
      },
      {
        "lv": 2,
        "zh": "主任不在，你把新的住址转告他就可以。",
        "py": "Zhǔrèn bú zài, nǐ bǎ xīn de zhùzhǐ zhuǎngào tā jiù kěyǐ.",
        "en": "The director is out; just pass the new address on to him."
      }
    ]
  },
  {
    "n": 3560,
    "zh": "装饰",
    "py": "zhuāngshì",
    "pyPlain": "zhuangshi",
    "en": "decorate; adorn; decoration",
    "family": "装",
    "parts": [
      {
        "c": "装",
        "m": "dress / install"
      },
      {
        "c": "饰",
        "m": "ornament"
      }
    ],
    "hook": "饰 is ornament. 装饰 = adorn. Not 装修, which is renovation and interior work.",
    "usage": "装饰房间, 节日装饰. Surface beauty, not structural refit.",
    "cols": [
      "装饰房间",
      "节日装饰",
      "简单装饰"
    ],
    "ex": [
      {
        "lv": 1,
        "zh": "他们用竹子装饰房间。",
        "py": "Tāmen yòng zhúzi zhuāngshì fángjiān.",
        "en": "They decorated the room with bamboo."
      },
      {
        "lv": 2,
        "zh": "周年活动的装饰很简单，主题却很清楚。",
        "py": "Zhōunián huódòng de zhuāngshì hěn jiǎndān, zhǔtí què hěn qīngchu.",
        "en": "The anniversary decorations were simple, but the theme was clear."
      }
    ]
  }
];
export const FAMILIES: { root: string; items: string[] }[] = [
  {
    "root": "中",
    "items": [
      "中级",
      "中介",
      "中期",
      "中外",
      "中心",
      "中药",
      "中医"
    ]
  },
  {
    "root": "主",
    "items": [
      "主持",
      "主动",
      "主观",
      "主人",
      "主任",
      "主食",
      "主题",
      "主席"
    ]
  },
  {
    "root": "住",
    "items": [
      "住房",
      "住宿",
      "住址"
    ]
  },
  {
    "root": "专",
    "items": [
      "专家",
      "专心"
    ]
  },
  {
    "root": "转",
    "items": [
      "转变",
      "转告"
    ]
  },
  {
    "root": "抓",
    "items": [
      "抓",
      "抓紧"
    ]
  },
  {
    "root": "逐",
    "items": [
      "逐步",
      "逐渐"
    ]
  }
];
export const CONTRASTS: { id: string; title: string; body: string; words: string[] }[] = [
  {
    "id": "zhong",
    "title": "种 zhǒng vs 种 zhòng",
    "body": "种子 / 种类 use zhǒng (a kind or a seed). 种植 uses zhòng (to plant).",
    "words": [
      "种子",
      "种类",
      "种植"
    ]
  },
  {
    "id": "chong",
    "title": "重 zhòng vs 重 chóng",
    "body": "重大, 重量, 注重 are zhòng (heavy / weighty). 重新 is chóng (again) and is not a target word, but it is the trap.",
    "words": [
      "重大",
      "重量",
      "注重"
    ]
  },
  {
    "id": "zhubu",
    "title": "逐步 vs 逐渐",
    "body": "逐步 = step by step, in stages. 逐渐 = a gradual process or change.",
    "words": [
      "逐步",
      "逐渐"
    ]
  },
  {
    "id": "zhongyao",
    "title": "中药 vs 中医",
    "body": "中药 = medicinal substances. 中医 = the medical system or the practitioner.",
    "words": [
      "中药",
      "中医"
    ]
  },
  {
    "id": "zhuang",
    "title": "装修 vs 装饰",
    "body": "装修 = renovate / refit. 装饰 = decorate / adorn. Only 装饰 is a target word.",
    "words": [
      "装饰"
    ]
  }
];
export const SITUATIONS: { place: string; zh: string; words: string[] }[] = [
  {
    "place": "At a hospital",
    "zh": "在医院",
    "words": [
      "中药",
      "中医",
      "煮",
      "注重",
      "转变"
    ]
  },
  {
    "place": "At a university",
    "zh": "在大学",
    "words": [
      "中级",
      "主动",
      "专心",
      "专家",
      "注册"
    ]
  },
  {
    "place": "At a company",
    "zh": "在公司",
    "words": [
      "中介",
      "主任",
      "主席",
      "主持",
      "抓紧"
    ]
  },
  {
    "place": "Talking about health",
    "zh": "谈健康",
    "words": [
      "中医",
      "中药",
      "注重",
      "逐渐",
      "转变"
    ]
  },
  {
    "place": "Talking about education",
    "zh": "谈教育",
    "words": [
      "中级",
      "主动",
      "专心",
      "主题",
      "逐步"
    ]
  },
  {
    "place": "Talking about housing",
    "zh": "谈住房",
    "words": [
      "住房",
      "住宿",
      "住址",
      "中介",
      "注册"
    ]
  },
  {
    "place": "Talking about travel",
    "zh": "谈旅行",
    "words": [
      "住宿",
      "住址",
      "主人",
      "抓紧",
      "中心"
    ]
  },
  {
    "place": "Talking about Chinese culture",
    "zh": "谈中国文化",
    "words": [
      "中华民族",
      "中外",
      "竹子",
      "装饰",
      "周年"
    ]
  },
  {
    "place": "Talking about food",
    "zh": "谈饮食",
    "words": [
      "主食",
      "猪",
      "煮",
      "中药",
      "注重"
    ]
  },
  {
    "place": "Talking about work",
    "zh": "谈工作",
    "words": [
      "主任",
      "主动",
      "专家",
      "逐步",
      "转告"
    ]
  },
  {
    "place": "Talking about technology",
    "zh": "谈科技",
    "words": [
      "注册",
      "中心",
      "专家",
      "转变",
      "众多"
    ]
  },
  {
    "place": "Talking about family",
    "zh": "谈家庭",
    "words": [
      "主人",
      "住房",
      "住址",
      "猪",
      "主食"
    ]
  },
  {
    "place": "Talking about learning languages",
    "zh": "谈学语言",
    "words": [
      "中级",
      "主动",
      "专心",
      "逐渐",
      "注重"
    ]
  }
];
export const WORD_COUNT = WORDS.length;
