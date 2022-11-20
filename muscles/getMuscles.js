import { link } from 'fs'
import {readFile,writeFile} from 'fs/promises'


const main = async () => {
    const exercises = JSON.parse(await readFile('./data/exercises-info-final.json'))
    let muscles = exercises
        .map(({exercise}) => exercise)
        .map((exercise) => {
            console.log('\t\t =================================')
            console.log(exercise.exerciseName)
            let muscles = []
            const {Agonist, Synergists, Stabilizers} = exercise
            const AntagonistStabilizers = exercise["Antagonist Stabilizers"];
            if(Agonist) muscles.push(...Agonist)
            if(Synergists) muscles.push(...Synergists)
            if(Stabilizers) muscles.push(...Stabilizers)
            if(AntagonistStabilizers) muscles.push(...AntagonistStabilizers)
            return muscles;
        })
        .filter(data => !!data)
    muscles = muscles.flat().map(muscle => {
        if(!muscle) return null
        return muscle.link
    }).filter(muscle => !!muscle);  
    const musclesUnique = new Set(muscles); 
    muscles = []
    musclesUnique.forEach( link => muscles.push(link) ) 
    await writeFile('./data/muscles.json', JSON.stringify(muscles))
}



main()