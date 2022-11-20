import {readFile, writeFile} from 'fs/promises'

const getFIrstName = name => name.split(' ')[0]

const main = async () => {
    const articulations = JSON.parse(await readFile('./data/articulations-final.json'))
    const flat = articulations.reduce((acc, articulationGroup) => {
        let articulationNames = Object.keys(articulationGroup)
        articulationNames.map( name => {
            acc[name] = articulationGroup[name]
        })

        return acc
    }, {})

    console.log(flat)
    
    await writeFile('./data/articulations-final.json', JSON.stringify(flat))
}

main()