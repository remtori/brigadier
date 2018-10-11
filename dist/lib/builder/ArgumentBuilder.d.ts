import Command from "../Command";
import RedirectModifier from "../RedirectModifier";
import SingleRedirectModifier from "../SingleRedirectModifier";
import CommandNode from "../tree/CommandNode";
import Predicate from "../Predicate";
declare abstract class ArgumentBuilder<S, T extends ArgumentBuilder<S, T>> {
    private args;
    private command;
    private requirement;
    private target;
    private modifier;
    private forks;
    abstract getThis(): T;
    then(arg: ArgumentBuilder<S, any> | CommandNode<S>): T;
    getArguments(): Iterable<CommandNode<S>>;
    executes(command: Command<S>): T;
    getCommand(): Command<S>;
    requires(requirement: Predicate<S>): T;
    getRequirement(): Predicate<S>;
    redirect(target: CommandNode<S>, modifier?: SingleRedirectModifier<S>): T;
    fork(target: CommandNode<S>, modifier: RedirectModifier<S>): T;
    forward(target: CommandNode<S>, modifier: RedirectModifier<S>, fork: boolean): T;
    getRedirect(): CommandNode<S>;
    getRedirectModifier(): RedirectModifier<S>;
    isFork(): boolean;
    abstract build(): CommandNode<S>;
}
export default ArgumentBuilder;
