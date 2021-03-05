function iterativeFac (n){
    let product = 1
    while(n > 0) {
        product *= n
        n --
    }

    return product
}

const recursiveFac = (n) => {
    if (n === 0) return 1

    return n * recursiveFac(n - 1)
}

// ------------

function fibo (n) {
    if(n === 0) return 0
    if(n === 1) return 1

    let prev = 0
    let curr = 1

    for (let i = n; i > 1; i--){
        let next = prev + curr
        prev = curr
        curr = next
    }

    return curr
}

const recursiveFibo = (n) => {
    if(n === 0) return 0
    if(n === 1) return 1
    
    return recursiveFibo(n - 1) + recursiveFibo(n - 2)
}

// ---------------

const filter = (predicateFn, array) => {
    //predicate function is a  function that takes a value in, and returns a boolean.
    if(array.length === 0) return []
    const firstItem = array[0]
    const filteredFirst = predicateFn(firstItem) ? [firstItem] : []
    return filteredFirst.concat(filter(predicateFn, array.slice(1)))
}

const arrayOfNumbers = [0,1,2,3,4,5,6,7,8,9]

const even = filter((number) => number % 2 === 0, arrayOfNumbers)


function map(fn, array){
    if(array.length === 0) return []
    const firstItem = array[0]
    const mappedItem = fn(firstItem)
    return [mappedItem].concat(map(fn, array.slice(1)))
}

const doubled = map(n => n * 2, arrayOfNumbers)


function reduce(reducerFn, initialValue, array){
    if(array.length === 0) return initialValue
    const newInitialValue = reducerFn(initialValue, array[0])
    return reduce(reducerFn, newInitialValue, array.slice(1))
}


// -------------

function curryGreeting(greeting){
    //currying and closure
    return function(name){
        return `${greeting}, ${name}`
    }
}

const greetingInPortuguese = curryGreeting('Eae')
// console.log(greetingInPortuguese('Peste alada'))
// console.log(greetingInPortuguese('Jegue'))
// console.log(greetingInPortuguese('Praga'))
// console.log(greetingInPortuguese('Cão'))

const curriedQuote = (name) => (quoteYear) => (message) => 
    `"${message}" \n - ${name} (${quoteYear}) \n`


//function composition
const ender = (ending) => (input) => input + ending
const adore = ender('rocks')
const announce = ender(' ,guys')
const exclaim = ender("!")
const announce2 = ender(', folks')

const hype = x => exclaim(announce2(adore(x)))

// ----------

//pipe with recursion

function capitalizeFirstLetter(string) {
    return string[0].toUpperCase().concat(string.slice(1))
}

function camelize(stringArray) {
    const firstString = head(stringArray)
    const tailArray = tail(stringArray)
    return firstString.concat(tailArray.map(capitalizeFirstLetter)
        .join(",").replaceAll(",",""))
}


function pipe(...functions){
    if(functions.length === 0) return input => input
    if(functions.length === 1) return input => functions[0](input)

    return function(input){
        return pipe(...functions.slice(1))(functions[0](input))
    }
}

const reducePipe = (...functions) => 
    (input) => 
            functions.reduce((accumulator, fn) => fn(accumulator), input, functions)

const pluralize = word => word + 's'
const heart = word => 'I ❤️  ' + word


pipe(pluralize, heart)('bread')

reducePipe(pluralize, heart)('bread')


// --------------

function push(array, element){
    return [...array, element]
    // const newArray = array
    // newArray.push(element)
    // return newArray
}

function update(index, value, array){
    // return array.slice(0, index)
    // .concat([value])
    // .concat(array.slice(index + 1))

    const newArray = array.slice(0,-1)
    newArray[index] = value
    return newArray
}

function pop(array){
    return array.slice(0, -1)
}

const x = [1,2,3,4,5,6]
const newx = update(0,9,x)
console.log(x, newx)