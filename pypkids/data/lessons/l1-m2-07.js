window.LESSON_DATA = window.LESSON_DATA || {};

window.LESSON_DATA['l1-m2-07'] = {
  id: 'l1-m2-07', level: 1, module: '1.2', order: 3,
  type: 'lesson', mode: 'browser',
  title: 'Магия игр: random, time и дроби',
  
  hook: {
    text: 'Робик нашел древний инопланетный артефакт. Чтобы открыть точку маршрута, нужно сыграть с артефактом в игру «Камень-ножницы-бумага». Артефакт выбирает ход случайно, «думает» перед ответом, а мы замерим, насколько быстро работает наша программа!',
  },

  theory: [
    // ==========================================
    // ПУНКТ 1: RANDOM (Подробно)
    // ==========================================
    {
      title: '1. Случайности: целые и дробные (random)',
      blocks: [
        { type: 'text', content: 'В обычной жизни компьютер делает всё по четкому плану. Но в играх нам нужна <b>непредсказуемость</b>. Именно для этого была придумана библиотека <code>random</code> (от англ. — случайный).' },
        { type: 'def_card', term: 'import random', definition: 'Эта команда подключает «мешок с игральными костями». Без нее компьютер не поймет, что ты просишь его о случайности.', example: 'import random' },
        
        { type: 'text', content: 'Внутри этой библиотеки есть две главные команды, и очень важно понимать между ними разницу.' },
        
        { type: 'def_card', term: 'random.randint(a, b)', definition: 'Выбирает случайное <b>ЦЕЛОЕ</b> число от A до B (включая сами A и B). Используй, когда нужны штуки, которые нельзя разделить (люди, кубики, жизни).', example: 'dice = random.randint(1, 6)' },
        { type: 'rich_code', code: 'import random\n\n# Бросаем кубик\ndice = random.randint(1, 6)\nprint("Выпало:", dice)' },
        { type: 'terminal', output: 'Выпало: 4' },

        { type: 'def_card', term: 'random.uniform(a, b)', definition: 'Выбирает случайное <b>ДРОБНОЕ</b> число (float) от A до B. Используй для скорости, температуры, координат, где важны десятые доли.', example: 'speed = random.uniform(10.5, 20.0)' },
        { type: 'rich_code', code: 'import random\n\n# Генерируем скорость корабля\nspeed = random.uniform(10.5, 20.0)\nprint("Скорость:", speed)' },
        { type: 'terminal', output: 'Скорость: 14.73829' },
        
        { type: 'callout', style: 'warn', title: '⚠️ Длинные хвосты дробей', content: 'Заметил, что у скорости много цифр после запятой? Иногда это мешает. Чтобы округлить число, используют функцию <code>round(число, количество_знаков)</code>. Например: <code>round(speed, 2)</code> оставит только 2 знака после запятой.' },

        {
          type: 'fill_blanks', title: 'Выбери команду',
          instruction: 'Нам нужно сгенерировать возраст питомца (целое число) от 1 до 15. Заполни пропуски.',
          code: 'import random\nage = random.[1](1, 15)',
          answers: { '1': 'randint' }
        },
        {
          type: 'fill_blanks', title: 'Выбери команду (дроби)',
          instruction: 'Нам нужно сгенерировать температуру (дробное число) от 36.0 до 37.5.',
          code: 'import random\ntemp = random.[1](36.0, 37.5)',
          answers: { '1': 'uniform' }
        }
      ]
    },

    // ==========================================
    // ПУНКТ 2: TIME (Подробно)
    // ==========================================
    {
      title: '2. Время: паузы и секундомер (time)',
      blocks: [
        { type: 'text', content: 'Компьютеры работают очень быстро. Если программа выведет результат мгновенно, игрок не поймет, что вообще произошло. Нам нужна пауза. А еще программисты любят замерять, сколько времени работает их код. Для всего этого есть библиотека <code>time</code>.' },
        { type: 'def_card', term: 'import time', definition: 'Подключает «часы» компьютера.', example: 'import time' },
        
        { type: 'text', content: 'Первая важная команда — это <b>пауза</b>.' },
        { type: 'def_card', term: 'time.sleep(секунды)', definition: 'Заставляет программу «заснуть» на указанное количество секунд. В это время ничего не происходит.', example: 'time.sleep(2)' },
        { type: 'rich_code', code: 'import time\n\nprint("Сканирую сектор...")\ntime.sleep(2) # Программа замирает на 2 секунды\nprint("Сканирование завершено!")' },
        { type: 'callout', style: 'danger', title: '🚨 Не усни навсегда!', content: 'Если написать <code>time.sleep(100)</code>, программа зависнет на 100 секунд. В нашей среде стоит ставить паузы не больше 3-4 секунд, иначе сработает защита от зависаний!' },

        { type: 'text', content: 'Вторая важная команда — это <b>секундомер</b>. Она возвращает текущее время в виде огромного числа.' },
        { type: 'def_card', term: 'time.time()', definition: 'Возвращает текущее время в секундах. Само по себе число бесполезно, но если засечь его до и после программы, можно узнать время работы.', example: 'start = time.time()' },
        { type: 'rich_code', code: 'import time\n\n# 1. Засекаем старт\nstart = time.time()\n\n# ... какой-то долгий код ...\ntime.sleep(3)\n\n# 2. Засекаем финиш\nend = time.time()\n\n# 3. Вычитаем и получаем время работы\nresult = end - start\nprint("Код работал:", result, "секунд")' },
        
        { type: 'true_false', question: 'Команда time.sleep(3) заставляет программу ждать 3 секунды.', correct: true }
      ]
    },

    // ==========================================
    // ПУНКТ 3: IF/ELIF (Подробно)
    // ==========================================
    {
      title: '3. Как из числа сделать «Камень»?',
      blocks: [
        { type: 'text', content: 'Итак, компьютер сгенерировал случайное число (1, 2 или 3). Но играть мы хотим словами. Как перевести число в слово? Нам помогут условия <code>if/elif</code>, которые мы прошли в прошлом уроке.' },
        { type: 'rich_code', code: 'choice = random.randint(1, 3)\n\nif choice == 1:\n    print("Компьютер выбрал: Камень")\nelif choice == 2:\n    print("Компьютер выбрал: Ножницы")\nelse:\n    print("Компьютер выбрал: Бумага")' },
        
        { type: 'text', content: 'Давай посмотрим, как компьютер будет думать, если выпало число 2:' },
        { 
          type: 'task_analysis',
          steps: [
            { title: 'Проверка 1', text: 'Компьютер спрашивает: choice == 1? Нет (2 не равно 1). Пропускаем.', code: 'if choice == 1:' },
            { title: 'Проверка 2', text: 'Компьютер спрашивает: choice == 2? Да! Заходим внутрь.', code: 'elif choice == 2:' },
            { title: 'Действие', text: 'Выводится слово "Ножницы". А блок else пропускается, потому что мы уже нашли ответ.', code: 'print("Ножницы")' }
          ]
        },
        { type: 'character_says', text: 'Смотри! Теперь я могу случайно выбирать один из трех вариантов и переводить его в понятное слово.' }
      ]
    },

    // ==========================================
    // ПУНКТ 4: РАЗБОР ИГРЫ (Очень подробно)
    // ==========================================
    {
      title: '4. Разбор: Собираем игру по кирпичикам',
      blocks: [
        { type: 'text', content: 'Самое сложное — собрать всё вместе. Чтобы не запутаться, мы разобьем код на 7 маленьких шагов. Каждый шаг — это отдельный «кирпичик».' },
        {
          type: 'task_analysis',
          steps: [
            { 
              title: 'Кирпич 1. Инструменты', 
              text: 'В самом начале подключаем обе библиотеки, которые нам понадобятся.', 
              code: 'import random\nimport time' 
            },
            { 
              title: 'Кирпич 2. Старт таймера', 
              text: 'Включаем секундомер и запоминаем время старта.', 
              code: 'start = time.time()' 
            },
            { 
              title: 'Кирпич 3. Случайный выбор', 
              text: 'Заставляем компьютер загадать число от 1 до 3.', 
              code: 'comp_choice = random.randint(1, 3)' 
            },
            { 
              title: 'Кирпич 4. Интрига', 
              text: 'Выводим текст, что компьютер думает, и делаем паузу на 2 секунды.', 
              code: 'print("Компьютер думает...")\ntime.sleep(2)' 
            },
            { 
              title: 'Кирпич 5. Расшифровка', 
              text: 'Переводим случайное число в слово с помощью if/elif/else.', 
              code: 'if comp_choice == 1:\n    print("Камень")\nelif comp_choice == 2:\n    print("Ножницы")\nelse:\n    print("Бумага")' 
            },
            { 
              title: 'Кирпич 6. Финиш таймера', 
              text: 'Запоминаем время, когда игра закончилась.', 
              code: 'end = time.time()' 
            },
            { 
              title: 'Кирпич 7. Результат', 
              text: 'Вычитаем старт из финиша и выводим время работы игры.', 
              code: 'result = end - start\nprint("Игра заняла:", result, "секунд")' 
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
        level: 1, label: '⭐ Целые числа',
        instruction: 'Подключи `random` и выведи на экран случайное целое число от 1 до 100.',
        starterCode: 'import random\n\n# Твой код\n',
        checks: [{ type: 'ast_static', rules: { required_calls: ['random.randint'] } }],
        hints: ['Используй print(random.randint(1, 100))']
      },
      {
        level: 2, label: '⭐⭐ Дроби',
        instruction: 'Подключи `random`. Создай переменную `speed` и положи в неё случайное дробное число от 10.5 до 20.5. Выведи её.',
        starterCode: 'import random\n\n# Твой код\n',
        checks: [{ type: 'ast_static', rules: { required_calls: ['random.uniform'] } }],
        hints: ['speed = random.uniform(10.5, 20.5)', 'print(speed)']
      },
      {
        level: 3, label: '⭐⭐⭐ Пауза',
        instruction: 'Подключи `time`. Выведи "Загрузка...", сделай паузу 2 секунды, а затем выведи "Готово!".',
        starterCode: 'import time\n\nprint("Загрузка...")\n# Сделай паузу\n\nprint("Готово!")',
        checks: [{ type: 'ast_static', rules: { required_calls: ['time.sleep'] } }],
        hints: ['Используй time.sleep(2)']
      },
      {
        level: 4, label: '⭐⭐⭐⭐ Секундомер',
        instruction: 'Подключи `time`. Засеки время в `start`, сделай паузу 1 секунду, засеки время в `end` и выведи разницу (`end - start`).',
        starterCode: 'import time\n\nstart = time.time()\ntime.sleep(1)\n# Твой код\n',
        checks: [{ type: 'ast_static', rules: { required_calls: ['time.time'] } }],
        hints: ['end = time.time()', 'print(end - start)']
      },
      {
        level: 5, label: '🏆 Босс: Игра',
        instruction: 'Собери игру по 7 шагам из разбора! Компьютер "думает" 2 секунды, выбирает 1, 2 или 3, выводит слово и показывает время игры.',
        starterCode: 'import random\nimport time\n\n# 1. Засеки старт\n\n\n# 2. Случайный выбор\n\n\n# 3. Пауза\n\n\n# 4. If/elif для вывода\n\n\n# 5. Останови таймер и выведи его\n',
        checks: [
          { type: 'ast_static', rules: { required_calls: ['random.randint', 'time.sleep', 'time.time'], required_constructs: ['if'] } }
        ],
        hints: [
          'start = time.time()',
          'choice = random.randint(1, 3)',
          'print("Думаю...")',
          'time.sleep(2)',
          'if choice == 1: print("Камень")',
          'end = time.time()',
          'print(end - start)'
        ]
      }
    ]
  },

  summary: { reflection: 'Чем отличается random.randint от random.uniform, и как замерить время работы программы?' },
  reward: { xp: 35, badge: 'Мастер времени' }
};