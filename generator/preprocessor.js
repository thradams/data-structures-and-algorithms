
function preprocessor(text, flags) {

    var out = "";
    var lines = text.split("\n");
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var k = 0;
        while (line.charAt(k) == " ") k++;
        if (line.charAt(k) == "@") {
            k++;
            k++;//@(

            var allflagsfound = true;
            while (true) {
                if (line.charAt(k) == ')') {
                    k++;
                    break;
                }

                while (line.charAt(k) == " ") k++;
                var name = "";
                while (
                    (line.charCodeAt(k) >= "a".charCodeAt(0) && line.charCodeAt(k) <= "z".charCodeAt(0)) ||
                    (line.charCodeAt(k) >= "A".charCodeAt(0) && line.charCodeAt(k) <= "Z".charCodeAt(0)) ||
                    line.charAt(k) == "!" ||
                    line.charAt(k) == "_") {
                    name += line.charAt(k);
                    k++;
                };

                if (name.charAt(0) == "!") {
                    if (flags.search(name.substring(1, name.length - 1)) >= 0) {
                        allflagsfound = false;
                        break;
                    }
                }
                else {
                    if (flags.search(name) >= 0) {
                    }
                    else {
                        allflagsfound = false;
                        break;
                    }
                }



            }
            if (allflagsfound) {
                out += line.substring(k, line.length) + "\n";
            }
        }
        else {
            out += line + "\n";
        }
    }
    return out;
}

