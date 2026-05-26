# Породи кучета — Dog Breeds Flip Card Game

A tiny single-page game for learning dog breed names in Bulgarian. Built for my daughter — works on phone and desktop, no installs, no accounts, no distractions.

## How to play

1. A dog appears on a white background.
2. Tap (or click) the dog → its Bulgarian name fades in above it.
3. Tap again → the next dog appears with the name hidden.
4. Repeat. Breeds are shuffled fresh each session.

Keyboard: `Space`, `Enter`, or `→` also advance.

## Run it locally

Any static file server works. The simplest:

```sh
python -m http.server 8765
```

Then open <http://localhost:8765> in a browser.

## Project layout

```
index.html       markup
style.css        styles (mobile-first, responsive)
app.js           game logic
breeds.json      [{ name, image }] — 123 breeds, alphabetical
images/          one JPG per breed, named by slug
.claude/         editor preview config (optional)
```

## Data source

Breed names and photos were scraped from [purina.bg's dog breed library](https://www.purina.bg/namirane-na-domashen-lyubimets/kucheta-porodi) (11 pages, 123 unique breeds). All images are used as-is from that site and credit belongs to Purina BG.

## Adding or changing breeds

`breeds.json` is just a list:

```json
[
  { "name": "Мопс", "image": "images/mops.jpg" },
  { "name": "Френски Булдог", "image": "images/frenski-buldog.jpg" }
]
```

Drop a new image into `images/`, add a matching entry, refresh.
