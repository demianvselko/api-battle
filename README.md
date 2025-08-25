# 📌 - ⚔️ Api Battle – Documento de Proyecto (Draft v1)

Plataforma de batallas entre personajes obtenidos de APIs (PokeAPI, DigiAPI; futuras: DBZ, Marvel). Modalidades 1v1 y 3v3, casual y torneo.

## 🎯 MVP

- Frontend React (pantalla 1v1 simple) + Backend Node/TS.
- Motor de batalla 1v1 con reglas:
  - Poder especial disponible desde el 3er ataque.
  - Ventaja elemental: +25% defensa.
  - Resultado: victoria/derrota/empate/no vale la pena luchar (diferencia de powerLevel ≥ 10).
- Endpoint `POST /api/battle/1v1`.
- Historial/log de turnos en la respuesta.

## 🧱 Arquitectura

- **Hexagonal** en backend (domain, application, infrastructure, interfaces).
- Monorepo (workspaces): `apps/backend`, `apps/frontend`.

## 🧪 Calidad

- ESLint + Prettier + Husky + Commitlint + lint-staged.
- Tests unitarios (Jest).
- CI (GitHub Actions).
- Docker (dev y tests de backend).

## 🚀 Scripts

- `npm run dev -w apps/backend` – API en :4000
- `npm run dev -w apps/frontend` – Web en :5173
- `npm run test` – Tests
- `docker compose up --build backend` – Backend en Docker

---

## 🎯 Objetivo

Aplicación de batallas entre personajes obtenidos desde APIs externas (ej: PokeAPI, DigiAPI, Dragon Ball API, Marvel API).

- Los usuarios podrán jugar como visitantes (modo temporal) o loguearse con credenciales propias o sociales.
- Se soportarán batallas casuales, torneos y modalidades 1v1 o 3v3.

---

## 🖥️ Stack Tecnológico

### Frontend (Microfrontends)

- **React.js / React Native** (mobile-first)
- **Webpack 5** con Module Federation
- Posible **PWA** si se opta por React web

---

### Backend (Arquitectura Hexagonal)

- **TypeScript**
- **BFF** (Backend For Frontend) para mobile/web
- **API Gateway** con validación JWT

---

### Autenticación

- **JWT + Refresh Token**
- **OAuth2** (Google, Facebook)
- Mensajería: **Nodemailer** (contacto), opcional **AWS SES**

---

## 🔐 Roles de Usuario

- **Admin:** gestiona usuarios, batallas, torneos, auditoría.
- **Jugador:** crea/edita personajes, juega batallas y torneos.
- **Visitante:** juega batallas temporales sin persistencia.

---

## 👤 Autenticación y Seguridad

- Registro/Login (propio, Google, Facebook)
- Tokens JWT + Refresh Token
- API Gateway con validación obligatoria
- Visitantes: acceso limitado con almacenamiento local (localStorage / sessionStorage)

---

## 🎮 Juego

### Personajes

- **Fuente:** APIs externas.
- **Modelo de datos base:**

    ```typescript
    {
        id: string,
        name: string,
        type: string,
        element: string,
        evolution: boolean,
        fusion: string,
        image: string,
        life: number,
        attack: number,
        defense: number,
        ability: string,
        powerSpecial: string,
        powerLevel: number,
        locality: string,
        stats: {
            wins: number,
            losses: number,
            draws: number
        }
    }
    ```

- Si los valores no existen en la API, se asignan por defecto, al azar o definidos manualmente.

---

### Batallas

- **Modelo:**

    ```typescript
    {
        id: string,
        tipo: "1v1" | "3v3",
        modo: "casual" | "torneo",
        participantes: Personaje[],
        locality: string,
        resultado: "victoria" | "derrota" | "empate" | "no vale la pena luchar",
        fecha: Date
    }
    ```

- **Reglas:**
  - Individual: `(attackP1 - defenseP2) - lifeP2`
  - Poder especial: disponible a partir del 3er ataque
  - Ventaja elemental: +25% en defensa
  - Si ambos llegan a 0 al mismo tiempo → empate
  - Si ambos < 0 → gana el que tenía menos vida

- **Grupal (3v3):**
  - Orden de enfrentamiento: al azar, por defecto (poder vs poder) o definido por usuario
  - Personajes sobrevivientes pueden seguir luchando en rondas posteriores

- **Torneos:**
  - Fase de grupos + eliminación directa
  - Máx. 32 personajes
  - Personajes eliminados esperan un turno para reingresar

---

## 🗄️ Persistencia

- Por definir DB. Opciones:
  - **Relacional (Postgres/MySQL):** torneos, usuarios, batallas
  - **NoSQL (MongoDB/DynamoDB):** datos de personajes y stats dinámicos
  - Posibilidad de usar ambas según el módulo (hexagonal facilita el cambio)
  - Visitantes → datos temporales en frontend

---

## 📱 Pantallas

- **Welcome**
- **Main Dashboard**

### Auth

- Login/Signin (normal + social)
- Editar perfil

### Battle

- Crear equipo
- Editar equipo
- Iniciar batalla
- Historial de batallas

### Personaje

- Elegir personaje
- Editar personaje

### Contacto

- Enviar mensaje
- Solicitar contacto

---

## 🚀 Extras a implementar

- Sistema de niveles y progresión
- Leaderboard global
- Chat/lobby para torneos
- Notificaciones push/email
- Modo espectador
- Logs/auditoría (acciones y batallas)
- Test unitarios e integración (mocha/jest)

---

## 🏗️ Arquitectura (High-Level)

### Frontend (Microfrontends)

- **Auth:** login, registro, perfil
- **Battle:** creación equipos, batallas, torneos
- **Characters:** personajes
- **Contact:** mensajería

---

### Backend (Hexagonal)

- **Core domain:** personajes, batallas, torneos
- **Adapters:** APIs externas (PokéAPI, DigiAPI, etc.), DB, email
- **Application services:** lógica de batalla, reglas torneo
- **Infra:** API Gateway, autenticación, mensajería
