function fib (n) {
  if (n<=1)
    return n
  else
    return fib(n-2) + fib (n-1)
}

var args = process.argv.slice(2)
console.log(fib(args[0]))