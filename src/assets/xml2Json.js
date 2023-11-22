export default function parseXmlToJSON(xmlString) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

  // 재귀적으로 XML을 파싱하고 JSON 객체로 변환
  function parseNode(node) {
    const obj = {};

    if (node.nodeType === 1) {  // element 노드
      for (let i = 0; i < node.childNodes.length; i++) {
        const childNode = node.childNodes[i];
        const childValue = parseNode(childNode);

        if (obj[childNode.nodeName]) {
          if (Array.isArray(obj[childNode.nodeName])) {
            obj[childNode.nodeName].push(childValue);
          } else {
            obj[childNode.nodeName] = [obj[childNode.nodeName], childValue];
          }
        } else {
          obj[childNode.nodeName] = childValue;
        }
      }
    } else if (node.nodeType === 3) {  // text 노드
      return node.nodeValue.trim();
    }

    return obj;
  }

  return parseNode(xmlDoc.firstChild);
}