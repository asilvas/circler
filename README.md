# circler


## accessories

Get a list of accessories.

```
npm start -- --e myemail@gmail.com --p myPassword accessories
```

Where `1` is the number of hours per summary bucket.


## summary

Get summary videos for the given period for all selected accessories.

```
npm start -- --e myemail@gmail.com --p myPassword --from 2019-10-25 --to 2019-11-02 [--accessories 'my accessory'] -- summary [hours:minutes]
```

Where `hours` (defaults to `1`) and `minutes` amounts to the duration per summary. This allows you to see snapshots of the entire time range to balance size and quality.
