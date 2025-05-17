# M223 Frontend

## About

This is a basic React-Router App for educational purposes. M223 is the name of a Swiss ICT education module for the development of multi-user applications. <https://www.modulbaukasten.ch/module/223/3/de-DE>

### App.jsx

* contains the (nested) route definitions
* root route is handled by *Layout.jsx*

### Layout.jsx

* renders *Navigation* and *Outlet*
* *Outlet* is a router component that will display the content of the nested routes

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

