import { assert } from 'chai'
import testEquality from "../utils/testEquality"
import StringReader from "../../src/lib/StringReader"
import ParsedArgument from "../../src/lib/context/ParsedArgument"

describe('ParsedArgumentTest', () => {

	it('testEquals', () => {
		testEquality(new ParsedArgument(0, 3, "bar"), new ParsedArgument(0, 3, "bar"))
		testEquality(new ParsedArgument(3, 6, "baz"), new ParsedArgument(3, 6, "baz"))
		testEquality(new ParsedArgument(6, 9, "baz"), new ParsedArgument(6, 9, "baz"))
	})

	it('getRaw', () => {
		const reader = new StringReader("0123456789");
		const argument = new ParsedArgument(2, 5, "");
		assert.equal(argument.getRange().get(reader), "234");
	})
})