# Архитектура проекта

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
├── docs/
│   └── architecture.md  ← этот файл
├── build.js             ← сборочный скрипт Node.js
└── .github/
    └── workflows/
        └── deploy.yml   ← CI/CD: сборка → деплой + релиз
```

## Стек

| Слой | Инструмент |
|------|-----------|
| Шаблонизатор | [Handlebars](https://handlebarsjs.com/) |
| Данные | JSON + YAML |
| Сборка | Node.js `build.js` |
| CI/CD | GitHub Actions |
| Деплой | `rsync` по SSH |
| Хостинг | VestaCP / shared hosting |

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

1. Положить PDF в `src/`
2. Добавить запись в `data/site.json` → `"documents"`:

```jsonc
{ "name": "Название документа", "file": "filename.pdf" }
```

**Добавить проект:**

```jsonc
// data/site.json → "projects"
{ "title": "Название объекта", "description": "Описание, год, вид работ" }
```

После любых изменений — `git push`, сайт обновится автоматически.

## CI/CD

| Событие | Действие |
|---------|---------|
| `git push` в `main` | Сборка + деплой на хостинг |
| `git tag v1.2.3` + `push` | Сборка + деплой + GitHub Release с `public_html.zip` |
| `workflow_dispatch` | Ручной запуск из GitHub Actions |

## Локальная сборка

```bash
npm install
npm run build    # → dist/
npm run preview  # → dist/ + локальный сервер
```

## Настройка деплоя (FTP-секреты)

В репозитории: **Settings → Secrets and variables → Actions**

| Secret | Описание |
|--------|---------|
| `FTP_HOST` | IP или домен сервера |
| `FTP_USER` | FTP-пользователь |
| `FTP_PASS` | FTP-пароль |

Деплой выполняется через `lftp mirror` — заливаются только изменённые файлы, удалённые локально файлы удаляются и на сервере.

## Ручной деплой

Скачайте `public_html.zip` из раздела [Releases](https://github.com/iMironRU/msvproekt.ru/releases/latest) и распакуйте в папку `public_html` на сервере.
