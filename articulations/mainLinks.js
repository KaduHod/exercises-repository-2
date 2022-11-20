import {readFile,writeFile} from 'fs/promises'
import { getSiteData } from '../getSiteData.js'

const mainLinksHandler = (dom) => {
    const [first, second] = dom.document
                                .querySelector('article')
                                .querySelectorAll('.col-sm-6')

    return [first, second]
        .map( container => [...container.querySelectorAll('p')])
        .flat()
        .map( p => {
            return [...p.querySelectorAll('a')].filter(a => !!a.href)
        })
        .flat()
        .map(a => a.href )
        .filter(a => a.indexOf('#') == -1)
}



const main = async () => {
    const dom = await getSiteData('https://exrx.net/Lists/Articulations')

    const links = mainLinksHandler(dom)
    await writeFile('./data/articulation-links.json', JSON.stringify(links))
}

main()