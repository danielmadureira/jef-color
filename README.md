# **_jef-color_**

Recolor JEF files with NodeJS.

### Usage example:

```JavaScript
const { JefColor, acceptedJEFColors } = require('jef-color');

const jefColor = new JefColor('/path/to/file.jef');

// Gets all the colors in the file.
let colors = jefColor.getColors();
colors[0] = acceptedJEFColors[55];
colors[2] = acceptedJEFColors[55];

// Sets the new colors.
jefColor.setColors(colors);

// Saves a new file with the new
// colors or, if let empty, updates
// the existing file.
jefColor.saveFile('/path/to/new/file');
```

### Thanks

This project was possible thanks to the KDE community, who provided the JEF file specification [here](https://community.kde.org/Projects/Liberty/File_Formats/Janome_Embroidery_Format).

This project was inspired by [akjabay](https://github.com/akjabay), author of [jef2img](https://github.com/akjabay/jef2img).

### Licensing

This project is under the MIT license.
You can find the license [here](./LICENSE).
