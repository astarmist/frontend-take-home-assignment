export namespace TextUtils {
  export const formatMatchedText = (text: string, searchText: string) => {
    if (!searchText) return text;

    try {
      const words = searchText.split(" ");
      const regex = new RegExp(words.join("|"), "gi");
      return text.replace(regex, (match) => `<strong>${match}</strong>`);
    } catch (error) {
      console.error("Error in formatMatchedText:", error);
      return text;
    }
  };
}
