window.LESSON_DATA = window.LESSON_DATA || {};

window.LESSON_DATA['l1-m5-17'] = {
  id: 'l1-m5-17', level: 1, module: '1.5', order: 1,
  type: 'lesson', mode: 'vscode',
  title: 'turtle: анатомия робота и первые планеты',
  
  hook: {
    text: 'Станция спасена, но нам нужно нарисовать новую карту звёздного неба! Робик нашел старую библиотеку  Давай не просто порисуем, а разберемся, как она устроена изнутри, и создадим первую планету.',
  },

  theory: [
    // --- ЧАСТЬ 1: АНАТОМИЯ ---
    {
      title: '1. Кто живет в коде? (Анатомия программы)',
      blocks: [
        { type: 'text', content: 'Любая программа на Turtle начинается с двух магических строк. Давай разберем их по косточкам.' },
        { type: 'rich_code', code: 'from turtle import *\n\nt = Turtle()' },
        { type: 'def_card', term: 'from turtle import *', definition: 'Команда import (импорт) открывает «ящик с инструментами». В этом ящике лежат все команды для рисования. Без этой строки Python не поймет, что такое ', example: 'from turtle import *' },
        { type: 'def_card', term: 't = Turtle()', definition: 'Здесь мы создаем саму черепашку. <code>Turtle()</code> — это как вызвать робота с завода. А <code>t =</code> означает, что мы даем этому роботу имя «t» (сокращение от turtle). Теперь все команды мы будем писать через <code>t.</code>', example: 't = Turtle()' },
        { type: 'callout', style: 'memo', title: '💡 Почему t?', content: 'Мы можем назвать её как угодно: <code>robot = Turtle()</code> или <code>artist = Turtle()</code>. Но программисты любят короткие имена, поэтому чаще всего используют <code>t</code>.' },
        {
          type: 'fill_blanks', title: 'Создай робота',
          instruction: 'Заполни пропуски, чтобы создать черепашку по имени "t".',
          code: 'from turtle import *\n[1] = [2]()',
          answers: { '1': 't', '2': 'Turtle' }
        }
      ]
    },

    // --- ЧАСТЬ 2: КООРДИНАТЫ ---
    {
      title: '2. Где стоит черепашка? (Система координат)',
      blocks: [
        { type: 'text', content: 'Прежде чем давать команды, нужно понять, где находится наш робот. Экран черепашки — это математическая сетка (как в игре «Морской бой»).' },
        { type: 'text', content: 'В самом центре экрана находится точка <b>(0, 0)</b>. Здесь черепашка появляется по умолчанию. Она всегда смотрит <b>вправо</b> (на восток).' },
        { 
          type: 'data_table', headers: ['Направление', 'Куда смотрит', 'Как двигаться'], 
          rows: [
            { col1: 'Вправо (Восток)', col2: 'Вдоль оси X', col2_code: true, col1_code: 't.forward(100)' },
            { col1: 'Вверх (Север)', col2: 'Против оси Y', col2_code: true, col1_code: 't.left(90)\nt.forward(100)' },
            { col1: 'Влево (Запад)', col2: 'Против оси X', col2_code: true, col1_code: 't.left(180)\nt.forward(100)' }
          ]
        },
        { type: 'callout', style: 'warn', title: '⚠️ Разворот', content: 'Если черепашка смотрит вправо, а нам нужно нарисовать линию вверх, мы сначала должны её повернуть: <code>t.left(90)</code> (налево на 90 градусов).' },
        
        {
          type: 'true_false', question: 'По умолчанию черепашка появляется в центре экрана и смотрит вправо.', correct: true
        }
      ]
    },

    // --- ЧАСТЬ 3: ЛИНИИ И КРУГИ ---
    {
      title: '3. Как рисовать линии и планеты',
      blocks: [
        { type: 'text', content: 'У черепашки в лапках ручка. Когда она двигается, ручка оставляет след. Основные команды движения:' },
        { type: 'rich_code', code: 't.forward(100)  # Идти вперед (по направлению взгляда)\nt.backward(50)  # Идти назад (не разворачиваясь)\nt.right(90)     # Повернуть направо (по часовой стрелке)\nt.left(45)      # Повернуть налево (против часовой)' },
        
        { type: 'text', content: 'Но планеты круглые. Для этого есть команда <code>circle()</code>. Она рисует круг, но есть секрет: черепашка начинает рисовать с <b>нижней</b> точки круга и идет против часовой стрелки.' },
        { type: 'rich_code', code: 't.circle(100) # Нарисует круг радиусом 100' },
        { type: 'callout', style: 'memo', title: '📐 Радиус', content: 'Число в скобках <code>circle(50)</code> — это радиус. Если хочешь круг побольше, увеличь число.' },
        
        { 
          type: 'task_analysis',
          steps: [
            { title: 'Задача: Нарисовать комету', text: 'Комета — это прямая линия (хвост) и круг (голова).', code: 't.forward(100)\nt.right(90)\nt.circle(30)' },
            { title: 'Шаг 1', text: 'Черепашка рисует хвост вперед.', code: 't.forward(100)' },
            { title: 'Шаг 2', text: 'Поворачивает вниз, чтобы голова была на конце.', code: 't.right(90)' },
            { title: 'Шаг 3', text: 'Рисует круглую голову.', code: 't.circle(30)' }
          ]
        }
      ]
    },

    // --- ЧАСТЬ 4: КРАСОТА ---
    {
      title: '4. Делаем космос красивым',
      blocks: [
        { type: 'text', content: 'Чтобы наш рисунок выглядел как космос, нужно поработать над окном.' },
        { type: 'def_card', term: 'bgcolor("black")', definition: 'Красит фон окна. Цвета пишем по-английски в кавычках: "black", "navy", "darkblue".', example: 'bgcolor("black")' },
        { type: 'def_card', term: 't.color("yellow")', definition: 'Меняет цвет самой ручки (линии).', example: 't.color("yellow")' },
        { type: 'def_card', term: 't.hideturtle()', definition: 'Прячет саму стрелочку (черепашку). Остается только красивый рисунок.', example: 't.hideturtle()' },
        { type: 'def_card', term: 'exitonclick()', definition: 'Ждет, пока ты кликнешь по окну, и только потом закрывает его. Это удобнее, чем старая команда done().', example: 'exitonclick()' },
        
        {
          type: 'true_false', question: 'Команда hideturtle() полностью удаляет черепашку и все, что она нарисовала.', correct: false
        }
      ]
    }
  ],

  practice: {
    defaultTier: 1,
    tiers: [
      {
        level: 1, label: '⭐ Луна',
        instruction: 'Нарисуй белую Луну (круг радиусом 80) на черном фоне. Спрячь черепашку и используй exitonclick.',
        starterCode: 'from turtle import *\n\nt = Turtle()\n# 1. Сделай фон черным ("black")\n\n# 2. Сделай цвет черепашки белым ("white")\n\n# 3. Нарисуй круг радиусом 80\n\n# 4. Спрячь черепашку и включи exitonclick\n\n',
        checks: [{ type: 'ast_static', rules: { required_calls: ['t.circle', 't.hideturtle', 'exitonclick', 'bgcolor'] } }],
        hints: [
          'bgcolor("black")',
          't.color("white")',
          't.circle(80)',
          't.hideturtle()',
          'exitonclick()'
        ]
      },
      {
        level: 2, label: '⭐⭐ Орбиты',
        instruction: 'Нарисуй 3 круга из одной точки (орбиты). Радиусы: 30, 60 и 90. Цвет — "cyan". Используй три команды circle.',
        starterCode: 'from turtle import *\n\nt = Turtle()\nturtle.bgcolor("black")\nt.color("cyan")\n\n# Твой код (три команды circle)\n\n\nt.hideturtle()\nturtle.exitonclick()',
        checks: [{ type: 'ast_static', rules: { required_calls: ['t.circle'] } }],
        hints: ['Вызови t.circle(30), затем t.circle(60), затем t.circle(90) подряд']
      },
      {
        level: 3, label: '⭐⭐⭐ Комета',
        instruction: 'Нарисуй комету. Сначала линия вперед на 100, затем поворот направо на 90, и в конце круг радиусом 20. Цвет — "yellow".',
        starterCode: 'from turtle import *\n\nt = Turtle()\nturtle.bgcolor("darkblue")\nt.color("yellow")\n\n# Твой код кометы (линия, поворот, круг)\n\n\nt.hideturtle()\nturtle.exitonclick()',
        checks: [{ type: 'ast_static', rules: { required_calls: ['t.forward', 't.right', 't.circle'] } }],
        hints: ['t.forward(100)', 't.right(90)', 't.circle(20)']
      },
      {
        level: 4, label: '⭐⭐⭐⭐ Солнечная система',
        instruction: 'Нарисуй Солнце (круг 50, желтый). Затем подними ручку (penup), переместись вперед (forward 120), опусти ручку (pendown) и нарисуй планету (круг 20, голубой).',
        starterCode: 'from turtle import *e\n\nt = Turtle()\nturtle.bgcolor("black")\n\n# 1. Солнце\nt.color("yellow")\n# Твой код\n\n# 2. Перемещение (без линии)\nt.penup()\nt.forward(120)\nt.pendown()\n\n# 3. Планета\nt.color("lightblue")\n# Твой код\n\nt.hideturtle()\nturtle.exitonclick()',
        checks: [{ type: 'ast_static', rules: { required_calls: ['t.penup', 't.pendown', 't.forward', 't.circle'] } }],
        hints: [
          'Для Солнца: t.circle(50)',
          'Для планеты: t.circle(20)'
        ]
      }
    ]
  },

  summary: { reflection: 'Почему черепашка не рисует линию, когда мы используем penup()?' },
  reward: { xp: 30, badge: 'Астроном' }
};