
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

const buildTerminal = (root, content) => ([
  (command, term) => {
    const {name, args} = root.parse_command(command);
    const arity = args.length;
    
    switch (name) {
      case "help":
      case "clear":
      case "contact":
      case "list":
      case "credits":
      case "greetings":
        if (0 !== arity) {
          term.error(`Wrong number of arguments. Command \`${name}\` expects ${0} got ${arity}!`);
          return;
        }
    }

    switch (name) {
      case "":
        break;
      case "help":
        term.echo(content.help.text.concat(content.help.commands.flatMap(fmtHelpItem)).join("\n"));
        break;
      case "contact":
        term.echo(content.contact.items.flatMap(fmtContactItem).join("\n"));
        break;
      case "credits":
        term.echo(content.credits.items.flatMap(fmtCreditItem).join("\n"));
        break;
      case "greetings":
        term.echo(content.greetings.lines.join("\n"));
        break;
      case "list":
        term.echo(content.portfolio.items.flatMap(fmtPortfolioItem).join("\n"));
        break;
      case "search":
        const items = content.portfolio.items.filter(({title, subtitle}) => 
          args.every((term) => (title + " " + (subtitle ?? "")).toLowerCase().includes(term.toLowerCase()))
        );
        if (items.length)
          term.echo(items.flatMap(fmtPortfolioItem).join("\n"));
        else
          term.error(content.portfolio.error);
        break;
      default:
        term.error(`Unknown command \`${name}\`.`);
    }
  }, {
    greetings: content.greetings.lines.concat(content.greetings.start).join("\n"),
    checkArity: false,
    completion: [
      "help",
      "clear",
      "contact",
      "credits",
      "portfolio",
      "greetings"
    ]
  }
]);