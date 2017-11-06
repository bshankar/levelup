const graph = {
  nodes: [
    {id: 'JS', description: 'Javascript Journey starts here', weight: 64, status: 'root'},
    {id: 'EJS', description: 'Eloquent Javascript chapters 1 to 6', weight: 28, status: 'unlocked'},
    {id: 'HRK', description: 'Get hackerrank rank in algorithms section below 10k', weight: 22, status: 'unlocked'},
    {id: 'Project', description: 'Do a simple project', weight: 35, status: 'locked'},
    {id: ':42', description: 'Search for meaning of life', weight: 25, status: 'locked'}
  ],

  links: [
    {source: 'JS', target: 'EJS'},
    {source: 'JS', target: 'HRK'},
    {source: 'EJS', target: 'Project'},
    {source: 'HRK', target: 'Project'},
    {source: 'Project', target: ':42' }
  ]
}

export default graph
