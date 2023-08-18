# React + TypeScript + Vite Frontend

This is a template front-end using React + TypeScript + Vite for my Spring Boot back-end. 

It provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Integrating with a Backend 

This project integrates well with my sample Java Spring Boot backend:
https://github.com/nmcwilli/rest-service-springboot

In order for it to function properly, my Spring Boot backend is up and running at localhost:8080 (or whatever port you specify, just 
make sure you update your vite.config.js file properly with the target). 

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
