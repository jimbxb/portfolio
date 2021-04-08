const fmtGenericItem = (maxLen) => ({name, data}) => (
  [`${name} ${".".repeat(4 + maxLen - name.length)} ${data}`]
);

const fmtHelpItem = ({name, desc}) => (
  [
    ` * ${name}`,
    ...desc.map(line => "\t" + line)
  ]
);

const fmtPortfolioItem = ({title, subtitle, links, desc}) => (
  [
    "", 
    `[[bu;;]${title}]${subtitle ? ` -- [[b;;]${subtitle}]` : ""}:`,
    ...(links?.length ? ["", `( ${links.join(" | ")} )`] : []), 
    "",
    ...desc,
    ""
  ]
);

const maxNameLen = (nameObjs) => nameObjs?.reduce((len, {name}) => len >= (name?.length ?? 0) ? len : name.length, 0);

const buildTerminal = ({parseCommand}, {portfolio, commands}) => {
  const {help, greetings, contact, credits, list, search} = commands;
  const contactMaxLen = maxNameLen(contact.items);
  const creditsMaxLen = maxNameLen(credits.items);

  return [
    (command, term) => {
      const {name, args} = parseCommand(command);
      const arity = args.length;
      
      if (name === "") return;

      if (commands.hasOwnProperty(name)) {
        const {arity: expected} = commands[name];
        if (expected >= 0 && expected !== arity) {
          term.error(`ERROR: the command \`${name}' expects ${expected} arguments and got ${arity}.`);
          return;
        }

        switch (name) {
          case help.command:
            term.echo(help.text.concat(help.commands.flatMap(fmtHelpItem)));
            break;
          case contact.command:
            term.echo(contact.items.flatMap(fmtGenericItem(contactMaxLen)));
            break;
          case credits.command:
            term.echo(credits.items.flatMap(fmtGenericItem(creditsMaxLen)));
            break;
          case greetings.command:
            term.echo(greetings.lines);
            break;
          case list.command:
            term.echo(portfolio.items.flatMap(fmtPortfolioItem));
            break;
          case search.command:
            const items = portfolio.items.filter(({title, subtitle}) => 
              args.every((term) => [title, subtitle ?? ""].join(" ").toLowerCase().includes(term.toLowerCase()))
            );
            if (items?.length)
              term.echo(items.flatMap(fmtPortfolioItem));
            else
              term.error(portfolio.error);
            break;
        }
      } else {
        term.error(`ERROR: unknown command \`${name}'.`);
      }
    }, 
    {
      greetings: greetings.lines.concat(greetings.start).join("\n"),
      checkArity: false,
      completion: Object.keys(commands)
    }
  ];
};