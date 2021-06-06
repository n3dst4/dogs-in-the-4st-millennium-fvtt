# Dogs in the 4st Millennium

A Foundry VTT system inspired by Dogs in the Vineyard, and set in the grim darkness of the 41st Millennium.


## Contents
- [Dogs in the 4st Millennium](#dogs-in-the-4st-millennium)
  - [Contents](#contents)
  - [How to install](#how-to-install)
  - [Bug reports and contact](#bug-reports-and-contact)
  - [Development & general hacking](#development--general-hacking)
  - [Credits](#credits)


## How to install

I'm going to assume you have a working knowledge of [Foundry VTT](https://foundryvtt.com/), and the concepts it uses, like systems, modules, and worlds.

This sytem isn't registered so to install it into your Foundry instance:

1. On the admin screen, got to **Game Systems**
2. Click **Install System**
3. Where it says **Manfest URL**, paste in

    ```
    https://gitlab.com/n3dst4/dim41-fvtt/-/raw/release/src/system.json
    ```
    
4. Click **Install**

Now you can create a new world and choose this as the system.

If you've been using the precusor to the system, Trail of Cthulhu Unsanctioned, see [UPGRADING](./UPGRADING.md) for info about how to upgrade existing worlds to this new system.



## Bug reports and contact

If you have a GitLab account, then by all means log an issue over at [the project site][project-site]. Merge requests are also welcome!

Otherwise you can email me at `neil at lumphammer.com`, or hit me up on Discord (search for `n3dst4#8227`.)


## Development & general hacking

If you're a developer and you'd like to hack on this code, please be aware it uses Webpack and React so some of it will not look like normal Handlebars + JQuery Foundry stuff.

1. Clone the repo.
2. Copy `foundryconfig_template.json` to `foundryconfig.json` and edit it to fill in the `dataPath`, e.g.  `"dataPath" "/home/ndc/foundrydata",`.
3. `npm i` to install dependencies
4. `npm run build` to do a build
5. `npm run link` to link it into your foundry data folder
6. `npm start` to start a live incremental build (so you don't need to keep running `npm run build` after every change).
7. Open your local foundry server and create a world using this as the system.


## Credits


Huge thanks to Nick van Oosten/NickEast for [Foundry Project Creator](https://gitlab.com/foundry-projects/foundry-pc/create-foundry-project) and [the Typescript types to go with it](https://gitlab.com/foundry-projects/foundry-pc/foundry-pc-types).


[project-site]: https://gitlab.com/n3dst4/dim41-fvtt/-/issues
