# Frontend Mentor - Todo app solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

* [Overview](#overview)

  * [The challenge](#the-challenge)
  * [Screenshot](#screenshot)
  * [Links](#links)
* [My process](#my-process)

  * [Built with](#built-with)
  * [What I learned](#what-i-learned)
  * [Continued development](#continued-development)
  * [Useful resources](#useful-resources)
* [Author](#author)

## Overview

### The challenge

Users should be able to:

* View the optimal layout for the app depending on their device's screen size
* See hover states for all interactive elements on the page
* Add new todos to the list (by clicking add button or pressing Enter)
* Mark todos as complete
* Delete todos from the list
* Filter by all/active/complete todos
* Clear all completed todos
* Toggle light and dark mode (with persistence in localStorage)
* **Bonus**: Drag and drop to reorder items on the list
* Persist todos and dark mode preference using localStorage

### Screenshot

![](./design/mydesign%20(1).png)

![](./design/mydesign%20(2).png)

### Links

* Solution URL: [Add solution URL here](https://github.com/Saoud2021/todo-app-main)
* Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

* Semantic HTML5 markup
* CSS custom properties
* Flexbox
* CSS Grid
* Mobile-first workflow
* [React](https://reactjs.org/) - JS library
* React Hooks (`useState`, `useEffect`, `useRef`)
* LocalStorage for persistence
* Drag and Drop (native HTML5 API)

### What I learned

I deepened my understanding of:

* Using `useState` and `useEffect` together to persist state in `localStorage`.
* Handling controlled and uncontrolled inputs with `useRef`.
* Implementing dark/light mode toggling and persisting it across sessions.
* Adding todos on pressing Enter using an `onKeyDown` handler.
* Implementing drag-and-drop reordering with the native HTML5 drag events.

Example: Adding todos with Enter key

```jsx
<input
  type="text"
  ref={inputRef}
  placeholder="Create a new todo..."
  onKeyDown={(e) => e.key === "Enter" && add()}
/>
```

### Continued development

In the future I’d like to:

* Improve accessibility (keyboard navigation, ARIA attributes).
* Animate drag-and-drop interactions for smoother UX.
* Add a backend to sync todos across devices.
* Explore `react-beautiful-dnd` for more advanced drag-and-drop.

### Useful resources

* [React Docs - Hooks](https://react.dev/reference/react) – Helpful for correctly setting up `useEffect` and `useState`.
* [MDN Web Docs - Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API) – For implementing the drag-and-drop feature.
* [CSS Tricks - Dark Mode](https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/) – Guide for building theme toggles.

## Author

* Frontend Mentor - [@Saoud2021](hthttps://www.frontendmentor.io/profile/Saoud2021)
* GitHub - [@saoud2021](https://github.com/Saoud2021)
