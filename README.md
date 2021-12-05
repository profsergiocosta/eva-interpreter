https://www.udemy.com/course/essentials-of-interpretation

https://github.com/DmitrySoshnikov/eva-source

```c
sudo npm install -g syntax-cli
```

```c
syntax-cli --grammar parser/eva-grammar.bnf --mode LALR1 --parse '42' --tokenize
```

```c
syntax-cli --grammar parser/eva-grammar.bnf --mode LALR1 --output parser/evaParser.js
```
