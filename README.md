
I asked chatGPT to create a simply linked list in C. It Worked!

He generated an example and this idea of having an assistant to generating code 
seems very nice, especially for C. 

However, the result was an educational-style code without proper error handling. 
In some cases it also generates memory leaks.

So it's pretty cool to learn, but if we want to use this in production what 
guarantee do we have? (none)

Thinking about this problem I decided to create this repository with reliable and 
production quality source code for data structures and algorithms. 

A web tool to generate code is on the "generator" folder.
A version (that may be outdated) is running here http://thradams.com/generator/dynamic_array.html

A this point samples will be created using a representative types for structs, strings,
ints.  The programmer will have to replace the code for it's current type.

The work (for now) will be directed to the generator (download and open html file) instead 
of writing the sample on .md files.
This ensures we have just one source. The generator reuses the same template for more than
one sample that means we fix the template and then all samples are fixed.


The generator is writen in javascript and use a preprocessor (see preprocessor.js)

The preprocesso works like this

```
@(FLAG1 FLAG2 !FLAG3) line
```

When all flags are true then the line is inserted. A better generator (sugestion) is
allow a expression FLAG1 || FLAG2 etc..


