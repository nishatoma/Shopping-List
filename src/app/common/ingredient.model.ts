export class Ingredient {
    private name: string;
    private amount: number;
    static UNKNOWN: string = "Unknown Ingredient";

    constructor(name: string, amount: number) {
        this.name = name;
        this.amount = amount;
    }

    /**
     * Gets the name of the ingredient
     */
    public getName(): string {
        var nameCopy: string = this.name;
        return nameCopy;
    }

    /**
     * Gets the amount of our ingredient.
     */
    public getAmount(): number {
        var amountCopy: number = this.amount;
        return amountCopy;
    }

    /**
     * Sets the ingredient name.
     * @param name Ingredient name as a string.
     */
    public setName(name: string) {
        if (name.length > 0) {
            this.name = name;
        } else {
            this.name = Ingredient.UNKNOWN;
        }
    }

    /**
     * Sets the quantity we have for an ingredient.
     * @param amount quantity as a number.
     */
    public setAmount(amount: number) {
        if (amount > 0) {
            this.amount = amount; 
        }
    }
}