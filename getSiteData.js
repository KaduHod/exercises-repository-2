import { JSDOM } from 'jsdom'
import axios from 'axios'

/**
 * @param {*} link 
 * @returns DOM 
 */
export const getSiteData = async link => {
    const {data} = await axios.get(link)
    const dom = new JSDOM(data).window    
    return dom
}