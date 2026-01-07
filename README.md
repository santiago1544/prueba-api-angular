Este proyecto es una aplicación web desarrollada en Angular que consume APIs públicas para mostrar información de:

Personajes de Rick and Morty y de Pokemon

La aplicación permite listar personajes/pokémon con paginación, buscarlos por nombre, ver detalles individuales de cada registro, navegar entre vistas, mostrar datos de forma eficiente y escalable.

El enfoque principal del proyecto es demostrar buenas prácticas de arquitectura en Angular, separación de responsabilidades, uso correcto de Observables y RxJS, testing unitario.

Tecnologías Utilizadas para este proyecto

Angular 17.0.0

RxJS

Angular Material

TypeScript

Jasmine & Karma (testing)

APIs públicas

Rick and Morty API

PokéAPI

El proyecto sigue una arquitectura modular y escalable, organizada de la siguiente forma:

src/
 ├── app/
 │   ├── personajes/
 │   │   ├── lista-personajes/
 │   │   ├── detalle-personajes/
 │   │   └── personaje.component.ts
 │   ├── pokemones/
 │   │   ├── lista-pokemones/
 │   │   ├── detalle-pokemones/
 │   │   └── pokemon.component.ts
 │   ├── shared/
 │   │   ├── services/
 │   │   └── interfaces/
 │   └── app.component.*

Los principios aplicados para esta aplicación son los siguientes:

Separación de responsabilidades

Servicios para lógica de negocio y consumo de APIs

Arquitectura orientada a features

Interfaces compartidas

Componentes pequeños y testeables

Consumo de APIs y RxJS
Uso de Observables

Los servicios utilizan HttpClient y RxJS para manejar asincronía, encadenar peticiones, controlar errores, optimizar rendimiento

Ejemplo de técnicas usadas:

forkJoin para cargar múltiples recursos en paralelo

take(1) para evitar fugas de memoria

Cache interno en servicios para evitar llamadas innecesarias

En la sección de personajes se simula una paginación local sobre páginas reales de la API, se evita sobrecargar la API, se mantiene compatibilidad con MatPaginator de manera que esto permite controlar pageSize, manejar búsquedas sin romper el paginador, mantener estado consistente.

El proyecto cuenta con pruebas unitarias completas, enfocadas en:

Componentes pequeños, renderizado correcto de datos, uso de ChangeDetectionStrategy.OnPush, componentes de lista, llamadas a servicios, reacción a queryParams, manejo de estados vacíos, componentes de detalle, lectura de parámetros de ruta.

Técnicas de testing aplicadas:

RouterTestingModule

HttpClientTestingModule

fakeAsync + tick() para evitar tests intermitentes

NO_ERRORS_SCHEMA para aislar responsabilidades

Spies (spyOn) para verificar comportamiento sin acoplar tests

Importante:
El código no fue modificado para que los tests pasen.
Los tests se adaptaron al comportamiento real del componente, evitando romper funcionalidades como la búsqueda dinámica.

Instrucciones para ejecutar el proyecto
Instalar dependencias
npm install

Ejecutar la aplicación
ng serve

Acceder a:

http://localhost:4200

Ejecutar pruebas unitarias
ng test

Posibles Mejoras Futuras:

Manejo global de errores (Interceptor HTTP)

Estado global con NgRx o Signals

Mejoras de accesibilidad (ARIA)

Lazy loading por feature

Tests de integración / e2e

Skeleton loaders

Cache persistente (localStorage)

Internacionalización (i18n)