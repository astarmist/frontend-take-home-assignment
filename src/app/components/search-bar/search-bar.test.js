import { act, fireEvent, render, screen } from "@testing-library/react";
import SearchContext from "../../search-context";
import {
  SEARCH_API_ENDPOINT,
  SEARCH_SUGGESTION_API_ENDPINT,
} from "../constants";
import SearchBar from "./search-bar";
import SearchSuggestion from "./search-suggestion/search-suggestion";

const mockedResultData = {
  TotalNumberOfResults: 100,
  Page: 1,
  PageSize: 3,
  ResultItems: [
    {
      DocumentId: "8f09d0d0898e5470189120415158f7b5",
      DocumentTitle: {
        Text: "Choose a Child Care Centre",
        Highlights: [
          {
            BeginOffset: 9,
            EndOffset: 14,
          },
        ],
      },
      DocumentExcerpt: {
        Text: "...as partners to optimise the child physical, intellectual, emotional and social development. Choosing a Child Care Centre for Your Child In choosing the appropriate child care arrangement, the age and personality of your child are important factors for consideration...",
        Highlights: [
          {
            BeginOffset: 31,
            EndOffset: 36,
          },
          {
            BeginOffset: 106,
            EndOffset: 111,
          },
          {
            BeginOffset: 133,
            EndOffset: 138,
          },
          {
            BeginOffset: 167,
            EndOffset: 172,
          },
          {
            BeginOffset: 223,
            EndOffset: 228,
          },
        ],
      },
      DocumentURI:
        "https://www.ecda.gov.sg/Parents/Pages/ParentsChooseCCC.aspx",
    },
    {
      DocumentId: "0a055db5880a278d8734750c0925420f",
      DocumentTitle: {
        Text: "ICA | Child (aged under 21) of a Singapore Citizen (SC) or Singapore Permanent Resident (PR)",
        Highlights: [
          {
            BeginOffset: 6,
            EndOffset: 11,
          },
        ],
      },
      DocumentExcerpt: {
        Text: "...Child (aged under 21) of a Singapore Citizen (SC) or Singapore Permanent Resident (PR) Child (aged under 21) of a Singapore Citizen (SC) or Singapore Permanent Resident (PR) From the foreign child (applicant) Birth Certificate and adoption documents (if any) The applicant recent passport...",
        Highlights: [
          {
            BeginOffset: 3,
            EndOffset: 8,
          },
          {
            BeginOffset: 90,
            EndOffset: 95,
          },
          {
            BeginOffset: 194,
            EndOffset: 199,
          },
        ],
      },
      DocumentURI:
        "https://www.ica.gov.sg/reside/LTVP/apply/child-(aged-under-21)-of-a-singapore-citizen-(sc)-or-singapore-permanent-resident-(pr)",
    },
    {
      DocumentId: "053d47aae0b0d65307641cd86e97d06b",
      DocumentTitle: {
        Text: "MOH | Child Vaccination",
        Highlights: [
          {
            BeginOffset: 6,
            EndOffset: 11,
          },
        ],
      },
      DocumentExcerpt: {
        Text: "...gets better by itself in a week or so Some children may have no side effects. There is nothing to worry about if that is the case for your child. CAN MY CHILD TAKE FEVER/PAIN MEDICINE BEFORE TAKING THE VACCINE? If there are no side effects present, there is no reason to pre-medicate your child...",
        Highlights: [
          {
            BeginOffset: 142,
            EndOffset: 147,
          },
          {
            BeginOffset: 156,
            EndOffset: 161,
          },
          {
            BeginOffset: 292,
            EndOffset: 297,
          },
        ],
      },
      DocumentURI:
        "https://www.moh.gov.sg/covid-19/vaccination/faqs/faqs---children-related-vaccination-matters",
    },
  ],
};

const mockSuggestionData = {
  stemmedQueryTerm: "child",
  suggestions: [
    "child care",
    "child vaccination",
    "child health",
    "child education",
    "child development account",
    "register childcare",
  ],
};

describe("Test Search Bar", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation((url) =>
      Promise.resolve({
        status: 200,
        json: () =>
          url.includes(SEARCH_API_ENDPOINT)
            ? Promise.resolve(mockedResultData)
            : Promise.resolve(mockSuggestionData),
      })
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("Search Button renders correctly", () => {
    render(<SearchBar />);
    const searchButtonElement = screen.getByText(/Search/i);

    expect(searchButtonElement).toBeInTheDocument();
  });

  it("Performs the search when Search Button is clicked", async () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const searchButton = screen.getByText(/Search/i);
    await act(async () => {
      await fireEvent.click(searchButton);
    });

    expect(fetch).toHaveBeenCalledWith(SEARCH_API_ENDPOINT);
  });
});

describe("Test Search Suggestion", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockSuggestionData),
      })
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  const mockContext = {
    searchText: "child",
    setSearchText: jest.fn(),
    showSuggestion: true,
    setShowSuggestion: jest.fn(),
  };

  const defaultProps = {
    suggestionIndex: 0,
    onSelect: jest.fn(),
    onShowSuggestions: jest.fn(),
  };

  const renderWithContext = (ui, context = mockContext) => {
    return render(
      <SearchContext.Provider value={context}>{ui}</SearchContext.Provider>
    );
  };

  it("should display suggestions when there are 2 or more characters for the search term", async () => {
    renderWithContext(<SearchSuggestion {...defaultProps} />);

    await screen.findAllByText("child");

    const suggestionItems = screen.getAllByText(/child/i);

    expect(fetch).toHaveBeenCalledWith(SEARCH_SUGGESTION_API_ENDPINT);
    expect(suggestionItems).toHaveLength(6);
  });
});
