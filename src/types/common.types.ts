export type ValidationStatus = 'pending' | 'valid' | 'invalid';

export type Result<R, E = unknown> = { type: 'success'; value: R } | { type: 'failure'; error: E };

export type VerticalAlignment = 'top' | 'middle' | 'bottom';
export type HorizontalAlignment = 'left' | 'center' | 'right';
