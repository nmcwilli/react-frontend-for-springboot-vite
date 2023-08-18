# React + TypeScript + Vite Frontend for Spring Boot app

This is a template front-end using React + TypeScript + Vite for my Spring Boot back-end. 

It provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

In order for it to function properly, my Spring Boot backend must be up and running at localhost:8080 or whatever port you specify. 

## Integrating with a Backend 

This project integrates well with my sample Java Spring Boot backend:
https://github.com/nmcwilli/rest-service-springboot

## Config

Vite.config.js updated to include proxy for back-end. Update accordingly to wherever back-end API is hosted. 
```
server: {
    proxy: {
      "/api/v1": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
```

## Generate a new build
```
npm run build
```

## Run in dev env
```
npm run dev
```

## Vite documentation

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
