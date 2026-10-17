type Page = string

interface Group {
    base?: string
    items: { [name: string]: Page | Group }
}

declare const sections: { [name: string]: Page | Group }
export default sections
