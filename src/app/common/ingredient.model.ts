export class Ingredient {
    private _name: string;
    private _amount: number;
    static UNKNOWN: string = "Unknown Ingredient";

    constructor(name: string, amount: number) {
        this.name = name;
        this.amount = amount;
    }

    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    public get amount(): number {
        return this._amount;

    }
    public set amount(value: number) {
        this._amount = value;
    }
}