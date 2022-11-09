# abs Anybox Search Client

**Super fast Anybox search for the terminal and Alfred.**

Allows to search Anybox bookmarks without the app running in both the terminal and in Alfred.

**Note:** This app uses Anybox database directly (readonly mode). This is undocumented and not supported by Anybox. So use it at your own risk!

**Terminal preview**

![Terminal example](https://raw.githubusercontent.com/ajimix/anybox-search/HEAD/assets/terminal.jpg)

**Alfred preview**

![Alfred example](https://raw.githubusercontent.com/ajimix/anybox-search/HEAD/assets/alfred.jpg)

## Setup

The app requires node. So make sure you have [NodeJS](https://nodejs.org) installed first.

1. Run the following in the terminal: `npm i -g anybox-search`
1. If you want to also use with Alfred, continue. Otherwise you are done.
1. [Download and Open](https://github.com/ajimix/anybox-search/raw/master/Anybox%20Search.alfredworkflow) the alfred workflow.
1. Follow Alfred instructions (or click Configure Workflow) to configure node path and app path.

## Usage

Just type `abs anything` on the terminal or in Alfred.

Examples:

- `abs github`
- `abs admin website`
- `abs facebook`
- `abs gaming newsletter`
