# Personal Portfolio Website

A fully responsive, dark-themed personal portfolio website built with semantic **HTML5**, custom **CSS3**, and vanilla **JavaScript**

## 📁 Project Structure
```
portfolio/
├── index.html           ← Semantic HTML5 structure
├── style.css            ← CSS3 (custom props, Grid, Flexbox, light/dark themes)
├── script.js            ← Vanilla JS (7 interactive features)
├── README.md
├── images/
│   ├── profile.jpg
│   ├── project-mern.jpg
│   ├── project-sleep.jpg
│   └── salesanalysis.jpg
```

## ✨ JavaScript Features

| # | Feature | Implementation |
|---|---------|----------------|
| 1 | **Dark / Light mode toggle** | `data-theme` attr on `<html>`, persisted in `localStorage` |
| 2 | **Typing animation** | Recursive `setTimeout` loop cycling through 4 role titles |
| 3 | **Animated skill bars** | `IntersectionObserver` triggers CSS width transition on scroll |
| 4 | **Project category filter** | Filter buttons toggle `card--hidden` class via `dataset.category` |
| 5 | **Contact form validation** | Real-time per-field errors on blur + submit guard + success toast |
| 6 | **Character counter** | Live `input` event counter with colour warnings at 80% / 100% |
| 7 | **Scroll-to-top button** | Appears after 300px scroll, smooth scroll on click |
| + | Mobile nav toggle | `aria-expanded` toggle + close on link click |
| + | Active nav on scroll | `IntersectionObserver` highlights current section in nav |
| + | Dynamic footer year | `new Date().getFullYear()` — never needs manual updating |

## 🛠️ Tech Stack
- HTML5 (semantic elements)
- CSS3 (custom properties, Grid, Flexbox, media queries, animations)
- Vanilla JavaScript ES6+ (no jQuery, no frameworks)

## 📅 Development Timeline

| Day | Task | Assignment |
|-----|------|-----------|
| 1–7 | HTML5 structure, semantic tags, sections, contact form | Assignment 1 |
| 8–14 | CSS3 styling, Grid/Flexbox, hover effects, responsive | Assignment 2 |
| 15 | Setup script.js, link to HTML, console.log test | Assignment 3 |
| 16 | DOM manipulation helpers `$()` and `$$()` | Assignment 3 |
| 17 | Event listeners: click, blur, input, scroll | Assignment 3 |
| 18 | Form validation with real-time error messages | Assignment 3 |
| 19 | Dark/light mode toggle + localStorage persistence | Assignment 3 |
| 20 | Typing animation, character counter | Assignment 3 |
| 21 | Skill bars (IntersectionObserver), project filter | Assignment 3 |
| 22 | Scroll-to-top, testing & debugging, README update | Assignment 3 |

## 📬 Contact
- GitHub: [github.com/roshan-m24](https://github.com/roshan-m24)
- LinkedIn: [linkedin.com/in/roshan-mm](https://linkedin.com/in/roshan-mm)

