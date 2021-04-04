const content = {
  help: {
    text: [
      "Welcome to my portfolio.",
      "Type one of the following commands to continue:"
    ],
    commands: [
      { 
        name: "help", 
        desc: ["Displays this message."] 
      },
      { 
        name: "clear", 
        desc: ["Clears the terminal."]
      },
      { 
        name: "contact", 
        desc: ["Display's my contact information."] 
      },
      { 
        name: "portfolio [query]", 
        desc: [
          "Displays a list of portfolio items.", 
          "`query` is used to search for portfolio items.",
          "e.g. `portfolio foo bar` will search for projects with \"foo\" and \"bar\" in the title"
        ]
      },
      { 
        name: "credits", 
        desc: ["Displays a list of credits."]
      }
    ]
  },
  greetings: {
    lines: [
      "       __                             ____                            ",
      "      / /___ _____ ___  ___  _____   / __ )____ __________  ___  _____ ",
      " __  / / __ `/ __ `__ \\/ _ \\/ ___/  / __  / __ `/ ___/ __ \\/ _ \\/ ___/",
      "/ /_/ / /_/ / / / / / /  __(__  )  / /_/ / /_/ / /  / / / /  __(__  )  ",
      "\\____/\\__,_/_/ /_/ /_/\\___/____/  /_____/\\__,_/_/  /_/ /_/\\___/____/   ",
      "   / __ \\____  _____/ /_/ __/___  / (_)___                             ",
      "  / /_/ / __ \\/ ___/ __/ /_/ __ \\/ / / __ \\                            ",
      " / ____/ /_/ / /  / /_/ __/ /_/ / / / /_/ /                            ",
      "/_/    \\____/_/   \\__/_/  \\____/_/_/\\____/                             ",
      ""
    ], 
    start: [
      "Type `help` to begin.",
      ""
    ]
  },
  contact: {
    items: [
      { name: "email", data: "jamesbarnes2505@gmail.com" },
      { name: "github", data: "https://github.com/jimbxb/" }
    ]
  },
  credits: {
    items: [
      { name: "JQueryTerminal", data: "https://terminal.jcubic.pl/" }
    ]
  },
  portfolio: {
    sep: "~~~~~~~~",
    items: [
      { 
        name: "Scalr.io -- UniHack'21 Project", 
        desc: [
          "First prize winning UniHack'21 submission built by my team, Null Pointer.",
          "Scalr.io offers a machine learning platform built for anyone to use."
        ], 
        links: [
          "https://github.com/jimbxb/unihack21-backend/", 
          "https://github.com/jimbxb/unihack21-frontend/"
        ]
      },
      { 
        name: "Airloom -- BSc Capstone Project",
        links: [
          "https://github.com/jimbxb/comp30022-backend/", 
          "https://github.com/jimbxb/comp30022-frontend/"
        ], 
        desc: [
          "University of Melbourne Bachelor of Science, Computing and Software Systems major, capstone project.", 
          "A family heirloom register."
        ]
      },
    ]
  }
};

const fmtHelpItem = ({name, desc}) => (
  [` * ${name}`].concat(desc.map(line => "\t" + line))
);

const fmtContactItem = ({name, data}) => (
  [`${name}: ${data}`]
);

const fmtCreditItem = ({name, data}) => (
  [`${name}: ${data}`]
);

const fmtPortfolioItem = ({name, links, desc}) => (
  [
    content.portfolio.sep,
    "", 
    `[[b;;]${name}]: ${(links ?? []).join(" ; ")}`, 
    ""
  ].concat(desc).concat([""])
);

const terminal = (root) => (command, term) => {
  const {name, args} = root.parse_command(command);
  const arity = args.length;
  
  switch (name) {
    case "help":
    case "clear":
    case "contact":
    case "credits":
    case "greetings":
      if (0 !== args.length) {
        term.error(`[Arity] Wrong number of arguments. Function '${name}' expects ${0} got ${arity}!`);
        return;
      }
  }

  switch (name) {
    case "help":
      term.echo(content.help.text.concat(content.help.commands.flatMap(fmtHelpItem)).join("\n"));
      break;
    case "contact":
      term.echo(content.contact.items.flatMap(fmtContactItem, []).join("\n"));
      break;
    case "credits":
      term.echo(content.credits.items.flatMap(fmtCreditItem, []).join("\n"));
      break;
    case "greetings":
      term.echo(content.greetings.lines.join("\n"));
      break;
    case "portfolio":
      const query = args.length ? args : [""];
      const items = content.portfolio.items.filter(({name}) => query.every((term) => name.toLowerCase().includes(term.toLowerCase())));
      term.echo(items.flatMap(fmtPortfolioItem, []).slice(1).join("\n"));
      break;
    default:
      term.error(`Command '${name}' Not Found!`);
  }
}

const terminalArgs = {
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