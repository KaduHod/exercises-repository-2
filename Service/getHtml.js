import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import fs from 'fs'
import axios from 'axios'
import {handlerExercise} from './exerciseInfo.js'
import { JSDOM } from 'jsdom'

const getFileOfExercises = async () => {
    if (!fs.existsSync('foo.txt')) await writeFile('./data/exercises-info-final.json', JSON.stringify([]));
    return JSON.parse(await readFile('./data/exercises-info-final.json'));
}


const getFileNames = async () => {
    return JSON.parse(await readFile('./data/exercises2.json'));
}

const findIndexOfLastExercise = async () => {
    return JSON.parse(await readFile('./data/exercises-info-final.json')).length
}

const getSiteData = async link => {
    const {data} = await axios.get(link)
    let article =  data
    const dom = new JSDOM(article).window    
    const result = handlerExercise(dom)
    result.link = link;
    return result
}

const addExercise = async exercise => {
    let exercisesRegistered = await readFile('./data/exercises-info-final.json')
    exercisesRegistered = JSON.parse(exercisesRegistered)
    exercisesRegistered.push({exercise})
    await writeFile('./data/exercises-info-final.json', JSON.stringify(exercisesRegistered))
}

const main = async () => {
    const linkNames = await getFileNames();
    let cont = 0;
    for await (const link of linkNames){
        console.log('\t\t ===============');
        console.log({cont, link});
        if(
            link.indexOf('Store') === -1 && 
            link.indexOf('Premium') === -1 && 
            link.indexOf('MyWorkoutTrainer') === -1 && 
            link.indexOf('Lists') === -1 &&
            link.indexOf('Plyometrics') === -1
        ){
            const exercise = await getSiteData(link);
            await addExercise(exercise);
        }
        cont++;
    }
}

main()

