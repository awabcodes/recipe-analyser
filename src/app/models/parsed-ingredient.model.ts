export class ParsedIngredient {
    constructor(
        public food?: string,
        public quantity?: number,
        public measure?: string,
        public weight?: number,
        public nutrients?: any
    ) {}
}