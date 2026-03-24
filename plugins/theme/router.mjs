import createNodeSlugger from '@node-core/doc-kit/src/generators/metadata/utils/slugger.mjs';
import { ModuleRouter } from 'typedoc-plugin-markdown';

const sluggers = new Map([]);

export class DocKitRouter extends ModuleRouter {
  /** @param {import('typedoc').RouterTarget} pageTarget */
  getSlugger(pageTarget) {
    if (sluggers.has(pageTarget)) {
      return sluggers.get(pageTarget);
    } else {
      const slugger = createNodeSlugger();
      sluggers.set(pageTarget, slugger);
      return slugger;
    }
  }

  /** @param {import('typedoc').RouterTarget} target */
  getAnchor(target) {
    const fullName = target.getFullName();
    const parts = fullName.split('.');

    let pageOwner = target;
    while (pageOwner && !this.hasOwnDocument(pageOwner)) {
      pageOwner = pageOwner.parent;
    }

    const page = pageOwner ? this.getFullUrl(pageOwner).split('#')[0] : '';

    // target is the page owner itself — no anchor needed
    if (pageOwner === target) return '';

    const isGlobal = page === 'globals.html' || page === 'globals.md';

    return (isGlobal ? parts : parts.slice(1)).join('-').toLowerCase();
  }

  /** @param {import('typedoc').RouterTarget} target */
  getAnchoredURL(target) {
    const anchor = this.getAnchor(target);
    const [page] = this.getFullUrl(target).split('#');

    return anchor ? `${page}#${anchor}` : page;
  }
}
