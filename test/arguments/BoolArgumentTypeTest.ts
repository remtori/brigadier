import { assert } from 'chai'
import { mock, instance, when, verify } from 'ts-mockito'
import { DefaultType } from "../../src/lib/arguments/ArgumentType"
import StringReader from "../../src/lib/StringReader"

describe('BoolArgumentTypeTest', () => {
	const type = DefaultType.bool();

	it('parse', () => {		
		const mockedReader = mock(StringReader);		
		when(mockedReader.readBoolean()).thenReturn(true);

		const reader = instance(mockedReader);
		assert.equal(type.parse(reader), true);

		verify(mockedReader.readBoolean()).once();
	})
})
