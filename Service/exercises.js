import { mainHandler } from './getExercicesLinksHandler.js';
import { readFile, writeFile} from 'fs/promises';
import { getPage } from "./getPage.js";

const getAllExercises = async () => {
    let links = JSON.parse(await readFile('data/list-of-regions.json', 'utf8'));
    const resultAll = []
    for await (const link of links){
        resultAll.push(JSON.stringify(await getPage(link, mainHandler)))
    }
    await writeFile('data/exercises-links.json', resultAll);
}

getAllExercises()