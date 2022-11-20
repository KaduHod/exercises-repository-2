import {readFile,writeFile} from 'fs/promises'
import { getSiteData } from '../getSiteData.js'

const handler = (dom) => {
    const pageTitle = dom.document.querySelector('.page-title').textContent

    const subArticulations = [...[...dom.document.querySelectorAll('article')]
                        .find(article => article.textContent !== '')
                        .querySelectorAll('h2')]

    let groups = subArticulations.reduce((acc, h2)=> {
        const rowFromH2 = []
        let currentElement = h2;
        while
        (
            currentElement.nextElementSibling.tagName !== 'H2' &&
            currentElement.nextElementSibling.tagName !== 'H3'
        )
        {
            if(currentElement.classList.contains('row')) rowFromH2.push(currentElement)
            currentElement = currentElement.nextElementSibling
        }
        acc[h2.textContent] = rowFromH2
        return acc
    },{}) 

    groups = Object.keys(groups).reduce((acc, group) => {
        acc[group] = groups[group].map( row => {
            const container = row.querySelector('.col-sm-9');
            const movment = container.querySelector('p').textContent
            const musclesFromMovement = [...container
                                    .querySelector('ul')
                                    .querySelectorAll('li')]
                                    .map( li => {
                                        if(li.firstChild.tagName == 'STRONG'){
                                            return li.firstChild.textContent
                                        } else {
                                            return {
                                                link: li.firstChild.href,
                                                name: li.firstChild.textContent
                                            }
                                        }
                                    })
            return {
                movment,
                musclesFromMovement
            }
        })
        return acc
    },{})

    const articulation = {}
    articulation.name = pageTitle
    articulation.subArticulations = groups
    return articulation
}

const main = async () => {
    const links = JSON.parse(await readFile('./data/articulation-links.json'))
    let articulationsInfo = []
    for await (const link of links){
        console.log("\t\t\ ==============", link)
        const dom = await getSiteData(link);
        const articulation = handler(dom)
        articulationsInfo.push(articulation)
    }

    await writeFile('./data/articulations-info.json', JSON.stringify(articulationsInfo))
}

main()