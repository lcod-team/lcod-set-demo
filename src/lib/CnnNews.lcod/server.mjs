import { XMLParser } from "fast-xml-parser";

export default async function ({ edition }) {
    if (edition) {
        edition = `_${edition}`;
    }
    let res = await fetch(`http://rss.cnn.com/rss/edition${edition}.rss`);
    res = await res.text();
    res = new XMLParser({ ignoreAttributes: false }).parse(res);
    res = res.rss?.channel?.item.map(item => {
        const image = item['media:content'] ? item : item['media:group'];
        return {
            title: item.title ?? '',
            description: item.description ?? '',
            link: item.link ?? '',
            image: image['media:content']?.[0]?.['@_url'] ?? ''
        };
    });
    return res;
}