export interface Options {
    enDashAroundNumbers: boolean
    enDashAroundSpace: boolean
    emDashes: boolean
}

export default (
    options: Options = {
        emDashes: true,
        enDashAroundNumbers: true,
        enDashAroundSpace: true,
    }
) => {}
