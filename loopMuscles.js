import {muscleDomHandler} from './musclesInfo.js'
import {readFile, writeFile} from 'fs/promises'
import { JSDOM } from 'jsdom'
import axios from 'axios'

const getSiteData = async link => {
    const {data} = await axios.get(link)
    const dom = new JSDOM(data).window    
    const result = muscleDomHandler(dom)
    return result
}

const main = async () => {
    let muscles = []
    let cont = 0;
    let links = JSON.parse( await readFile('./data/muscles.json') );
    for await ( const link of links){
        console.log(`\t\t ${cont} ${link}`)
        const muscle = await getSiteData(link)
        muscles.push(muscle)
        cont++
    }
    await writeFile('./data/muscles-info.json', JSON.stringify(muscles))
}

main()