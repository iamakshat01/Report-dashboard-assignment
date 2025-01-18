export const transformData = (apiResponse) => {
  const mockData2 = {
    id: "root",
    name: "Home Directory",
    children: [],
    isFile: false,
  };

  apiResponse.forEach(({ _id, Name, OriginalName, OriginalPath }) => {
    const pathSegments = OriginalPath.split("/").filter(Boolean); // Remove empty strings
    pathSegments.reduce((currentNode, segment, index) => {
      // Construct the full path till the current segment
      const fullPath = `${currentNode.id}/${segment}`;

      // Check if we're at the file (last segment and it's a .csv)
      if (index === pathSegments.length - 1 && segment.endsWith(".csv")) {
        currentNode.children.push({
          id: _id,
          name: OriginalName,
          location: Name,
          isFile: true,
        });
        return currentNode;
      }

      // Check if the folder already exists
      let folder = currentNode.children.find(
        (child) => child.name === segment && !child.isFile
      );

      // If not, create the folder with the full path as its ID
      if (!folder) {
        folder = {
          id: fullPath,
          name: segment,
          children: [],
          isFile: false,
        };
        currentNode.children.push(folder);
      }

      return folder; // Move deeper into the hierarchy
    }, mockData2); // Start from the root node
  });

  return mockData2;
};