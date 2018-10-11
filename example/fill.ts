import { CommandDispatcher, literal, argument, string, ArgumentType, StringReader, CommandContext, SuggestionsBuilder, Suggestions, Primitive } from "../dist"

class BlockPos implements ArgumentType<BlockPos> {

	public x: number;
	public y: number;
	public z: number;
	constructor(x: number = 0, y: number = 0, z: number = 0) {
		this.x = x; this.y = y; this.z = z;
	}
	parse(reader: StringReader) {
		this.x = reader.readInt();
		reader.skip();
		this.y = reader.readInt();
		reader.skip();
		this.z = reader.readInt();
		return this;
	}
	listSuggestions(context: CommandContext<Object>, builder: SuggestionsBuilder) {
		return Suggestions.empty();
	}
	getExamples() {
		return [
			"1 2 3"
		]
	}
}

const dispatcher = new CommandDispatcher();

dispatcher.register(
	literal("fill").then(
		argument("pos1", new BlockPos()).then(
			argument("pos2", new BlockPos()).then(
				argument("block", string()).executes(context => {
					console.log(context.getArgument("pos1", BlockPos))
					console.log(context.getArgument("pos2", BlockPos))
					console.log(context.getArgument("block", Primitive.String))
					return 0;
				}).build()
			)
		)
	)
)

const parsedCommand = dispatcher.parse("fill 3 4 5 10 11 12 air", {})

try {
	dispatcher.execute(parsedCommand);
} catch (ex) {
	console.error(ex.getMessage());
}