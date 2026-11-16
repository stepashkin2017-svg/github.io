const COURSE_MAP = {
  levels: [
    {
      id: 1, title: 'Космическая станция', age: '10–12 лет',
      role: 'Юный инженер на космической станции',
      mission: 'Оживить станцию: говорить, решать, рисовать карты, строить пульт.',
      modules: [
        { id: '1.1', title: 'Системы станции', mode: 'browser', hook: 'Электронный бейдж космонавта',
          lessons: [
            { id: 'l1-m1-01', order: 1,  type: 'lesson',  title: 'print: первая программа' },
            { id: 'l1-m1-02', order: 2,  type: 'lesson',  title: 'Переменные, числа, f-строки' },
            { id: 'l1-m1-03', order: 3,  type: 'lesson',  title: 'input: станция задаёт вопросы' },
            { id: 'l1-m1-04', order: 4,  type: 'project', title: 'Проект: «Почини станцию»' }
          ]},
        { id: '1.2', title: 'Навигация', mode: 'browser', hook: 'Куда летим?',
          lessons: [
            { id: 'l1-m2-05', order: 5,  type: 'lesson',  title: 'if/else: можно ли лететь' },
            { id: 'l1-m2-06', order: 6,  type: 'lesson',  title: 'elif и and/or: оценка по баллам' },
            { id: 'l1-m2-07', order: 7,  type: 'lesson',  title: 'random: камень-ножницы-бумага' },
            { id: 'l1-m2-08', order: 8,  type: 'project', title: 'Проект: викторина' }
          ]},
        { id: '1.3', title: 'Топливные циклы', mode: 'browser', hook: 'Угадай код доступа',
          lessons: [
            { id: 'l1-m3-09', order: 9,  type: 'lesson',  title: 'while: пароль до взлома' },
            { id: 'l1-m3-10', order: 10, type: 'lesson',  title: 'for: таблица умножения для дрона' },
            { id: 'l1-m3-11', order: 11, type: 'lesson',  title: 'break: «ёлочка» из звёзд' },
            { id: 'l1-m3-12', order: 12, type: 'project', title: 'Проект: «Угадай число»' }
          ]},
        { id: '1.4', title: 'Грузовой отсек', mode: 'browser', hook: 'Заброшенная станция',
          lessons: [
            { id: 'l1-m4-13', order: 13, type: 'lesson',  title: 'Списки: инвентарь' },
            { id: 'l1-m4-14', order: 14, type: 'lesson',  title: 'Методы списков: собрать/выбросить' },
            { id: 'l1-m4-15', order: 15, type: 'lesson',  title: 'Словари: комнаты станции' },
            { id: 'l1-m4-16', order: 16, type: 'project', title: 'Проект: текстовый квест' }
          ]},
        { id: '1.5', title: 'Звёздные карты', mode: 'vscode', hook: 'Нарисуй созвездие',
          lessons: [
            { id: 'l1-m5-17', order: 17, type: 'lesson',  title: 'turtle: движение и повороты' },
            { id: 'l1-m5-18', order: 18, type: 'lesson',  title: 'Цвет и циклы' },
            { id: 'l1-m5-19', order: 19, type: 'lesson',  title: 'Спираль и вложенные циклы' },
            { id: 'l1-m5-20', order: 20, type: 'project', title: 'Проект: кликер «Поймай метеорит»' }
          ]},
        { id: '1.6', title: 'Пульт управления', mode: 'vscode', hook: 'Пульт станции',
          lessons: [
            { id: 'l1-m6-21', order: 21, type: 'lesson',  title: 'tkinter: первое окно' },
            { id: 'l1-m6-22', order: 22, type: 'lesson',  title: 'Виджеты: Label и Entry' },
            { id: 'l1-m6-23', order: 23, type: 'lesson',  title: 'События и кнопки' },
            { id: 'l1-m6-24', order: 24, type: 'project', title: 'Проект: кликер с «сбросом»' }
          ]}
      ]
    },
    {
      id: 2, title: 'Мастерская игр', age: '13–15 лет',
      role: 'Геймдизайнер в мастерской',
      mission: 'Собрать первую игру и приложение, сохранять рекорды.',
      modules: [
        { id: '2.1', title: 'Заклинания (функции)', mode: 'browser', hook: 'Калькулятор урона',
          lessons: [
            { id: 'l2-m1-01', order: 1,  type: 'lesson',  title: 'def: приветствие-функция' },
            { id: 'l2-m1-02', order: 2,  type: 'lesson',  title: 'Параметры: заклинание с силой' },
            { id: 'l2-m1-03', order: 3,  type: 'lesson',  title: 'return и область видимости' },
            { id: 'l2-m1-04', order: 4,  type: 'project', title: 'Проект: калькулятор урона' }
          ]},
        { id: '2.2', title: 'Магическая библиотека (stdlib)', mode: 'browser', hook: 'Генератор паролей',
          lessons: [
            { id: 'l2-m2-05', order: 5,  type: 'lesson',  title: 'random: брось кубик' },
            { id: 'l2-m2-06', order: 6,  type: 'lesson',  title: 'math: площадь круга' },
            { id: 'l2-m2-07', order: 7,  type: 'lesson',  title: 'datetime: дни до дня рождения' },
            { id: 'l2-m2-08', order: 8,  type: 'project', title: 'Проект: генератор паролей' }
          ]},
        { id: '2.3', title: 'Свитки сохранений', mode: 'browser', hook: 'Таблица рекордов',
          lessons: [
            { id: 'l2-m3-09', order: 9,  type: 'lesson',  title: 'Строки: методы и срезы' },
            { id: 'l2-m3-10', order: 10, type: 'lesson',  title: 'Словари: страна → столица' },
            { id: 'l2-m3-11', order: 11, type: 'lesson',  title: 'Файлы: сохранение рекордов' },
            { id: 'l2-m3-12', order: 12, type: 'project', title: 'Проект: игра с рекордом' }
          ]},
        { id: '2.4', title: 'Герои (ООП)', mode: 'browser', hook: 'Питомец-дракон',
          lessons: [
            { id: 'l2-m4-13', order: 13, type: 'lesson',  title: 'Класс и объект: Hero' },
            { id: 'l2-m4-14', order: 14, type: 'lesson',  title: 'Методы: take_damage' },
            { id: 'l2-m4-15', order: 15, type: 'lesson',  title: 'Бой двух героев' },
            { id: 'l2-m4-16', order: 16, type: 'project', title: 'Проект: питомец-дракон' }
          ]},
        { id: '2.5', title: 'Аркада (pygame)', mode: 'vscode', hook: 'Поймай квадрат',
          lessons: [
            { id: 'l2-m5-17', order: 17, type: 'lesson',  title: 'pygame: окно и игровой цикл' },
            { id: 'l2-m5-18', order: 18, type: 'lesson',  title: 'Движение: спрайт идёт' },
            { id: 'l2-m5-19', order: 19, type: 'lesson',  title: 'Управление: клавиши' },
            { id: 'l2-m5-20', order: 20, type: 'project', title: 'Проект: Поймай квадрат' }
          ]},
        { id: '2.6', title: 'Интерфейс игры (tkinter)', mode: 'vscode', hook: 'Список дел гильдии',
          lessons: [
            { id: 'l2-m6-21', order: 21, type: 'lesson',  title: 'Виджеты и менеджеры' },
            { id: 'l2-m6-22', order: 22, type: 'lesson',  title: 'grid: сетка элементов' },
            { id: 'l2-m6-23', order: 23, type: 'lesson',  title: 'События и валидация' },
            { id: 'l2-m6-24', order: 24, type: 'project', title: 'Проект: список дел гильдии' }
          ]}
      ]
    },
    {
      id: 3, title: 'Студия', age: '16–18 лет',
      role: 'Разработчик в студии',
      mission: 'Выпустить продукт: игра с сохранениями, desktop-приложение с БД, .exe, защита.',
      modules: [
        { id: '3.1', title: 'Иерархия персонажей', mode: 'browser', hook: 'Система классов для RPG',
          lessons: [
            { id: 'l3-m1-01', order: 1,  type: 'lesson',  title: 'Наследование: Warrior' },
            { id: 'l3-m1-02', order: 2,  type: 'lesson',  title: 'super(): расширяем Character' },
            { id: 'l3-m1-03', order: 3,  type: 'lesson',  title: 'Полиморфизм и список персонажей' },
            { id: 'l3-m1-04', order: 4,  type: 'project', title: 'Проект: система классов RPG' }
          ]},
        { id: '3.2', title: 'Продвинутая аркада', mode: 'vscode', hook: 'Platformer',
          lessons: [
            { id: 'l3-m2-05', order: 5,  type: 'lesson',  title: 'Спрайты и группы' },
            { id: 'l3-m2-06', order: 6,  type: 'lesson',  title: 'Коллизии' },
            { id: 'l3-m2-07', order: 7,  type: 'lesson',  title: 'Анимация и звук' },
            { id: 'l3-m2-08', order: 8,  type: 'project', title: 'Проект: мини-игра' }
          ]},
        { id: '3.3', title: 'Данные (JSON, SQLite)', mode: 'browser', hook: 'База книг',
          lessons: [
            { id: 'l3-m3-09', order: 9,  type: 'lesson',  title: 'JSON: настройки игры' },
            { id: 'l3-m3-10', order: 10, type: 'lesson',  title: 'SQLite: таблица и SELECT' },
            { id: 'l3-m3-11', order: 11, type: 'lesson',  title: 'WHERE и UPDATE' },
            { id: 'l3-m3-12', order: 12, type: 'project', title: 'Проект: игра с сохранением' }
          ]},
        { id: '3.4', title: 'Desktop (PyQt)', mode: 'vscode', hook: 'Учёт расходов',
          lessons: [
            { id: 'l3-m4-13', order: 13, type: 'lesson',  title: 'PyQt: главное окно' },
            { id: 'l3-m4-14', order: 14, type: 'lesson',  title: 'Таблица QTableWidget' },
            { id: 'l3-m4-15', order: 15, type: 'lesson',  title: 'Валидация и события' },
            { id: 'l3-m4-16', order: 16, type: 'project', title: 'Проект: учёт расходов' }
          ]},
        { id: '3.5', title: 'Внешний мир', mode: 'vscode', hook: 'Погодное приложение',
          lessons: [
            { id: 'l3-m5-17', order: 17, type: 'lesson',  title: 'requests: погодный API' },
            { id: 'l3-m5-18', order: 18, type: 'lesson',  title: 'matplotlib: график' },
            { id: 'l3-m5-19', order: 19, type: 'lesson',  title: 'pyinstaller: собираем .exe' },
            { id: 'l3-m5-20', order: 20, type: 'project', title: 'Проект: погодное приложение' }
          ]},
        { id: '3.6', title: 'Итоговый проект', mode: 'vscode', hook: 'Свой продукт',
          lessons: [
            { id: 'l3-m6-21', order: 21, type: 'lesson',  title: 'План проекта' },
            { id: 'l3-m6-22', order: 22, type: 'lesson',  title: 'Каркас и структура' },
            { id: 'l3-m6-23', order: 23, type: 'lesson',  title: 'Ядро приложения' },
            { id: 'l3-m6-24', order: 24, type: 'project', title: 'Защита и портфолио' }
          ]}
      ]
    }
  ]
};