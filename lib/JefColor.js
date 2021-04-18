const fs = require('fs');
const path = require('path');

const acceptedJEFColors = require('./accepted-jef-colors');

const JEF_FILE_OFFSETS = Object.freeze({
    NUMBER_OF_COLORS: 24,
    COLORS: 116
});

/**
 * JefColor - Change JEF files colors.
 * 
 * @param {string} filePath - The path of the JEF file.
 */
function JefColor(filePath) {
    if (!filePath || path.parse(filePath)['ext'] != '.jef') {
        throw new Error('Invalid file format');
    }

    this.filePath = filePath;

    this.fileBuffer = Buffer.from(
        fs.readFileSync(filePath)
    );
};

/**
 * Return an integer representing
 * the number of colors on a
 * JEF file drawing.
 * 
 * @returns {number}
 */
JefColor.prototype.getNumberOfColors = function () {
    return this.fileBuffer.readUInt32LE(
        JEF_FILE_OFFSETS.NUMBER_OF_COLORS
    );
};

/**
 * Sets the JEF file drawing's
 * colors.
 * 
 * @param {{identifier: number, hex: string}|number[]} colorArray 
 */
JefColor.prototype.setColors = function (colorArray) {
    colorArray.forEach((color, key) => {
        const colorIdentifier = color.identifier || color;

        if (
            colorIdentifier < 0
            || colorIdentifier > (acceptedJEFColors.length - 1)
        ) {
            throw new Error(
                'Invalid color identifier. ' +
                'You must choose one of the accepted colors.'
            );
        }

        const offset = JEF_FILE_OFFSETS.COLORS + (key * 4);
        this.fileBuffer.writeUInt32LE(colorIdentifier, offset);
    });
};

/**
 * Returns an array with the
 * colors in a JEF file drawing.
 * 
 * @returns {{identifier: number, hex: string}[]}
 */
JefColor.prototype.getColors = function () {
    const colors = [];
    const numberOfColors = this.getNumberOfColors();
    for (let i = 0; i < numberOfColors; ++i) {
        const index = JEF_FILE_OFFSETS.COLORS + (i * 4);

        const colorIndex = this.fileBuffer.readUInt32LE(index);
        colors.push(acceptedJEFColors[colorIndex]);
    }

    return colors;
};

/**
 * Saves the file with the new colors.
 * 
 * @param {string} newFilePath
 */
JefColor.prototype.saveFile = function (newFilePath = null) {
    fs.writeFileSync(newFilePath || this.filePath, this.fileBuffer);
};

module.exports = JefColor;
