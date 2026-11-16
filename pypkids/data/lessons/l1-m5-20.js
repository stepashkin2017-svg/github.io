window.LESSON_DATA = window.LESSON_DATA || {};

window.LESSON_DATA['l1-m5-20'] = {
  id: 'l1-m5-20', level: 1, module: '1.5', order: 4,
  type: 'project', mode: 'vscode',
  title: 'Проект: «Космический кликер»',
  
  hook: {
    text: 'ТРЕВОГА! Метеоритный поток пробил обшивку! Робик запустил аварийный радар. Чтобы отстреливать метеориты, нужна игра. Напиши программу, которая будет уничтожать метеорит по клику и считать очки. Это финальный экзамен модуля!',
  },

  project: {
    goal: 'Создать игру-кликер с космическим фоном, обработкой кликов и подсчетом очков.',
    requirements: [
      'Нарисовать фон из 50 звезд с помощью цикла while и random.',
      'Создать черепашку-метеорит (круг с заливкой).',
      'Создать функцию телепортации метеорита в случайную точку.',
      'Создать функцию click(x, y), которая ловит клик, добавляет очко и телепортирует метеорит.',
      'Использовать onscreenclick() для запуска функции клика.',
      'Выводить счет на экран командой t.write().'
    ],
    checklist: [
      'Использован цикл while для фона',
      'Создана функция move_meteor()',
      'Подключен onscreenclick(click)',
      'Внутри click используется random.randint',
      'Счет отображается на экране'
    ]
  },

  theory: [
    {
      title: '📋 Брифинг миссии (ТЗ проекта)',
      blocks: [
        { type: 'text', content: 'Мы дошли до финала! Сейчас мы соберем игру воедино. Она будет состоять из 4 частей. Не пытайся написать всё сразу — делай шаг за шагом.' },
        { type: 'character_says', text: 'Инженер, у нас 50 звезд на фоне, красный метеорит и счет. Когда игрок кликает по экрану, метеорит телепортируется в новое место, а счет увеличивается. Сможешь собрать это?' },
        
        { 
          type: 'task_analysis',
          steps: [
            { 
              title: 'Этап 1. Фон (Космос)', 
              text: 'Создаем черепашку для фона, прячем её и циклом while рисуем 50 звезд (точек) в случайных координатах.', 
              code: 'bg = Turtle()\nbg.hideturtle()\nbg.penup()\ncount = 0\nwhile count < 50:\n    bg.goto(random.randint(-300,300), random.randint(-300,300))\n    bg.dot(5, "white")\n    count += 1' 
            },
            { 
              title: 'Этап 2. Метеорит', 
              text: 'Создаем черепашку-метеорит. Красим её в красный и делаем круглой.', 
              code: 'meteor = Turtle()\nmeteor.shape("circle")\nmeteor.color("red")\nmeteor.penup()' 
            },
            { 
              title: 'Этап 3. Телепортация', 
              text: 'Создаем функцию, которая перемещает метеорит в случайную точку.', 
              code: 'def move_meteor():\n    meteor.goto(random.randint(-200,200), random.randint(-200,200))' 
            },
            { 
              title: 'Этап 4. Клик и счет', 
              text: 'Функция click срабатывает при клике. Она добавляет очко, обновляет текст на экране и телепортирует метеорит. В конце включаем прослушку кликов.', 
              code: 'def click(x, y):\n    global score\n    score += 1\n    move_meteor()\n\nturtle.onscreenclick(click)' 
            }
          ]
        }
      ]
    },
    {
      title: '🎮 Тренировка перед стартом',
      blocks: [
        { type: 'text', content: 'Проверь себя перед написанием финального кода.' },
        { type: 'true_false', question: 'Функция onscreenclick(click) автоматически передает координаты x и y в функцию click.', correct: true },
        {
          type: 'fill_blanks',
          title: 'Настрой телепорт',
          instruction: 'Заполни пропуски, чтобы метеорит перемещался в случайные координаты.',
          code: 'def move_meteor():\n    meteor.goto(random.[1](-200, 200), random.[1](-200, 200))',
          answers: { '1': 'randint' }
        }
      ]
    }
  ],

  practice: {
    defaultTier: 1,
    tiers: [
      {
        level: 1, label: '🏆 Босс',
        instruction: 'Собери игру по 4 этапам из брифинга. Следуй чек-листу. Если застрял — посмотри подсказки!',
        starterCode: 'from turtle import *\nimport random\n\nscreen = Screen()\nscreen.bgcolor("black")\n\n# ==========================================\n# ЭТАП 1: ФОН (ЗВЕЗДЫ)\n# ==========================================\nbg = Turtle()\nbg.hideturtle()\nbg.penup()\nbg.speed(0)\nbg.color("white")\n\ncount = 0\nwhile count < 50:\n    # Твой код: перемести bg в случайную точку и поставь точку (dot)\n    \n    count = count + 1\n\n\n# ==========================================\n# ЭТАП 2: МЕТЕОРИТ\n# ==========================================\nmeteor = Turtle()\n# Твой код: сделай форму circle, цвет red, подними перо (penup)\n\n\n\n# ==========================================\n# ЭТАП 3: ФУНКЦИЯ ТЕЛЕПОРТАЦИИ\n# ==========================================\ndef move_meteor():\n    # Твой код: перемести meteor в случайные координаты\n    pass\n\n\n# ==========================================\n# ЭТАП 4: КЛИК И СЧЕТ\n# ==========================================\nscore = 0\npen = Turtle() # Черепашка для вывода текста\npen.hideturtle()\npen.penup()\npen.goto(-280, 250) # Перемещаем текст в левый верхний угол\npen.color("white")\n\n# Напиши функцию click(x, y)\ndef click(x, y):\n    global score\n    # Добавь 1 к счету\n    \n    # Обнови текст на экране (используй pen.clear() и pen.write())\n    \n    # Вызови функцию move_meteor()\n    \n\n# Включи прослушивание кликов\nturtle.onscreenclick(click)\n\n# Начальный вывод счета\npen.write("Счет: 0", font=("Arial", 24, "bold"))\n\nturtle.exitonclick()',
        checks: [
          { type: 'ast_static', rules: { 
              required_calls: ['onscreenclick', 'random.randint', 't.dot', 't.shape', 't.write'], 
              required_constructs: ['function_def', 'while_loop'] 
          } }
        ],
        hints: [
          'Этап 1: bg.goto(random.randint(-300,300), random.randint(-300,300)); bg.dot(5, "white")',
          'Этап 2: meteor.shape("circle"); meteor.color("red"); meteor.penup()',
          'Этап 3: meteor.goto(random.randint(-200,200), random.randint(-200,200))',
          'Этап 4: score += 1; pen.clear(); pen.write(f"Счет: {score}", font=("Arial", 24, "bold")); move_meteor()'
        ]
      }
    ]
  },

  summary: { reflection: 'Какая часть игры была самой сложной? Что помогло тебе собрать всё вместе?' },
  reward: { xp: 100, badge: 'Геймдизайнер станции' }
};