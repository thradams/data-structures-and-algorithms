
function preprocessor(text) {
    var out = "";
    var lines = text.split("\n");
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];

        var k = 0;
        while (line.charAt(k) == " ") k++;

        if (line.charAt(k) == "@") {
            k++;
            k++;//@(
            var start = k;
            while (true) {
                if (line.charAt(k) == ')') {
                    k++;
                    break;
                }
                else
                    k++;
            }
            var expression = line.substring(start, k - 1);
            var result = eval(expression);

            if (result) {
                out += line.substring(k, line.length) + "\n";
            }
        }
        else {
            out += line + "\n";
        }
    }
    return out;
}

