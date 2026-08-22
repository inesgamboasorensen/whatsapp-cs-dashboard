# `data.json` — contrato de datos del dashboard

El dashboard (`index.html`) **no contiene datos**: los lee de `data.json` al cargar.
Publicar una medición nueva = reemplazar este archivo. El HTML no se toca.

Antes los números estaban horneados en ~26 lugares del HTML y solo podía
actualizarlos quien conocía el archivo. Esa es la razón de este cambio.

## Cómo se actualiza

```bash
cd ../whatsapp_analysis
bash rerun.sh                                # 1. mitad mecánica (descarga + métricas)
python3 update_dashboard_data.py --check     # 2. ver qué cambiaría
python3 update_dashboard_data.py             # 3. escribir las secciones mecánicas
```

Luego, en Claude Code: **"finish the WhatsApp analysis"** para la mitad de juicio.

## Las 17 secciones

`update_dashboard_data.py` escribe las **mecánicas**; las de **juicio** las produce
Claude leyendo conversaciones y no son scriptables.

| Sección | Tipo | Origen |
|---|---|---|
| `PERIOD`, `PERIOD_NEW` | juicio | etiquetas de periodo que se muestran en el encabezado |
| `runsMeta` | juicio | nº de corridas, fecha y subtítulos de las tarjetas del resumen |
| `metricsMonthly` | mecánico | `metrics.json` → `by_month` |
| `writingQuality` | mecánico | `metrics.json` → `by_agent[*].writing` |
| `responseTimes` | mecánico | `metrics.json` → `by_agent` |
| `activityData` | mecánico | `activity.json` (horarios de atención) |
| `volumeData` | mecánico | `volume.json` (mensajes por CS) |
| `contractHandling` | mecánico | `contract_handling.json` |
| `resolutionMonthly` | mecánico | `resolution_monthly.json` |
| `agentRanking` | juicio | % de frustración por agente y por corrida |
| `resolutionData` | juicio | resolución por agente (acumulado) |
| `topRequests` | juicio | temas más pedidos |
| `frustrationSeverity`, `frustrationCauses` | juicio | severidad y causas |
| `problemEvolution` | juicio | problemas que bajaron / desaparecieron / nuevos |
| `improvementAreas` | juicio | áreas de mejora priorizadas |

## Reglas

- **Nombres de agente** → `whatsapp_analysis/agent_names.json`. No los corrijas a mano
  aquí: el pipeline los volvería a escribir distinto la próxima corrida.
- **Sin PII.** `data.json` es público (Netlify). Lleva nombres de agentes y números
  agregados — **nunca** texto de conversaciones ni teléfonos de brokers. El texto
  vive en `whatsapp_analysis/whatsapp.db`, que está fuera de git.
- `overviewStats` **no** está aquí: es presentación derivada de `runsMeta`, vive en el HTML.
- Si `data.json` no carga, el dashboard muestra un error explícito en vez de una
  página en blanco.

## Prueba local

```bash
python3 serve.py     # http://localhost:5173
```

Abrir `index.html` directo desde el disco **no funciona**: el navegador bloquea
el `fetch` de `data.json` en `file://`.
