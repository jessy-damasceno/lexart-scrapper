import axios from 'axios';
import { JSDOM } from 'jsdom';
import IProduct from '../interfaces/IProduct';
import IScrapper from '../interfaces/IScrapper';

async function meliScrapper(category: string): Promise<IProduct[]> {
  const response = await axios.get(`https://lista.mercadolivre.com.br/${category}`);
  const dom = new JSDOM(response.data);
  const productsUrls = Array.from(
    dom.window.document.querySelectorAll('.ui-search-layout__item div.ui-search-result__image.shops__picturesStyles > a')
  ) as HTMLAnchorElement[];
  return Array.from(dom.window.document.querySelectorAll('.ui-search-layout__item')).map((product, i) => ({
    photo:
      product.querySelector('img[data-src]')?.getAttribute('data-src') ||
      product.querySelector('img')?.getAttribute('src') ||
      '',
    description:
      product.querySelector('.ui-search-item__title')?.textContent || '',
    price:
      product.querySelector('.ui-search-price__second-line .price-tag-fraction')?.textContent || '',
    link: productsUrls[i].href || '',
    category,
  })) as IProduct[];
}

async function buscapeScrapper(category: string): Promise<IProduct[]> {
  const url = `https://www.buscape.com.br/`
  const response = await axios.get(`${url}${category}`);
  const dom = new JSDOM(response.data, { runScripts: "dangerously" });
  const productsUrls = Array.from(
    dom.window.document.querySelectorAll('.Card_Card__LsorJ > a')
  ) as HTMLAnchorElement[];
  return Array.from(dom.window.document.querySelectorAll('.Card_Card__LsorJ')).map((product, i) => ({
    photo:
      product.querySelector('noscript')?.textContent?.match(/src="([^"]*)"/)?.[1] ||
      product.querySelector('img')?.getAttribute('src') ||
      '',
    description: product.querySelector('h2')?.textContent || '',
    price:
      product.querySelector('[role="button"] .Text_Text__h_AF6.Text_MobileHeadingS__Zxam2')?.textContent?.replace(/[^0-9\.-]+/,'') || '',
    link: `${url}${productsUrls[i].href}` || '',
    category,
  })) as IProduct[];
}

async function mergeInfo(category: string): Promise<IProduct[]> {
  const mercadoLivre = await meliScrapper(category);
  const buscape = await buscapeScrapper(category);
  return [...mercadoLivre, ...buscape];
}

export async function infoScrapper({
  url,
  category,
}: IScrapper): Promise<IProduct[]> {
  switch (url) {
    case 'mercadolivre':
      return meliScrapper(category);
    case 'buscape':
      return buscapeScrapper(category);
    default:
      return mergeInfo(category);
  }
}

infoScrapper({ url: 'buscape', category: 'celular' });