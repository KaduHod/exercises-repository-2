import { readFile, writeFile} from 'fs/promises'
export const generate = async () => {
    let links = JSON.parse(await readFile('data/exercises-links.json','utf8'));
    let links2 = [];
    links.forEach( obj => {
        let keys = Object.keys(obj)
        keys.forEach(k => {
            if(k !== 'muscleName'){
                let result = obj[k].filter( l => {
                    return l.indexOf('#') == -1
                })
                links2.push(...result)
                // console.log(result)  
            }
        })
    })

    await writeFile('data/exercises.json', JSON.stringify(links2))

}