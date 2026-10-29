# Green Tourism — Frontend

Web client for **Green Tourism** (Ukrainian: **«Природні мандри»**) — a community platform for eco-tourism in Ukraine. Travellers share stories about their trips, explore other people's journeys, discover travellers, and save stories for later.

The application is built with the Next.js App Router, server-side data prefetching, and cookie-based JWT authentication.

- **Live demo:** https://green-tourism-frontend.vercel.app
- **API documentation (Swagger UI):** https://green-tourism-backend.onrender.com/api-docs/
- **Backend API:** https://green-tourism-backend.onrender.com/api

> The backend is hosted on Render's free tier, so the first request after a period of inactivity may take a little longer.

---

## Features

### Public pages
- **Home page** — hero section, popular stories slider, travellers carousel, "about the project" section, and a community call-to-action.
- **Stories catalogue** (`/stories`) — browse all stories, filter by category, and load more results with infinite scrolling. The number of items per page adapts to the viewport (8 on mobile/tablet, 9 on desktop).
- **Story details** (`/stories/[storyId]`) — full article with cover image, author, publication date, and category, plus recommended stories.
- **Travellers catalogue** (`/travellers`) — browse community members with infinite scrolling, 12 travellers per page.
- **Traveller profile** (`/travellers/[travellerId]`) — traveller information and their published stories.
- **Email confirmation** (`/confirm-email`) — confirms an email address using the token from the verification link.

### Accounts and session management
- Registration with client-side validation.
- Login and logout.
- JWT session stored in `httpOnly` cookies (`accessToken`, `refreshToken`, `sessionId`).
- Automatic session refresh:
  - in the edge proxy for protected routes;
  - in the Axios response interceptor — a `401` response is retried once after refreshing the session.
- Authenticated users are redirected away from `/login` and `/register`.
- Guests are redirected to `/login` when opening protected pages.
- Current user is restored on page load and kept in a Zustand store.

### Profile
- **Saved stories** (`/profile/saved`) and **own stories** (`/profile/own`) tabs with infinite scrolling and empty states.
- **Edit profile** (`/profile/edit`) — update name, email, and avatar. Changing the email triggers a verification email.
- Logout confirmation modal.

### Content creation
- **New story** (`/new-story`) — Formik + Yup form with cover image upload and preview, title, category, and article. The author is redirected to the created story after publishing.

### Story saving
- Save and unsave stories from story cards and the story details page.
- Guests see an authentication prompt instead of saving.
- The saved state and saved counter are updated immediately.

### UX and quality
- Responsive layout with a mobile burger menu.
- Loading, empty, and error states across the app.
- Toast notifications via `react-hot-toast`.
- Accessible controls: semantic markup, ARIA attributes, keyboard support (Escape closes menus/modals).
- Custom 404 page.
- Metadata and Open Graph tags for pages.

---

## Tech stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router, React Compiler) |
| UI | React 19, CSS Modules, `modern-normalize` |
| Language | TypeScript |
| Server state | TanStack Query (prefetching, hydration, infinite queries) |
| Client state | Zustand |
| HTTP | Axios |
| Forms | Formik + Yup |
| Sliders | Swiper |
| Notifications | react-hot-toast |
| Utilities | `cookie`, `use-debounce` |
| Linting | ESLint (`eslint-config-next`) |
| Fonts | `next/font` (Montserrat, Nunito Sans, Sora) |

---

## Project structure

```text
frontend/
├─ app/
│  ├─ (auth routes)/          # /login, /register
│  ├─ (privat routes)/        # /profile, /new-story (protected)
│  ├─ (public routes)/        # /stories, /travellers, /confirm-email
│  ├─ api/                    # Axios instance and helpers for server-side requests
│  ├─ layout.tsx              # Root layout, providers, metadata
│  ├─ page.tsx                # Home page
│  ├─ loading.tsx
│  └─ not-found.tsx
├─ components/                # Reusable UI and feature components
├─ hooks/                     # Custom hooks (e.g. usePerPage)
├─ lib/
│  ├─ api/                    # API clients (client-side, server-side, domain-specific)
│  ├─ store/                  # Zustand stores
│  ├─ constants.ts
│  └─ utils.ts
├─ types/                     # Shared TypeScript types
├─ public/                    # Static assets (icons, images)
├─ proxy.ts                   # Next.js proxy (middleware) for auth and redirects
├─ next.config.ts             # Image domains, API rewrite, React Compiler
└─ package.json
```

---

## Getting started

### Requirements
- Node.js 20 or newer
- npm (or another package manager)

### Installation

```bash
git clone https://github.com/zeman-dev/Green_tourism_Frontend.git
cd Green_tourism_Frontend
npm install
```

### Environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=/api
NEXT_PUBLIC_API_BASE_URL=https://green-tourism-backend.onrender.com/api
API_URL=https://green-tourism-backend.onrender.com/api
```

| Variable | Scope | Description | Default |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | Client | Base URL for the main Axios instance | `/api` |
| `NEXT_PUBLIC_API_BASE_URL` | Client | Base URL for the public travellers API client | Backend URL |
| `API_URL` | Server | Base URL for server-side requests (Server Components and proxy) | Backend URL |

`NEXT_PUBLIC_*` variables are exposed to the browser. Never use them for secrets.

In development, requests to `/api/*` can be proxied to the backend with the rewrite configured in `next.config.ts`. When `NEXT_PUBLIC_API_URL` is set to `/api`, the browser talks to the same origin and the Next.js rewrite forwards requests to the backend.

### Run the development server

```bash
npm run dev
```

Open http://localhost:3000.

### Production build

```bash
npm run build
npm run start
```

---

## Available scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

---

## Routes

| Route | Access | Description |
| --- | --- | --- |
| `/` | Public | Home page |
| `/stories` | Public | Stories catalogue with category filter |
| `/stories/[storyId]` | Public | Story details |
| `/travellers` | Public | Travellers catalogue |
| `/travellers/[travellerId]` | Public | Traveller profile and stories |
| `/confirm-email` | Public | Email confirmation |
| `/login` | Guests only | Login page |
| `/register` | Guests only | Registration page |
| `/profile` | Private | Redirects to `/profile/saved` |
| `/profile/saved` | Private | Saved stories |
| `/profile/own` | Private | Stories created by the user |
| `/profile/edit` | Private | Edit profile |
| `/new-story` | Private | Create a story |

Private routes are protected by `proxy.ts`; an active session redirects users away from the guest-only routes.

---

## API integration

All data comes from the Green Tourism backend. Interactive API documentation is available in **Swagger UI** at https://green-tourism-backend.onrender.com/api-docs/.

The main endpoints used by the client:

| Resource | Endpoints |
| --- | --- |
| Auth | `POST /auth/register`, `POST /auth/login`, `POST /auth/refresh`, `POST /auth/logout` |
| Users | `GET /users`, `GET /users/:id`, `GET /users/me`, `PATCH /users/me`, `PATCH /users/me/avatar` |
| Current user content | `GET /users/me/stories`, `GET /users/me/saved-stories` |
| Saved stories | `POST /users/saved-articles/:storyId`, `DELETE /users/saved-articles/:storyId` |
| Stories | `GET /stories`, `GET /stories/:id`, `POST /stories` |
| Categories | `GET /categories` |
| Email | `POST /users/confirm-email` |

### Data fetching approach
- Server Components prefetch data with TanStack Query and pass it to the client through `HydrationBoundary`, so pages render with data immediately.
- Client components use `useQuery` and `useInfiniteQuery` for filtering, pagination, and mutations.
- Authentication state is shared through a Zustand store, while the session itself lives in cookies.

---

## Deployment

The project is designed to be deployed on [Vercel](https://vercel.com):

1. Import the repository into Vercel.
2. Add the environment variables listed above to the project settings.
3. Deploy. The `/api/*` rewrite from `next.config.ts` keeps client requests same-origin.

Make sure the backend's CORS and cookie settings allow requests from the deployment domain.

---

## Notes

- The folders `(auth routes)`, `(privat routes)`, and `(public routes)` are Next.js route groups; their names are not part of the URL.
- Story images and avatars are served from external hosts configured in `next.config.ts`.
- There is currently no automated test suite configured in this repository.

---

# Green Tourism — Frontend (Українською)

Веб-клієнт для **«Природних мандрів»** — спільноти еко-туризму в Україні. Мандрівники діляться історіями про свої подорожі, знаходять натхнення в історіях інших, знайомляться з мандрівниками та зберігають історії на потім.

Застосунок побудований на Next.js App Router із серверним попереднім завантаженням даних і JWT-автентифікацією через cookie.

- **Демо:** https://green-tourism-frontend.vercel.app
- **Документація API (Swagger UI):** https://green-tourism-backend.onrender.com/api-docs/
- **API бекенду:** https://green-tourism-backend.onrender.com/api

> Бекенд розміщений на безкоштовному тарифі Render, тому перший запит після періоду неактивності може виконуватися довше.

---

## Функціонал

### Публічні сторінки
- **Головна сторінка** — hero-блок, слайдер популярних історій, карусель мандрівників, розділ «про проєкт» і заклик долучитися до спільноти.
- **Каталог історій** (`/stories`) — перегляд усіх історій, фільтрація за категорією та довантаження результатів (нескінченний скрол). Кількість елементів на сторінці адаптується до екрана (8 на мобільних і планшетах, 9 на десктопі).
- **Сторінка історії** (`/stories/[storyId]`) — повна стаття з обкладинкою, автором, датою публікації та категорією, а також рекомендовані історії.
- **Каталог мандрівників** (`/travellers`) — перегляд учасників спільноти з довантаженням, по 12 мандрівників на сторінку.
- **Профіль мандрівника** (`/travellers/[travellerId]`) — інформація про мандрівника та його опубліковані історії.
- **Підтвердження email** (`/confirm-email`) — підтвердження адреси за токеном із листа.

### Акаунти та сесія
- Реєстрація з клієнтською валідацією.
- Вхід і вихід.
- JWT-сесія зберігається в `httpOnly` cookie (`accessToken`, `refreshToken`, `sessionId`).
- Автоматичне оновлення сесії:
  - в edge-proxy для захищених маршрутів;
  - в інтерсепторі відповідей Axios — після `401` запит повторюється один раз після оновлення сесії.
- Авторизовані користувачі перенаправляються зі сторінок `/login` і `/register`.
- Гості перенаправляються на `/login` під час відкриття захищених сторінок.
- Поточний користувач відновлюється під час завантаження сторінки та зберігається в Zustand.

### Профіль
- Вкладки **«Збережені історії»** (`/profile/saved`) і **«Мої історії»** (`/profile/own`) з довантаженням та порожніми станами.
- **Редагування профілю** (`/profile/edit`) — зміна імені, email та аватара. Зміна email надсилає лист для підтвердження.
- Модальне вікно підтвердження виходу.

### Створення контенту
- **Нова історія** (`/new-story`) — форма на Formik + Yup із завантаженням і прев'ю обкладинки, назвою, категорією та текстом статті. Після публікації автора перенаправляють на створену історію.

### Збереження історій
- Збереження та видалення історій із карток і зі сторінки історії.
- Гостям замість збереження показується пропозиція авторизуватися.
- Стан збереження та лічильник оновлюються одразу.

### UX та якість
- Адаптивний інтерфейс із мобільним бургер-меню.
- Стани завантаження, порожніх даних і помилок по всьому застосунку.
- Сповіщення через `react-hot-toast`.
- Доступні елементи керування: семантична розмітка, ARIA-атрибути, підтримка клавіатури (Escape закриває меню та модальні вікна).
- Власна сторінка 404.
- Метадані та Open Graph для сторінок.

---

## Технології

| Напрям | Технологія |
| --- | --- |
| Фреймворк | Next.js 16 (App Router, React Compiler) |
| UI | React 19, CSS Modules, `modern-normalize` |
| Мова | TypeScript |
| Серверний стан | TanStack Query (prefetching, hydration, infinite queries) |
| Клієнтський стан | Zustand |
| HTTP | Axios |
| Форми | Formik + Yup |
| Слайдери | Swiper |
| Сповіщення | react-hot-toast |
| Утиліти | `cookie`, `use-debounce` |
| Лінтинг | ESLint (`eslint-config-next`) |
| Шрифти | `next/font` (Montserrat, Nunito Sans, Sora) |

---

## Структура проєкту

```text
frontend/
├─ app/
│  ├─ (auth routes)/          # /login, /register
│  ├─ (privat routes)/        # /profile, /new-story (захищені)
│  ├─ (public routes)/        # /stories, /travellers, /confirm-email
│  ├─ api/                    # Axios-інстанс і хелпери для серверних запитів
│  ├─ layout.tsx              # Кореневий layout, провайдери, метадані
│  ├─ page.tsx                # Головна сторінка
│  ├─ loading.tsx
│  └─ not-found.tsx
├─ components/                # Перевикористовувані UI- та feature-компоненти
├─ hooks/                     # Кастомні хуки (наприклад, usePerPage)
├─ lib/
│  ├─ api/                    # API-клієнти (клієнтські, серверні, доменні)
│  ├─ store/                  # Zustand-сховища
│  ├─ constants.ts
│  └─ utils.ts
├─ types/                     # Спільні TypeScript-типи
├─ public/                    # Статичні ресурси (іконки, зображення)
├─ proxy.ts                   # Proxy (middleware) Next.js для авторизації та редиректів
├─ next.config.ts             # Домени зображень, rewrite API, React Compiler
└─ package.json
```

---

## Швидкий старт

### Вимоги
- Node.js 20 або новіший
- npm (або інший пакетний менеджер)

### Встановлення

```bash
git clone https://github.com/zeman-dev/Green_tourism_Frontend.git
cd Green_tourism_Frontend
npm install
```

### Змінні оточення

Створіть файл `.env.local` у корені проєкту:

```env
NEXT_PUBLIC_API_URL=/api
NEXT_PUBLIC_API_BASE_URL=https://green-tourism-backend.onrender.com/api
API_URL=https://green-tourism-backend.onrender.com/api
```

| Змінна | Область | Опис | За замовчуванням |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | Клієнт | Базова URL-адреса основного Axios-інстансу | `/api` |
| `NEXT_PUBLIC_API_BASE_URL` | Клієнт | Базова URL-адреса клієнта для публічного API мандрівників | URL бекенду |
| `API_URL` | Сервер | Базова URL-адреса для серверних запитів (Server Components і proxy) | URL бекенду |

Змінні `NEXT_PUBLIC_*` доступні в браузері. Ніколи не зберігайте в них секрети.

У режимі розробки запити до `/api/*` можна проксіювати на бекенд через rewrite у `next.config.ts`. Якщо `NEXT_PUBLIC_API_URL` дорівнює `/api`, браузер звертається до того самого origin, а rewrite Next.js пересилає запит на бекенд.

### Запуск сервера розробки

```bash
npm run dev
```

Відкрийте http://localhost:3000.

### Продакшн-збірка

```bash
npm run build
npm run start
```

---

## Доступні скрипти

| Скрипт | Опис |
| --- | --- |
| `npm run dev` | Запуск сервера розробки |
| `npm run build` | Створення продакшн-збірки |
| `npm run start` | Запуск продакшн-сервера |
| `npm run lint` | Запуск ESLint |

---

## Маршрути

| Маршрут | Доступ | Опис |
| --- | --- | --- |
| `/` | Публічний | Головна сторінка |
| `/stories` | Публічний | Каталог історій із фільтром категорій |
| `/stories/[storyId]` | Публічний | Деталі історії |
| `/travellers` | Публічний | Каталог мандрівників |
| `/travellers/[travellerId]` | Публічний | Профіль мандрівника та його історії |
| `/confirm-email` | Публічний | Підтвердження email |
| `/login` | Лише для гостей | Вхід |
| `/register` | Лише для гостей | Реєстрація |
| `/profile` | Приватний | Перенаправляє на `/profile/saved` |
| `/profile/saved` | Приватний | Збережені історії |
| `/profile/own` | Приватний | Історії, створені користувачем |
| `/profile/edit` | Приватний | Редагування профілю |
| `/new-story` | Приватний | Створення історії |

Приватні маршрути захищені `proxy.ts`; за наявності активної сесії користувача перенаправляють зі сторінок лише для гостей.

---

## Інтеграція з API

Усі дані надходять із бекенду Green Tourism. Інтерактивна документація API доступна в **Swagger UI** за адресою https://green-tourism-backend.onrender.com/api-docs/.

Основні ендпоінти, які використовує клієнт:

| Ресурс | Ендпоінти |
| --- | --- |
| Авторизація | `POST /auth/register`, `POST /auth/login`, `POST /auth/refresh`, `POST /auth/logout` |
| Користувачі | `GET /users`, `GET /users/:id`, `GET /users/me`, `PATCH /users/me`, `PATCH /users/me/avatar` |
| Контент користувача | `GET /users/me/stories`, `GET /users/me/saved-stories` |
| Збережені історії | `POST /users/saved-articles/:storyId`, `DELETE /users/saved-articles/:storyId` |
| Історії | `GET /stories`, `GET /stories/:id`, `POST /stories` |
| Категорії | `GET /categories` |
| Email | `POST /users/confirm-email` |

### Підхід до завантаження даних
- Server Components попередньо завантажують дані через TanStack Query і передають їх клієнту через `HydrationBoundary`, тому сторінки одразу рендеряться з даними.
- Клієнтські компоненти використовують `useQuery` та `useInfiniteQuery` для фільтрації, пагінації та мутацій.
- Стан авторизації спільний через Zustand, а сама сесія зберігається в cookie.

---

## Розгортання

Проєкт розрахований на розгортання на [Vercel](https://vercel.com):

1. Імпортуйте репозиторій у Vercel.
2. Додайте перелічені вище змінні оточення в налаштуваннях проєкту.
3. Розгорніть проєкт. Rewrite `/api/*` з `next.config.ts` зберігає запити клієнта в межах того самого origin.

Переконайтеся, що CORS і налаштування cookie бекенду дозволяють запити з домену розгортання.

---

## Примітки

- Папки `(auth routes)`, `(privat routes)` і `(public routes)` — це route groups Next.js; їхні назви не входять до URL.
- Зображення історій та аватари роздаються із зовнішніх хостів, налаштованих у `next.config.ts`.
- Наразі в репозиторії не налаштовано автоматизованих тестів.
