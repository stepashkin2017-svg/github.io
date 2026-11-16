window.LESSON_DATA = window.LESSON_DATA || {};

window.LESSON_DATA['l1-m2-05'] = {
  id: 'l1-m2-05', level: 1, module: '1.2', order: 1,
  type: 'lesson', mode: 'browser',
  title: 'Логика, if/else: можно ли лететь?',
  
  hook: {
    text: 'Робик готов к полету на Марс, но система безопасности не пропускает команду. Оказывается, топлива слишком мало. Компьютер должен сам проверить уровень топлива и выдать решение: "Летим" или "Стоянка". Научи Робика принимать решения!',
  },

  theory: [
    // --- ЧАСТЬ 1: ЛОГИЧЕСКИЙ ТИП ---
    {
      title: '1. Да или Нет? (Логический тип)',
      blocks: [
        { type: 'text', content: 'До этого мы работали с числами (<code>int</code>, <code>float</code>) и текстом (<code>str</code>). Но у компьютера есть еще один тип данных — <b>логический (bool)</b>.' },
        { type: 'text', content: 'У него есть всего два значения: <code>True</code> (Правда) и <code>False</code> (Ложь). Это как выключатель: либо включен, либо выключен.' },
        { type: 'rich_code', code: 'is_engine_on = True\nis_low_fuel = False\n\nprint(is_engine_on)\nprint(is_low_fuel)' },
        { type: 'terminal', output: 'True\nFalse' },
        { type: 'callout', style: 'memo', title: '💡 Важно!', content: 'Слова <code>True</code> и <code>False</code> в Python всегда пишутся с <b>большой буквы</b> и без кавычек. Если написать <code>"True"</code> (в кавычках) — это уже текст (str).' },
        
        {
          type: 'true_false', question: 'Значение True относится к логическому типу данных (bool).', correct: true
        }
      ]
    },

    // --- ЧАСТЬ 2: ОПЕРАТОРЫ СРАВНЕНИЯ ---
    {
      title: '2. Как компьютер получает True или False?',
      blocks: [
        { type: 'text', content: 'Компьютер не гадает. Он получает <code>True</code> или <code>False</code>, когда мы просим его <b>сравнить</b> данные. Для этого есть специальные операторы.' },
        { 
          type: 'data_table', headers: ['Оператор', 'Что означает', 'Пример'], 
          rows: [
            { col1: '>', col2: 'Больше', col2_code: true, col1_code: '10 > 5  (True)' },
            { col1: '<', col2: 'Меньше', col2_code: true, col1_code: '3 < 8   (True)' },
            { col1: '>=', col2: 'Больше или равно', col2_code: true, col1_code: '5 >= 5  (True)' },
            { col1: '<=', col2: 'Меньше или равно', col2_code: true, col1_code: '4 <= 2  (False)' },
            { col1: '==', col2: 'Равно (ДВА знака равно!)', col2_code: true, col1_code: 'name == "Робик"' }
          ]
        },
        { type: 'rich_code', code: 'print(10 > 5)\nprint(10 < 5)\nprint(5 == 5)' },
        { type: 'terminal', output: 'True\nFalse\nTrue' },
        { type: 'callout', style: 'danger', title: '🚨 Ловушка: = или == ?', content: 'Один знак <code>=</code> — это присваивание (положи в коробку). Два знака <code>==</code> — это вопрос (равно ли это?). В условиях всегда используем <code>==</code>.' },
        
        {
          type: 'fill_blanks', title: 'Сравни данные',
          instruction: 'Заполни пропуски, чтобы проверить, что возраст больше 18.',
          code: 'age = 20\nprint(age [1] 18)',
          answers: { '1': '>' }
        }
      ]
    },

    // --- ЧАСТЬ 3: IF ---
    {
      title: '3. Принимаем решения (if)',
      blocks: [
        { type: 'text', content: 'Теперь у нас есть <code>True</code> и <code>False</code>. Как заставить программу что-то сделать, если выпало <code>True</code>? Для этого есть команда <code>if</code> (если).' },
        { type: 'rich_code', code: 'fuel = 100\n\nif fuel > 50:\n    print("Топлива достаточно!")' },
        { type: 'def_card', term: 'Синтаксис if', definition: 'После слова <code>if</code> пишется условие (например, <code>fuel > 50</code>). Обязательно ставится <b>двоеточие ( : )</b> в конце строки. А код, который должен выполниться, пишется с <b>отступом</b> в 4 пробела.', example: 'if condition:\n    do_something()' },
        { type: 'callout', style: 'warn', title: '⚠️ Самая частая ошибка!', content: 'Забыл двоеточие <code>:</code> или отступ в 4 пробела — и программа выдаст ошибку (IndentationError или SyntaxError).' },
        
        {
          type: 'fill_blanks', title: 'Настрой условие',
          instruction: 'Заполни пропуски, чтобы программа проверила, что скорость больше 10.',
          code: 'speed = 15\nif speed [1] 10[2]\n    print("Скорость в норме")',
          answers: { '1': '>', '2': ':' }
        }
      ]
    },

    // --- ЧАСТЬ 4: ELSE ---
    {
      title: '4. А если НЕТ? (else)',
      blocks: [
        { type: 'text', content: 'Команда `if` выполняет код, только если условие истинно. А что, если топлива всё-таки мало? Нам нужен план Б. Для этого используется `else` (иначе).' },
        { type: 'rich_code', code: 'fuel = 40\n\nif fuel > 50:\n    print("Летим на Марс!")\nelse:\n    print("Стоянка. Нужно заправиться.")' },
        { type: 'callout', style: 'memo', title: '💡 Как это работает?', content: '<code>else</code> пишется на том же уровне, что и <code>if</code>, и тоже заканчивается двоеточием. Блок <code>else</code> выполняется только тогда, когда условие <code>if</code> оказалось ложным (False).' },
        { type: 'true_false', question: 'Блок кода внутри else выполнится, если условие в if окажется верным (True).', correct: false }
      ]
    },

    // --- ЧАСТЬ 5: РАЗБОР ЗАДАЧИ ---
    {
      title: '5. Разбор задачи: Навигатор',
      blocks: [
        { type: 'text', content: 'Давай напишем программу, которая спрашивает у капитана скорость корабля. Если скорость больше 100, мы летим, иначе — останавливаемся.' },
        {
          type: 'task_analysis',
          steps: [
            { title: 'Шаг 1. Получить данные', text: 'Спрашиваем скорость и не забываем перевести её в число (int).', code: 'speed = int(input("Скорость: "))' },
            { title: 'Шаг 2. Проверить условие', text: 'Пишем if и сравниваем скорость с 100.', code: 'if speed > 100:' },
            { title: 'Шаг 3. Что делать?', text: 'Если условие верно, печатаем "Полет разрешен". Обрати внимание на отступ.', code: '    print("Полет разрешен")' },
            { title: 'Шаг 4. А если нет?', text: 'Добавляем else и печатаем "Слишком медленно".', code: 'else:\n    print("Слишком медленно")' }
          ]
        }
      ]
    }
  ],

  practice: {
    defaultTier: 1,
    tiers: [
      {
        level: 1, label: '⭐ Сравнение',
        instruction: 'Создай переменную `x = 10`. Выведи на экран результат проверки `x > 5`. (Просто напечатай условие в print).',
        starterCode: 'x = 10\n# Выведи результат условия x > 5\n',
        checks: [
          { type: 'output', expected: 'True' }
        ],
        hints: ['Напиши print(x > 5)']
      },
      {
        level: 2, label: '⭐⭐ if',
        instruction: 'Создай переменную `temp = 150`. Напиши условие `if temp > 100:` и выведи "Перегрев!". Если условие не выполняется, ничего выводить не нужно.',
        starterCode: 'temp = 150\n# Твой код\n',
        checks: [
          { type: 'ast_static', rules: { required_calls: ['print'], required_constructs: ['if'] } },
          { type: 'output', expected: 'Перегрев!' }
        ],
        hints: [
          'Не забудь двоеточие после условия: if temp > 100:',
          'Не забудь отступ (4 пробела) перед print'
        ]
      },
      {
        level: 3, label: '⭐⭐⭐ if / else',
        instruction: 'Создай переменную `fuel = 30`. Если `fuel > 50`, выведи "Летим". Иначе (else) выведи "Стоянка".',
        starterCode: 'fuel = 30\n# Твой код\n',
        checks: [
          { type: 'output', expected: 'Стоянка' }
        ],
        hints: [
          'Используй if fuel > 50:',
          'Затем else:',
          'Оба print должны быть с отступами'
        ]
      },
      {
        level: 4, label: '⭐⭐⭐⭐ Диалог с капитаном',
        instruction: 'Спроси у пользователя уровень заряда батареи (через `input` и `int`). Если заряд меньше 20, выведи "Критический уровень!", иначе — "Заряд в норме".',
        starterCode: '# Спроси заряд и проверь его\ncharge = int(input("Заряд: "))\n# Твой код\n',
        checks: [
          { 
            type: 'output_multi', cases: [
              { stdin: ['15'], expected: 'Критический уровень!' }, 
              { stdin: ['50'], expected: 'Заряд в норме' }
            ]
          }
        ],
        hints: [
          'Условие: if charge < 20:',
          'Не забудь про else:'
        ]
      }
    ]
  },

  summary: { reflection: 'В чём разница между знаком = и ==?' },
  reward: { xp: 25, badge: 'Навигатор' }
};