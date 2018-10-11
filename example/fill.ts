import { CommandDispatcher, literal, argument, string, ArgumentType, StringReader, CommandContext, SuggestionsBuilder, Suggestions } from "../dist"

class BlockPos implements ArgumentType<BlockPos> {

	public x: number;
	public y: number;
	public z: number;
	constructor(x: number = 0, y: number = 0, z: number = 0) {
		this.x = x; this.y = y; this.z = z;
	}
	parse(reader: StringReader) {
		this.x = reader.readInt();
		this.y = reader.readInt();
		this.z = reader.readInt();
		return this;
	}
	listSuggestions(context: CommandContext<Object>, builder: SuggestionsBuilder) {
		return Promise.resolve(Suggestions.empty());
	}
	getExamples() {
		return [
			"1 2 3",
			"~ ~-1 ~" // Unsupported
		]
	}
}

const dispatcher = new CommandDispatcher();

dispatcher.register(
	literal("fill").then(
		argument("pos1", new BlockPos()).then(
			argument("pos2", new BlockPos()).then(
				argument("block", string()).executes(context => {
					context.getArgument("pos1", BlockPos)
					return 0;
				})
			)
		)
	)
)