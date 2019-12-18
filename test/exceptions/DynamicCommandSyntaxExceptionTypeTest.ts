import { assert } from "chai"
import StringReader from "../../src/lib/StringReader"
import LiteralMessage from "../../src/lib/LiteralMessage"
import DynamicCommandExceptionType from "../../src/lib/exceptions/DynamicCommandExceptionType"

describe('DynamicCommandSyntaxExceptionTypeTest', () => {

	const type = new DynamicCommandExceptionType(name => new LiteralMessage("Hello, " + name + "!"));

	it('createWithContext', () => {
		const reader = new StringReader("Foo bar");
        reader.setCursor(5);
        const exception = type.createWithContext(reader, "World");
        assert.deepEqual(exception.getType(), type);
        assert.equal(exception.getInput(), "Foo bar");
        assert.equal(exception.getCursor(), 5);
	})
})