import type { TableColumn, TableData } from '@/types';

const NUMBER_LIKE = /^-?[\d]+(?:[.,]\d+)?$/;

function detectSeparator(text: string): '\t' | ',' | ';' | '|' {
  // Cuenta ocurrencias de separadores comunes en la primera línea no vacía
  const firstLine = text.split(/\r?\n/).find((l) => l.trim().length > 0) ?? '';
  const counts: Record<string, number> = {
    '\t': (firstLine.match(/\t/g) || []).length,
    ',': (firstLine.match(/,/g) || []).length,
    ';': (firstLine.match(/;/g) || []).length,
    '|': (firstLine.match(/\|/g) || []).length,
  };
  const winner = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  if (!winner || winner[1] === 0) return '\t';
  return winner[0] as '\t' | ',' | ';' | '|';
}

/** Parsea una línea respetando comillas dobles (CSV-aware) */
function parseLine(line: string, sep: string): string[] {
  const out: string[] = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === sep && !inQuotes) {
      out.push(cur);
      cur = '';
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out.map((c) => c.trim());
}

/** Convierte un valor de celda a string|number según parezca numérico */
function coerce(value: string): string | number {
  const v = value.trim();
  if (v === '') return '';
  // Acepta coma decimal: "1.234,56" o "1,234.56" — heurística: si tiene ambas, la última es decimal
  const normalized = (() => {
    const hasDot = v.includes('.');
    const hasComma = v.includes(',');
    if (hasDot && hasComma) {
      // El último separador es el decimal
      const lastDot = v.lastIndexOf('.');
      const lastComma = v.lastIndexOf(',');
      if (lastComma > lastDot) {
        return v.replace(/\./g, '').replace(',', '.');
      }
      return v.replace(/,/g, '');
    }
    if (hasComma && !hasDot) {
      // Si la coma es el único separador y solo hay una con 1-3 dígitos después, es decimal
      const parts = v.split(',');
      if (parts.length === 2 && parts[1].length <= 3) return v.replace(',', '.');
      return v.replace(/,/g, '');
    }
    return v;
  })();
  if (NUMBER_LIKE.test(normalized.replace(/\./g, ''))) {
    const n = Number(normalized);
    if (Number.isFinite(n)) return n;
  }
  if (Number.isFinite(Number(normalized))) return Number(normalized);
  return value;
}

/** Heurística: una fila se considera header si todas sus celdas son texto y la siguiente fila tiene al menos un número */
function detectHeader(rows: string[][]): boolean {
  if (rows.length < 2) return false;
  const firstAllText = rows[0].every((c) => c !== '' && !NUMBER_LIKE.test(c.replace(/[.,]/g, '')));
  const secondHasNumber = rows[1].some((c) => {
    const coerced = coerce(c);
    return typeof coerced === 'number';
  });
  return firstAllText && secondHasNumber;
}

function makeId(prefix: string): string {
  return `${prefix}${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Parsea texto pegado (CSV/TSV) a TableData con detección automática
 * de separador, header y tipo de columna.
 */
export function parseTabular(text: string): TableData | null {
  const cleaned = text.replace(/\r/g, '').trimEnd();
  if (!cleaned) return null;

  const sep = detectSeparator(cleaned);
  const lines = cleaned.split('\n').filter((l) => l.length > 0);
  if (lines.length === 0) return null;

  const grid = lines.map((l) => parseLine(l, sep));

  // Normaliza al máximo número de columnas
  const maxCols = Math.max(...grid.map((r) => r.length));
  for (const row of grid) {
    while (row.length < maxCols) row.push('');
  }

  const hasHeader = detectHeader(grid);
  const headerRow = hasHeader ? grid[0] : null;
  const dataRows = hasHeader ? grid.slice(1) : grid;

  // Determinar tipo de cada columna mirando los datos
  const columnTypes: ('text' | 'number')[] = [];
  for (let c = 0; c < maxCols; c++) {
    let numericCount = 0;
    let nonEmptyCount = 0;
    for (const row of dataRows) {
      const v = row[c];
      if (v === undefined || v === '') continue;
      nonEmptyCount++;
      if (typeof coerce(v) === 'number') numericCount++;
    }
    columnTypes.push(nonEmptyCount > 0 && numericCount / nonEmptyCount >= 0.7 ? 'number' : 'text');
  }

  const columns: TableColumn[] = columnTypes.map((type, i) => ({
    id: makeId('c'),
    label: headerRow ? headerRow[i] || `Columna ${i + 1}` : `Columna ${i + 1}`,
    type,
    align: type === 'number' ? 'right' : 'left',
  }));

  const rows: (string | number)[][] = dataRows.map((row) =>
    row.map((cell, i) => (columnTypes[i] === 'number' ? coerce(cell) : cell)),
  );

  return {
    columns,
    rows,
    showTotal: false,
    totalLabel: 'Total',
  };
}

/** Genera un ID único para columnas nuevas */
export function newColumnId(): string {
  return makeId('c');
}
