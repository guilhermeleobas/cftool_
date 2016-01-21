# cftool
Get inputs and outputs for a specific problem on codeforces.

# Install
You need to have both `node js` and `npm` installed in order to use `cftool`.
```
npm install -g cftool
```

# Usage

```
cftool -g 550A # Download inputs and outputs for problem 550A
cftool -g 600 # Download inputs and outputs for all problems on contest 600.
```

To get full list of available commands run cftool with --help flag.

```
  Usage: cftool [options]

  Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -g, --get <problem>  Get input/output for a problem or contest
```

# License
MIT