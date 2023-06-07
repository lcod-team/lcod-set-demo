import { XMLParser } from "fast-xml-parser";

export default async function ({ edition, limit }) {
    let res = await fetch(`https://www.wired.com/feed/${edition}/latest/rss`);
    res = await res.text();
    res = new XMLParser({ ignoreAttributes: false }).parse(res);
    limit = Number.parseInt(limit);
    res = res.rss?.channel?.item.filter((v, i) => Number.isNaN(limit) || i < limit).map(item => {
        return {
            title: item.title ?? '',
            description: item.description ?? '',
            link: item.link ?? '',
            image: item['media:thumbnail']?.['@_url'] ?? ''
        };
    });
    return res;
}