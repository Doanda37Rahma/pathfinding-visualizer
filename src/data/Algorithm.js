export const algorithm_data = [
  {
    title: "Breadth-first search",
    description:
      "chooses a starting vertex and then visits all vertices adjacent to it. These vertices are said to be on the same level. The algorithm then put these vertices in the queue and at the same time dequeue the starting vertex",
    image: "/images/bfs.jpg",
  },
  {
    title: "Depth-first search",
    description:
      "chooses a starting vertex, visits it, and then pushes it on to the stack. It then moves on to any adjacent vertex that hasn’t been visited. Once it has chosen this particular path, it will traverse through this path until there is no more vertex.",
    image: "/images/dfs.jpg",
  },

  {
    title: "A* search",
    description:
      "combines the pieces of information that Dijkstra’s Algorithm uses (favoring vertices that are close to the starting point) and information that Greedy Best-First-Search uses (favoring vertices that are close to the goal)",
    image: "/images/greedy.jpg",
  },
  {
    title: "Greedy Best First search",
    description:
      "works in a similar way as A*, except that it has some estimate (called a heuristic) of how far from the goal any vertex is. Instead of selecting the vertex closest to the starting point, it selects the vertex closest to the goal",
    image: "/images/astar.jpg",
  },
];
