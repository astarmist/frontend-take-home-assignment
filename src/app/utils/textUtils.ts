export namespace TextUtils {
  export const formatMatchedText = (text: string, searchText: string) => {
    if (!searchText) return text;

    const regex = new RegExp(searchText, "gi");
    return text.replace(regex, (match) => `<strong>${match}</strong>`);
  };
}
