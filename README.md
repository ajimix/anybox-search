# abs Anybox Search Client

**Super fast Anybox search for the impatient.**

This allows to search Anybox bookmarks database without even opening the app.

**Note:** This app uses Anybox database directly. This is undocumented and not supported by Anybox. So run it at your own risk!

**Terminal preview**

![Terminal example](https://raw.githubusercontent.com/ajimix/anybox-search/HEAD/assets/terminal.jpg)

**Alfred preview**

![Alfred example](https://raw.githubusercontent.com/ajimix/anybox-search/HEAD/assets/alfred.jpg)

## Setup

- Run the following in the terminal: `npm i -g anybox-search`

For Alfred usage, [read below](#alfred).

## Usage

Just type `abs whatever` and then type the number you want to open.

Examples:

- `abs github`
- `abs admin website`
- `abs facebook`
- `abs gaming newsletter`

## Alfred

First install `abs` with `npm i -g anybox-search`

- Open the alfred workflow from the Github project with Alfred.
- Double click the first action to configure it and adapt the paths as necessary and save the changes.
  - The first one is the node path, you can know your path by executing `which node` in the terminal.
  - The second one is the path of abs, you can know the path by executing `which abs` in the terminal.

To use, open Alfred and type `abs keyword` to search. For example `abs github`.
