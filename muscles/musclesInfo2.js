import {readFile,writeFile} from 'fs/promises';
import { get } from 'https';

const main = async (dom) => {
    function getMuscleName(dom = false)
    {
        return document.querySelectorAll(".page-title")[0].textContent
    }
    
    function getContainers()
    {
        return document.querySelectorAll('.col-sm-6')
    }
    
    function getImageLink()
    {
        let [container] = getContainers()
        return container.querySelector('img').src
    }

    function getHeads()
    {
        const isHeadTitle = h2 => h2.textContent === 'Heads'
        let [first, second] = getContainers()
        let h2Head = [...first.querySelectorAll('h2')].find(isHeadTitle) ?? [...second.querySelectorAll('h2')].find(isHeadTitle)
        return [...h2Head.nextElementSibling.querySelectorAll('li')].map(({textContent}) => textContent)
    }

    function getMovments()
    {
        const isMovementTitle = h2 => h2.textContent === 'Movement'
        const articulations = []
        const getMovmentsFromArticulation = element => {
            let articulation = {}
                    articulation.name = element.textContent
                    articulation.movements = [...element
                        .nextElementSibling
                        .querySelectorAll('li')]
                        .map( ({textContent}) => textContent )

            articulations.push(articulation)
        }

        const findArticulations = h2 => {
            let currentElement = h2
            console.log({currentElement})
            while (!!currentElement.nextElementSibling && currentElement.nextElementSibling.tagName !== 'H2'){
                console.log({currentElement, next: currentElement.nextElementSibling})
                if(currentElement.tagName == 'P') getMovmentsFromArticulation(currentElement)
                currentElement = currentElement.nextElementSibling;
            }
        }

        let [first, second] = getContainers()
        let movementTitle = [...first.querySelectorAll('h2')].find(isMovementTitle) ??  [...second.querySelectorAll('h2')].find(isMovementTitle) 
        findArticulations(movementTitle)

        return articulations
    }


    const getH2s = container => {
        return [...container.querySelectorAll('h2')]
    }

    const getPTag = (attachmentTitle, target) => {
        let currentElement = attachmentTitle;
        while(currentElement.nextElementSibling && currentElement.textContent !== target){
            currentElement = currentElement.nextElementSibling
        }

        return currentElement
    }

    function getOrigin()
    {
        let container = null;

        if(isInFirstContainer()) container = getContainers()[0]
        else container = getContainers()[1]

        let attachmentTitle = getH2s(container).find(title => title.textContent  === 'Attachments')

        let originPTag = getPTag(attachmentTitle, 'Origin')
        return [...originPTag
            .nextElementSibling
            .querySelectorAll('li')]
            .map( li => {
                if(li.querySelector('ul')){
                    let subOrigins = [...li.querySelector('ul').querySelectorAll('li')].map(({textContent}) => textContent)
                    return [li.innerText, ...subOrigins]
                }
                
            }).flat().filter(el => !!el)
    }
    function getInsertion()
    {
        let container = null;

        if(isInFirstContainer()) container = getContainers()[0]
        else container = getContainers()[1]

        let attachmentTitle = getH2s(container).find(title => title.textContent  === 'Attachments')
        let insertionPTag = getPTag(attachmentTitle, 'Insertion')

        return [...insertionPTag
            .nextElementSibling
            .querySelectorAll('li')]
            .map( li => {
                if(li.querySelector('ul')){
                    let subInsertions = [...li.querySelector('ul').querySelectorAll('li')].map(({textContent}) => textContent)
                    return [li.innerText, ...subInsertions]
                }
                
            }).flat().filter(el => !!el)
    }

    function isInFirstContainer()
    {
        let [first] = getContainers();
        let result = [...first.querySelectorAll('h2')]
                    .map(({textContent}) => textContent)
                    .find( text => text === 'Attachments' )
        return !!result
    }

    const muscle = {}
    muscle.name = getMuscleName()
    muscle.image = getImageLink()
    muscle.heads = getHeads()
    muscle.articulations = getMovments()
    // muscle.origin = getOrigin()
    // muscle.insertion = getInsertion()

console.log(muscle)
}

main()