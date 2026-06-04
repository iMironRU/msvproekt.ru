# msvproekt.ru

[![Build & Deploy](https://github.com/iMironRU/msvproekt.ru/actions/workflows/deploy.yml/badge.svg)](https://github.com/iMironRU/msvproekt.ru/actions/workflows/deploy.yml)
[![Last commit](https://img.shields.io/github/last-commit/iMironRU/msvproekt.ru)](https://github.com/iMironRU/msvproekt.ru/commits/main)
[![Release](https://img.shields.io/github/v/release/iMironRU/msvproekt.ru)](https://github.com/iMironRU/msvproekt.ru/releases/latest)

> Официальный сайт **ООО «МСВ»** — строительная и проектная компания, г. Санкт-Петербург.  
> Official website of **MSV LLC** — construction & engineering company, Saint Petersburg.

---

## Как устроен проект

Сайт **статический**, но с простым слоем данных: весь контент хранится в JSON/YAML и вставляется в HTML-шаблон при сборке. Менять текст, контакты, список услуг или проектов можно без знания HTML — достаточно отредактировать один файл.

```
msvproekt.ru/
├── data/
│   ├── site.json        ← контент: контакты, услуги, проекты, документы
│   └── meta.yml         ← мета-теги: title, description, keywords
├── src/
│   ├── template.html    ← Handlebars-шаблон
│   ├── logo.png
│   ├── robots.txt
│   ├── *.pdf            ← документы компании
│   └── qr-cod/
├── dist/                ← сборка (gitignore, создаётся автоматически)
├── build.js             ← сборочный скрипт Node.js
├── package.json
└── .github/
    └── workflows/
        └── deploy.yml   ← CI/CD: сборка → деплой + релиз
```

---

## Как обновить контент

**Изменить контакты, реквизиты, текст:**

```jsonc
// data/site.json
"contacts": {
  "phone_display": "+7 909-977-98-15",
  "email": "msvproekt@mail.ru",
  "address": "199155, г. Санкт-Петербург ..."
}
```

**Добавить документ:**

```jsonc
// data/site.json → "documents"
{ "name": "Новый документ", "file": "new_doc.pdf" }
```

Положите PDF в `src/`, добавьте запись в `data/site.json`, сделайте `git push` — сайт обновится автоматически.

**Добавить проект:**

```jsonc
// data/site.json → "projects"
{ "title": "Название объекта", "description": "Описание, год, вид работ" }
```

---

## Стек

| Слой | Инструмент |
|------|-----------|
| Шаблонизатор | [Handlebars](https://handlebarsjs.com/) |
| Данные | JSON + YAML |
| Сборка | Node.js `build.js` |
| CI/CD | GitHub Actions |
| Деплой | `rsync` по SSH |
| Хостинг | VestaCP / shared hosting |

---

## Локальная сборка

```bash
npm install
npm run build    # → dist/
npm run preview  # → dist/ + локальный сервер
```

---

## CI/CD

| Событие | Действие |
|---------|---------|
| `git push` в `main` | Сборка + деплой на хостинг |
| `git tag v1.2.3` + `push` | Сборка + деплой + GitHub Release с `public_html.zip` |
| `workflow_dispatch` | Ручной запуск из GitHub Actions |

### Настройка секретов

В репозитории: **Settings → Secrets and variables → Actions → New repository secret**

| Secret | Описание | Пример |
|--------|---------|--------|
| `SSH_HOST` | IP или домен сервера | `185.xxx.xxx.xxx` |
| `SSH_USER` | SSH-пользователь | `msvproekt` |
| `SSH_PRIVATE_KEY` | Приватный ключ (RSA/ED25519) | `-----BEGIN ...` |
| `SSH_PORT` | SSH-порт (если не 22) | `22` |
| `SSH_PATH` | Путь на сервере | `/home/msvproekt/web/msvproekt.ru/public_html` |

#### Генерация SSH-ключа для деплоя

```bash
# Генерируем ключ без пароля
ssh-keygen -t ed25519 -C "github-deploy" -f ~/.ssh/msvproekt_deploy -N ""

# Публичный ключ → добавить на сервер
cat ~/.ssh/msvproekt_deploy.pub
# (добавить в ~/.ssh/authorized_keys на хостинге)

# Приватный ключ → добавить как SSH_PRIVATE_KEY в GitHub Secrets
cat ~/.ssh/msvproekt_deploy
```

### Среда деплоя (опционально)

Создайте environment **production** в **Settings → Environments** — это добавит защиту: ручное подтверждение перед деплоем.

---

## Ручной деплой

Скачайте `public_html.zip` из раздела [Releases](https://github.com/iMironRU/msvproekt.ru/releases/latest) и распакуйте в папку `public_html` на сервере.

---

## Лицензия

Исходный код распространяется под лицензией [MIT](LICENSE).  
Контент (тексты, логотип, документы) принадлежит ООО «МСВ».
