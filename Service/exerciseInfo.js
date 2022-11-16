
export const handlerExercise = () => {
    function getForce(container){
        const forceH = container.querySelectorAll('strong')[2];
        return forceH.parentElement.nextSibling.firstChild.textContent
    }
    
    function getMechanic(container){
        const mechanicH = container.querySelectorAll('strong')[1];
        return mechanicH.parentElement.nextSibling.firstChild.textContent
    }
    
    function getPreparation(container){
        const preparationH = container.querySelectorAll('strong')[3];
        return preparationH.parentElement.nextSibling.textContent
    }
    
    function getExecution(container){
        const executionH = container.querySelectorAll('strong')[4];
        return executionH.parentElement.nextSibling.textContent
    }
    
    function getExerciseName(){
        return document.getElementsByClassName('page-title')[0].textContent
    }
    
    function getMuscles(ul){
        let lis = [...ul.querySelectorAll('li')]
        return lis.map( li => {
            return {
                link: li.firstChild.href,
                nameName: li.textContent 
            }
        })
    }
    
    function getUls(container){
        return [...container.querySelectorAll('ul')]
    }

    function getTitle(container){
        try {
            return container.previousSibling.firstChild.firstChild.textContent
        } catch (error) {
            return false
        }
        
    }
    
    let article = document.querySelector('article')
    let [infoContainer,container] = article.firstChild.firstChild.childNodes

    let uls = getUls(container)
    let obj = uls.reduce((acc, ul) => {
        let title = getTitle(ul)
        if(!title) return acc;
        title = title === 'Target' ? 'Agonist' : getTitle(ul)
        acc[title] = getMuscles(ul)
        return acc;
    }, {});

    obj.exerciseName = getExerciseName();
    obj.preparation = getPreparation(infoContainer)
    obj.execution = getExecution(infoContainer)
    obj.mechanic = getMechanic(infoContainer)
    obj.force = getForce(infoContainer)
    console.log(obj)
    return obj
}