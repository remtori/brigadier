import { assert } from "chai"
import { mock, instance } from "ts-mockito"
import StringReader from "../../src/lib/StringReader"
import LiteralMessage from "../../src/lib/LiteralMessage"
import CommandSyntaxException from "../../src/lib/exceptions/CommandSyntaxException"
import SimpleCommandExceptionType from "../../src/lib/exceptions/SimpleCommandExceptionType"

describe('SimpleCommandSyntaxExceptionTypeTest', () => {
	it('createWithContext', () => {		
        const type = new SimpleCommandExceptionType(new LiteralMessage("error"));
        const reader = new StringReader("Foo bar");
        reader.setCursor(5);
        const exception = type.createWithContext(reader);
        assert.deepEqual(exception.getType(), type);
        assert.equal(exception.getInput(), "Foo bar");
        assert.equal(exception.getCursor(), 5);
    })

    it('getContext_none', () => {		
        const exception = new CommandSyntaxException({}, new LiteralMessage("error"));
        assert.equal(exception.getContext(), null);
    })

    it('getContext_short', () => {		
        const exception = new CommandSyntaxException({}, new LiteralMessage("error"), "Hello world!", 5);
        assert.equal(exception.getContext(), "Hello<--[HERE]");
    })

    it('getContext_long', () => {		
        const exception = new CommandSyntaxException({}, new LiteralMessage("error"), "Hello world! This has an error in it. Oh dear!", 20);
        assert.equal(exception.getContext(), "...d! This ha<--[HERE]");
    })
})