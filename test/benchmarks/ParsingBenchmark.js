let output = ""
const outputStream = {write(content) { output = content; console.log(content) }}

const { literal, CommandDispatcher } = require("../../dist")

const subject = new CommandDispatcher();
subject.register(
	literal("a")
		.then(
			literal("1")
				.then(literal("i").executes(() => 0))
				.then(literal("ii").executes(() => 0))
		)
		.then(
			literal("2")
				.then(literal("i").executes(() => 0))
				.then(literal("ii").executes(() => 0))
		)
);
subject.register(literal("b").then(literal("1").executes(() => 0)));
subject.register(literal("c").executes(() => 0));
subject.register(literal("d").requires(s => false).executes(() => 0));
subject.register(
	literal("e")
		.executes(() => 0)
		.then(
			literal("1")
				.executes(() => 0)
				.then(literal("i").executes(() => 0))
				.then(literal("ii").executes(() => 0))
		)
);
subject.register(
	literal("f")
		.then(
			literal("1")
				.then(literal("i").executes(() => 0))
				.then(literal("ii").executes(() => 0).requires(s => false))
		)
		.then(
			literal("2")
				.then(literal("i").executes(() => 0).requires(s => false))
				.then(literal("ii").executes(() => 0))
		)
);
subject.register(
	literal("g")
		.executes(() => 0)
		.then(literal("1").then(literal("i").executes(() => 0)))
);
const h = subject.register(
	literal("h")
		.executes(() => 0)
		.then(literal("1").then(literal("i").executes(() => 0)))
		.then(literal("2").then(literal("i").then(literal("ii").executes(() => 0))))
		.then(literal("3").executes(() => 0))
);
subject.register(
	literal("i")
		.executes(() => 0)
		.then(literal("1").executes(() => 0))
		.then(literal("2").executes(() => 0))
);
subject.register(
	literal("j")
		.redirect(subject.getRoot())
);
subject.register(
	literal("k")
		.redirect(h)
);

bench(
	[
		{
			label: "parse a 1 i",
			fn() { subject.parse("a 1 i", new Object()); }
		},
		{
			label: "parse c",
			fn() { subject.parse("c", new Object()); }
		},
		{
			label: "parse k 1 i",
			fn() { subject.parse("k 1 i", new Object()); }
		},
		{
			label: "parse _",
			fn() { subject.parse("c", new Object()); }
		}
	],
	{ stream: outputStream, runs: 1000 }
)

const d = new Date();
require('fs').writeFileSync(`./BenchmarkResult/Parsing-${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}-${d.getHours()}-${d.getMinutes()}.txt`, output.replace(/\[1m/g, '').replace(/\[0m/g, ''))