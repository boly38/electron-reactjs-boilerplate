import {readdirSync, readFileSync} from 'fs';
import {join} from 'path';
import {v4 as uuidv4} from 'uuid';

function expectedEnvVariable(variableName) {
    const envVarValue = process.env[variableName];
    if (!isSet(envVarValue)) {
        throw new Error(`Expected env:${variableName}`);
    }
    return envVarValue;
}

const errIncludes = (err, v) => isString(err) && err.includes(v);

function clone(obj) {
    return isSet(obj) ? {...obj} : obj;
}

const deepCopy = o => isSet(o) ? JSON.parse(JSON.stringify(o)) : null;

function sleep(timeMs) {
    return new Promise(resolve => setTimeout(resolve, timeMs))
}

function isSet(variable) {
    return (variable !== undefined && variable !== null);
}

function isEmpty(variable) {
    return !isSet(variable) || variable === '' || (Array.isArray(variable) && variable.length === 0);
}

function isNotEmpty(variable) {
    return isSet(variable) && variable !== '';
}

function isString(value) {
    return typeof value === 'string' || value instanceof String;
}

function loadJsonFile(filePath) {
    try {
        // Read the JSON file synchronously
        const rawData = readFileSync(filePath, 'utf8');

        // Parse the JSON data and return it
        return JSON.parse(rawData);
    } catch (error) {
        console.error('Error reading or parsing the JSON file:', error);
        return null;
    }
}

function readJsonFilesFromDirectory(directoryPath) {
    try {
        // Read the list of files in the directory
        const files = readdirSync(directoryPath);

        // Initialize the resulting array
        const resultArray = [];

        // Iterate through each file
        files.forEach(file => {
            // Check if the file has the ".json" extension
            if (file.endsWith('.json')) {
                // Build the full path of the file
                const filePath = join(directoryPath, file);

                try {
                    // Read the content of the file
                    const rawData = readFileSync(filePath, 'utf8');

                    // Parse the JSON and add each object to the result with the "file" attribute
                    const jsonObjects = JSON.parse(rawData);
                    jsonObjects.forEach(obj => {
                        obj.file = file;
                        resultArray.push(obj);
                    });
                } catch (error) {
                    console.error(`Error reading file ${file}: ${error.message}`);
                }
            }
        });

        return resultArray;
    } catch (error) {
        console.error(`Error reading directory ${directoryPath}: ${error.message}`);
        return [];
    }
}

function generateUniqueId() {
    return uuidv4();
}

function assumeSet(desc, val) {
    if (!isSet(val)) {
        throw new Error(`${desc} is not set`);
    }
}

// Export the function to be used in other modules
export {
    expectedEnvVariable, errIncludes,
    clone, deepCopy, sleep,
    isSet, isEmpty, isNotEmpty, isString,
    loadJsonFile, readJsonFilesFromDirectory,
    generateUniqueId, assumeSet
};