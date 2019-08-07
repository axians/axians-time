import { LitElement, TemplateResult, html, customElement, property } from 'lit-element';
import { DateTime } from 'luxon';

/**
 * A custom element to display a formatted time-stamp.
 */
@customElement('axians-time')
export class AxiansTime extends LitElement {

  /**
   * The time-stamp in ISO 8601 notation.
   */
  @property({
    type: String,
    reflect: true
  })
  public timestamp: string = DateTime.local().toISO();

  /**
   * The language code in ISO notation.
   */
  @property({
    type: String,
    reflect: true
  })
  public locale: string = 'en';

  /**
   * The format for the title attribute.
   */
  @property({
    type: Object,
    reflect: true,
    attribute: 'title-format'
  })
  public titleFormat: Intl.DateTimeFormatOptions = DateTime.DATETIME_FULL_WITH_SECONDS;

  /**
   * The format for display.
   */
  @property({
    type: Object,
    reflect: true,
    attribute: 'display-format'
  })
  public displayFormat: Intl.DateTimeFormatOptions = DateTime.DATETIME_SHORT;

  /**
   * Display relative time.
   */
  @property({
    type: Boolean,
    reflect: true
  })
  public relative: boolean = false;

  /**
   * Update timeout for relative time (in milliseconds).
   */
  @property({
    type: Number,
    reflect: true
  })
  public timeout: number = 5000;

  private interval: number;

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this.interval);
  }

  render(): TemplateResult {
    return html`
      <span title="${this.format(this.timestamp, this.titleFormat, this.locale)}">
        ${this.format(this.timestamp, this.displayFormat, this.locale, this.relative, this.timeout)}
      </span>
    `;
  }

  private format(timestamp: string, format: Intl.DateTimeFormatOptions, locale: string, relative: boolean = false, timeout: number = this.timeout): string | null {
    clearInterval(this.interval);
    const dt = DateTime.fromISO(timestamp).setLocale(locale);
    if (relative) {
      this.interval = setInterval(() => this.requestUpdate(), timeout);
      return dt.toRelative();
    } else {
      return dt.toLocaleString(format);
    }
  }

}
