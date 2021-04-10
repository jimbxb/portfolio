const fmtGenericItem = (dotLen) => ({name, data}) => (
  [`${name} ${".".repeat(4 + dotLen - name.length)} ${data}`]
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
  const {help, clear, greetings, contact, credits, list, search} = commands;
  const contactMaxLen = maxNameLen(contact.items);
  const creditsMaxLen = maxNameLen(credits.items);

  help.exec = (term) => term.echo(help.text.concat(help.commands.flatMap(fmtHelpItem)));
  clear.exec = (term) => term.clear();
  contact.exec = (term) => term.echo(contact.items.flatMap(fmtGenericItem(contactMaxLen)));
  credits.exec = (term) => term.echo(credits.items.flatMap(fmtGenericItem(creditsMaxLen)));
  greetings.exec = (term) => term.echo(greetings.lines);
  list.exec = (term) => term.echo(portfolio.items.flatMap(fmtPortfolioItem));
  search.exec = (term, args) => {
    const items = portfolio.items.filter(({title, subtitle}) => 
      args.every((term) => [title, subtitle ?? ""].join(" ").toLowerCase().includes(term.toLowerCase()))
    );
    if (items?.length) term.echo(items.flatMap(fmtPortfolioItem));
    else term.error(portfolio.error);
  };

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

        commands[name].exec?.(term, args);
      } else {
        term.error(`ERROR: unknown command \`${name}'.`);
      }
    }, 
    {
      greetings: greetings.lines.concat(greetings.start).join("\n"),
      completion: Object.keys(commands),
      checkArity: false,
      clear: false
    }
  ];
};