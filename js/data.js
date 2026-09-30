const Profile = {
  name: "Алексей Яковлев",
  role: "Backend Developer",
  spec: "PHP / Laravel / API / PostgreSQL",
  location: "Россия, удалённо",
  years: "5+",
  current: "[краткое описание текущего проекта/роли]",
  openToOffers: true,
  contacts: [
    { label: "Email", display: "your@email.com", url: "mailto:your@email.com" },
    { label: "GitHub", display: "github.com/username", url: "https://github.com/username" },
    { label: "Telegram", display: "@username", url: "https://t.me/username" },
    {
      label: "LinkedIn",
      display: "linkedin.com/in/username",
      url: "https://linkedin.com/in/username",
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

const Experience = [
  {
    company: "Company Name 1",
    role: "Senior Backend Developer",
    period: "2023 — наст.",
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
    bullets: ["Поддержка и развитие legacy-систем", "Миграция с монолита на Laravel"],
    stack: "PHP, Laravel, MySQL, jQuery",
  },
];

export { Profile, Stack, Experience };
