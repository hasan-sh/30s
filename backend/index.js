import { getAlmaanyWords, getKalmasoftWords, getRandomWords } from './lib/scraper';
import express from 'express';
import db from './db.js';

const app = express();

app.get('/almaany', async (req, res) => {
    console.log(req.query)
    if (!req.query.category) return res.status(400).send('Bad Request');

    const category = req.query.category;
    const almaany = await getAlmaanyWords(category);
    const elements = almaany.map((e) => `<h1>${e}</h1>`).join('');

    db.set(`almaany.${category}`, almaany)
        .flatten()
        .write();

    res.setHeader('Content-Type', 'text/html');
    res.send(elements);
});

app.get('/random', async (req, res) => {
    const random = await getRandomWords();
    console.log('RANDOM', random)
    const elements = random.map((e) => `<h1>${e}</h1>`).join('');

    const value = db.get('random').value();
    const data = random.filter((r) => {
        const exist = value.find((v) => v === r);
        return !exist;
    });
    db.get('random')
        .push(...random)
        .uniq()
        .write();

    res.setHeader('Content-Type', 'text/html');
    res.send(elements);
});


app.get('/kalma', async (req, res) => {
    const url = 'http://www.kalmasoft.com/KLEX/adcmedic.htm';
    const category = 'medic'

    const words = await getKalmasoftWords(url);
    console.log('Kalma', words)
    const elements = words.map((e) => `<h1>${e}</h1>`).join('');

    db.set(`kalma.${category}`, words)
        .flatten()
        .write();

    res.setHeader('Content-Type', 'text/html');
    res.send(elements);
    
})

app.set('json spaces', 2);
app.get('/', (req, res) => {
    const data = db.value();
    // res.setHeader('Content-Type', 'application/json');
    res.json(data);
})
const server = app.listen(2019, () =>
    console.log('listening on ', server.address().port),
);