# Coronavirus Policies Timeline

> Keeping track of available information and actions taken by government worldwide relative to the SARS-CoV-2 pandemic (_i.e._ _Coronavirus_ or _covid-19_) responsible for various healthcare system failure.

## Onboarding

In the project directory, you can run:

### Events

| key | description | example
| --- | --- | --- |
`published_date` | source's publication date |  2020-03-03T21:06:04
`url` | source URL |  https://www.liberation.fr/france/2020/03/03/penurie-de-masques-les-autorites-n-ont-pas-vu-plus-loin-que-le-bout-de-leur-nez_1780489",
`title` | source article title |  Pénurie de masques : les autorités n’ont pas vu plus loin que le bout de leur nez",
`entity` | who is speaking | a `government`, a `company`, an `individual`, etc.
`tags` | about what? |  `["announcement", "announce_order", "mask"]`, etc.

#### Entity's Values


| Entity | Description |
| --- | --- |
`government` | Government statement | French goverment, local state or their representative
`company` | Company representative | Dyson, Google, etc.
`individual` | private individual 

#### Tags' Values

| Tag | Description |
| --- | --- |
`announcement` | statement to the public 
`announce_distribution` | distributing equipments to professional
`announce_order` | order equipments
`announce_support` | announcing support
`announce_free` | announce free help
`announce_treatment` | announce treatment 
`mask` | masks-related


### Run

    yarn start
<!-- make serve-backend
make serve-frontend -->

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Credits

* [Timeline using D3 V5](https://observablehq.com/@ltmylinh/timeline-using-d3-v5) ;
* [Timeline of the 2019–20 coronavirus pandemic](https://www.wikiwand.com/en/Timeline_of_the_2019%E2%80%9320_coronavirus_pandemic) ;