import axios from 'axios';
import cheerio from 'cheerio';

export async function getHtml(url) {
    const html = await axios.get(url);
    return html.data;
}

export default async function getWords(url, selector) {
    const html = await getHtml(url);
    const $ = cheerio.load(html);

    const words = [];
    $(selector).each(function(i, el) {
        words[i] = $(this).text();
    });

    return words;
}

export async function getAlmaanyWords(category, language = 'English') {
    const url = encodeURI(
        // `https://www.almaany.com/appendix.php?language=arabic&category=${category}&lang_name=${language}`,
        `https://www.almaany.com/appendix.php?page=1&category=${category}&lang_name=${language}`,
    );
    const almaanyWords = await getWords(url, 'td.trtable3 a');
    console.log(almaanyWords)
    return almaanyWords;
}

export async function getRandomWords() {
    const url = 'https://www.bestrandoms.com/random-arabic-words';
    const randomWords = await getWords(url, 'p.text-center.font-18');

    return randomWords;
}

export async function getKalmasoftWords(url) {
    const randomWords = await getWords(url, 'tr td.Adictoutput');
    console.log(randomWords)
    return randomWords;
}
