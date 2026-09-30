# Портфолио бэкенд-разработчика

Статический сайт-портфолио в стиле терминала: тёмная тема, моноширинный шрифт, навигация через командную строку.

Чистый HTML/CSS/JS — без фреймворков и библиотек. В продакшн собирается webpack-бандлом с обфускацией.

## Структура

```
portfolio/
├── index.html              — разметка + подключение
├── css/
│   ├── base.css            — переменные темы, reset, скроллбар
│   ├── terminal.css        — терминал, ввод, строки, подсказки
│   ├── cards.css           — карточки, проекты, стек, help, контакты
│   ├── dock.css            — док-навигация
│   └── responsive.css      — брейкпоинты, reduced-motion
├── js/
│   ├── main.js             — точка входа (ES-модуль)
│   ├── terminal.js         — ядро: ввод, история, автодополнение, вывод
│   ├── typewriter.js       — эффект печатающегося текста
│   ├── commands.js         — реестр команд
│   ├── sections.js         — секции: about, projects, cat, stack, experience, contact, help
│   ├── eggs.js             — скрытые команды (sudo, coffee, ...)
│   ├── data.js             — профиль, стек, опыт
│   └── projects.js         — данные проектов
├── scripts/build.js        — сборка dist/
├── webpack.config.js       — бандл + обфускация
└── assets/
    ├── favicon.svg
    └── og-image.png
```

## Команды

| Команда | Описание |
| --- | --- |
| `whoami` | краткая визитка |
| `about` (`a`) | обо мне |
| `projects` (`p`, `ls`) | список проектов |
| `cat <id>/README.md` | детали проекта |
| `stack` (`s`) | технологии |
| `experience` (`exp`) | опыт работы |
| `contact` (`c`) | контакты |
| `help` (`h`) | список команд |
| `clear` (`cls`) | очистить экран |

Есть и скрытые команды — попробуйте `sudo`, `rm -rf /`, `coffee`.

## Запуск локально

ES-модули не работают по `file://`, поэтому:

- `npm run serve` — локальный сервер для исходников
- или `npm run build` и открыть `dist/index.html` (бандл работает без сервера)

## Сборка

```
npm install
npm run build
```

В `dist/` попадает: обфусцированный `js/bundle.js`, склеенный `css/style.css`, `index.html`, `assets/`, `CNAME`.

## Перед публикацией

- Замените плейсхолдеры `[Имя Фамилия]` в `index.html` и `js/data.js`
- Заполните контакты в `js/data.js` (`Profile.contacts`)
- Замените 6 плейсхолдеров в `js/projects.js` на реальные проекты
- Укажите свой домен в `CNAME` и имя в `assets/og-image.png`

## Деплой

Содержимое `dist/` на GitHub Pages / Cloudflare Pages / Netlify.
