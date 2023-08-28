# datetime-val

some useful tools for datetime validations.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

```
$ npm i datetime-val
```
## Zulu Time Converter Function

The zuluTimeNow function is a JavaScript utility designed to convert the current local time to Zulu Time (Coordinated Universal Time, UTC). Zulu Time is a standardized time reference used in aviation, military, and other fields to eliminate confusion arising from different time zones.

To use the zuluTimeNow function, simply call it within your JavaScript code:

```js
const zuluTime = zuluTimeNow();
console.log("Zulu Time:", zuluTime);

```

## Date String to ISO Conversion Utility

The convertToISOFill function is a JavaScript utility designed to convert a given date string in a specific format into the ISO 8601 date format. The ISO 8601 format is widely recognized and used for representing dates and times in a standardized way. This utility focuses on converting a particular format of date string into its ISO equivalent. 

To use the convertToISOFill function, pass the date string you want to convert as an argument:

```js
const dateInput = "12.31.23"; // Example date string
const conversionResult = convertToISOFill(dateInput);
console.log("Conversion Result:", conversionResult);
Conversion Result: {
  valDateString: '31.12.2023',
  dateStringISO: 2023-12-31T00:00:00.000Z
}

const dateInput = "7.4.21";
Conversion Result: {
  valDateString: '07.04.2021',
  dateStringISO: 2021-04-07T00:00:00.000Z
}

const dateInput = "12.31.2023"; // Invalid format
Conversion Result: {
    valDateString: false,
    dateStringISO: false
}

```

## Zulu Time to Local Date Format Converter

The convertFromZulu function is a JavaScript utility designed to convert a given Zulu Time (UTC) date string into a local date format, with the ability to support different country-specific date formats. This utility extracts the day, month, and year components from the Zulu Time date and formats them based on the specified country's requirements.

To use the convertFromZulu function, provide a Zulu Time (UTC) date string and, if applicable, specify the country code (e.g., 'us' or 'de') to indicate the desired local date format:

```js
const zuluDateString = "2023-08-28T12:34:56Z"; // Example Zulu Time date string
const convertedDate = convertFromZulu(zuluDateString);
console.log("Converted Date:", convertedDate);
"Converted Date: 28.08.2023"
```