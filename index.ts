import { Node, parseHtmlDocument } from "html-parser.ts";

/**
 * Extracts an excerpt from an HTML string based on the specified limit and limit type.
 * The excerpt can be limited by either characters or words.
 *
 * @param {string} html - The HTML string from which to extract the excerpt.
 * @param {number} limit - The maximum limit for the excerpt. (optional)
 * @param {"chars" | "words"} limitType - The type of limit to apply. Can be either "chars" or "words". Defaults to "chars".
 * @returns The extracted excerpt as a string.
 */
export function extractExcerpt(
  html: string,
  limit: number = -1,
  limitType: "chars" | "words" = "chars"
): string {
  const defaultCharsLimit = 300;
  const defaultWordsLimit = 50;
  limit =
    limit === -1
      ? limitType === "chars"
        ? defaultCharsLimit
        : defaultWordsLimit
      : limit;
  const document = parseHtmlDocument(html);
  let extractedText = "";
  let currentLength = 0;

  function isParagraph(node: Node): boolean {
    return node.outerHTML.startsWith("<p>") || node.outerHTML.startsWith("<p ");
  }

  function handleNode(node: Node) {
    if (isParagraph(node)) {
      const nodeText = node.textContent || "";
      if (limitType === "chars" && currentLength + nodeText.length >= limit) {
        extractedText += nodeText.slice(0, limit - currentLength);
        currentLength = limit;
        return;
      } else if (
        limitType === "words" &&
        extractedText.split(/\s+/).length - 1 + nodeText.split(/\s+/).length >
          limit
      ) {
        const wordsToAdd = nodeText.split(/\s+/);
        let spaceLeft = limit - (extractedText.split(/\s+/).length - 1);
        extractedText += wordsToAdd.slice(0, spaceLeft).join(" ") + " ";
        currentLength = limit;
        return;
      } else {
        extractedText += nodeText + " ";
        currentLength +=
          limitType === "chars"
            ? nodeText.length
            : nodeText.split(/\s+/).length;
      }
    }

    node.childNodes?.forEach((child) => handleNode(child));
  }

  document.forEachChildNode(handleNode);

  if (currentLength >= limit) {
    return extractedText.trim().replace(/\s+\S*$/, "...");
  } else {
    return extractedText.trim();
  }
}
