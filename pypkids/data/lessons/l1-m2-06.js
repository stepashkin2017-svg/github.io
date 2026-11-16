window.LESSON_DATA = window.LESSON_DATA || {};

window.LESSON_DATA['l1-m2-06'] = {
  id: 'l1-m2-06', level: 1, module: '1.2', order: 2,
  type: 'lesson', mode: 'browser',
  title: 'Сложные условия: and, or, not, elif',
  
  hook: {
    text: 'Наш радар засек неизвестный объект. Чтобы понять, опасен ли он, нужно проверить сразу несколько условий: его скорость, расстояние до нас и цвет. А еще нужно оценить действия экипажа по баллам. Робик один не справится — нужна твоя помощь!',
  },

  theory: [
    // --- ЧАСТЬ 1: НЕ РАВНО ---
    {
      title: '1. Знак «не равно» (!=)',
      blocks: [
        { type: 'text', content: 'В прошлом уроке мы проверяли, равно ли одно другому через `==`. Но что, если нам нужно проверить, что значения <b>разные</b>? Для этого есть оператор <code>!=</code> (восклицательный знак и равно).' },
        { type: 'rich_code', code: 'color = "red"\n\nif color != "green":\n    print("Это не зеленый объект!")' },
        { type: 'callout', style: 'memo', title: '💡 Как читается?', content: '<code>!=</code> читается как «не равно». <code>5 != 3</code> — это True (потому что 5 не равно 3). А <code>5 != 5</code> — это False.' },
        {
          type: 'fill_blanks', title: 'Проверь неравенство',
          instruction: 'Заполни пропуск, чтобы проверить, что пароль не равен "1234".',
          code: 'password = "qwerty"\nif password [1] "1234":\n    print("Надежный пароль")',
          answers: { '1': '!=' }
        }
      ]
    },

    // --- ЧАСТЬ 2: ОПЕРАТОР AND ---
    {
      title: '2. Логическое «И» (and)',
      blocks: [
        { type: 'text', content: 'Иногда для полета нужно, чтобы <b>оба</b> условия были выполнены: и топливо было, и кислород. Для этого используется оператор <code>and</code> (И).' },
        { type: 'rich_code', code: 'fuel = 80\noxygen = 90\n\nif fuel > 50 and oxygen > 50:\n    print("Полет разрешен!")\nelse:\n    print("Есть проблемы с системами.")' },
        { type: 'callout', style: 'warn', title: '⚠️ Строгое правило', content: 'Оператор <code>and</code> дает True только тогда, когда <b>и левая, и правая части</b> равны True. Если хотя бы одна часть False — всё условие False. Как в жизни: "Я пойду гулять, если сделаю уроки И помою посуду". Не сделаешь одно — не пойдешь.' },
        
        {
          type: 'true_false', question: 'Условие (5 > 3 and 10 < 5) выдаст True.', correct: false
        }
      ]
    },

    // --- ЧАСТЬ 3: ОПЕРАТОР OR ---
    {
      title: '3. Логическое «ИЛИ» (or)',
      blocks: [
        { type: 'text', content: 'А если нам достаточно, чтобы выполнилось <b>хотя бы одно</b> условие? Например, мы можем лететь, если у нас есть карта ИЛИ есть автопилот. Для этого используется <code>or</code> (ИЛИ).' },
        { type: 'rich_code', code: 'has_map = False\nhas_autopilot = True\n\nif has_map or has_autopilot:\n    print("Можем лететь!")\nelse:\n    print("Мы заблудимся.")' },
        { type: 'callout', style: 'memo', title: '💡 Свободное правило', content: 'Оператор <code>or</code> дает True, если <b>хотя бы одна</b> часть верна. Если обе части False — только тогда всё условие False.' },
        {
          type: 'fill_blanks', title: 'Собери условие',
          instruction: 'Заполни пропуски, чтобы проверить: температура больше 100 ИЛИ меньше 0.',
          code: 'temp = 150\nif temp [1] 100 [2] temp < 0:\n    print("Опасная температура!")',
          answers: { '1': '>', '2': 'or' }
        }
      ]
    },

    // --- ЧАСТЬ 4: ОПЕРАТОР NOT ---
    {
      title: '4. Отрицание (not)',
      blocks: [
        { type: 'text', content: 'Оператор <code>not</code> (НЕ) — это как выключатель. Он переворачивает значение наоборот. <code>True</code> становится <code>False</code>, а <code>False</code> — <code>True</code>.' },
        { type: 'rich_code', code: 'is_engine_on = False\n\nif not is_engine_on:\n    print("Двигатель выключен! Нужно срочно включить.")\nelse:\n    print("Все работает.")' },
        { type: 'callout', style: 'memo', title: '💡 Где это полезно?', content: 'Вместо того, чтобы писать <code>if is_engine_on == False:</code>, программисты пишут короче: <code>if not is_engine_on:</code>. Читается как «Если НЕ включен».' }
      ]
    },

    // --- ЧАСТЬ 5: ELIF ---
    {
      title: '5. Множественный выбор (elif)',
      blocks: [
        { type: 'text', content: 'Если у нас больше двух вариантов (например, отлично, хорошо, плохо), использовать `if` и `else` неудобно. Для этого есть команда <code>elif</code> (сокращение от else if — «иначе если»).' },
        { type: 'rich_code', code: 'score = 85\n\nif score >= 90:\n    print("Отлично! Высший балл.")\nelif score >= 70:\n    print("Хорошо! Задание выполнено.")\nelif score >= 50:\n    print("Удовлетворительно. Надо повторить.")\nelse:\n    print("Плохо. Нужно пересдать.")' },
        { type: 'text', content: 'Программа проверит условия по очереди. Как только одно из них окажется верным, она выполнит его и пропустит все остальные.' }
      ]
    }
  ],

  practice: {
    defaultTier: 1,
    tiers: [
      {
        level: 1, label: '⭐ Знак !=',
        instruction: 'Создай переменную `status = "опасно"`. Если `status != "безопасно"`, выведи "Тревога!".',
        starterCode: 'status = "опасно"\n# Твой код\n',
        checks: [
          { type: 'ast_static', rules: { required_constructs: ['if'] } },
          { type: 'output', expected: 'Тревога!' }
        ],
        hints: ['if status != "безопасно":', 'Не забудь отступ и print("Тревога!")']
      },
      {
        level: 2, label: '⭐⭐ Оператор and',
        instruction: 'Создай `speed = 120` и `distance = 30`. Если `speed > 100` И `distance < 50` (используй `and`), выведи "Цель захвачена". Иначе — "Цель упущена".',
        starterCode: 'speed = 120\ndistance = 30\n# Твой код\n',
        checks: [
          { type: 'output', expected: 'Цель захвачена' }
        ],
        hints: ['if speed > 100 and distance < 50:', 'else: print("Цель упущена")']
      },
      {
        level: 3, label: '⭐⭐⭐ Оператор or',
        instruction: 'Создай `color = "red"`. Если `color == "red"` ИЛИ `color == "yellow"` (используй `or`), выведи "Внимание!". Иначе — "Все спокойно".',
        starterCode: 'color = "red"\n# Твой код\n',
        checks: [
          { type: 'output', expected: 'Внимание!' }
        ],
        hints: ['if color == "red" or color == "yellow":']
      },
      {
        level: 4, label: '⭐⭐⭐⭐ Оценка (elif и not)',
        instruction: 'Создай `score = 75`. Напиши программу с `elif`: если `score >= 90` — "Отлично". Иначе если `score >= 70` — "Хорошо". Иначе (если не выполнено ни то, ни другое, используй `else` и `not`) — "Нужно повторить".',
        starterCode: 'score = 75\n# Твой код\n',
        checks: [
          { type: 'ast_static', rules: { required_constructs: ['if', 'else'] } }, // В Python AST elif считается частью if/else
          { type: 'output', expected: 'Хорошо' }
        ],
        hints: [
          'if score >= 90: print("Отлично")',
          'elif score >= 70: print("Хорошо")',
          'else: print("Нужно повторить")'
        ]
      }
    ]
  },

  summary: { reflection: 'В чём разница между and и or?' },
  reward: { xp: 30, badge: 'Логик' }
};