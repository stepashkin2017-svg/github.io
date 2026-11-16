window.LESSON_DATA = window.LESSON_DATA || {};

window.LESSON_DATA['l1-m5-19'] = {
  id: 'l1-m5-19', level: 1, module: '1.5', order: 3,
  type: 'lesson', mode: 'vscode',
  title: 'turtle: while, random, звёзды и клики',
  
  hook: {
    text: 'У нас есть планеты и метеориты, но им нужен фон! Давай создадим звёздное небо с помощью цикла while. А ещё научим черепашку реагировать на клики мыши — это понадобится нам для будущей игры!',
  },

  theory: [
    // --- ЧАСТЬ 1: ШПАРГАЛКА ---
    {
      title: '📖 Шпаргалка: новые инструменты',
      blocks: [
        { type: 'text', content: 'Сегодня мы выучим три команды, которые сделают наши программы умными, непредсказуемыми и интерактивными.' },
        { 
          type: 'data_table', headers: ['Команда', 'Что делает'], 
          rows: [
            { col1: 'import random', col2: 'Подключает генератор случайных чисел' },
            { col1: 'random.randint(-200, 200)', col2: 'Выбирает случайное число от -200 до 200' },
            { col1: 't.goto(x, y)', col2: 'Телепортирует черепашку в точку с координатами X и Y' },
            { col1: 't.dot(10, "white")', col2: 'Ставит точку (звезду) размером 10 и цветом white' },
            { col1: 'while count < 10:', col2: 'Цикл "Пока условие верно" (повторяет, пока count меньше 10)' },
            { col1: 'onscreenclick(click)', col2: 'Ловит клики мыши по экрану' }
          ]
        }
      ]
    },

    // --- ЧАСТЬ 2: ЦИКЛ WHILE ---
    {
      title: '1. В чём разница между for и while?',
      blocks: [
        { type: 'text', content: 'Раньше мы использовали цикл <code>for</code>, когда <b>точно знали</b>, сколько раз нужно повторить (например, 4 стороны квадрата).' },
        { type: 'text', content: 'Цикл <code>while</code> (пока) работает иначе. Он повторяет команды до тех пор, <b>пока условие остается верным (True)</b>. Как только условие станет ложным (False), цикл остановится.' },
        { type: 'rich_code', code: 'from turtle import *\n\nt = Turtle()\ncount = 0\n\nwhile count < 5:  # Пока count меньше 5\n    t.forward(50)\n    t.right(72)\n    count = count + 1  # ОЧЕНЬ ВАЖНО: увеличиваем счетчик\n\nturtle.exitonclick()' },
        { type: 'callout', style: 'danger', title: '⚠️ Осторожно: Бесконечный цикл!', content: 'Если внутри цикла while не менять переменную (в нашем случае не писать <code>count = count + 1</code>), условие <code>0 < 5</code> всегда будет верным, и программа зависнет навсегда!' },
        
        {
          type: 'fill_blanks', title: 'Настрой цикл while',
          instruction: 'Заполни пропуски, чтобы цикл повторился 10 раз и не завис.',
          code: 'count = 0\nwhile count [1] 10:\n    print("Звезда")\n    count = count [2] 1',
          answers: { '1': '<', '2': '+' }
        }
      ]
    },

    // --- ЧАСТЬ 3: СЛУЧАЙНОСТИ И КООРДИНАТЫ ---
    {
      title: '2. Космический хаос (random и goto)',
      blocks: [
        { type: 'text', content: 'Чтобы звезды не выстроились в одну линию, нам нужны случайные координаты. За это отвечает библиотека <code>random</code>.' },
        { type: 'text', content: 'Экран черепашки имеет координаты от -300 до 300 по X и по Y. Команда <code>random.randint(-300, 300)</code> выберет случайное число в этом диапазоне.' },
        { type: 'rich_code', code: 'from turtle import *\nimport random\n\nt = Turtle()\nt.penup() # Поднимаем перо\n\n# Телепортируемся в случайную точку\nx = random.randint(-200, 200)\ny = random.randint(-200, 200)\nt.goto(x, y)\nt.dot(10, "white")\n\nturtle.exitonclick()' },
        { type: 'callout', style: 'memo', title: '💡 Зачем нужен penup()?', content: 'Если мы используем <code>goto()</code>, черепашка прочертит линию от своего текущего положения до новой точки. Чтобы нарисовать отдельные звезды, мы обязательно поднимаем перо.' }
      ]
    },

    // --- ЧАСТЬ 4: ИНТЕРАКТИВНОСТЬ (КЛИКИ) ---
    {
      title: '3. Как поймать клик мыши? (onscreenclick)',
      blocks: [
        { type: 'text', content: 'Как сделать игру, если черепашка не знает, куда кликнул игрок? Нам нужно научить программу «слышать» мышку. Для этого есть команда <code>onscreenclick()</code>.' },
        { type: 'character_says', text: 'Эта команда ждет, пока ты кликнешь по экрану. В момент клика она автоматически передает координаты (X и Y) того места, куда пришелся клик!' },
        { type: 'rich_code', code: 'from turtle import *\n\nt = Turtle()\n\ndef click(x, y):\n    print("Ты кликнул в точку:", x, y)\n    t.goto(x, y) # Телепортируем черепашку в место клика\n    t.dot(20, "red")\n\n# Включаем прослушивание кликов\nturtle.onscreenclick(click)\n\nturtle.exitonclick()' },
        { type: 'callout', style: 'memo', title: '💡 Как это работает?', content: '1. Мы создаем функцию <code>click(x, y)</code>. Она обязательно должна принимать два числа (координаты).<br>2. Команда <code>onscreenclick(click)</code> говорит черепашке: «Слушай мышку и, если кликнут, запусти функцию click».' },
        
        { type: 'true_false', question: 'В функцию click(x, y) автоматически попадают координаты того места, куда кликнул пользователь.', correct: true }
      ]
    },

    // --- ЧАСТЬ 5: РАЗБОР ЗАДАЧИ ---
    {
      title: '4. Разбор: Звездный генератор',
      blocks: [
        { type: 'text', content: 'Давай объединим while и random, чтобы нарисовать 20 звезд.' },
        {
          type: 'task_analysis',
          steps: [
            { title: 'Шаг 1. Счетчик', text: 'Создаем переменную count и ставим её на 0.', code: 'count = 0' },
            { title: 'Шаг 2. Цикл', text: 'Запускаем цикл, пока count меньше 20.', code: 'while count < 20:' },
            { title: 'Шаг 3. Координаты', text: 'Получаем случайные X и Y.', code: 'x = random.randint(-300, 300)\ny = random.randint(-300, 300)' },
            { title: 'Шаг 4. Рисование', text: 'Перемещаемся и ставим точку.', code: 't.goto(x, y)\nt.dot(5, "white")' },
            { title: 'Шаг 5. Счетчик+1', text: 'Не забываем увеличить count, чтобы цикл закончился.', code: 'count = count + 1' }
          ]
        }
      ]
    }
  ],

  practice: {
    defaultTier: 1,
    tiers: [
      {
        level: 1, label: '⭐ Планеты',
        instruction: 'Нарисуй 10 синих планет (`t.dot(15, "blue")`). Используй цикл `while count < 10`.',
        starterCode: 'from turtle import *\n\nt = Turtle()\nt.hideturtle()\nt.penup()\nturtle.bgcolor("black")\n\ncount = 0\nwhile count < 10:\n    t.dot(15, "blue")\n    count = count + 1\n\nturtle.exitonclick()',
        checks: [{ type: 'ast_static', rules: { required_calls: ['t.dot'], required_constructs: ['while_loop'] } }],
        hints: ['Внутри цикла просто напиши t.dot(15, "blue")']
      },
      {
        level: 2, label: '⭐⭐ Случайные звезды',
        instruction: 'Сделай 30 белых звезд. Внутри цикла while получай случайные координаты x и y и используй `t.goto(x, y)` перед точкой.',
        starterCode: 'from turtle import *\nimport random\n\nt = Turtle()\nt.hideturtle()\nt.penup()\nt.speed(0)\nturtle.bgcolor("black")\n\ncount = 0\nwhile count < 30:\n    # 1. Получи случайные x и y\n    # 2. Переместись туда\n    # 3. Поставь точку\n    count = count + 1\n\nturtle.exitonclick()',
        checks: [{ type: 'ast_static', rules: { required_calls: ['t.dot', 'random.randint', 't.goto'], required_constructs: ['while_loop'] } }],
        hints: ['x = random.randint(-300, 300)', 'y = random.randint(-300, 300)', 't.goto(x, y)', 't.dot(5, "white")']
      },
      {
        level: 3, label: '⭐⭐⭐ Клик-художник',
        instruction: 'Создай функцию click(x, y). Внутри неё перемещай черепашку в место клика (t.goto) и ставь там красную точку (t.dot(20, "red")). Включи onscreenclick.',
        starterCode: 'from turtle import *\n\nt = Turtle()\nt.hideturtle()\nturtle.bgcolor("black")\n\ndef click(x, y):\n    # Твой код: переместись в x, y и поставь точку\n    pass\n\n# Включи прослушивание кликов\n\n\nturtle.exitonclick()',
        checks: [{ type: 'ast_static', rules: { required_calls: ['onscreenclick', 't.goto', 't.dot'], required_constructs: ['function_def'] } }],
        hints: ['t.goto(x, y)', 't.dot(20, "red")', 'onscreenclick(click)']
      },
      {
        level: 4, label: '⭐⭐⭐⭐ Галактика',
        instruction: 'Нарисуй 50 звезд разного размера (`size = random.randint(2, 8)`). А затем добавь функцию клика, которая ставит желтую звезду в место клика.',
        starterCode: 'from turtle import *\nimport random\n\nt = Turtle()\nt.hideturtle()\nt.penup()\nt.speed(0)\nturtle.bgcolor("black")\n\n# 1. Нарисуй 50 звезд\ncount = 0\nwhile count < 50:\n    # Твой код\n    count = count + 1\n\n# 2. Настрой клик\ndef click(x, y):\n    # Твой код\n    pass\n\nturtle.onscreenclick(click)\nturtle.exitonclick()',
        checks: [{ type: 'ast_static', rules: { required_calls: ['t.dot', 'random.randint', 'onscreenclick'], required_constructs: ['while_loop', 'function_def'] } }],
        hints: ['Для звезд: size = random.randint(2, 8), t.dot(size, "white")', 'Для клика: t.goto(x, y), t.dot(15, "yellow")']
      }
    ]
  },

  summary: { reflection: 'Почему в цикле while обязательно нужно менять переменную-счетчик?' },
  reward: { xp: 35, badge: 'Создатель галактик' }
};