import { getPage } from "./Service/getPage.js";
import { writeFile } from 'fs/promises'

const getMusclesLinks = () => {
    let colunas = [...document.getElementsByClassName('col-sm-6')]
    let uls = colunas.map( coluna => {
        return coluna.firstChild
    })
    let links = []
    uls.map(ul => {
        links.push(...ul.childNodes)
    })
    let muscles = links.map(link => {
        if(link.firstChild.tagName) return link.firstChild
    })
    muscles = muscles.filter(muscle => !!muscle)
    let musclesLinks = muscles.map(m => m.href)
    return musclesLinks;
}

const muscleGroups = async () => {
    const linksOfRegions = await getPage('https://exrx.net/Lists/Directory', getMusclesLinks);
    await writeFile('data/list-of-regions.json', JSON.stringify(linksOfRegions))
    process.exit()
}