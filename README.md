# richtig pferd - Password Generator

## About

**richtig pferd** is a password generator that creates passwords which are easy to remember but hard to guess. This tool operates entirely within your browser, ensuring that no data is transferred to any server. The project is inspired by the [XKCD Comic "Password Strength"](https://xkcd.com/936/).

## How It Works

To generate secure passwords, **richtig pferd** randomly selects words from a [word list](https://richtigpferd.pw/wordlist.txt) containing over 25,000 German words, including nouns, verbs, and adjectives. These words are randomly combined to form the password.

## Word Sources

The words are sourced from [GitHub - AlleDeutschenWoerter](https://github.com/cpos/AlleDeutschenWoerter).

## Credits

Created and provided by [Marc Rufeis](https://www.marcrufeis.de/) & [ITMR Developments](https://itmr-dev.de/). Additional contributors can be found on [GitHub](https://github.com/craftycram/richtig-pferd).

## API Documentation

### Generate Word Combination (`/api/generate`)

This endpoint generates a combination of random words with configurable formatting options.

#### Query Parameters

| Parameter  | Type    | Default | Description |
|------------|---------|---------|-------------|
| length     | number  | 5       | Number of words to generate (1-10) |
| uppercase  | boolean | false   | Capitalize the first letter of each word |
| digit      | boolean | true    | Append a random digit (0-9) to the result |
| dash       | boolean | true    | Join words with dashes (`-`) |
| umlauts    | boolean | false   | Keep German umlauts (if false, converts ä->ae, ö->oe, etc.) |
| keepCase   | boolean | true    | Preserve original word case (overrides uppercase) |

#### Examples

```
# Basic usage (5 words with dash and digit)
GET /api/generate
-> "Zertifizierung-ueberschwaenglich-vorueberfahren-abbringen-Musikhochschule-3"

# 3 words, uppercase, no digit or dash
GET /api/generate?length=3&uppercase=true&digit=false&dash=false
-> "AblaufAkzidentellErzeugnis"

# 2 words with umlauts
GET /api/generate?length=2&umlauts=true
-> "entrüstet-bemächtigen-8"
```

## Contributing

If you would like to help improve or translate this project, you can do so on [GitHub](https://github.com/craftycram/richtig-pferd).

## Languages Available

- German (de)
- English (en)

---

*This project is a gift for my long-time mentor and friend [Florian Geiselhart](https://www.florian-geiselhart.de/).*
