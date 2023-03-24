
function preprocessor(text)
{
    var out = "";
    var lines = text.split("\n");
    for (var i = 0; i < lines.length; i++)
    {
        var line = lines[i];

        var k = 0;
        while (line.charAt(k) == " ") k++;

        if (line.charAt(k) == "@")
        {
            k++;
            k++;//@(
            var allblanks = true;
            var start = k;
            while (true)
            {
                if (line.charAt(k) == ')')
                {
                    k++;
                    break;
                }
                else
                {
                    if (line.charAt(k) != ' ') allblanks = false;
                    k++;
                }
            }
            var expression = line.substring(start, k - 1);
            var result = false;
            if (!allblanks)
            {
                result = eval(expression);
            }
            else
            {
                result = true;
            }

            if (result)
            {
                out += line.substring(k, line.length) + "\n";
            }
        }
        else
        {
            out += line + "\n";
        }
    }
    return out;
}

