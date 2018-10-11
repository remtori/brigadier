let output = ""
const outputStream = {write(content) { output = content; console.log(content) }}

const { literal, CommandDispatcher } = require("../../dist")

const dispatcher = new CommandDispatcher();
dispatcher.register(literal("command").executes(() => 0));
dispatcher.register(literal("redirect").redirect(dispatcher.getRoot()));
dispatcher.register(literal("fork").fork(dispatcher.getRoot(), () => [{}, {}, {}]));
const simple = dispatcher.parse("command", new Object());
const singleRedirect = dispatcher.parse("redirect command", new Object());
const forkedRedirect = dispatcher.parse("fork command", new Object());

bench(
	[
		{
			label: "execute simple",
			fn() { dispatcher.execute(simple) }
		},
		{
			label: "execute single redirect",
			fn() { dispatcher.execute(singleRedirect) }
		},
		{
			label: "execute forked redirect",
			fn() { dispatcher.execute(forkedRedirect) }
		},	
	],
	{ stream: outputStream, runs: 1000 }
)

const d = new Date();
require('fs').writeFileSync(`./BenchmarkResult/Execute-${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}-${d.getHours()}-${d.getMinutes()}.txt`, output.replace(/\[1m/g, '').replace(/\[0m/g, ''))