import { LitElement, TemplateResult } from 'lit-element';
/**
 * A custom element to display a formatted time-stamp.
 */
export declare class AxiansTime extends LitElement {
    /**
     * The time-stamp in ISO 8601 notation.
     */
    timestamp: string;
    /**
     * The language code in ISO notation.
     */
    locale: string;
    /**
     * The format for the title attribute.
     */
    titleFormat: Intl.DateTimeFormatOptions;
    /**
     * The format for display.
     */
    displayFormat: Intl.DateTimeFormatOptions;
    /**
     * Display relative time.
     */
    relative: boolean;
    /**
     * Update timeout for relative time (in milliseconds).
     */
    timeout: number;
    private interval;
    disconnectedCallback(): void;
    render(): TemplateResult;
    private format;
}
