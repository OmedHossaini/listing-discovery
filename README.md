# Business Listing & Discovery

A small React Native app for creating and browsing local business listings. Built with Expo, TypeScript, and Expo Router.

## Running it

You'll need Node 18 or newer and the Expo Go app on your phone.

```bash
git clone https://github.com/OmedHossaini/listing-discovery.git
cd listing-discovery
npm install
npx expo start
```

Scan the QR code with Expo Go on iOS or Android. Tested on iOS with Expo Go SDK 54.

## What it does

Create a listing with a name, category, and short description. Browse everything you've added in a scrollable list, newest first. Filter by business name as you type. Listings stay on the device between launches.

## Decisions

**State management.** I used React Context with `useState` instead of Redux or Zustand. There's one piece of shared state (the array of listings) and two screens that need it. The form writes to it and the list reads from it. Redux would mean adding a store, actions, and reducers to solve a problem I don't have yet. I'd switch to it once there are several unrelated slices of state, or once updates get complicated enough that a reducer actually makes them easier to follow.

**Persistence.** The brief allowed in-memory state, but I went with AsyncStorage. Listings vanishing on every restart makes the app hard to actually use, and it only took about fifteen lines. The store reads once when it mounts and writes whenever the array changes. One detail worth calling out, the write is guarded by an `isLoading` flag. Without it, the initial empty array saves over whatever was on disk before the read has finished.

I picked AsyncStorage over SQLite because the data is a flat array with no queries or relations. SQLite would make sense once filtering needs to happen at the database level, or once the dataset gets too big to hold in memory.

**Project structure.** Anything in `app/` is a route, since Expo Router turns each file into a URL. I kept those as one line re-exports and put the real screens in `src/screens/`, so the routing stays separate from the implementation. It also means I can move or reuse a screen without touching the routes.

**Filtering.** `filterBusinesses` is a pure function in its own file, so it takes an array and a query and gives back an array without needing anything rendered to test it. The filtered list is worked out during render rather than stored in state, since storing it would mean keeping two arrays in sync every time a listing is added.

**UI choices.** The save button stays disabled until there's a name, so the form can't be submitted into a broken state. The empty list says what to do next rather than just sitting blank, and it says something different when a search returns nothing, so the user can tell "you have no listings" apart from "nothing matched." There's a spinner while storage is being read, since a flash of the empty state would look like the data was lost. Category is four tappable chips instead of a dropdown, because on mobile that's one tap instead of three and the options are all visible at once.

## Trade-offs

No edit or delete. The store already owns the array so both would be small additions, but neither was in the brief and I kept the scope where it was asked.

No tests. `filterBusinesses` is the one piece with real logic, and I wrote it so it could be tested, but setting up a test runner wasn't the best use of the time I had.

Validation is minimal. The save button stays disabled until there's a name, and that's it. The brief said no advanced validation was needed.

Categories are a fixed list of four in code. That's fine for a slice this size, but a real version would need them to come from somewhere they can be edited.

## v2

Edit and delete on each listing, plus using category as a filter rather than just something displayed on the card.

A backend, at which point the store turns into a data fetching layer and local storage becomes an offline fallback.