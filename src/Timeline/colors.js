const colors = {
  blue: [
    '--pf-global--palette--blue-100',
    '--pf-global--palette--blue-200',
    '--pf-global--palette--blue-300',
    '--pf-global--palette--blue-400',
    '--pf-global--palette--blue-500',
    '--pf-global--palette--blue-600',
    '--pf-global--palette--blue-700',
  ],
  cyan: [
    '--pf-global--palette--cyan-100',
    '--pf-global--palette--cyan-200',
    '--pf-global--palette--cyan-300',
    '--pf-global--palette--cyan-400',
    '--pf-global--palette--cyan-500',
    '--pf-global--palette--cyan-600',
    '--pf-global--palette--cyan-700',
  ],
  gold: [
    '--pf-global--palette--gold-100',
    '--pf-global--palette--gold-200',
    '--pf-global--palette--gold-300',
    '--pf-global--palette--gold-400',
    '--pf-global--palette--gold-500',
    '--pf-global--palette--gold-600',
    '--pf-global--palette--gold-700',
  ],
  green: [
    '--pf-global--palette--green-100',
    '--pf-global--palette--green-200',
    '--pf-global--palette--green-300',
    '--pf-global--palette--green-400',
    '--pf-global--palette--green-500',
    '--pf-global--palette--green-600',
    '--pf-global--palette--green-700',
  ],
  'light-blue': [
    '--pf-global--palette--light-blue-100',
    '--pf-global--palette--light-blue-200',
    '--pf-global--palette--light-blue-300',
    '--pf-global--palette--light-blue-400',
    '--pf-global--palette--light-blue-500',
    '--pf-global--palette--light-blue-600',
    '--pf-global--palette--light-blue-700',
  ],
  'light-green': [
    '--pf-global--palette--light-green-100',
    '--pf-global--palette--light-green-200',
    '--pf-global--palette--light-green-300',
    '--pf-global--palette--light-green-400',
    '--pf-global--palette--light-green-500',
    '--pf-global--palette--light-green-600',
    '--pf-global--palette--light-green-700',
  ],
  orange: [
    '--pf-global--palette--orange-100',
    '--pf-global--palette--orange-200',
    '--pf-global--palette--orange-300',
    '--pf-global--palette--orange-400',
    '--pf-global--palette--orange-500',
    '--pf-global--palette--orange-600',
    '--pf-global--palette--orange-700',
  ],
  purple: [
    '--pf-global--palette--purple-100',
    '--pf-global--palette--purple-200',
    '--pf-global--palette--purple-300',
    '--pf-global--palette--purple-400',
    '--pf-global--palette--purple-500',
    '--pf-global--palette--purple-600',
    '--pf-global--palette--purple-700',
  ],
  red: [
    '--pf-global--palette--red-100',
    '--pf-global--palette--red-200',
    '--pf-global--palette--red-300',
    '--pf-global--palette--red-400',
    '--pf-global--palette--red-500',
  ],
  black: [
    '--pf-global--palette--black-100',
    '--pf-global--palette--black-200',
    '--pf-global--palette--black-300',
    '--pf-global--palette--black-400',
    '--pf-global--palette--black-500',
    '--pf-global--palette--black-600',
    '--pf-global--palette--black-700',
    '--pf-global--palette--black-800',
    '--pf-global--palette--black-900',
    '--pf-global--palette--black-1000',
  ],
}
const names = [
  'blue',
  'cyan',
  'gold',
  'green',
  'light-blue',
  'light-green',
  'orange',
  'purple',
  'red',
  'black',
]

const colorize = (index) => {
  const length = Object.keys(colors).length
  const color = index % length
  const shade = Math.floor(index / length)

  return `fill: var(${colors[names[color]][shade]})`
}
export { colors, colorize }
