# agents-reels

Videos para Reels de Publifix LABS

Proyecto [Remotion](https://www.remotion.dev/) para generar videos de Instagram
Reels (1080x1920) de forma sistemática, mostrando una conversación simulada
entre un cliente y un agente de IA.

## Requisitos

- Node.js 18 o superior (ver `.nvmrc`)

## Uso

```bash
npm install
npm run dev      # abre Remotion Studio para previsualizar la composición AgentReel
npm run build    # genera el bundle de producción
npx remotion render AgentReel out/video.mp4   # renderiza un video
```

## Composición `AgentReel`

Definida en `src/AgentReel.tsx` y registrada en `src/Root.tsx`. Props principales:

- `backgroundVideoSrc`: ruta del video de fondo dentro de `public/` (ej.
  `videos/mi-fondo.mp4`). Si el archivo no existe todavía, la composición usa
  automáticamente un color sólido de fallback (`#2A2A2A`) para poder
  previsualizar sin errores.
- `clientName` (opcional): si no se especifica, se elige un nombre al azar
  según `clientGender` desde `src/data/names.ts`.
- `clientGender`: `"female"` | `"male"`.
- `businessName`: nombre del negocio, usado para el label del agente
  (`"{businessName} Agent"`).
- `messages`: arreglo de mensajes `{ sender, text, appearAtFrame }` que arma
  la conversación en cascada.
- `closingLine` / `websiteUrl`: textos de la pantalla de cierre.

La duración por defecto es 270 frames a 30fps (9s), con los últimos 90 frames
(3s) reservados para la pantalla de cierre. Ambos valores son configurables en
`src/Root.tsx` (`DEFAULT_DURATION_IN_FRAMES`) y `src/AgentReel.tsx`
(`CLOSING_DURATION_IN_FRAMES`).
