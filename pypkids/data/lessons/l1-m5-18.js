window.LESSON_DATA = window.LESSON_DATA || {};

window.LESSON_DATA['l1-m5-18'] = {
  id: 'l1-m5-18', level: 1, module: '1.5', order: 2,
  type: 'lesson', mode: 'vscode',
  title: 'turtle: заливка, костюмы и функции',
  
  hook: {
    text: 'Планеты без цвета — это скучно. Давай закрасим их! А еще переоденем нашу черепашку в настоящую черепаху и создадим свою команду (функцию) для рисования метеоритов, чтобы не писать один и тот же код 10 раз.',
  },

  theory: [
    // --- ЧАСТЬ 1: ШПАРГАЛКА ---
    {
      title: '📖 Шпаргалка: новые инструменты',
      blocks: [
        { type: 'text', content: 'Сегодня мы добавим в наш арсенал краски и возможность создавать собственные команды.' },
        { 
          type: 'data_table', headers: ['Команда', 'Что делает'], 
          rows: [
            { col1: 't.fillcolor("red")', col2: 'Выбирает цвет заливки (краску в ведре)' },
            { col1: 't.begin_fill()', col2: 'Открывает ведро с краской (начало заливки)' },
            { col1: 't.end_fill()', col2: 'Закрывает ведро (конец заливки)' },
            { col1: 't.shape("turtle")', col2: 'Меняет вид черепашки' },
            { col1: 'def draw_star():', col2: 'Создает свою команду (функцию)' },
            { col1: 'for i in range(5):', col2: 'Повторяет команды 5 раз' }
          ]
        }
      ]
    },

    // --- ЧАСТЬ 2: ЗАЛИВКА ---
    {
      title: '1. Магия заливки (Как покрасить фигуру?)',
      blocks: [
        { type: 'text', content: 'Чтобы закрасить фигуру, нужно обернуть команды её рисования в «книгу». Мы открываем книгу командой <code>begin_fill()</code>, рисуем фигуру, а затем закрываем книгу командой <code>end_fill()</code>.' },
        { type: 'callout', style: 'warn', title: '⚠️ Правило заливки', content: 'Если забыть написать <code>end_fill()</code>, черепашка будет закрашивать всё на своем пути, пока не дойдет до края экрана, или вообще выдаст ошибку.' },
        { type: 'rich_code', code: 'from turtle import *\n\nt = Turtle()\nt.color("black")      # Цвет контура (обводки)\nt.fillcolor("yellow") # Цвет внутри (заливки)\n\n# Открываем "ведро"\nt.begin_fill()\n\n# Рисуем круг\nt.circle(50)\n\n# Закрываем "ведро"\nt.end_fill()\n\nturtle.exitonclick()' },
        { type: 'text', content: 'Обрати внимание: у контура и у заливки могут быть разные цвета! Контур задается через <code>t.color()</code>, а внутренность — через <code>t.fillcolor()</code>.' },
        
        {
          type: 'fill_blanks', title: 'Собери заливку квадрата',
          instruction: 'Заполни пропуски, чтобы закрасить квадрат зеленым цветом.',
          code: 't.fillcolor("green")\nt.[1]()\nfor i in range(4):\n    t.forward(100)\n    t.right(90)\nt.[2]()',
          answers: { '1': 'begin_fill', '2': 'end_fill' }
        }
      ]
    },

    // --- ЧАСТЬ 3: КОСТЮМЫ ---
    {
      title: '2. Смена костюма (shape)',
      blocks: [
        { type: 'text', content: 'Скучная стрелочка, которая летает по экрану, может превратиться в кого угодно. Для этого есть команда <code>shape()</code>.' },
        { type: 'rich_code', code: 't.shape("turtle") # Превращает стрелку в черепашку' },
        { 
          type: 'data_table', headers: ['Название костюма', 'Как выглядит'], 
          rows: [
            { col1: 'arrow', col2: 'Обычная стрелка (по умолчанию)' },
            { col1: 'turtle', col2: 'Зеленая черепашка' },
            { col1: 'circle', col2: 'Круг' },
            { col1: 'square', col2: 'Квадрат' },
            { col1: 'triangle', col2: 'Треугольник' }
          ]
        }
      ]
    },

    // --- ЧАСТЬ 4: ФУНКЦИИ ---
    {
      title: '3. Свои команды (Функции и отступы)',
      blocks: [
        { type: 'text', content: 'Представь, что нам нужно нарисовать 10 звезд в разных местах. Писать 50 строк кода с линиями — это долго и скучно. Мы можем создать свою собственную команду (функцию), которая будет рисовать звезду.' },
        { type: 'rich_code', code: 'from turtle import *\n\nt = Turtle()\n\n# Создаем свою команду\ndef draw_star():\n    t.fillcolor("yellow")\n    t.begin_fill()\n    for i in range(5):\n        t.forward(50)\n        t.right(144)\n    t.end_fill()\n\n# А теперь просто вызываем её:\ndraw_star()\n\nturtle.exitonclick()' },
        { type: 'callout', style: 'memo', title: '💡 Что такое отступы?', content: 'В Python очень важны отступы (пробелы слева). Все команды, которые относятся к функции <code>draw_star</code>, должны быть сдвинуты вправо на 4 пробела. Как только отступ заканчивается — функция завершается.' },
        
        {
          type: 'true_false', question: 'Внутри функции def все команды должны быть с отступом.', correct: true
        }
      ]
    }
  ],

  practice: {
    defaultTier: 1,
    tiers: [
      {
        level: 1, label: '⭐ Закрашенный квадрат',
        instruction: 'Нарисуй квадрат 100 на 100. Сделай контур черным ("black"), а заливку — красной ("red").',
        starterCode: 'from turtle import *\n\nt = Turtle()\nt.color("black")\n# Выбери цвет заливки\n\n# Открой заливку, нарисуй квадрат и закрой заливку\n\n\nturtle.exitonclick()',
        checks: [{ type: 'ast_static', rules: { required_calls: ['t.fillcolor', 't.begin_fill', 't.end_fill', 't.forward'] } }],
        hints: ['t.fillcolor("red")', 't.begin_fill()', 'Внутри цикла 4 раза: t.forward(100), t.right(90)', 't.end_fill()']
      },
      {
        level: 2, label: '⭐⭐ Черепаха-художник',
        instruction: 'Поменяй вид черепашки на "turtle". Создай закрашенный синий ("blue") круг радиусом 50.',
        starterCode: 'from turtle import *\n\nt = Turtle()\n# Смени костюм черепашки\n\n# Нарисуй закрашенный круг (не забудь begin_fill и end_fill)\n\n\nturtle.exitonclick()',
        checks: [{ type: 'ast_static', rules: { required_calls: ['t.shape', 't.fillcolor', 't.begin_fill', 't.circle'] } }],
        hints: ['t.shape("turtle")', 't.fillcolor("blue")', 't.begin_fill()', 't.circle(50)', 't.end_fill()']
      },
      {
        level: 3, label: '⭐⭐⭐ Функция Метеорит',
        instruction: 'Создай функцию `draw_meteor()`, которая рисует закрашенный серый ("gray") круг радиусом 30. Вызови эту функцию 2 раза.',
        starterCode: 'from turtle import *\n\nt = Turtle()\nt.fillcolor("gray")\n\n# Создай функцию draw_meteor()\ndef draw_meteor():\n    # Твой код\n\n# Вызови функцию 2 раза\n\n\nturtle.exitonclick()',
        checks: [{ type: 'ast_static', rules: { required_constructs: ['function_def'], required_calls: ['t.begin_fill', 't.end_fill'] } }],
        hints: ['Внутри функции: t.begin_fill(), t.circle(30), t.end_fill()', 'Внизу напиши draw_meteor() два раза']
      },
      {
        level: 4, label: '⭐⭐⭐⭐ Космическая станция',
        instruction: 'Создай функцию `draw_star()` (звезда: 5 раз forward(50) и right(144)). Сделай её заливку желтой ("yellow"). Вызови функцию, а затем нарисуй под ней закрашенный зеленый круг (радиус 100) — это планета.',
        starterCode: 'from turtle import *\n\nt = Turtle()\nt.hideturtle()\nt.speed(0)\n\n# 1. Создай функцию звезды (с заливкой)\ndef draw_star():\n    # Твой код\n    pass\n\n# 2. Вызови звезду, затем нарисуй планету ниже\n\n\nturtle.exitonclick()',
        checks: [{ type: 'ast_static', rules: { required_constructs: ['function_def', 'for_loop'], required_calls: ['t.begin_fill', 't.circle'] } }],
        hints: [
          'В функции звезды: t.fillcolor("yellow"), t.begin_fill(), for i in range(5): t.forward(50), t.right(144), t.end_fill()',
          'Вызови draw_star()',
          'Затем: t.penup(), t.goto(0, -150), t.pendown()',
          't.fillcolor("green"), t.begin_fill(), t.circle(100), t.end_fill()'
        ]
      }
    ]
  },

  summary: { reflection: 'Зачем нужны функции и как работает заливка (begin_fill / end_fill)?' },
  reward: { xp: 35, badge: 'Мастер заливки' }
};