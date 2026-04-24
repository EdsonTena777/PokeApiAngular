
export interface result <T>{
    correct: boolean,
    errorMessage: string,
    ex: any,
    object: T,
    objects: T[]
}