export const mainHandler = () => {
    function getSubMuscles(links){
        return links.filter( a => !!a.name)
    }
    
    function getContainerWithExercisesFromSubMuscle(subMuscle){
        return subMuscle.parentElement
                        .parentElement
                        .parentElement
                        .parentElement
                        .nextElementSibling
    }
    
    function getExercisesFromSubMuscleContainer(container){
        return [...container.querySelectorAll('a')]
                                .map(a => a.href)
                                // .filter(str => checkIfIsValidExerciseLink(str))
    }
    
    function checkIfIsValidExerciseLink(str){
        return str.indexOf('#') === - 1
    }
    
    let links = [...document.querySelector('article').querySelectorAll('a')]
    let subMuscles = getSubMuscles(links)
    subMuscles = subMuscles.reduce((acc, subMuscle) => {
        acc[subMuscle.name] = getExercisesFromSubMuscleContainer(getContainerWithExercisesFromSubMuscle(subMuscle))
        return acc
    },{})

    const obj = {}
    return {muscleName:document.getElementsByClassName('page-title')[0].innerHTML.split(' ')[0],...subMuscles}
}

