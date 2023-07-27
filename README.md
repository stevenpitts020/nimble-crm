# Nimble CRM

[![pipeline status](https://gitlab.com/wearesingular/clients/nimble/nimble-crm/badges/master/pipeline.svg)](https://gitlab.com/wearesingular/clients/nimble/nimble-crm/-/commits/master)
[![coverage report](https://gitlab.com/wearesingular/clients/nimble/nimble-crm/badges/master/coverage.svg)](https://gitlab.com/wearesingular/clients/nimble/nimble-crm/-/commits/master)

Home for Nimble backoffice.
Bank Employees can manage bank accounts and overseeing prospects who want to migrate or open a new bank account.

## Local Development Setup
Requires **node.js > 12** and [python 2.7](https://www.python.org/downloads/release/python-270/)
1. Clone this repo and `cd` into it's folder
2. Set python config `npm config set python [path to python.exe]`
3. Run `yarn install`
4. Run `yarn start`

The steps above will launch the app locally connecting to the remote development api.

**To run the api locally too:**
1. Setup the API locally following the steps at [nimble-core](https://github.com/nimblefi/nimble-core)
2. Change the file `/public/config.js` with `REACT_APP_API_URL="https://local.api.url/v1"`
3. Run `yarn start`

## Mocking API Calls

If you want to run the app with the API mocked. In the file `/public/config.js`, change REACT_APP_MOCK_API_CALLS to true.

This will use the mocks used in the tests so you can navigate to most places.
To edit the mocks, go to the `/src/support/msw/handers.js` file and change accordingly.
We are using the Mock Service Workers library.


## Using config.js
This application loads configs from `/public/config.js`. to customize your configs simply change this file or copy one of our premade configs from `/config/{env}.js` to `/public`

During the test boostrap `/src/setupTests.ts` overwrites these configs.

## Available Scripts

- `yarn start`
    Runs the app in the development mode.

- `yarn test`
    Launches the test runner in the interactive watch mode.
    More info at https://facebook.github.io/create-react-app/docs/running-tests

- `yarn lint`
    Run tslint fixes.

- `yarn run storybook`
    View and test components in isolation at http://localhost:9009

- `yarn build`
    Builds the app for production to the `build` folder.
    More info at https://facebook.github.io/create-react-app/docs/deployment

---

## Dev Stack

- react
- typescript
- sass support (via node-scss on `*.sass`)
- jest support (on `*.test.tsx`)
- react-router (v5)
- react-scripts
- react hooks
- ANT Design System (v4)
- Axios for HTTP Requests
- Leaflet for Maps
- React Testing Library & Jest for testing


## Project Structure

All source code lives inside the src folder. Here is a quick explanation of all the folders and their goal.

### components
Contains reusable components to be used inside larger 'pages'. Each folder can contain 1 main component or smaller components if they only exist to be used by that main component

### containers
Contains the top level main app layout, the application of the router and any react providers that need to be applied to the whole app.

### hooks
Contains reusable react hooks. Hooks can be called by components and they exist independenly.

### pages
This folder contains layouts for traditional pages. These pages are responsible for being the glue for the smaller components.

### router
This folder contains all the routes being used in the app. If a url hits the app, where should it go? this file answers that question.

### services
Contains classes that handle business logic. For example, connecting to a API or generating fake data.

### store
The main goal for this folder is to organize all the code that handles react providers, reducers and context that changes STATE.
- Index: Contains typescript declarations. For example what are the types for a USER or a CAR.
- Providers: Contains code for React Providers and Context. They declare an API for components to use and use actions to call services to do heavy logic or call reducers to change state.

### stories
Stories contain all StoryBook code for displaying the different design components used in the project.

### theme
Contains all SASS code for declaring style for the project. Note that we are currently using ANT Design System as a base so refer to that documentation for more examples.

### utils
Smaller classes called by components to perform small tasks. Main goal is to cut duplicated code and boring tasks.

# Quick bits

## adding new routes

Static Routes are defined in the `Routes.ts` file, and use the following interface:

```js
Object {
  key: string,
  location?: H.Location;
  component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  render?: ((props: RouteComponentProps<any>) => React.ReactNode);
  children?: ((props: RouteChildrenProps<any>) => React.ReactNode) | React.ReactNode;
  path?: string | string[];
  exact?: boolean;
  sensitive?: boolean;
  strict?: boolean;
}
```

to add a new route, simply point it to the `Page` component using the `Route.component` prop

```js
  {
    key: 'myPage',
    path: '/',
    component: MyNewPage
  }
```

See MainContainer.ts for the application of these routes.

## Customize ANT

Customization is done on 2 fronts.

A) By defining sass variables which are fed into Ant at compile time. See which files are being passed to Ant in the file config-overrides.js
NOTE: When you change the variables you need to restart the server to see the changes!

B) By adding or changing the style defined in the theme using CSS. See the Theme folder.

## Docker

To run project using docker (production like) please execute the following steps:
NOTE: Not suitable for development as hot-reloading isn't active.

Build the docker image
```bash
$ docker build -t nimble-crm:dev .
```

Run a docker container mapped to port `8080`
```bash
$ docker run -p 8080:80 nimble-crm:dev
```

Open http://localhost:8080
