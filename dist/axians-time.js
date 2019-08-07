var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { LitElement, html, customElement, property } from 'lit-element';
import { DateTime } from 'luxon';
/**
 * A custom element to display a formatted time-stamp.
 */
let AxiansTime = class AxiansTime extends LitElement {
    /**
     * A custom element to display a formatted time-stamp.
     */
    constructor() {
        super(...arguments);
        /**
         * The time-stamp in ISO 8601 notation.
         */
        this.timestamp = DateTime.local().toISO();
        /**
         * The language code in ISO notation.
         */
        this.locale = 'en';
        /**
         * The format for the title attribute.
         */
        this.titleFormat = DateTime.DATETIME_FULL_WITH_SECONDS;
        /**
         * The format for display.
         */
        this.displayFormat = DateTime.DATETIME_SHORT;
        /**
         * Display relative time.
         */
        this.relative = false;
        /**
         * Update timeout for relative time (in milliseconds).
         */
        this.timeout = 5000;
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        clearInterval(this.interval);
    }
    render() {
        return html `
      <span title="${this.format(this.timestamp, this.titleFormat, this.locale)}">
        ${this.format(this.timestamp, this.displayFormat, this.locale, this.relative, this.timeout)}
      </span>
    `;
    }
    format(timestamp, format, locale, relative = false, timeout = this.timeout) {
        clearInterval(this.interval);
        const dt = DateTime.fromISO(timestamp).setLocale(locale);
        if (relative) {
            this.interval = setInterval(() => this.requestUpdate(), timeout);
            return dt.toRelative();
        }
        else {
            return dt.toLocaleString(format);
        }
    }
};
__decorate([
    property({
        type: String,
        reflect: true
    }),
    __metadata("design:type", String)
], AxiansTime.prototype, "timestamp", void 0);
__decorate([
    property({
        type: String,
        reflect: true
    }),
    __metadata("design:type", String)
], AxiansTime.prototype, "locale", void 0);
__decorate([
    property({
        type: Object,
        reflect: true,
        attribute: 'title-format'
    }),
    __metadata("design:type", Object)
], AxiansTime.prototype, "titleFormat", void 0);
__decorate([
    property({
        type: Object,
        reflect: true,
        attribute: 'display-format'
    }),
    __metadata("design:type", Object)
], AxiansTime.prototype, "displayFormat", void 0);
__decorate([
    property({
        type: Boolean,
        reflect: true
    }),
    __metadata("design:type", Boolean)
], AxiansTime.prototype, "relative", void 0);
__decorate([
    property({
        type: Number,
        reflect: true
    }),
    __metadata("design:type", Number)
], AxiansTime.prototype, "timeout", void 0);
AxiansTime = __decorate([
    customElement('axians-time')
], AxiansTime);
export { AxiansTime };
//# sourceMappingURL=axians-time.js.map