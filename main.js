
const fmtHelpItem = ({name, desc}) => (
  [` * ${name}`].concat(desc.map(line => "\t" + line))
);

const fmtContactItem = ({name, data}) => (
  [`${name}: ${data}`]
);

const fmtCreditItem = ({name, data}) => (
  [`${name}: ${data}`]
);

const fmtPortfolioItem = ({title, subtitle, links, desc}) => (
  [
    "", 
    `[[bu;;]${title}]${subtitle ? ` -- [[b;;]${subtitle}]` : ""}:`,
    ... (links ? ["", `( ${links.join(" | ")} )`] : []), 
    ""
  ].concat(desc).concat([""])
);

const buildTerminal = (parseCommand, {portfolio, commands}) => {
  const {help, greetings, contact, credits, list, search} = commands;

  return [
    (command, term) => {
      const {name, args} = parseCommand(command);
      const arity = args.length;
      
      if (name === "") return;

      if (commands.hasOwnProperty(name)) {
        const {arity: expected} = commands[name];
        if (expected !== -1 && expected !== arity) {
          term.error(`Wrong number of arguments. The command \`${name}\` expects ${expected} arguments and got ${arity}!`);
          return;
        }

        switch (name) {
          case help.command:
            term.echo(help.text.concat(help.commands.flatMap(fmtHelpItem)).join("\n"));
            break;
          case contact.command:
            term.echo(contact.items.flatMap(fmtContactItem).join("\n"));
            break;
          case credits.command:
            term.echo(credits.items.flatMap(fmtCreditItem).join("\n"));
            break;
          case greetings.command:
            term.echo(greetings.lines.join("\n"));
            break;
          case list.command:
            term.echo(portfolio.items.flatMap(fmtPortfolioItem).join("\n"));
            break;
          case search.command:
            const items = portfolio.items.filter(({title, subtitle}) => 
              args.every((term) => [title, subtitle ?? ""].join(" ").toLowerCase().includes(term.toLowerCase()))
            );
            if (items.length)
              term.echo(items.flatMap(fmtPortfolioItem).join("\n"));
            else
              term.error(portfolio.error);
            break;
        }
      } else {
        term.error(`Unknown command \`${name}\`.`);
      }
    }, 
    {
      greetings: greetings.lines.concat(greetings.start).join("\n"),
      checkArity: false,
      completion: Object.keys(commands)
    }
  ];
};