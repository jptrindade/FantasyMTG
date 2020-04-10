# FantasyMTG
A fantasy league for Magic The Gathering cards

## Installation
+ `npm install`
+ Creating a .env file in the root of the project and adding **DB_PRODUCTION** and **PORT**

## Running
+ `npm start`

## Supported Requests
+ ### GET: /players
Returns all players and their picks.
+ ### POST: /players
`body: { "name": "Example name", "picks": ["Black Lotus", "Storm Crow"]}` 
Creates a player with its starting picks.
+ ### GET: /stats
Returns the **stats** collection.
+ ### POST: /stats
Creates an empty **stats** collection on the database.
+ ### GET: /stats/:playerName
Returns the points of a player.
+ ### POST: /update
`body: { "url": "https://magic.wizards.com/en/articles/archive/mtgo-standings/standard-preliminary-2020-04-10" }`
Updates the stats table to include data from an event.
**The same url cannot be posted more than one time.**

(The only urls supported by the system come from the [Archive MTGO Standings](https://magic.wizards.com/en/content/deck-lists-magic-online-products-game-info). )
