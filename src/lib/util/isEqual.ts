export default function isEqual(a: any, b: any): boolean { // @Warning: May cause an infinite loop

	if (a === b)
		return true;

	if (typeof a != typeof b)
		return false;

	if (typeof a === "function")
		return a.toString() === b.toString();

	if (a instanceof Map && b instanceof Map)
		return isMapEqual(a, b);

	if (a instanceof Set && b instanceof Set) 
		return isArrayEqual([...a], [...b]);

	if (a instanceof Array && b instanceof Array)
		return isArrayEqual(a, b);

	if (typeof a === "object" && typeof b === "object")
		return isObjectEqual(a, b);

	return false;
}

function isMapEqual(a: Map<any, any>, b: Map<any, any>): boolean {

	if (a.size != b.size) return false;

	for (var [key, val] of a) {
		const testVal = b.get(key);
		if (!isEqual(testVal, val))
			return false;
        if (testVal === undefined && !b.has(key))
            return false;    
	}
	
	return true;
}

function isArrayEqual(a: Array<any>, b: Array<any>): boolean {

	if (a.length != b.length) return false;

	for(let i = 0; i < a.length; i++)
		if (!isEqual(a[i], b[i]))
			return false;

	return true;
}

function isObjectEqual(a: Object, b: Object): boolean {

	const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);

    if (aKeys.length != bKeys.length) return false;
    if (!aKeys.every(key => b.hasOwnProperty(key))) return false;

    return aKeys.every(key => {
      return isEqual(a[key], b[key])
    });
}