import { html, fixture, expect } from '@open-wc/testing';
import { DateTime } from 'luxon';
import '../dist/axians-time.js';

describe('axians-time', () => {
  it('has by default a non-null timestamp', async () => {
    const el = await fixture(html`<axians-time></axians-time>`);
    expect(el.getAttribute('timestamp')).to.not.be.null;
  });
  it('renders with default formats', async () => {
    const dt = DateTime.local();
    const el = await fixture(html`<axians-time timestamp="${dt.toISO()}"></axians-time>`);
    expect(el).shadowDom.to.equal(
      '<span title="' + dt.toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS) + '">' + dt.toLocaleString(DateTime.DATETIME_SHORT) + '</span>'
    );
  });
  it('renders relative time', async () => {
    const dt = DateTime.local();
    const timeout = 1100;
    const el = await fixture(html`<axians-time timestamp="${dt.toISO()}" relative timeout="${timeout}"></axians-time>`);
    expect(el).shadowDom.to.equal(
      '<span>' + dt.toRelative() + '</span>',
      { ignoreAttributes: [ 'title' ] }
    );
    return new Promise(resolve => {
      setTimeout(() => {
        expect(el).shadowDom.to.equal(
          '<span>' + dt.toRelative() + '</span>',
          { ignoreAttributes: [ 'title' ] }
        );
        resolve();
      }, timeout + 400);
    });
  });
});
