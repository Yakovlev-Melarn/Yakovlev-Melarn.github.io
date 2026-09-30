import {Commands} from "./commands.js";
import {Terminal} from "./terminal.js";

export function registerEggs() {
    Commands.register("sudo", function () {
        Terminal.print("Nice try! 😏");
    }, [], "права root", true);

    Commands.register("rm", function (args) {
        if (args.length >= 2 && args[0] === "-rf" && args[1] === "/") {
            Terminal.print("Это не тут, это в проде");
        } else {
            Terminal.print("rm: тут нечего удалять");
        }
    }, [], "удалить всё", true);

    Commands.register("coffee", function () {
        Terminal.print(
            "      ( (\n" +
            "      ) )\n" +
            "  ........\n" +
            "  |      |]\n" +
            "  \\      /\n" +
            "  `----'"
        );
        Terminal.print("Наслаждайся кофе");
    }, [], "перерыв", true);

    Commands.register("history", function () {
        if (Terminal.history.length === 0) {
            Terminal.print("История пуста");
            return;
        }
        Terminal.history.forEach(function (cmd, i) {
            Terminal.print("  " + (i + 1) + "  " + cmd);
        });
    }, [], "история команд", true);

    Commands.register("date", function () {
        Terminal.print(new Date().toString());
    }, [], "текущая дата", true);

    Commands.register("exit", function () {
        Terminal.print("Из портфолио не сбежать");
        Terminal.print("Закрой вкладку, если очень хочешь уйти", "muted");
    }, ["logout", "quit"], "выйти", true);

    Commands.register("vim", function () {
        Terminal.print("Vim не установлен. И правильно.");
        Terminal.print("Ты хотел нажать :q!", "muted");
    }, ["vi"], "текстовый редактор", true);
}
