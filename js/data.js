const Profile = {
  name: "Алексей Яковлев",
  role: "Backend Developer",
  tagline: "Строю «моторный отсек» веб-сервисов: быстро, надёжно и так, чтобы команде было легко работать. Fullstack — по вызову.",
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
    { label: "Email", display: "melarn4u@gmail.com", url: "mailto:melarn4u@gmail.com" },
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
    company: "Company Name 1",
    role: "Senior Backend Developer",
    period: "2023 — наст.",
    summary: "Руковожу архитектурой основного сервиса, ускоряю релизы и развиваю команду.",
    plainBullets: [
      "Вывел ключевой сервис с «монolith» на независимые части — команды перестали мешать друг другу",
      "Релизы стали в 6 раз быстрее: 10 минут вместо часа",
      "Наставляю 3 junior-разработчиков, веду код-ревью",
    ],
    bullets: [
      "Спроектировал микросервисную архитектуру",
      "Настроил CI/CD, снизил время деплоя на 70%",
      "Проводил код-ревью, менторил junior",
    ],
    stack: "PHP, Laravel, PostgreSQL, Docker, K8s",
  },
  {
    company: "Company Name 2",
    role: "Backend Developer",
    period: "2021 — 2023",
    summary: "Разрабатывал API, на котором держится основной продукт, и делал его быстрым и надёжным.",
    plainBullets: [
      "API выдержал рост трафика в 10 раз без переписывания",
      "Ввёл автотесты: число сбоев в проде сократилось вдвое",
      "Ускорил самые медленные запросы на 40%",
    ],
    bullets: [
      "Разработал REST API для 50K+ RPS",
      "Внедрил автотесты, покрытие 80%+",
      "Оптимизировал запросы к БД, -40% latency",
    ],
    stack: "PHP, Symfony, MySQL, Redis, RabbitMQ",
  },
  {
    company: "Company Name 3",
    role: "Junior Backend Developer",
    period: "2019 — 2021",
    summary: "Поддерживал и развивал внутренние сервисы, переехал с монолита на современный стек.",
    plainBullets: [
      "Поддерживал сервисы, которыми пользуются все сотрудники",
      "Участвовал в миграции с монолита на Laravel",
      "Перевёл ключевые сценарии на автотесты",
    ],
    bullets: ["Поддержка и развитие legacy-систем", "Миграция с монолита на Laravel"],
    stack: "PHP, Laravel, MySQL, jQuery",
  },
];

export { Profile, Stack, PlainSkills, Experience };
