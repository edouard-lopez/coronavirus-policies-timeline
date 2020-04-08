import WHO from "../data/who.json";
import China from "../data/china.json";
import Canada from '../data/canada.json';
import Europe from "../data/europe.json";
import France from "../data/france.json";
import Italy from "../data/italy.json";
import Japan from "../data/japan.json";
import SouthKorea from "../data/south-korea.json";
import Spain from "../data/spain.json";
import USA from "../data/usa.json";

const events = [WHO, China, Canada, Europe, France, Italy, Japan, SouthKorea, Spain, USA];

const countryNames = [
  "China",
  "Canada",
  "Europe",
  "France",
  "Italy",
  "Japan",
  "South Korea",
  "Spain",
  "USA",
].sort();

export { countryNames, events };
