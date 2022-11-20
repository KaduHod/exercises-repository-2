
const handlerExercise = (dom) => {
    function getForce(container){
        try {
            const forceH = container.querySelectorAll('strong')[2];
            if(forceH) return forceH.parentElement.nextSibling.firstChild.textContent
            return null
        } catch (error) {
            console.log(error)
            return null
        }
    }
    
    function getMechanic(container){
        try {
            const mechanicH = container.querySelectorAll('strong')[1];
            if(mechanicH) return mechanicH.parentElement.nextSibling.firstChild.textContent
            return null
        } catch (error) {
            console.log(error)
            return null
        }
        
    }
    
    function getPreparation(container){
        try {
            const preparationH = container.querySelectorAll('strong')[3];
            if(preparationH) return preparationH.parentElement.nextSibling.textContent
            return null
        } catch (error) {
console.log(error)
            return null
        }
        
    }
    
    function getExecution(container){
        try {
            const executionH = container.querySelectorAll('strong')[4];
            if(executionH) return executionH.parentElement.nextSibling.textContent
            return null
        } catch (error) {
            console.log(error)
            return null
        }
    }
    
    function getExerciseName(){
        try {
            return document.getElementsByClassName('page-title')[0].textContent
        } catch (error) {
            console.log(error)
            return null
        }
    }
    
    function getMuscles(ul){
        try {
            let lis = [...ul.querySelectorAll('li')]
            return lis.map( li => {
                if(li.firstChild.href && li.textContent){
                    return {
                        link: li.firstChild.href,
                        name: li.textContent 
                    }
                }
            })
        } catch (error) {
            console.log(error)
            return null
        }
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
    
    let article = document.body.querySelector('article')
    if(!article.textContent) {
        article = document.body.querySelectorAll('article')[1]
    }
    let [infoContainer,container] = article.firstChild.firstChild.childNodes

    if(!container){
        [infoContainer,container] = infoContainer.querySelectorAll('.col-sm-6')
    }

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

    return obj
}

handlerExercise()