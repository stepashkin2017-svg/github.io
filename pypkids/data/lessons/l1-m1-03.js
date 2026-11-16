window.LESSON_DATA = window.LESSON_DATA || {};

window.LESSON_DATA['l1-m1-03'] = {
  id: 'l1-m1-03', level: 1, module: '1.1', order: 3,
  type: 'lesson', mode: 'browser',
  title: 'input и строки: станция задаёт вопросы',
  
  hook: {
    text: 'Станция должна общаться с экипажем! Научи Робика задавать вопросы, считать количество букв в пароле и даже находить секретные слова в тексте.',
  },

  theory: [
    // --- РАЗМИНКА ---
    {
      title: '🔥 Разминка перед стартом',
      blocks: [
        { type: 'text', content: 'Мы уже умеем выводить текст (<code>print</code>) и хранить данные (<code>переменные</code>). Но пока программы не умеют «слушать». А ещё мы знаем, что компьютер различает числа и текст.' },
        {
          type: 'quiz_wrapper',
          quiz: {
            question: 'Если Робик спросит "Как тебя зовут?", а ты ответишь "Алекс", к какому типу данных относится этот ответ?',
            options: ['int (число)', 'str (текст)', 'float (дробь)'],
            correct: 1
          }
        }
      ]
    },

    // --- ТЕОРИЯ 1: INPUT ---
    {
      title: '1. Робик учится спрашивать',
      blocks: [
        { type: 'text', content: 'В Python есть специальная команда <b>input()</b>. Она выводит вопрос на экран и <b>ждёт</b>, пока пользователь не напечатает ответ.' },
        { type: 'def_card', term: 'input()', definition: 'Команда, которая задаёт вопрос и запоминает то, что ввёл пользователь.', example: 'name = input("Как вас зовут? ")' },
        { type: 'rich_code', code: 'name = input("Как вас зовут? ")\nprint("Привет,", name)' },
        { type: 'terminal', output: 'Как вас зовут? Алекс\nПривет, Алекс' },
        
        { type: 'callout', style: 'memo', title: '💡 Секрет input()', content: '<b>input() всегда возвращает текст (строку).</b> Даже если ты введёшь число 10, Робик будет думать, что это текст "10".' }
      ]
    },

    // --- ТЕОРИЯ 2: INT ---
    {
      title: '2. Если нужно число: int()',
      blocks: [
        { type: 'text', content: 'Если мы хотим посчитать математику с введённым числом, нужно превратить текст в число с помощью команды <code>int()</code>.' },
        { type: 'rich_code', code: 'age = int(input("Возраст: "))\nprint(age + 5)' },
        { type: 'terminal', output: 'Возраст: 10\n15' },
        { type: 'callout', style: 'warn', title: '⚠️ Читаем изнутри наружу', content: 'Сначала работает <code>input()</code> (получает текст "10"). Потом <code>int()</code> (превращает в число 10). И только потом число попадает в переменную.' }
      ]
    },

    // --- ТЕОРИЯ 3: МАГИЯ СТРОК ---
    {
      title: '3. Что умеют строки?',
      blocks: [
        { type: 'text', content: 'Раз <code>input()</code> даёт нам строку (текст), давай научимся с ней работать! У строк есть свои суперспособности (методы). Вызываются они через точку.' },
        
        { type: 'def_card', term: 'len()', definition: 'Считает количество символов в строке (длину).', example: 'len("Привет") → 6' },
        { type: 'rich_code', code: 'word = input("Введите пароль: ")\nprint("Длина пароля:", len(word))' },
        { type: 'terminal', output: 'Введите пароль: Space\nДлина пароля: 5' },
        
        { type: 'text', content: '<b>.upper()</b> и <b>.lower()</b> — меняют регистр букв. <code>.upper()</code> делает все буквы большими (как крик), а <code>.lower()</code> — маленькими (как шёпот).' },
        { type: 'rich_code', code: 'name = "Робик"\nprint(name.upper())\nprint(name.lower())' },
        { type: 'terminal', output: 'РОБИК\nробик' },

        { type: 'text', content: '<b>.find()</b> — ищет слово или букву внутри текста. Если найдёт, покажет номер позиции (считая с нуля). Если не найдёт — покажет -1.' },
        { type: 'rich_code', code: 'text = "Я люблю космос"\nprint(text.find("космос"))' },
        { type: 'terminal', output: '8' },

        // Проверка
        {
          type: 'quiz_wrapper',
          quiz: {
            question: 'Что выведет код: print("Космос".lower())?',
            options: ['КОСМОС', 'космос', 'Ошибка'],
            correct: 1
          }
        }
      ]
    },

    // --- РАЗБОР ЗАДАЧИ ---
    {
      title: '4. Разбор задачи: Сканер безопасности',
      blocks: [
        { type: 'text', content: 'Давай напишем программу для проверки пароля. Она спросит пароль, сделает его большими буквами и проверит, есть ли в нём секретное слово "КОСМОС".' },
        
        {
          type: 'task_analysis',
          steps: [
            { 
              title: 'Шаг 1. Получить пароль', 
              text: 'Спрашиваем пароль и сохраняем его.', 
              code: 'password = input("Введите пароль: ")' 
            },
            { 
              title: 'Шаг 2. Сделать буквы большими', 
              text: 'Используем .upper(), чтобы неважно было, как введено слово (космос, Космос или КОСМОС).', 
              code: 'big_password = password.upper()' 
            },
            { 
              title: 'Шаг 3. Найти секретное слово', 
              text: 'Ищем слово "КОСМОС" в нашей большой строке. Если find вернёт не -1, значит слово есть.', 
              code: 'position = big_password.find("КОСМОС")\nprint("Позиция:", position)' 
            },
            { 
              title: 'Шаг 4. Проверка', 
              text: 'Если ввести "Мой космос", пароль станет "МОЙ КОСМОС", и слово найдётся на позиции 4.', 
              output: 'Позиция: 4' 
            }
          ]
        }
      ]
    }
  ],

  practice: {
    defaultTier: 1,
    tiers: [
      {
        level: 1, label: '⭐',
        instruction: 'Спроси имя пользователя и выведи его длину, используя len().',
        starterCode: 'name = input("Имя: ")\n# Выведи длину\n',
        checks: [
          { type: 'output_multi', cases: [
            { stdin: ['Алекс'], expected: '5' }, 
            { stdin: ['Мария'], expected: '5' }
          ] }
        ],
        hints: [
          'Используй print(len(name))'
        ]
      },
      {
        level: 2, label: '⭐⭐',
        instruction: 'Спроси возраст (число) и выведи, сколько будет через 10 лет. Не забудь про int()!',
        starterCode: 'age = int(input("Возраст: "))\n# Посчитай и выведи\n',
        checks: [
          { type: 'output_multi', cases: [{ stdin: ['10'], expected: '20' }] }
        ],
        hints: [
          'Напиши print(age + 10)'
        ]
      },
      {
        level: 3, label: '⭐⭐⭐',
        instruction: 'Спроси слово. Выведи это же слово, но полностью большими буквами (используй .upper()).',
        starterCode: 'word = input("Слово: ")\n# Выведи слово большими буквами\n',
        checks: [
          { type: 'output_multi', cases: [{ stdin: ['привет'], expected: 'ПРИВЕТ' }] }
        ],
        hints: [
          'Используй print(word.upper())'
        ]
      },
      {
        level: 4, label: '⭐⭐⭐⭐ (Бонус)',
        instruction: 'Спроси фразу и проверь, есть ли в ней слово "робот" (в любом регистре). Выведи позицию этого слова (используй .lower() и .find()).',
        starterCode: 'text = input("Фраза: ")\ntext_lower = text.lower()\n# Найди слово\n',
        checks: [
          { type: 'output_multi', cases: [
            { stdin: ['Я Робот'], expected: '2' },
            { stdin: ['нет тут'], expected: '-1' }
          ] }
        ],
        hints: [
          'Текст уже приведён к нижнему регистру в переменной text_lower.',
          'Используй print(text_lower.find("робот"))'
        ]
      }
    ]
  },

  summary: { reflection: 'Какие команды для работы со строками ты запомнил?' },
  reward: { xp: 25, badge: 'Мастер строк' }
};