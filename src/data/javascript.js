const graph = {
  nodes: [
    {title: 'JS', description: 'Javascript Journey starts here', weight: 64, status: 'root'},
    {title: 'EJS', description: 'Eloquent Javascript chapters 1 to 6', weight: 28, status: 'unlocked'},
    {title: 'HRK', description: 'Get hackerrank rank in algorithms section below 10k', weight: 22, status: 'unlocked'},
    {title: 'Project', description: 'Do a simple project', weight: 35, status: 'locked'},
    {title: ':42', description: 'Search for meaning of life', weight: 25, status: 'locked'}
  ],

  edges: [[1, 2], [3], [3], [4], []]
}

export default graph
