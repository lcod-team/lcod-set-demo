import { parseStringPromise } from "xml2js";

export default async function ({ edition }) {
    if (edition) {
        edition = `_${edition}`;
    }
    let res = await fetch(`http://rss.cnn.com/rss/edition${edition}.rss`);
    res = await res.text();
    res = await parseStringPromise(res);
    res = res.rss?.channel?.[0]?.item.map(item => {
        const image = item['media:content'] ? item : item['media:group']?.[0];
        return {
            title: item.title?.[0] ?? '',
            description: item.title?.[0] ?? '',
            link: item.link?.[0] ?? '',
            image: image['media:content']?.[0]?.['$']?.url ?? ''
        };
    });
    return res;
}