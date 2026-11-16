window.LESSON_DATA = window.LESSON_DATA || {};

window.LESSON_DATA['l1-m1-01'] = {
  id: 'l1-m1-01', level: 1, module: '1.1', order: 1,
  type: 'lesson', mode: 'browser',
  title: 'print: первая программа',
  
  hook: {
    text: 'Станция в полной темноте. После аварии бортовой компьютер Робик потерял голос и не может включить свет. Чтобы его оживить, нужно подать команду. Твой первый код запустит систему!',
  },

  theory: [
    // --- РАЗМИНКА (Повторение / Введение) ---
    {
      title: '🔥 Разминка перед стартом',
      blocks: [
        { type: 'text', content: 'Прежде чем мы начнём писать код, давай проверим твою интуицию. Как ты думаешь, что делает компьютер?' },
        {
          type: 'quiz_wrapper',
          quiz: {
            question: 'Кто отдаёт команды компьютеру?',
            options: ['Сам компьютер', 'Программист (ты)', 'Электричество'],
            correct: 1
          }
        },
        {
          type: 'quiz_wrapper',
          quiz: {
            question: 'Как ты думаешь, на каком языке мы будем общаться с Робиком?',
            options: ['На русском', 'На английском', 'На языке Python'],
            correct: 2
          }
        }
      ]
    },

    // --- ТЕОРИЯ 1 ---
    {
      title: '1. Дай Робику голос',
      blocks: [
        { type: 'text', content: 'В Python есть специальная команда <b>print</b> (с англ. — «печать»). Она выводит текст на экран.' },
        { type: 'def_card', term: 'print()', definition: 'Команда, которая берет то, что написано в скобках, и показывает на экране.', example: 'print("Привет, мир!")' },
        { type: 'character_says', text: 'Напиши в скобках "Станция включена", и я проснусь!' },
        { type: 'rich_code', code: 'print("Станция включена")' },
        { type: 'terminal', output: 'Станция включена' },
        { type: 'callout', style: 'memo', title: '💡 Кавычки', content: 'Текст внутри print() обязательно должен быть в кавычках. Программа поймёт, что это текст, и не будет искать в нём ошибки.' },
        
        // Проверка после первого блока
        {
          type: 'quiz_wrapper',
          quiz: {
            question: 'Что выведет этот код: print("5 + 5")?',
            options: ['10', '5 + 5', 'Ошибка'],
            correct: 1
          }
        }
      ]
    },

    // --- ТЕОРИЯ 2 ---
    {
      title: '2. Робик — калькулятор',
      blocks: [
        { type: 'text', content: 'Но print умеет не только говорить. Он может считать! Если убрать кавычки, Python поймёт, что это математика, и посчитает результат.' },
        { type: 'character_says', text: 'Я умею выполнять любые математические операции! Вот основные знаки, которые я понимаю:' },
        
        { 
          type: 'text', 
          content: `
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-top: 10px;">
              <div style="background:#F8FAFC; padding:12px; border-radius:8px; border:2px solid #E2E8F0;"><b>+</b> — сложение</div>
              <div style="background:#F8FAFC; padding:12px; border-radius:8px; border:2px solid #E2E8F0;"><b>-</b> — вычитание</div>
              <div style="background:#F8FAFC; padding:12px; border-radius:8px; border:2px solid #E2E8F0;"><b>*</b> — умножение</div>
              <div style="background:#F8FAFC; padding:12px; border-radius:8px; border:2px solid #E2E8F0;"><b>/</b> — деление</div>
            </div>
          ` 
        },

        { type: 'rich_code', code: 'print(10 + 5)   # Сложение\nprint(10 - 3)   # Вычитание\nprint(10 * 2)   # Умножение\nprint(10 / 2)   # Деление' },
        { type: 'terminal', output: '15\n7\n20\n5.0' },
        
        { type: 'callout', style: 'warn', title: '⚠️ Внимание на деление', content: 'Заметил, что при делении получилось <code>5.0</code>, а не <code>5</code>? В Python любое деление через <code>/</code> всегда даёт дробное число (float).' },

        { type: 'text', content: 'А ещё есть суперспособности для программистов:' },
        { 
          type: 'text', 
          content: `
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 10px;">
              <div style="background:#F8FAFC; padding:12px; border-radius:8px; border:2px solid #E2E8F0;"><b>//</b> — деление без остатка</div>
              <div style="background:#F8FAFC; padding:12px; border-radius:8px; border:2px solid #E2E8F0;"><b>%</b> — остаток от деления</div>
              <div style="background:#F8FAFC; padding:12px; border-radius:8px; border:2px solid #E2E8F0;"><b>**</b> — возведение в степень</div>
            </div>
          ` 
        },
        { type: 'rich_code', code: 'print(10 // 3)  # Сколько целых троек поместится в 10?\nprint(10 % 3)   # Какой останется остаток?\nprint(2 ** 3)   # 2 в степени 3 (2 * 2 * 2)' },
        { type: 'terminal', output: '3\n1\n8' },
        
        {
          type: 'quiz_wrapper',
          quiz: {
            question: 'Что выведет код: print(10 % 4)?',
            options: ['2', '2.5', '2 (остаток)'],
            correct: 0
          }
        }
      ]
    },

    // --- РАЗБОР ЗАДАЧИ ---
    {
      title: '3. Как решать задачи?',
      blocks: [
        { type: 'text', content: 'Программирование — это не просто печать команд. Это решение задач. Давай разберём, как думает программист.' },
        { type: 'character_says', text: 'Ой, у меня новая задача! У нас было 100 единиц топлива. Мы совершили 3 прыжка, каждый тратит 20 единиц. Сколько топлива осталось?' },
        
        // Новый блок: Пошаговый разбор
        {
          type: 'task_analysis',
          steps: [
            { 
              title: 'Шаг 1. Понять, что дано', 
              text: 'Нам известно начальное топливо (100) и сколько тратится за 1 прыжок (20). А ещё мы знаем, что прыжков было 3.' 
            },
            { 
              title: 'Шаг 2. Составить формулу', 
              text: 'Сначала узнаем, сколько топлива потратили всего: 20 * 3. Потом вычтем это из начального: 100 - (20 * 3).' 
            },
            { 
              title: 'Шаг 3. Перевести на язык Python', 
              text: 'Всё это можно сделать одной командой внутри print!', 
              code: 'print(100 - (20 * 3))' 
            },
            { 
              title: 'Шаг 4. Проверить результат', 
              text: '20 * 3 = 60. 100 - 60 = 40. Ответ: 40.', 
              output: '40' 
            }
          ]
        },
        { type: 'callout', style: 'memo', title: '💡 Главное правило', content: 'Всегда сначала решай задачу на бумаге, а потом пиши код. Программист должен думать головой, а не руками!' }
      ]
    }
  ],

  practice: {
    defaultTier: 1,
    tiers: [
      {
        level: 1, label: '⭐',
        instruction: 'Выведи на экран текст: Привет, Робик!',
        starterCode: 'print("Привет, Робик!")',
        checks: [{ type: 'output', expected: 'Привет, Робик!' }],
        hints: ['Не забудь кавычки вокруг текста.']
      },
      {
        level: 2, label: '⭐⭐',
        instruction: 'Выведи результат умножения 15 на 4 (используй знак *).',
        starterCode: 'print(15 * 4)',
        checks: [{ type: 'output', expected: '60' }],
        hints: [
          'Оператор умножения — это звездочка *.',
          'Твой код: print(15 * 4)'
        ]
      },
      {
        level: 3, label: '⭐⭐⭐',
        instruction: 'Робик купил 3 батарейки по 50 рублей и потратил 20 рублей на провод. Выведи, сколько он потратил всего. Используй математику в print.',
        starterCode: '# Посчитай общую стоимость\nprint()',
        checks: [{ type: 'output', expected: '170' }],
        hints: [
          'Сначала посчитай стоимость батареек: 3 * 50.',
          'Затем прибавь провод: (3 * 50) + 20.',
          'Вставь это выражение внутрь print()'
        ]
      }
    ]
  },

  summary: { reflection: 'Какие математические знаки ты запомнил?' },
  reward: { xp: 15, badge: 'Первый код' }
};