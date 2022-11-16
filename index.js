import { getPage } from "./Service/getPage.js";
import { readFile, writeFile} from 'fs/promises'
import { mainHandler } from "./Service/getExercicesLinksHandler.js";
import {handlerExercise} from './Service/exerciseInfo.js'

const main = (async () => {
    let links = JSON.parse(await readFile('data/exercises.json','utf8'));
    let exercisesInfo = []
    let cont = 1;
    for await (const link of links){
        console.log('inciando ' , link, `CONTADOR:${cont}`)
        const data = await getPage(link, handlerExercise)
        exercisesInfo.push(data)
        console.log('\t\t terminei')
        cont++
    }
    await writeFile('exercises-info.json', JSON.stringify(exercisesInfo));
})()