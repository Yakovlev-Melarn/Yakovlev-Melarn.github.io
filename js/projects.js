const projects = [
  {
    id: "project-1",
    title: "E-commerce REST API",
    plain: "Бэкенд интернет-магазина: каталог товаров, корзина, заказы и оплата.",
    result: "Устойчив к пиковым нагрузкам в распродажи, доля сбоев платежей снизилась на 40%",
    description:
      "REST API для интернет-магазина. Каталог, корзина, заказы, оплата, автотесты.",
    stack: ["PHP 8.2", "Laravel 11", "PostgreSQL", "Redis"],
    role: "Fullstack backend",
    features: [
      "OpenAPI 3.1 спецификация",
      "200+ unit/feature тестов (PHPUnit)",
      "Очереди (Horizon), кеширование",
      "Docker, CI/CD через GitHub Actions",
    ],
    links: {
      github: "https://github.com/Yakovlev-Melarn/project-1",
      live: "https://example.com",
      docs: "https://docs.example.com",
    },
  },
  {
    id: "project-2",
    title: "Микросервис уведомлений",
    plain: "Сервис, который доставляет email, SMS и push-уведомления другим сервисам компании.",
    result: "Доставляем миллионы уведомлений в месяц, статус каждого виден в интерфейсе",
    description:
      "Микросервис рассылки email, SMS и push-уведомлений. Очереди, ретраи, статусы доставленности.",
    stack: ["Go 1.21", "NATS", "PostgreSQL", "Docker"],
    role: "Backend",
    features: [
      "gRPC API для интеграции с сервисами",
      "Роутинг провайдеров и ретраи доставки",
      "Dead letter queue и отслеживание статусов",
      "Метрики Prometheus, трейсинг",
    ],
    links: {
      github: "https://github.com/Yakovlev-Melarn/project-2",
      docs: "https://docs.example.com",
    },
  },
  {
    id: "project-3",
    title: "CLI-утилита для миграций БД",
    plain: "Утилита, которая обновляет структуру базы данных: версионирование, откат, сравнение.",
    result: "Обновления БД стали предсказуемыми и безопасными для прод-окружения",
    description:
      "CLI-утилита для управления миграциями PostgreSQL: версионирование, откат, diff.",
    stack: ["Go 1.21", "PostgreSQL", "Cobra"],
    role: "Автор",
    features: [
      "Параллельное выполнение миграций",
      "Dry-run режим и diff SQL",
      "Работа с несколькими окружениями (dev/stage/prod)",
    ],
    links: {
      github: "https://github.com/Yakovlev-Melarn/project-3",
    },
  },
  {
    id: "project-4",
    title: "WebSocket-чат",
    plain: "Чат в реальном времени: комнаты, каналы, история сообщений.",
    result: "Стабильно держит 10K+ одновременных пользователей на одном сервере",
    description:
      "Чат в реальном времени на PHP/Swoole. Каналы, комнаты, история сообщений, presence.",
    stack: ["PHP 8.2", "Swoole", "Redis", "Vue"],
    role: "Backend",
    features: [
      "10K+ одновременных подключений на узел",
      "Подтверждения доставки сообщений (ACK)",
      "Горизонтальное масштабирование через Redis Pub/Sub",
    ],
    links: {
      github: "https://github.com/Yakovlev-Melarn/project-4",
      live: "https://example.com",
    },
  },
  {
    id: "project-5",
    title: "CRUD-админка",
    plain: "Админка для управления каталогом, пользователями и заказами.",
    result: "Операционная команда перестала подавать 90% заявок на мелкие изменения",
    description:
      "Админка для управления каталогом, пользователями и заказами. REST API на Laravel + фронтенд на Vue.",
    stack: ["PHP 8.2", "Laravel 10", "Vue 3", "MySQL"],
    role: "Backend (API)",
    features: [
      "RBAC — роли и права доступа",
      "Аудит действий администраторов",
      "Фильтрация, пагинация, массовые операции",
      "Автотесты ключевых сценариев",
    ],
    links: {
      github: "https://github.com/Yakovlev-Melarn/project-5",
      live: "https://example.com",
    },
  },
  {
    id: "project-6",
    title: "Парсер и анализатор логов",
    plain: "Сервис, который разбирает логи сервисов и находит в них паттерны и повторяющиеся ошибки.",
    result: "Аналитики находят системные ошибки за минуты, а не часы ручного чтения логов",
    description:
      "Парсер и анализатор логов микросервисов: извлечение паттернов, агрегация ошибок, отчёты.",
    stack: ["Python 3.12", "FastAPI", "ClickHouse", "Docker"],
    role: "Автор",
    features: [
      "Парсинг 50K+ строк в секунду",
      "Динамическое извлечение паттернов",
      "Агрегация ошибок по fingerprint",
      "Web-интерфейс с фильтрами и экспортом",
    ],
    links: {
      github: "https://github.com/Yakovlev-Melarn/project-6",
    },
  },
];

export { projects };
