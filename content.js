const content = {
  "help": {
    "text": [
      "Type one of the following commands and press <enter>:"
    ],
    "commands": [
      { 
        "name": "help", 
        "desc": ["Displays this message."] 
      },
      { 
        "name": "contact", 
        "desc": ["Display's my contact information."] 
      },
      { 
        "name": "list", 
        "desc": ["Displays a list of portfolio items."]
      },
      {
        "name": "search <query>",
        "desc": [
          "Searches the portfolio items for relevant items.",
          "<query> should be replaced with the search terms.",
          "\t e.g. `search foo bar` searches for items with \"foo\" and \"bar\" in the title." 
        ]
      },
      { 
        "name": "credits", 
        "desc": ["Displays a list of credits."]
      }
    ]
  },
  "greetings": {
    "lines": [
      "       __                             ____",
      "      / /___ _____ ___  ___  _____   / __ )____ __________  ___  _____",
      " __  / / __ `/ __ `__ \\/ _ \\/ ___/  / __  / __ `/ ___/ __ \\/ _ \\/ ___/",
      "/ /_/ / /_/ / / / / / /  __(__  )  / /_/ / /_/ / /  / / / /  __(__  )",
      "\\____/\\__,_/_/ /_/ /_/\\___/____/  /_____/\\__,_/_/  /_/ /_/\\___/____/",
      "   / __ \\____  _____/ /_/ __/___  / (_)___",
      "  / /_/ / __ \\/ ___/ __/ /_/ __ \\/ / / __ \\",
      " / ____/ /_/ / /  / /_/ __/ /_/ / / / /_/ /",
      "/_/    \\____/_/   \\__/_/  \\____/_/_/\\____/",
      ""
    ], 
    "start": [
      "Type `list` or `help` to begin.",
      ""
    ]
  },
  "contact": {
    "items": [
      { 
        "name": "email", 
        "data": "jamesbarnes2505@gmail.com" 
      },
      { 
        "name": "github", 
        "data": "https://github.com/jimbxb/" 
      }
    ]
  },
  "credits": {
    "items": [
      { 
        "name": "JQueryTerminal", 
        "data": "https://terminal.jcubic.pl/" 
      }
    ]
  },
  "portfolio": {
    "error": "No items found.",
    "items": [
      { 
        "title": "Scalr.io",
        "subtitle": "UniHack'21 Project", 
        "desc": [
          "First prize winning UniHack'21 submission built by my team, Null Pointer.",
          "Scalr.io offers a machine learning platform built for anyone to use."
        ], 
        "links": [
          "https://github.com/jimbxb/unihack21-backend/", 
          "https://github.com/jimbxb/unihack21-frontend/"
        ]
      },
      { 
        "title": "Airloom",
        "subtitle": "BSc Capstone Project",
        "links": [
          "https://github.com/jimbxb/comp30022-backend/", 
          "https://github.com/jimbxb/comp30022-frontend/"
        ], 
        "desc": [
          "University of Melbourne Bachelor of Science, Computing and Software Systems major, capstone project.", 
          "A family heirloom register."
        ]
      }
    ]
  }
}