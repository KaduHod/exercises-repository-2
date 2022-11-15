import { getPage } from "./Service/getPage.js";
import { readFile, writeFile} from 'fs/promises'
import { mainHandler } from "./Service/getExercicesLinksHandler.js";


const main = (async () => {
    let links = JSON.parse(await readFile('data/list-of-regions.json', 'utf8'));
    const resultAll = []
    for await (const link of links){
        
        resultAll.push(JSON.stringify(await getPage(link, mainHandler)))
    }
    await writeFile('data/exercises-links.json', resultAll);
})()