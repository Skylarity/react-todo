import {v4 as uuid} from "uuid";

export class Item {
	id: string;
	timestamp: Date;
	label: string;
	completed: boolean;

	constructor(
		label: string,
		completed: boolean = false,
		timestamp = new Date()
	) {
		this.id = uuid();
		this.timestamp = timestamp;
		this.label = label;
		this.completed = completed;
	}

	toggle() {
		this.completed = !this.completed;
	}

	static serialize(item: Item): Item {
		return JSON.parse(JSON.stringify(item));
	}

	static fromJSON(json: Object) {
		var obj = Object.assign(new Item(""), json);
		return obj;
	}
}
