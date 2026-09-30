const Profile = {
    name: "Алексей Яковлев",
    role: "Backend Developer",
    tagline: "Строю «моторный отсек» веб-сервисов: быстро, надёжно и так, чтобы команде было легко работать. Fullstack — по ситуации. Чиню то, что «и так сойдёт», пока оно не стало «вообще не работает».",
    spec: "PHP / Laravel / API / PostgreSQL",
    location: "Россия, удалённо",
    years: "5+",
    current: "[краткое описание текущего проекта/роли]",
    openToOffers: true,
    about: [
        "Пишу бэкенд 5+ лет: от небольших проектов до высоконагруженных сервисов, которые живут 24/7.",
        "Ценю код, который легко читать, тестировать и объяснять. Люблю чистую архитектуру и документацию, которую не стыдно показать.",
        "Работаю в команде: веду код-ревью, менторю junior-разработчиков и не боюсь разговора с заказчиком.",
    ],
    softSkills: [
        "Код-ревью и менторство",
        "Документация и понятные описания",
        "Коммуникация между командами",
        "Работа с требованиями и оценка задач",
    ],
    contacts: [
        {label: "Email", display: "melarn4u@gmail.com", url: "mailto:melarn4u@gmail.com"},
        {
            label: "GitHub",
            display: "github.com/Yakovlev-Melarn",
            url: "https://github.com/Yakovlev-Melarn",
        },
        {
            label: "MAX",
            display: "написать",
            url: "https://max.ru/u/f9LHodD0cOIf66THihNKfyjj5YcGpWTGEcb1CS52kbDkh5sfsXsoB-83Gl4",
        },
    ],
};

const Stack = {
    languages: ["PHP 8.2", "Go 1.21", "Python 3.12", "SQL"],
    frameworks: ["Laravel 11", "Symfony 7", "Gin (Go)", "FastAPI"],
    databases: ["PostgreSQL", "MySQL", "Redis", "MongoDB"],
    tools: ["Docker", "Git", "GitHub Actions", "Nginx", "PHPUnit", "Composer", "Make"],
    architecture: [
        "REST API",
        "Микросервисы",
        "Очереди (RabbitMQ, Redis Queue)",
        "CI/CD",
    ],
};

const PlainSkills = {
    languages: ["PHP", "Go", "Python", "SQL"],
    "Фреймворки и библиотеки": ["Laravel", "Symfony", "Gin", "FastAPI"],
    databases: ["PostgreSQL", "MySQL", "Redis", "MongoDB"],
    tools: ["Docker", "Git", "GitHub Actions", "Nginx", "PHPUnit", "Composer"],
};

const Experience = [
    {
        company: "ООО «РИДИКОН»",
        role: "Full-stack Developer",
        period: "2023 — 2026.",
        summary: "Отвечал за архитектуру основного сервиса, скорость релизов и развитие команды.",
        plainBullets: [
            "Разделил ключевой монолит на независимые сервисы — команды перестали блокировать друг друга",
            "Релизы стали в 6 раз быстрее",
            "Менторил трёх junior-разработчиков, проводил код-ревью",
        ],
        bullets: [
            "Спроектировал микросервисную архитектуру",
            "Настроил CI/CD, снизил время деплоя на 70%",
            "Проводил код-ревью, менторил junior",
        ],
        stack: "PHP, Laravel, PostgreSQL, Docker, K8s",
    },
    {
        company: "ООО «МЕЛАРН»",
        role: "Backend Developer",
        period: "2019 — 2023",
        summary: "Разработал и поддерживал API — ядро основного продукта компании. Отвечал за скорость, надёжность и устойчивость под нагрузкой.",
        plainBullets: [
            "API выдержал рост трафика в 10 раз — без переписывания архитектуры",
            "Внедрил автотесты: сбои в проде сократились вдвое",
            "Ускорил самые медленные запросы на 40% — пользователи заметили",
        ],
        bullets: [
            "Разработал REST API для 50K+ RPS",
            "Внедрил автотесты, покрытие 80%+",
            "Оптимизировал запросы к БД, -40% latency",
        ],
        stack: "PHP, Symfony, MySQL, Redis, RabbitMQ",
    },
    {
        company: "ООО «ПрофМастер»",
        role: "Backend Developer",
        period: "2014 — 2019",
        summary: "Развитие и поддержка внутренних сервисов компании. Полная миграция с легаси-монолита на Laravel",
        plainBullets: [
            "Поддерживал сервисы, от которых зависит ежедневная работа всех сотрудников компании",
            "Участвовал в миграции с монолита на Laravel — архитектура, перенос логики, постепенный запуск",
            "Внедрил автотесты на ключевые сценарии — баги в проде стали ловиться до релиза",
        ],
        bullets: ["Поддержка и развитие legacy-систем", "Миграция с монолита на Laravel"],
        stack: "PHP, Laravel, MySQL, jQuery",
    },
];

export {Profile, Stack, PlainSkills, Experience};
