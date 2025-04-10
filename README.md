# Weather App

Современное веб-приложение для просмотра погоды, построенное на Angular с использованием Feature Sliced Design архитектуры и Taiga UI.

## 🚀 Технологии

- **Angular 17** - современный фреймворк для разработки веб-приложений
- **Feature Sliced Design** - архитектурная методология для организации кода
- **Taiga UI** - UI библиотека от ТБанка
- **NgRx** - управление состоянием приложения
- **RxJS** - реактивное программирование
- **TypeScript** - строгая типизация

## 📁 Структура проекта

Проект организован согласно методологии Feature Sliced Design:

src/
├── app/                 # Инициализация приложения
├── shared/              # Переиспользуемый код
├── entities/           # Бизнес-сущности
├── features/           # Функциональность
├── widgets/           # Композиционные компоненты
├── pages/             # Страницы приложения
└── processes/         # Сложные процессы
```

## 🛠 Установка и запуск

1. Установите зависимости:
```bash
npm install
# или
pnpm install
```

2. Запустите приложение:
```bash
ng serve
```

3. Откройте в браузере:
```
http://localhost:4200
```

## 🔧 Конфигурация

### Алиасы путей

В проекте настроены алиасы для удобной работы с импортами:

```typescript
import { Component } from '@shared/ui';
import { WeatherService } from '@entities/weather';
import { SearchComponent } from '@features/search';
```

### Переменные окружения

Создайте файл `src/environments/environment.ts` на основе `environment.example.ts`:

```typescript
export const environment = {
  production: false,
  weatherApiKey: 'YOUR_API_KEY',
  weatherApiUrl: 'https://api.weatherapi.com/v1'
};
```

## 📦 Основные зависимости

- `@angular/*` - Angular фреймворк
- `@taiga-ui/*` - UI компоненты от Тинькофф
- `@ngrx/*` - Управление состоянием
- `rxjs` - Реактивное программирование

## 🎨 Стилизация

- Используется Taiga UI как основная UI библиотека
- Поддержка светлой и темной темы
- Адаптивный дизайн
- Кастомные стили в SCSS

## 🧪 Тестирование

```bash
# Запуск unit тестов
ng test

# Запуск e2e тестов
ng e2e
```