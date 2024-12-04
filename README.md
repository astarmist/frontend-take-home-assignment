This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run npm install in the root directory of the project

```bash
npm install
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

For responsive layouts, breakpoints value are adapted from [Bootstrap](https://getbootstrap.com/docs/5.0/layout/breakpoints/) and stored in `breakpoints.ts`.

## Assumptions

- No validation for the user's search input. User is allowed to enter any alphanumeric and proceed with the search.

  - A message stating that no result is found will be displayed if there are no matches

- The following algorithm is used for search term match to show the results:
  - Only the content of the result item will be matched, **title is excluded**
  - Matching is case-insensitive
  - "Planning" or "planning" will both be accepted
  - Subset of the word will be matched
    - E.g User searches for "child", "children" will be matched as well
  - If user doesn't input any search term and proceeds to search, a whole search case will be assumed
  - Single character search is also allowed. E.g "a", "t", "b".
    - No validation for the min/max characters as mentioned above.
  - If the search term contains multiple words, Strict Matching is used:
    - All the words will be required to match in order for the item to be a match
    - This is in consideration that, "child vaccination" and "child health" would return the same results (all 10 items) if only the word "child" is required for match, which would be meaningless in the context of this assignment
- For this assignment, the following words in the mocked suggestions provided by the endpoint would yield no results following the above algorithm:
  - child vaccination
  - child health
  - child development account
  - register childcare
- You may search for individual words like "health", "development", "account", etc. instead to see results for them
  - "vaccination" will not yield any result too as it is part of the title, search for "vaccine" instead

## Exceptions

- If you encounter `params are being enumerated. params should be unwrapped with React.use() before using its value.`, this error is actually being triggered by the React DevTools extension when it's trying to inspect the components
  - This is likely a false positive error that's occurring due to the interaction between Next.js 13+ and the React DevTools. To verify, disable React DevTools and run the application again
