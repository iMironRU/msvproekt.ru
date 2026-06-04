# msvproekt.ru

[![Build & Deploy](https://github.com/iMironRU/msvproekt.ru/actions/workflows/deploy.yml/badge.svg)](https://github.com/iMironRU/msvproekt.ru/actions/workflows/deploy.yml)
[![Last commit](https://img.shields.io/github/last-commit/iMironRU/msvproekt.ru)](https://github.com/iMironRU/msvproekt.ru/commits/main)
[![Release](https://img.shields.io/github/v/release/iMironRU/msvproekt.ru?label=release)](https://github.com/iMironRU/msvproekt.ru/releases/latest)

Корпоративный сайт **ООО «МСВ»** — строительная и инженерно-проектная компания, г. Санкт-Петербург.

---

## О проекте

Клиент обратился с техническим заданием в формате документа Word. На его основе был разработан и запущен корпоративный сайт компании.

**Выполненные работы:**

- Разработана структура сайта и информационная архитектура
- Создан адаптивный HTML с дизайном, утверждённым заказчиком
- Зарегистрирован домен **msvproekt.ru**
- Подобран хостинг, сайт размещён и доступен в интернете
- Разработана технология обновления контента через GitHub — **активно применяется**

Сайт построен на принципе разделения данных и представления: весь контент (контакты, услуги, проекты, документы) хранится в отдельных файлах данных, а не вшит в HTML. Любое обновление — правка одного файла и `git push`.

→ [Подробная техническая документация](docs/architecture.md)

---

## Как обновить контент

Все данные сайта в файле [`data/site.json`](data/site.json):

```jsonc
// Контакты
"contacts": { "phone_display": "+7 909-977-98-15", "email": "msvproekt@mail.ru" }

// Добавить документ → положить PDF в src/, добавить запись:
"documents": [{ "name": "Название", "file": "filename.pdf" }]

// Добавить проект:
"projects": [{ "title": "Объект", "description": "Описание, год, вид работ" }]
```

SEO-метаданные (title, description) — в [`data/meta.yml`](data/meta.yml).

---

## Лицензия

Исходный код — [MIT](LICENSE).  
Контент (тексты, логотип, документы) принадлежит ООО «МСВ».
