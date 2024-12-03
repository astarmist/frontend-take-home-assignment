This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run npm install in the root directory of the project

```bash
npm i --legacy-peer-deps
```

Next, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running Automated Test

[Jest](https://jestjs.io/) is used for writing automated tests.

Running the test:

```bash
npm run test
```

Once the test has finished running, a test report `test-report.html` will be generated.<br>
You can view the report by opening it in the browser of your choice.

## Styling

Styling is done using [styled-components](https://styled-components.com/).

Each component will have their corresponding file responsible, with the following format:

```
{componentName}.styles.tsx
```

## Assumptions

- No validation for the user's search input. User is allowed to enter any alphanumeric and proceed with the search.

  - A message stating that no result is found will be displayed if there are no matches

- For search term matches, only the content of the result item will be used. The title will be excluded.
  The match will also include subset of the words,
  - E.g User searches for "child", "children" will be matched as well
