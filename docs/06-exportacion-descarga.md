# Fase 6: Exportación y Descarga

> **Estado General:** ✅ Completado
> **Última actualización:** 2026-03-30
> **Dependencias:** Fase 4 completada

---

## 📋 Seguimiento de Ejecución

| # | Tarea | Estado | Fecha Inicio | Fecha Fin | Notas |
|---|-------|--------|-------------|-----------|-------|
| 6.1 | Implementar exportación a PNG | ✅ | 2026-03-30 | 2026-03-30 | `toPng` de html-to-image con pixelRatio configurable en `src/utils/export.ts` |
| 6.2 | Implementar exportación a SVG | ✅ | 2026-03-30 | 2026-03-30 | `toSvg` de html-to-image en `src/utils/export.ts` |
| 6.3 | Implementar exportación a PDF | ✅ | 2026-03-30 | 2026-03-30 | jsPDF + toPng 3x, centrado con título opcional, formato A4 en `src/utils/export.ts` |
| 6.4 | Agregar opciones de resolución/escala | ✅ | 2026-03-30 | 2026-03-30 | Segmented control 1×/2×/3× en ExportPanel |
| 6.5 | Agregar opción de fondo transparente | ✅ | 2026-03-30 | 2026-03-30 | Toggle en ExportPanel (solo PNG) |
| 6.6 | Crear panel de exportación en sidebar | ✅ | 2026-03-30 | 2026-03-30 | `ExportPanel` como tercer tab del panel derecho del editor |
| 6.7 | Crear hook useExport | ✅ | 2026-03-30 | 2026-03-30 | `useExport(chartRef)` en `src/hooks/useExport.ts` con estados isExporting/error |
| 6.8 | Pruebas de calidad de exportación | ✅ | 2026-03-30 | 2026-03-30 | Build TypeScript sin errores, dinámicas imports de html-to-image y jspdf |

---

## 6.1 Formatos de Exportación

| Formato | Librería | Uso Principal | Calidad |
|---------|---------|---------------|---------|
| **PNG** | html-to-image | Presentaciones, documentos, web | Rasterizada, configurable |
| **SVG** | html-to-image | Documentos profesionales, escalable | Vectorial, infinita |
| **PDF** | jsPDF + html-to-image | Informes, documentos formales | Alta |

---

## 6.2 Exportación a PNG

### Flujo

1. Capturar el elemento DOM del gráfico con `html-to-image`
2. Aplicar escala configurable (1x, 2x, 3x) para alta resolución
3. Opción de fondo transparente o con color
4. Descargar automáticamente como archivo `.png`

### Implementación Clave

```typescript
import { toPng } from 'html-to-image';

async function exportToPng(
  element: HTMLElement,
  options: { scale: number; backgroundColor?: string; filename: string }
) {
  const dataUrl = await toPng(element, {
    pixelRatio: options.scale,
    backgroundColor: options.backgroundColor || undefined,
    quality: 1.0,
  });

  // Crear link de descarga
  const link = document.createElement('a');
  link.download = `${options.filename}.png`;
  link.href = dataUrl;
  link.click();
}
```

### Opciones de Escala

| Escala | Resolución | Uso Recomendado |
|--------|-----------|------------------|
| 1x | Tamaño original | Web, previews |
| 2x | Doble resolución | Presentaciones |
| 3x | Triple resolución | Impresión, documentos profesionales |

---

## 6.3 Exportación a SVG

### Flujo

1. Capturar el SVG del gráfico con `html-to-image`
2. Generar código SVG limpio y válido
3. Descargar como archivo `.svg`

```typescript
import { toSvg } from 'html-to-image';

async function exportToSvg(element: HTMLElement, filename: string) {
  const dataUrl = await toSvg(element);
  const link = document.createElement('a');
  link.download = `${filename}.svg`;
  link.href = dataUrl;
  link.click();
}
```

### Ventajas del SVG

- Escala infinita sin pérdida de calidad
- Editable en software como Illustrator, Figma, Inkscape
- Ideal para documentos que pueden imprimirse a cualquier tamaño

---

## 6.4 Exportación a PDF

### Flujo

1. Generar imagen PNG del gráfico (a 3x para máxima calidad)
2. Crear documento PDF con jsPDF
3. Insertar imagen centrada en la página
4. Agregar título y metadatos opcionales
5. Descargar como archivo `.pdf`

```typescript
import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';

async function exportToPdf(
  element: HTMLElement,
  options: { title: string; orientation: 'portrait' | 'landscape'; filename: string }
) {
  // 1. Capturar a PNG de alta resolución
  const imgData = await toPng(element, { pixelRatio: 3, quality: 1.0 });

  // 2. Crear PDF
  const pdf = new jsPDF({
    orientation: options.orientation,
    unit: 'mm',
    format: 'a4',
  });

  // 3. Calcular dimensiones
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  // ... calcular proporciones

  // 4. Agregar título si existe
  if (options.title) {
    pdf.setFontSize(16);
    pdf.text(options.title, pageWidth / 2, 20, { align: 'center' });
  }

  // 5. Insertar imagen centrada
  pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);

  // 6. Descargar
  pdf.save(`${options.filename}.pdf`);
}
```

---

## 6.5 Panel de Exportación

### Interfaz

```
┌───────────────────────────────────────┐
│  📥 Exportar Gráfico                  │
├───────────────────────────────────────┤
│                                        │
│  Nombre del archivo:                   │
│  [mi-grafico                    ]      │
│                                        │
│  ── Formato ──                         │
│  ┌────────┐ ┌────────┐ ┌────────┐     │
│  │  PNG   │ │  SVG   │ │  PDF   │     │
│  │ 🖼️    │ │ ✏️    │ │ 📄    │     │
│  └────────┘ └────────┘ └────────┘     │
│                                        │
│  ── Opciones PNG ──                    │
│  Escala:  [1x] [2x] [3x●]            │
│  Fondo:   [Con color] [Transparente]  │
│                                        │
│  ── Opciones PDF ──                    │
│  Orientación: [Horizontal●] [Vertical]│
│  Incluir título: [✓]                  │
│                                        │
│  [📥 Descargar]                        │
│                                        │
└───────────────────────────────────────┘
```

---

## 6.6 Hook `useExport`

### Responsabilidades

```typescript
function useExport(chartRef: RefObject<HTMLDivElement>) {
  return {
    exportToPng: (options) => Promise<void>,
    exportToSvg: (filename) => Promise<void>,
    exportToPdf: (options) => Promise<void>,
    isExporting: boolean,   // Estado de carga
    error: string | null,   // Error si falla
  };
}
```

### Estados durante exportación

1. **Idle**: Botón habilitado, sin indicador
2. **Exporting**: Botón deshabilitado, spinner, texto "Generando..."
3. **Success**: Toast de confirmación "Gráfico descargado ✓"
4. **Error**: Toast de error con mensaje descriptivo

---

## 6.7 Consideraciones de Calidad

| Aspecto | Solución |
|---------|----------|
| Fuentes en exportación | Asegurar que las fuentes se incrusten en el SVG |
| Resolución PNG | Mínimo 2x para presentaciones (recomendado 3x) |
| Colores en PDF | Verificar que los colores se preserven |
| Fondo transparente | Solo disponible para PNG y SVG |
| Tamaño de archivo | PNG 3x puede ser grande; informar al usuario |

---

> [!NOTE]
> La exportación es una funcionalidad crítica ya que es el propósito final de la herramienta. Debe funcionar de manera confiable en todos los tipos de gráficos.

> [!TIP]
> Siguiente paso: [Fase 7: Pruebas y Optimización](./07-pruebas-optimizacion.md)
