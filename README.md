# Grzybnia

Mobilna aplikacja w React Native (Expo) poświęcona tematyce grzybiarstwa stworzona na zadanie
rekrutacyjne Software Mansion (praktyki 2026/2027).

## Co robi aplikacja

**Atlas grzybów** — interaktywna baza gatunków z podziałem na jadalne / niejadalne / trujące
wyszukiwarka, filtry oraz wyraźne ostrzeżenia przy gatunkach trujących.
**Mapa znalezisk** — zapisywanie własnych stanowisk grzybów na mapie (działa offline)
**Dziennik** — własne znaleziska ze zdjęciami i notatkami.

***Aplikacja ma charakter edukacyjny/hobbystyczny. Nie jest to narzędzie do profesjonalnej
identyfikacji grzybów przed zjedzeniem jakiegokolwiek znaleziska zawsze skonsultuj się z
doświadczonym grzybiarzem lub w punkcie oceny grzybów (Sanepid).***

## Platforma i testowanie

Aplikacja przygotowywana głównie pod **Androida**.
Testowana na: Xiaomi Redmi Note 13 Pro 5G.

## Uruchomienie

```bash
npm install
npx expo start
```

Następnie zeskanuj kod QR aplikacją **Expo Go** (Android/iOS) telefon i komputer muszą być
w tej samej sieci Wi-Fi.

## Struktura projektu

```
app/                 — ekrany (Expo Router)
  (tabs)/            — Atlas / Mapa / Dziennik
  grzyb/[id].tsx     — szczegóły gatunku
components/          — komponenty wielokrotnego użytku (karta grzyba, odznaki, alerty)
data/                — baza gatunków grzybów
theme/               — kolory i styl aplikacji
```

## Demo

_tutaj trafi filmik lub screeny prezentujące działającą aplikację_
