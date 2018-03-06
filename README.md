The Online [><>](https://esolangs.org/wiki/Fish) Interpreter
=====================

[fishlanguage.com](https://fishlanguage.com) has been reborn! Rewritten completely from scratch after first having been abandoned, because apparently you guys were not happy with [TIO](https://tio.run/#fish).

It features a number of improvements, like the ability to view output as hex, or view input as numbers or text. Also, pretty much instant code execution without hanging the entire browser

The interpreter itself is also available as an [npm package](https://github.com/Suppen/fish-interpreter), should you suddenly get the urge to interpret ><> in your JavaScript application

Usage
-----

The interpreter is used much like the old one. Just fool around with it, and you will figure it out

### Initial stack

You can give an initial stack to your program, so you don't have to initialize it in the code. Before the program is started, there is an input field for setting it.

It has two buttons related to it: "Interpret as text" and "Interpret as array".

The stack holds numbers only. Writing text in the input and clicking "Interpret as text" will convert your text to an array of numbers based on the characters' unicode values. You can, however, give it arbritary numeric values. Writing `1, 2, 3, 85, 869543723, 3.14159` and clicking the "Interpret as array" button will give you exactly that: The stack `[1, 2, 3, 85, 869543723, 3.14159]`. Just keep in mind that no matter how you give it, it will be interpreted bt the program as numbers

### Giving input
This works much the same way as setting the initial stack, except the input stream works on characters, not numbers. Basically, this means you can only give it integers in the range 0-65535. Just as with the initial stack, however, you can give it as text or an array. Just keep in mind that no matter how you give it, it will be interpreted by the program as characters

### Execution speed
This should be fairly intuitive. The farther to the left, the slower the program runs. The farther to the right, the faster it runs. It basically controls the timeout between two steps of the program

Setting the slider to the far right, however, will set the program to immediate execution. It will do batches of 10 000 steps instead of one and one. After each batch it will yield, so it can be paused if you accidently made an infinite loop or something. 

### Data view
The program's data can be viewed in four fields: Input queue, stack, output and steps. You will notice the three former have a small button next to the labels. Clicking it toggles the view mode of the data.

For the input buffer and the stack, it toggles between viewing the data as numbers or characters. It will NOT change the way the program uses these data; they will still be consumed as characters (input) and numbers (stack) no matter which view mode you use

For the output, it toggles between text mode and hex mode. The text mode is what you usually want, but you 
can also see the outputted bytes as a hex dump if you so wish

Building
--------

This is an open source project, so of course I will provide build instructions if you want to build it yourself

It's quite simple. The code is a JavaScript project built with [WebPack](https://webpack.js.org/). To get started, simply run `npm install` followed by `npm run build`. You now have a directory called `build/` which contains the file `index.html`. Click it, and you have your very own version of fishlanguage.com!

