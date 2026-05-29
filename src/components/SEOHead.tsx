import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  jsonLd?: Record<string, unknown>;
}

export function SEOHead({ title, description, keywords, canonical, jsonLd }: SEOProps) {
  useEffect(() => {
    document.title = title;
    setMeta('description', description);
    if (keywords) setMeta('keywords', keywords);
    if (canonical) setLink('canonical', canonical);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);

    if (jsonLd) {
      let script = document.getElementById('json-ld-seo') as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script') as HTMLScriptElement;
        script.id = 'json-ld-seo';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    }
  }, [title, description, keywords, canonical, jsonLd]);

  return null;
}

function setMeta(name: string, content: string, isProperty = false) {
  const attr = isProperty ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}
