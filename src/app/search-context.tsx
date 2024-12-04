import { createContext, useState } from "react";

interface SearchContextType {
  showSuggestion?: boolean;
  setShowSuggestion: (show: boolean) => void;
  searchText?: string;
  setSearchText: (text: string) => void;
  selectedSuggestionIndex: number;
  setSelectedSuggestionIndex: (index: number) => void;
  suggestions: string[];
  setSuggestions: (suggestions: string[]) => void;
}

export const SearchContext = createContext<SearchContextType>({
  showSuggestion: false,
  setShowSuggestion: () => {},
  searchText: "",
  setSearchText: () => {},
  selectedSuggestionIndex: -1,
  setSelectedSuggestionIndex: () => {},
  suggestions: [],
  setSuggestions: () => {},
});

export const SearchContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const [showSuggestion, setShowSuggestion] = useState<boolean>(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] =
    useState<number>(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  return (
    <SearchContext.Provider
      value={{
        showSuggestion,
        setShowSuggestion,
        searchText,
        setSearchText,
        selectedSuggestionIndex,
        setSelectedSuggestionIndex,
        suggestions,
        setSuggestions,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
